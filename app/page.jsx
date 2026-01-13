
// // "use client";

// // import { useEffect, useState } from "react";
// // import Navbar from "./components/Navbar";
// // import Hero from "./components/Hero";
// // import ChallengeCard from "./components/ChallengeCard";
// // import MedalShowcase from "./components/MedalShowcase";
// // import GalleryGrid from "./components/GalleryGrid";


// // export default function HomePage() {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (data.success) setEvents(data.events);
// //       });
// //   }, []);

// //   return (
// //     <>
// //       <Navbar />

// //       {/* HERO SECTION (RESTORED ✅) */}
// //       <Hero />

// //       {/* LIVE CHALLENGES (API DRIVEN) */}
// //       <section id="challenges" className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
// //             Active Challenges
// //           </h2>

// //           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {events.map((c) => (
// //               <ChallengeCard
// //                 key={c._id}
// //                 title={c.title}
// //                 date={c.dates}
// //                 image={c.image}
// //                 slug={c.slug}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* MEDALS SECTION (RESTORED ✅) */}
// //       <section className="py-20 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
// //             Premium Finisher Medals
// //           </h2>
// //           <MedalShowcase />
// //         </div>
// //       </section>

// //       {/* GALLERY SECTION (RESTORED ✅) */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
// //             Community Gallery
// //           </h2>
// //           <GalleryGrid />
// //         </div>
// //       </section>

// //     </>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const router = useRouter();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setEvents(data.events);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />

//       {/* ================= HERO SECTION ================= */}
//       <section className="pt-32 pb-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
//           <div>
//             <h1 className="text-5xl font-extrabold leading-tight mb-6">
//               Run Anywhere.
//               <br />
//               <span className="text-red-600">
//                 Earn Real Medals.
//               </span>
//             </h1>

//             <p className="text-gray-600 text-lg mb-8">
//               Join premium virtual running & cycling challenges across India.
//               Build discipline, stay consistent, and earn rewards that actually mean something.
//             </p>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => router.push("/challenges")}
//                 className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold"
//               >
//                 View Challenges
//               </button>

//               <button
//                 onClick={() => router.push("/challenges")}
//                 className="border border-red-600 text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-red-50"
//               >
//                 Register Now
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-100 rounded-3xl h-[380px] flex items-center justify-center">
//             <p className="text-gray-400 text-sm">
//               Hero Image / Video (optional)
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ================= ACTIVE CHALLENGES ================= */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-10 text-center">
//             Active Challenges
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {events.map(event => (
//               <div
//                 key={event._id}
//                 className="bg-white rounded-3xl shadow hover:shadow-lg transition p-6"
//               >
//                 {event.image && (
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="rounded-xl h-48 w-full object-cover mb-4"
//                   />
//                 )}

//                 <h3 className="text-xl font-bold mb-1">
//                   {event.title}
//                 </h3>

//                 <p className="text-gray-500 text-sm mb-4">
//                   {event.dates}
//                 </p>

//                 <button
//                   onClick={() => router.push(`/challenges/${event.slug}`)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold w-full"
//                 >
//                   View Challenge
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= PREMIUM MEDAL SECTION ================= */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Premium Finisher Medals
//           </h2>

//           <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
//             These are not cheap plastic medals.
//             Each finisher receives a premium, real metal medal —
//             a physical reminder of the discipline you built.
//           </p>

//           <div className="grid md:grid-cols-3 gap-8">
//             {events.slice(0, 3).map(event => (
//               <div
//                 key={event._id}
//                 className="bg-gray-50 rounded-3xl p-6 shadow"
//               >
//                 {event.image ? (
//                   <img
//                     src={event.image}
//                     alt="Premium Medal"
//                     className="rounded-xl mb-4 h-56 w-full object-cover"
//                   />
//                 ) : (
//                   <div className="h-56 bg-gray-200 rounded-xl mb-4" />
//                 )}

//                 <p className="font-semibold">
//                   {event.title} Medal
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= COMMUNITY GALLERY ================= */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-10 text-center">
//             Community Gallery
//           </h2>

//           <div className="grid md:grid-cols-4 gap-6">
//             {events.flatMap(e => e.gallery || []).slice(0, 4).map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 className="rounded-2xl h-48 w-full object-cover"
//                 alt="Community achievement"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvents(data.events);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section
  className="relative min-h-[80vh] flex items-center"
  style={{
    backgroundImage: "url('/hero.jpg')", // 🔥 put image in /public/hero.jpg
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
    <p className="uppercase tracking-widest text-sm mb-4">
      Virtual Fitness Challenges
    </p>

    <h1 className="text-5xl font-extrabold leading-tight mb-6">
      Discipline Builds <br />
      <span className="text-red-500">Legends.</span>
    </h1>

    <p className="max-w-xl text-lg text-gray-200 mb-8">
      Anyone can start. Very few finish.  
      Valley Run exists for those who choose consistency over comfort.
    </p>

    <div className="flex gap-4">
      <a
        href="/challenges"
        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-semibold"
      >
        Explore Challenges
      </a>

      <a
        href="/challenges"
        className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
      >
        Start Your Journey
      </a>
    </div>
  </div>
</section>


      {/* ================= WHY JOIN ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Join Valley Run?
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            This is not entertainment.
            This is structure, accountability and proof of effort.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                ⏳ Fixed Deadlines
              </h3>
              <p className="text-gray-600">
                Deadlines create discipline.
                You don’t train “someday” — you train now.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                🏅 Real Rewards
              </h3>
              <p className="text-gray-600">
                Heavy metal medals.
                Not digital badges that disappear.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                🧠 Mental Strength
              </h3>
              <p className="text-gray-600">
                You finish stronger than you started —
                mentally and physically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTIVE CHALLENGES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Active Challenges
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* COVER IMAGE */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-5">
                    {event.dates}
                  </p>

                  <button
                    onClick={() =>
                      router.push(`/challenges/${event.slug}`)
                    }
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
                  >
                    View Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU EARN ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            What You Earn
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            Proof beats motivation.
            Every finisher earns something tangible.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-gray-50 rounded-3xl p-6 shadow"
              >
                {/* MEDAL IMAGE */}
                <img
                  src={event.medalImage || event.gallery?.[0]}
                  alt="Premium Medal"
                  className="h-64 w-full object-cover rounded-xl mb-4"
                />

                <p className="font-semibold">
                  {event.title} – Finisher Medal
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY GALLERY ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Community Gallery
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {events
              .flatMap(e => e.gallery || [])
              .slice(0, 8)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Community"
                  className="h-48 w-full object-cover rounded-2xl"
                />
              ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Your Discipline Has a Deadline.
        </h2>

        <p className="text-gray-300 mb-10">
          Join now. Finish strong.
          Earn something that reminds you who you are.
        </p>

        <button
          onClick={() => router.push("/challenges")}
          className="bg-red-600 hover:bg-red-700 px-12 py-5 rounded-full font-semibold shadow-xl"
        >
          Join a Challenge
        </button>
      </section>
    </>
  );
}
