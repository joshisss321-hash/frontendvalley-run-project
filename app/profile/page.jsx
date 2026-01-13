"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events`) // your backend endpoint to get user's joined events
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => alert("Failed to load your events"));
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-10 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>
      {events.length === 0 ? (
        <p>You have not joined any events yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((e) => (
            <li key={e.id} className="p-4 bg-gray-800 rounded">
              <h2 className="font-bold text-xl">{e.title}</h2>
              <p>Category: {e.category}</p>
              <p>Price Paid: ₹{e.price}</p>
              <p>Start Date: {new Date(e.startDate).toDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
  