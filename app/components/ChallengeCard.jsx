
// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function ChallengeCard({ title, date, event }) {
//   return (
//     <Link href={`/challenges/${event.slug}`}>
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

//         <div className="relative w-full h-48">
//           <Image
//             src={event.coverImage || "/placeholder.jpg"}
//             alt={title}
//             fill
//             className="object-cover"
//           />
//         </div>

//         <div className="p-6">
//           <h3 className="text-xl font-bold">{title}</h3>
//           <p className="text-gray-600 mb-3">{date}</p>

//           <button className="bg-red-600 text-white px-4 py-2 rounded">
//             View Challenge
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }
import Link from "next/link";

export default function ChallengeCard({ event }) {
  if (!event || !event.slug) return null; // 🔐 safety guard

  return (
    <Link href={`/challenges/${event.slug}`}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">

        {/* COVER IMAGE */}
        <div className="relative w-full h-48 bg-gray-100">
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Cover Image
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-lg font-bold mb-1">
            {event.title}
          </h3>

          <p className="text-sm text-gray-500 mb-4">
            {event.dates}
          </p>

          <span className="inline-block text-red-600 font-semibold text-sm">
            View Challenge →
          </span>
        </div>

      </div>
    </Link>
  );
}
