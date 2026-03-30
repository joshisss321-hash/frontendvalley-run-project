"use client";
import { useState } from "react";

export default function EventForm({ initialData = {}, onSubmit }) {

  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    dates: initialData.dates || "",
    price: initialData.price || "",
    coverImage: initialData.coverImage || "",
    medalImage: initialData.medalImage || ""
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">

      <input placeholder="Title"
        value={form.title}
        onChange={e=>setForm({...form,title:e.target.value})}
        className="border p-2 w-full"/>

      <input placeholder="Slug"
        value={form.slug}
        onChange={e=>setForm({...form,slug:e.target.value})}
        className="border p-2 w-full"/>

      <input placeholder="Dates"
        value={form.dates}
        onChange={e=>setForm({...form,dates:e.target.value})}
        className="border p-2 w-full"/>

      <input placeholder="Price"
        value={form.price}
        onChange={e=>setForm({...form,price:e.target.value})}
        className="border p-2 w-full"/>

      <input placeholder="Cover Image"
        value={form.coverImage}
        onChange={e=>setForm({...form,coverImage:e.target.value})}
        className="border p-2 w-full"/>

      <input placeholder="Medal Image"
        value={form.medalImage}
        onChange={e=>setForm({...form,medalImage:e.target.value})}
        className="border p-2 w-full"/>

      <button
        onClick={()=>onSubmit(form)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  );
}