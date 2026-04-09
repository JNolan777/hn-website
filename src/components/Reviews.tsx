"use client";

import { REVIEWS } from "@/lib/products";

export default function Reviews() {
  return (
    <section style={{ background: "var(--c-bg2)", padding: "5rem 8vw" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>Testimonials</span>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--c-green)" }}>What Our Customers Say</h2>
        <div style={{ width: 60, height: 1, background: "var(--c-gold)", margin: "1.5rem auto 0", opacity: 0.5 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
        {REVIEWS.map((review, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: "2rem", border: "1px solid var(--c-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
              {Array.from({ length: review.rating }).map((_, j) => (
                <span key={j} style={{ color: "var(--c-gold)", fontSize: "1rem" }}>&#9733;</span>
              ))}
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--c-text)", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>
              &ldquo;{review.text}&rdquo;
            </p>
            <div>
              <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--c-green)" }}>{review.name}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--c-muted)", marginLeft: 8 }}>{review.location}</span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--c-gold)", marginTop: 4, display: "block" }}>{review.product}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
