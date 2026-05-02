import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import Footer from '../components/Footer';
import { LeafIcon, Globe, Info, ArrowLeft } from 'lucide-react';

const Impact = () => {
    const navigate = useNavigate();

    // Styles disamakan dengan Hero untuk konsistensi
    const containerStyle = "max-w-6xl mx-auto px-8 relative z-10";
    
    // Menggunakan min-h-screen dan flex-col justify-center agar layout seimbang selayar laptop
    const heroWrapper = `flex flex-col items-center justify-center min-h-screen pt-[120px] pb-[60px] ${containerStyle}`;
    
    const badgeStyle = "px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold flex items-center gap-2 cursor-default";
    
    // Font size disamakan dengan Hero (75px) dan tracking dirapatkan
    const titleStyle = "text-primary text-center font-['Segoe_UI'] text-[75px] font-normal leading-[1.1] tracking-[-4.8px]";
    const titleBoldStyle = "font-bold font-['Segoe_UI'] text-[75px]";
    
    // Jarak margin (mb) dikurangi agar tidak kejauhan
    const descStyle = "w-full max-w-[748px] text-primary/80 text-center font-['Segoe_UI'] text-[20px] font-normal leading-relaxed mb-10 mt-4";
    
    const glassCardStyle = "w-full bg-white/40 backdrop-blur-md border border-white/20 rounded-[40px] p-8 md:p-10 shadow-xl shadow-black/5 mb-12 transition-all hover:bg-white/50";
    const buttonStyle = "px-10 py-4 bg-primary text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:bg-primary/90 hover:-translate-y-1 active:scale-95";

    const wasteMatrix = [
        { name: 'Botol Plastik', recyclability: 'Highly Recyclable', tech: 'Structural contouring', icon: <LeafIcon className="text-blue-500" /> },
        { name: 'Kantong Kresek', recyclability: 'Hard to Recycle', tech: 'Texture & Fold mapping', icon: <LeafIcon className="text-slate-400" /> },
        { name: 'Bungkus Kemasan', recyclability: 'Non-Recyclable', tech: 'Multi-layer pattern', icon: <LeafIcon className="text-orange-500" /> },
    ];

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-transparent">
            <div className="relative z-50">
                <Navbar />
            </div>
        
            <Background />

            <section id="impact-hero" className={heroWrapper}>
                {/* Badge & Title Group - Jarak dirapatkan (gap-1) */}
                <div className="flex flex-col items-center gap-1">
                    <div className={badgeStyle}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Our Impact Goals
                    </div>

                    <h1 className={titleStyle}>
                        <span className={titleBoldStyle}>Ecovision:</span> AI Sustainability
                    </h1>
                </div>

                <p className={descStyle}>
                    A Software Engineering initiative utilizing YOLOv8 for real-time waste detection
                    and Generative AI for personalized waste handling insights.
                </p>

                {/* SDG Card - Terlihat sedikit di bagian bawah layar laptop (peek effect) */}
                <div className={`${glassCardStyle} flex flex-col md:flex-row gap-8 items-start border-l-[6px] border-l-red-500 text-left`}>
                    <div className="bg-red-50 p-4 rounded-3xl flex items-center justify-center min-w-[80px] h-[80px] shadow-inner">
                        <div className="w-10 h-10 rounded-full border-4 border-red-500 flex items-center justify-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lime-800 text-2xl font-bold mb-3">Our Contribution to SDG 12</h2>
                        <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                            Target 12.5: By 2030, substantially reduce waste generation melalui pencegahan, pengurangan, daur ulang, dan penggunaan kembali.
                        </p>
                        <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" className="text-red-500 font-bold text-sm flex items-center gap-2 hover:underline">
                            <Globe size={16} /> View Full UN Target Data
                        </a>
                    </div>
                </div>

                {/* Matrix Grid & Button */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                    {wasteMatrix.map((item, idx) => (
                        <div key={idx} className="bg-white/40 backdrop-blur-md border border-white/30 rounded-[32px] p-6 hover:shadow-2xl transition-all duration-500 group text-left">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-white/80 p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span className="text-slate-400 italic">Recyclability</span>
                                    <span className={item.recyclability.includes('Non') ? 'text-rose-600' : 'text-emerald-600'}>
                                        {item.recyclability}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[9px] border-t border-primary/10 pt-3">
                                    <span className="text-slate-400 flex items-center gap-1"><Info size={10}/> AI Role</span>
                                    <span className="text-primary/70">{item.tech}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => {
                        navigate('/');
                        window.scrollTo(0, 0); 
                    }} 
                    className={`${buttonStyle} flex items-center gap-4`}
                >
                    <ArrowLeft size={20} />
                    Return to Home
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default Impact;