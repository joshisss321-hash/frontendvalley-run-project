"use client";

import { useEffect, useState } from "react";

/**
 * Registration band hone se pehle ki urgency — sirf sachchi baaton par.
 *
 * Dono event cards (homepage aur /challenges) yahi istemaal karte hain.
 *
 * ⚠️ Yahan "sirf 50 slots bache" jaisa kuch MAT jodna jab tak event mein
 *    asli limit na ho. Abhi koi limit nahi hai — aisa likhna jhooth hoga,
 *    aur CCPA ke Dark Patterns Guidelines (2023) "false urgency" ko
 *    saaf-saaf mana karte hain. Deadline aur ginti sach hain, wahi dikhao.
 */

const HOUR = 3600000;

/** Deadline tak kitna waqt — har second update. Mount se pehle null (hydration safe). */
export function useTimeLeft(deadline) {
  const [ms, setMs] = useState(null);

  useEffect(() => {
    if (!deadline) return;
    const target = new Date(deadline).getTime();
    if (isNaN(target)) return;

    const tick = () => setMs(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return ms;
}

/**
 *   "final"   — 3 ghante se kam
 *   "lastDay" — 24 ghante se kam
 *   null      — abhi aaram hai
 */
export const urgencyLevel = (ms) => {
  if (ms == null || ms <= 0) return null;
  if (ms < 3 * HOUR) return "final";
  if (ms < 24 * HOUR) return "lastDay";
  return null;
};

/** Button ka text — waqt ke hisaab se */
export const ctaLabel = (level) =>
  level === "final"   ? "Register now — closing soon →"
  : level === "lastDay" ? "Register before it closes →"
  : "View & register";

/* Blink + dhadkan. Koi agar motion band rakhta hai (accessibility), to animation nahi. */
const Styles = () => (
  <style>{`
    @keyframes vr-blink  { 0%,100%{opacity:1} 50%{opacity:.35} }
    @keyframes vr-throb  { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(220,38,38,.55)}
                           50%{transform:scale(1.04);box-shadow:0 0 0 6px rgba(220,38,38,0)} }
    @media (prefers-reduced-motion: reduce) {
      .vr-blink, .vr-throb { animation: none !important; }
    }
  `}</style>
);

/** Photo ke upar wala badge — normal mein "Live Now", aakhri din "LAST DAY" */
export function UrgencyBadge({ deadline }) {
  const level = urgencyLevel(useTimeLeft(deadline));

  if (!level) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: "#c0392b", color: "#fff", fontSize: 11, fontWeight: 700,
        padding: "6px 14px", borderRadius: 30, letterSpacing: .5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse 1.5s infinite" }} />
        Live Now
      </span>
    );
  }

  return (
    <>
      <Styles />
      <span className="vr-throb" style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: level === "final" ? "#991b1b" : "#dc2626",
        color: "#fff", fontSize: 12, fontWeight: 900,
        padding: "7px 15px", borderRadius: 30, letterSpacing: 1,
        textTransform: "uppercase", animation: "vr-throb 1.6s ease-in-out infinite",
      }}>
        <span className="vr-blink" style={{ animation: "vr-blink 1s steps(2) infinite" }}>
          {level === "final" ? "⚠️" : "⏰"}
        </span>
        {level === "final" ? "Final hours" : "Last day"}
      </span>
    </>
  );
}

/** Countdown — aakhri din laal, bada aur dhadakta hua */
export function UrgencyCountdown({ deadline }) {
  const ms = useTimeLeft(deadline);
  if (ms == null || ms <= 0) return null;

  const level = urgencyLevel(ms);
  const parts = [
    [Math.floor(ms / 86400000), "d"],
    [Math.floor((ms / HOUR) % 24), "h"],
    [Math.floor((ms / 60000) % 60), "m"],
    [Math.floor((ms / 1000) % 60), "s"],
  ];

  /* Aam din — pehle jaisa chhota countdown */
  if (!level) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>Closes in:</span>
        {parts.map(([v, l]) => (
          <span key={l} style={{
            background: "#fef2f2", color: "#c0392b", fontSize: 11, fontWeight: 800,
            padding: "3px 8px", borderRadius: 6, border: "1px solid #fca5a5",
            fontVariantNumeric: "tabular-nums",
          }}>
            {String(v).padStart(2, "0")}{l}
          </span>
        ))}
      </div>
    );
  }

  /* Aakhri din — din wala khaana hata do (00d faltu lagta hai) */
  const shown = parts[0][0] === 0 ? parts.slice(1) : parts;

  return (
    <div style={{
      background: level === "final" ? "#7f1d1d" : "#dc2626",
      borderRadius: 12, padding: "10px 12px", marginBottom: 14, color: "#fff",
    }}>
      <Styles />
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <span className="vr-blink" style={{ animation: "vr-blink 1s steps(2) infinite" }}>●</span>
        Registration closes in
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {shown.map(([v, l]) => (
          <div key={l} style={{
            background: "rgba(255,255,255,.16)", borderRadius: 8,
            padding: "5px 0", minWidth: 46, textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              {String(v).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 9, opacity: .8, marginTop: 2, textTransform: "uppercase" }}>
              {{ d: "days", h: "hrs", m: "min", s: "sec" }[l]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
