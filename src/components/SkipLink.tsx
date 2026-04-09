"use client";

export default function SkipLink() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <style>{`
        .skip-link {
          position: absolute; left: -9999px; top: 0; z-index: 999;
          background: var(--c-green); color: white; padding: 8px 16px;
          font-size: 0.9rem; text-decoration: none;
        }
        .skip-link:focus { left: 0; }
      `}</style>
    </>
  );
}
