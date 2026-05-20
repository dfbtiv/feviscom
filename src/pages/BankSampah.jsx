import React from 'react';
import BankSampahList from '@/components/BankSampahhList';
import { Map, Leaf } from 'lucide-react';

function BankSampah() {
  return (
    // Tambahkan pt-[120px] atau pt-[140px] agar konten tidak tertabrak Navbar yang fixed
    <div className="relative z-10 flex flex-col items-center w-full min-h-screen pt-[130px] md:pt-[150px] pb-12 px-4 md:px-8">
      
      {/* HEADER / HERO SECTION BANK SAMPAH */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 md:mb-10">
        
        {/* Badge ala EcoVision */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold uppercase tracking-wider mb-5 shadow-sm">
          <Map className="w-4 h-4" />
          Jejaring Daur Ulang
        </div>
        
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
      <div className="w-full max-w-7xl mx-auto">
        <BankSampahList />
      </div>

    </div>
  );
}

export default BankSampah;