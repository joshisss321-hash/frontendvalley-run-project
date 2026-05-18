
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// function safeDate(val) {
//   if (!val) return null;
//   if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
//   if (typeof val === "object" && val.$date) {
//     const d = new Date(val.$date);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   if (typeof val === "string") {
//     try {
//       const parsed = JSON.parse(val);
//       if (parsed && parsed.$date) {
//         const d = new Date(parsed.$date);
//         return isNaN(d.getTime()) ? null : d;
//       }
//     } catch (_) {}
//     const d = new Date(val);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   return null;
// }

// function isClosed(deadline) {
//   if (!deadline) return false;
//   if (typeof window === "undefined") return false;
//   const d = safeDate(deadline);
//   if (!d) return false;
//   return d.getTime() < Date.now();
// }

// /* ── Countdown ── */
// function MiniCountdown({ deadline }) {
//   const calc = () => {
//     // ✅ FIXED: Browser ka Date.now() use hoga, UTC string se calculate
//     const target = new Date("2026-03-22T18:30:00.000Z"); // = 23 March 12:00 AM IST
//     const diff = target.getTime() - Date.now();
//     if (diff <= 0) return null;
//     return {
//       d: Math.floor(diff / 86400000),
//       h: Math.floor((diff / 3600000) % 24),
//       m: Math.floor((diff / 60000) % 60),
//       s: Math.floor((diff / 1000) % 60),
//     };
//   };

//   const [t, setT] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     setT(calc());
//     const i = setInterval(() => setT(calc()), 1000);
//     return () => clearInterval(i);
//   }, []);

//   if (!mounted) return null;
//   if (!t) return null;

//   return (
//     <div className="flex items-center gap-1 flex-wrap mb-3">
//       <span className="text-xs text-gray-400">Closes in:</span>
//       {[[t.d, "d"], [t.h, "h"], [t.m, "m"], [t.s, "s"]].map(([v, l]) => (
//         <span key={l} className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums border border-red-200">
//           {String(v).padStart(2, "0")}{l}
//         </span>
//       ))}
//     </div>
//   );
// }

// /* ── Main Card ── */
// export default function ChallengeCard({ event }) {
//   if (!event || !event.slug) return null;

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const closed = mounted ? isClosed(event.registrationDeadline) : false;

//   if (closed) {
//     return (
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
//         <div className="absolute inset-0 z-10 bg-white/50 backdrop-grayscale pointer-events-none rounded-xl" />

//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img src={event.coverImage} alt={event.title}
//               className="w-full h-full object-cover grayscale" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-300">
//               No Cover Image
//             </div>
//           )}

//           <div className="absolute top-3 left-3 z-20">
//             <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//               </span>
//               Event Running
//             </span>
//           </div>

//           <div className="absolute top-3 right-3 z-20">
//             <span className="bg-black/60 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
//               🔒 Reg. Closed
//             </span>
//           </div>
//         </div>

//         <div className="p-5 relative z-20">
//           <h3 className="text-lg font-bold mb-1 text-gray-400">{event.title}</h3>
//           <p className="text-sm text-gray-400 mb-3">{event.dates}</p>

//           <button disabled
//             className="w-full bg-gray-200 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed mb-2">
//             Registration Closed
//           </button>

//           <Link href={`/challenges/${event.slug}`}>
//             <span className="block text-center text-gray-400 hover:text-gray-600 font-semibold text-sm transition-colors">
//               {/* View Details → */}
//             </span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Link href={`/challenges/${event.slug}`}>
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img src={event.coverImage} alt={event.title}
//               className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Cover Image
//             </div>
//           )}
//           <div className="absolute top-3 left-3">
//             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//               🔴 LIVE
//             </span>
//           </div>
//         </div>

//         <div className="p-5">
//           <h3 className="text-lg font-bold mb-1">{event.title}</h3>
//           <p className="text-sm text-gray-500 mb-1">{event.dates}</p>

//           {event.registrationDeadline && (
//             <MiniCountdown deadline={event.registrationDeadline} />
//           )}

//           <span className="inline-block text-red-600 font-semibold text-sm">
//             {/* View Challenge → */}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// function safeDate(val) {
//   if (!val) return null;
//   if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
//   if (typeof val === "object" && val.$date) {
//     const d = new Date(val.$date);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   if (typeof val === "string") {
//     try {
//       const parsed = JSON.parse(val);
//       if (parsed && parsed.$date) {
//         const d = new Date(parsed.$date);
//         return isNaN(d.getTime()) ? null : d;
//       }
//     } catch (_) {}
//     const d = new Date(val);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   return null;
// }

// function isClosed(deadline) {
//   if (!deadline) return false;
//   if (typeof window === "undefined") return false;
//   const d = safeDate(deadline);
//   if (!d) return false;
//   return d.getTime() < Date.now();
// }

// function MiniCountdown({ deadline }) {
//   const calc = () => {
//     const d = safeDate(deadline);
//     if (!d) return null;
//     const diff = d.getTime() - Date.now();
//     if (diff <= 0) return null;
//     return {
//       d: Math.floor(diff / 86400000),
//       h: Math.floor((diff / 3600000) % 24),
//       m: Math.floor((diff / 60000) % 60),
//       s: Math.floor((diff / 1000) % 60),
//     };
//   };

//   const [t, setT] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     setT(calc());
//     const i = setInterval(() => setT(calc()), 1000);
//     return () => clearInterval(i);
//   }, []);

//   if (!mounted || !t) return null;

//   return (
//     <div className="flex items-center gap-1 flex-wrap mb-3">
//       <span className="text-xs text-gray-400">Closes in:</span>
//       {[[t.d, "d"], [t.h, "h"], [t.m, "m"], [t.s, "s"]].map(([v, l]) => (
//         <span
//           key={l}
//           className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums border border-red-200"
//         >
//           {String(v).padStart(2, "0")}
//           {l}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default function ChallengeCard({ event }) {
//   if (!event || !event.slug) return null;

//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { setMounted(true); }, []);

//   const closed = mounted ? isClosed(event.registrationDeadline) : false;

//   // ── CLOSED CARD ──────────────────────────────────────────────────────────
//   if (closed) {
//     return (
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">

//         {/* Grayscale overlay — pointer-events:none so it doesn't block buttons */}
//         <div className="absolute inset-0 z-10 bg-white/50 backdrop-grayscale pointer-events-none rounded-xl" />

//         {/* Cover image */}
//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img
//               src={event.coverImage}
//               alt={event.title}
//               className="w-full h-full object-cover grayscale"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-300">
//               No Cover Image
//             </div>
//           )}

//           {/* Event Running badge */}
//           <div className="absolute top-3 left-3 z-20">
//             <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//               </span>
//               Event Running
//             </span>
//           </div>

//           {/* Reg Closed badge */}
//           <div className="absolute top-3 right-3 z-20">
//             <span className="bg-black/60 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
//               🔒 Reg. Closed
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5 relative z-20">
//           <h3 className="text-lg font-bold mb-1 text-gray-400">{event.title}</h3>
//           <p className="text-sm text-gray-400 mb-3">{event.dates}</p>

//           {/* Registration Closed button */}
//           <button
//             disabled
//             className="w-full bg-gray-200 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed mb-2"
//           >
//             Registration Closed
//           </button>

//           {/* ✅ FIX: View Details poori tarah hataya — koi Link/button nahi */}
//           <div className="w-full py-2.5 rounded-lg text-center font-semibold text-sm text-gray-300 bg-gray-100 cursor-not-allowed select-none">
//             {/* View Details — */}
//           </div>
//         </div>

//       </div>
//     );
//   }

//   // ── OPEN CARD ─────────────────────────────────────────────────────────────
//   return (
//     <Link href={`/challenges/${event.slug}`}>
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

//         {/* Cover image */}
//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img
//               src={event.coverImage}
//               alt={event.title}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Cover Image
//             </div>
//           )}
//           <div className="absolute top-3 left-3">
//             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//               🔴 LIVE
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//           <h3 className="text-lg font-bold mb-1">{event.title}</h3>
//           <p className="text-sm text-gray-500 mb-1">{event.dates}</p>

//           {event.registrationDeadline && (
//             <MiniCountdown deadline={event.registrationDeadline} />
//           )}

//           <span className="inline-block text-red-600 font-semibold text-sm">
//             View Challenge →
//           </span>
//         </div>

//       </div>
//     </Link>
//   );
// }
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// function safeDate(val) {
//   if (!val) return null;
//   if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
//   if (typeof val === "object" && val.$date) {
//     const d = new Date(val.$date);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   if (typeof val === "string") {
//     try {
//       const parsed = JSON.parse(val);
//       if (parsed && parsed.$date) {
//         const d = new Date(parsed.$date);
//         return isNaN(d.getTime()) ? null : d;
//       }
//     } catch (_) {}
//     const d = new Date(val);
//     return isNaN(d.getTime()) ? null : d;
//   }
//   return null;
// }

// function isClosed(deadline) {
//   if (!deadline) return false;
//   if (typeof window === "undefined") return false;
//   const d = safeDate(deadline);
//   if (!d) return false;
//   return d.getTime() < Date.now();
// }

// function MiniCountdown({ deadline }) {
//   const calc = () => {
//     const d = safeDate(deadline);
//     if (!d) return null;
//     const diff = d.getTime() - Date.now();
//     if (diff <= 0) return null;
//     return {
//       d: Math.floor(diff / 86400000),
//       h: Math.floor((diff / 3600000) % 24),
//       m: Math.floor((diff / 60000) % 60),
//       s: Math.floor((diff / 1000) % 60),
//     };
//   };

//   const [t, setT]           = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     setT(calc());
//     const i = setInterval(() => setT(calc()), 1000);
//     return () => clearInterval(i);
//   }, []);

//   if (!mounted || !t) return null;

//   return (
//     <div className="flex items-center gap-1 flex-wrap mb-3">
//       <span className="text-xs text-gray-400">Closes in:</span>
//       {[[t.d, "d"], [t.h, "h"], [t.m, "m"], [t.s, "s"]].map(([v, l]) => (
//         <span key={l}
//           className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums border border-red-200">
//           {String(v).padStart(2, "0")}{l}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default function ChallengeCard({ event }) {
//   if (!event || !event.slug) return null;

//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { setMounted(true); }, []);

//   // Registration closed check
//   const regClosed = mounted
//     ? (isClosed(event.registrationDeadline) || event.isRegistrationOpen === false)
//     : false;

//   // Event is past/previous — hide completely from active list
//   // if (event.isPrevious) return null;

//   // ── REGISTRATION CLOSED — Event is running ─────────────────────────────
//   if (regClosed) {
//     return (
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">

//         {/* Grayscale overlay */}
//         <div className="absolute inset-0 z-10 bg-white/50 backdrop-grayscale pointer-events-none rounded-xl" />

//         {/* Cover image */}
//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img src={event.coverImage} alt={event.title}
//               className="w-full h-full object-cover grayscale"/>
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-300">
//               No Cover Image
//             </div>
//           )}

//           {/* Event Running badge */}
//           <div className="absolute top-3 left-3 z-20">
//             <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"/>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white"/>
//               </span>
//               Event Running
//             </span>
//           </div>

//           {/* Reg Closed badge */}
//           <div className="absolute top-3 right-3 z-20">
//             <span className="bg-black/60 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
//               🔒 Reg. Closed
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5 relative z-20">
//           <h3 className="text-lg font-bold mb-1 text-gray-700">{event.title}</h3>
//           <p className="text-sm text-gray-400 mb-4">{event.dates}</p>

//           {/* ✅ Submit Activity button */}
//           <Link href={`/activity-submission?event=${event.slug}`}>
//             <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] mb-2 flex items-center justify-center gap-2">
//               📸 Submit Your Activity
//             </button>
//           </Link>

//           {/* Registration closed info */}
//           <div className="w-full py-2 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
//             <span>🔒</span>
//             <span>Registration Closed · Event is currently underway</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── REGISTRATION OPEN ─────────────────────────────────────────────────────
//   return (
//     <Link href={`/challenges/${event.slug}`}>
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

//         {/* Cover image */}
//         <div className="relative w-full h-48 bg-gray-100">
//           {event.coverImage ? (
//             <img src={event.coverImage} alt={event.title}
//               className="w-full h-full object-cover"/>
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Cover Image
//             </div>
//           )}
//           <div className="absolute top-3 left-3">
//             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//               🔴 LIVE
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//           <h3 className="text-lg font-bold mb-1">{event.title}</h3>
//           <p className="text-sm text-gray-500 mb-1">{event.dates}</p>

//           {event.registrationDeadline && (
//             <MiniCountdown deadline={event.registrationDeadline}/>
//           )}

//           <div className="flex items-center justify-between mt-3">
//             <span className="text-red-600 font-bold text-sm">
//               Register Now →
//             </span>
//             <span className="text-gray-400 text-xs font-semibold">
//               ₹{event.price || 349}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function safeDate(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  if (typeof val === "object" && val.$date) {
    const d = new Date(val.$date);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (parsed && parsed.$date) {
        const d = new Date(parsed.$date);
        return isNaN(d.getTime()) ? null : d;
      }
    } catch (_) {}
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function isClosed(deadline) {
  if (!deadline) return false;
  if (typeof window === "undefined") return false;
  const d = safeDate(deadline);
  if (!d) return false;
  return d.getTime() < Date.now();
}

function MiniCountdown({ deadline }) {
  const calc = () => {
    const d = safeDate(deadline);
    if (!d) return null;
    const diff = d.getTime() - Date.now();
    if (diff <= 0) return null;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [t, setT] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(calc());
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  if (!mounted || !t) return null;

  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:14 }}>
      <span style={{ fontSize:11, color:"#aaa", fontWeight:500 }}>Closes in:</span>
      {[[t.d,"d"],[t.h,"h"],[t.m,"m"],[t.s,"s"]].map(([v,l]) => (
        <span key={l} style={{
          background:"#fef2f2", color:"#c0392b", fontSize:11, fontWeight:800,
          padding:"3px 7px", borderRadius:6, border:"1px solid #fca5a5",
          fontVariantNumeric:"tabular-nums", letterSpacing:.3
        }}>
          {String(v).padStart(2,"0")}{l}
        </span>
      ))}
    </div>
  );
}

export default function ChallengeCard({ event }) {
  if (!event || !event.slug) return null;

  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const regClosed = mounted
    ? (isClosed(event.registrationDeadline) || event.isRegistrationOpen === false)
    : false;

  // ── REG CLOSED — Event Running ──────────────────────────────
  if (regClosed) {
    return (
      <div style={{
        background:"#fff", borderRadius:20, overflow:"hidden",
        border:`1px solid ${hover?"#e0e0e0":"#eee"}`,
        boxShadow: hover?"0 20px 48px rgba(0,0,0,.1)":"0 2px 12px rgba(0,0,0,.04)",
        transform: hover?"translateY(-6px)":"translateY(0)",
        transition:"all .3s ease", position:"relative"
      }}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}>

        {/* Image */}
        <div style={{ position:"relative", paddingBottom:"58%", overflow:"hidden", background:"#f3f3f3" }}>
          {event.coverImage && (
            <img src={event.coverImage} alt={event.title}
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"grayscale(30%) brightness(.9)", transform:hover?"scale(1.04)":"scale(1)", transition:"transform .5s ease" }}/>
          )}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)" }}/>

          {/* Event Running badge */}
          <div style={{ position:"absolute", top:14, left:14, zIndex:10 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#16a34a", color:"#fff", fontSize:11, fontWeight:700, padding:"6px 14px", borderRadius:30, letterSpacing:.5 }}>
              <span style={{ position:"relative", display:"inline-flex", width:7, height:7 }}>
                <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(255,255,255,.7)", animation:"ping 1.2s infinite" }}/>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#fff", display:"inline-block" }}/>
              </span>
              Event Running
            </span>
          </div>

          {/* Reg Closed */}
          <div style={{ position:"absolute", top:14, right:14, zIndex:10 }}>
            <span style={{ background:"rgba(0,0,0,.6)", color:"rgba(255,255,255,.7)", fontSize:10, fontWeight:700, padding:"5px 12px", borderRadius:20, border:"1px solid rgba(255,255,255,.15)", backdropFilter:"blur(8px)" }}>
              🔒 Reg. Closed
            </span>
          </div>

          {/* Price */}
          <div style={{ position:"absolute", bottom:14, right:14, zIndex:10 }}>
            <span style={{ background:"rgba(0,0,0,.55)", color:"rgba(255,255,255,.9)", fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:8, backdropFilter:"blur(8px)" }}>
              ₹{event.price||399}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"22px 22px 20px" }}>
          <div style={{ fontSize:11, color:"#bbb", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{event.dates}</div>
          <h3 style={{ fontSize:17, fontWeight:800, lineHeight:1.35, color:"#222", marginBottom:18 }}>{event.title}</h3>

          <Link href={`/activity-submission?event=${event.slug}`} style={{ textDecoration:"none" }}>
            <button style={{
              width:"100%", background:"#16a34a", color:"#fff", border:"none",
              padding:"13px 0", borderRadius:12, fontSize:14, fontWeight:700,
              cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center",
              justifyContent:"center", gap:8, marginBottom:10,
              boxShadow:"0 4px 14px rgba(22,163,74,.25)"
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="#15803d";e.currentTarget.style.transform="scale(1.02)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="#16a34a";e.currentTarget.style.transform="scale(1)";}}>
              📸 Submit Your Activity
            </button>
          </Link>

          <div style={{ textAlign:"center", fontSize:12, color:"#bbb", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <span>🔒</span>
            <span>Registration Closed · Event is underway</span>
          </div>
        </div>
      </div>
    );
  }

  // ── REG OPEN ────────────────────────────────────────────────
  return (
    <Link href={`/challenges/${event.slug}`} style={{ textDecoration:"none" }}>
      <div style={{
        background:"#fff", borderRadius:20, overflow:"hidden",
        border:`1px solid ${hover?"#e0e0e0":"#eee"}`,
        boxShadow: hover?"0 20px 48px rgba(0,0,0,.1)":"0 2px 12px rgba(0,0,0,.04)",
        transform: hover?"translateY(-6px)":"translateY(0)",
        transition:"all .3s ease", cursor:"pointer"
      }}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}>

        {/* Image */}
        <div style={{ position:"relative", paddingBottom:"58%", overflow:"hidden", background:"#f3f3f3" }}>
          {event.coverImage && (
            <img src={event.coverImage} alt={event.title}
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", transform:hover?"scale(1.05)":"scale(1)", transition:"transform .5s ease" }}/>
          )}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)" }}/>

          {/* Live badge */}
          <div style={{ position:"absolute", top:14, left:14 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#c0392b", color:"#fff", fontSize:11, fontWeight:700, padding:"6px 14px", borderRadius:30, letterSpacing:.5 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#fff", display:"inline-block", animation:"pulse 1.5s infinite" }}/>
              Live Now
            </span>
          </div>

          {/* Price badge */}
          <div style={{ position:"absolute", top:14, right:14 }}>
            <span style={{ background:"rgba(0,0,0,.55)", color:"rgba(255,255,255,.9)", fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:8, backdropFilter:"blur(8px)" }}>
              ₹{event.price||399}
            </span>
          </div>

          {/* Bottom info */}
          <div style={{ position:"absolute", bottom:14, left:14, right:14 }}>
            <div style={{ display:"flex", gap:8 }}>
              {["🏅 Medal","📜 Certificate","📦 Free Delivery"].map((tag,i) => (
                <span key={i} style={{ background:"rgba(0,0,0,.55)", color:"rgba(255,255,255,.8)", fontSize:10, fontWeight:600, padding:"3px 10px", borderRadius:20, backdropFilter:"blur(8px)", whiteSpace:"nowrap" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"22px 22px 20px" }}>
          <div style={{ fontSize:11, color:"#bbb", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{event.dates}</div>
          <h3 style={{ fontSize:17, fontWeight:800, lineHeight:1.35, color:"#111", marginBottom:12 }}>{event.title}</h3>

          {event.registrationDeadline && <MiniCountdown deadline={event.registrationDeadline}/>}

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:14, borderTop:"1px solid #f5f5f5" }}>
            <span style={{ fontSize:14, fontWeight:700, color:"#c0392b", display:"flex", alignItems:"center", gap:6 }}>
              Register Now →
            </span>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:11, color:"#bbb" }}>From</span>
              <span style={{ fontSize:16, fontWeight:900, color:"#111" }}>₹{event.price||399}</span>
            </div>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <div style={{ height:3, background:`linear-gradient(90deg,transparent,#c0392b,transparent)`, opacity:hover?1:0, transition:"opacity .3s" }}/>
      </div>
    </Link>
  );
}