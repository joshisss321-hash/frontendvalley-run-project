
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function EditEventPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     title: "",
//     dates: "",
//     price: "",
//     coverImage: "",
//     medalImage: "",
//     heroImage: "",
//     gallery: [],
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/events/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setForm({
//             ...data.event,
//             gallery: data.event.gallery || [],
//           });
//         }
//       });
//   }, [id]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("adminToken");

//     await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/admin/events/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       }
//     );

//     alert("✅ Event updated successfully");
//     router.push("/admin/dashboard");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-10 space-y-6">
//       <h1 className="text-3xl font-bold">
//         Edit Event
//       </h1>

//       <input
//         className="input"
//         placeholder="Event Title"
//         value={form.title}
//         onChange={e =>
//           setForm({ ...form, title: e.target.value })
//         }
//       />

//       <input
//         className="input"
//         placeholder="Event Dates"
//         value={form.dates}
//         onChange={e =>
//           setForm({ ...form, dates: e.target.value })
//         }
//       />

//       <input
//         className="input"
//         placeholder="Price"
//         value={form.price}
//         onChange={e =>
//           setForm({ ...form, price: e.target.value })
//         }
//       />

//       {/* IMAGE INPUTS */}
//       <input
//         className="input"
//         placeholder="Cover Image URL"
//         value={form.coverImage || ""}
//         onChange={e =>
//           setForm({ ...form, coverImage: e.target.value })
//         }
//       />

//       <input
//         className="input"
//         placeholder="Medal Image URL"
//         value={form.medalImage || ""}
//         onChange={e =>
//           setForm({ ...form, medalImage: e.target.value })
//         }
//       />

//       <input
//         className="input"
//         placeholder="Hero Image URL"
//         value={form.heroImage || ""}
//         onChange={e =>
//           setForm({ ...form, heroImage: e.target.value })
//         }
//       />

//       <textarea
//         className="input h-28"
//         placeholder="Gallery Image URLs (comma separated)"
//         value={form.gallery.join(",")}
//         onChange={e =>
//           setForm({
//             ...form,
//             gallery: e.target.value
//               .split(",")
//               .map(i => i.trim()),
//           })
//         }
//       />

//       <button
//         onClick={handleSave}
//         className="bg-black text-white px-8 py-3 rounded"
//       >
//         Save Changes
//       </button>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 14px;
//           border: 1px solid #ccc;
//           border-radius: 10px;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    dates: "",
    price: "",
    image: "",
    medalImage: "",
    coverImage: "",
    gallery: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setForm({
            title: data.event.title || "",
            slug: data.event.slug || "",
            description: data.event.description || "",
            dates: data.event.dates || "",
            price: data.event.price || "",
            image: data.event.image || "",
            medalImage: data.event.medalImage || "",
            coverImage: data.event.coverImage || "",
            gallery: data.event.gallery || [],
          });
        } else {
          alert("Failed to load event");
        }
        setLoading(false);
      });
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Event updated successfully");
      router.push("/admin/dashboard");
    } else {
      alert("Update failed");
    }
  };

  if (loading) {
    return <div className="p-10">Loading event data...</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>

      <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input className="input" name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" />
      <textarea className="input" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input className="input" name="dates" value={form.dates} onChange={handleChange} placeholder="Dates" />
      <input className="input" name="price" value={form.price} onChange={handleChange} placeholder="Price" />

      <input className="input" name="image" value={form.image} onChange={handleChange} placeholder="Event Cover Image URL" />
      <input className="input" name="medalImage" value={form.medalImage} onChange={handleChange} placeholder="Medal Image URL" />
      <input className="input" name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="Hero Image URL" />

      <input
        className="input"
        placeholder="Gallery images (comma separated)"
        value={form.gallery.join(",")}
        onChange={(e) =>
          setForm({ ...form, gallery: e.target.value.split(",") })
        }
      />

      <button
        onClick={saveChanges}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
