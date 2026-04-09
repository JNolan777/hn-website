"use client";

import { useState } from "react";

// export const metadata is not supported in client components, but title is set via document

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "white",
    border: "1px solid var(--c-border)",
    color: "var(--c-text)",
    padding: "14px 16px",
    borderRadius: 10,
    fontSize: "0.95rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--c-muted)",
    marginBottom: 8,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Please fill in your name and message.");
      return;
    }
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } catch {
      // still show success to user
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ fontSize: "4rem", color: "var(--c-green)", marginBottom: "1.5rem" }}>&#10003;</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--c-green)", marginBottom: 12 }}>Message Sent!</h2>
          <p style={{ color: "var(--c-muted)", fontSize: "0.95rem", marginBottom: 32 }}>Thank you for reaching out. We&apos;ll get back to you soon.</p>
          <a href="/" style={{ display: "inline-block", background: "var(--c-green)", color: "var(--c-cream)", padding: "14px 32px", borderRadius: 10, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", padding: "6rem 4vw 4rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <a href="/" style={{ color: "var(--c-muted)", fontSize: "0.95rem", textDecoration: "none" }}>&larr; Back to shop</a>

        <div style={{ textAlign: "center", marginTop: 40, marginBottom: 48 }}>
          <span style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 12 }}>Get in Touch</span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--c-green)", marginBottom: 16 }}>Contact Us</h1>
          <div style={{ width: 60, height: 1, background: "var(--c-gold)", margin: "0 auto", opacity: 0.5 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 24 }}>Reach Us</h3>

            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-green)", marginBottom: 6 }}>Phone</h4>
              <a href="tel:8867863739" style={{ fontSize: "0.95rem", color: "var(--c-muted)", textDecoration: "none" }}>+91 8867863739</a>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-green)", marginBottom: 6 }}>Email</h4>
              <a href="mailto:hello@hnandhairskin.com" style={{ fontSize: "0.95rem", color: "var(--c-muted)", textDecoration: "none" }}>hello@hnandhairskin.com</a>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-green)", marginBottom: 6 }}>Hours</h4>
              <p style={{ fontSize: "0.95rem", color: "var(--c-muted)", lineHeight: 1.7 }}>
                Mon &ndash; Sat: 10am &ndash; 7pm<br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--c-green)", marginBottom: 6 }}>Produced by</h4>
              <p style={{ fontSize: "0.95rem", color: "var(--c-muted)" }}>Synergy&trade;</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 24 }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Full name" />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="your@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Message *</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} style={{ ...inputStyle, resize: "none" as const }} placeholder="How can we help you?" />
              </div>
              <button
                type="submit"
                style={{
                  background: "var(--c-green)",
                  color: "var(--c-cream)",
                  border: "none",
                  padding: "14px 0",
                  borderRadius: 10,
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
