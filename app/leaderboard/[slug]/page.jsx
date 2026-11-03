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
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "../../components/Navbar";

// // ── Nearest category logic ──
// const CATEGORIES_KM = [
//   { label: "1600m", km: 1.6  },
//   { label: "3.2km", km: 3.2  },
//   { label: "5km",   km: 5.0  },
//   { label: "10km",  km: 10.0 },
//   { label: "21km",  km: 21.0 },
// ];

// function getNearestCategory(distStr) {
//   if (!distStr) return null;
//   const s = distStr.toUpperCase().trim();
//   let km;
//   if (s.includes("1600") || s === "1.6KM") {
//     km = 1.6;
//   } else {
//     const num = parseFloat(s.replace(/[^0-9.]/g, ""));
//     if (isNaN(num)) return null;
//     km = (s.includes("MTR") || (s.includes("M") && !s.includes("KM") && num > 100))
//       ? num / 1000
//       : num;
//   }
//   let nearest = CATEGORIES_KM[0], minDiff = Infinity;
//   CATEGORIES_KM.forEach(cat => {
//     const diff = Math.abs(cat.km - km);
//     if (diff < minDiff) { minDiff = diff; nearest = cat; }
//   });
//   return nearest.label;
// }

// const DISTANCES = ["1600m", "3.2km", "5km", "10km", "21km"];

// export default function LeaderboardPage() {
//   const { slug } = useParams();
//   const [allEntries, setAllEntries]         = useState([]);
//   const [loading, setLoading]               = useState(true);
//   const [activeTab, setActiveTab]           = useState("");
//   const [eventTitle, setEventTitle]         = useState("");
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

//       // ✅ Nearest category se available tabs find karo
//       const dists = DISTANCES.filter(d =>
//         list.some(e => getNearestCategory(e.distance) === d)
//       );
//       setAvailableDists(dists);
//       if (dists.length > 0) setActiveTab(dists[0]);
//     } catch {}
//     setLoading(false);
//   };

//   // ✅ Nearest category se filter karo
//   const filtered = allEntries
//     .filter(e => activeTab ? getNearestCategory(e.distance) === activeTab : true)
//     .map((e, i) => ({ ...e, rank: i + 1 }));

//   const rankIcon = (r) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : null;

//   const distColor = (d) => ({
//     "1600m": { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
//     "3.2km": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
//     "5km":   { bg: "#dcfce7", text: "#166534", border: "#86efac", dot: "#22c55e" },
//     "10km":  { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd", dot: "#8b5cf6" },
//     "21km":  { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", dot: "#ef4444" },
//   }[d?.toLowerCase()] || { bg: "#f3f4f6", text: "#374151", border: "#d1d5db", dot: "#6b7280" });

//   const top3 = filtered.slice(0, 3);

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
//                   {/* ✅ Count nearest category se */}
//                   <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
//                     ({allEntries.filter(e => getNearestCategory(e.distance) === d).length})
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

//                   {/* 1st */}
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
//                 { label: "Fastest Time",  value: filtered.find(e => e.timing && e.timing !== "—")?.timing || "—", icon: "⚡" },
//                 { label: "Category",      value: activeTab?.toUpperCase() || "All", icon: "🏃" },
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
//               <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 110px", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
//                 {["Rank","Runner","Category","Time"].map(h => (
//                   <div key={h} style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>
//                 ))}
//               </div>

//               {filtered.map((e, i) => {
//                 const c = distColor(getNearestCategory(e.distance) || e.distance);
//                 const isTop = i < 3;
//                 return (
//                   <div key={i}
//                     style={{
//                       display: "grid", gridTemplateColumns: "56px 1fr 90px 110px",
//                       padding: "14px 20px",
//                       borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
//                       background: isTop ? "#fffbeb" : "white",
//                       transition: "background 0.15s",
//                     }}
//                     onMouseEnter={ev => ev.currentTarget.style.background = "#f9fafb"}
//                     onMouseLeave={ev => ev.currentTarget.style.background = isTop ? "#fffbeb" : "white"}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {rankIcon(e.rank) ? (
//                         <span style={{ fontSize: 22 }}>{rankIcon(e.rank)}</span>
//                       ) : (
//                         <span style={{ color: "#9ca3af", fontWeight: 700, fontSize: 15, width: 28, height: 28, background: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                           {e.rank}
//                         </span>
//                       )}
//                     </div>

//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <div style={{
//                         width: 36, height: 36, borderRadius: "50%",
//                         background: c.bg, border: `2px solid ${c.border}`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         color: c.text, fontWeight: 800, fontSize: 14, flexShrink: 0,
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

//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span style={{
//                         background: c.bg, color: c.text,
//                         border: `1px solid ${c.border}`,
//                         fontSize: 11, fontWeight: 700,
//                         padding: "3px 10px", borderRadius: 20,
//                       }}>
//                         {e.distance?.toUpperCase()}
//                       </span>
//                     </div>

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

// ── Nearest category logic — Running, Walking, Cycling ──
const CATEGORIES_KM = [
  { label: "1600m",         km: 1.6   },
  { label: "3.2km",         km: 3.2   },
  { label: "5km",           km: 5.0   },
  { label: "10km",          km: 10.0  },
  { label: "21km",          km: 21.0  },
  { label: "walking 2km",   km: 202.0 },
  { label: "walking 5km",   km: 205.0 },
  { label: "walking 10km",  km: 210.0 },
  { label: "walking 21km",  km: 221.0 },
  { label: "cycling 10km",  km: 310.0 },
  { label: "cycling 25km",  km: 325.0 },
  { label: "cycling 50km",  km: 350.0 },
  { label: "cycling 100km", km: 400.0 },
];

function getNearestCategory(distStr) {
  if (!distStr) return null;
  const s = distStr.toLowerCase().trim();

  // ✅ Cycling check pehle
  if (s.includes("cycling")) {
    if (s.includes("100")) return "cycling 100km";
    if (s.includes("50"))  return "cycling 50km";
    if (s.includes("25"))  return "cycling 25km";
    return "cycling 10km";
  }

  // ✅ Walking check
  if (s.includes("walking") || s.includes("walk")) {
    if (s.includes("21")) return "walking 21km";
    if (s.includes("10")) return "walking 10km";
    if (s.includes("5"))  return "walking 5km";
    return "walking 2km";
  }

  // ✅ Running / default
  const upper = s.toUpperCase();
  if (upper.includes("1600") || s === "1.6km") return "1600m";

  const num = parseFloat(s.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return null;
  const km = (upper.includes("MTR") || (upper.includes("M") && !upper.includes("KM") && num > 100))
    ? num / 1000 : num;

  const runningCats = [
    { label: "1600m", km: 1.6  },
    { label: "3.2km", km: 3.2  },
    { label: "5km",   km: 5.0  },
    { label: "10km",  km: 10.0 },
    { label: "21km",  km: 21.0 },
  ];
  let nearest = runningCats[0], minDiff = Infinity;
  runningCats.forEach(cat => {
    const diff = Math.abs(cat.km - km);
    if (diff < minDiff) { minDiff = diff; nearest = cat; }
  });
  return nearest.label;
}

const DISTANCES = [
  "1600m", "3.2km", "5km", "10km", "21km",
  "walking 2km", "walking 5km", "walking 10km", "walking 21km",
  "cycling 10km", "cycling 25km", "cycling 50km", "cycling 100km",
];

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
    "1600m":         { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
    "3.2km":         { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
    "5km":           { bg: "#dcfce7", text: "#166534", border: "#86efac", dot: "#22c55e" },
    "10km":          { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd", dot: "#8b5cf6" },
    "21km":          { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5", dot: "#ef4444" },
    "walking 2km":   { bg: "#f0fdf4", text: "#166534", border: "#86efac", dot: "#16a34a" },
    "walking 5km":   { bg: "#f0fdf4", text: "#166534", border: "#86efac", dot: "#16a34a" },
    "walking 10km":  { bg: "#f0fdf4", text: "#166534", border: "#86efac", dot: "#16a34a" },
    "walking 21km":  { bg: "#f0fdf4", text: "#166534", border: "#86efac", dot: "#16a34a" },
    "cycling 10km":  { bg: "#fff7ed", text: "#9a3412", border: "#fdba74", dot: "#f97316" },
    "cycling 25km":  { bg: "#fff7ed", text: "#9a3412", border: "#fdba74", dot: "#f97316" },
    "cycling 50km":  { bg: "#fff7ed", text: "#9a3412", border: "#fdba74", dot: "#f97316" },
    "cycling 100km": { bg: "#fff7ed", text: "#9a3412", border: "#fdba74", dot: "#f97316" },
  }[d?.toLowerCase()] || { bg: "#f3f4f6", text: "#374151", border: "#d1d5db", dot: "#6b7280" });

  const top3 = filtered.slice(0, 3);

  // Tab group label
  const tabGroup = (d) => {
    if (d.includes("cycling")) return "🚴";
    if (d.includes("walking")) return "🚶";
    return "🏃";
  };

  /* Sabse tez time — stats ke liye */
  const fastest = filtered.find((e) => e.timing && e.timing !== "—")?.timing || "—";

  /* Chips ko group mein baanto — 13 chips ki lambi list phone par
     poora ek screen kha jaati thi, runner dikhta hi nahi tha. */
  const groups = [
    { key: "run",  icon: "🏃", label: "Run",  items: availableDists.filter((d) => !d.includes("walking") && !d.includes("cycling")) },
    { key: "walk", icon: "🚶", label: "Walk", items: availableDists.filter((d) => d.includes("walking")) },
    { key: "ride", icon: "🚴", label: "Ride", items: availableDists.filter((d) => d.includes("cycling")) },
  ].filter((g) => g.items.length);

  const shortDist = (d) =>
    String(d).replace(/^(walking|cycling)\s*/i, "").toUpperCase();

  return (
    <div className="lb">
      <style>{lbCss}</style>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <div className="lb-hero">
        <div className="lb-hero-in">
          <span className="lb-live">
            <span className="lb-live-dot" /> Live Leaderboard
          </span>
          <h1 className="lb-title">
            {eventTitle || slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="lb-sub">
            {allEntries.length > 0
              ? `${allEntries.length} finishers · ranked by time`
              : "Ranked by completion time"}
          </p>
        </div>
      </div>

      <div className="lb-wrap">

        {/* ═══ FILTER ═══
            Phone par ek hi line, side mein scroll. Pehle 13 bade pill
            upar-neeche lagte the aur list bahut neeche chali jaati thi. */}
        {availableDists.length > 0 && (
          <div className="lb-filter">
            {groups.map((g) => (
              <div key={g.key} className="lb-group">
                <span className="lb-group-label">{g.icon} {g.label}</span>
                <div className="lb-chips">
                  {g.items.map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveTab(d)}
                      className={`lb-chip ${activeTab === d ? "lb-chip-on" : ""}`}
                    >
                      {shortDist(d)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="lb-empty"><div className="lb-empty-ico">⏳</div>Loading leaderboard…</div>
        ) : filtered.length === 0 ? (
          <div className="lb-empty">
            <div className="lb-empty-ico">🏃</div>
            <div className="lb-empty-h">No entries yet</div>
            <p>Submit your activity and your name shows up here.</p>
          </div>
        ) : (
          <>
            {/* ═══ PODIUM ═══
                Phone par champion poori chaudai mein upar, 2 aur 3 neeche
                saath mein. Teeno ek line mein rakhne par har card 105px ka
                reh jaata tha — naam hi nahi padha jaata. */}
            {top3.length >= 2 && (
              <div className="lb-podium">
                {top3[0] && (
                  <div className="lb-champ">
                    <div className="lb-champ-crown">👑</div>
                    <div className="lb-champ-ava">{top3[0].name?.charAt(0).toUpperCase()}</div>
                    <div className="lb-champ-name">{top3[0].name}</div>
                    {top3[0].timing && top3[0].timing !== "—" && (
                      <div className="lb-champ-time">{top3[0].timing}</div>
                    )}
                    <div className="lb-champ-tag">CHAMPION · {shortDist(activeTab)}</div>
                  </div>
                )}

                <div className="lb-runners">
                  {[top3[1], top3[2]].map((p, i) =>
                    p ? (
                      <div key={i} className="lb-runner">
                        <div className={`lb-runner-medal ${i === 0 ? "silver" : "bronze"}`}>
                          {i === 0 ? "2" : "3"}
                        </div>
                        <div className="lb-runner-name">{p.name}</div>
                        {p.timing && p.timing !== "—" && (
                          <div className="lb-runner-time">{p.timing}</div>
                        )}
                      </div>
                    ) : <div key={i} />
                  )}
                </div>
              </div>
            )}

            {/* ═══ STATS ═══ */}
            <div className="lb-stats">
              <div className="lb-stat">
                <div className="lb-stat-v">{filtered.length}</div>
                <div className="lb-stat-l">Finishers</div>
              </div>
              <div className="lb-stat">
                <div className="lb-stat-v lb-stat-red">{fastest}</div>
                <div className="lb-stat-l">Fastest</div>
              </div>
              <div className="lb-stat">
                <div className="lb-stat-v">{shortDist(activeTab) || "—"}</div>
                <div className="lb-stat-l">Category</div>
              </div>
            </div>

            {/* ═══ LIST ═══
                Phone par grid nahi — grid mein naam ko sirf 51px milte the.
                Ab naam ko jitni jagah chahiye utni milti hai, aur category
                naam ke neeche chhoti si chip ban jaati hai. */}
            <div className="lb-list">
              <div className="lb-list-head">
                <span>Rank</span><span>Runner</span><span className="lb-h-time">Time</span>
              </div>

              {filtered.map((e, i) => {
                const c = distColor(getNearestCategory(e.distance) || e.distance);
                const medal = e.rank <= 3;
                return (
                  <div key={i} className={`lb-row ${medal ? "lb-row-top" : ""}`}>
                    <div className={`lb-rank ${medal ? `lb-rank-${e.rank}` : ""}`}>
                      {e.rank}
                    </div>

                    <div className="lb-ava" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                      {e.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="lb-who">
                      <div className="lb-name">{e.name}</div>
                      <div className="lb-meta">
                        <span className="lb-dist" style={{ background: c.bg, color: c.text }}>
                          {e.distance?.toUpperCase()}
                        </span>
                        {(e.city || e.state) && (
                          <span className="lb-city">{[e.city, e.state].filter(Boolean).join(", ")}</span>
                        )}
                      </div>
                    </div>

                    <div className="lb-time">
                      {e.timing && e.timing !== "—"
                        ? <span className="lb-time-v">{e.timing}</span>
                        : <span className="lb-time-none">—</span>}
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

/* Ek hi jagah saara CSS — inline styles mein media query nahi lagti,
   aur mobile ka asli masla wahi tha. */
const lbCss = `
  .lb { min-height: 100vh; background: #f6f7f9;
        font-family: 'Inter', system-ui, -apple-system, sans-serif; }

  .lb-wrap { max-width: 820px; margin: 0 auto; padding: 20px 14px 72px; }

  /* Hero */
  .lb-hero { background: linear-gradient(135deg,#dc2626,#991b1b); padding: 34px 18px 30px; }
  .lb-hero-in { max-width: 820px; margin: 0 auto; text-align: center; }
  .lb-live { display: inline-flex; align-items: center; gap: 7px;
             background: rgba(255,255,255,.18); color: #fff; font-size: 10.5px;
             font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase;
             padding: 5px 13px; border-radius: 100px; }
  .lb-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
                 box-shadow: 0 0 0 3px rgba(74,222,128,.3); }
  .lb-title { font-size: clamp(21px, 4.4vw, 36px); font-weight: 900; color: #fff;
              letter-spacing: -.9px; line-height: 1.15; margin: 12px 0 0; }
  .lb-sub { color: rgba(255,255,255,.78); font-size: 13px; margin: 8px 0 0; }

  /* Filter */
  .lb-filter { background: #fff; border: 1px solid #ebedf0; border-radius: 16px;
               padding: 12px 14px; margin-bottom: 18px; }
  .lb-group { display: flex; align-items: center; gap: 10px; padding: 5px 0; }
  .lb-group + .lb-group { border-top: 1px solid #f3f4f6; margin-top: 3px; padding-top: 9px; }
  .lb-group-label { font-size: 11px; font-weight: 800; color: #9ca3af;
                    letter-spacing: .4px; white-space: nowrap; width: 62px; flex-shrink: 0; }
  .lb-chips { display: flex; gap: 7px; overflow-x: auto; scrollbar-width: none;
              -webkit-overflow-scrolling: touch; padding-bottom: 2px; }
  .lb-chips::-webkit-scrollbar { display: none; }
  .lb-chip { flex-shrink: 0; padding: 7px 14px; border-radius: 100px; cursor: pointer;
             font-family: inherit; font-size: 12.5px; font-weight: 700;
             background: #f3f4f6; color: #4b5563; border: 1.5px solid transparent;
             transition: all .18s; white-space: nowrap; }
  .lb-chip-on { background: #dc2626; color: #fff; border-color: #dc2626; }

  /* Podium */
  .lb-podium { margin-bottom: 18px; }
  .lb-champ { background: linear-gradient(160deg,#fffbeb,#fff); border: 2px solid #fbbf24;
              border-radius: 20px; padding: 20px 16px 18px; text-align: center;
              box-shadow: 0 8px 26px rgba(251,191,36,.18); position: relative; }
  .lb-champ-crown { font-size: 26px; line-height: 1; }
  .lb-champ-ava { width: 60px; height: 60px; margin: 8px auto 0; border-radius: 50%;
                  background: #fbbf24; color: #78350f; font-size: 25px; font-weight: 900;
                  display: flex; align-items: center; justify-content: center; }
  .lb-champ-name { font-size: 18px; font-weight: 900; color: #1f2937; margin-top: 10px;
                   letter-spacing: -.3px; }
  .lb-champ-time { display: inline-block; background: #dc2626; color: #fff;
                   font-size: 19px; font-weight: 900; padding: 7px 20px;
                   border-radius: 12px; margin-top: 10px; letter-spacing: .4px; }
  .lb-champ-tag { font-size: 10px; font-weight: 800; letter-spacing: 1.4px;
                  color: #92400e; margin-top: 11px; }

  .lb-runners { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
  .lb-runner { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px;
               padding: 14px 10px; text-align: center; }
  .lb-runner-medal { width: 32px; height: 32px; margin: 0 auto; border-radius: 50%;
                     font-size: 14px; font-weight: 900; display: flex;
                     align-items: center; justify-content: center; }
  .lb-runner-medal.silver { background: #e5e7eb; color: #4b5563; }
  .lb-runner-medal.bronze { background: #fde4cf; color: #9a3412; }
  .lb-runner-name { font-size: 13.5px; font-weight: 800; color: #1f2937; margin-top: 8px;
                    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-runner-time { font-size: 14px; font-weight: 800; color: #dc2626; margin-top: 5px; }

  /* Stats */
  .lb-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 18px; }
  .lb-stat { background: #fff; border: 1px solid #ebedf0; border-radius: 14px;
             padding: 13px 8px; text-align: center; }
  .lb-stat-v { font-size: 17px; font-weight: 900; color: #1f2937; letter-spacing: -.3px;
               overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-stat-red { color: #dc2626; }
  .lb-stat-l { font-size: 10.5px; color: #9ca3af; margin-top: 3px; font-weight: 600; }

  /* List */
  .lb-list { background: #fff; border: 1px solid #ebedf0; border-radius: 18px;
             overflow: hidden; }
  .lb-list-head { display: flex; align-items: center; gap: 10px; padding: 11px 16px;
                  background: #fafbfc; border-bottom: 1px solid #f0f1f3;
                  font-size: 10px; font-weight: 800; letter-spacing: 1.2px;
                  text-transform: uppercase; color: #9ca3af; }
  .lb-list-head span:nth-child(1) { width: 30px; flex-shrink: 0; }
  .lb-list-head span:nth-child(2) { flex: 1; }
  .lb-h-time { margin-left: auto; }

  .lb-row { display: flex; align-items: center; gap: 10px; padding: 12px 16px;
            border-bottom: 1px solid #f5f6f7; }
  .lb-row:last-child { border-bottom: none; }
  .lb-row-top { background: #fffdf5; }

  .lb-rank { width: 30px; flex-shrink: 0; font-size: 14px; font-weight: 800;
             color: #9ca3af; text-align: center; }
  .lb-rank-1, .lb-rank-2, .lb-rank-3 { width: 26px; height: 26px; border-radius: 50%;
             display: flex; align-items: center; justify-content: center;
             font-size: 13px; color: #fff; margin: 0 2px; }
  .lb-rank-1 { background: #f59e0b; }
  .lb-rank-2 { background: #9ca3af; }
  .lb-rank-3 { background: #c2703b; }

  .lb-ava { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
            border: 2px solid; display: flex; align-items: center; justify-content: center;
            font-size: 14px; font-weight: 800; }

  /* min-width:0 zaroori hai — iske bina lamba naam row ko chaudा kar deta hai */
  .lb-who { flex: 1; min-width: 0; }
  .lb-name { font-size: 14.5px; font-weight: 700; color: #1f2937;
             overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-meta { display: flex; align-items: center; gap: 7px; margin-top: 3px; min-width: 0; }
  .lb-dist { font-size: 9.5px; font-weight: 800; padding: 2px 7px; border-radius: 100px;
             white-space: nowrap; flex-shrink: 0; }
  .lb-city { font-size: 11px; color: #9ca3af; overflow: hidden;
             text-overflow: ellipsis; white-space: nowrap; }

  .lb-time { margin-left: auto; flex-shrink: 0; text-align: right; }
  .lb-time-v { font-size: 15px; font-weight: 900; color: #dc2626;
               font-variant-numeric: tabular-nums; letter-spacing: .2px; }
  .lb-time-none { color: #d1d5db; font-size: 13px; }

  /* Empty */
  .lb-empty { background: #fff; border: 1px solid #ebedf0; border-radius: 18px;
              padding: 54px 20px; text-align: center; color: #9ca3af; font-size: 14px; }
  .lb-empty-ico { font-size: 44px; margin-bottom: 12px; }
  .lb-empty-h { font-size: 18px; font-weight: 800; color: #1f2937; margin-bottom: 7px; }
  .lb-empty p { margin: 0; }

  /* ── Phone ── */
  @media (max-width: 560px) {
    .lb-wrap { padding: 16px 12px 64px; }
    .lb-group-label { width: 52px; font-size: 10.5px; }
    .lb-row { padding: 11px 12px; gap: 8px; }
    .lb-list-head { padding: 10px 12px; }
    .lb-ava { width: 32px; height: 32px; font-size: 13px; }
    .lb-name { font-size: 14px; }
    .lb-time-v { font-size: 14px; }
    .lb-stat-v { font-size: 15px; }
  }

  /* ── Bada screen: podium teeno saath ── */
  @media (min-width: 720px) {
    .lb-podium { display: grid; grid-template-columns: 1fr 1.25fr; gap: 14px;
                 align-items: center; }
    .lb-runners { margin-top: 0; grid-template-columns: 1fr; }
    .lb-champ { order: 2; }
    .lb-runners { order: 1; }
  }

  @media (prefers-reduced-motion: reduce) { .lb-chip { transition: none; } }
`;
