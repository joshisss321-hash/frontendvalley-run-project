"use client";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function Submissions() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API}/admin/submissions`)
      .then(res => res.json())
      .then(d => setData(d.data));
  }, []);

  const approve = async (id) => {
    await fetch(`${API}/admin/submissions/approve/${id}`, {
      method: "PUT"
    });

    location.reload();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Submissions</h1>

      {data.map(s => (
        <div key={s._id} className="bg-white p-4 mb-3 rounded shadow">
          {s.name} - {s.distance} KM

          <button
            onClick={() => approve(s._id)}
            className="bg-green-500 text-white px-2 ml-3"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}