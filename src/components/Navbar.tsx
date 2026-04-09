"use client";

import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between backdrop-blur-[12px]" style={{ padding: "1.4rem 4vw", background: "rgba(250,247,242,0.92)", borderBottom: "1px solid var(--c-border)" }}>
      <a href="/" className="text-[1.8rem] no-underline font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--c-green)" }}>
        H<span style={{ color: "var(--c-gold)" }}>&</span>N
      </a>
      <ul className="hidden md:flex gap-10 list-none items-center">
        {[
          { href: "#soaps", label: "Soaps" },
          { href: "#body", label: "Body Care" },
          { href: "#hair", label: "Hair Care" },
          { href: "#about", label: "Our Story" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <li key={link.href}>
            <a href={link.href} className="no-underline text-[0.82rem] tracking-[0.15em] uppercase transition-colors" style={{ color: "var(--c-muted)" }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent cursor-pointer text-[0.8rem] tracking-[0.12em] uppercase flex items-center gap-2 transition-all rounded-md"
        style={{ fontFamily: "var(--font-sans)", color: "var(--c-gold)", border: "1px solid var(--c-border)", padding: "0.6rem 1.2rem" }}
      >
        Cart
        <span className="rounded-full w-[20px] h-[20px] text-[0.68rem] font-medium flex items-center justify-center text-white" style={{ background: "var(--c-gold)" }}>
          {totalItems}
        </span>
      </button>
    </nav>
  );
}
