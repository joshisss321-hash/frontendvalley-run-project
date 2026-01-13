"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ManageLeaderboard() {
  const { eventId } = useParams();
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* ===============================
     FETCH LEADERBOARD
  ================================ */
  const fetchRows = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/event/${eventId}`
    );
    const data = await res.json();
    if (data.success) setRows(data.rows || []);
  };

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchRows();
  }, []);

  /* ===============================
     ADD ROW
  ================================ */
  const addRow = async () => {
    if (!name || !distance) {
      alert("Name & distance required");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/event/${eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, distance, time }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setName("");
      setDistance("");
      setTime("");
      fetchRows();
    } else {
      alert("Failed to add");
    }
  };

  /* ===============================
     DELETE ROW
  ================================ */
  const deleteRow = async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchRows();
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Manage Leaderboard
      </h1>

      {/* ADD FORM */}
      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <input
          className="input"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={addRow}
          className="bg-black text-white rounded px-4"
        >
          Add
        </button>
      </div>

      {/* TABLE */}
      {rows.length === 0 ? (
        <p className="text-gray-500">No entries yet</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Distance</th>
              <th className="p-2">Time</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2 text-center">
                  {r.distance}
                </td>
                <td className="p-2 text-center">
                  {r.time}
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => deleteRow(r._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #d1d5db;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
