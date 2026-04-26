const Card = () => {
  return (
    // Kita panggil 'glass-effect' lagi, tapi kali ini bentuknya 'rounded-2xl' (kotak melengkung)
    <div className="glass-effect p-8 rounded-2xl w-80 hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
      <h3 className="text-xl font-bold text-slate-800 mb-3">Ini Judul Card</h3>
      <p className="text-slate-600">
        Lihat! Card ini punya efek kaca yang sama persis dengan Navbar, tapi bentuknya beda. Kodenya jadi sangat rapi, kan?
      </p>
    </div>
  )
}

export default Card