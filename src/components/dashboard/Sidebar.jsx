import { LogOut } from "lucide-react";
import SidebarUserCard from "./SidebarUserCard";
import SidebarNav from "./SidebarNav";

const sidebarStyle = {
  width: 260,
  flexShrink: 0,
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(20px)",
  borderRight: "1px solid rgba(77,113,17,0.1)",
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
};

const Sidebar = ({
  user,
  isLoggedIn,
  activeNav,
  onNavClick,
  onLogin,
  onLogout,
  style = {},
}) => {
  return (
    <aside style={{ ...sidebarStyle, ...style }}>
      {/* User card */}
      <div style={{ padding: "20px 16px 16px" }}>
        <SidebarUserCard user={user} isLoggedIn={isLoggedIn} onLogin={onLogin} />
      </div>

      {/* Navigation */}
      <SidebarNav activeNav={activeNav} isLoggedIn={isLoggedIn} onNavClick={onNavClick} />

      {/* Footer */}
      <div
        style={{
          padding: "12px 16px 24px",
          borderTop: "1px solid rgba(77,113,17,0.08)",
        }}
      >
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(239,83,80,0.2)",
              background: "rgba(239,83,80,0.05)",
              color: "#c62828",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        ) : (
          <div style={{ fontSize: 11, color: "#bbb", textAlign: "center" }}>
            EcoVision v2.1.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;