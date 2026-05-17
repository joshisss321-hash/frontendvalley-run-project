
// "use client";

// import { useEffect, useState, useRef } from "react";
// import Navbar from "./components/Navbar";
// import { useRouter } from "next/navigation";

// const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";

// // ── Naye event ki deadline add karni ho toh yahan karo: "slug": "date" ──
// const DEADLINES = {
//   "monthly-marathon": "2026-04-20T18:30:00.000+00:00",
// };

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
//       .then((r) => r.json())
//       .then((d) => { if (d.success) setEvents(d.events); });
//   }, []);

//   const liveEvents     = events.filter((e) => !e.isPrevious);
//   const previousEvents = events.filter((e) => e.isPrevious === true);

//   return (
//     <div className="bg-white text-gray-900 min-h-screen">
//       <Navbar />
//       <HeroSection />
//       <TrustBar />
//       <WhyJoinSection />
//       <HowItWorksSection />
//       <ActiveChallengesSection events={liveEvents} router={router} />
//         <TestimonialsSection />
//       {previousEvents.length > 0 && (
//         <PreviousEventsSection events={previousEvents} router={router} />
//       )}
//       <MedalShowcaseSection events={events} />
//       <CertificateSection />
//       <GallerySection events={events} />
//       <WhatsAppSection url={WHATSAPP_URL} />
//       <FAQSection />
//       <FinalCTA router={router} />
//     </div>
//   );
// }

// /* ═══════════════ HERO ═══════════════ */
// function HeroSection() {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     let c = 0;
//     const t = setInterval(() => { c += 2; if (c >= 100) { setCount(600); clearInterval(t); } else setCount(c); }, 30);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <section className="relative min-h-[90vh] flex items-center overflow-hidden"
//       style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
//       <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
//         <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-6">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
//           </span>
//           <span className="text-sm font-semibold text-green-300">{count}+ runners joined from across India</span>
//         </div>
//         <p className="text-white/70 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4">Virtual Fitness Challenges</p>
//         <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-white mb-6">
//           Discipline Builds<br /><span className="text-red-500">Legends.</span>
//         </h1>
//         <p className="max-w-lg text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
//           Anyone can start. Very few finish. Valley Run exists for those who choose consistency over comfort.
//         </p>
//         <button
//           onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
//           className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-white/10">
//           How It Works ↓
//         </button>
//         <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-white/20">
//           {[["500+", "Runners"], ["Pan India", "Delivery"], ["100%", "Real Medals"]].map(([n, l]) => (
//             <div key={l}>
//               <div className="text-xl sm:text-2xl font-black text-white">{n}</div>
//               <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{l}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ TRUST BAR ═══════════════ */
// function TrustBar() {
//   const items = ["🏅 Real Metal Medals","📦 Free Pan-India Delivery","📸 Any GPS App Accepted","⚡ Results in 24 hrs","🇮🇳 Made for Indian Runners","🔒 Secure Razorpay Payments"];
//   return (
//     <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg,#1a1a2e,#16213e,#1a1a2e)" }}>
//       <div className="flex gap-10 w-max" style={{ animation: "trustscroll 25s linear infinite" }}>
//         {[...items, ...items].map((item, i) => (
//           <span key={i} className="text-sm font-bold whitespace-nowrap" style={{ color: "rgba(255,255,255,0.75)" }}>
//             {item} <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
//           </span>
//         ))}
//       </div>
//       <style>{`@keyframes trustscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
//     </div>
//   );
// }

// /* ═══════════════ WHY JOIN ═══════════════ */
// function WhyJoinSection() {
//   const cards = [
//     { icon:"⏳", title:"Fixed Deadlines", desc:"Deadlines create discipline. You don't train 'someday' — you train now.", bg:"bg-orange-50", border:"border-orange-100", ibg:"bg-orange-100" },
//     { icon:"🏅", title:"Real Rewards", desc:"Heavy metal medals shipped home. Not digital badges that disappear.", bg:"bg-yellow-50", border:"border-yellow-100", ibg:"bg-yellow-100" },
//     { icon:"🧠", title:"Mental Strength", desc:"You finish stronger than you started — mentally and physically.", bg:"bg-blue-50", border:"border-blue-100", ibg:"bg-blue-100" },
//     { icon:"📍", title:"Run Anywhere", desc:"Road, treadmill, track — run in your city on your own schedule.", bg:"bg-green-50", border:"border-green-100", ibg:"bg-green-100" },
//     { icon:"📸", title:"Easy Proof", desc:"Screenshot from Strava, Nike Run Club, or any app. We verify fast.", bg:"bg-purple-50", border:"border-purple-100", ibg:"bg-purple-100" },
//     { icon:"🤝", title:"Community", desc:"Join thousands of runners across India chasing the same finish line.", bg:"bg-red-50", border:"border-red-100", ibg:"bg-red-100" },
//   ];
//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Why Valley Run</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Why Join Valley Run?</h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">This is not entertainment. This is structure, accountability and proof of effort.</p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {cards.map((c, i) => (
//             <div key={i} className={`${c.bg} border-2 ${c.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
//               <div className={`${c.ibg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>{c.icon}</div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ HOW IT WORKS ═══════════════ */
// function HowItWorksSection() {
//   const [active, setActive] = useState(0);
//   const steps = [
//     { n:"01", icon:"🏃", title:"Register", sub:"Pick your distance", desc:"Choose 5K, 10K, or 21K. Pay securely via Razorpay. Takes under 2 minutes.", cls:"border-red-200 bg-red-50" },
//     { n:"02", icon:"📍", title:"Run Anywhere", sub:"Your city, your route", desc:"Run anywhere in India — road, treadmill, or track.", cls:"border-orange-200 bg-orange-50" },
//     { n:"03", icon:"📸", title:"Submit Proof", sub:"Screenshot your run", desc:"Share your Strava, Nike, or any GPS app screenshot. We verify in 24 hrs.", cls:"border-amber-200 bg-amber-50" },
//     { n:"04", icon:"🏅", title:"Get Your Medal", sub:"Delivered to your door", desc:"Real zinc-alloy medal shipped home free, pan-India.", cls:"border-green-200 bg-green-50" },
//   ];
//   useEffect(() => { const t = setInterval(() => setActive(p => (p + 1) % 4), 3000); return () => clearInterval(t); }, []);
//   return (
//     <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Simple Process</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Four Steps to Your Medal</h2>
//         </div>
//         <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
//           <div className="space-y-3">
//             {steps.map((s, i) => (
//               <button key={i} onClick={() => setActive(i)}
//                 className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 ${active === i ? s.cls : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <div className="flex items-center gap-4">
//                   <span className="text-2xl font-black text-gray-200">{s.n}</span>
//                   <span className="text-2xl">{s.icon}</span>
//                   <div><div className="font-bold text-gray-900">{s.title}</div><div className="text-xs text-gray-500">{s.sub}</div></div>
//                 </div>
//                 {active === i && <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-16">{s.desc}</p>}
//               </button>
//             ))}
//           </div>
//           <div className="hidden md:flex items-center justify-center h-72 rounded-3xl border-2 border-gray-200 bg-white shadow-sm relative overflow-hidden">
//             <div className="text-center">
//               <div className="text-7xl mb-4">{steps[active].icon}</div>
//               <div className="text-xl font-black text-gray-900">{steps[active].title}</div>
//               <div className="text-gray-400 text-sm mt-1">{steps[active].sub}</div>
//             </div>
//             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//               {steps.map((_, i) => (<div key={i} className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ COUNTDOWN HOOK ═══════════════ */
// function useCountdown(deadline) {
//   const [timeLeft, setTimeLeft] = useState(null);

//   useEffect(() => {
//     if (!deadline) return;
//     const target = new Date(deadline).getTime();

//     const calc = () => {
//       const diff = target - Date.now();
//       if (diff <= 0) { setTimeLeft(null); return; }
//       const d = Math.floor(diff / 86400000);
//       const h = Math.floor((diff % 86400000) / 3600000);
//       const m = Math.floor((diff % 3600000) / 60000);
//       const s = Math.floor((diff % 60000) / 1000);
//       setTimeLeft({ d, h, m, s, diff });
//     };

//     calc();
//     const t = setInterval(calc, 1000);
//     return () => clearInterval(t);
//   }, [deadline]);

//   return timeLeft;
// }

// /* ═══════════════ CHALLENGE CARD ═══════════════ */
// // function ChallengeCard({ event, router }) {
// //   const deadline = event.registrationDeadline || DEADLINES[event.slug];
// //   const timeLeft = useCountdown(deadline);
// //   const isExpired = deadline && new Date(deadline) <= new Date();
// //   const isRunning = isExpired;

// //   return (
// //     <div
// //       className={`rounded-3xl overflow-hidden border-2 transition-all duration-300 bg-white ${
// //         isRunning
// //           ? "border-gray-300 opacity-75"
// //           : "border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1"
// //       }`}
// //     >
// //       <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
// //         <img
// //           src={event.coverImage || event.image}
// //           alt={event.title}
// //           className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
// //           style={isRunning ? { filter: "grayscale(100%)" } : {}}
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
// //         <div className="absolute top-3 left-3">
// //           {isRunning ? (
// //             <span className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
// //               🏃 Event Running
// //             </span>
// //           ) : (
// //             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
// //               <span className="relative flex h-2 w-2">
// //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
// //                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
// //               </span>
// //               LIVE
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //       <div className="p-5 sm:p-6">
// //         <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
// //         <p className="text-gray-500 text-sm mb-3">{event.dates}</p>

// //         {!isRunning && timeLeft && (
// //           <div className="mb-4 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
// //             <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2 text-center">
// //               ⏳ Registration closes in
// //             </p>
// //             <div className="flex justify-center gap-3">
// //               {[
// //                 [timeLeft.d, "Days"],
// //                 [timeLeft.h, "Hrs"],
// //                 [timeLeft.m, "Min"],
// //                 [timeLeft.s, "Sec"],
// //               ].map(([val, label]) => (
// //                 <div key={label} className="text-center">
// //                   <div className="bg-red-600 text-white font-black text-lg rounded-lg w-11 h-11 flex items-center justify-center tabular-nums">
// //                     {String(val).padStart(2, "0")}
// //                   </div>
// //                   <div className="text-[9px] text-gray-400 mt-1 font-semibold uppercase">{label}</div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {isRunning && (
// //           <div className="mb-4 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 text-center">
// //             <p className="text-gray-400 text-xs font-bold">🔒 Registration Closed</p>
// //             <p className="text-gray-400 text-[10px] mt-0.5">Event is currently underway</p>
// //           </div>
// //         )}

// //         <div className="flex gap-3">
// //           <button
// //             onClick={() => !isRunning && router.push(`/challenges/${event.slug}`)}
// //             disabled={isRunning}
// //             className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
// //               isRunning
// //                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                 : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
// //             }`}
// //           >
// //             {isRunning ? "Registration Closed" : "Register Now"}
// //           </button>
// //          <button
// //   onClick={() => !isRunning && router.push(`/challenges/${event.slug}`)}
// //   disabled={isRunning}
// //   className={`px-4 py-3 rounded-full text-sm font-semibold transition-colors border-2 ${
// //     isRunning
// //       ? "border-gray-200 text-gray-300 cursor-not-allowed"
// //       : "border-gray-200 hover:border-gray-400 text-gray-600"
// //   }`}
// // >
// //   Details
// // </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// function ChallengeCard({ event, router }) {
//   const deadline = event.registrationDeadline || DEADLINES[event.slug];
//   const timeLeft = useCountdown(deadline);
//   const isExpired = deadline && new Date(deadline) <= new Date();
//   const isRunning = isExpired;

//   return (
//     <div
//       className={`rounded-3xl overflow-hidden border-2 transition-all duration-300 bg-white ${
//         isRunning
//           ? "border-gray-200 opacity-60 grayscale"
//           : "border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1"
//       }`}
//     >
//       <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
//         <img
//           src={event.coverImage || event.image}
//           alt={event.title}
//           className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//         <div className="absolute top-3 left-3">
//           {isRunning ? (
//             <span className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
//               🏃 Event Running
//             </span>
//           ) : (
//             <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//               </span>
//               LIVE
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="p-5 sm:p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
//         <p className="text-gray-500 text-sm mb-3">{event.dates}</p>

//         {!isRunning && timeLeft && (
//           <div className="mb-4 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
//             <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2 text-center">
//               ⏳ Registration closes in
//             </p>
//             <div className="flex justify-center gap-3">
//               {[
//                 [timeLeft.d, "Days"],
//                 [timeLeft.h, "Hrs"],
//                 [timeLeft.m, "Min"],
//                 [timeLeft.s, "Sec"],
//               ].map(([val, label]) => (
//                 <div key={label} className="text-center">
//                   <div className="bg-red-600 text-white font-black text-lg rounded-lg w-11 h-11 flex items-center justify-center tabular-nums">
//                     {String(val).padStart(2, "0")}
//                   </div>
//                   <div className="text-[9px] text-gray-400 mt-1 font-semibold uppercase">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {isRunning && (
//           <div className="mb-4 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 text-center">
//             <p className="text-gray-400 text-xs font-bold">🔒 Registration Closed</p>
//             <p className="text-gray-400 text-[10px] mt-0.5">Event is currently underway</p>
//           </div>
//         )}

//         {/* <div className="flex gap-3">
//           <button
//             disabled={isRunning}
//             className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
//               isRunning
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
//                 : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
//             }`}
//           >
//             {isRunning ? "Registration Closed" : "Register Now"}
//           </button>
//           <button
//             disabled={isRunning}
//             className={`px-4 py-3 rounded-full text-sm font-semibold transition-colors border-2 ${
//               isRunning
//                 ? "border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none"
//                 : "border-gray-200 hover:border-gray-400 text-gray-600"
//             }`}
//           >
//             Details
//           </button>
//         </div> */}
//         <div className="flex gap-3">
//   <button
//     onClick={() => router.push(`/challenges/${event.slug}`)}
//     disabled={isRunning}
//     className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
//       isRunning
//         ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
//         : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg"
//     }`}
//   >
//     {isRunning ? "Registration Closed" : "Register Now"}
//   </button>
//   <button
//     onClick={() => router.push(`/challenges/${event.slug}`)}
//     disabled={isRunning}
//     className={`px-4 py-3 rounded-full text-sm font-semibold transition-colors border-2 ${
//       isRunning
//         ? "border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none"
//         : "border-gray-200 hover:border-gray-400 text-gray-600"
//     }`}
//   >
//     Details
//   </button>
// </div>
//       </div>
//     </div>
//   );
// }
// /* ═══════════════ ACTIVE CHALLENGES ═══════════════ */
// function ActiveChallengesSection({ events, router }) {
//   return (
//     <section id="challenges" className="py-20 sm:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
//           <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {events.map((event) => (
//             <ChallengeCard key={event._id} event={event} router={router} />
//           ))}
//           {events.length === 0 && (
//             <div className="col-span-3 text-center py-20">
//               <div className="text-5xl mb-4">🏃</div>
//               <p className="font-bold text-lg text-gray-400">Loading challenges...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════
//    PREVIOUS EVENTS
// ═══════════════════════════════════════════════════════ */
// function PreviousEventsSection({ events, router }) {
//   return (
//     <section className="py-16 sm:py-20 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-10">
//           <span className="inline-block bg-gray-300 text-gray-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
//             Past Events
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-500">
//             Previous Challenges
//           </h2>
//           <p className="text-gray-400 text-sm mt-2">
//             These challenges have ended. Stay tuned for the next one! 💪
//           </p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {events.map((event) => (
//             <div key={event._id} className="rounded-3xl overflow-hidden border-2 border-gray-200 bg-white" style={{ opacity: 0.75 }}>
//               <div className="relative h-44 overflow-hidden bg-gray-200">
//                 <img src={event.coverImage || event.image} alt={event.title} className="h-full w-full object-cover" style={{ filter: "grayscale(100%)" }} />
//                 <div className="absolute inset-0 bg-black/40" />
//                 <div className="absolute top-3 left-3">
//                   <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full">
//                     <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//                       <circle cx="6" cy="6" r="6" fill="#4B5563"/>
//                       <path d="M3.5 6l2 2 3-3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Completed
//                   </span>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <p className="text-white/80 font-black text-sm leading-tight">{event.title}</p>
//                 </div>
//               </div>
//               <div className="p-5 bg-gray-50">
//                 <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wide">Event Period</p>
//                 <p className="text-gray-500 text-sm font-semibold mb-4">{event.dates}</p>
//                 <button onClick={() => router.push(`/leaderboard/${event.slug}`)}
//                   className="w-full border-2 border-gray-300 text-gray-400 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors">
//                   View Results →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ══════════════════════════════════════════
//    3D MEDAL
// ══════════════════════════════════════════ */
// function Medal3D({ event }) {
//   const rotY = useRef(0);
//   const rotX = useRef(-10);
//   const drag = useRef({ active: false, lastX: 0, lastY: 0 });
//   const autoOn = useRef(true);
//   const rafId = useRef(null);
//   const autoTimer = useRef(null);
//   const innerRef = useRef(null);

//   const apply = () => {
//     if (innerRef.current)
//       innerRef.current.style.transform = `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
//   };

//   useEffect(() => {
//     const tick = () => { if (autoOn.current) { rotY.current += 0.45; apply(); } rafId.current = requestAnimationFrame(tick); };
//     rafId.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafId.current);
//   }, []);

//   const pauseAuto = () => {
//     autoOn.current = false;
//     clearTimeout(autoTimer.current);
//     autoTimer.current = setTimeout(() => { autoOn.current = true; }, 2800);
//   };

//   const onDown = (x, y) => { drag.current = { active: true, lastX: x, lastY: y }; pauseAuto(); };
//   const onMove = (x, y) => {
//     if (!drag.current.active) return;
//     rotY.current += (x - drag.current.lastX) * 0.65;
//     rotX.current = Math.max(-40, Math.min(40, rotX.current - (y - drag.current.lastY) * 0.4));
//     drag.current.lastX = x; drag.current.lastY = y;
//     apply();
//   };
//   const onUp = () => { drag.current.active = false; };

//   const faceStyle = (extra = {}) => ({
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     borderRadius: "50%",
//     WebkitBackfaceVisibility: "hidden",
//     backfaceVisibility: "hidden",
//     willChange: "transform",
//     ...extra,
//   });

//   return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
//       <div
//         style={{ width:360, height:360, perspective:"800px", cursor:"grab", userSelect:"none", position:"relative" }}
//         onMouseDown={(e) => { e.preventDefault(); onDown(e.clientX, e.clientY); }}
//         onMouseMove={(e) => onMove(e.clientX, e.clientY)}
//         onMouseUp={onUp} onMouseLeave={onUp}
//         onTouchStart={(e) => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }}
//         onTouchMove={(e) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }}
//         onTouchEnd={onUp}
//       >
//         <div ref={innerRef} style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d", transform:`rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)` }}>
//           <div style={faceStyle({ background: event.medalImage ? "#111" : "linear-gradient(135deg,#fde68a,#f59e0b,#d97706,#92400e)", boxShadow:"0 20px 60px rgba(0,0,0,0.6),inset 0 2px 0 rgba(255,255,255,0.3)" })}>
//             {event.medalImage
//               ? <img src={event.medalImage} alt="Front" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
//               : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8 }}><span style={{ fontSize:52 }}>🏅</span><span style={{ color:"#78350f",fontWeight:900,fontSize:11,textAlign:"center",padding:"0 20px" }}>{event.title}</span></div>
//             }
//             <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 45%,rgba(0,0,0,0.1) 100%)" }} />
//             <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>FRONT</div>
//           </div>
//           <div style={faceStyle({ transform:"rotateY(180deg)", background: event.medalImageBack ? "#111" : "linear-gradient(135deg,#e5e7eb,#9ca3af,#6b7280)", boxShadow:"0 20px 60px rgba(0,0,0,0.5),inset 0 2px 0 rgba(255,255,255,0.15)" })}>
//             {event.medalImageBack
//               ? <img src={event.medalImageBack} alt="Back" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
//               : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:"0 24px" }}><div style={{ width:60,height:60,borderRadius:"50%",background:"rgba(156,163,175,0.4)",border:"3px solid #d1d5db",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26 }}>🇮🇳</div><span style={{ color:"#374151",fontWeight:900,fontSize:11,textAlign:"center" }}>{event.title}</span><span style={{ color:"#6b7280",fontSize:10,textAlign:"center" }}>{event.dates}</span></div>
//             }
//             <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 50%,rgba(0,0,0,0.15) 100%)" }} />
//             <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>BACK</div>
//           </div>
//           <div style={{ position:"absolute",inset:0,borderRadius:"50%",transform:"translateZ(-8px)",background:"radial-gradient(ellipse,#b45309,#78350f)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden" }} />
//         </div>
//         <div style={{ position:"absolute",bottom:-12,left:"50%",transform:"translateX(-50%)",width:170,height:14,background:"radial-gradient(ellipse,rgba(0,0,0,0.25) 0%,transparent 70%)",filter:"blur(4px)",pointerEvents:"none" }} />
//       </div>
//       <p style={{ fontSize:12,color:"#9ca3af",display:"flex",alignItems:"center",gap:6 }}>👆 Drag or touch to rotate</p>
//       <div style={{ textAlign:"center" }}>
//         <p style={{ fontWeight:900,color:"#111827",fontSize:15 }}>{event.title}</p>
//         <p style={{ color:"#6b7280",fontSize:13,marginTop:2 }}>Finisher Medal</p>
//       </div>
//       <div style={{ background:"#fff",border:"2px solid #f3f4f6",borderRadius:16,padding:"16px 20px",width:240,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
//         <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//           {[["Weight","100g"],["Diameter","70mm"],["Material","Zinc Alloy"],["Delivery","Free"]].map(([k,v]) => (
//             <div key={k}><p style={{ color:"#9ca3af",fontSize:11 }}>{k}</p><p style={{ fontWeight:700,color:"#1f2937",fontSize:14,marginTop:2 }}>{v}</p></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MedalShowcaseSection({ events }) {
//   const medalEvents = events.filter((e) => e.medalImage);
//   return (
//     <section className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-200">Your Reward</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What You Earn</h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Proof beats motivation. Every finisher earns a real, heavy metal medal shipped to your door.</p>
//           <p className="text-gray-400 text-sm mt-2">🖱️ Drag to rotate · 📱 Touch and drag on mobile</p>
//         </div>
//         {medalEvents.length > 0 ? (
//           <div className="flex flex-wrap justify-center gap-14 sm:gap-20 mb-14">
//             {medalEvents.map((event) => <Medal3D key={event._id} event={event} />)}
//           </div>
//         ) : (
//           <div className="text-center py-16"><div className="text-5xl mb-4">🏅</div><p className="text-gray-400 font-bold">Medal images loading...</p></div>
//         )}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
//           {[["📦","Free Shipping","Pan India"],["⚡","Fast Delivery","7–10 days"],["🔒","Guaranteed","Or full refund"],["⭐","Premium","Zinc alloy"]].map(([e,t,s]) => (
//             <div key={t} className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:border-red-200 transition-colors">
//               <div className="text-2xl mb-2">{e}</div>
//               <div className="font-bold text-sm text-gray-900">{t}</div>
//               <div className="text-gray-400 text-xs mt-1">{s}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ CERTIFICATE ═══════════════ */
// function CertificateSection() {
//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
//           <div>
//             <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Digital Certificate</span>
//             <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-5 leading-tight">Proof of your finish, forever.</h2>
//             <p className="text-gray-500 leading-relaxed mb-6">Every finisher receives a personalised digital certificate — shareable on LinkedIn, Instagram, or wherever you want to show the world you finished.</p>
//             <ul className="space-y-3">
//               {["Your name + distance on the certificate","Event date and official Valley Run branding","Downloadable high-res PDF","Share on LinkedIn in one click"].map(f => (
//                 <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
//                   <span className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-600 text-xs flex-shrink-0">✓</span>{f}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="rounded-3xl overflow-hidden border-2 border-yellow-200 shadow-xl">
//             <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-10 text-center relative overflow-hidden">
//               <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"repeating-linear-gradient(45deg,#b45309 0,#b45309 1px,transparent 0,transparent 50%)",backgroundSize:"10px 10px" }} />
//               <div className="relative z-10">
//                 <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-2xl mx-auto mb-5">🏅</div>
//                 <p className="text-yellow-700 text-xs font-bold tracking-widest uppercase mb-2">Certificate of Completion</p>
//                 <p className="text-gray-400 text-sm mb-1">This certifies that</p>
//                 <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Your Name</p>
//                 <p className="text-gray-400 text-sm mb-3">has successfully completed</p>
//                 <p className="text-xl font-bold text-amber-700 mb-1">Shaheed Diwas Tribute Run 2026</p>
//                 <p className="text-amber-600 font-bold text-lg mb-5">10 Kilometres</p>
//                 <div className="flex justify-center gap-4 sm:gap-6 text-xs text-gray-400 border-t border-yellow-200 pt-5">
//                   {[["23 Mar 2026","Event Date"],["Verified","Status"],["VR-2026-XXX","Cert. ID"]].map(([v,l]) => (
//                     <div key={l}><p className="text-gray-800 font-bold text-sm">{v}</p><p>{l}</p></div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ TESTIMONIALS — CAROUSEL ═══════════════ */
// function StarIcon() {
//   return (
//     <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     </svg>
//   );
// }

// function InstagramIcon() {
//   return (
//     <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//     </svg>
//   );
// }

// const REVIEWS = [

//  {
//     id: "69d0f99f7ba5eb0710484fc2",
//     name: "Gourisha Garg",
//     instaId: "",
//     review: "ItI just wanted to share how truly happy and surprised I was to receive the medal. Honestly, it had completely slipped my mind I hadn’t even mentioned it once, and yet you still made sure it reached me. That really meant a lot.The medal is even more beautiful and heavier than it looked in the photos it exceeded my expectations! I genuinely loved being a part of your race, and this thoughtful gesture made the experience even more special Thank you so much, Team. I truly appreciate it!❤️Warm regards Gourisha Garg ",
//     imageUrl: "https://ik.imagekit.io/nnx2tg1jf/WhatsApp%20Image%202026-04-29%20at%2012.41.55%20PM.jpeg",
//     rating: 5,
//   },


// {
//    name: "Tisha",
//  review: "The quality of the medal is top notch. No doubt Thank you so much!!!Will be participating farther as well",
//  imageUrl: "https://ik.imagekit.io/nnx2tg1jf/Screenshot%202026-05-05%20134321.png",
//     rating: 5,

// },



// {
//    name: "Puja giri",
//  review: "Thank you so much valley run organization. Yesterday received my medal . I am really happy to get such a nice novelty Indian map medal.",
//  imageUrl: "https://ik.imagekit.io/nnx2tg1jf/IMG_20260505_061928.jpg",
//     rating: 5,

// },
//   {
//     id: "69d0f99f7ba5eb0710484fc1",
//     name: "Subhojyoti Raha",
//     instaId: "SubhojyotiRaha",
//     review: "It's was such an amazing experience running for the special occasion, absolute goosebumps!!! Looking forward for more marathons and accomplishing them.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577531/Screenshot_2026-04-18_214936_oeag4w.png",
//     rating: 5,
//   },
//   {
//     id: "69d73366f2994ba7616287e5",
//     name: "Swati Saxena",
//     instaId: "soulfitfeminine",
//     review: "Medal is amazing... And the best part you share the photo of the medal... And bestest is this what you share we, received the same with amazing quality....Other virtual race events won't share the  medal photo",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529446/Screenshot_2026-04-18_215206_nmh9vw.png",
//     rating: 5,
//   },
//   {
//     id: "69d5efb98eee92ef0352bad8",
//     name: "AZAD KUMAR NAYAK",
//     instaId: "azad_kumar_nayak",
//     review: "Thank you for this event. An amazing virtual marathon, with affordable price registration. The medal 's design is really beautiful. I'm eager to participate and run for vally run.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529444/Screenshot_2026-04-18_215122_nzh3h9.png",
//     rating: 5,
//   },
//   {
//     id: "69d368c77ba5eb0710486801",
//     name: "Susmit Pal",
//     instaId: "human._.11_",
//     review: "Had a great experience with you guys every step was guided properly and all the issues were resolved. Will sury participate in more events and loved the medal",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529447/Screenshot_2026-04-18_215245_vs6lrf.png",
//     rating: 5,
//   },
//   {
//     id: "69d3711d7ba5eb07104868f8",
//     name: "Jayanth Reddy",
//     instaId: "Jayanth kumar reddy",
//     review: "Thank you us for give this opportunity to participate in this Tribute Run nd good support in Instagram nd WhatsApp if any confusion again tq sir for this grate event",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577531/Screenshot_2026-04-18_215007_jhrkzt.png",
//     rating: 5,
//   },
//   {
//     id: "69d76390f2994ba761628b78",
//     name: "Anshika Singh",
//     instaId: "cappybara_00700",
//     review: "Thankyou valley run It was really awesome challenge it's my first medal for run and after recieving it I can't explain my happiness I was so happy after so much hardwork I put into make myself run and getting this felt so heartwarming and u guys made this dream come true  by giving a reward for our hardwork 💗💗",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529445/Screenshot_2026-04-18_215225_kxg4is.png",
//     rating: 5,
//   },
//   {
//     id: "69d3a29d7ba5eb0710486e39",
//     name: "Sathish S",
//     instaId: "Sathish.sa.75",
//     review: "Absolutely loved the Virtual Running Challenge. It was the perfect motivation to stay active on my own schedule. I just received my FINISHER Medal, and the quality is outstanding. It's heavy, detailed and feels like a real premium trophy. Can't wait to sign up for the next one!",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577534/Screenshot_2026-04-18_215018_on44z2.png",
//     rating: 5,
//   },
//   {
//     id: "69d3d6577ba5eb071048738b",
//     name: "Sudipta Chanda",
//     instaId: "sudipta_chanda.26",
//     review: "The experience was great. Medel quality is good. Very fast delivary. The run respect our Shaheeds.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215022_jln0pz.png",
//     rating: 5,
//   },
//   {
//     id: "69d3ec457ba5eb0710487639",
//     name: "Subarna Pal",
//     instaId: "subarna_008",
//     review: "It was a great experience doing a virtual 10 k for the very first time,looking forward to more runs in the future😁",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776528829/1776528768598_ataga4.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d47fe27ba5eb0710487bd9",
//     name: "Vipin sharma",
//     instaId: "Some_1_here4u",
//     review: "Its a great experience run on shaheed divas and earned a beautiful medal from valleyrun. Running or exercise daily must be a habit of each and everyone for keep yourself healthy and make happy to your near once means ur family. Coz bad healthy condition makes all of in a dipressed life as well as lots of loss in sense of money. I started running and found myself in a good healthy condition means reduce weight from 87 to 72.. so start guys who not and continue who are doing.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215027_mlr1z1.png",
//     rating: 5,
//   },
//   {
//     id: "69d70bbaf2994ba7616284fa",
//     name: "Surender Singh",
//     instaId: "surender_singh_ror_bastara",
//     review: "Nice to participate in this event",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529445/Screenshot_2026-04-18_215215_gcxot6.png",
//     rating: 5,
//   },
//   {
//     id: "69d498d8c10f2ea6f2fc6b85",
//     name: "Navpreet digra",
//     instaId: "____navpreetdigra____",
//     review: "This medal is very beautiful and elegant and if we talk about its weight then it is very heavy. This medal is making my collection very beautiful. Thank you.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215646_ceafup.png",
//     rating: 5,
//   },
//   {
//     id: "69d4dcb55543dea93c4e49ff",
//     name: "Tushar Rawat",
//     instaId: "__rrrawwatt__",
//     review: "Very nice experience Thank u so much valley run 😁🇮🇳",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776578557/Screenshot_2026-04-19_113138_ukqbib.png",
//     rating: 5,
//   },
//   {
//     id: "69d50ee55543dea93c4e4da7",
//     name: "Vishwas",
//     instaId: "vishwas_agrawal",
//     review: "Enjoyed Every step of my run  .. Can't wait to run all over again !!!",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215659_t4qtvs.png",
//     rating: 5,
//   },
//   {
//     id: "69d6b95ef2994ba76162837f",
//     name: "Deepak sonu K",
//     instaId: "deepu-divakaran",
//     review: "I had a really good experience with valley run, my medal received within 12th day  I am very happy to be part of this running event,  i definitely join next ur events so  thankyou valleyrunofficials......",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215703_j914pu.png",
//     rating: 5,
//   },
//   {
//     id: "69d5e1a28eee92ef0352b9c1",
//     name: "VINOD C",
//     instaId: "v_i_n_o_d_v_i_n_u_s",
//     review: "Very good experience, keep motivating, medal is very nice, 🔥🔥I am very much interested in next Run.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215710_r5zuoq.png",
//     rating: 5,
//   },
//   {
//     id: "69d5ebb98eee92ef0352ba99",
//     name: "Rahul kumar",
//     instaId: "Rahul_raj_0048",
//     review: "The running was quite easy and felt very good enjoyed the running competition.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215715_nhsrc7.png",
//     rating: 5,
//   },
//   {
//     id: "69d5ef688eee92ef0352bad6",
//     name: "Yaman Kulhari",
//     instaId: "yaman_kulhari",
//     review: "It was the first time I did something like this and must say it was a great experience...all thanks to valleyrun for this prestigious opportunity.",
//     imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577533/Screenshot_2026-04-18_215725_bdkjwc.png",
//     rating: 5,
//   },
//   {
//     id: "69d3a6067ba5eb0710486e6c",
//     name: "Likhith Lokanath Bangera",
//     instaId: "likki_ganigaz_69",
//     review: "The medal quality was good",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775478278/medal-reviews/slk1mb8u4hejdtgfai68.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d3c2cf7ba5eb0710487142",
//     name: "MADHUR TALELE",
//     instaId: "madt4u",
//     review: "Nice experience, its a good for us or our society",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775485647/medal-reviews/elfz3gi9nm3ovnqthkxm.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d3ce0c7ba5eb07104872a3",
//     name: "Abhishek Girish Nadkarni",
//     instaId: "abhsnad",
//     review: "First of I am very moved by the gesture of dedicating a run for our Shaheed Jawans…Cant do much for them but this is the least that i can do for them. Thanks Valley run for giving me this opportunity! 🙏 Also, appreciate the prompt responses and medal delivery!",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775488524/medal-reviews/a5qjslvtkgc4dznnquno.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d7902df2994ba761628e56",
//     name: "Sushanta  Bhoi",
//     instaId: "Sushantabhoi94",
//     review: "Thank you so much Valley Run for organizing the Virtual Sahid Diwas Run. Today I received my medal and I feel very proud and motivated. It was a wonderful experience and a great initiative to honor our brave heroes. Thank you for the beautiful medal and support. Looking forward to joining more events in future! 🙏🇮🇳🏅",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775734828/medal-reviews/h8xb60afyimewngbepnn.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d3d5047ba5eb071048734c",
//     name: "A V NARAYANA",
//     instaId: "nany555999",
//     review: "It's was awesome experience and thanks for the beautiful medal. Looking for more events",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775490308/medal-reviews/rkby4ybldneslgses43t.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d4bfc55543dea93c4e47f6",
//     name: "Animesh Phukan",
//     instaId: "animesh.phukan_",
//     review: "Medal quality is so nice. Loved it. Thank you. 💥",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775550404/medal-reviews/f4znfaszlzwe0dfbtjje.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d417257ba5eb0710487867",
//     name: "JAVED SHAIKH",
//     instaId: "sk_javed_yt",
//     review: "This very nice medal",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775507236/medal-reviews/j0qj8zktwu7e9eahgbx6.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d460867ba5eb0710487982",
//     name: "Takur arun singh",
//     instaId: "Running_cop_07",
//     review: "It's happy to run with valleyrun official",
//     imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775507236/medal-reviews/j0qj8zktwu7e9eahgbx6.jpg",
//     rating: 5,
//   },
//   // ── Nayi review add karni ho toh yahan add karo ──
//   // {
//   //   id: "unique_id",
//   //   name: "Runner Name",
//   //   instaId: "instagram_handle",
//   //   review: "Review text...",
//   //   imageUrl: "https://cloudinary_url",
//   //   rating: 5,
//   // },
// ];

// function ReviewCard({ review }) {
//   return (
//     <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
//       <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
//         <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//         <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
//           <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
//           Verified Runner
//         </div>
//       </div>
//       <div className="p-5 flex flex-col flex-1">
//         <div className="flex gap-0.5 mb-2">
//           {Array.from({ length: review.rating }).map((_, i) => <StarIcon key={i} />)}
//         </div>
//         <p className="text-gray-500 text-5xl font-serif leading-none mb-1 select-none">"</p>
//         <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 italic mb-4 flex-1">
//           {review.review}
//         </p>
//         <div className="flex items-center justify-between gap-3 mt-auto">
//           <p className="font-black text-gray-900 text-sm">{review.name}</p>
//           <a
//             href={`https://www.instagram.com/${review.instaId}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-2 rounded-full hover:opacity-85 hover:scale-105 transition-all duration-200 flex-shrink-0"
//             style={{ background: "linear-gradient(135deg, #f9a8d4, #fb923c, #a855f7)" }}
//           >
//             <InstagramIcon />
//             @{review.instaId}
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TestimonialsSection() {
//   const [current, setCurrent] = useState(0);
//   const timerRef = useRef(null);
//   const total = REVIEWS.length;

//   const resetTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % total), 17000);
//   };

//   useEffect(() => {
//     timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % total), 17000);
//     return () => clearInterval(timerRef.current);
//   }, [total]);

//   const handlePrev = () => { setCurrent((p) => (p - 1 + total) % total); resetTimer(); };
//   const handleNext = () => { setCurrent((p) => (p + 1) % total); resetTimer(); };

//   const getVisible = () => [0, 1, 2].map((offset) => REVIEWS[(current + offset) % total]);

//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Real Reviews</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What Our Runners Say</h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
//             500+ runners completed their challenge. Here&apos;s what they earned — and what they felt.
//           </p>
//         </div>

//         <div className="relative">
//           {/* Desktop: 3 cards */}
//           <div className="hidden sm:grid grid-cols-3 gap-6">
//             {getVisible().map((review, i) => (
//               <ReviewCard key={`${review.id}-${i}`} review={review} />
//             ))}
//           </div>
//           {/* Mobile: 1 card */}
//           <div className="sm:hidden">
//             <ReviewCard review={REVIEWS[current]} />
//           </div>
//           {/* Prev / Next */}
//           <button onClick={handlePrev} className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">‹</button>
//           <button onClick={handleNext} className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">›</button>
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center gap-2 mt-8">
//           {REVIEWS.map((_, i) => (
//             <button key={i} onClick={() => { setCurrent(i); resetTimer(); }}
//               className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />
//           ))}
//         </div>

//         {/* CTA Strip */}
//         <div className="mt-14 bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//           <div>
//             <p className="text-white font-black text-xl sm:text-2xl">Ready to earn your medal?</p>
//             <p className="text-gray-400 text-sm mt-1">500+ runners already finished. Your turn.</p>
//           </div>
//           <button
//             onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}
//             className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-full text-sm transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap">
//             Register Now →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ GALLERY — SLIDER + LIGHTBOX ═══════════════ */
// function GallerySection({ events }) {
//   const images = events.flatMap((e) => e.gallery || []).slice(0, 12);
//   const [lightbox, setLightbox] = useState(null);
//   const [galIdx, setGalIdx] = useState(0);
//   const galTimer = useRef(null);
//   const VISIBLE = 4;

//   const resetGalTimer = () => {
//     clearInterval(galTimer.current);
//     galTimer.current = setInterval(() => setGalIdx((p) => (p + 1) % Math.max(1, images.length)), 3000);
//   };

//   useEffect(() => {
//     if (images.length > VISIBLE) {
//       galTimer.current = setInterval(() => setGalIdx((p) => (p + 1) % images.length), 3000);
//       return () => clearInterval(galTimer.current);
//     }
//   }, [images.length]);

//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, []);

//   const getVisibleImages = () => {
//     if (images.length === 0) return [];
//     return [0, 1, 2, 3].map((offset) => ({
//       img: images[(galIdx + offset) % images.length],
//       idx: (galIdx + offset) % images.length,
//     }));
//   };

//   return (
//     <section className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Community</span>
//           <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Community Gallery</h2>
//           <p className="text-gray-500 mt-3 text-sm">Real runners. Real finishes. Real medals.</p>
//         </div>

//         {images.length > 0 ? (
//           <>
//             <div className="relative">
//               {/* Desktop: 4 images */}
//               <div className="hidden sm:grid grid-cols-4 gap-3">
//                 {getVisibleImages().map(({ img, idx }) => (
//                   <div key={idx} onClick={() => setLightbox(idx)}
//                     className="relative overflow-hidden rounded-2xl cursor-pointer group"
//                     style={{ aspectRatio: "1" }}>
//                     <img src={img} alt="Runner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//                       <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">View</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* Mobile: 2 images */}
//               <div className="sm:hidden grid grid-cols-2 gap-3">
//                 {[0, 1].map((offset) => {
//                   const idx = (galIdx + offset) % images.length;
//                   return (
//                     <div key={idx} onClick={() => setLightbox(idx)}
//                       className="relative overflow-hidden rounded-2xl cursor-pointer group"
//                       style={{ aspectRatio: "1" }}>
//                       <img src={images[idx]} alt="Runner" className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
//                     </div>
//                   );
//                 })}
//               </div>
//               {images.length > VISIBLE && (
//                 <>
//                   <button onClick={() => { setGalIdx((p) => (p - 1 + images.length) % images.length); resetGalTimer(); }}
//                     className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">‹</button>
//                   <button onClick={() => { setGalIdx((p) => (p + 1) % images.length); resetGalTimer(); }}
//                     className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">›</button>
//                 </>
//               )}
//             </div>
//             <div className="flex justify-center gap-2 mt-6">
//               {images.map((_, i) => (
//                 <button key={i} onClick={() => { setGalIdx(i); resetGalTimer(); }}
//                   className={`rounded-full transition-all duration-300 ${i === galIdx ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-14 sm:p-20 text-center">
//             <div className="text-5xl mb-4">📸</div>
//             <p className="text-lg font-bold text-gray-700">Runner photos coming soon!</p>
//             <p className="text-gray-400 text-sm mt-2">Complete your run, submit proof — we will feature you here.</p>
//           </div>
//         )}
//         <p className="text-center text-gray-400 text-sm mt-6">Finish your run → Submit proof → Get featured here 🏃</p>
//       </div>

//       {/* Lightbox */}
//       {lightbox !== null && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
//           onClick={() => setLightbox(null)}
//         >
//           <button
//             onClick={() => setLightbox(null)}
//             className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all z-10">
//             ×
//           </button>
//           <button
//             onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p - 1 + images.length) % images.length); }}
//             className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all z-10">
//             ‹
//           </button>
//           <img
//             src={images[lightbox]}
//             alt="Runner"
//             className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           />
//           <button
//             onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p + 1) % images.length); }}
//             className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all z-10">
//             ›
//           </button>
//           <div className="absolute bottom-4 text-white/60 text-sm font-medium">
//             {lightbox + 1} / {images.length}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// /* ═══════════════ WHATSAPP ═══════════════ */
// function WhatsAppSection({ url }) {
//   return (
//     <section className="py-12 sm:py-16 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075E54] to-[#128C7E] p-7 sm:p-10 shadow-xl">
//           <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
//           <div className="absolute -right-4 -bottom-16 w-64 h-64 rounded-full bg-white/5" />
//           <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//             <div className="flex items-start gap-4">
//               <div className="bg-[#25D366] rounded-2xl p-3 flex-shrink-0">
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
//               </div>
//               <div>
//                 <h3 className="text-xl font-black text-white mb-1">Stay in the Loop 📣</h3>
//                 <p className="text-green-200 text-sm leading-relaxed max-w-sm">Get live event updates, result announcements, and medal dispatch alerts — first.</p>
//               </div>
//             </div>
//             <a href={url} target="_blank" rel="noopener noreferrer"
//               className="flex-shrink-0 bg-[#25D366] hover:bg-green-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm">
//               Join Channel →
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ FAQ ═══════════════ */
// function FAQSection() {
//   const [open, setOpen] = useState(null);
//   const faqs = [
//     {q:"What apps can I use to track my run?",a:"Any GPS app works — Strava, Nike Run Club, Google Fit, Garmin, Samsung Health, Apple Fitness, or a treadmill screenshot. It should clearly show date, distance, and your profile."},
//     {q:"How do I submit proof?",a:"After completing your run, screenshot your activity and submit via the WhatsApp number or upload link in your confirmation email. We verify within 24 hours."},
//     {q:"Can I run on a treadmill?",a:"Absolutely! Valley Run is fully virtual — treadmill, road, track, park. All count. What matters is the distance and your discipline."},
//     {q:"When will I receive my medal?",a:"Medals dispatch in batches after the event window closes. Delivery is 7–10 working days. You will get a tracking number via WhatsApp or email once shipped."},
//     {q:"Is shipping really free?",a:"100% free, pan-India. Tier 1, 2, and 3 cities all included — no hidden charges whatsoever."},
//     {q:"Do I need to complete the distance in one go?",a:"Yes — one continuous activity on your tracking app. Split or combined activities won't be accepted as valid proof."},
//     {q:"Is there a refund if I cannot finish?",a:"We don't offer refunds for incomplete challenges since medals are manufactured in advance. For genuine emergencies, write to us — we handle each case personally."},
//     {q:"Can I register for both 5K and 10K?",a:"Yes! Each registration is separate and comes with its own medal and certificate."},
//   ];
//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">FAQ</span>
//           <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Common Questions</h2>
//         </div>
//         <div className="space-y-2">
//           {faqs.map((faq, i) => (
//             <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${open===i ? "border-red-200 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
//               <button className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4" onClick={() => setOpen(open===i ? null : i)}>
//                 <span className="font-bold text-sm sm:text-base text-gray-900 pr-4">{faq.q}</span>
//                 <span className={`text-gray-400 text-2xl font-light flex-shrink-0 transition-transform duration-300 ${open===i ? "rotate-45 text-red-500" : ""}`}>+</span>
//               </button>
//               <div className={`overflow-hidden transition-all duration-300 ${open===i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
//                 <p className="px-5 sm:px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-10 rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 sm:p-8 text-center">
//           <p className="font-bold text-gray-900 mb-1">Still have questions?</p>
//           <p className="text-gray-500 text-sm mb-5">We reply within a few hours.</p>
//           <div className="flex flex-wrap gap-3 justify-center">
//             <a href="https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M" target="_blank" rel="noopener noreferrer"
//               className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-green-500 transition-colors">💬 WhatsApp</a>
//             <a href="mailto:valleyrun.official@gmail.com"
//               className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full text-sm hover:border-gray-400 transition-colors">✉️ Email Us</a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ FINAL CTA ═══════════════ */
// function FinalCTA({ router }) {
//   return (
//     <section className="py-20 sm:py-28 bg-gray-900 text-white text-center relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none" />
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
//       <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
//         <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">Your Discipline<br />Has a Deadline.</h2>
//         <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">Join now. Finish strong.<br />Earn something that reminds you who you are.</p>
//         <p className="text-gray-600 text-xs mt-5">Free shipping · Real medal · Pan-India delivery</p>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";

const REVIEWS = [
  { id: "1", name: "Gourisha Garg", instaId: "", review: "I just wanted to share how truly happy and surprised I was to receive the medal. Honestly, it had completely slipped my mind — and yet you still made sure it reached me. The medal is even more beautiful and heavier than it looked in the photos — it exceeded my expectations!", imageUrl: "https://ik.imagekit.io/nnx2tg1jf/WhatsApp%20Image%202026-04-29%20at%2012.41.55%20PM.jpeg", rating: 5 },
  { id: "2", name: "Tisha", instaId: "", review: "The quality of the medal is top notch. No doubt. Thank you so much!!! Will be participating further as well.", imageUrl: "https://ik.imagekit.io/nnx2tg1jf/Screenshot%202026-05-05%20134321.png", rating: 5 },
  { id: "3", name: "Puja Giri", instaId: "", review: "Thank you so much Valley Run organization. Yesterday received my medal. I am really happy to get such a nice novelty Indian map medal.", imageUrl: "https://ik.imagekit.io/nnx2tg1jf/IMG_20260505_061928.jpg", rating: 5 },
  { id: "4", name: "Subhojyoti Raha", instaId: "SubhojyotiRaha", review: "It was such an amazing experience running for the special occasion, absolute goosebumps!!! Looking forward for more marathons and accomplishing them.", imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577531/Screenshot_2026-04-18_214936_oeag4w.png", rating: 5 },
  { id: "5", name: "Swati Saxena", instaId: "soulfitfeminine", review: "Medal is amazing... And the best part you share the photo of the medal. Bestest is what you share we received the same with amazing quality. Other virtual race events won't share the medal photo!", imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529446/Screenshot_2026-04-18_215206_nmh9vw.png", rating: 5 },
  { id: "6", name: "Anshika Singh", instaId: "cappybara_00700", review: "Thankyou valley run It was really awesome challenge — it's my first medal for run and after receiving it I can't explain my happiness. I was so happy after so much hardwork. Getting this felt so heartwarming 💗", imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776529445/Screenshot_2026-04-18_215225_kxg4is.png", rating: 5 },
  { id: "7", name: "Sathish S", instaId: "Sathish.sa.75", review: "Absolutely loved the Virtual Running Challenge. It was the perfect motivation to stay active on my own schedule. I just received my FINISHER Medal, and the quality is outstanding — heavy, detailed and feels like a real premium trophy.", imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577534/Screenshot_2026-04-18_215018_on44z2.png", rating: 5 },
  { id: "8", name: "Vipin Sharma", instaId: "Some_1_here4u", review: "Its a great experience. I started running and found myself in a good healthy condition — reduced weight from 87 to 72! So start guys who haven't and continue who are doing.", imageUrl: "https://res.cloudinary.com/dvlo3swno/image/upload/v1776577532/Screenshot_2026-04-18_215027_mlr1z1.png", rating: 5 },
  { id: "9", name: "Abhishek Girish Nadkarni", instaId: "abhsnad", review: "First of all I am very moved by the gesture of dedicating a run for our Shaheed Jawans. Can't do much for them but this is the least I can do. Thanks Valley Run! Also appreciate the prompt responses and medal delivery!", imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775488524/medal-reviews/a5qjslvtkgc4dznnquno.jpg", rating: 5 },
];

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then(r => r.json())
      .then(d => { if (d.success) setEvents(d.events); });
  }, []);

  const liveEvents = events.filter(e => e.active && !e.isPrevious);
  const pastEvents = events.filter(e => e.isPrevious === true);
  const medalEvents = events.filter(e => e.medalImage);
  const galleryImages = events.flatMap(e => e.gallery || []);

  return (
    <div style={{ background: "#fff", color: "#111", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .inter { font-family: 'Inter', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes spin3d { from { transform:rotateY(0deg); } to { transform:rotateY(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
        .fade-up { animation: fadeUp 0.8s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.6s; }
        .card-hover { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.13); }
        .btn-primary { background: #c0392b; color: #fff; border: none; border-radius: 60px; padding: 16px 36px; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: background 0.2s, transform 0.2s; letter-spacing: 0.5px; }
        .btn-primary:hover { background: #a93226; transform: scale(1.03); }
        .btn-outline { background: transparent; color: #111; border: 2px solid #ddd; border-radius: 60px; padding: 14px 32px; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
        .btn-outline:hover { border-color: #c0392b; color: #c0392b; }
        .section-tag { display: inline-block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #c0392b; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 20px; padding: 5px 14px; margin-bottom: 18px; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #f5f5f5; } ::-webkit-scrollbar-thumb { background: #c0392b; border-radius: 10px; }
      `}</style>

      <Navbar />

      {/* ═══ HERO ═══ */}
      <HeroSection router={router} liveEvents={liveEvents} />

      {/* ═══ TRUST TICKER ═══ */}
      <TrustTicker />

      {/* ═══ STATS ═══ */}
      <StatsSection />

      {/* ═══ WHY JOIN ═══ */}
      <WhySection />

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorks />

      {/* ═══ ACTIVE CHALLENGES ═══ */}
      {liveEvents.length > 0 && <ChallengesSection events={liveEvents} router={router} />}

      {/* ═══ 3D MEDAL ═══ */}
      {medalEvents.length > 0 && <MedalSection events={medalEvents} />}

      {/* ═══ REVIEWS ═══ */}
      <ReviewsSection />

      {/* ═══ GALLERY ═══ */}
      {galleryImages.length > 0 && <GallerySection images={galleryImages} />}

      {/* ═══ PREVIOUS EVENTS ═══ */}
      {pastEvents.length > 0 && <PastEventsSection events={pastEvents} router={router} />}

      {/* ═══ WHATSAPP ═══ */}
      <WhatsAppSection />

      {/* ═══ FAQ ═══ */}
      <FAQSection />

      {/* ═══ FINAL CTA ═══ */}
      <FinalCTA router={router} />
    </div>
  );
}

/* ─── HERO ─── */
function HeroSection({ router, liveEvents }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c += 8; if (c >= 600) { setCount(600); clearInterval(t); } else setCount(c); }, 20);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0a0a0a" }}>
      {/* BG Image */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.45 }} />
      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.3))" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, #fff, transparent)" }} />
      {/* Red accent line */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, #c0392b, transparent)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "120px 40px 80px", width: "100%" }}>
        {/* Live badge */}
        <div className="fade-up fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: 40, padding: "8px 20px", marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#c0392b", display: "inline-block", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#fca5a5", letterSpacing: 1.5, textTransform: "uppercase" }}>
            {count}+ Runners from across India
          </span>
        </div>

        {/* Headline */}
        <h1 className="pf fade-up fade-up-2" style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: 24, maxWidth: 700 }}>
          Discipline<br />
          <span style={{ color: "#c0392b", fontStyle: "italic" }}>Builds</span>{" "}
          Legends.
        </h1>

        <p className="inter fade-up fade-up-3" style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}>
          Anyone can start. Very few finish. Valley Run exists for those who choose consistency over comfort — and earn a real medal for it.
        </p>

        <div className="fade-up fade-up-4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}>
            View Challenges →
          </button>
          <button className="btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
            How It Works
          </button>
        </div>

        {/* Stats row */}
        <div className="fade-up fade-up-4" style={{ display: "flex", gap: 40, marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {[["600+", "Runners"], ["Pan India", "Delivery"], ["Real Metal", "Medals"], ["24hr", "Verification"]].map(([n, l]) => (
            <div key={l}>
              <div className="pf" style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{n}</div>
              <div className="inter" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST TICKER ─── */
function TrustTicker() {
  const items = ["🏅 Real Zinc Alloy Medals", "📦 Free Pan-India Shipping", "📸 Any GPS App Accepted", "⚡ Verified in 24 Hours", "🇮🇳 Made for Indian Runners", "🔒 Razorpay Secured", "🏆 Leaderboard Recognition", "📜 Digital Certificate"];
  return (
    <div style={{ background: "#111", padding: "14px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 60, width: "max-content", animation: "ticker 30s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="inter" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: 1, whiteSpace: "nowrap" }}>
            {item} <span style={{ color: "#c0392b", marginLeft: 30 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── STATS ─── */
function StatsSection() {
  return (
    <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, border: "1px solid #eee", borderRadius: 20, overflow: "hidden" }}>
        {[
          { n: "600+", l: "Finishers", d: "Runners who earned their medal" },
          { n: "4", l: "Events Done", d: "Across India's biggest occasions" },
          { n: "24hr", l: "Verification", d: "Fast proof review guaranteed" },
          { n: "100%", l: "Real Medals", d: "Zinc alloy, not plastic" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "40px 32px", background: i % 2 === 0 ? "#fff" : "#fafafa", borderRight: i < 3 ? "1px solid #eee" : "none" }}>
            <div className="pf" style={{ fontSize: 42, fontWeight: 900, color: "#c0392b", marginBottom: 6 }}>{s.n}</div>
            <div className="inter" style={{ fontSize: 13, fontWeight: 700, color: "#111", letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{s.l}</div>
            <div className="inter" style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── WHY JOIN ─── */
function WhySection() {
  const cards = [
    { icon: "⏳", title: "Fixed Deadlines", desc: "Deadlines create discipline. You don't train 'someday' — you train now." },
    { icon: "🏅", title: "Real Rewards", desc: "Heavy zinc-alloy medals shipped home. Not digital badges that disappear." },
    { icon: "🧠", title: "Mental Strength", desc: "You finish stronger than you started — mentally and physically." },
    { icon: "📍", title: "Run Anywhere", desc: "Road, treadmill, track — run in your city on your own schedule." },
    { icon: "📸", title: "Easy Proof", desc: "Screenshot from Strava, Nike Run Club, or any GPS app. We verify in 24hrs." },
    { icon: "🤝", title: "Community", desc: "Join hundreds of runners across India chasing the same finish line." },
  ];

  return (
    <section style={{ padding: "100px 40px", background: "#f9f8f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <span className="section-tag">Why Valley Run</span>
          <h2 className="pf" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.1 }}>
            More Than a Race.<br />
            <span style={{ color: "#c0392b", fontStyle: "italic" }}>A Proof of Character.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, border: "1px solid #e8e5e0", borderRadius: 20, overflow: "hidden" }}>
          {cards.map((c, i) => (
            <div key={i} className="card-hover" style={{
              padding: "36px 32px",
              background: "#fff",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid #e8e5e0" : "none",
              borderBottom: i < 3 ? "1px solid #e8e5e0" : "none",
              cursor: "default"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
              <h3 className="inter" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#111" }}>{c.title}</h3>
              <p className="inter" style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const [active, setActive] = useState(0);
  const steps = [
    { n: "01", icon: "🏃", title: "Register", sub: "Pick your distance & pay", desc: "Choose 1600m to 21km. Pay securely via Razorpay in under 2 minutes." },
    { n: "02", icon: "📍", title: "Run Anywhere", sub: "Your city, your route", desc: "Road, treadmill, or track — run anywhere in India during the event window." },
    { n: "03", icon: "📸", title: "Submit Proof", sub: "Screenshot your GPS app", desc: "Strava, Nike, Google Fit — any app screenshot showing date and distance." },
    { n: "04", icon: "🏅", title: "Receive Medal", sub: "Delivered to your door", desc: "Real zinc-alloy finisher medal, free pan-India shipping, 7-10 working days." },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % 4), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="how-it-works" style={{ padding: "100px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <span className="section-tag">Simple Process</span>
          <h2 className="pf" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900 }}>
            Four Steps to Your<br />
            <span style={{ color: "#c0392b", fontStyle: "italic" }}>Finisher Medal.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 20, padding: "20px 24px",
                  background: active === i ? "#fef2f2" : "#fff",
                  border: active === i ? "2px solid #fca5a5" : "2px solid #f0eeea",
                  borderRadius: 16, cursor: "pointer", textAlign: "left", transition: "all 0.3s"
                }}>
                <span className="pf" style={{ fontSize: 28, fontWeight: 900, color: active === i ? "#c0392b" : "#ddd", minWidth: 40 }}>{s.n}</span>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <div className="inter" style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{s.title}</div>
                  <div className="inter" style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.sub}</div>
                  {active === i && <div className="inter" style={{ fontSize: 13, color: "#555", marginTop: 8, lineHeight: 1.6 }}>{s.desc}</div>}
                </div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 360, background: "#fafaf8", borderRadius: 24, border: "2px solid #f0eeea", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #c0392b, #e74c3c)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>{steps[active].icon}</div>
              <div className="pf" style={{ fontSize: 28, fontWeight: 900, color: "#111" }}>{steps[active].title}</div>
              <div className="inter" style={{ fontSize: 14, color: "#888", marginTop: 6 }}>{steps[active].sub}</div>
            </div>
            <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
              {steps.map((_, i) => (
                <div key={i} style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? "#c0392b" : "#ddd", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CHALLENGES ─── */
function ChallengesSection({ events, router }) {
  return (
    <section id="challenges" style={{ padding: "100px 40px", background: "#f9f8f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-tag">Live Now</span>
            <h2 className="pf" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900 }}>Active Challenges</h2>
          </div>
          <button className="btn-outline inter" onClick={() => router.push("/challenges")} style={{ fontSize: 13 }}>View All →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {events.map(ev => <PremiumEventCard key={ev._id} event={ev} router={router} />)}
        </div>
      </div>
    </section>
  );
}

function PremiumEventCard({ event, router }) {
  const now = new Date();
  const regClosed = event.isRegistrationOpen === false || (event.registrationDeadline && new Date(event.registrationDeadline) < now);

  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e8e5e0" }}>
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#f0eeea" }}>
        {(event.coverImage || event.image) && (
          <img src={event.coverImage || event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 16, left: 16 }}>
          {regClosed ? (
            <span className="inter" style={{ background: "rgba(0,0,0,0.7)", color: "#ccc", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, letterSpacing: 0.5 }}>
              🏃 Event Running
            </span>
          ) : (
            <span className="inter" style={{ background: "#c0392b", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "pulse 1.5s infinite", display: "inline-block" }} />
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px" }}>
        <h3 className="pf" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{event.title}</h3>
        <p className="inter" style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>{event.dates}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0eeea", paddingTop: 16 }}>
          <span className="pf" style={{ fontSize: 22, fontWeight: 900, color: "#c0392b" }}>₹{event.price || 399}</span>
          {regClosed ? (
            <button className="btn-primary inter" style={{ fontSize: 13, padding: "10px 20px" }} onClick={() => router.push(`/activity-submission?event=${event.slug}`)}>
              📸 Submit Activity
            </button>
          ) : (
            <button className="btn-primary inter" style={{ fontSize: 13, padding: "10px 20px" }} onClick={() => router.push(`/challenges/${event.slug}`)}>
              Register Now →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── 3D MEDAL ─── */
function Medal3D({ event }) {
  const rotY = useRef(0), rotX = useRef(-10);
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  const autoOn = useRef(true), rafId = useRef(null), autoTimer = useRef(null);
  const innerRef = useRef(null);

  const apply = () => { if (innerRef.current) innerRef.current.style.transform = `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`; };
  useEffect(() => {
    const tick = () => { if (autoOn.current) { rotY.current += 0.4; apply(); } rafId.current = requestAnimationFrame(tick); };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const pauseAuto = () => { autoOn.current = false; clearTimeout(autoTimer.current); autoTimer.current = setTimeout(() => { autoOn.current = true; }, 3000); };
  const onDown = (x, y) => { drag.current = { active: true, lastX: x, lastY: y }; pauseAuto(); };
  const onMove = (x, y) => {
    if (!drag.current.active) return;
    rotY.current += (x - drag.current.lastX) * 0.7;
    rotX.current = Math.max(-35, Math.min(35, rotX.current - (y - drag.current.lastY) * 0.4));
    drag.current.lastX = x; drag.current.lastY = y; apply();
  };
  const onUp = () => { drag.current.active = false; };
  const face = (extra = {}) => ({ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "50%", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden", willChange: "transform", ...extra });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ width: 300, height: 300, perspective: "900px", cursor: "grab", userSelect: "none", position: "relative" }}
        onMouseDown={e => { e.preventDefault(); onDown(e.clientX, e.clientY); }} onMouseMove={e => onMove(e.clientX, e.clientY)} onMouseUp={onUp} onMouseLeave={onUp}
        onTouchStart={e => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }} onTouchMove={e => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }} onTouchEnd={onUp}>
        <div ref={innerRef} style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}>
          <div style={face({ background: "#111", boxShadow: "0 24px 70px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2)" })}>
            {event.medalImage && <img src={event.medalImage} alt="Front" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", pointerEvents: "none" }} />}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)", pointerEvents: "none" }} />
          </div>
          <div style={face({ transform: "rotateY(180deg)", background: "#111", boxShadow: "0 24px 70px rgba(0,0,0,0.4)" })}>
            {event.medalImageBack ? <img src={event.medalImageBack} alt="Back" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", pointerEvents: "none" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🇮🇳</div>}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)", pointerEvents: "none" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", transform: "translateZ(-6px)", background: "radial-gradient(ellipse, #8B6914, #5D4409)", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }} />
        </div>
        <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: 140, height: 12, background: "radial-gradient(ellipse, rgba(0,0,0,0.2), transparent)", filter: "blur(4px)", pointerEvents: "none" }} />
      </div>
      <p className="inter" style={{ fontSize: 12, color: "#aaa", letterSpacing: 1 }}>👆 Drag to rotate</p>
      <div style={{ textAlign: "center" }}>
        <p className="pf" style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>{event.title}</p>
        <p className="inter" style={{ fontSize: 12, color: "#888", marginTop: 3 }}>Premium Finisher Medal</p>
      </div>
    </div>
  );
}

function MedalSection({ events }) {
  return (
    <section style={{ padding: "100px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <span className="section-tag">Your Reward</span>
        <h2 className="pf" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, marginBottom: 12 }}>What You Earn</h2>
        <p className="inter" style={{ fontSize: 15, color: "#666", maxWidth: 500, margin: "0 auto 60px", lineHeight: 1.7 }}>
          Proof beats motivation. Every finisher earns a real, heavy zinc-alloy medal — shipped to your door, free.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 60 }}>
          {events.slice(0, 2).map(ev => <Medal3D key={ev._id} event={ev} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 60, maxWidth: 700, margin: "60px auto 0" }}>
          {[["📦", "Free Shipping", "Pan India"], ["⚡", "7-10 Days", "Delivery"], ["⭐", "Zinc Alloy", "Premium Metal"], ["🔒", "Guaranteed", "Or full refund"]].map(([e, t, s]) => (
            <div key={t} style={{ background: "#f9f8f6", borderRadius: 14, padding: "20px 12px", textAlign: "center", border: "1px solid #e8e5e0" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{e}</div>
              <div className="inter" style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{t}</div>
              <div className="inter" style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = REVIEWS.length;

  const resetTimer = () => { clearInterval(timerRef.current); timerRef.current = setInterval(() => setCurrent(p => (p + 1) % total), 6000); };
  useEffect(() => { timerRef.current = setInterval(() => setCurrent(p => (p + 1) % total), 6000); return () => clearInterval(timerRef.current); }, [total]);

  const visible = [0, 1, 2].map(o => REVIEWS[(current + o) % total]);

  return (
    <section style={{ padding: "100px 40px", background: "#f9f8f6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">Real Reviews</span>
          <h2 className="pf" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900 }}>
            What Our Runners Say
          </h2>
          <p className="inter" style={{ fontSize: 15, color: "#666", marginTop: 12 }}>
            600+ runners completed their challenge. Here's what they felt.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Desktop 3 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {visible.map((r, i) => (
              <div key={`${r.id}-${i}`} className="card-hover" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e8e5e0" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={r.imageUrl} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.5)", borderRadius: 20, padding: "4px 10px" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    <span className="inter" style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Verified Runner</span>
                  </div>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
                  </div>
                  <p className="inter" style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", fontStyle: "italic" }}>
                    "{r.review}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="pf" style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</span>
                    {r.instaId && (
                      <a href={`https://instagram.com/${r.instaId}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "linear-gradient(135deg, #f9a8d4, #fb923c, #a855f7)", color: "#fff", textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
                        @{r.instaId}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          {[[-1, "‹", "-left-5"], [1, "›", "-right-5"]].map(([dir, icon, pos]) => (
            <button key={icon} onClick={() => { setCurrent(p => (p + dir + total) % total); resetTimer(); }}
              style={{ position: "absolute", [dir === -1 ? "left" : "right"]: -20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "2px solid #e8e5e0", fontSize: 20, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", transition: "border-color 0.2s, color 0.2s", color: "#555" }}
              onMouseEnter={e => { e.target.style.borderColor = "#c0392b"; e.target.style.color = "#c0392b"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#e8e5e0"; e.target.style.color = "#555"; }}>
              {icon}
            </button>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 32 }}>
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); resetTimer(); }}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === current ? "#c0392b" : "#ddd", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>

        {/* CTA bar */}
        <div style={{ marginTop: 56, background: "#111", borderRadius: 20, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="pf" style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>Ready to earn your medal?</p>
            <p className="inter" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 4 }}>600+ runners already finished. Your turn.</p>
          </div>
          <button className="btn-primary" onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}>
            Register Now →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY MASONRY ─── */
function GallerySection({ images }) {
  const [lightbox, setLightbox] = useState(null);
  const shown = images.slice(0, 9);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Masonry-style layout using CSS columns
  return (
    <section style={{ padding: "100px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">Community</span>
          <h2 className="pf" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900 }}>Community Gallery</h2>
          <p className="inter" style={{ fontSize: 14, color: "#888", marginTop: 10 }}>Real runners. Real finishes. Real medals.</p>
        </div>

        {/* Masonry */}
        <div style={{ columns: "3 280px", gap: 16, columnFill: "balance" }}>
          {shown.map((img, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              style={{ breakInside: "avoid", marginBottom: 16, borderRadius: 16, overflow: "hidden", cursor: "zoom-in", position: "relative", display: "block" }}>
              <img src={img} alt={`Runner ${i + 1}`}
                style={{ width: "100%", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.3s" }}
                onMouseEnter={e => e.target.style.background = "rgba(0,0,0,0.15)"}
                onMouseLeave={e => e.target.style.background = "rgba(0,0,0,0)"} />
            </div>
          ))}
        </div>

        <p className="inter" style={{ textAlign: "center", color: "#aaa", fontSize: 13, marginTop: 32 }}>
          Finish your run → Submit proof → Get featured here 🏃
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 20, cursor: "pointer" }}>×</button>
          <button onClick={e => { e.stopPropagation(); setLightbox(p => (p - 1 + shown.length) % shown.length); }} style={{ position: "absolute", left: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 50, height: 50, borderRadius: "50%", fontSize: 24, cursor: "pointer" }}>‹</button>
          <img src={shown[lightbox]} alt="" onClick={e => e.stopPropagation()} style={{ maxHeight: "88vh", maxWidth: "88vw", objectFit: "contain", borderRadius: 12 }} />
          <button onClick={e => { e.stopPropagation(); setLightbox(p => (p + 1) % shown.length); }} style={{ position: "absolute", right: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 50, height: 50, borderRadius: "50%", fontSize: 24, cursor: "pointer" }}>›</button>
          <div className="inter" style={{ position: "absolute", bottom: 16, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{lightbox + 1} / {shown.length}</div>
        </div>
      )}
    </section>
  );
}

/* ─── PAST EVENTS ─── */
function PastEventsSection({ events, router }) {
  return (
    <section style={{ padding: "80px 40px", background: "#f9f8f6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <span className="inter" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#888" }}>Past Events</span>
          <h2 className="pf" style={{ fontSize: 32, fontWeight: 900, color: "#555", marginTop: 8 }}>Previous Challenges</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {events.map(ev => (
            <div key={ev._id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e8e5e0", opacity: 0.8 }}>
              <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                {(ev.coverImage || ev.image) && <img src={ev.coverImage || ev.image} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%)" }} />}
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", borderRadius: 20, padding: "4px 10px" }}>
                  <span className="inter" style={{ fontSize: 10, fontWeight: 700, color: "#ccc" }}>✅ Completed</span>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <h3 className="pf" style={{ fontSize: 15, fontWeight: 700, color: "#555", marginBottom: 4 }}>{ev.title}</h3>
                <p className="inter" style={{ fontSize: 12, color: "#aaa", marginBottom: 14 }}>{ev.dates}</p>
                <button onClick={() => router.push(`/leaderboard/${ev.slug}`)}
                  style={{ width: "100%", padding: "9px 0", border: "1.5px solid #ddd", borderRadius: 30, background: "transparent", color: "#777", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "#c0392b"; e.target.style.color = "#c0392b"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#ddd"; e.target.style.color = "#777"; }}>
                  View Results →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHATSAPP ─── */
function WhatsAppSection() {
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #075E54, #128C7E)", borderRadius: 24, padding: "44px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div>
            <h3 className="pf" style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Stay in the Loop 📣</h3>
            <p className="inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 360, lineHeight: 1.7 }}>
              Get live event updates, result announcements, and medal dispatch alerts — first.
            </p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 40, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "inline-block", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}>
            Join Channel →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQSection() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What apps can I use to track my run?", a: "Any GPS app works — Strava, Nike Run Club, Google Fit, Garmin, Samsung Health, Apple Fitness, or a treadmill screenshot. It should clearly show date, distance, and your profile." },
    { q: "Can I run on a treadmill?", a: "Absolutely! Valley Run is fully virtual — treadmill, road, track, park. All count. What matters is the distance and your discipline." },
    { q: "When will I receive my medal?", a: "Medals dispatch in batches after the event window closes. Delivery is 7–10 working days. You'll get a tracking number via WhatsApp or email once shipped." },
    { q: "Is shipping really free?", a: "100% free, pan-India. Tier 1, 2, and 3 cities all included — no hidden charges whatsoever." },
    { q: "Do I need to complete the distance in one go?", a: "Yes — one continuous activity on your tracking app. Split or combined activities won't be accepted as valid proof." },
    { q: "Is there a refund if I cannot finish?", a: "We don't offer refunds for incomplete challenges since medals are manufactured in advance. For genuine emergencies, write to us — we handle each case personally." },
  ];

  return (
    <section style={{ padding: "100px 40px", background: "#f9f8f6" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">FAQ</span>
          <h2 className="pf" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900 }}>Common Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#fff", border: `2px solid ${open === i ? "#fca5a5" : "#e8e5e0"}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                <span className="inter" style={{ fontWeight: 600, fontSize: 15, color: "#111" }}>{f.q}</span>
                <span style={{ fontSize: 22, color: open === i ? "#c0392b" : "#bbb", transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.3s, color 0.2s", flexShrink: 0 }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p className="inter" style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: "#fff", borderRadius: 16, padding: "28px 32px", textAlign: "center", border: "1px solid #e8e5e0" }}>
          <p className="pf" style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Still have questions?</p>
          <p className="inter" style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>We reply within a few hours.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M" target="_blank" rel="noopener noreferrer"
              style={{ background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: 30, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              💬 WhatsApp
            </a>
            <a href="mailto:valleyrun.official@gmail.com"
              style={{ border: "2px solid #e8e5e0", color: "#444", padding: "12px 24px", borderRadius: 30, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA({ router }) {
  return (
    <section style={{ padding: "100px 40px", background: "#0a0a0a", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(192,57,43,0.15), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 600, margin: "0 auto" }}>
        <h2 className="pf" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
          Your Discipline<br />
          <span style={{ color: "#c0392b", fontStyle: "italic" }}>Has a Deadline.</span>
        </h2>
        <p className="inter" style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 40 }}>
          Join now. Finish strong.<br />Earn something that reminds you who you are.
        </p>
        <button className="btn-primary" style={{ fontSize: 16, padding: "18px 44px" }} onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}>
          Start Your Challenge →
        </button>
        <p className="inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 20, letterSpacing: 1 }}>
          Free shipping · Real medal · Pan-India delivery
        </p>
      </div>
    </section>
  );
}
