import Link from "next/link";
import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <Image
        src={event.image || "/event-republic.jpg"}
        alt={event.title}
        width={400}
        height={250}
        className="rounded-t-xl object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{event.excerpt}</p>

        <Link
          href={`/challenges/${event.slug}`}
          className="inline-block mt-4 text-accent font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
