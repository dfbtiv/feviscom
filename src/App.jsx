import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Impact from './pages/Impact';
import Navbar from './components/Navbar';
import Background from './components/Background';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard'; 
import AuthPage from './pages/auth/AuthPage';

// 1. Buat Wadah untuk Halaman Publik (Company Profile)
// Semua halaman di dalam sini akan memiliki Background dan Navbar utama
const PublicLayout = () => {
  return (
    <>
      <Background />
      <Navbar />
      {/* <Outlet /> adalah tempat di mana komponen Home atau Impact akan dirender */}
      <Outlet /> 
    </>
  );
};

// 2. Buat Wadah untuk Halaman Dashboard
// Di sini KITA TIDAK MEMASANG <Navbar /> agar tidak bertabrakan dengan header dashboard
const AppDashboardLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        
        {/* KELOMPOK 1: Rute Publik (Pakai Navbar) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/impact" element={<Impact />} />
        </Route>

        {/* RUTE STANDALONE (Bebas, Polos, Tanpa Bungkus) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* KELOMPOK 2: Rute Dashboard */}
        <Route element={<AppDashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}
export default App;