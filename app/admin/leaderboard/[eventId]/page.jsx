"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/lib/api";

export default function EventLeaderboard() {
  const { eventId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API}/leaderboard/event/${eventId}`)
      .then(res => res.json())
      .then(d => setData(d.rows));
  }, [eventId]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Event Leaderboard</h1>

      {data.map((u, i) => (
        <div key={i} className="bg-white p-3 mb-2 shadow">
          #{i + 1} {u.name} - {u.distance} KM
        </div>
      ))}
    </div>
  );
}