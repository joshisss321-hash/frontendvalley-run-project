// "use client";
// import Link from "next/link";

// export default function Pricing({ params }) {
//   return (
//     <section className="max-w-4xl mx-auto px-6 py-16">
//       <h1 className="text-4xl font-bold mb-12 text-center">
//         Choose Your Pass
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="border p-8 rounded-xl">
//           <h2 className="text-2xl font-bold mb-4">Free Pass</h2>
//           <p>No medal, digital certificate</p>
//         </div>

//         <div className="border-2 border-red-600 p-8 rounded-xl">
//           <h2 className="text-2xl font-bold mb-4">
//             Premium Pass – ₹399
//           </h2>

//           <ul className="mb-6 space-y-2">
//             <li>🏅 Premium Medal</li>
//             <li>📜 Certificate</li>
//             <li>🚚 Free Shipping</li>
//           </ul>

//           <Link
//             href={`/register/${params.slug}`}
//             className="bg-red-600 text-white px-6 py-3 rounded-full"
//           >
//             Get My Medal
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "../../../components/Navbar";


// export default function PricingPage() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`
//       );
//       const data = await res.json();
//       if (data.success) setEvent(data.event);
//     };

//     fetchEvent();
//   }, [slug]);

//   if (!event) {
//     return (
//       <>
//         <Navbar />
//         <div className="pt-40 text-center">Loading...</div>
//       </>
//     );
//   }

//   return (
//     <main className="bg-white min-h-screen">
//       <Navbar />

//       <section className="pt-32 pb-20 max-w-6xl mx-auto px-6">
//         {/* HEADER */}
//         <div className="text-center mb-16">
//           <p className="text-sm font-semibold text-red-600 mb-2">
//             Limited Time Early Bird Pricing
//           </p>

//           <h1 className="text-4xl font-extrabold mb-4">
//             Choose Your Package
//           </h1>

//           <p className="text-gray-600 max-w-xl mx-auto">
//             Complete the challenge your way. Upgrade to Premium for the ultimate experience.
//           </p>

//           <div className="mt-4 text-sm text-gray-500">
//             <strong>895+</strong> Registered • <strong>62</strong> people viewing now
//           </div>
//         </div>

//         {/* PRICING CARDS */}
//         <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//           {/* PREMIUM */}
//           <div className="border-2 border-red-600 rounded-3xl p-8 shadow-xl relative">
//             <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
//               🏆 Most Popular
//             </span>

//             <h2 className="text-2xl font-bold text-center mb-2">
//               Premium Pass
//             </h2>
//             <p className="text-center text-gray-600 mb-6">
//               Complete Experience
//             </p>

//             <div className="text-center mb-6">
//               <p className="text-sm text-green-600 font-semibold mb-1">
//                 Early Bird Price
//               </p>

//               <span className="text-4xl font-extrabold text-red-600">
//                 ₹{event.price}
//               </span>
//               <span className="text-gray-500 ml-2 line-through">
//                 ₹{event.mrp || event.price + 100}
//               </span>

//               <p className="text-xs text-gray-500 mt-1">
                
//               </p>
//             </div>

//             <ul className="space-y-3 text-gray-700 mb-8">
//               <li>✔ 3 Inch Premium Metal Medal</li>
//               <li>✔ Digital E-Certificate</li>
//               <li>✔ Name on Finishers List</li>
//               <li>✔ Customized Poster</li>
//               <li>✔ Free Shipping</li>
//             </ul>

//             <button
//               onClick={() => router.push(`/challenges/${slug}/register`)}
//               className="w-full bg-red-600 text-white py-4 rounded-full font-semibold hover:bg-red-700 transition"
//             >
//               Get My Medal – ₹{event.price}
//             </button>
//           </div>

//           {/* FREE */}
//           <div className="border rounded-3xl p-8 shadow-sm">
//             <h2 className="text-2xl font-bold text-center mb-2">
//               Free Pass
//             </h2>

//             <p className="text-center text-gray-600 mb-6">
//               Basic Experience
//             </p>

//             <div className="text-center mb-6">
//               <span className="text-4xl font-extrabold">₹0</span>
//               <p className="text-sm text-gray-500">Free Forever</p>
//             </div>

//             <ul className="space-y-3 text-gray-500 mb-8">
//               <li>❌ Premium Medal</li>
//               <li>❌ Finishers List</li>
//               <li>❌ Certificate</li>
//               <li>✔ Activity Participation</li>
//             </ul>

//             <button className="w-full border py-4 rounded-full font-semibold text-gray-600 cursor-not-allowed">
//               Continue with Free
//             </button>
//           </div>
//         </div>
//       </section>

      
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function PricingPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`)
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
          Loading pricing...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-3">
            Limited Time Early Bird Pricing
          </h1>
          <p className="text-gray-600">
            Complete the challenge your way. Upgrade to Premium for the ultimate experience.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* PREMIUM */}
          <div className="border-2 border-red-600 rounded-3xl p-8 shadow-xl relative bg-white">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
              🏆 Most Popular
            </span>

            <h2 className="text-2xl font-bold text-center mb-2">
              Premium Pass
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Complete Experience
            </p>

            <div className="text-center mb-6">
              <span className="text-4xl font-extrabold text-red-600">
                ₹{event.price}
              </span>
              <span className="text-gray-400 ml-2 line-through">
                ₹{event.price + 100}
              </span>
              <p className="text-green-600 text-sm font-semibold mt-1">
                Early Bird Offer
              </p>
            </div>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li>✔ 3-inch Premium Metal Medal</li>
              <li>✔ Digital E-Certificate</li>
              <li>✔ Name on Finishers List</li>
              <li>✔ Community Gallery Feature</li>
              <li>✔ Free Shipping (India)</li>
            </ul>

            <button
              onClick={() => router.push(`/challenges/${slug}/register`)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full font-semibold text-lg"
            >
              Get My Medal
            </button>
          </div>

          {/* FREE */}
          <div className="border rounded-3xl p-8 shadow bg-white">
            <h2 className="text-2xl font-bold text-center mb-2">
              Free Pass
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Basic Experience
            </p>

            <div className="text-center mb-6">
              <span className="text-4xl font-extrabold">₹0</span>
            </div>

            <ul className="space-y-3 text-gray-500 mb-8">
              <li>❌ Premium Medal</li>
              <li>✔ Activity Participation</li>
              <li>❌ Finishers List</li>
              <li>❌ Certificate</li>
            </ul>

            <button
              disabled
              className="w-full border border-gray-400 py-4 rounded-full font-semibold text-gray-400 cursor-not-allowed"
            >
              Continue with Free
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
