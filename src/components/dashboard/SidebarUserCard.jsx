import { User, LogIn } from "lucide-react";
import { COLORS } from "@/dashboard/constants/dashboardConfig";

const SidebarUserCard = ({ user, isLoggedIn, onLogin }) => {
  if (isLoggedIn && user) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}12, ${COLORS.lime}28)`,
          borderRadius: 14,
          padding: "14px 16px",
          border: `1px solid ${COLORS.lime}50`,
        }}
      >
        {/* Avatar + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.primary}, #8BC34A)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            {user.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#1a2e0a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#666",
                marginTop: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.email}
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.primary }}>
              {user.totalScans}
            </div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>Scans</div>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: "8px 10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: "#2E7D32" }}>
              {user.ecoPoints.toLocaleString()}
            </div>
            <div style={{ fontSize: 10, color: "#888", marginTop: 1 }}>Eco Pts</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: COLORS.ecoLime,
        borderRadius: 14,
        padding: "16px",
        border: `1px solid ${COLORS.lime}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(77,113,17,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 10px",
        }}
      >
        <User size={22} color={COLORS.primary} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2e0a", marginBottom: 4 }}>
        Guest Mode
      </div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 12 }}>
        Sign in to unlock full features
      </div>
      <button
        onClick={onLogin}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: 8,
          border: "none",
          background: COLORS.primary,
          color: "white",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <LogIn size={14} />
        Sign In Free
      </button>
    </div>
  );
};

export default SidebarUserCard;