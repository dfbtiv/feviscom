const learnWrapper = "w-[90%] max-w-[1280px] mx-auto py-32 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center";
  
const Learn = () => {
  const categories = [
    { name: 'Plastics', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { name: 'Organic', color: 'bg-green-100', textColor: 'text-green-600' },
    { name: 'E-Waste', color: 'bg-red-100', textColor: 'text-red-600' },
    { name: 'Paper', color: 'bg-yellow-100', textColor: 'text-yellow-600' },
  ];

  return (
    <section id="learn" className={learnWrapper}>
      
      {/* Kiri: Teks */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <span className="w-4 h-4">icon </span> Environmental Awareness
        </div>
        <h2 className="text-4xl font-extrabold text-primary leading-tight">
          Knowledge is the key to <br /> sustainability.
        </h2>
        <p className="text-primary/70 leading-relaxed max-w-md">
          Understanding waste categories ensures proper disposal. Our comprehensive guide helps you identify materials, avoid contamination, and make eco-friendly choices.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-lime text-primary font-bold rounded-full hover:shadow-lg transition-all">
          Learn More <span>→</span>
        </button>
      </div>

      {/* Kanan: Grid Kartu */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className={`${cat.color} aspect-square rounded-[32px] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
            <span className={`font-bold text-lg ${cat.textColor}`}>{cat.name}</span>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Learn;