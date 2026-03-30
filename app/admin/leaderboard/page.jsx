"use client";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import Link from "next/link";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API}/leaderboard`)
      .then(res => res.json())
      .then(d => setData(d.rows));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Leaderboard</h1>

      {data.map((u, i) => (
        <div key={i} className="bg-white p-3 mb-2 shadow">
          {u.name} - {u.distance} KM
        </div>
      ))}
    </div>
  );
}