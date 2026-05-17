import { History, Recycle, Shield } from "lucide-react";
import { RECENT_SCANS, COLORS } from "@/dashboard/constants/dashboardConfig";

const statusColors = {
  recyclable: {
    bg: COLORS.ecoLime,
    icon: COLORS.primary,
    text: COLORS.primary,
  },
  "non-recyclable": {
    bg: "#FFF3E0",
    icon: "#E65100",
    text: "#E65100",
  },
};

const RecentScans = ({ isLoggedIn, onViewAll, scans = RECENT_SCANS }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "24px",
        border: "1px solid rgba(77,113,17,0.1)",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <History size={18} color={COLORS.primary} />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a2e0a", margin: 0 }}>
            Recent Scans
          </h2>
        </div>

        {isLoggedIn && (
          <button
            onClick={onViewAll}
            style={{
              fontSize: 12,
              color: COLORS.primary,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              padding: 0,
            }}
          >
            View all →
          </button>
        )}
      </div>

      {/* Content */}
      {isLoggedIn ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {scans.map((scan) => {
            const colors = statusColors[scan.status] ?? statusColors["recyclable"];
            return (
              <div
                key={scan.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  background: "#fafafa",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
              >
                {/* Plastic type icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: colors.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Recycle size={16} color={colors.icon} />
                </div>

                {/* Name + time */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1a2e0a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {scan.type}
                  </div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>{scan.time}</div>
                </div>

                {/* Confidence + status */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: scan.confidence >= 90 ? "#2E7D32" : "#E65100",
                    }}
                  >
                    {scan.confidence}%
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: colors.text,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {scan.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Locked state */
        <div
          style={{
            textAlign: "center",
            padding: "36px 20px",
            background: "#f9f9f9",
            borderRadius: 12,
          }}
        >
          <Shield size={32} color="#ddd" style={{ marginBottom: 12 }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: "#aaa", marginBottom: 4 }}>
            Login to view scan history
          </div>
          <div style={{ fontSize: 11, color: "#ccc" }}>
            Your scans are saved automatically
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentScans;