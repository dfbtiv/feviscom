import { useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import StatCards from "../components/dashboard/StatCards";
import ScanUpload from "../components/dashboard/ScanUpload";
import RecentScans from "../components/dashboard/RecentScans";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

// ─── Mock user — replace with your auth context / store ───────────────────────
const MOCK_USER = {
  isLoggedIn: true,
  name: "Rizky Pratama",
  email: "rizky@example.com",
  avatar: "RP",
  plan: "Pro",
  scansToday: 8,
  totalScans: 142,
  ecoPoints: 2340,
};
// ──────────────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(MOCK_USER.isLoggedIn);
  const [activeNav, setActiveNav] = useState("overview");

  const user = isLoggedIn ? MOCK_USER : null;

  const handleNavClick = (item) => {
    if (item.requiresAuth && !isLoggedIn) return;
    setActiveNav(item.id);
    // TODO: swap out the content area based on item.id
  };

  return (
    <DashboardLayout
      user={user}
      isLoggedIn={isLoggedIn}
      activeNav={activeNav}
      onNavClick={handleNavClick}
      onLogin={() => setIsLoggedIn(true)}
      onLogout={() => setIsLoggedIn(false)}
    >
      {/* ── Page heading ──────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#1a2e0a",
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              {isLoggedIn
                ? `Good morning, ${user.name.split(" ")[0]} 👋`
                : "Welcome to EcoVision"}
            </h1>
            <p
              style={{
                color: "#777",
                fontSize: 14,
                margin: "5px 0 0",
                fontWeight: 400,
              }}
            >
              {isLoggedIn
                ? "Here's your environmental impact overview for today"
                : "Start scanning plastic waste to learn its impact"}
            </p>
          </div>

          {/* Today's scan badge — logged-in only */}
          {isLoggedIn && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#E2F9CC",
                border: "1px solid #C3E956",
                borderRadius: 12,
                padding: "8px 14px",
              }}
            >
              <span style={{ fontSize: 16 }}>🌿</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4D7111" }}>
                {user.scansToday} scans today
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Stat cards ────────────────────────────────── */}
      <StatCards isLoggedIn={isLoggedIn} />

      {/* ── Scan upload + Recent scans (2-col) ──────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 20,
          marginBottom: 24,
          alignItems: "stretch",
        }}
      >
        <ScanUpload
          onScan={(file) => {
            // TODO: send `file` to your FastAPI endpoint
            console.log("Scanning file:", file.name);
          }}
        />
        <RecentScans
          isLoggedIn={isLoggedIn}
          onViewAll={() => handleNavClick({ id: "history", requiresAuth: true })}
        />
      </div>

      {/* ── Analytics chart ───────────────────────────── */}
      <AnalyticsChart isLoggedIn={isLoggedIn} />
    </DashboardLayout>
  );
};

export default Dashboard;