
// // "use client";

// // import Link from "next/link";
// // import Image from "next/image";

// // export default function ChallengeCard({ title, date, event }) {
// //   return (
// //     <Link href={`/challenges/${event.slug}`}>
// //       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

// //         <div className="relative w-full h-48">
// //           <Image
// //             src={event.coverImage || "/placeholder.jpg"}
// //             alt={title}
// //             fill
// //             className="object-cover"
// //           />
// //         </div>

// //         <div className="p-6">
// //           <h3 className="text-xl font-bold">{title}</h3>
// //           <p className="text-gray-600 mb-3">{date}</p>

// //           <button className="bg-red-600 text-white px-4 py-2 rounded">
// //             View Challenge
// //           </button>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// // import Link from "next/link";

// // export default function ChallengeCard({ event }) {
// //   if (!event || !event.slug) return null; // 🔐 safety guard

// //   return (
// //     <Link href={`/challenges/${event.slug}`}>
// //       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

// //         {/* COVER IMAGE */}
// //         <div className="relative w-full h-48 bg-gray-100">
// //           {event.coverImage ? (
// //             <img
// //               src={event.coverImage}
// //               alt={event.title}
// //               className="w-full h-full object-cover"
// //             />
// //           ) : (
// //             <div className="w-full h-full flex items-center justify-center text-gray-400">
// //               No Cover Image
// //             </div>
// //           )}
// //         </div>

// //         {/* CONTENT */}
// //         <div className="p-5">
// //           <h3 className="text-lg font-bold mb-1">
// //             {event.title}
// //           </h3>

// //           <p className="text-sm text-gray-500 mb-4">
// //             {event.dates}
// //           </p>

// //           <span className="inline-block text-red-600 font-semibold text-sm">
// //             View Challenge →
// //           </span>
// //         </div>

// //       </div>
// //     </Link>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// function isClosed(deadline) {
//   if (!deadline) return false;
//   return new Date(deadline).getTime() < Date.now();
// }

// function MiniCountdown({ deadline }) {
//   const calc = (d) => {
//     const diff = new Date(d).getTime() - Date.now();
//     if (diff <= 0) return null;
//     return {
//       d: Math.floor(diff / 86400000),
//       h: Math.floor((diff / 3600000) % 24),
//       m: Math.floor((diff / 60000) % 60),
//       s: Math.floor((diff / 1000) % 60),
//     };
//   };
//   const [t, setT] = useState(() => calc(deadline));
//   useEffect(() => {
//     const i = setInterval(() => setT(calc(deadline)), 1000);
//     return () => clearInterval(i);
//   }, [deadline]);

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

// export default function ChallengeCard({ event }) {
//   if (!event || !event.slug) return null;

//   const [closed, setClosed] = useState(() => isClosed(event.registrationDeadline));

//   useEffect(() => {
//     if (closed) return;
//     const i = setInterval(() => {
//       if (isClosed(event.registrationDeadline)) {
//         setClosed(true);
//         clearInterval(i);
//       }
//     }, 1000);
//     return () => clearInterval(i);
//   }, [event.registrationDeadline, closed]);

//   // ── CLOSED CARD ──────────────────────────────
//   if (closed) {
//     return (
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">

//         {/* Grayscale overlay */}
//         <div className="absolute inset-0 z-10 bg-white/50 backdrop-grayscale pointer-events-none rounded-xl" />

//         {/* Cover image — grayscale */}
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

//           {/* Event Running badge — top left */}
//           <div className="absolute top-3 left-3 z-20">
//             <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//               </span>
//               Event Running
//             </span>
//           </div>

//           {/* Registration Closed badge — top right */}
//           <div className="absolute top-3 right-3 z-20">
//             <span className="bg-black/60 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
//               🔒 Reg. Closed
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5 relative z-20">
//           <h3 className="text-lg font-bold mb-1 text-gray-400">
//             {event.title}
//           </h3>
//           <p className="text-sm text-gray-400 mb-3">
//             {event.dates}
//           </p>

//           {/* Disabled register button */}
//           <button
//             disabled
//             className="w-full bg-gray-200 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed mb-2"
//           >
//             Registration Closed
//           </button>

//           {/* View details still works */}
//           <Link href={`/challenges/${event.slug}`}>
//             <span className="block text-center text-gray-400 hover:text-gray-600 font-semibold text-sm transition-colors">
//               View Details →
//             </span>
//           </Link>
//         </div>

//       </div>
//     );
//   }

//   // ── OPEN CARD (aapka original design bilkul same) ──
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

//           {/* Live badge */}
//           <div className="absolute top-3 left-3">
//             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//               🔴 LIVE
//             </span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-5">
//           <h3 className="text-lg font-bold mb-1">
//             {event.title}
//           </h3>
//           <p className="text-sm text-gray-500 mb-1">
//             {event.dates}
//           </p>

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
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ── Same safeDate helper as page.jsx ── */
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
  if (typeof window === "undefined") return false; // SSR pe false
  const d = safeDate(deadline);
  if (!d) return false;
  return d.getTime() < Date.now();
}

/* ── Countdown ── */
function MiniCountdown({ deadline }) {
  const calc = (val) => {
    const d = safeDate(val);
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
    setT(calc(deadline));
    const i = setInterval(() => setT(calc(deadline)), 1000);
    return () => clearInterval(i);
  }, [deadline]);

  if (!mounted) return null;
  if (!t) return null;

  return (
    <div className="flex items-center gap-1 flex-wrap mb-3">
      <span className="text-xs text-gray-400">Closes in:</span>
      {[[t.d, "d"], [t.h, "h"], [t.m, "m"], [t.s, "s"]].map(([v, l]) => (
        <span key={l} className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums border border-red-200">
          {String(v).padStart(2, "0")}{l}
        </span>
      ))}
    </div>
  );
}

/* ── Main Card ── */
export default function ChallengeCard({ event }) {
  if (!event || !event.slug) return null;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ KEY FIX: sirf client pe check karo, server pe hamesha false
  const closed = mounted ? isClosed(event.registrationDeadline) : false;

  // ── CLOSED CARD ──
  if (closed) {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 z-10 bg-white/50 backdrop-grayscale pointer-events-none rounded-xl" />

        <div className="relative w-full h-48 bg-gray-100">
          {event.coverImage ? (
            <img src={event.coverImage} alt={event.title}
              className="w-full h-full object-cover grayscale" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              No Cover Image
            </div>
          )}

          <div className="absolute top-3 left-3 z-20">
            <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Event Running
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20">
            <span className="bg-black/60 text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
              🔒 Reg. Closed
            </span>
          </div>
        </div>

        <div className="p-5 relative z-20">
          <h3 className="text-lg font-bold mb-1 text-gray-400">{event.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{event.dates}</p>

          <button disabled
            className="w-full bg-gray-200 text-gray-400 py-2.5 rounded-lg font-semibold text-sm cursor-not-allowed mb-2">
            Registration Closed
          </button>

          <Link href={`/challenges/${event.slug}`}>
            <span className="block text-center text-gray-400 hover:text-gray-600 font-semibold text-sm transition-colors">
              View Details →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // ── OPEN CARD ──
  return (
    <Link href={`/challenges/${event.slug}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
        <div className="relative w-full h-48 bg-gray-100">
          {event.coverImage ? (
            <img src={event.coverImage} alt={event.title}
              className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Cover Image
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              🔴 LIVE
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
          <p className="text-sm text-gray-500 mb-1">{event.dates}</p>

          {event.registrationDeadline && (
            <MiniCountdown deadline={event.registrationDeadline} />
          )}

          <span className="inline-block text-red-600 font-semibold text-sm">
            View Challenge →
          </span>
        </div>
      </div>
    </Link>
  );
}
