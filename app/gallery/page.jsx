"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeGallery from "../components/HomeGallery";

/* Pehle is page ka apna alag masonry + lightbox tha. Do jagah do alag
   galleries rakhne ka matlab tha: har sudhaar do baar karna, aur yahan
   toot chuki photos ka skeleton hamesha ghoomta rehta tha (onLoad kabhi
   chalta hi nahi tha). Ab wahi component jo homepage par hai. */

const IG_HANDLE = "valleyrunofficial";

export default function GalleryPage() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data?.success ? data.events || [] : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const total = events.reduce((n, e) => n + (e.gallery || []).length, 0);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{ background: "#0a0a0a", position: "relative", overflow: "hidden", padding: "132px 20px 44px", textAlign: "center" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: .3,
          backgroundImage: "radial-gradient(ellipse at 50% 0%, #c0392b 0%, transparent 62%)",
        }}/>
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", color: "#e57368", padding: "6px 16px", borderRadius: 100,
            background: "rgba(192,57,43,.18)", border: "1px solid rgba(192,57,43,.35)", marginBottom: 18,
          }}>
            Community
          </span>
          <h1 className="vrg-page-h1" style={{ fontSize: 60, fontWeight: 900, letterSpacing: "-2.5px", lineHeight: 1.02, color: "#fff" }}>
            Runner Gallery
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", marginTop: 16, lineHeight: 1.7 }}>
            Real people. Real runs. Real medals. Every photo here is a finish line
            someone earned.
          </p>
        </div>
      </div>

      {/* ── Wall ──
          Homepage wala hi component: event ke chips, lightbox, aur jo photo
          na khule wo apne aap hat jaati hai. */}
      {loading ? (
        <div style={{ background: "#0a0a0a", padding: "80px 20px", textAlign: "center", color: "rgba(255,255,255,.4)", fontSize: 14 }}>
          Loading photos…
        </div>
      ) : total > 0 ? (
        <HomeGallery events={events} showHeading={false} initial={24} padded={false} />
      ) : (
        <div style={{ background: "#0a0a0a", minHeight: "50vh", padding: "90px 20px", textAlign: "center" }}>
          <div style={{
            width: 76, height: 76, borderRadius: 20, margin: "0 auto 20px", fontSize: 34,
            background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            📸
          </div>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>No photos yet</p>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, lineHeight: 1.7 }}>
            Finish a challenge and post your medal photo tagging{" "}
            <a href={`https://www.instagram.com/${IG_HANDLE}/`} target="_blank" rel="noopener noreferrer"
              style={{ color: "#e57368", fontWeight: 700 }}>
              @{IG_HANDLE}
            </a>{" "}
            — we feature runners here.
          </p>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .vrg-page-h1{font-size:38px!important;letter-spacing:-1px!important}
        }
      `}</style>
    </>
  );
}
