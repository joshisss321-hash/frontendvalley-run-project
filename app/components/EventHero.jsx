"use client";

import Image from "next/image";

export default function EventHero({ title, subtitle, image }) {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-6">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </div>
  );
}
