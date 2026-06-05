// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "../../components/Navbar";

// const DISTANCES = ["1600m", "3.2km", "5km", "10km", "21km"];

// export default function LeaderboardPage() {
//   const { slug } = useParams();
//   const [allEntries, setAllEntries]     = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [activeTab, setActiveTab]       = useState("");
//   const [eventTitle, setEventTitle]     = useState("");
//   const [availableDists, setAvailableDists] = useState([]);

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     if (!slug) return;
//     loadAll();
//     fetch(`${API}/api/events/${slug}`)
//       .then(r => r.json())
//       .then(d => { if (d.event?.title) setEventTitle(d.event.title); })
//       .catch(() => {});
//   }, [slug]);

//   const loadAll = async () => {
//     setLoading(true);
//     try {
//       const res  = await fetch(`${API}/api/leaderboard/${slug}`);
//       const data = await res.json();
//       const list = data.entries || [];
//       setAllEntries(list);
//       const dists = DISTANCES.filter(d =>
//         list.some(e => e.distance?.toLowerCase() === d.toLowerCase())
//       );
//       setAvailableDists(dists);
//       if (dists.length > 0) setActiveTab(dists[0]);
//     } catch {}
//     setLoading(false);
//   };

//   const filtered = allEntries
//     .filter(e => activeTab ? e.distance?.toLowerCase() === activeTab.toLowerCase() : true)
//     .map((e, i) => ({ ...e, rank: i + 1 }));

//   const rankIcon = (r) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : null;

//   const distColor = (d) => ({
//     "1600m": { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
//     "3.2km": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
//     "5km":   { bg: "#dcfce7", text: "#166534", border: "#86efac", dot: "#22c55e" },
//     "10km":  { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd", dot: "#8b5cf6" },
//     "21km":  { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", dot: "#ef4444" },
//   }[d?.toLowerCase()] || { bg: "#f3f4f6", text: "#374151", border: "#d1d5db", dot: "#6b7280" });

//   const top3   = filtered.slice(0, 3);
//   const rest   = filtered.slice(3);

//   return (
//     <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "system-ui,-apple-system,sans-serif" }}>
//       <Navbar />

//       {/* Hero */}
//       <div style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", padding: "50px 20px 40px", textAlign: "center" }}>
//         <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
//           🏆 Live Leaderboard
//         </div>
//         <h1 style={{ fontSize: "clamp(22px,4vw,40px)", fontWeight: 900, color: "white", margin: "0 0 8px" }}>
//           {eventTitle || slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
//         </h1>
//         <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
//           Fastest runners · Ranked by completion time · Updated automatically
//         </p>
//       </div>

//       <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 60px" }}>

//         {/* Distance tabs */}
//         {availableDists.length > 0 && (
//           <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
//             {availableDists.map(d => {
//               const c = distColor(d);
//               const active = activeTab === d;
//               return (
//                 <button key={d} onClick={() => setActiveTab(d)}
//                   style={{
//                     padding: "10px 22px", borderRadius: 50,
//                     border: `2px solid ${active ? c.dot : "#e5e7eb"}`,
//                     background: active ? c.bg : "white",
//                     color: active ? c.text : "#6b7280",
//                     fontWeight: 700, fontSize: 13, cursor: "pointer",
//                     transition: "all 0.2s",
//                     boxShadow: active ? `0 4px 12px ${c.dot}33` : "0 1px 3px rgba(0,0,0,0.08)",
//                     transform: active ? "scale(1.05)" : "scale(1)",
//                   }}>
//                   {d.toUpperCase()}
//                   <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
//                     ({allEntries.filter(e => e.distance?.toLowerCase() === d.toLowerCase()).length})
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {loading ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>
//             <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
//             Loading leaderboard...
//           </div>
//         ) : filtered.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 60, background: "white", borderRadius: 20, border: "1px solid #e5e7eb" }}>
//             <div style={{ fontSize: 60, marginBottom: 16 }}>🏃</div>
//             <div style={{ color: "#1f2937", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No entries yet</div>
//             <div style={{ color: "#9ca3af", fontSize: 14 }}>Submit your activity to appear on the leaderboard!</div>
//           </div>
//         ) : (
//           <>
//             {/* PODIUM — top 3 */}
//             {top3.length >= 2 && (
//               <div style={{ marginBottom: 32 }}>
//                 <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
//                   🏅 Top Finishers — {activeTab?.toUpperCase()}
//                 </div>
//                 <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10 }}>

//                   {/* 2nd */}
//                   {top3[1] && (
//                     <div style={{ flex: 1, maxWidth: 180, textAlign: "center" }}>
//                       <div style={{ background: "white", border: "2px solid #e5e7eb", borderRadius: 20, padding: "20px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
//                         <div style={{ fontSize: 36, marginBottom: 8 }}>🥈</div>
//                         <div style={{ fontWeight: 800, fontSize: 14, color: "#1f2937", marginBottom: 4 }}>{top3[1].name}</div>
//                         {top3[1].timing && top3[1].timing !== "—" && (
//                           <div style={{ background: "#f3f4f6", color: "#374151", fontSize: 15, fontWeight: 800, padding: "6px 12px", borderRadius: 10, marginTop: 6 }}>
//                             ⏱ {top3[1].timing}
//                           </div>
//                         )}
//                       </div>
//                       <div style={{ height: 50, background: "linear-gradient(180deg,#e5e7eb,#f3f4f6)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#6b7280" }}>2</div>
//                     </div>
//                   )}

//                   {/* 1st — tallest */}
//                   {top3[0] && (
//                     <div style={{ flex: 1, maxWidth: 200, textAlign: "center" }}>
//                       <div style={{ background: "white", border: "2px solid #fbbf24", borderRadius: 20, padding: "24px 12px", boxShadow: "0 8px 24px rgba(251,191,36,0.25)" }}>
//                         <div style={{ fontSize: 44, marginBottom: 8 }}>🥇</div>
//                         <div style={{ fontWeight: 900, fontSize: 16, color: "#1f2937", marginBottom: 4 }}>{top3[0].name}</div>
//                         {top3[0].timing && top3[0].timing !== "—" && (
//                           <div style={{ background: "#dc2626", color: "white", fontSize: 16, fontWeight: 900, padding: "8px 14px", borderRadius: 12, marginTop: 8 }}>
//                             ⏱ {top3[0].timing}
//                           </div>
//                         )}
//                         <div style={{ marginTop: 10, background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>
//                           👑 CHAMPION
//                         </div>
//                       </div>
//                       <div style={{ height: 70, background: "linear-gradient(180deg,#fef3c7,#fef9c3)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26, color: "#92400e" }}>1</div>
//                     </div>
//                   )}

//                   {/* 3rd */}
//                   {top3[2] && (
//                     <div style={{ flex: 1, maxWidth: 180, textAlign: "center" }}>
//                       <div style={{ background: "white", border: "2px solid #e5e7eb", borderRadius: 20, padding: "20px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
//                         <div style={{ fontSize: 36, marginBottom: 8 }}>🥉</div>
//                         <div style={{ fontWeight: 800, fontSize: 14, color: "#1f2937", marginBottom: 4 }}>{top3[2].name}</div>
//                         {top3[2].timing && top3[2].timing !== "—" && (
//                           <div style={{ background: "#f3f4f6", color: "#374151", fontSize: 15, fontWeight: 800, padding: "6px 12px", borderRadius: 10, marginTop: 6 }}>
//                             ⏱ {top3[2].timing}
//                           </div>
//                         )}
//                       </div>
//                       <div style={{ height: 35, background: "linear-gradient(180deg,#e5e7eb,#f3f4f6)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#6b7280" }}>3</div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Stats */}
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
//               {[
//                 { label: "Total Runners", value: filtered.length, icon: "👥" },
//                 { label: "Fastest Time", value: filtered.find(e => e.timing && e.timing !== "—")?.timing || "—", icon: "⚡" },
//                 { label: "Category", value: activeTab?.toUpperCase() || "All", icon: "🏃" },
//               ].map(s => (
//                 <div key={s.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
//                   <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
//                   <div style={{ color: "#dc2626", fontWeight: 800, fontSize: 18 }}>{s.value}</div>
//                   <div style={{ color: "#9ca3af", fontSize: 11 }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Full list */}
//             <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
//               {/* Table header */}
//               <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 110px", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
//                 {["Rank","Runner","Category","Time"].map(h => (
//                   <div key={h} style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>
//                 ))}
//               </div>

//               {filtered.map((e, i) => {
//                 const c = distColor(e.distance);
//                 const isTop = i < 3;
//                 return (
//                   <div key={i}
//                     style={{
//                       display: "grid", gridTemplateColumns: "56px 1fr 90px 110px",
//                       padding: "14px 20px",
//                       borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
//                       background: isTop ? "#fffbeb" : "white",
//                       transition: "background 0.15s", cursor: "default",
//                     }}
//                     onMouseEnter={ev => ev.currentTarget.style.background = "#f9fafb"}
//                     onMouseLeave={ev => ev.currentTarget.style.background = isTop ? "#fffbeb" : "white"}
//                   >
//                     {/* Rank */}
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {rankIcon(e.rank) ? (
//                         <span style={{ fontSize: 22 }}>{rankIcon(e.rank)}</span>
//                       ) : (
//                         <span style={{ color: "#9ca3af", fontWeight: 700, fontSize: 15, width: 28, height: 28, background: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                           {e.rank}
//                         </span>
//                       )}
//                     </div>

//                     {/* Runner */}
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <div style={{
//                         width: 36, height: 36, borderRadius: "50%",
//                         background: c.bg, border: `2px solid ${c.border}`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         color: c.text, fontWeight: 800, fontSize: 14, flexShrink: 0
//                       }}>
//                         {e.name?.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <div style={{ color: "#1f2937", fontWeight: 700, fontSize: 14 }}>{e.name}</div>
//                         {(e.city || e.state) && (
//                           <div style={{ color: "#9ca3af", fontSize: 11 }}>
//                             📍 {[e.city, e.state].filter(Boolean).join(", ")}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Category */}
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span style={{
//                         background: c.bg, color: c.text,
//                         border: `1px solid ${c.border}`,
//                         fontSize: 11, fontWeight: 700,
//                         padding: "3px 10px", borderRadius: 20
//                       }}>
//                         {e.distance?.toUpperCase()}
//                       </span>
//                     </div>

//                     {/* Time */}
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {e.timing && e.timing !== "—" ? (
//                         <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 15 }}>⏱ {e.timing}</span>
//                       ) : (
//                         <span style={{ color: "#d1d5db", fontSize: 13 }}>—</span>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

// ── Nearest category logic ──
const CATEGORIES_KM = [
  { label: "1600m", km: 1.6  },
  { label: "3.2km", km: 3.2  },
  { label: "5km",   km: 5.0  },
  { label: "10km",  km: 10.0 },
  { label: "21km",  km: 21.0 },
];

function getNearestCategory(distStr) {
  if (!distStr) return null;
  const s = distStr.toUpperCase().trim();
  let km;
  if (s.includes("1600") || s === "1.6KM") {
    km = 1.6;
  } else {
    const num = parseFloat(s.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return null;
    km = (s.includes("MTR") || (s.includes("M") && !s.includes("KM") && num > 100))
      ? num / 1000
      : num;
  }
  let nearest = CATEGORIES_KM[0], minDiff = Infinity;
  CATEGORIES_KM.forEach(cat => {
    const diff = Math.abs(cat.km - km);
    if (diff < minDiff) { minDiff = diff; nearest = cat; }
  });
  return nearest.label;
}

const DISTANCES = ["1600m", "3.2km", "5km", "10km", "21km"];

export default function LeaderboardPage() {
  const { slug } = useParams();
  const [allEntries, setAllEntries]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [activeTab, setActiveTab]           = useState("");
  const [eventTitle, setEventTitle]         = useState("");
  const [availableDists, setAvailableDists] = useState([]);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!slug) return;
    loadAll();
    fetch(`${API}/api/events/${slug}`)
      .then(r => r.json())
      .then(d => { if (d.event?.title) setEventTitle(d.event.title); })
      .catch(() => {});
  }, [slug]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/leaderboard/${slug}`);
      const data = await res.json();
      const list = data.entries || [];
      setAllEntries(list);

      // ✅ Nearest category se available tabs find karo
      const dists = DISTANCES.filter(d =>
        list.some(e => getNearestCategory(e.distance) === d)
      );
      setAvailableDists(dists);
      if (dists.length > 0) setActiveTab(dists[0]);
    } catch {}
    setLoading(false);
  };

  // ✅ Nearest category se filter karo
  const filtered = allEntries
    .filter(e => activeTab ? getNearestCategory(e.distance) === activeTab : true)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  const rankIcon = (r) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : null;

  const distColor = (d) => ({
    "1600m": { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
    "3.2km": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
    "5km":   { bg: "#dcfce7", text: "#166534", border: "#86efac", dot: "#22c55e" },
    "10km":  { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd", dot: "#8b5cf6" },
    "21km":  { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", dot: "#ef4444" },
  }[d?.toLowerCase()] || { bg: "#f3f4f6", text: "#374151", border: "#d1d5db", dot: "#6b7280" });

  const top3 = filtered.slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", padding: "50px 20px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
          🏆 Live Leaderboard
        </div>
        <h1 style={{ fontSize: "clamp(22px,4vw,40px)", fontWeight: 900, color: "white", margin: "0 0 8px" }}>
          {eventTitle || slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
          Fastest runners · Ranked by completion time · Updated automatically
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px 60px" }}>

        {/* Distance tabs */}
        {availableDists.length > 0 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {availableDists.map(d => {
              const c = distColor(d);
              const active = activeTab === d;
              return (
                <button key={d} onClick={() => setActiveTab(d)}
                  style={{
                    padding: "10px 22px", borderRadius: 50,
                    border: `2px solid ${active ? c.dot : "#e5e7eb"}`,
                    background: active ? c.bg : "white",
                    color: active ? c.text : "#6b7280",
                    fontWeight: 700, fontSize: 13, cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: active ? `0 4px 12px ${c.dot}33` : "0 1px 3px rgba(0,0,0,0.08)",
                    transform: active ? "scale(1.05)" : "scale(1)",
                  }}>
                  {d.toUpperCase()}
                  {/* ✅ Count nearest category se */}
                  <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                    ({allEntries.filter(e => getNearestCategory(e.distance) === d).length})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            Loading leaderboard...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, background: "white", borderRadius: 20, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🏃</div>
            <div style={{ color: "#1f2937", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No entries yet</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>Submit your activity to appear on the leaderboard!</div>
          </div>
        ) : (
          <>
            {/* PODIUM — top 3 */}
            {top3.length >= 2 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
                  🏅 Top Finishers — {activeTab?.toUpperCase()}
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10 }}>

                  {/* 2nd */}
                  {top3[1] && (
                    <div style={{ flex: 1, maxWidth: 180, textAlign: "center" }}>
                      <div style={{ background: "white", border: "2px solid #e5e7eb", borderRadius: 20, padding: "20px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                        <div style={{ fontSize: 36, marginBottom: 8 }}>🥈</div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: "#1f2937", marginBottom: 4 }}>{top3[1].name}</div>
                        {top3[1].timing && top3[1].timing !== "—" && (
                          <div style={{ background: "#f3f4f6", color: "#374151", fontSize: 15, fontWeight: 800, padding: "6px 12px", borderRadius: 10, marginTop: 6 }}>
                            ⏱ {top3[1].timing}
                          </div>
                        )}
                      </div>
                      <div style={{ height: 50, background: "linear-gradient(180deg,#e5e7eb,#f3f4f6)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#6b7280" }}>2</div>
                    </div>
                  )}

                  {/* 1st */}
                  {top3[0] && (
                    <div style={{ flex: 1, maxWidth: 200, textAlign: "center" }}>
                      <div style={{ background: "white", border: "2px solid #fbbf24", borderRadius: 20, padding: "24px 12px", boxShadow: "0 8px 24px rgba(251,191,36,0.25)" }}>
                        <div style={{ fontSize: 44, marginBottom: 8 }}>🥇</div>
                        <div style={{ fontWeight: 900, fontSize: 16, color: "#1f2937", marginBottom: 4 }}>{top3[0].name}</div>
                        {top3[0].timing && top3[0].timing !== "—" && (
                          <div style={{ background: "#dc2626", color: "white", fontSize: 16, fontWeight: 900, padding: "8px 14px", borderRadius: 12, marginTop: 8 }}>
                            ⏱ {top3[0].timing}
                          </div>
                        )}
                        <div style={{ marginTop: 10, background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>
                          👑 CHAMPION
                        </div>
                      </div>
                      <div style={{ height: 70, background: "linear-gradient(180deg,#fef3c7,#fef9c3)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26, color: "#92400e" }}>1</div>
                    </div>
                  )}

                  {/* 3rd */}
                  {top3[2] && (
                    <div style={{ flex: 1, maxWidth: 180, textAlign: "center" }}>
                      <div style={{ background: "white", border: "2px solid #e5e7eb", borderRadius: 20, padding: "20px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                        <div style={{ fontSize: 36, marginBottom: 8 }}>🥉</div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: "#1f2937", marginBottom: 4 }}>{top3[2].name}</div>
                        {top3[2].timing && top3[2].timing !== "—" && (
                          <div style={{ background: "#f3f4f6", color: "#374151", fontSize: 15, fontWeight: 800, padding: "6px 12px", borderRadius: 10, marginTop: 6 }}>
                            ⏱ {top3[2].timing}
                          </div>
                        )}
                      </div>
                      <div style={{ height: 35, background: "linear-gradient(180deg,#e5e7eb,#f3f4f6)", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#6b7280" }}>3</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { label: "Total Runners", value: filtered.length, icon: "👥" },
                { label: "Fastest Time",  value: filtered.find(e => e.timing && e.timing !== "—")?.timing || "—", icon: "⚡" },
                { label: "Category",      value: activeTab?.toUpperCase() || "All", icon: "🏃" },
              ].map(s => (
                <div key={s.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ color: "#dc2626", fontWeight: 800, fontSize: 18 }}>{s.value}</div>
                  <div style={{ color: "#9ca3af", fontSize: 11 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Full list */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 110px", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Rank","Runner","Category","Time"].map(h => (
                  <div key={h} style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>
                ))}
              </div>

              {filtered.map((e, i) => {
                const c = distColor(getNearestCategory(e.distance) || e.distance);
                const isTop = i < 3;
                return (
                  <div key={i}
                    style={{
                      display: "grid", gridTemplateColumns: "56px 1fr 90px 110px",
                      padding: "14px 20px",
                      borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                      background: isTop ? "#fffbeb" : "white",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={ev => ev.currentTarget.style.background = "#f9fafb"}
                    onMouseLeave={ev => ev.currentTarget.style.background = isTop ? "#fffbeb" : "white"}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {rankIcon(e.rank) ? (
                        <span style={{ fontSize: 22 }}>{rankIcon(e.rank)}</span>
                      ) : (
                        <span style={{ color: "#9ca3af", fontWeight: 700, fontSize: 15, width: 28, height: 28, background: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {e.rank}
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: c.bg, border: `2px solid ${c.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: c.text, fontWeight: 800, fontSize: 14, flexShrink: 0,
                      }}>
                        {e.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ color: "#1f2937", fontWeight: 700, fontSize: 14 }}>{e.name}</div>
                        {(e.city || e.state) && (
                          <div style={{ color: "#9ca3af", fontSize: 11 }}>
                            📍 {[e.city, e.state].filter(Boolean).join(", ")}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{
                        background: c.bg, color: c.text,
                        border: `1px solid ${c.border}`,
                        fontSize: 11, fontWeight: 700,
                        padding: "3px 10px", borderRadius: 20,
                      }}>
                        {e.distance?.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      {e.timing && e.timing !== "—" ? (
                        <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 15 }}>⏱ {e.timing}</span>
                      ) : (
                        <span style={{ color: "#d1d5db", fontSize: 13 }}>—</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
