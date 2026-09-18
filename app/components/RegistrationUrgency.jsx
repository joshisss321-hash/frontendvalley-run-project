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

/**
 * Daam badhne wala hai — card par sabse upar wali cheez.
 *
 * Sirf tab dikhta hai jab event mein sach mein badhna tay ho aur waqt
 * abhi baaki ho. Waqt khatam hote hi apne aap gayab, aur poori site par
 * naya daam — kyunki daam ka hisaab server par hota hai.
 */
export function PriceRise({ event }) {
  const ms = useTimeLeft(event?.priceIncreaseAt);

  const price = Number(event?.price) || 0;
  const next  = Number(event?.priceAfter) || 0;

  if (ms == null || ms <= 0 || next <= price) return null;

  const days  = Math.floor(ms / 86400000);
  const hours = Math.floor((ms / HOUR) % 24);
  const mins  = Math.floor((ms / 60000) % 60);
  const secs  = Math.floor((ms / 1000) % 60);

  // Aakhri din — aur tez, aur laal
  const hot = ms < 24 * HOUR;

  const boxes = hot
    ? [[hours, "h"], [mins, "m"], [secs, "s"]]
    : [[days, "d"], [hours, "h"], [mins, "m"]];

  return (
    <div style={{
      borderRadius: 14, overflow: "hidden", marginBottom: 12,
      border: `1.5px solid ${hot ? "#dc2626" : "#f59e0b"}`,
      boxShadow: `0 4px 14px ${hot ? "rgba(220,38,38,.22)" : "rgba(245,158,11,.20)"}`,
    }}>
      <Styles />

      <div style={{
        background: hot
          ? "linear-gradient(90deg,#dc2626,#b91c1c)"
          : "linear-gradient(90deg,#f59e0b,#ea580c)",
        padding: "6px 10px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <span className="vr-blink" style={{ fontSize: 12, animation: "vr-blink 1s steps(2) infinite" }}>⏫</span>
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: .8, textTransform: "uppercase" }}>
          Price goes up to ₹{next}
        </span>
      </div>

      <div style={{
        background: hot ? "#fef2f2" : "#fffbeb",
        padding: "9px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontSize: 19, fontWeight: 900, color: hot ? "#991b1b" : "#92400e" }}>
            ₹{price}
          </span>
          <span style={{ fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>
            ₹{next}
          </span>
        </div>

        <div style={{ display: "flex", gap: 3 }}>
          {boxes.map(([v, l]) => (
            <span key={l} style={{
              background: "#fff", borderRadius: 6, padding: "3px 6px",
              border: `1px solid ${hot ? "#fecaca" : "#fde68a"}`,
              fontSize: 11, fontWeight: 900, fontVariantNumeric: "tabular-nums",
              color: hot ? "#991b1b" : "#92400e",
            }}>
              {String(v).padStart(2, "0")}{l}
            </span>
          ))}
        </div>
      </div>
    </div>
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
