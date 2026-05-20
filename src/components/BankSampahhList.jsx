import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getBankSampahList } from '../service/api';

// Impor CSS Leaflet wajib agar peta tidak berantakan
import 'leaflet/dist/leaflet.css';

// 🔥 Trik Wajib: Perbaikan Bug Icon Marker Leaflet yang sering hilang di React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Komponen bantuan untuk menggerakkan kamera peta secara halus
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const BankSampahList = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set pusat peta default di sekitar Kota Bogor Tengah
  const [mapCenter, setMapCenter] = useState([-6.5944, 106.7895]); 

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getBankSampahList();
      setLocations(data);
      if (data.length > 0) {
        // Otomatis pusatkan peta ke bank sampah pertama saat data masuk
        setMapCenter([data[0].latitude, data[0].longitude]);
      }
      setIsLoading(false);
    };
    fetchLocations();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12 font-bold text-primary animate-pulse">Memuat peta dan lokasi...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-primary">Peta Bank Sampah Bogor</h2>
        <p className="text-sm text-primary/60 font-medium">
          Klik lokasi untuk melihat rincian atau arahkan peta ke bank sampah pilihanmu.
        </p>
      </div>

      {/* Grid Utama: Kombinasi Peta dan List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* KOLOM PETA (Memakan ruang 3/5 bagian di layar besar) */}
        <div className="lg:col-span-3 w-full h-[400px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-xl border-2 border-white/50 relative z-10">
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            className="w-full h-full"
            scrollWheelZoom={true}
          >
            {/* Menggunakan peta gratisan dari OpenStreetMap */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Mengubah koordinat ke fungsi terbang peta */}
            <ChangeMapCenter center={mapCenter} />

            {/* Looping untuk menggambar pin marker di atas peta */}
            {locations.map((item) => (
              <Marker 
                key={item.id} 
                position={[item.latitude, item.longitude]}
              >
                <Popup>
                  <div className="p-1 max-w-[200px]">
                    <h4 className="font-bold text-sm text-primary mb-1">{item.nama}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{item.alamat}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* KOLOM DAFTAR KARTU (Memakan ruang 2/5 bagian) */}
        <div className="lg:col-span-2 space-y-3 max-h-[550px] overflow-y-auto pr-1 hide-scrollbar">
          {locations.map((item) => {
            const isSelected = mapCenter[0] === item.latitude && mapCenter[1] === item.longitude;
            
            return (
              <div 
                key={item.id} 
                onClick={() => setMapCenter([item.latitude, item.longitude])}
                className={`p-5 rounded-[24px] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? "bg-gradient-to-br from-lime/20 to-white border-lime shadow-md scale-[0.99]" 
                    : "bg-white/50 backdrop-blur-md border-white/60 hover:bg-white/80 shadow-sm"
                }`}
              >
                <div>
                  <h3 className="font-extrabold text-base text-primary mb-1.5 leading-tight">{item.nama}</h3>
                  <p className="text-xs text-primary/70 flex items-start gap-1.5 font-medium">
                    <MapPin size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item.alamat}</span>
                  </p>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-primary/5">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah efek klik kartu bertabrakan
                      
                      // Gunakan format /maps/search/ agar pin merah menancap akurat di HP & Web
                      window.open(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`, '_blank');
                    }}
                    className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.99]"
                  >
                    <Navigation size={12} />
                    Buka di Google Maps
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BankSampahList;