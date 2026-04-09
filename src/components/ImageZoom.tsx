"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div
        onClick={() => setZoomed(true)}
        style={{ cursor: "zoom-in", position: "relative", width: "100%", height: "100%" }}
      >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="50vw" priority />
      </div>
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out", padding: "2rem",
          }}
        >
          <div style={{ position: "relative", width: "90vw", height: "90vh", maxWidth: 900 }}>
            <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} sizes="90vw" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setZoomed(false); }}
            aria-label="Close zoom"
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "white", fontSize: "2rem", cursor: "pointer" }}
          >
            &#10005;
          </button>
        </div>
      )}
    </>
  );
}
