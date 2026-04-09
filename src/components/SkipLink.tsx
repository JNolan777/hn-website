"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{ position: "absolute", left: "-9999px", top: 0, zIndex: 999, background: "var(--c-green)", color: "white", padding: "8px 16px", fontSize: "0.9rem", textDecoration: "none" }}
      onFocus={(e) => { e.currentTarget.style.left = "0"; }}
      onBlur={(e) => { e.currentTarget.style.left = "-9999px"; }}
    >
      Skip to content
    </a>
  );
}
