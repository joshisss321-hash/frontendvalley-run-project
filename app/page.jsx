
// "use client";

// import { useEffect, useState, useRef } from "react";
// import Navbar from "./components/Navbar";
// import { useRouter } from "next/navigation";

// const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
//       .then((r) => r.json())
//       .then((d) => { if (d.success) setEvents(d.events); });
//   }, []);

//   // isPrevious:true  → Previous Events section
//   // isPrevious:false/undefined → Live section
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
//     const t = setInterval(() => { c += 2; if (c >= 100) { setCount(500); clearInterval(t); } else setCount(c); }, 30);
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

// /* ═══════════════ ACTIVE CHALLENGES ═══════════════ */
// function ActiveChallengesSection({ events, router }) {
//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
//           <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {events.map((event) => (
//             <div key={event._id}
//               className="rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
//               <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
//                 <img src={event.coverImage || event.image} alt={event.title}
//                   className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//                 <div className="absolute top-3 left-3">
//                   <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
//                     <span className="relative flex h-2 w-2">
//                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
//                       <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//                     </span>
//                     LIVE
//                   </span>
//                 </div>
//               </div>
//               <div className="p-5 sm:p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
//                 <p className="text-gray-500 text-sm mb-4">{event.dates}</p>
//                 <div className="flex gap-3">
//                   <button onClick={() => router.push(`/challenges/${event.slug}`)}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg">
//                     Register Now
//                   </button>
//                   <button onClick={() => router.push(`/challenges/${event.slug}`)}
//                     className="border-2 border-gray-200 hover:border-gray-400 px-4 py-3 rounded-full text-sm font-semibold text-gray-600 transition-colors">
//                     Details
//                   </button>
//                 </div>
//               </div>
//             </div>
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
//    - Grayscale image
//    - "Completed" badge
//    - Faded / disabled look
//    - Sirf "View Results" button — no register button
// ═══════════════════════════════════════════════════════ */
// function PreviousEventsSection({ events, router }) {
//   return (
//     <section className="py-16 sm:py-20 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
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
//             <div
//               key={event._id}
//               className="rounded-3xl overflow-hidden border-2 border-gray-200 bg-white"
//               style={{ opacity: 0.75 }}
//             >
//               {/* Grayscale image with overlay */}
//               <div className="relative h-44 overflow-hidden bg-gray-200">
//                 <img
//                   src={event.coverImage || event.image}
//                   alt={event.title}
//                   className="h-full w-full object-cover"
//                   style={{ filter: "grayscale(100%)" }}
//                 />
//                 {/* Dark overlay */}
//                 <div className="absolute inset-0 bg-black/40" />

//                 {/* Completed badge */}
//                 <div className="absolute top-3 left-3">
//                   <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full">
//                     <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
//                       <circle cx="6" cy="6" r="6" fill="#4B5563"/>
//                       <path d="M3.5 6l2 2 3-3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Completed
//                   </span>
//                 </div>

//                 {/* Event title overlay on image */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <p className="text-white/80 font-black text-sm leading-tight">{event.title}</p>
//                 </div>
//               </div>

//               {/* Card body */}
//               <div className="p-5 bg-gray-50">
//                 <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wide">Event Period</p>
//                 <p className="text-gray-500 text-sm font-semibold mb-4">{event.dates}</p>

//                 {/* View Results — only button, no register */}
//                 <button
//                   onClick={() => router.push(`/leaderboard/${event.slug}`)}
//                   className="w-full border-2 border-gray-300 text-gray-400 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors"
//                 >
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
//    3D MEDAL — drag/touch rotate
//    Fix: WebkitBackfaceVisibility, no overflow:hidden on faces
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

//           {/* FRONT */}
//           <div style={faceStyle({ background: event.medalImage ? "#111" : "linear-gradient(135deg,#fde68a,#f59e0b,#d97706,#92400e)", boxShadow:"0 20px 60px rgba(0,0,0,0.6),inset 0 2px 0 rgba(255,255,255,0.3)" })}>
//             {event.medalImage
//               ? <img src={event.medalImage} alt="Front" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
//               : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8 }}><span style={{ fontSize:52 }}>🏅</span><span style={{ color:"#78350f",fontWeight:900,fontSize:11,textAlign:"center",padding:"0 20px" }}>{event.title}</span></div>
//             }
//             <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 45%,rgba(0,0,0,0.1) 100%)" }} />
//             <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>FRONT</div>
//           </div>

//           {/* BACK */}
//           <div style={faceStyle({ transform:"rotateY(180deg)", background: event.medalImageBack ? "#111" : "linear-gradient(135deg,#e5e7eb,#9ca3af,#6b7280)", boxShadow:"0 20px 60px rgba(0,0,0,0.5),inset 0 2px 0 rgba(255,255,255,0.15)" })}>
//             {event.medalImageBack
//               ? <img src={event.medalImageBack} alt="Back" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
//               : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:"0 24px" }}><div style={{ width:60,height:60,borderRadius:"50%",background:"rgba(156,163,175,0.4)",border:"3px solid #d1d5db",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26 }}>🇮🇳</div><span style={{ color:"#374151",fontWeight:900,fontSize:11,textAlign:"center" }}>{event.title}</span><span style={{ color:"#6b7280",fontSize:10,textAlign:"center" }}>{event.dates}</span></div>
//             }
//             <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 50%,rgba(0,0,0,0.15) 100%)" }} />
//             <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>BACK</div>
//           </div>

//           {/* Edge */}
//           <div style={{ position:"absolute",inset:0,borderRadius:"50%",transform:"translateZ(-8px)",background:"radial-gradient(ellipse,#b45309,#78350f)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden" }} />
//         </div>

//         {/* Shadow */}
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


// // ═══════════════ TESTIMONIALS ═══════════════
// // Apne page.js mein `function TestimonialsSection() { return null; }` ko
// // is poore component se replace kar do.

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

// // ─── Yahan apne saare reviews add karo ───
// const REVIEWS = [
//   {
//     id: "69d0f99f7ba5eb0710484fc1",
//     name: "Subhojyoti Raha",
//     instaId: "SubhojyotiRaha",
//     review:
//       "It's was such an amazing experience running for the special occasion, absolute goosebumps!!! Looking forward for more marathons and accomplishing them.",
//     imageUrl:
//       "https://res.cloudinary.com/dafwe6lci/image/upload/v1775303070/medal-reviews/p26h3zrhugrlqc5ivxk4.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d368c77ba5eb0710486801",
//     name: "Susmit Pal",
//     instaId: "human._.11_",
//     review:
//       "Had a great experience with you guys every step was guided properly and all the issues were resolved. Will sury participate in more events and loved the medal",
//     imageUrl:
//       "https://res.cloudinary.com/dafwe6lci/image/upload/f_jpg/v1775462598/medal-reviews/jmxp7uj63iluoj2qjkoj.jpg",
//     rating: 5,
//   },
//   {
//     id: "69d3711d7ba5eb07104868f8",
//     name: "Jayanth Reddy",
//     instaId: "jayanth_kumar_reddy",
//     review:
//       "Thank you us for give this opportunity to participate in this Tribute Run nd good support in Instagram nd WhatsApp if any confusion again tq sir for this great event",
//     imageUrl:
//       "https://res.cloudinary.com/dafwe6lci/image/upload/v1775464732/medal-reviews/jy95fbfa05ki803crcjh.jpg",
//     rating: 5,
//   },
//   // ────────────────────────────────────────────
//   // Nayi reviews add karni ho toh neeche copy-paste karo:
//   // {
//   //   id: "unique_id",
//   //   name: "Runner Name",
//   //   instaId: "instagram_handle",        // @ ke bina
//   //   review: "Their review text here...",
//   //   imageUrl: "https://cloudinary_url",
//   //   rating: 5,                          // 1-5
//   // },
// ];

// function ReviewCard({ review }) {
//   return (
//     <div className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
//       {/* Runner Photo */}
//       <div className="relative h-52 overflow-hidden bg-gray-100">
//         <img
//           src={review.imageUrl}
//           alt={review.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

//         {/* Verified badge */}
//         <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
//           <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
//           Verified Runner
//         </div>
//       </div>

//       {/* Card Body */}
//       <div className="p-5">
//         {/* Stars */}
//         <div className="flex gap-0.5 mb-2">
//           {Array.from({ length: review.rating }).map((_, i) => (
//             <StarIcon key={i} />
//           ))}
//         </div>

//         {/* Quote */}
//         <p className="text-gray-500 text-5xl font-serif leading-none mb-1 select-none">"</p>
//         <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 italic mb-4">
//           {review.review}
//         </p>

//         {/* Runner info + Insta */}
//         <div className="flex items-center justify-between gap-3">
//           <p className="font-black text-gray-900 text-sm">{review.name}</p>
//           <a
//             href={`https://www.instagram.com/${review.instaId}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-2 rounded-full hover:opacity-85 hover:scale-105 transition-all duration-200 flex-shrink-0"
//             style={{
//               background: "linear-gradient(135deg, #f9a8d4, #fb923c, #a855f7)",
//             }}
//           >
//             <InstagramIcon />
//             @{review.instaId}
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

//  function TestimonialsSection() {
//   return (
//     <section className="py-20 sm:py-28 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">
//             Real Reviews
//           </span>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
//             What Our Runners Say
//           </h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
//             500+ runners completed their challenge. Here&apos;s what they earned — and what they felt.
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {REVIEWS.map((review) => (
//             <ReviewCard key={review.id} review={review} />
//           ))}
//         </div>

//         {/* Bottom CTA Strip */}
//         <div className="mt-14 bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//           <div>
//             <p className="text-white font-black text-xl sm:text-2xl">
//               Ready to earn your medal?
//             </p>
//             <p className="text-gray-400 text-sm mt-1">
//               500+ runners already finished. Your turn.
//             </p>
//           </div>
//           <button
//             onClick={() =>
//               document
//                 .getElementById("challenges")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//             className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-full text-sm transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
//           >
//             Register Now →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Default export bhi rakha hai agar directly import karo









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
//             {images.map((img, i) => (
//               <div key={i} className={`relative overflow-hidden rounded-2xl group ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
//                 <img src={img} alt="Runner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   style={{ minHeight: i === 0 ? "280px" : "140px", aspectRatio:"1" }} />
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

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setEvents(d.events); });
  }, []);

  const liveEvents     = events.filter((e) => !e.isPrevious);
  const previousEvents = events.filter((e) => e.isPrevious === true);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <WhyJoinSection />
      <HowItWorksSection />
      <ActiveChallengesSection events={liveEvents} router={router} />
        <TestimonialsSection />
      {previousEvents.length > 0 && (
        <PreviousEventsSection events={previousEvents} router={router} />
      )}
      <MedalShowcaseSection events={events} />
      <CertificateSection />
      <GallerySection events={events} />
      <WhatsAppSection url={WHATSAPP_URL} />
      <FAQSection />
      <FinalCTA router={router} />
    </div>
  );
}

/* ═══════════════ HERO ═══════════════ */
function HeroSection() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const t = setInterval(() => { c += 2; if (c >= 100) { setCount(500); clearInterval(t); } else setCount(c); }, 30);
    return () => clearInterval(t);
  }, []);

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
        <button
          onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-white/10">
          How It Works ↓
        </button>
        <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-white/20">
          {[["500+", "Runners"], ["Pan India", "Delivery"], ["100%", "Real Medals"]].map(([n, l]) => (
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
  const items = ["🏅 Real Metal Medals","📦 Free Pan-India Delivery","📸 Any GPS App Accepted","⚡ Results in 24 hrs","🇮🇳 Made for Indian Runners","🔒 Secure Razorpay Payments"];
  return (
    <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg,#1a1a2e,#16213e,#1a1a2e)" }}>
      <div className="flex gap-10 w-max" style={{ animation: "trustscroll 25s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-bold whitespace-nowrap" style={{ color: "rgba(255,255,255,0.75)" }}>
            {item} <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
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
    { icon:"⏳", title:"Fixed Deadlines", desc:"Deadlines create discipline. You don't train 'someday' — you train now.", bg:"bg-orange-50", border:"border-orange-100", ibg:"bg-orange-100" },
    { icon:"🏅", title:"Real Rewards", desc:"Heavy metal medals shipped home. Not digital badges that disappear.", bg:"bg-yellow-50", border:"border-yellow-100", ibg:"bg-yellow-100" },
    { icon:"🧠", title:"Mental Strength", desc:"You finish stronger than you started — mentally and physically.", bg:"bg-blue-50", border:"border-blue-100", ibg:"bg-blue-100" },
    { icon:"📍", title:"Run Anywhere", desc:"Road, treadmill, track — run in your city on your own schedule.", bg:"bg-green-50", border:"border-green-100", ibg:"bg-green-100" },
    { icon:"📸", title:"Easy Proof", desc:"Screenshot from Strava, Nike Run Club, or any app. We verify fast.", bg:"bg-purple-50", border:"border-purple-100", ibg:"bg-purple-100" },
    { icon:"🤝", title:"Community", desc:"Join thousands of runners across India chasing the same finish line.", bg:"bg-red-50", border:"border-red-100", ibg:"bg-red-100" },
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
    { n:"01", icon:"🏃", title:"Register", sub:"Pick your distance", desc:"Choose 5K, 10K, or 21K. Pay securely via Razorpay. Takes under 2 minutes.", cls:"border-red-200 bg-red-50" },
    { n:"02", icon:"📍", title:"Run Anywhere", sub:"Your city, your route", desc:"Run anywhere in India — road, treadmill, or track.", cls:"border-orange-200 bg-orange-50" },
    { n:"03", icon:"📸", title:"Submit Proof", sub:"Screenshot your run", desc:"Share your Strava, Nike, or any GPS app screenshot. We verify in 24 hrs.", cls:"border-amber-200 bg-amber-50" },
    { n:"04", icon:"🏅", title:"Get Your Medal", sub:"Delivered to your door", desc:"Real zinc-alloy medal shipped home free, pan-India.", cls:"border-green-200 bg-green-50" },
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

/* ═══════════════ ACTIVE CHALLENGES ═══════════════ */
function ActiveChallengesSection({ events, router }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <div key={event._id}
              className="rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                <img src={event.coverImage || event.image} alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    LIVE
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{event.dates}</p>
                <div className="flex gap-3">
                  <button onClick={() => router.push(`/challenges/${event.slug}`)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg">
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

/* ═══════════════════════════════════════════════════════
   PREVIOUS EVENTS
═══════════════════════════════════════════════════════ */
function PreviousEventsSection({ events, router }) {
  return (
    <section className="py-16 sm:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block bg-gray-300 text-gray-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Past Events
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-500">
            Previous Challenges
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            These challenges have ended. Stay tuned for the next one! 💪
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div key={event._id} className="rounded-3xl overflow-hidden border-2 border-gray-200 bg-white" style={{ opacity: 0.75 }}>
              <div className="relative h-44 overflow-hidden bg-gray-200">
                <img src={event.coverImage || event.image} alt={event.title} className="h-full w-full object-cover" style={{ filter: "grayscale(100%)" }} />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-3 left-3">
                  <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="6" fill="#4B5563"/>
                      <path d="M3.5 6l2 2 3-3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Completed
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white/80 font-black text-sm leading-tight">{event.title}</p>
                </div>
              </div>
              <div className="p-5 bg-gray-50">
                <p className="text-gray-400 text-xs mb-1 font-medium uppercase tracking-wide">Event Period</p>
                <p className="text-gray-500 text-sm font-semibold mb-4">{event.dates}</p>
                <button onClick={() => router.push(`/leaderboard/${event.slug}`)}
                  className="w-full border-2 border-gray-300 text-gray-400 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:border-gray-400 hover:text-gray-600 transition-colors">
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

/* ══════════════════════════════════════════
   3D MEDAL
══════════════════════════════════════════ */
function Medal3D({ event }) {
  const rotY = useRef(0);
  const rotX = useRef(-10);
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  const autoOn = useRef(true);
  const rafId = useRef(null);
  const autoTimer = useRef(null);
  const innerRef = useRef(null);

  const apply = () => {
    if (innerRef.current)
      innerRef.current.style.transform = `rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)`;
  };

  useEffect(() => {
    const tick = () => { if (autoOn.current) { rotY.current += 0.45; apply(); } rafId.current = requestAnimationFrame(tick); };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const pauseAuto = () => {
    autoOn.current = false;
    clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => { autoOn.current = true; }, 2800);
  };

  const onDown = (x, y) => { drag.current = { active: true, lastX: x, lastY: y }; pauseAuto(); };
  const onMove = (x, y) => {
    if (!drag.current.active) return;
    rotY.current += (x - drag.current.lastX) * 0.65;
    rotX.current = Math.max(-40, Math.min(40, rotX.current - (y - drag.current.lastY) * 0.4));
    drag.current.lastX = x; drag.current.lastY = y;
    apply();
  };
  const onUp = () => { drag.current.active = false; };

  const faceStyle = (extra = {}) => ({
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: "50%",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    willChange: "transform",
    ...extra,
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
      <div
        style={{ width:360, height:360, perspective:"800px", cursor:"grab", userSelect:"none", position:"relative" }}
        onMouseDown={(e) => { e.preventDefault(); onDown(e.clientX, e.clientY); }}
        onMouseMove={(e) => onMove(e.clientX, e.clientY)}
        onMouseUp={onUp} onMouseLeave={onUp}
        onTouchStart={(e) => { e.preventDefault(); onDown(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchMove={(e) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={onUp}
      >
        <div ref={innerRef} style={{ width:"100%", height:"100%", position:"relative", transformStyle:"preserve-3d", transform:`rotateX(${rotX.current}deg) rotateY(${rotY.current}deg)` }}>
          <div style={faceStyle({ background: event.medalImage ? "#111" : "linear-gradient(135deg,#fde68a,#f59e0b,#d97706,#92400e)", boxShadow:"0 20px 60px rgba(0,0,0,0.6),inset 0 2px 0 rgba(255,255,255,0.3)" })}>
            {event.medalImage
              ? <img src={event.medalImage} alt="Front" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
              : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8 }}><span style={{ fontSize:52 }}>🏅</span><span style={{ color:"#78350f",fontWeight:900,fontSize:11,textAlign:"center",padding:"0 20px" }}>{event.title}</span></div>
            }
            <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 45%,rgba(0,0,0,0.1) 100%)" }} />
            <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>FRONT</div>
          </div>
          <div style={faceStyle({ transform:"rotateY(180deg)", background: event.medalImageBack ? "#111" : "linear-gradient(135deg,#e5e7eb,#9ca3af,#6b7280)", boxShadow:"0 20px 60px rgba(0,0,0,0.5),inset 0 2px 0 rgba(255,255,255,0.15)" })}>
            {event.medalImageBack
              ? <img src={event.medalImageBack} alt="Back" draggable={false} style={{ width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block",pointerEvents:"none" }} />
              : <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:"0 24px" }}><div style={{ width:60,height:60,borderRadius:"50%",background:"rgba(156,163,175,0.4)",border:"3px solid #d1d5db",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26 }}>🇮🇳</div><span style={{ color:"#374151",fontWeight:900,fontSize:11,textAlign:"center" }}>{event.title}</span><span style={{ color:"#6b7280",fontSize:10,textAlign:"center" }}>{event.dates}</span></div>
            }
            <div style={{ position:"absolute",inset:0,borderRadius:"50%",pointerEvents:"none",background:"linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 50%,rgba(0,0,0,0.15) 100%)" }} />
            <div style={{ position:"absolute",top:8,right:10,background:"rgba(0,0,0,0.28)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 10px",borderRadius:999 }}>BACK</div>
          </div>
          <div style={{ position:"absolute",inset:0,borderRadius:"50%",transform:"translateZ(-8px)",background:"radial-gradient(ellipse,#b45309,#78350f)",WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden" }} />
        </div>
        <div style={{ position:"absolute",bottom:-12,left:"50%",transform:"translateX(-50%)",width:170,height:14,background:"radial-gradient(ellipse,rgba(0,0,0,0.25) 0%,transparent 70%)",filter:"blur(4px)",pointerEvents:"none" }} />
      </div>
      <p style={{ fontSize:12,color:"#9ca3af",display:"flex",alignItems:"center",gap:6 }}>👆 Drag or touch to rotate</p>
      <div style={{ textAlign:"center" }}>
        <p style={{ fontWeight:900,color:"#111827",fontSize:15 }}>{event.title}</p>
        <p style={{ color:"#6b7280",fontSize:13,marginTop:2 }}>Finisher Medal</p>
      </div>
      <div style={{ background:"#fff",border:"2px solid #f3f4f6",borderRadius:16,padding:"16px 20px",width:240,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
          {[["Weight","100g"],["Diameter","70mm"],["Material","Zinc Alloy"],["Delivery","Free"]].map(([k,v]) => (
            <div key={k}><p style={{ color:"#9ca3af",fontSize:11 }}>{k}</p><p style={{ fontWeight:700,color:"#1f2937",fontSize:14,marginTop:2 }}>{v}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MedalShowcaseSection({ events }) {
  const medalEvents = events.filter((e) => e.medalImage);
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-200">Your Reward</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What You Earn</h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Proof beats motivation. Every finisher earns a real, heavy metal medal shipped to your door.</p>
          <p className="text-gray-400 text-sm mt-2">🖱️ Drag to rotate · 📱 Touch and drag on mobile</p>
        </div>
        {medalEvents.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-14 sm:gap-20 mb-14">
            {medalEvents.map((event) => <Medal3D key={event._id} event={event} />)}
          </div>
        ) : (
          <div className="text-center py-16"><div className="text-5xl mb-4">🏅</div><p className="text-gray-400 font-bold">Medal images loading...</p></div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[["📦","Free Shipping","Pan India"],["⚡","Fast Delivery","7–10 days"],["🔒","Guaranteed","Or full refund"],["⭐","Premium","Zinc alloy"]].map(([e,t,s]) => (
            <div key={t} className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:border-red-200 transition-colors">
              <div className="text-2xl mb-2">{e}</div>
              <div className="font-bold text-sm text-gray-900">{t}</div>
              <div className="text-gray-400 text-xs mt-1">{s}</div>
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
              {["Your name + distance on the certificate","Event date and official Valley Run branding","Downloadable high-res PDF","Share on LinkedIn in one click"].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-600 text-xs flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden border-2 border-yellow-200 shadow-xl">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"repeating-linear-gradient(45deg,#b45309 0,#b45309 1px,transparent 0,transparent 50%)",backgroundSize:"10px 10px" }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-2xl mx-auto mb-5">🏅</div>
                <p className="text-yellow-700 text-xs font-bold tracking-widest uppercase mb-2">Certificate of Completion</p>
                <p className="text-gray-400 text-sm mb-1">This certifies that</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Your Name</p>
                <p className="text-gray-400 text-sm mb-3">has successfully completed</p>
                <p className="text-xl font-bold text-amber-700 mb-1">Shaheed Diwas Tribute Run 2026</p>
                <p className="text-amber-600 font-bold text-lg mb-5">10 Kilometres</p>
                <div className="flex justify-center gap-4 sm:gap-6 text-xs text-gray-400 border-t border-yellow-200 pt-5">
                  {[["23 Mar 2026","Event Date"],["Verified","Status"],["VR-2026-XXX","Cert. ID"]].map(([v,l]) => (
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

/* ═══════════════ TESTIMONIALS — CAROUSEL ═══════════════ */
function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const REVIEWS = [
  {
    id: "69d0f99f7ba5eb0710484fc1",
    name: "Subhojyoti Raha",
    instaId: "SubhojyotiRaha",
    review: "It's was such an amazing experience running for the special occasion, absolute goosebumps!!! Looking forward for more marathons and accomplishing them.",
    imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775303070/medal-reviews/p26h3zrhugrlqc5ivxk4.jpg",
    rating: 5,
  },
  {
    id: "69d368c77ba5eb0710486801",
    name: "Susmit Pal",
    instaId: "human._.11_",
    review: "Had a great experience with you guys every step was guided properly and all the issues were resolved. Will sury participate in more events and loved the medal",
    imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/f_jpg/v1775462598/medal-reviews/jmxp7uj63iluoj2qjkoj.heic",
    rating: 5,
  },
  {
    id: "69d3711d7ba5eb07104868f8",
    name: "Jayanth Reddy",
    instaId: "Jayanth kumar reddy",
    review: "Thank you us for give this opportunity to participate in this Tribute Run nd good support in Instagram nd WhatsApp if any confusion again tq sir for this grate event",
    imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775464732/medal-reviews/jy95fbfa05ki803crcjh.jpg",
    rating: 5,
  },
  {
    id: "69d3a29d7ba5eb0710486e39",
    name: "Sathish S",
    instaId: "Sathish.sa.75",
    review: "Absolutely loved the Virtual Running Challenge. It was the perfect motivation to stay active on my own schedule. I just received my FINISHER Medal, and the quality is outstanding. It's heavy, detailed and feels like a real premium trophy. Can't wait to sign up for the next one!",
    imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775477404/medal-reviews/sdieaolsjpflweu5zrj2.jpg",
    rating: 5,
  },
  {
    id: "69d3a6067ba5eb0710486e6c",
    name: "Likhith Lokanath Bangera",
    instaId: "likki_ganigaz_69",
    review: "The medal quality was good",
    imageUrl: "https://res.cloudinary.com/dafwe6lci/image/upload/v1775478278/medal-reviews/slk1mb8u4hejdtgfai68.jpg",
    rating: 5,
  },
  // ── Nayi review add karni ho toh yahan add karo ──
  // {
  //   id: "unique_id",
  //   name: "Runner Name",
  //   instaId: "instagram_handle",
  //   review: "Review text...",
  //   imageUrl: "https://cloudinary_url",
  //   rating: 5,
  // },
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Verified Runner
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: review.rating }).map((_, i) => <StarIcon key={i} />)}
        </div>
        <p className="text-gray-500 text-5xl font-serif leading-none mb-1 select-none">"</p>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 italic mb-4 flex-1">
          {review.review}
        </p>
        <div className="flex items-center justify-between gap-3 mt-auto">
          <p className="font-black text-gray-900 text-sm">{review.name}</p>
          <a
            href={`https://www.instagram.com/${review.instaId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-2 rounded-full hover:opacity-85 hover:scale-105 transition-all duration-200 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #f9a8d4, #fb923c, #a855f7)" }}
          >
            <InstagramIcon />
            @{review.instaId}
          </a>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = REVIEWS.length;

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % total), 4000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % total), 4000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const handlePrev = () => { setCurrent((p) => (p - 1 + total) % total); resetTimer(); };
  const handleNext = () => { setCurrent((p) => (p + 1) % total); resetTimer(); };

  const getVisible = () => [0, 1, 2].map((offset) => REVIEWS[(current + offset) % total]);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Real Reviews</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What Our Runners Say</h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            500+ runners completed their challenge. Here&apos;s what they earned — and what they felt.
          </p>
        </div>

        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden sm:grid grid-cols-3 gap-6">
            {getVisible().map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
          {/* Mobile: 1 card */}
          <div className="sm:hidden">
            <ReviewCard review={REVIEWS[current]} />
          </div>
          {/* Prev / Next */}
          <button onClick={handlePrev} className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">‹</button>
          <button onClick={handleNext} className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">›</button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); resetTimer(); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-14 bg-gray-900 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl sm:text-2xl">Ready to earn your medal?</p>
            <p className="text-gray-400 text-sm mt-1">500+ runners already finished. Your turn.</p>
          </div>
          <button
            onClick={() => document.getElementById("challenges")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-full text-sm transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap">
            Register Now →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ GALLERY — SLIDER + LIGHTBOX ═══════════════ */
function GallerySection({ events }) {
  const images = events.flatMap((e) => e.gallery || []).slice(0, 12);
  const [lightbox, setLightbox] = useState(null); // index of open image
  const [galIdx, setGalIdx] = useState(0);
  const galTimer = useRef(null);
  const VISIBLE = 4; // images per slide on desktop

  const resetGalTimer = () => {
    clearInterval(galTimer.current);
    galTimer.current = setInterval(() => setGalIdx((p) => (p + 1) % Math.max(1, images.length)), 3000);
  };

  useEffect(() => {
    if (images.length > VISIBLE) {
      galTimer.current = setInterval(() => setGalIdx((p) => (p + 1) % images.length), 3000);
      return () => clearInterval(galTimer.current);
    }
  }, [images.length]);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const getVisibleImages = () => {
    if (images.length === 0) return [];
    return [0, 1, 2, 3].map((offset) => ({
      img: images[(galIdx + offset) % images.length],
      idx: (galIdx + offset) % images.length,
    }));
  };

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Community</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Community Gallery</h2>
          <p className="text-gray-500 mt-3 text-sm">Real runners. Real finishes. Real medals.</p>
        </div>

        {images.length > 0 ? (
          <>
            {/* Slider */}
            <div className="relative">
              {/* Desktop: 4 images */}
              <div className="hidden sm:grid grid-cols-4 gap-3">
                {getVisibleImages().map(({ img, idx }) => (
                  <div key={idx} onClick={() => setLightbox(idx)}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{ aspectRatio: "1" }}>
                    <img src={img} alt="Runner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">View</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile: 2 images */}
              <div className="sm:hidden grid grid-cols-2 gap-3">
                {[0, 1].map((offset) => {
                  const idx = (galIdx + offset) % images.length;
                  return (
                    <div key={idx} onClick={() => setLightbox(idx)}
                      className="relative overflow-hidden rounded-2xl cursor-pointer group"
                      style={{ aspectRatio: "1" }}>
                      <img src={images[idx]} alt="Runner" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  );
                })}
              </div>
              {/* Prev / Next */}
              {images.length > VISIBLE && (
                <>
                  <button onClick={() => { setGalIdx((p) => (p - 1 + images.length) % images.length); resetGalTimer(); }}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">‹</button>
                  <button onClick={() => { setGalIdx((p) => (p + 1) % images.length); resetGalTimer(); }}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-md hover:border-red-400 hover:text-red-500 transition-all z-10 text-gray-500 font-bold text-lg">›</button>
                </>
              )}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, i) => (
                <button key={i} onClick={() => { setGalIdx(i); resetGalTimer(); }}
                  className={`rounded-full transition-all duration-300 ${i === galIdx ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-14 sm:p-20 text-center">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-lg font-bold text-gray-700">Runner photos coming soon!</p>
            <p className="text-gray-400 text-sm mt-2">Complete your run, submit proof — we will feature you here.</p>
          </div>
        )}
        <p className="text-center text-gray-400 text-sm mt-6">Finish your run → Submit proof → Get featured here 🏃</p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-xl font-bold transition-all z-10">
            ×
          </button>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p - 1 + images.length) % images.length); }}
            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all z-10">
            ‹
          </button>
          {/* Image */}
          <img
            src={images[lightbox]}
            alt="Runner"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p + 1) % images.length); }}
            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all z-10">
            ›
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 text-white/60 text-sm font-medium">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
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
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-1">Stay in the Loop 📣</h3>
                <p className="text-green-200 text-sm leading-relaxed max-w-sm">Get live event updates, result announcements, and medal dispatch alerts — first.</p>
              </div>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#25D366] hover:bg-green-400 text-white font-black px-7 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg whitespace-nowrap text-sm">
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
    {q:"What apps can I use to track my run?",a:"Any GPS app works — Strava, Nike Run Club, Google Fit, Garmin, Samsung Health, Apple Fitness, or a treadmill screenshot. It should clearly show date, distance, and your profile."},
    {q:"How do I submit proof?",a:"After completing your run, screenshot your activity and submit via the WhatsApp number or upload link in your confirmation email. We verify within 24 hours."},
    {q:"Can I run on a treadmill?",a:"Absolutely! Valley Run is fully virtual — treadmill, road, track, park. All count. What matters is the distance and your discipline."},
    {q:"When will I receive my medal?",a:"Medals dispatch in batches after the event window closes. Delivery is 7–10 working days. You will get a tracking number via WhatsApp or email once shipped."},
    {q:"Is shipping really free?",a:"100% free, pan-India. Tier 1, 2, and 3 cities all included — no hidden charges whatsoever."},
    {q:"Do I need to complete the distance in one go?",a:"Yes — one continuous activity on your tracking app. Split or combined activities won't be accepted as valid proof."},
    {q:"Is there a refund if I cannot finish?",a:"We don't offer refunds for incomplete challenges since medals are manufactured in advance. For genuine emergencies, write to us — we handle each case personally."},
    {q:"Can I register for both 5K and 10K?",a:"Yes! Each registration is separate and comes with its own medal and certificate."},
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
            <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${open===i ? "border-red-200 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}>
              <button className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4" onClick={() => setOpen(open===i ? null : i)}>
                <span className="font-bold text-sm sm:text-base text-gray-900 pr-4">{faq.q}</span>
                <span className={`text-gray-400 text-2xl font-light flex-shrink-0 transition-transform duration-300 ${open===i ? "rotate-45 text-red-500" : ""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open===i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
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
