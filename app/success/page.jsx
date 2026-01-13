// "use client";
// export const dynamic = "force-dynamic";

// import { useSearchParams } from "next/navigation";
// import Navbar from "../components/Navbar";
// import Link from "next/link";

// export default function SuccessPage() {
//   const searchParams = useSearchParams();

//   const name = searchParams.get("name");
//   const event = searchParams.get("event");

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-white flex items-center justify-center px-6">
//         <div className="max-w-2xl w-full bg-gray-50 rounded-3xl shadow-xl p-10 text-center">
//           {/* SUCCESS ICON */}
//           <div className="text-6xl mb-4">🎉</div>

//           <h1 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-3">
//             Registration Successful!
//           </h1>

//           <p className="text-gray-700 text-lg mb-6">
//             Thank you <span className="font-semibold">{name }</span> for
//             joining the <span className="font-semibold">{event}</span> challenge.
//           </p>

//           <div className="bg-white border rounded-2xl p-6 text-left space-y-3 mb-6">
//             <p>✅ Your payment has been verified successfully.</p>
//             <p>✅ Your registration details are saved in our system.</p>
//             <p>✅ You are now officially part of this challenge.</p>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
//             <p className="font-semibold text-green-700 mb-2">
//               📸 After Completing Your Challenge
//             </p>
//             <p className="text-sm text-gray-700">
//               Please send your activity screenshot (Strava / any fitness app) to:
//             </p>
//             <p className="mt-2 font-semibold">
//               📧 Email: <span className="text-green-700">valleyrun.official@gmail.com</span>
//             </p>
//             <p className="font-semibold">
//               💬 WhatsApp: <span className="text-green-700">+91 70601 48183</span>
//             </p>
//           </div>

//           <p className="text-sm text-gray-500 mb-6">
//             Medal & certificate will be processed after successful verification.
//           </p>

//           <div className="flex gap-4 justify-center flex-wrap">
//             <Link
//               href="/challenges"
//               className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
//             >
//               View More Challenges
//             </Link>

//             <Link
//               href="/"
//               className="border border-gray-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
//             >
//               Go to Home
//             </Link>
//           </div>
//         </div>
//       </main>

    
//     </>
//   );
// }
"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
