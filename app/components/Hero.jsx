
// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
//       {/* Hero Image */}
//       <Image
//         src="/hero-running.jpg"
//         alt="Valley Run"
//         fill
//         priority
//         className="object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* Text Content */}
//       <div className="absolute z-10 text-center px-6">
//         <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 leading-snug md:leading-tight max-w-3xl mx-auto">
//           Run Anywhere. <br /> Earn Real Medals.
//         </h1>

//         <p className="mt-4 md:mt-6 text-white text-lg md:text-xl max-w-xl mx-auto">
//           Join premium virtual running & cycling challenges across India.
//         </p>

//         <div className="mt-8 flex gap-4 justify-center flex-wrap">
//           {/* Button 1: View Challenges */}
//           <Link
//             href="/challenges"
//             className="bg-red-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-red-700 transition"
//           >
//             View Challenges
//           </Link>

//           {/* Button 2: Premium Registration */}
//           <Link
//             href="/premium-registration"
//             className="border border-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
//           >
//             Register Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero({ challengeSlug = "republic-day-2026" }) {
  // Smooth scroll function
  const scrollToChallenges = (e) => {
    e.preventDefault();
    const section = document.getElementById("challenges");
    if (section) {
      const yOffset = -80; // Navbar height offset
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
      <Image
        src="/hero-running.jpg"
        alt="Valley Run"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="absolute z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 leading-snug md:leading-tight max-w-3xl mx-auto">
          Run Anywhere. <br /> Earn Real Medals.
        </h1>

        <p className="mt-4 md:mt-6 text-white text-lg md:text-xl max-w-xl mx-auto">
          Join premium virtual running & cycling challenges across India.
        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          {/* View Challenges Button */}
          <button
            onClick={scrollToChallenges}
            className="bg-red-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-red-700 transition"
          >
            View Challenges
          </button>

          {/* Register Now Button → Dynamic Challenge Pricing Page */}
          <Link
            href={`/challenges/${challengeSlug}/pricing`}
            className="border border-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
