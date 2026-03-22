
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Navbar from "../../components/Navbar";

// export default function ChallengeDetailPage() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setEvent(data.event);
//       });
//   }, [slug]);

//   if (!event) {
//     return (
//       <>
//         <Navbar />
//         <div className="pt-40 text-center text-gray-500">
//           Loading challenge details...
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       {/* ===== CLEAN WHITE HERO (NO IMAGE) ===== */}
//       <section className="pt-32 pb-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

//           {/* LEFT CONTENT */}
//           <div>
//             <h1 className="text-4xl font-extrabold leading-tight mb-6">
//               Invest in Your Health.
//               <br />
//               <span className="text-red-600">
//                 Earn a Medal, Build Discipline.
//               </span>
//             </h1>

//             <p className="text-gray-600 mb-6 text-lg">
//               This is not just another online challenge.
//               Valley Run is a commitment — fixed deadlines,
//               real effort, and recognition that lasts forever.
//             </p>

//             <ul className="space-y-3 text-gray-700 mb-8">
//               <li>🏅 Premium Finisher Medal (Home Delivered)</li>
//               <li>📜 Digital Certificate with Your Name</li>
//               <li>🏆 Leaderboard Recognition</li>
//               <li>⏳ Fixed Deadline = Real Discipline</li>
//               <li>📸 Featured in Community Gallery</li>
//               <li>🏆Top performers on the leaderboard will receive exciting gift hampers.</li>
//             </ul>

//             <p className="text-sm text-gray-500 mb-8">
//               💡 You are not paying for a medal.  
//               You are investing in your health, discipline,
//               and a version of yourself that finishes what it starts.
//             </p>

//             <button
//               onClick={() => router.push(`/challenges/${slug}/pricing`)}
//               className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold text-lg"
//             >
//               View Pricing & Join Challenge
//             </button>
//           </div>

//           {/* RIGHT MEDAL CARD */}
//           <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
//             {event.medalImage ? (
//               <img
//                 src={event.medalImage}
//                 alt="Premium Finisher Medal"
//                 className="w-full max-w-sm rounded-xl object-cover"
//               />
//             ) : (
//               <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-xl">
//                 Medal Preview
//               </div>
//             )}

//             <p className="mt-4 text-sm text-gray-500 text-center">
//               Actual Premium Metal Medal (Delivered to Your Home)
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ===== VALUE SECTION ===== */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//           <div>
//             <h2 className="text-3xl font-bold mb-4">
//               More Than Just a Medal.
//               <br />
//               <span className="text-red-600">
//                 A Proof of Discipline.
//               </span>
//             </h2>

//             <p className="text-gray-600 mb-6">
//               Anyone can start. Very few finish.
//               Valley Run is built to help you finish —
//               with accountability, structure, and public recognition.
//             </p>

//             <ul className="space-y-4 text-gray-700">
//               <li>✔ Structured challenge with fixed dates</li>
//               <li>✔ Motivation to stay consistent</li>
//               <li>✔ Name published on website leaderboard</li>
//               <li>✔ Physical reward that lasts a lifetime</li>
//             </ul>
//           </div>

//           <div className="bg-white rounded-3xl shadow-lg p-6">
//             <img
//               src={event.medalImage}
//               alt="Premium Medal Close View"
//               className="rounded-xl w-full object-cover"
//             />
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function ChallengeDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvent(data.event);
      });
  }, [slug]);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="pt-40 text-center text-gray-500">
          Loading challenge details...
        </div>
      </>
    );
  }

  // ─── Status Logic ───────────────────────────────────────────────
  const now = new Date();

  const isRegistrationClosed = event.registrationDeadline
    ? new Date(event.registrationDeadline) < now
    : false;

  const isEventRunning =
    event.startDate && event.endDate
      ? new Date(event.startDate) <= now && new Date(event.endDate) >= now
      : false;
  // ────────────────────────────────────────────────────────────────

  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* STATUS BADGES */}
            <div className="flex gap-3 mb-5 flex-wrap">
              {isEventRunning && (
                <span className="flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse"></span>
                  Event Running
                </span>
              )}
              {isRegistrationClosed && (
                <span className="flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  🔒 Reg. Closed
                </span>
              )}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              Invest in Your Health.
              <br />
              <span className="text-red-600">
                Earn a Medal, Build Discipline.
              </span>
            </h1>

            <p className="text-gray-600 mb-6 text-lg">
              This is not just another online challenge.
              Valley Run is a commitment — fixed deadlines,
              real effort, and recognition that lasts forever.
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li>🏅 Premium Finisher Medal (Home Delivered)</li>
              <li>📜 Digital Certificate with Your Name</li>
              <li>🏆 Leaderboard Recognition</li>
              <li>⏳ Fixed Deadline = Real Discipline</li>
              <li>📸 Featured in Community Gallery</li>
              <li>🏆 Top performers on the leaderboard will receive exciting gift hampers.</li>
            </ul>

            <p className="text-sm text-gray-500 mb-8">
              💡 You are not paying for a medal. You are investing in your health, discipline,
              and a version of yourself that finishes what it starts.
            </p>

            {/* BUTTON — changes based on registration status */}
            {isRegistrationClosed ? (
              <button
                disabled
                className="bg-gray-200 text-gray-400 px-10 py-4 rounded-full font-semibold text-lg cursor-not-allowed w-full max-w-xs"
              >
                Registration Closed
              </button>
            ) : (
              <button
                onClick={() => router.push(`/challenges/${slug}/pricing`)}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                View Pricing & Join Challenge
              </button>
            )}
          </div>

          {/* RIGHT MEDAL CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            {event.medalImage ? (
              <img
                src={event.medalImage}
                alt="Premium Finisher Medal"
                className={`w-full max-w-sm rounded-xl object-cover transition-all duration-300 ${
                  isRegistrationClosed ? "grayscale opacity-60" : ""
                }`}
              />
            ) : (
              <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-xl">
                Medal Preview
              </div>
            )}

            <p className="mt-4 text-sm text-gray-500 text-center">
              Actual Premium Metal Medal (Delivered to Your Home)
            </p>
          </div>

        </div>
      </section>

      {/* ===== VALUE SECTION ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-4">
              More Than Just a Medal.
              <br />
              <span className="text-red-600">
                A Proof of Discipline.
              </span>
            </h2>

            <p className="text-gray-600 mb-6">
              Anyone can start. Very few finish.
              Valley Run is built to help you finish —
              with accountability, structure, and public recognition.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li>✔ Structured challenge with fixed dates</li>
              <li>✔ Motivation to stay consistent</li>
              <li>✔ Name published on website leaderboard</li>
              <li>✔ Physical reward that lasts a lifetime</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <img
              src={event.medalImage}
              alt="Premium Medal Close View"
              className={`rounded-xl w-full object-cover transition-all duration-300 ${
                isRegistrationClosed ? "grayscale opacity-60" : ""
              }`}
            />
          </div>

        </div>
      </section>
    </>
  );
}
