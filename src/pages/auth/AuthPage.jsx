import { useState } from "react";
import { Leaf, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function AuthPage() {
  // State statis untuk menentukan tampilan: 'login' atau 'register'
  const [mode, setMode] = useState("login");

  // State untuk form input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demo Mode: Mengirim data ${mode} untuk ${formData.username || formData.email}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f0f9e8] via-[#e0fef4] to-[#f7fff0] font-sans p-4 relative overflow-hidden">
      
      {/* Dekorasi Background Halus */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#C3E956]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#4D7111]/10 blur-[120px] pointer-events-none" />

      {/* Card Utama */}
      <div className="w-full max-w-[450px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] p-8 md:p-10 relative z-10 transition-all duration-300 hover:shadow-black/5">
        
        {/* Brand Header (Logo & Nama) */}
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
          
          {/* Input Username (Hanya muncul saat Register atau Login) */}
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
              {mode === "login" && (
                <a href="#forgot" className="text-xs font-semibold text-[#4D7111] hover:underline">
                  Lupa?
                </a>
              )}
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
              />
            </div>
          </div>

          {/* Tombol Submit Utama */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#4D7111] hover:bg-[#3d590e] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#4D7111]/10 hover:shadow-[#4D7111]/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{mode === "login" ? "Masuk Masuk" : "Daftar Akun"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Pembatas Or */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">atau</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Tombol Google Login Terintegrasi Visual */}
        <button
          onClick={() => alert("Demo Mode: Memicu Popup Google Login")}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl border border-gray-200 shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer text-sm"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.052 14.974 0 12 0 7.354 0 3.307 2.655 1.298 6.515l3.968 3.25z"
            />
            <path
              fill="#4285F4"
              d="M23.755 12.23c0-.818-.073-1.605-.205-2.364H12v4.482h6.6c-.287 1.505-1.137 2.777-2.409 3.632l3.75 2.905c2.19-2.023 3.455-4.996 3.455-8.655z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235L1.298 17.485A11.947 11.947 0 0012 24c3.045 0 5.864-1.018 7.941-2.745l-3.75-2.905A7.054 7.054 0 0112 19.091c-2.955 0-5.509-1.832-6.734-4.856z"
            />
            <path
              fill="#34A853"
              d="M1.298 6.515A11.916 11.916 0 000 12c0 1.945.464 3.782 1.298 5.485l4.164-3.414A7.042 7.042 0 014.91 12c0-2.027.854-3.859 2.227-5.16L1.298 6.515z"
            />
          </svg>
          Masuk dengan Google
        </button>

        {/* Footer Toggle Mode */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 font-medium">
            {mode === "login" ? "Belum punya akun EcoVision?" : "Sudah terdaftar sebelumnya?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setFormData({ username: "", email: "", password: "" }); // Reset form
              }}
              className="text-xs font-bold text-[#4D7111] hover:underline focus:outline-none cursor-pointer bg-transparent border-none"
            >
              {mode === "login" ? "Buat Akun Baru" : "Login ke Akun Anda"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}