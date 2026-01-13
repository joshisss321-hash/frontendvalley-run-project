"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvents(data.events);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Events</h1>

      {events.map(e => (
        <div key={e._id} className="mb-4 p-4 border rounded">
          <h2 className="font-semibold">{e.title}</h2>
        </div>
      ))}
    </div>
  );
}
