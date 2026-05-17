import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Leaf, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { login, register } from "../../service/api"; // Sesuaikan path ini dengan lokasi api.js kamu

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading button

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Kunci tombol saat memproses

    try {
      if (mode === "login") {
        // PROSES LOGIN
        const res = await login(formData.username, formData.password);
        
        // Simpan token ke localStorage agar sesi user terekam
        localStorage.setItem("access_token", res.token);
        localStorage.setItem("user_data", JSON.stringify(res.user));

        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: `Selamat datang kembali, ${res.user.username}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Arahkan ke dashboard
        navigate("/dashboard");

      } else {
        // PROSES REGISTER
        await register(formData.username, formData.email, formData.password);
        
        Swal.fire({
          icon: "success",
          title: "Registrasi Sukses!",
          text: "Akun berhasil dibuat. Silakan login dengan akun baru Anda.",
          confirmButtonColor: "#4D7111",
        });

        // Ubah mode ke login dan kosongkan form
        setMode("login");
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      // TAMPILKAN ERROR DARI API
      Swal.fire({
        icon: "error",
        title: mode === "login" ? "Login Gagal" : "Registrasi Gagal",
        text: error.message,
        confirmButtonColor: "#4D7111",
      });
    } finally {
      setIsLoading(false); // Buka kunci tombol
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f0f9e8] via-[#e0fef4] to-[#f7fff0] font-sans p-4 relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#C3E956]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#4D7111]/10 blur-[120px] pointer-events-none" />

      {/* Card Utama */}
      <div className="w-full max-w-[450px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] p-8 md:p-10 relative z-10 transition-all duration-300 hover:shadow-black/5">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-[#4D7111] rounded-2xl flex items-center justify-center shadow-lg shadow-[#4D7111]/20 mb-3 animate-bounce-slow">
            <Leaf size={28} className="text-[#C3E956]" />
          </div>
          <h1 className="text-2xl font-black text-[#1a2e0a] tracking-tight flex items-center gap-1.5">
            EcoVision
          </h1>
          <p className="text-sm font-medium text-[#4D7111]/70 mt-1">
            {mode === "login" 
              ? "Selamat datang kembali! Yuk, mulai kelola sampahmu." 
              : "Buat akun gratis untuk menikmati fitur penuh analitik."}
          </p>
        </div>

        {/* Form Handle */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#4D7111] uppercase tracking-wider pl-1">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-4 text-[#4D7111]/50" />
              <input
                type="text"
                name="username"
                placeholder="ex: rival_dev"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-white/80 border border-[#4D7111]/10 focus:border-[#4D7111] focus:ring-2 focus:ring-[#4D7111]/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Input Email (Hanya muncul saat Register) */}
          {mode === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#4D7111] uppercase tracking-wider pl-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-4 text-[#4D7111]/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/80 border border-[#4D7111]/10 focus:border-[#4D7111] focus:ring-2 focus:ring-[#4D7111]/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {/* Input Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-[#4D7111] uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-4 text-[#4D7111]/50" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/80 border border-[#4D7111]/10 focus:border-[#4D7111] focus:ring-2 focus:ring-[#4D7111]/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Tombol Submit Dinamis */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#4D7111] hover:bg-[#3d590e] disabled:bg-[#4D7111]/60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#4D7111]/10 hover:shadow-[#4D7111]/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>{mode === "login" ? "Masuk Sekarang" : "Daftar Akun"}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle Mode */}
        <div className="text-center mt-8 pt-4 border-t border-[#4D7111]/10">
          <p className="text-xs text-gray-500 font-medium">
            {mode === "login" ? "Belum punya akun EcoVision?" : "Sudah terdaftar sebelumnya?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setFormData({ username: "", email: "", password: "" }); 
              }}
              disabled={isLoading}
              className="text-xs font-bold text-[#4D7111] hover:underline focus:outline-none cursor-pointer bg-transparent border-none disabled:opacity-50"
            >
              {mode === "login" ? "Buat Akun Baru" : "Login ke Akun Anda"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}