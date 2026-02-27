"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function LeaderboardPage() {
  const { slug } = useParams();

  const [rows, setRows] = useState(null);
  const [eventId, setEventId] = useState(null);

  // 1️⃣ Get Event ID from slug
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEventId(data.event._id);
        } else {
          setRows([]);
        }
      });
  }, [slug]);

  // 2️⃣ Fetch leaderboard rows
  useEffect(() => {
    if (!eventId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/event/${eventId}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRows(data.rows || []);
        } else {
          setRows([]);
        }
      });
  }, [eventId]);

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Leaderboard
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Discipline decides the ranking.
        </p>

        {rows === null ? (
          <p className="text-center text-gray-500">
            Loading leaderboard...
          </p>
        ) : rows.length === 0 ? (
          <p className="text-center text-gray-500">
            No entries yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Distance</th>
                  <th className="p-3 text-center">Time</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, index) => (
                  <tr
                    key={r._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 font-semibold">
                      #{index + 1}
                    </td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3 text-center">
                      {r.distance}
                    </td>
                    <td className="p-3 text-center">
                      {r.time || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
