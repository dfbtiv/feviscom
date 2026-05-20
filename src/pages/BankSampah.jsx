import React from 'react';
import { useNavigate } from 'react-router-dom';
import BankSampahList from '@/components/BankSampahhList';
import Footer from '@/components/Footer';
import { Map, Leaf, ArrowLeft } from 'lucide-react';

function BankSampah() {
  const navigate = useNavigate();

  return (
    <>
    {/* Tambahkan pt-[120px] atau pt-[140px] agar konten tidak tertabrak Navbar yang fixed */}
    <div className="relative z-10 flex flex-col items-center w-full min-h-screen pt-[130px] md:pt-[150px] pb-12 px-4 md:px-8">
      
      {/* HEADER / HERO SECTION BANK SAMPAH */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 md:mb-10">
        
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold uppercase tracking-wider mb-5 shadow-sm">
          <Map className="w-4 h-4" />
          Jejaring Daur Ulang
        </div> */}
        
        {/* Judul Halaman */}
        <h1 className="text-4xl md:text-[54px] font-black text-primary leading-[1.1] mb-5 font-['Segoe_UI'] tracking-tight">
          Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">Bank Sampah</span> Terdekat
        </h1>
        
        {/* Deskripsi */}
        <p className="text-primary/70 text-sm md:text-base leading-relaxed max-w-2xl font-medium px-4">
          Ubah sampah plastikmu jadi hal yang bernilai. Cek lokasi bank sampah resmi di sekitarmu, pantau jam operasionalnya, dan mulai aksi nyata peduli lingkungan hari ini juga!
        </p>
      </div>

      {/* KONTEN UTAMA (Kompnen Peta & List) */}
      <div className="w-full max-w-7xl mx-auto mb-10">
        <BankSampahList />
      </div>

      {/* SECTION 4: RETURN BUTTON */}
      <div className="w-full pt-8 pb-4">
        <div className="flex flex-col items-center mb-1">
          <button 
            onClick={() => {navigate('/'); window.scrollTo(0,0);}} 
            className="px-6 sm:px-10 py-3 sm:py-4 bg-primary text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:scale-95 flex items-center gap-2 sm:gap-4 font-['Segoe_UI'] text-sm sm:text-base cursor-pointer"
          >
            <ArrowLeft size={20} /> Kembali ke Beranda
          </button>
        </div>
      </div>

    </div>
    
    <Footer className="pb-10" />
    </>
  );
}

export default BankSampah;