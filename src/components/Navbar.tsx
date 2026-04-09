"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

const NAV_LINKS = [
  { href: "#soaps", label: "Soaps" },
  { href: "#body", label: "Body Care" },
  { href: "#hair", label: "Hair Care" },
  { href: "#about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1rem 4vw", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(250,247,242,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--c-border)" }}>
        <a href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--c-green)", textDecoration: "none", fontWeight: 600 }}>
          H<span style={{ color: "var(--c-gold)" }}>&</span>N
        </a>

        {/* Desktop nav */}
        <ul style={{ display: "flex", gap: 32, listStyle: "none", alignItems: "center" }} className="hide-mobile">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} style={{ color: "var(--c-muted)", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.2s" }}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="hide-mobile">
            <SearchBar />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            style={{ background: "transparent", border: "1px solid var(--c-border)", color: "var(--c-gold)", padding: "8px 14px", borderRadius: 6, cursor: "pointer", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)" }}
          >
            Cart
            <span style={{ background: "var(--c-gold)", color: "white", borderRadius: "50%", width: 20, height: 20, fontSize: "0.65rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, bottom: 0, background: "var(--c-cream)", zIndex: 99, padding: "2rem 6vw", display: "flex", flexDirection: "column", gap: 0 }} className="show-mobile">
          <div style={{ marginBottom: 24 }}>
            <SearchBar />
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "16px 0", fontSize: "1.1rem", color: "var(--c-green)", textDecoration: "none", borderBottom: "1px solid var(--c-border)", fontFamily: "var(--font-serif)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}
