// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import ChallengeCard from "../components/ChallengeCard";

// export default function ChallengesPage() {
//   const [challenges, setChallenges] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setChallenges(data.events);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <section className="pt-32 max-w-7xl mx-auto px-6 pb-20 bg-white">
//         <h1 className="text-4xl font-bold text-center mb-12">
//           Live Challenges
//         </h1>

//         <div className="grid md:grid-cols-3 gap-8">
//           {challenges.map(c => (
//             <ChallengeCard key={c._id} {...c} />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import ChallengeCard from "../components/ChallengeCard";

// export default function ChallengesPage() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setEvents(data.events);
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
//         <h1 className="text-4xl font-extrabold mb-10">
//           Live Challenges
//         </h1>

//         {/* LOADING */}
//         {loading && (
//           <p className="text-gray-500">
//             Loading challenges...
//           </p>
//         )}

//         {/* EMPTY */}
//         {!loading && events.length === 0 && (
//           <p className="text-gray-500">
//             No active challenges available right now.
//           </p>
//         )}

//         {/* LIST */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map(event => (
//             <ChallengeCard
//               key={event._id}
//               event={event}
//             />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChallengeCard from "../components/ChallengeCard";
import Link from "next/link";

export default function ChallengesPage() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvents(data.events);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Alag filter karo
  const liveEvents = events.filter(e => e.active && !e.isPrevious);
  const pastEvents = events.filter(e => e.active && e.isPrevious);

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">

        {/* ── ACTIVE CHALLENGES ── */}
        <h1 className="text-4xl font-extrabold mb-10">Active Challenges</h1>

        {loading && <p className="text-gray-500">Loading challenges...</p>}

        {!loading && liveEvents.length === 0 && (
          <p className="text-gray-500 mb-10">No active challenges right now. Stay tuned! 💪</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {liveEvents.map(event => (
            <ChallengeCard key={event._id} event={event}/>
          ))}
        </div>

        {/* ── PREVIOUS CHALLENGES ── */}
        {pastEvents.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-16 mb-10">
              <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Past Events
              </span>
              <h2 className="text-3xl font-extrabold text-gray-700">Previous Challenges</h2>
              <p className="text-gray-500 mt-2">These challenges have ended. Stay tuned for the next one! 💪</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map(event => (
                <div key={event._id} className="bg-white rounded-2xl shadow-md overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                  {/* Cover image */}
                  <div className="relative w-full h-48 bg-gray-100">
                    {event.coverImage ? (
                      <img src={event.coverImage} alt={event.title}
                        className="w-full h-full object-cover grayscale"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🏃</div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✅ Completed
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1 text-gray-600">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      <span className="font-semibold">EVENT PERIOD</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Challenge period → {event.dates}</p>

                    <Link href={`/leaderboard/${event.slug}`}>
                      <button className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                        View Results →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}