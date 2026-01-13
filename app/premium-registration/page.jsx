"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RegistrationForm from "../components/RegistrationForm";

export default function PremiumRegistrationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId"); // get eventId from query

  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from API
    if (!eventId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(() => alert("Event not found"));
  }, [eventId]);

  if (!event) return <p className="text-white p-10">Loading event...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-10">
      <nav className="text-gray-400 mb-6">Home &gt; Premium Registration</nav>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-red-500">
        Register: {event.title}
      </h1>
      <p className="text-gray-300 mb-6">
        Price: ₹{event.price} | Event starts: {new Date(event.startDate).toDateString()}
      </p>

      {/* Registration Form */}
      <RegistrationForm event={event} router={router} />
    </div>
  );
}
