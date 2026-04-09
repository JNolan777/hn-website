export default function Hero() {
  return (
    <section
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8f0e0 0%, #f3ede3 45%, #fdf6ee 100%)", padding: "7rem 6vw 4rem" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(74,103,65,0.07) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(181,136,74,0.05) 0%, transparent 50%)" }} />

      <div className="relative z-10">
        <span className="text-[0.65rem] tracking-[0.4em] uppercase mb-5 block animate-fadeUp" style={{ color: "var(--c-gold)" }}>
          A Product of Synergy&trade;
        </span>
        <div className="text-[clamp(5rem,11vw,10rem)] font-light leading-[0.85] animate-fadeUp [animation-delay:0.15s]" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
          H<span style={{ color: "var(--c-gold)" }}>&</span>N
        </div>
        <div className="w-[60px] h-px my-7 animate-fadeUp [animation-delay:0.3s]" style={{ background: "var(--c-gold)" }} />
        <span className="text-[0.7rem] tracking-[0.35em] uppercase block mb-2 animate-fadeUp [animation-delay:0.35s]" style={{ color: "var(--c-muted)" }}>
          Hair & Skin
        </span>
        <p className="italic text-[clamp(1rem,2vw,1.35rem)] mb-10 animate-fadeUp [animation-delay:0.45s]" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green-light)" }}>
          Purely Gentle, Naturally Effective.
        </p>
        <div className="flex gap-2 flex-wrap animate-fadeUp [animation-delay:0.6s]">
          {["100% Natural", "Cruelty Free", "Botanically Crafted"].map((pill) => (
            <span
              key={pill}
              className="bg-white px-4 py-1.5 rounded-full text-[0.68rem] tracking-[0.08em]"
              style={{ border: "1px solid var(--c-border)", color: "var(--c-muted)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 hidden md:flex items-end justify-center gap-8 h-[480px] animate-fadeUp [animation-delay:0.5s]">
        <div className="flex flex-col items-center gap-3 translate-y-[30px]">
          <img src="/images/hibiscus_shampoo.jpg" alt="Hibiscus Shampoo" className="w-[180px] h-[300px] object-cover rounded-[120px] hover:scale-[1.03] transition-transform" style={{ boxShadow: "0 20px 60px rgba(45,74,45,0.15)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span className="text-[0.62rem] tracking-[0.18em] uppercase text-center" style={{ color: "var(--c-muted)" }}>Shampoo</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img src="/images/hair_oil.jpg" alt="Hair Oil" className="w-[180px] h-[300px] object-cover rounded-[120px] hover:scale-[1.03] transition-transform" style={{ boxShadow: "0 20px 60px rgba(45,74,45,0.15)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span className="text-[0.62rem] tracking-[0.18em] uppercase text-center" style={{ color: "var(--c-muted)" }}>Hair Oil</span>
        </div>
        <div className="flex flex-col items-center gap-3 translate-y-5">
          <img src="/images/red_wine_soap.jpg" alt="Soap" className="w-[190px] h-[190px] object-cover rounded-[24px] hover:scale-[1.03] transition-transform" style={{ boxShadow: "0 16px 50px rgba(45,74,45,0.12)", border: "3px solid rgba(255,255,255,0.8)" }} />
          <span className="text-[0.62rem] tracking-[0.18em] uppercase text-center" style={{ color: "var(--c-muted)" }}>Soap</span>
        </div>
      </div>
    </section>
  );
}
