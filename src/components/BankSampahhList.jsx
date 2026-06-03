import { useState, useEffect, useCallback, useRef } from 'react';
import {
  MapPin, Navigation, Search, LocateFixed,
  Loader2, MapPinOff, ChevronRight, X,
  Leaf, AlertCircle, SignalHigh
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { getBankSampahList } from '../service/api';
import 'leaflet/dist/leaflet.css';

// ─── Fix default Leaflet marker icon ──────────────────────────────────────────
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ─── Custom SVG markers ────────────────────────────────────────────────────────
const makeMarker = (color, ring) =>
  L.divIcon({
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
    html: `
      <div style="position:relative;width:32px;height:40px">
        <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;filter:drop-shadow(0 3px 6px rgba(0,0,0,.25))">
          <path d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28S28 21 28 12C28 5.373 22.627 0 16 0z" fill="${color}"/>
          ${ring ? `<circle cx="16" cy="12" r="5" fill="white" opacity="0.9"/>` : `<circle cx="16" cy="12" r="5" fill="white" opacity="0.85"/>`}
        </svg>
      </div>
    `,
  });

const MARKER_GREEN = makeMarker('#4D7111', false);
const MARKER_LIME  = makeMarker('#6aad1c', true);   // selected
const MARKER_BLUE  = makeMarker('#1a6bb5', false);   // user location

// ─── Haversine distance (km) ───────────────────────────────────────────────────
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

// ─── Map fly-to helper ─────────────────────────────────────────────────────────
const FlyTo = ({ center, zoom = 15 }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, map, zoom]);
  return null;
};

// ─── Distance badge chip ───────────────────────────────────────────────────────
const DistanceBadge = ({ km, isNearest }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 9px',
      borderRadius: 20,
      background: isNearest ? '#4D7111' : '#E2F9CC',
      color: isNearest ? '#fff' : '#4D7111',
      border: isNearest ? 'none' : '1px solid #C3E956',
      letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
    }}
  >
    <SignalHigh size={10} strokeWidth={2.5} />
    {isNearest ? `Terdekat · ${fmtDist(km)}` : fmtDist(km)}
  </span>
);

// ─── Empty / error states ──────────────────────────────────────────────────────
const EmptyState = ({ query, onClear }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '40px 20px',
      background: '#f9fdf3',
      borderRadius: 18,
      border: '1.5px dashed #C3E956',
    }}
  >
    <MapPinOff size={32} color="#C3E956" style={{ margin: '0 auto 12px' }} />
    <p style={{ fontWeight: 700, color: '#4D7111', fontSize: 14, marginBottom: 6 }}>
      Tidak ada hasil untuk "{query}"
    </p>
    <p style={{ fontSize: 12, color: '#aaa', marginBottom: 16 }}>Coba kata kunci lain</p>
    <button
      onClick={onClear}
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: '#4D7111',
        background: '#E2F9CC',
        border: '1px solid #C3E956',
        borderRadius: 10,
        padding: '6px 16px',
        cursor: 'pointer',
      }}
    >
      Hapus pencarian
    </button>
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────
const BankSampahList = () => {
  const [locations, setLocations]   = useState([]);
  const [filtered,  setFiltered]    = useState([]);
  const [query,     setQuery]       = useState('');
  const [isLoading, setIsLoading]   = useState(true);
  const [mapCenter, setMapCenter]   = useState([-6.5944, 106.7895]);
  const [selectedId, setSelectedId] = useState(null);

  // Geolocation state
  const [userPos,    setUserPos]    = useState(null);   // { lat, lng }
  const [geoStatus,  setGeoStatus]  = useState('idle'); // idle | loading | granted | denied | unsupported
  const [geoError,   setGeoError]   = useState('');

  const listRef = useRef(null);

  // ── Fetch bank sampah ──────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const data = await getBankSampahList();
      setLocations(data);
      setFiltered(data);
      if (data.length > 0) setMapCenter([data[0].latitude, data[0].longitude]);
      setIsLoading(false);
    })();
  }, []);

  // ── Recompute distances & sort when userPos changes ────────────────────────
  const withDistances = useCallback(
    (list) => {
      if (!userPos) return list;
      return [...list]
        .map((item) => ({
          ...item,
          _dist: haversine(userPos.lat, userPos.lng, item.latitude, item.longitude),
        }))
        .sort((a, b) => a._dist - b._dist);
    },
    [userPos],
  );

  // ── Search filter ──────────────────────────────────────────────────────────
  useEffect(() => {
    const q = query.toLowerCase().trim();
    const base = q
      ? locations.filter(
          (l) =>
            l.nama.toLowerCase().includes(q) ||
            l.alamat.toLowerCase().includes(q),
        )
      : locations;
    setFiltered(withDistances(base));
  }, [query, locations, withDistances]);

  // ── Request geolocation ────────────────────────────────────────────────────
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('unsupported');
      return;
    }
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserPos({ lat, lng });
        setMapCenter([lat, lng]);
        setGeoStatus('granted');
      },
      (err) => {
        setGeoStatus('denied');
        setGeoError(
          err.code === 1
            ? 'Izin lokasi ditolak. Aktifkan di pengaturan browser.'
            : 'Gagal mendapatkan lokasi.',
        );
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  // ── Select a card & fly map ────────────────────────────────────────────────
  const handleSelect = (item) => {
    setSelectedId(item.id);
    setMapCenter([item.latitude, item.longitude]);
  };

  // ── Scroll selected card into view ────────────────────────────────────────
  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-id="${selectedId}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedId]);

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          gap: 14,
          color: '#4D7111',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <Loader2 size={32} strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 14, fontWeight: 600 }}>Memuat data bank sampah…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const nearestId = filtered[0]?.id;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Search & locate bar ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {/* Search input */}
        <div
          style={{
            flex: 1,
            minWidth: 200,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={16}
            color="#9ab86a"
            style={{ position: 'absolute', left: 14, pointerEvents: 'none' }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau alamat bank sampah…"
            style={{
              width: '100%',
              padding: '12px 40px 12px 42px',
              borderRadius: 14,
              border: '1.5px solid #d4eaaa',
              background: 'rgba(255,255,255,0.9)',
              fontSize: 13,
              fontWeight: 500,
              color: '#1a2e0a',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4D7111';
              e.target.style.boxShadow = '0 0 0 3px #E2F9CC';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d4eaaa';
              e.target.style.boxShadow = 'none';
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#aaa',
                display: 'flex',
                padding: 2,
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Locate me button */}
        <button
          onClick={requestLocation}
          disabled={geoStatus === 'loading'}
          title="Temukan lokasiku & urutkan terdekat"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 18px',
            borderRadius: 14,
            border: 'none',
            background:
              geoStatus === 'granted'
                ? 'linear-gradient(135deg, #4D7111 0%, #6aad1c 100%)'
                : 'rgba(255,255,255,0.9)',
            color: geoStatus === 'granted' ? '#fff' : '#4D7111',
            fontSize: 13,
            fontWeight: 700,
            cursor: geoStatus === 'loading' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            border: geoStatus === 'granted' ? 'none' : '1.5px solid #d4eaaa',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
            boxShadow:
              geoStatus === 'granted'
                ? '0 4px 14px rgba(77,113,17,0.3)'
                : 'none',
          }}
        >
          {geoStatus === 'loading' ? (
            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <LocateFixed size={16} />
          )}
          {geoStatus === 'granted' ? 'Lokasi Aktif' : 'Lokasi Saya'}
        </button>
      </div>

      {/* ── Geo error banner ────────────────────────────────────────────────── */}
      {geoStatus === 'denied' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            background: '#fff8f0',
            border: '1px solid #ffd0a0',
            borderRadius: 12,
            marginBottom: 16,
            fontSize: 12,
            color: '#b45309',
            fontWeight: 600,
          }}
        >
          <AlertCircle size={15} />
          {geoError}
        </div>
      )}

      {/* ── Result count ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, color: '#888', fontWeight: 500, margin: 0 }}>
          Menampilkan{' '}
          <span style={{ fontWeight: 700, color: '#4D7111' }}>{filtered.length}</span>{' '}
          dari <span style={{ fontWeight: 700 }}>{locations.length}</span> bank sampah
          {userPos && (
            <span style={{ marginLeft: 6, color: '#9ab86a' }}>
              · diurutkan berdasarkan jarak
            </span>
          )}
        </p>
        {selectedId && (
          <button
            onClick={() => setSelectedId(null)}
            style={{
              fontSize: 11,
              color: '#aaa',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              padding: 0,
            }}
          >
            Batal pilih
          </button>
        )}
      </div>

      {/* ── Main grid: map + list ────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
        className="bs-grid"
      >
        {/* ── MAP ─────────────────────────────────────────────────────────── */}
        <div
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(77,113,17,0.12)',
            border: '2px solid rgba(195,233,86,0.4)',
            height: 520,
            position: 'sticky',
            top: 100,
          }}
          className="bs-map"
        >
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyTo center={mapCenter} zoom={selectedId ? 15 : 13} />

            {/* User position marker + accuracy circle */}
            {userPos && (
              <>
                <Circle
                  center={[userPos.lat, userPos.lng]}
                  radius={300}
                  pathOptions={{
                    color: '#1a6bb5',
                    fillColor: '#1a6bb5',
                    fillOpacity: 0.08,
                    weight: 1.5,
                    dashArray: '4 4',
                  }}
                />
                <Marker position={[userPos.lat, userPos.lng]} icon={MARKER_BLUE}>
                  <Popup>
                    <div style={{ fontFamily: 'inherit', padding: '2px 0' }}>
                      <strong style={{ color: '#1a6bb5', fontSize: 13 }}>📍 Lokasi Kamu</strong>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}

            {/* Bank sampah markers */}
            {filtered.map((item) => (
              <Marker
                key={item.id}
                position={[item.latitude, item.longitude]}
                icon={selectedId === item.id ? MARKER_LIME : MARKER_GREEN}
                eventHandlers={{ click: () => handleSelect(item) }}
              >
                <Popup>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '4px 2px', maxWidth: 220 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      <Leaf size={13} color="#4D7111" />
                      <strong style={{ fontSize: 13, color: '#1a2e0a', lineHeight: 1.3 }}>
                        {item.nama}
                      </strong>
                    </div>
                    <p style={{ fontSize: 11, color: '#777', margin: '0 0 10px', lineHeight: 1.5 }}>
                      {item.alamat}
                    </p>
                    {item._dist !== undefined && (
                      <DistanceBadge km={item._dist} isNearest={item.id === nearestId} />
                    )}
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`,
                          '_blank',
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginTop: 10,
                        width: '100%',
                        padding: '7px 12px',
                        background: '#4D7111',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        justifyContent: 'center',
                      }}
                    >
                      <Navigation size={11} />
                      Buka Google Maps
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* ── LIST ────────────────────────────────────────────────────────── */}
        <div
          ref={listRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxHeight: 520,
            overflowY: 'auto',
            paddingRight: 4,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C3E956 transparent',
          }}
          className="bs-list"
        >
          {filtered.length === 0 ? (
            <EmptyState query={query} onClear={() => setQuery('')} />
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedId === item.id;
              const isNearest  = userPos && idx === 0;

              return (
                <div
                  key={item.id}
                  data-id={item.id}
                  onClick={() => handleSelect(item)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 18,
                    border: isSelected
                      ? '2px solid #4D7111'
                      : '1.5px solid rgba(195,233,86,0.5)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(77,113,17,0.06), rgba(195,233,86,0.15))'
                      : 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected
                      ? '0 4px 20px rgba(77,113,17,0.15)'
                      : '0 1px 6px rgba(0,0,0,0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#C3E956';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(77,113,17,0.1)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(195,233,86,0.5)';
                      e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.04)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                    }
                  }}
                >
                  {/* Nearest accent bar */}
                  {isNearest && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 4,
                        background: 'linear-gradient(180deg, #4D7111, #C3E956)',
                        borderRadius: '18px 0 0 18px',
                      }}
                    />
                  )}

                  {/* Row 1: index + name + distance */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    {/* Rank badge */}
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        background: isSelected ? '#4D7111' : '#E2F9CC',
                        color: isSelected ? 'white' : '#4D7111',
                        fontSize: 11,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                        transition: 'all 0.2s',
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#1a2e0a',
                          margin: '0 0 5px',
                          lineHeight: 1.35,
                        }}
                      >
                        {item.nama}
                      </p>
                      {/* Distance badge */}
                      {item._dist !== undefined && (
                        <DistanceBadge km={item._dist} isNearest={isNearest} />
                      )}
                    </div>

                    {/* Chevron */}
                    <ChevronRight
                      size={16}
                      color={isSelected ? '#4D7111' : '#ccc'}
                      style={{
                        flexShrink: 0,
                        marginTop: 4,
                        transition: 'color 0.2s, transform 0.2s',
                        transform: isSelected ? 'rotate(90deg)' : 'none',
                      }}
                    />
                  </div>

                  {/* Row 2: address */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 6,
                      marginBottom: 12,
                      paddingLeft: 36,
                    }}
                  >
                    <MapPin size={12} color="#e05252" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p
                      style={{
                        fontSize: 11,
                        color: '#888',
                        margin: 0,
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.alamat}
                    </p>
                  </div>

                  {/* Row 3: action button */}
                  <div style={{ paddingLeft: 36 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`,
                          '_blank',
                        );
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '7px 14px',
                        borderRadius: 10,
                        border: 'none',
                        background: isSelected
                          ? '#4D7111'
                          : 'rgba(77,113,17,0.08)',
                        color: isSelected ? '#fff' : '#4D7111',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#4D7111';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isSelected
                          ? '#4D7111'
                          : 'rgba(77,113,17,0.08)';
                        e.currentTarget.style.color = isSelected ? '#fff' : '#4D7111';
                      }}
                    >
                      <Navigation size={11} />
                      Buka di Google Maps
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }

        .bs-grid {
          grid-template-columns: 3fr 2fr !important;
        }

        @media (max-width: 900px) {
          .bs-grid {
            grid-template-columns: 1fr !important;
          }
          .bs-map {
            position: static !important;
            height: 320px !important;
          }
          .bs-list {
            max-height: 480px !important;
          }
        }

        /* Custom scrollbar for list */
        .bs-list::-webkit-scrollbar { width: 4px; }
        .bs-list::-webkit-scrollbar-track { background: transparent; }
        .bs-list::-webkit-scrollbar-thumb {
          background: #C3E956;
          border-radius: 4px;
        }

        /* Leaflet popup override */
        .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 14px 16px !important;
        }
        .leaflet-popup-tip-container { display: none; }
      `}</style>
    </div>
  );
};

export default BankSampahList;