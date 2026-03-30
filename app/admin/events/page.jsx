// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { API } from "@/lib/api";

// export default function Events() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${API}/events`)
//       .then(res => res.json())
//       .then(d => setEvents(d.events));
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl mb-4 font-bold">Events</h1>

//       <Link href="/admin/events/create">
//         <button className="bg-black text-white px-4 py-2 mb-4 rounded">
//           + Create Event
//         </button>
//       </Link>

//       {events.map(e => (
//         <div key={e._id} className="bg-white p-4 mb-3 rounded shadow">
//           <h2 className="font-bold">{e.title}</h2>

//           <img src={e.coverImage} className="w-40 mt-2" />

//           <Link href={`/admin/events/edit/${e._id}`}>
//             <button className="text-blue-500 mt-2">Edit</button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        setEvents(data.events || []);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((e) => (
          <div key={e._id} className="p-4 bg-white shadow mb-3">
            <h2 className="font-bold">{e.title}</h2>
            <p>{e.dates}</p>
          </div>
        ))
      )}
    </div>
  );
}