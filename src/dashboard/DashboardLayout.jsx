import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Sidebar from "../components/dashboard/Sidebar";

/**
 * DashboardLayout
 *
 * Provides the full-page shell:
 *   - Fixed header  (DashboardHeader)
 *   - Persistent sidebar on desktop
 *   - Slide-in overlay sidebar on mobile
 *   - <main> content slot (children)
 *
 * Props:
 *   user         — user object (or null for guest)
 *   isLoggedIn   — boolean
 *   activeNav    — currently active nav item id
 *   onNavClick   — (navItem) => void
 *   onLogin      — () => void
 *   onLogout     — () => void
 *   children     — page content rendered inside <main>
 */
const DashboardLayout = ({
  user,
  isLoggedIn,
  activeNav,
  onNavClick,
  onLogin,
  onLogout,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (item) => {
    onNavClick?.(item);
    setMobileOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0f9e8 0%, #e0fef4 50%, #f7fff0 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top bar ─────────────────────────────── */}
      <DashboardHeader
        user={user}
        isLoggedIn={isLoggedIn}
        onLogin={onLogin}
        menuOpen={mobileOpen}
        onMenuToggle={() => setMobileOpen((v) => !v)}
      />

      {/* ── Below header ────────────────────────── */}
      <div style={{ display: "flex", paddingTop: 64, minHeight: "100vh" }}>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 49,
              background: "rgba(0,0,0,0.28)",
              backdropFilter: "blur(2px)",
            }}
          />
        )}

        {/* Mobile sidebar (slide-in) */}
        <Sidebar
          user={user}
          isLoggedIn={isLoggedIn}
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onLogin={onLogin}
          onLogout={onLogout}
          style={{
            position: "fixed",
            top: 64,
            left: mobileOpen ? 0 : -280,
            bottom: 0,
            zIndex: 50,
            transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
            /* shown only on mobile — hidden via inline media query trick below */
          }}
          className="sidebar-mobile"
        />

        {/* Desktop sidebar (always visible) */}
        <Sidebar
          user={user}
          isLoggedIn={isLoggedIn}
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onLogin={onLogin}
          onLogout={onLogout}
          className="sidebar-desktop"
        />

        {/* ── Main content area ─────────────────── */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: "28px 28px 48px",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>

      {/* ── Responsive styles ───────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* Desktop: show static sidebar, hide mobile slide-in, hide hamburger */
        .sidebar-desktop { display: flex !important; }
        .sidebar-mobile  { display: none  !important; }
        .dashboard-hamburger { display: none !important; }

        /* Mobile: flip everything */
        @media (max-width: 768px) {
          .sidebar-desktop  { display: none  !important; }
          .sidebar-mobile   { display: flex  !important; }
          .dashboard-hamburger { display: flex !important; }
          .dashboard-username  { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;