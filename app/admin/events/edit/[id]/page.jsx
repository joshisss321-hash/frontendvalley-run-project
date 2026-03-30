"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EventForm from "../../components/EventForm";
import { API } from "@/lib/api";

export default function EditEvent() {

  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`${API}/events`)
      .then(res => res.json())
      .then(d => {
        const event = d.events.find(e => e._id === id);
        setForm(event);
      });
  }, [id]);

  const updateEvent = async (data) => {
    await fetch(`${API}/admin/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Updated");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Event</h1>
      <EventForm initialData={form} onSubmit={updateEvent} />
    </div>
  );
}