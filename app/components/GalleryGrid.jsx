"use client";

import Image from "next/image";

export default function GalleryGrid() {
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/medalone.jpg",
    "/medaltwo.jpg",
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, i) => (
        <div key={i} className="relative h-40">
          <Image
            src={img}
            alt="Gallery"
            fill
            className="object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
