import { ChevronRight, Shield } from "lucide-react";
import { NAV_ITEMS, COLORS } from "@/dashboard/constants/dashboardConfig";

const SidebarNav = ({ activeNav, isLoggedIn, onNavClick }) => {
  return (
    <nav style={{ flex: 1, padding: "0 12px" }}>
      {NAV_ITEMS.map((group) => (
        <div key={group.group} style={{ marginBottom: 8 }}>
          {/* Group label */}
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#aaa",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              padding: "8px 8px 4px",
            }}
          >
            {group.group}
          </div>

          {/* Items */}
          {group.items.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            const isLocked = item.requiresAuth && !isLoggedIn;

            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item)}
                title={isLocked ? "Login required" : item.label}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: isActive
                    ? `linear-gradient(135deg, ${COLORS.primary}18, ${COLORS.lime}25)`
                    : "transparent",
                  color: isLocked ? "#bbb" : isActive ? COLORS.primary : "#555",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  cursor: isLocked ? "not-allowed" : "pointer",
                  textAlign: "left",
                  marginBottom: 2,
                  position: "relative",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: "0 3px 3px 0",
                      background: COLORS.primary,
                    }}
                  />
                )}

                <Icon
                  size={17}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isLocked ? "#ccc" : isActive ? COLORS.primary : "#777"}
                />
                <span style={{ flex: 1 }}>{item.label}</span>

                {isLocked && <Shield size={12} color="#ccc" />}
                {isActive && !isLocked && <ChevronRight size={13} color={COLORS.primary} />}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
};

export default SidebarNav;