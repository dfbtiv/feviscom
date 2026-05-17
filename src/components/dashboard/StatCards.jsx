import { Scan, TrendingUp, Recycle, Clock, Shield } from "lucide-react";
import { STAT_CARDS } from "@/dashboard/constants/dashboardConfig";

const ICON_MAP = { Scan, TrendingUp, Recycle, Clock };

const StatCards = ({ isLoggedIn }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {STAT_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon];
        const isLocked = card.requiresAuth && !isLoggedIn;

        return (
          <div
            key={card.label}
            style={{
              background: isLocked ? "#f7f7f7" : "white",
              borderRadius: 16,
              padding: "18px 20px",
              border: "1px solid rgba(77,113,17,0.1)",
              position: "relative",
              overflow: "hidden",
              opacity: isLocked ? 0.65 : 1,
              transition: "transform 0.15s, box-shadow 0.15s",
              cursor: isLocked ? "not-allowed" : "default",
            }}
          >
            {/* Decorative circle */}
            <div
              style={{
                position: "absolute",
                top: -12,
                right: -12,
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: card.bg,
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />

            {/* Icon badge */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: card.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Icon size={18} color={card.color} strokeWidth={2} />
            </div>

            {/* Value */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1a2e0a",
                letterSpacing: "-0.5px",
                minHeight: 28,
              }}
            >
              {isLocked ? (
                <span style={{ color: "#ccc" }}>—</span>
              ) : (
                card.value
              )}
            </div>

            {/* Label */}
            <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginTop: 2 }}>
              {card.label}
            </div>

            {/* Sub-label */}
            <div style={{ fontSize: 11, color: isLocked ? "#bbb" : "#999", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
              {isLocked ? (
                <>
                  <Shield size={10} color="#ccc" />
                  Login to view
                </>
              ) : (
                card.sub
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;