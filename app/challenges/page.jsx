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
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChallengeCard from "../components/ChallengeCard";

export default function ChallengesPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEvents(data.events);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-10">
          Live Challenges
        </h1>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500">
            Loading challenges...
          </p>
        )}

        {/* EMPTY */}
        {!loading && events.length === 0 && (
          <p className="text-gray-500">
            No active challenges available right now.
          </p>
        )}

        {/* LIST */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <ChallengeCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      </section>
    </>
  );
}
