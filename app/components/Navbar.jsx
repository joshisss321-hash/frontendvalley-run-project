// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "Challenges", href: "/challenges" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "About", href: "/about" },
//     { name: "Leaderboard", href: "/leaderboard" },
//     { name: "Premium Registration", href: "/premium-registration" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-md">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-extrabold text-red-600">
//           Valley Run
//         </Link>

//         <button
//           className="md:hidden text-gray-700 text-2xl"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>

//         <ul className="hidden md:flex gap-6 text-gray-800 font-semibold">
//           {links.map((l) => (
//             <li key={l.name}>
//               <Link href={l.href} className="hover:text-red-600 transition">
//                 {l.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {open && (
//           <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg px-6 py-4 space-y-2">
//             {links.map((l) => (
//               <li key={l.name}>
//                 <Link href={l.href} className="block text-gray-800 font-semibold">
//                   {l.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </nav>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "Challenges", href: "/challenges" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "About", href: "/about" },
//     { name: "Leaderboard", href: "/leaderboard" },
//     { name: "Premium Registration", href: "/premium-registration" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-extrabold text-red-600">
//           Valley Run
//         </Link>

//         <button
//           className="md:hidden text-gray-700 text-2xl"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>

//         <ul className="hidden md:flex gap-6 text-gray-800 font-semibold">
//           {links.map((l) => (
//             <li key={l.name}>
//               <Link href={l.href} className="hover:text-red-600 transition">
//                 {l.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {open && (
//           <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg px-6 py-4 space-y-2">
//             {links.map((l) => (
//               <li key={l.name}>
//                 <Link
//                   href={l.href}
//                   className="block text-gray-800 font-semibold"
//                   onClick={() => setOpen(false)} // Mobile menu auto-close
//                 >
//                   {l.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // import Image for logo

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Challenges", href: "/challenges" },
    { name: "Gallery", href: "/gallery" },
    { name: "Leaderboard", href:"/leaderboard/republic-day-2026" },
    { name: "About", href: "/about" },
    // { name: "Premium Registration", href: "/premium-registration" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png" // <-- Add your logo in /public folder as logo.png
            alt="Valley Run Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-2xl font-extrabold text-red-600">Valley Run</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-gray-800 font-semibold">
          {links.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                className="hover:text-red-600 transition-colors duration-200"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile dropdown menu */}
        {open && (
          <ul className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg px-6 py-4 space-y-2">
            {links.map((l) => (
              <li key={l.name}>
                <Link
                  href={l.href}
                  className="block text-gray-800 font-semibold py-2 hover:text-red-600 transition-colors duration-200"
                  onClick={() => setOpen(false)} // auto-close mobile menu
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
