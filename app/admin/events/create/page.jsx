"use client";
import EventForm from "../components/EventForm";
import { API } from "@/lib/api";

export default function CreateEvent() {

  const createEvent = async (form) => {
    await fetch(`${API}/admin/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Event Created");
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Create Event</h1>
      <EventForm onSubmit={createEvent} />
    </div>
  );
}