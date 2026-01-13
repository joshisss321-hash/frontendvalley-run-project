"use client";
import Link from "next/link";

export default function RaceCard({ title, date, image, slug }) {
  return (
    <Link href={`/challenges/${slug}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-red-600">{title}</h3>
          <p className="text-gray-700">{date}</p>
          <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
            View Challenge
          </button>
        </div>
      </div>
    </Link>
  );
}
