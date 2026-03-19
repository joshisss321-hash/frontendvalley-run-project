// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setEvents(data.events);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <section
//   className="relative min-h-[80vh] flex items-center"
//   style={{
//     backgroundImage: "url('/hero.jpg')", // 🔥 put image in /public/hero.jpg
//     backgroundSize: "cover",
//     backgroundPosition: "center"
//   }}
// >
//   <div className="absolute inset-0 bg-black/60"></div>

//   <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
//     <p className="uppercase tracking-widest text-sm mb-4">
//       Virtual Fitness Challenges
//     </p>

//     <h1 className="text-5xl font-extrabold leading-tight mb-6">
//       Discipline Builds <br />
//       <span className="text-red-500">Legends.</span>
//     </h1>

//     <p className="max-w-xl text-lg text-gray-200 mb-8">
//       Anyone can start. Very few finish.  
//       Valley Run exists for those who choose consistency over comfort.
//     </p>

//     <div className="flex gap-4">
//       <a
//         href="/challenges"
//         className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-semibold"
//       >
//         Explore Challenges
//       </a>

//       <a
//         href="/challenges"
//         className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
//       >
//         Start Your Journey
//       </a>
//     </div>
//   </div>
// </section>


//       {/* ================= WHY JOIN ================= */}
//       <section className="py-28 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-6">
//             Why Join Valley Run?
//           </h2>

//           <p className="text-gray-600 max-w-3xl mx-auto mb-16">
//             This is not entertainment.
//             This is structure, accountability and proof of effort.
//           </p>

//           <div className="grid md:grid-cols-3 gap-12">
//             <div>
//               <h3 className="text-xl font-semibold mb-3">
//                 ⏳ Fixed Deadlines
//               </h3>
//               <p className="text-gray-600">
//                 Deadlines create discipline.
//                 You don’t train “someday” — you train now.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-3">
//                 🏅 Real Rewards
//               </h3>
//               <p className="text-gray-600">
//                 Heavy metal medals.
//                 Not digital badges that disappear.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-3">
//                 🧠 Mental Strength
//               </h3>
//               <p className="text-gray-600">
//                 You finish stronger than you started —
//                 mentally and physically.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= ACTIVE CHALLENGES ================= */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-14">
//             Active Challenges
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {events.map(event => (
//               <div
//                 key={event._id}
//                 className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
//               >
//                 {/* COVER IMAGE */}
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="h-56 w-full object-cover"
//                 />

//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-1">
//                     {event.title}
//                   </h3>

//                   <p className="text-gray-500 text-sm mb-5">
//                     {event.dates}
//                   </p>

//                   <button
//                     onClick={() =>
//                       router.push(`/challenges/${event.slug}`)
//                     }
//                     className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
//                   >
//                     View Challenge
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= WHAT YOU EARN ================= */}
//       <section className="py-28 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-6">
//             What You Earn
//           </h2>

//           <p className="text-gray-600 max-w-3xl mx-auto mb-16">
//             Proof beats motivation.
//             Every finisher earns something tangible.
//           </p>

//           <div className="grid md:grid-cols-3 gap-10">
//             {events.map(event => (
//               <div
//                 key={event._id}
//                 className="bg-gray-50 rounded-3xl p-6 shadow"
//               >
//                 {/* MEDAL IMAGE */}
//                 <img
//                   src={event.medalImage || event.gallery?.[0]}
//                   alt="Premium Medal"
//                   className="h-64 w-full object-cover rounded-xl mb-4"
//                 />

//                 <p className="font-semibold">
//                   {event.title} – Finisher Medal
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= COMMUNITY GALLERY ================= */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-14">
//             Community Gallery
//           </h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             {events
//               .flatMap(e => e.gallery || [])
//               .slice(0, 8)
//               .map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt="Community"
//                   className="h-48 w-full object-cover rounded-2xl"
//                 />
//               ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= FINAL CTA ================= */}
//       <section className="py-28 bg-black text-white text-center">
//         <h2 className="text-4xl font-bold mb-6">
//           Your Discipline Has a Deadline.
//         </h2>

//         <p className="text-gray-300 mb-10">
//           Join now. Finish strong.
//           Earn something that reminds you who you are.
//         </p>

//         <button
//           onClick={() => router.push("/challenges")}
//           className="bg-red-600 hover:bg-red-700 px-12 py-5 rounded-full font-semibold shadow-xl"
//         >
//           Join a Challenge
//         </button>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

// ============================================================
// ⚙️  SIRF YE 2 LINES CHANGE KARO
// ============================================================
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M";
const REGISTRATION_DEADLINE = "2026-03-22T12:30:00.000Z"; // 22 March 6PM IST
// ============================================================

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setEvents(d.events); });
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <HeroSection router={router} />
      <TrustBar />
      <WhyJoinSection />
      <HowItWorksSection />
      <ActiveChallengesSection events={events} router={router} deadline={REGISTRATION_DEADLINE} />
      <MedalShowcaseSection events={events} />
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
    document.getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundImage:"url('/hero.jpg')", backgroundSize:"cover", backgroundPosition:"center" }}>
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
          <button onClick={() => router.push("/challenges")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-lg hover:scale-105 text-center">
            Explore Challenges →
          </button>
          <button onClick={scrollToHowItWorks}
            className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:bg-white/10 text-center">
            How It Works ↓
          </button>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-8 border-t border-white/20">
          {[["100+","Runners"],["Pan India","Delivery"],["100%","Real Medals"]].map(([n,l]) => (
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
    <div className="py-3 overflow-hidden" style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)" }}>
      <div className="flex gap-10 w-max" style={{ animation:"trustscroll 25s linear infinite" }}>
        {[...items,...items].map((item,i) => (
          <span key={i} className="text-sm font-bold whitespace-nowrap flex items-center gap-3" style={{ color: "rgba(255,255,255,0.75)" }}>
            {item}
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
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
          {cards.map((c,i) => (
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
    { n:"02", icon:"📍", title:"Run Anywhere", sub:"Your city, your route", desc:"Run anywhere in India — road, treadmill, or track. Complete within the event window.", cls:"border-orange-200 bg-orange-50" },
    { n:"03", icon:"📸", title:"Submit Proof", sub:"Screenshot your run", desc:"Share your Strava, Nike, or any GPS app screenshot showing date + distance. We verify in 24 hrs.", cls:"border-amber-200 bg-amber-50" },
    { n:"04", icon:"🏅", title:"Get Your Medal", sub:"Delivered to your door", desc:"A real, heavy zinc-alloy medal ships to your home. Free pan-India delivery included.", cls:"border-green-200 bg-green-50" },
  ];
  useEffect(() => { const t = setInterval(() => setActive(p => (p+1)%4), 3000); return () => clearInterval(t); }, []);

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">Four Steps to Your Medal</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="space-y-3">
            {steps.map((s,i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 ${active===i ? s.cls : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-gray-200">{s.n}</span>
                  <span className="text-2xl">{s.icon}</span>
                  <div><div className="font-bold text-gray-900">{s.title}</div><div className="text-xs text-gray-500">{s.sub}</div></div>
                </div>
                {active===i && <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-16">{s.desc}</p>}
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
              {steps.map((_,i) => (<div key={i} className={`rounded-full transition-all duration-300 ${active===i ? "w-6 h-2 bg-red-500" : "w-2 h-2 bg-gray-300"}`} />))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COUNTDOWN — NaN fix:
   MongoDB se date string alag format mein aa
   sakti hai, isliye safeDate() helper banaya
═══════════════════════════════════════════ */
function safeDate(val) {
  if (!val) return null;
  // MongoDB se { $date: "..." } ya string ya Date object aa sakta hai
  if (typeof val === "object" && val.$date) return new Date(val.$date);
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function isClosed(deadline) {
  if (!deadline) return false;
  const d = safeDate(deadline);
  if (!d) return false;
  return d.getTime() < Date.now();
}

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

  if (!t) return (
    <span className="text-xs text-red-500 font-bold">Registration Closed</span>
  );

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="text-xs text-gray-500">Closes in:</span>
      {[[t.d,"d"],[t.h,"h"],[t.m,"m"],[t.s,"s"]].map(([v,l]) => (
        <span key={l} className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums">
          {String(v).padStart(2,"0")}{l}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════ ACTIVE CHALLENGES ═══════════════ */
function ActiveChallengesSection({ events, router, deadline }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Live Now</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Active Challenges</h2>
          </div>
          <MiniCountdown deadline={deadline} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => {
            const closed = isClosed(event.registrationDeadline || deadline);
            return (
              <div key={event._id} className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 bg-white ${closed ? "border-gray-200 opacity-80" : "border-gray-200 hover:border-red-300 hover:shadow-xl hover:-translate-y-1"}`}>
                {closed && <div className="absolute inset-0 z-10 bg-white/40 backdrop-grayscale pointer-events-none rounded-3xl" />}

                <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <img src={event.coverImage||event.image} alt={event.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${closed?"grayscale":""}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 z-20">
                    {closed ? (
                      <span className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-white"/></span>
                        Event Running
                      </span>
                    ) : (
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">🔴 LIVE</span>
                    )}
                  </div>
                  {closed && <div className="absolute top-3 right-3 z-20"><span className="bg-black/60 text-gray-200 text-xs font-bold px-2.5 py-1 rounded-full">🔒 Reg. Closed</span></div>}
                </div>

                <div className="relative z-20 p-5 sm:p-6">
                  <h3 className={`text-lg font-bold mb-1 ${closed?"text-gray-400":"text-gray-900"}`}>{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{event.dates}</p>
                  {!closed && event.registrationDeadline && (
                    <div className="mb-4">
                      <MiniCountdown deadline={event.registrationDeadline} />
                    </div>
                  )}
                  {closed ? (
                    <>
                      <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-full font-bold text-sm cursor-not-allowed border border-gray-200 mb-2">Registration Closed</button>
                      <button onClick={() => router.push(`/challenges/${event.slug}`)} className="w-full border-2 border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-700 py-3 rounded-full font-semibold text-sm transition-colors">View Details →</button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={() => router.push(`/challenges/${event.slug}`)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-red-200">Register Now</button>
                      <button onClick={() => router.push(`/challenges/${event.slug}`)} className="border-2 border-gray-200 hover:border-gray-400 px-4 py-3 rounded-full text-sm font-semibold text-gray-600 transition-colors">Details</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {events.length===0 && (
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

/* ═══════════════ MEDAL SHOWCASE ═══════════════ */
function MedalShowcaseSection({ events }) {
  const [flipped,setFlipped] = useState({});
  const toggle = (id) => setFlipped(p=>({...p,[id]:!p[id]}));

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-yellow-200">Your Reward</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">What You Earn</h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Proof beats motivation. Every finisher earns a real, heavy metal medal shipped to your door.</p>
        </div>

        {events.length>0 && (
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-14">
            {events.map((event) => (
              <div key={event._id} className="flex flex-col items-center gap-5">
                <div className="relative w-52 sm:w-60 h-64 sm:h-72 cursor-pointer" style={{perspective:"1000px"}} onClick={()=>toggle(event._id)}>
                  <div className="relative w-full h-full transition-all duration-700"
                    style={{transformStyle:"preserve-3d", transform:flipped[event._id]?"rotateY(180deg)":"rotateY(0deg)"}}>

                    {/* ── FRONT — full image cover ── */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border-2 border-yellow-200"
                      style={{backfaceVisibility:"hidden"}}>

                      {/* Medal image — full card cover */}
                      {event.medalImage ? (
                        <img
                          src={event.medalImage}
                          alt="medal"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500" />
                      )}

                      {/* Dark gradient overlay at bottom for text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* FRONT badge */}
                      <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        FRONT
                      </div>

                      {/* Title at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                        <p className="font-black text-sm sm:text-base text-white leading-tight">{event.title}</p>
                        <p className="text-white/70 text-xs mt-1">Finisher Medal</p>
                      </div>
                    </div>

                    {/* ── BACK ── */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200"
                      style={{backfaceVisibility:"hidden", transform:"rotateY(180deg)"}}>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"/>
                      <div className="absolute top-3 right-3 bg-gray-400/30 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">BACK</div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                        <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-gray-400 flex items-center justify-center text-5xl">🇮🇳</div>
                        <div className="text-center">
                          <p className="font-bold text-gray-800 text-sm">{event.title}</p>
                          <p className="text-gray-500 text-xs mt-1">{event.dates}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <p className="text-xs text-gray-400">{flipped[event._id]?"← Flip back":"Click to flip →"}</p>

                {/* ✅ Weight 100g updated */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 w-52 sm:w-60 shadow-sm">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[["Weight","100g"],["Diameter","70mm"],["Material","Zinc Alloy"],["Delivery","Free"]].map(([k,v])=>(
                      <div key={k}><p className="text-gray-400">{k}</p><p className="font-bold text-gray-800 mt-0.5">{v}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[["📦","Free Shipping","Pan India"],["⚡","Fast Delivery","7–10 days"],["🔒","Guaranteed","Or full refund"],["⭐","Premium","Zinc alloy"]].map(([e,t,s])=>(
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
              {["Your name + distance on the certificate","Event date and official Valley Run branding","Downloadable high-res PDF","Share on LinkedIn in one click"].map(f=>(
                <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-600 text-xs flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden border-2 border-yellow-200 shadow-xl">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(45deg,#b45309 0,#b45309 1px,transparent 0,transparent 50%)",backgroundSize:"10px 10px"}}/>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-2xl mx-auto mb-5">🏅</div>
                <p className="text-yellow-700 text-xs font-bold tracking-widest uppercase mb-2">Certificate of Completion</p>
                <p className="text-gray-400 text-sm mb-1">This certifies that</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Your Name</p>
                <p className="text-gray-400 text-sm mb-3">has successfully completed</p>
                <p className="text-xl font-bold text-amber-700 mb-1">Shaheed Diwas Tribute Run 2026</p>
                <p className="text-amber-600 font-bold text-lg mb-5">10 Kilometres</p>
                <div className="flex justify-center gap-4 sm:gap-6 text-xs text-gray-400 border-t border-yellow-200 pt-5">
                  {[["23 Mar 2026","Event Date"],["Verified","Status"],["VR-2026-XXX","Cert. ID"]].map(([v,l])=>(
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
  const images = events.flatMap(e=>e.gallery||[]).slice(0,8);
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">Community</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Community Gallery</h2>
          <p className="text-gray-500 mt-3 text-sm">Real runners. Real finishes. Real medals.</p>
        </div>
        {images.length>0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img,i)=>(
              <div key={i} className={`relative overflow-hidden rounded-2xl group ${i===0?"sm:col-span-2 sm:row-span-2":""}`}>
                <img src={img} alt="Runner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{minHeight:i===0?"280px":"140px",aspectRatio:"1"}}/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl"/>
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

/* ═══════════════ TESTIMONIALS ═══════════════ */
// Commented out — real reviews aane ke baad uncomment karna
// function TestimonialsSection() { ... }

/* ═══════════════ WHATSAPP ═══════════════ */
function WhatsAppSection({ url }) {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075E54] to-[#128C7E] p-7 sm:p-10 shadow-xl">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5"/>
          <div className="absolute -right-4 -bottom-16 w-64 h-64 rounded-full bg-white/5"/>
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
            <a href={"https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M"} target="_blank" rel="noopener noreferrer"
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
  const [open,setOpen] = useState(null);
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
          {faqs.map((faq,i)=>(
            <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${open===i?"border-red-200 bg-red-50/30":"border-gray-200 bg-white hover:border-gray-300"}`}>
              <button className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4" onClick={()=>setOpen(open===i?null:i)}>
                <span className="font-bold text-sm sm:text-base text-gray-900 pr-4">{faq.q}</span>
                <span className={`text-gray-400 text-2xl font-light flex-shrink-0 transition-transform duration-300 ${open===i?"rotate-45 text-red-500":""}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open===i?"max-h-60 opacity-100":"max-h-0 opacity-0"}`}>
                <p className="px-5 sm:px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 sm:p-8 text-center">
          <p className="font-bold text-gray-900 mb-1">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-5">We reply within a few hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://whatsapp.com/channel/0029VbCM5KOBVJl3FdMMHI3M" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-green-500 transition-colors">💬 WhatsApp</a>
            <a href="mailto:valleyrun.official@gmail.com" className="flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full text-sm hover:border-gray-400 transition-colors">✉️ Email Us</a>
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
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent pointer-events-none"/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none"/>
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">Your Discipline<br />Has a Deadline.</h2>
        <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">Join now. Finish strong.<br/>Earn something that reminds you who you are.</p>
        <button onClick={() => router.push("/challenges")}
          className="bg-red-600 hover:bg-red-500 px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg transition-all duration-200 shadow-2xl shadow-red-900/50 hover:scale-105">
          Join a Challenge →
        </button>
        <p className="text-gray-600 text-xs mt-5">Free shipping · Real medal · Pan-India delivery</p>
      </div>
    </section>
  );
}

/* ═══════════════ TESTIMONIALS (hidden) ═══════════════ */
function TestimonialsSection() {
  return null;
}
