"use client";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`${API}/admin/stats`)
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="bg-white p-6 shadow rounded">
            <h3>{k}</h3>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}