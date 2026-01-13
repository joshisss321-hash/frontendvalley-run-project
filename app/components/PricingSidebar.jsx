"use client";

import { useState } from "react";
import RegistrationForm from "./RegistrationForm";

export default function PricingSidebar({ event }) {
  const [showForm, setShowForm] = useState(false);

  const savings = event.originalPrice ? event.originalPrice - event.price : 0;

  return (
    <aside className="sticky top-20 bg-neutral-900 p-6 rounded-lg shadow-lg text-white space-y-4">
      <h3 className="text-2xl font-bold">Pricing</h3>
      <p className="text-xl">
        ₹{event.price}{" "}
        {event.originalPrice && (
          <span className="line-through text-gray-400 ml-2">
            ₹{event.originalPrice}
          </span>
        )}
      </p>
      {savings > 0 && <p className="text-green-400">Save ₹{savings}</p>}
      <ul className="list-disc ml-5 text-gray-300">
        <li>Premium Medal</li>
        <li>Certificate of Completion</li>
        <li>Access to Leaderboard</li>
      </ul>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 w-full bg-red-600 py-2 rounded font-semibold hover:scale-105 transition"
      >
        Get My Medal
      </button>

      {showForm && <RegistrationForm event={event} />}
    </aside>
  );
}
