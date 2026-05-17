import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini untuk fungsi logout
import DashboardLayout from "../dashboard/DashboardLayout";
import StatCards from "../components/dashboard/StatCards";
import ScanUpload from "../components/dashboard/ScanUpload";
import RecentScans from "../components/dashboard/RecentScans";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State untuk menyimpan data user asli dari login
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");

  // Ambil data dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user_data");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Kita gabungkan data asli dari DB dengan data mockup statistik (sementara)
      setUser({
        ...parsedUser, 
        // Ambil 2 huruf pertama dari username untuk avatar fallback
        name: parsedUser.username,
        avatar: parsedUser.username.substring(0, 2).toUpperCase(), 
        plan: "Eco-Member",
        scansToday: 2,   // Nanti ini bisa diubah jika ada API statistik asli
        totalScans: 15,
        ecoPoints: 320,
      });
      setIsLoggedIn(true);
    } else {
      // Jika tidak ada token (ada yang iseng ngetik URL /dashboard), tendang ke Auth
      navigate("/auth");
    }
  }, [navigate]);

  const handleNavClick = (item) => {
    if (item.requiresAuth && !isLoggedIn) return;
    setActiveNav(item.id);
  };

  const handleLogout = () => {
    // Hapus sesi dari browser
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    setIsLoggedIn(false);
    navigate("/auth"); // Arahkan kembali ke halaman login
  };

  // Selama data user belum termuat dari localStorage, tampilkan layar kosong/loading
  if (!user) return null; 

  return (
    <DashboardLayout
      user={user}
      isLoggedIn={isLoggedIn}
      activeNav={activeNav}
      onNavClick={handleNavClick}
      onLogout={handleLogout} // Fungsi logout asli disematkan di sini
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
                textTransform: "capitalize", // Membuat huruf depan username jadi kapital
              }}
            >
              {/* Memanggil username asli dari database! */}
              Good morning, {user.username} 👋
            </h1>
            <p
              style={{
                color: "#777",
                fontSize: 14,
                margin: "5px 0 0",
                fontWeight: 400,
              }}
            >
              Here's your environmental impact overview for today
            </p>
          </div>

          {/* Today's scan badge */}
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