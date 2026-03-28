// // "use client";

// // import { useEffect, useState } from "react";
// // import Navbar from "./components/Navbar";
// // import { useRouter } from "next/navigation";

// // export default function HomePage() {
// //   const router = useRouter();
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
// //       .then(res => res.json())
// //       .then(data => {
// //         if (data.success) setEvents(data.events);
// //       });
// //   }, []);

// //   return (
// //     <>
// //       <Navbar />

// //       <section
// //   className="relative min-h-[80vh] flex items-center"
// //   style={{
// //     backgroundImage: "url('/hero.jpg')", // 🔥 put image in /public/hero.jpg
// //     backgroundSize: "cover",
// //     backgroundPosition: "center"
// //   }}
// // >
// //   <div className="absolute inset-0 bg-black/60"></div>

// //   <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
// //     <p className="uppercase tracking-widest text-sm mb-4">
// //       Virtual Fitness Challenges
// //     </p>

// //     <h1 className="text-5xl font-extrabold leading-tight mb-6">
// //       Discipline Builds <br />
// //       <span className="text-red-500">Legends.</span>
// //     </h1>

// //     <p className="max-w-xl text-lg text-gray-200 mb-8">
// //       Anyone can start. Very few finish.  
// //       Valley Run exists for those who choose consistency over comfort.
// //     </p>

// //     <div className="flex gap-4">
// //       <a
// //         href="/challenges"
// //         className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-semibold"
// //       >
// //         Explore Challenges
// //       </a>

// //       <a
// //         href="/challenges"
// //         className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
// //       >
// //         Start Your Journey
// //       </a>
// //     </div>
// //   </div>
// // </section>


// //       {/* ================= WHY JOIN ================= */}
// //       <section className="py-28 bg-white">
// //         <div className="max-w-6xl mx-auto px-6 text-center">
// //           <h2 className="text-4xl font-bold mb-6">
// //             Why Join Valley Run?
// //           </h2>

// //           <p className="text-gray-600 max-w-3xl mx-auto mb-16">
// //             This is not entertainment.
// //             This is structure, accountability and proof of effort.
// //           </p>

// //           <div className="grid md:grid-cols-3 gap-12">
// //             <div>
// //               <h3 className="text-xl font-semibold mb-3">
// //                 ⏳ Fixed Deadlines
// //               </h3>
// //               <p className="text-gray-600">
// //                 Deadlines create discipline.
// //                 You don’t train “someday” — you train now.
// //               </p>
// //             </div>

// //             <div>
// //               <h3 className="text-xl font-semibold mb-3">
// //                 🏅 Real Rewards
// //               </h3>
// //               <p className="text-gray-600">
// //                 Heavy metal medals.
// //                 Not digital badges that disappear.
// //               </p>
// //             </div>

// //             <div>
// //               <h3 className="text-xl font-semibold mb-3">
// //                 🧠 Mental Strength
// //               </h3>
// //               <p className="text-gray-600">
// //                 You finish stronger than you started —
// //                 mentally and physically.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= ACTIVE CHALLENGES ================= */}
// //       <section className="py-24 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <h2 className="text-4xl font-bold text-center mb-14">
// //             Active Challenges
// //           </h2>

// //           <div className="grid md:grid-cols-3 gap-10">
// //             {events.map(event => (
// //               <div
// //                 key={event._id}
// //                 className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
// //               >
// //                 {/* COVER IMAGE */}
// //                 <img
// //                   src={event.image}
// //                   alt={event.title}
// //                   className="h-56 w-full object-cover"
// //                 />

// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold mb-1">
// //                     {event.title}
// //                   </h3>

// //                   <p className="text-gray-500 text-sm mb-5">
// //                     {event.dates}
// //                   </p>

// //                   <button
// //                     onClick={() =>
// //                       router.push(`/challenges/${event.slug}`)
// //                     }
// //                     className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
// //                   >
// //                     View Challenge
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= WHAT YOU EARN ================= */}
// //       <section className="py-28 bg-white">
// //         <div className="max-w-6xl mx-auto px-6 text-center">
// //           <h2 className="text-4xl font-bold mb-6">
// //             What You Earn
// //           </h2>

// //           <p className="text-gray-600 max-w-3xl mx-auto mb-16">
// //             Proof beats motivation.
// //             Every finisher earns something tangible.
// //           </p>

// //           <div className="grid md:grid-cols-3 gap-10">
// //             {events.map(event => (
// //               <div
// //                 key={event._id}
// //                 className="bg-gray-50 rounded-3xl p-6 shadow"
// //               >
// //                 {/* MEDAL IMAGE */}
// //                 <img
// //                   src={event.medalImage || event.gallery?.[0]}
// //                   alt="Premium Medal"
// //                   className="h-64 w-full object-cover rounded-xl mb-4"
// //                 />

// //                 <p className="font-semibold">
// //                   {event.title} – Finisher Medal
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= COMMUNITY GALLERY ================= */}
// //       <section className="py-24 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <h2 className="text-4xl font-bold text-center mb-14">
// //             Community Gallery
// //           </h2>

// //           <div className="grid md:grid-cols-4 gap-6">
// //             {events
// //               .flatMap(e => e.gallery || [])
// //               .slice(0, 8)
// //               .map((img, i) => (
// //                 <img
// //                   key={i}
// //                   src={img}
// //                   alt="Community"
// //                   className="h-48 w-full object-cover rounded-2xl"
// //                 />
// //               ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= FINAL CTA ================= */}
// //       <section className="py-28 bg-black text-white text-center">
// //         <h2 className="text-4xl font-bold mb-6">
// //           Your Discipline Has a Deadline.
// //         </h2>

// //         <p className="text-gray-300 mb-10">
// //           Join now. Finish strong.
// //           Earn something that reminds you who you are.
// //         </p>

// //         <button
// //           onClick={() => router.push("/challenges")}
// //           className="bg-red-600 hover:bg-red-700 px-12 py-5 rounded-full font-semibold shadow-xl"
// //         >
// //           Join a Challenge
// //         </button>
// //       </section>
// //     </>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import { useRouter } from "next/navigation";

// const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";
// const REGISTRATION_DEADLINE = "2026-03-22T18:30:00.000Z";

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
//       .then((r) => r.json())
//       .then((d) => { if (d.success) setEvents(d.events); });
//   }, []);

//   return (
//     <div className="bg-white text-gray-900 min-h-screen">
//       <Navbar />
//       <HeroSection router={router} />
//       <TrustBar />
//       <WhyJoinSection />
//       <HowItWorksSection />
//       <ActiveChallengesSection events={events} router={router} />
//       <MedalShowcaseSection events={events} />
//       <CertificateSection />
//       <GallerySection events={events} />
//       <TestimonialsSection />
//       <WhatsAppSection url={WHATSAPP_URL} />
//       <FAQSection />
//       <FinalCTA router={router} />
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    REGISTRATION CLOSED CHECK
//    DB mein string hai: "$date": "2026-03-22..."
//    Isliye hum sirf global constant use karte hain
//    — DB ki field ignore karo
// ═══════════════════════════════════════════ */
// function checkClosed() {
//   if (typeof window === "undefined") return false;
//   return new Date(REGISTRATION_DEADLINE).getTime() < Date.now();
// }

// /* ═══════════════ HERO ═══════════════ */
// function HeroSection({ router }) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     let c = 0;
//     const t = setInterval(() => { c += 2; if (c >= 100) { setCount(100); clearInterval(t); } else setCount(c); }, 30);
//     return () => clearInterval(t);
//   }, []);

//   const scrollToHowItWorks = () => {
//     document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <section className="relative min-h-[90vh] flex items-center overflow-hidden"
//       style={{ backgroundImage:"url('/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center" }}>
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
//         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//           {/* <button onClick={() => router.push("/challenges")}
//             className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-lg hover:scale-105 text-center">
//             Explore Challenges →
//           </button> */}
//           <button onClick={scrollToHowItWorks}
//             className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-white/10 text-center">
//             How It Works ↓
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-white/20">
//           {[["100+","Runners"],["Pan India","Delivery"],["100%","Real Medals"]].map(([n,l]) => (
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
//     <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)" }}>
//       <div className="flex gap-10 w-max" style={{ animation:"trustscroll 25s linear infinite" }}>
//         {[...items,...items].map((item,i) => (
//           <span key={i} className="text-sm font-bold whitespace-nowrap flex items-center gap-3" style={{ color:"rgba(255,255,255,0.75)" }}>
//             {item}<span style={{ color:"rgba(255,255,255,0.2)" }}>·</span>
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
//           {cards.map((c,i) => (
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
//     { n:"02", icon:"📍", title:"Run Anywhere", sub:"Your city, your route", desc:"Run anywhere in India — road, treadmill, or track. Complete within the event window.", cls:"border-orange-200 bg-orange-50" },
//     { n:"03", icon:"📸", title:"Submit Proof", sub:"Screenshot your run", desc:"Share your Strava, Nike, or any GPS app screenshot showing date + distance. We verify in 24 hrs.", cls:"border-amber-200 bg-amber-50" },
//     { n:"04", icon:"🏅", title:"Get Your Medal", sub:"Delivered to your door", desc:"A real, heavy zinc-alloy medal ships to your home. Free pan-India delivery included.", cls:"border-green-200 bg-green-50" },
//   ];
//   useEffect(() => { const t = setInterval(() => setActive(p => (p+1)%4), 3000); return () => clearInterval(t); }, []);

//   return (
//     <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Simple Process</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Four Steps to Your Medal</h2>
//         </div>
//         <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
//           <div className="space-y-3">
//             {steps.map((s,i) => (
//               <button key={i} onClick={() => setActive(i)}
//                 className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 ${active===i ? s.cls : "border-gray-200 bg-white hover:bg-gray-50"}`}>
//                 <div className="flex items-center gap-4">
//                   <span className="text-2xl font-black text-gray-200">{s.n}</span>
//                   <span className="text-2xl">{s.icon}</span>
//                   <div><div className="font-bold text-gray-900">{s.title}</div><div className="text-xs text-gray-500">{s.sub}</div></div>
//                 </div>
//                 {active===i && <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-16">{s.desc}</p>}
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
//               {steps.map((_,i) => (<div key={i} className={`rounded-full transition-all duration-300 ${active===i ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ COUNTDOWN ═══════════════ */
// function MiniCountdown({ deadline }) {
//   const [t, setT] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const calc = () => {
//       const diff = new Date(deadline).getTime() - Date.now();
//       if (diff <= 0) { setT(null); return; }
//       setT({
//         d: Math.floor(diff / 86400000),
//         h: Math.floor((diff / 3600000) % 24),
//         m: Math.floor((diff / 60000) % 60),
//         s: Math.floor((diff / 1000) % 60),
//       });
//     };
//     calc();
//     const i = setInterval(calc, 1000);
//     return () => clearInterval(i);
//   }, [deadline]);

//   if (!mounted || !t) return null;

//   return (
//     <div className="flex items-center gap-1 flex-wrap">
//       <span className="text-xs text-gray-500">Closes in:</span>
//       {[[t.d,"d"],[t.h,"h"],[t.m,"m"],[t.s,"s"]].map(([v,l]) => (
//         <span key={l} className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums">
//           {String(v).padStart(2,"0")}{l}
//         </span>
//       ))}
//     </div>
//   );
// }

// /* ═══════════════ ACTIVE CHALLENGES ═══════════════ */
// function ActiveChallengesSection({ events, router }) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   // ✅ FINAL FIX: DB ki string field ignore karo
//   // Sirf global REGISTRATION_DEADLINE use karo
//   const closed = mounted ? checkClosed() : false;

//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
//           <div>
//             <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
//             <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
//           </div>
//           {!closed && <MiniCountdown deadline={REGISTRATION_DEADLINE} />}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {events.map((event) => (
//             <div key={event._id} className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 bg-white ${closed ? "border-gray-200 opacity-80" : "border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1"}`}>

//               {/* Grayscale overlay when closed */}
//               {closed && <div className="absolute inset-0 z-10 bg-white/40 backdrop-grayscale pointer-events-none rounded-3xl" />}

//               {/* Image */}
//               <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
//                 <img src={event.coverImage||event.image} alt={event.title}
//                   className={`h-full w-full object-cover transition-transform duration-500 ${closed ? "grayscale" : ""}`} />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

//                 {/* Badge */}
//                 <div className="absolute top-3 left-3 z-20">
//                   {closed ? (
//                     <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
//                       <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"/>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-white"/>
//                       </span>
//                       Event Running
//                     </span>
//                   ) : (
//                     <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">🔴 LIVE</span>
//                   )}
//                 </div>
//                 {closed && (
//                   <div className="absolute top-3 right-3 z-20">
//                     <span className="bg-black/60 text-gray-200 text-xs font-bold px-2.5 py-1 rounded-full">🔒 Reg. Closed</span>
//                   </div>
//                 )}
//               </div>

//               {/* Content */}
//               <div className="relative z-20 p-5 sm:p-6">
//                 <h3 className={`text-lg font-bold mb-1 ${closed ? "text-gray-400" : "text-gray-900"}`}>{event.title}</h3>
//                 <p className="text-gray-500 text-sm mb-3">{event.dates}</p>

//                 {!closed && <div className="mb-4"><MiniCountdown deadline={REGISTRATION_DEADLINE} /></div>}

//                 {closed ? (
//                   <>
//                     <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-full font-bold text-sm cursor-not-allowed border border-gray-200 mb-2">
//                       Registration Closed
//                     </button>
//                     {/* <button onClick={() => router.push(`/challenges/${event.slug}`)}
//                       className="w-full border-2 border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-700 py-3 rounded-full font-semibold text-sm transition-colors">
//                       View Details →
//                     </button> */}
//                   </>
//                 ) : (
//                   <div className="flex gap-3">
//                     <button onClick={() => router.push(`/challenges/${event.slug}`)}
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-red-200">
//                       Register Now
//                     </button>
//                     <button onClick={() => router.push(`/challenges/${event.slug}`)}
//                       className="border-2 border-gray-200 hover:border-gray-400 px-4 py-3 rounded-full text-sm font-semibold text-gray-600 transition-colors">
//                       Details
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {events.length===0 && (
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

// /* ═══════════════ MEDAL SHOWCASE ═══════════════ */
// function MedalShowcaseSection({ events }) {
//   const [flipped, setFlipped] = useState({});
//   const toggle = (id) => setFlipped(p => ({ ...p, [id]: !p[id] }));

//   return (
//     <section className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-14">
//           <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-200">Your Reward</span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What You Earn</h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Proof beats motivation. Every finisher earns a real, heavy metal medal shipped to your door.</p>
//         </div>

//         {events.length > 0 && (
//           <div className="flex flex-wrap justify-center gap-10 sm:gap-16 mb-14">
//             {events.map((event) => (
//               <div key={event._id} className="flex flex-col items-center gap-5">

//                 <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] cursor-pointer"
//                   style={{ perspective: "1200px" }}
//                   onClick={() => toggle(event._id)}>

//                   <div className="relative w-full h-full transition-all duration-700"
//                     style={{ transformStyle: "preserve-3d", transform: flipped[event._id] ? "rotateY(180deg)" : "rotateY(0deg)" }}>

//                     {/* ── FRONT ── */}
//                     <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-200"
//                       style={{ backfaceVisibility: "hidden" }}>
//                       {event.medalImage ? (
//                         <img src={event.medalImage} alt="medal front"
//                           className="absolute inset-0 w-full h-full object-cover" />
//                       ) : (
//                         <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500" />
//                       )}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
//                       <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
//                         FRONT
//                       </div>
//                       <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
//                         <p className="font-black text-base text-white leading-snug">{event.title}</p>
//                         <p className="text-white/70 text-sm mt-1">Finisher Medal</p>
//                       </div>
//                     </div>

//                     {/* ── BACK — medalImageBack DB se ── */}
//                     <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200"
//                       style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>

//                       {event.medalImageBack ? (
//                         /* Real back image from DB */
//                         <>
//                           <img src={event.medalImageBack} alt="medal back"
//                             className="absolute inset-0 w-full h-full object-cover" />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                           <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
//                             BACK
//                           </div>
//                           <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
//                             <p className="font-bold text-white text-sm">{event.title}</p>
//                             <p className="text-white/60 text-xs mt-1">{event.dates}</p>
//                           </div>
//                         </>
//                       ) : (
//                         /* Fallback if no back image */
//                         <>
//                           <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
//                           <div className="absolute top-4 right-4 bg-gray-400/30 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">BACK</div>
//                           <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
//                             <div className="w-36 h-36 rounded-full bg-gray-300 border-4 border-gray-400 flex items-center justify-center text-6xl">🇮🇳</div>
//                             <div className="text-center">
//                               <p className="font-bold text-gray-800 text-base">{event.title}</p>
//                               <p className="text-gray-500 text-sm mt-1">{event.dates}</p>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>

//                   </div>
//                 </div>

//                 <p className="text-xs text-gray-400">{flipped[event._id] ? "← Flip back" : "Click to flip →"}</p>

//                 {/* Specs */}
//                 <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 w-72 sm:w-80 shadow-sm">
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     {[["Weight","100g"],["Diameter","70mm"],["Material","Zinc Alloy"],["Delivery","Free"]].map(([k,v]) => (
//                       <div key={k}>
//                         <p className="text-gray-400 text-xs">{k}</p>
//                         <p className="font-bold text-gray-800 mt-0.5">{v}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
//               <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(45deg,#b45309 0,#b45309 1px,transparent 0,transparent 50%)",backgroundSize:"10px 10px"}}/>
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

// /* ═══════════════ GALLERY ═══════════════ */
// function GallerySection({ events }) {
//   const images = events.flatMap(e => e.gallery || []).slice(0, 8);
//   return (
//     <section className="py-20 sm:py-28 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Community</span>
//           <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Community Gallery</h2>
//           <p className="text-gray-500 mt-3 text-sm">Real runners. Real finishes. Real medals.</p>
//         </div>
//         {images.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//             {images.map((img,i) => (
//               <div key={i} className={`relative overflow-hidden rounded-2xl group ${i===0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
//                 <img src={img} alt="Runner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   style={{minHeight: i===0 ? "280px" : "140px", aspectRatio:"1"}}/>
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl"/>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-14 sm:p-20 text-center">
//             <div className="text-5xl mb-4">📸</div>
//             <p className="text-lg font-bold text-gray-700">Runner photos coming soon!</p>
//             <p className="text-gray-400 text-sm mt-2">Complete your run, submit proof — we will feature you here.</p>
//           </div>
//         )}
//         <p className="text-center text-gray-400 text-sm mt-6">Finish your run → Submit proof → Get featured here 🏃</p>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ WHATSAPP ═══════════════ */
// function WhatsAppSection({ url }) {
//   return (
//     <section className="py-12 sm:py-16 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075E54] to-[#128C7E] p-7 sm:p-10 shadow-xl">
//           <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5"/>
//           <div className="absolute -right-4 -bottom-16 w-64 h-64 rounded-full bg-white/5"/>
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
//               className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-green-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm sm:text-base">
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
//           {faqs.map((faq,i) => (
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
//       <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none"/>
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none"/>
//       <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
//         <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">Your Discipline<br />Has a Deadline.</h2>
//         <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">Join now. Finish strong.<br/>Earn something that reminds you who you are.</p>
//         {/* <button onClick={() => router.push("/challenges")}
//           className="bg-red-600 hover:bg-red-500 px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg transition-all duration-200 shadow-2xl shadow-red-900/50 hover:scale-105">
//           Join a Challenge →
//         </button> */}
//         <p className="text-gray-600 text-xs mt-5">Free shipping · Real medal · Pan-India delivery</p>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════ TESTIMONIALS (hidden) ═══════════════ */
// function TestimonialsSection() {
//   return null;
// }
"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setEvents(d.events); });
  }, []);

  // ─── Split events: active=true → Live, active=false → Previous ───
  const liveEvents = events.filter((e) => e.active === true);
  const previousEvents = events.filter((e) => e.active === false);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <HeroSection router={router} />
      <TrustBar />
      <WhyJoinSection />
      <HowItWorksSection />

      {/* Live Challenges Section */}
      <ActiveChallengesSection events={liveEvents} router={router} />

      {/* Previous Events Section */}
      {previousEvents.length > 0 && (
        <PreviousEventsSection events={previousEvents} router={router} />
      )}

      {/* 3D Medal Showcase */}
      <MedalShowcaseSection events={liveEvents.length > 0 ? liveEvents : events} />

      <CertificateSection />
      <GallerySection events={events} />
      <TestimonialsSection />
      <WhatsAppSection url={WHATSAPP_URL} />
      <FAQSection />
      <FinalCTA router={router} />
    </div>
  );
}

/* ═══════════════ HERO ═══════════════ */
function HeroSection({ router }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c += 2; if (c >= 100) { setCount(100); clearInterval(t); } else setCount(c); }, 30);
    return () => clearInterval(t);
  }, []);

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-sm font-semibold text-green-300">{count}+ runners joined from across India</span>
        </div>
        <p className="text-white/70 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4">Virtual Fitness Challenges</p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-white mb-6">
          Discipline Builds<br /><span className="text-red-500">Legends.</span>
        </h1>
        <p className="max-w-lg text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
          Anyone can start. Very few finish. Valley Run exists for those who choose consistency over comfort.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button onClick={scrollToHowItWorks}
            className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-white/10 text-center">
            How It Works ↓
          </button>
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-white/20">
          {[["100+", "Runners"], ["Pan India", "Delivery"], ["100%", "Real Medals"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-xl sm:text-2xl font-black text-white">{n}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TRUST BAR ═══════════════ */
function TrustBar() {
  const items = ["🏅 Real Metal Medals", "📦 Free Pan-India Delivery", "📸 Any GPS App Accepted", "⚡ Results in 24 hrs", "🇮🇳 Made for Indian Runners", "🔒 Secure Razorpay Payments"];
  return (
    <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)" }}>
      <div className="flex gap-10 w-max" style={{ animation: "trustscroll 25s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-bold whitespace-nowrap flex items-center gap-3" style={{ color: "rgba(255,255,255,0.75)" }}>
            {item}<span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes trustscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ═══════════════ WHY JOIN ═══════════════ */
function WhyJoinSection() {
  const cards = [
    { icon: "⏳", title: "Fixed Deadlines", desc: "Deadlines create discipline. You don't train 'someday' — you train now.", bg: "bg-orange-50", border: "border-orange-100", ibg: "bg-orange-100" },
    { icon: "🏅", title: "Real Rewards", desc: "Heavy metal medals shipped home. Not digital badges that disappear.", bg: "bg-yellow-50", border: "border-yellow-100", ibg: "bg-yellow-100" },
    { icon: "🧠", title: "Mental Strength", desc: "You finish stronger than you started — mentally and physically.", bg: "bg-blue-50", border: "border-blue-100", ibg: "bg-blue-100" },
    { icon: "📍", title: "Run Anywhere", desc: "Road, treadmill, track — run in your city on your own schedule.", bg: "bg-green-50", border: "border-green-100", ibg: "bg-green-100" },
    { icon: "📸", title: "Easy Proof", desc: "Screenshot from Strava, Nike Run Club, or any app. We verify fast.", bg: "bg-purple-50", border: "border-purple-100", ibg: "bg-purple-100" },
    { icon: "🤝", title: "Community", desc: "Join thousands of runners across India chasing the same finish line.", bg: "bg-red-50", border: "border-red-100", ibg: "bg-red-100" },
  ];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Why Valley Run</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Why Join Valley Run?</h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">This is not entertainment. This is structure, accountability and proof of effort.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={i} className={`${c.bg} border-2 ${c.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
              <div className={`${c.ibg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>{c.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ HOW IT WORKS ═══════════════ */
function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const steps = [
    { n: "01", icon: "🏃", title: "Register", sub: "Pick your distance", desc: "Choose 5K, 10K, or 21K. Pay securely via Razorpay. Takes under 2 minutes.", cls: "border-red-200 bg-red-50" },
    { n: "02", icon: "📍", title: "Run Anywhere", sub: "Your city, your route", desc: "Run anywhere in India — road, treadmill, or track. Complete within the event window.", cls: "border-orange-200 bg-orange-50" },
    { n: "03", icon: "📸", title: "Submit Proof", sub: "Screenshot your run", desc: "Share your Strava, Nike, or any GPS app screenshot showing date + distance. We verify in 24 hrs.", cls: "border-amber-200 bg-amber-50" },
    { n: "04", icon: "🏅", title: "Get Your Medal", sub: "Delivered to your door", desc: "A real, heavy zinc-alloy medal ships to your home. Free pan-India delivery included.", cls: "border-green-200 bg-green-50" },
  ];
  useEffect(() => { const t = setInterval(() => setActive(p => (p + 1) % 4), 3000); return () => clearInterval(t); }, []);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Four Steps to Your Medal</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="space-y-3">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 ${active === i ? s.cls : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-gray-200">{s.n}</span>
                  <span className="text-2xl">{s.icon}</span>
                  <div><div className="font-bold text-gray-900">{s.title}</div><div className="text-xs text-gray-500">{s.sub}</div></div>
                </div>
                {active === i && <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-16">{s.desc}</p>}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center justify-center h-72 rounded-3xl border-2 border-gray-200 bg-white shadow-sm relative overflow-hidden">
            <div className="text-center">
              <div className="text-7xl mb-4">{steps[active].icon}</div>
              <div className="text-xl font-black text-gray-900">{steps[active].title}</div>
              <div className="text-gray-400 text-sm mt-1">{steps[active].sub}</div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {steps.map((_, i) => (<div key={i} className={`rounded-full transition-all duration-300 ${active === i ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ COUNTDOWN ═══════════════ */
function MiniCountdown({ deadline }) {
  const [t, setT] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setT(null); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const i = setInterval(calc, 1000);
    return () => clearInterval(i);
  }, [deadline]);

  if (!mounted || !t) return null;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="text-xs text-gray-500">Closes in:</span>
      {[[t.d, "d"], [t.h, "h"], [t.m, "m"], [t.s, "s"]].map(([v, l]) => (
        <span key={l} className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums">
          {String(v).padStart(2, "0")}{l}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ACTIVE CHALLENGES — sirf active:true events
═══════════════════════════════════════════════════ */
function ActiveChallengesSection({ events, router }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <div key={event._id}
              className="relative rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">

              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                <img src={event.coverImage || event.image} alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* LIVE Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold mb-1 text-gray-900">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{event.dates}</p>

                {event.registrationDeadline && (
                  <div className="mb-4">
                    <MiniCountdown deadline={event.registrationDeadline} />
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => router.push(`/challenges/${event.slug}`)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-red-200">
                    Register Now
                  </button>
                  <button onClick={() => router.push(`/challenges/${event.slug}`)}
                    className="border-2 border-gray-200 hover:border-gray-400 px-4 py-3 rounded-full text-sm font-semibold text-gray-600 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <div className="text-5xl mb-4">🏃</div>
              <p className="font-bold text-lg text-gray-400">Loading challenges...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PREVIOUS EVENTS — active:false events
═══════════════════════════════════════════════════ */
function PreviousEventsSection({ events, router }) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block bg-gray-200 text-gray-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Past Events</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-700">Previous Challenges</h2>
          <p className="text-gray-400 text-sm mt-2">These events have ended. Run harder next time. 💪</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div key={event._id}
              className="relative rounded-3xl overflow-hidden border-2 border-gray-200 bg-white opacity-80 hover:opacity-100 transition-all duration-300">

              {/* Grayscale image */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={event.coverImage || event.image}
                  alt={event.title}
                  className="h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Ended Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-700 text-gray-200 text-xs font-bold px-3 py-1.5 rounded-full">
                    ✅ Ended
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-500 mb-1">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{event.dates}</p>

                <button
                  onClick={() => router.push(`/leaderboard/${event.slug}`)}
                  className="w-full border-2 border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-700 py-2.5 rounded-full font-semibold text-sm transition-colors"
                >
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

/* ═══════════════════════════════════════════════════
   3D MEDAL — Mouse + Touch se freely rotate karo
═══════════════════════════════════════════════════ */
function Medal3D({ event }) {
  const rotationRef = useRef({ x: -15, y: 20 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const rafRef = useRef(null);
  const [rotation, setRotation] = useState({ x: -15, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRestartRef = useRef(null);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate) return;
    const animate = () => {
      rotationRef.current.y += 0.4;
      setRotation({ x: rotationRef.current.x, y: rotationRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate]);

  const stopAuto = () => {
    setAutoRotate(false);
    cancelAnimationFrame(rafRef.current);
    clearTimeout(autoRestartRef.current);
    autoRestartRef.current = setTimeout(() => setAutoRotate(true), 2500);
  };

  // Mouse
  const onMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    setIsDragging(true);
    stopAuto();
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    rotationRef.current.y += dx * 0.7;
    rotationRef.current.x = Math.max(-45, Math.min(45, rotationRef.current.x - dy * 0.4));
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    setRotation({ ...rotationRef.current });
  };
  const onMouseUp = () => { dragRef.current.dragging = false; setIsDragging(false); };

  // Touch
  const onTouchStart = (e) => {
    const t = e.touches[0];
    dragRef.current = { dragging: true, lastX: t.clientX, lastY: t.clientY };
    setIsDragging(true);
    stopAuto();
  };
  const onTouchMove = (e) => {
    if (!dragRef.current.dragging) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - dragRef.current.lastX;
    const dy = t.clientY - dragRef.current.lastY;
    rotationRef.current.y += dx * 0.7;
    rotationRef.current.x = Math.max(-45, Math.min(45, rotationRef.current.x - dy * 0.4));
    dragRef.current.lastX = t.clientX;
    dragRef.current.lastY = t.clientY;
    setRotation({ ...rotationRef.current });
  };
  const onTouchEnd = () => { dragRef.current.dragging = false; setIsDragging(false); };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Medal 3D */}
      <div
        className="relative select-none"
        style={{ width: "260px", height: "320px", perspective: "900px", cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ribbon */}
        <div className="absolute left-1/2 z-20 pointer-events-none"
          style={{ top: "-20px", transform: "translateX(-50%)", width: "36px" }}>
          <div style={{
            width: "36px", height: "54px",
            background: "linear-gradient(180deg, #ef4444 0%, #b91c1c 50%, #ef4444 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)",
          }} />
        </div>

        {/* Rotating body */}
        <div style={{
          width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? "none" : "transform 0.08s linear",
        }}>
          {/* FRONT */}
          <div className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)",
              background: event.medalImage ? "transparent" : "linear-gradient(135deg, #fde68a 0%, #f59e0b 40%, #d97706 70%, #92400e 100%)",
            }}>
            {event.medalImage
              ? <img src={event.medalImage} alt="front" className="w-full h-full object-cover" draggable={false} />
              : (
                <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                  <div className="text-5xl">🏅</div>
                  <p className="text-yellow-900 font-black text-xs px-6 text-center leading-tight">{event.title}</p>
                </div>
              )
            }
            {/* Shine */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 45%, rgba(0,0,0,0.1) 100%)" }} />
            <div className="absolute top-2 right-3 bg-black/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">FRONT</div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.15)",
              background: event.medalImageBack ? "transparent" : "linear-gradient(135deg, #d1d5db 0%, #9ca3af 40%, #6b7280 100%)",
            }}>
            {event.medalImageBack
              ? <img src={event.medalImageBack} alt="back" className="w-full h-full object-cover" draggable={false} />
              : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6">
                  <div className="w-16 h-16 rounded-full bg-gray-400/50 border-4 border-gray-300 flex items-center justify-center text-3xl">🇮🇳</div>
                  <p className="text-gray-700 font-black text-xs text-center leading-tight">{event.title}</p>
                  <p className="text-gray-500 text-xs text-center">{event.dates}</p>
                </div>
              )
            }
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)" }} />
            <div className="absolute top-2 right-3 bg-black/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">BACK</div>
          </div>

          {/* Edge thickness */}
          <div className="absolute inset-0" style={{
            borderRadius: "50%",
            transform: "translateZ(-10px)",
            background: "radial-gradient(ellipse, #92400e, #78350f)",
          }} />
        </div>

        {/* Shadow on floor */}
        <div className="absolute bottom-0 left-1/2 pointer-events-none" style={{
          width: "180px", height: "18px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
          transform: "translateX(-50%)",
        }} />
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 flex items-center gap-1.5">
        {autoRotate
          ? <><span className="text-green-400">●</span> Auto rotating — drag to control</>
          : <><span className="text-yellow-400">●</span> Drag to rotate</>
        }
      </p>

      {/* Title */}
      <div className="text-center">
        <p className="font-black text-white text-base">{event.title}</p>
        <p className="text-gray-400 text-sm mt-0.5">Finisher Medal</p>
      </div>

      {/* Specs */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-64 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[["Weight", "100g"], ["Diameter", "70mm"], ["Material", "Zinc Alloy"], ["Delivery", "Free"]].map(([k, v]) => (
            <div key={k}>
              <p className="text-gray-500 text-xs">{k}</p>
              <p className="font-bold text-white mt-0.5">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ MEDAL SHOWCASE SECTION ═══════════════ */
function MedalShowcaseSection({ events }) {
  return (
    <section className="py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-500/20">
            Your Reward
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            What You Earn
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Proof beats motivation. Every finisher earns a real, heavy metal medal shipped to your door.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <span className="text-yellow-400 text-sm">🖱️</span>
            {/* <span className="text-gray-400 text-sm">Drag ya touch karke medal ko 360° rotate karo</span> */}
          </div>
        </div>

        {events.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-14 sm:gap-24 mb-14">
            {events.map((event) => (
              <Medal3D key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏅</div>
            <p className="text-gray-500">Medal loading...</p>
          </div>
        )}

        {/* Feature pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[["📦", "Free Shipping", "Pan India"], ["⚡", "Fast Delivery", "7–10 days"], ["🔒", "Guaranteed", "Or full refund"], ["⭐", "Premium", "Zinc alloy"]].map(([e, t, s]) => (
            <div key={t} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-yellow-500/30 transition-colors">
              <div className="text-2xl mb-2">{e}</div>
              <div className="font-bold text-sm text-white">{t}</div>
              <div className="text-gray-500 text-xs mt-1">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ CERTIFICATE ═══════════════ */
function CertificateSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Digital Certificate</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-5 leading-tight">Proof of your finish, forever.</h2>
            <p className="text-gray-500 leading-relaxed mb-6">Every finisher receives a personalised digital certificate — shareable on LinkedIn, Instagram, or wherever you want to show the world you finished.</p>
            <ul className="space-y-3">
              {["Your name + distance on the certificate", "Event date and official Valley Run branding", "Downloadable high-res PDF", "Share on LinkedIn in one click"].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-600 text-xs flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden border-2 border-yellow-200 shadow-xl">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#b45309 0,#b45309 1px,transparent 0,transparent 50%)", backgroundSize: "10px 10px" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-2xl mx-auto mb-5">🏅</div>
                <p className="text-yellow-700 text-xs font-bold tracking-widest uppercase mb-2">Certificate of Completion</p>
                <p className="text-gray-400 text-sm mb-1">This certifies that</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Your Name</p>
                <p className="text-gray-400 text-sm mb-3">has successfully completed</p>
                <p className="text-xl font-bold text-amber-700 mb-1">Shaheed Diwas Tribute Run 2026</p>
                <p className="text-amber-600 font-bold text-lg mb-5">10 Kilometres</p>
                <div className="flex justify-center gap-4 sm:gap-6 text-xs text-gray-400 border-t border-yellow-200 pt-5">
                  {[["23 Mar 2026", "Event Date"], ["Verified", "Status"], ["VR-2026-XXX", "Cert. ID"]].map(([v, l]) => (
                    <div key={l}><p className="text-gray-800 font-bold text-sm">{v}</p><p>{l}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ GALLERY ═══════════════ */
function GallerySection({ events }) {
  const images = events.flatMap(e => e.gallery || []).slice(0, 8);
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Community</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Community Gallery</h2>
          <p className="text-gray-500 mt-3 text-sm">Real runners. Real finishes. Real medals.</p>
        </div>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <img src={img} alt="Community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: i === 0 ? "280px" : "140px", aspectRatio: "1" }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-14 sm:p-20 text-center">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-lg font-bold text-gray-700">Runner photos coming soon!</p>
            <p className="text-gray-400 text-sm mt-2">Complete your run, submit proof — we will feature you here.</p>
          </div>
        )}
        <p className="text-center text-gray-400 text-sm mt-6">Finish your run → Submit proof → Get featured here 🏃</p>
      </div>
    </section>
  );
}

/* ═══════════════ WHATSAPP ═══════════════ */
function WhatsAppSection({ url }) {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075E54] to-[#128C7E] p-7 sm:p-10 shadow-xl">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#25D366] rounded-2xl p-3 flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-1">Stay in the Loop 📣</h3>
                <p className="text-green-200 text-sm leading-relaxed max-w-sm">Get live event updates, result announcements, and medal dispatch alerts — first.</p>
              </div>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] hover:bg-green-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm sm:text-base">
              Join Channel →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FAQ ═══════════════ */
function FAQSection() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What apps can I use to track my run?", a: "Any GPS app works — Strava, Nike Run Club, Google Fit, Garmin, Samsung Health, Apple Fitness, or a treadmill screenshot. It should clearly show date, distance, and your profile." },
    { q: "How do I submit proof?", a: "After completing your run, screenshot your activity and submit via the WhatsApp number or upload link in your confirmation email. We verify within 24 hours." },
    { q: "Can I run on a treadmill?", a: "Absolutely! Valley Run is fully virtual — treadmill, road, track, park. All count. What matters is the distance and your discipline." },
    { q: "When will I receive my medal?", a: "Medals dispatch in batches after the event window closes. Delivery is 7–10 working days. You will get a tracking number via WhatsApp or email once shipped." },
    { q: "Is shipping really free?", a: "100% free, pan-India. Tier 1, 2, and 3 cities all included — no hidden charges whatsoever." },
    { q: "Do I need to complete the distance in one go?", a: "Yes — one continuous activity on your tracking app. Split or combined activities won't be accepted as valid proof." },
    { q: "Is there a refund if I cannot finish?", a: "We don't offer refunds for incomplete challenges since medals are manufactured in advance. For genuine emergencies, write to us — we handle each case personally." },
    { q: "Can I register for both 5K and 10K?", a: "Yes! Each registration is separate and comes with its own medal and certificate." },
  ];
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Common Questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-red-200 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <button className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-bold text-sm sm:text-base text-gray-900 pr-4">{faq.q}</span>
                <span className={`text-gray-400 text-2xl font-light flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45 text-red-500" : ""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 sm:px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 sm:p-8 text-center">
          <p className="font-bold text-gray-900 mb-1">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-5">We reply within a few hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-green-500 transition-colors">💬 WhatsApp</a>
            <a href="mailto:valleyrun.official@gmail.com"
              className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full text-sm hover:border-gray-400 transition-colors">✉️ Email Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ FINAL CTA ═══════════════ */
function FinalCTA({ router }) {
  return (
    <section className="py-20 sm:py-28 bg-gray-900 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">Your Discipline<br />Has a Deadline.</h2>
        <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">Join now. Finish strong.<br />Earn something that reminds you who you are.</p>
        <p className="text-gray-600 text-xs mt-5">Free shipping · Real medal · Pan-India delivery</p>
      </div>
    </section>
  );
}

/* ═══════════════ TESTIMONIALS ═══════════════ */
function TestimonialsSection() {
  return null;
}
