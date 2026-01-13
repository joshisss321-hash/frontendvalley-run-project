"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // ❌ No token → login
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchEvents = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success) setEvents(data.events);
    };

    fetchEvents();
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div
            key={e._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">{e.title}</h2>
            <p className="text-gray-600">{e.dates}</p>
            <p className="font-semibold mt-2">₹ {e.price}</p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-4">
              {/* Edit Event */}
              <button
                onClick={() =>
                  router.push(`/admin/events/edit/${e._id}`)
                }
                className="bg-black text-white px-4 py-2 rounded"
              >
                Edit Event
              </button>

              {/* Manage Leaderboard */}
              <button
                onClick={() =>
                  router.push(`/admin/leaderboard/event/${e._id}`)
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Manage Leaderboard
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
