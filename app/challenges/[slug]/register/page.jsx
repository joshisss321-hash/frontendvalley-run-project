// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import Navbar from "../../../components/Navbar";
// import PaymentBox from "../../../components/PaymentBox";

// export default function RegisterPage() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [eventPrice, setEventPrice] = useState(349);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     phone2: "",
//     address1: "",
//     address2: "",
//     landmark: "",
//     pincode: "",
//     city: "",
//     state: "",
//     category: "",
//     source: "",
//     coupon: "",
//   });

//   /* ================= FETCH EVENT ================= */
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`
//         );
//         const data = await res.json();

//         if (!data.success) {
//           router.replace("/challenges");
//           return;
//         }

//         if (data.event?.price) {
//           setEventPrice(data.event.price);
//         }
//       } catch {
//         router.replace("/challenges");
//       }
//     };

//     fetchEvent();
//   }, [slug, router]);

//   /* ================= FORM HANDLER ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const emailValid = form.email.includes("@");
//   const phoneMatch =
//     form.phone && form.phone2 && form.phone === form.phone2;

//   const isFormValid =
//     form.name &&
//     emailValid &&
//     phoneMatch &&
//     form.address1 &&
//     form.address2 &&
//     form.pincode &&
//     form.city &&
//     form.state &&
//     form.category &&
//     form.source;

//   /* ================= CREATE ORDER ================= */
//   const createOrder = async (e) => {
//     if (e) e.preventDefault(); // 🔥 prevent form auto submit
//      console.log("EVENT PRICE:", eventPrice);
//     if (!isFormValid || loading) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: Number(eventPrice), // 🔥 force number
//           }),
//         }
//       );

//       const data = await res.json();
//       console.log("CREATE ORDER RESPONSE:", data);

//       if (data.success) {
//         setOrder(data.order);
//       } else {
//         alert(data.message || "Order creation failed");
//       }
//     } catch (err) {
//       console.error("ORDER ERROR:", err);
//       alert("Payment initiation failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <main className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <section className="py-20 px-6 max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-14">
//           <h1 className="text-4xl font-extrabold mb-3">
//             Premium Registration Form
//           </h1>
//           <p className="text-gray-600">
//             Step 1: Fill the registration form <br />
//             Step 2: Complete payment to confirm your entry
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* LEFT FORM */}
//           <form
//             onSubmit={(e) => e.preventDefault()}  // 🔥 important
//             className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl space-y-6"
//           >
//             <h2 className="text-2xl font-bold mb-4">
//               Personal Details
//             </h2>

//             <Input name="name" placeholder="Full Name *" onChange={handleChange} />
//             <Input name="email" placeholder="Email *" onChange={handleChange} />
//             <Input name="phone" placeholder="Phone *" onChange={handleChange} />
//             <Input name="phone2" placeholder="Re-enter Phone *" onChange={handleChange} />

//             <h2 className="text-2xl font-bold pt-6">
//               Address Details
//             </h2>

//             <Input name="address1" placeholder="House / Flat *" onChange={handleChange} />
//             <Input name="address2" placeholder="Street / Area *" onChange={handleChange} />
//             <Input name="landmark" placeholder="Landmark" onChange={handleChange} />
//             <Input name="pincode" placeholder="Pincode *" onChange={handleChange} />
//             <Input name="city" placeholder="City *" onChange={handleChange} />
//             <Input name="state" placeholder="State *" onChange={handleChange} />

//             <h2 className="text-2xl font-bold pt-6">
//               Challenge Details
//             </h2>

//             <select name="category" onChange={handleChange} className="input">
//               <option value="">Select Category *</option>
//               <option>5 Km</option>
//               <option>10 Km</option>
//               <option>21 Km</option>
//             </select>

//             <select name="source" onChange={handleChange} className="input">
//               <option value="">How did you find us? *</option>
//               <option>Instagram</option>
//               <option>WhatsApp</option>
//               <option>Friend</option>
//               <option>Other</option>
//             </select>

//             <Input name="coupon" placeholder="Coupon Code (optional)" onChange={handleChange} />
//           </form>

//           {/* RIGHT SUMMARY */}
//           <div className="bg-white p-10 rounded-3xl shadow-xl h-fit sticky top-28">
//             <h2 className="text-2xl font-bold mb-6">
//               Order Summary
//             </h2>

//             <ul className="space-y-3 text-gray-700 mb-6">
//               <li>✔ Premium Metal Medal</li>
//               <li>✔ Digital Certificate</li>
//               <li>✔ Free Shipping</li>
//             </ul>

//             <div className="border-t pt-4 flex justify-between font-semibold text-lg mb-6">
//               <span>Total</span>
//               <span>₹{eventPrice}</span>
//             </div>

//             {!order ? (
//               <button
//                 type="button"
//                 disabled={!isFormValid || loading}
//                 onClick={(e) => createOrder(e)}
//                 className={`w-full py-4 rounded-full text-white font-semibold text-lg transition
//                 ${isFormValid
//                   ? "bg-red-600 hover:bg-red-700 hover:scale-105"
//                   : "bg-gray-400 cursor-not-allowed"}`}
//               >
//                 {loading ? "Processing..." : `Pay ₹${eventPrice}`}
//               </button>
//             ) : (
//               <PaymentBox eventSlug={slug} form={form} order={order} />
//             )}
//           </div>

//         </div>
//       </section>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 14px;
//           border: 1px solid #e5e7eb;
//           border-radius: 14px;
//           outline: none;
//           transition: 0.3s;
//         }
//         .input:focus {
//           border-color: #dc2626;
//           box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
//         }
//       `}</style>
//     </main>
//   );
// }

// /* REUSABLE INPUT */
// function Input({ name, placeholder, onChange }) {
//   return (
//     <input
//       name={name}
//       placeholder={placeholder}
//       onChange={onChange}
//       className="input"
//     />
//   );
// }
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import PaymentBox from "../../../components/PaymentBox";

export default function RegisterPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventPrice, setEventPrice] = useState(349);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    category: "",
    source: "",
    coupon: "",
  });

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`
        );
        const data = await res.json();

        if (!data.success) {
          router.replace("/challenges");
          return;
        }

        if (data.event?.price) {
          setEventPrice(data.event.price);
        }
      } catch {
        router.replace("/challenges");
      }
    };

    fetchEvent();
  }, [slug, router]);

  /* ================= FORM HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.name &&
    form.email.includes("@") &&
    form.phone &&
    form.phone === form.phone2 &&
    form.address1 &&
    form.address2 &&
    form.pincode &&
    form.city &&
    form.state &&
    form.category &&
    form.source;

  /* ================= CREATE ORDER ================= */
  const createOrder = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Number(eventPrice),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert(data.message || "Order creation failed");
      }
    } catch (err) {
      alert("Payment initiation failed");
    }

    setLoading(false);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="py-20 px-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-3">
            Premium Registration Form
          </h1>
          <p className="text-gray-600">
            Step 1: Fill the registration form <br />
            Step 2: Complete payment to confirm your entry
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT FORM */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl space-y-6">

            <h2 className="text-2xl font-bold mb-4">
              Personal Details
            </h2>

            <Input name="name" placeholder="Full Name *" onChange={handleChange} />
            <Input name="email" placeholder="Email *" onChange={handleChange} />
            <Input name="phone" placeholder="Phone *" onChange={handleChange} />
            <Input name="phone2" placeholder="Re-enter Phone *" onChange={handleChange} />

            <h2 className="text-2xl font-bold pt-6">
              Address Details
            </h2>

            <Input name="address1" placeholder="House / Flat *" onChange={handleChange} />
            <Input name="address2" placeholder="Street / Area *" onChange={handleChange} />
            <Input name="landmark" placeholder="Landmark" onChange={handleChange} />
            <Input name="pincode" placeholder="Pincode *" onChange={handleChange} />
            <Input name="city" placeholder="City *" onChange={handleChange} />
            <Input name="state" placeholder="State *" onChange={handleChange} />

            <h2 className="text-2xl font-bold pt-6">
              Challenge Details
            </h2>

            <select name="category" onChange={handleChange} className="input">
              <option value="">Select Category *</option>
              <option>5 Km</option>
              <option>10 Km</option>
              <option>21 Km</option>
            </select>

            <select name="source" onChange={handleChange} className="input">
              <option value="">How did you find us? *</option>
              <option>Instagram</option>
              <option>WhatsApp</option>
              <option>Friend</option>
              <option>Other</option>
            </select>

            <Input name="coupon" placeholder="Coupon Code (optional)" onChange={handleChange} />
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-white p-10 rounded-3xl shadow-xl h-fit sticky top-28">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <ul className="space-y-3 text-gray-700 mb-6">
              <li>✔ Premium Metal Medal</li>
              <li>✔ Digital Certificate</li>
              <li>✔ Free Shipping</li>
            </ul>

            <div className="border-t pt-4 flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{eventPrice}</span>
            </div>

            {!order ? (
              <button
                type="button"
                disabled={!isFormValid || loading}
                onClick={createOrder}
                className={`w-full py-4 rounded-full text-white font-semibold text-lg transition
                ${isFormValid
                  ? "bg-red-600 hover:bg-red-700 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"}`}
              >
                {loading ? "Processing..." : `Pay ₹${eventPrice}`}
              </button>
            ) : (
              <PaymentBox
                eventSlug={slug}
                form={form}
                order={order}
              />
            )}

          </div>

        </div>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          outline: none;
          transition: 0.3s;
        }
        .input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }
      `}</style>
    </main>
  );
}

/* REUSABLE INPUT */
function Input({ name, placeholder, onChange }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="input"
    />
  );
}