"use client";

import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    console.log("API:", API);

    fetch(`${API}/admin/stats`)
      .then(res => res.json())
      .then(data => {
        console.log("STATS DATA:", data);
        setStats(data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!stats) return <p className="ml-64 p-6">Loading...</p>;

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Registrations</h2>
          <p className="text-2xl font-bold">{stats.registrations}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Submissions</h2>
          <p className="text-2xl font-bold">{stats.submissions}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-gray-500">Certificates</h2>
          <p className="text-2xl font-bold">{stats.certificates}</p>
        </div>
      </div>
    </div>
  );
}