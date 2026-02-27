
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import Navbar from "../../../components/Navbar";
// import PaymentBox from "../../../components/PaymentBox";

// export default function RegisterPage() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ===============================
//      VALIDATIONS (ONLY REQUIRED)
//   ================================ */

//   const emailValid = form.email.includes("@");
//   const phoneMatch =
//     form.phone && form.phone2 && form.phone === form.phone2;

//   const isFormValid =
//     form.name.trim() &&
//     emailValid &&
//     phoneMatch &&
//     form.address1.trim() &&
//     form.address2.trim() &&
//     form.pincode.trim() &&
//     form.city.trim() &&
//     form.state.trim() &&
//     form.category.trim() &&
//     form.source.trim();

//   /* ===============================
//      CREATE ORDER
//   ================================ */
//   const createOrder = async () => {
//     if (!isFormValid || loading) return;

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: 349, eventSlug: slug }),
//         }
//       );

//       const data = await res.json();
//       setOrder(data.order);
//     } catch {
//       alert("Payment initiation failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <main className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <section className="pt-12 pb-20 max-w-7xl mx-auto px-6">
//         {/* 🔹 FORM HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold mb-2">
//             Premium Registration Form
//           </h1>
//           <p className="text-sm text-gray-600">
//             Step 1: Fill the registration form carefully <br />
//             Step 2: Proceed to payment to confirm your entry
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* FORM */}
//           <form className="lg:col-span-2 bg-white p-8 rounded-3xl shadow space-y-8">
//             <h2 className="text-xl font-bold">Personal Details</h2>

//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Full Name *"
//               />
//               <input
//                 name="email"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Email *"
//               />
//               {!emailValid && form.email && (
//                 <p className="text-red-600 text-xs">
//                   Please enter a valid email address
//                 </p>
//               )}

//               <input
//                 name="phone"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Phone *"
//               />
//               <input
//                 name="phone2"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Re-enter Phone *"
//               />
//               {!phoneMatch && form.phone2 && (
//                 <p className="text-red-600 text-xs md:col-span-2">
//                   Phone numbers do not match
//                 </p>
//               )}
//             </div>

//             <h2 className="text-xl font-bold">Shipping Address</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 name="address1"
//                 onChange={handleChange}
//                 className="input md:col-span-2"
//                 placeholder="Flat / House *"
//               />
//               <input
//                 name="address2"
//                 onChange={handleChange}
//                 className="input md:col-span-2"
//                 placeholder="Area / Street *"
//               />
//               <input
//                 name="landmark"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Landmark (optional)"
//               />
//               <input
//                 name="pincode"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Pincode *"
//               />
//               <input
//                 name="city"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="City *"
//               />
//               <input
//                 name="state"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="State *"
//               />
//             </div>

//             <h2 className="text-xl font-bold">Challenge Category *</h2>
//             <select
//               name="category"
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Select</option>
//               <option>5 Km</option>
//               <option>10 Km</option>
//               <option>21 Km</option>
//               <option>25 Km Cycling</option>
//               <option>50 Km Cycling</option>
//             </select>

//             <h2 className="text-xl font-bold">How did you find us? *</h2>
//             <select
//               name="source"
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Select</option>
//               <option>Instagram</option>
//               <option>WhatsApp</option>
//               <option>Friend</option>
//               <option>other</option>
//             </select>

//             <input
//               name="coupon"
//               onChange={handleChange}
//               className="input"
//               placeholder="Coupon Code (optional)"
//             />
//           </form>

//           {/* ORDER SUMMARY */}
//           <div className="bg-white p-8 rounded-3xl shadow h-fit sticky top-32">
//             <h3 className="text-xl font-bold mb-4">Order Summary</h3>

//             <ul className="text-sm space-y-2 mb-4">
//               <li>✔ Premium Medal</li>
//               <li>✔ Certificate</li>
//               <li>✔ Free Shipping</li>
//             </ul>

//             <div className="border-t pt-3 space-y-2">
//               <div className="flex justify-between">
//                 <span>Base Price</span>
//                 <span>₹499</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span>30%</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>₹349</span>
//               </div>
//             </div>

//             {!order && (
//               <button
//                 disabled={!isFormValid || loading}
//                 onClick={createOrder}
//                 className={`mt-6 w-full py-4 rounded-full text-white font-semibold
//                 ${
//                   isFormValid
//                     ? "bg-red-600 hover:bg-red-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Pay ₹349
//               </button>
//             )}

//             {order && (
//               <PaymentBox
//                 eventSlug={slug}
//                 form={form}
//                 order={order}
//                 router={router}
//               />
//             )}
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 14px;
//           border: 1px solid #d1d5db;
//           border-radius: 12px;
//         }
//       `}</style>
//     </main>
//   );
// }
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

//   // 🔹 event price (ADMIN PANEL से आएगा)
//   const [eventPrice, setEventPrice] = useState(349);

//   // 🔹 FORM STATE
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

//   /* ===============================
//      FETCH EVENT PRICE
//   ================================ */
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`
//         );
//         const data = await res.json();

//         if (data.success && data.event?.price) {
//           setEventPrice(data.event.price);
//         }
//       } catch (err) {
//         console.error("Event fetch error");
//       }
//     };

//     fetchEvent();
//   }, [slug]);

//   /* ===============================
//      FORM HANDLER
//   ================================ */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ===============================
//      VALIDATIONS
//   ================================ */
//   const emailValid = form.email.includes("@");
//   const phoneMatch =
//     form.phone && form.phone2 && form.phone === form.phone2;

//   const isFormValid =
//     form.name.trim() &&
//     emailValid &&
//     phoneMatch &&
//     form.address1.trim() &&
//     form.address2.trim() &&
//     form.pincode.trim() &&
//     form.city.trim() &&
//     form.state.trim() &&
//     form.category.trim() &&
//     form.source.trim();

//   /* ===============================
//      CREATE RAZORPAY ORDER
//   ================================ */
//   const createOrder = async () => {
//     if (!isFormValid || loading) return;

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: eventPrice,
//             eventSlug: slug,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (data.success) {
//         setOrder(data.order);
//       } else {
//         alert("Failed to create order");
//       }
//     } catch (err) {
//       alert("Payment initiation failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <main className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <section className="pt-12 pb-20 max-w-7xl mx-auto px-6">
//         {/* 🔹 HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold mb-2">
//             Premium Registration Form
//           </h1>
//           <p className="text-sm text-gray-600">
//             Step 1: Fill the registration form <br />
//             Step 2: Complete payment to confirm your entry
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* ================= FORM ================= */}
//           <form className="lg:col-span-2 bg-white p-8 rounded-3xl shadow space-y-8">
//             <h2 className="text-xl font-bold">Personal Details</h2>

//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Full Name *"
//               />
//               <input
//                 name="email"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Email *"
//               />
//               {!emailValid && form.email && (
//                 <p className="text-red-600 text-xs">
//                   Please enter a valid email address
//                 </p>
//               )}

//               <input
//                 name="phone"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Phone *"
//               />
//               <input
//                 name="phone2"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Re-enter Phone *"
//               />
//               {!phoneMatch && form.phone2 && (
//                 <p className="text-red-600 text-xs md:col-span-2">
//                   Phone numbers do not match
//                 </p>
//               )}
//             </div>

//             <h2 className="text-xl font-bold">Shipping Address</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 name="address1"
//                 onChange={handleChange}
//                 className="input md:col-span-2"
//                 placeholder="Flat / House *"
//               />
//               <input
//                 name="address2"
//                 onChange={handleChange}
//                 className="input md:col-span-2"
//                 placeholder="Area / Street *"
//               />
//               <input
//                 name="landmark"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Landmark (optional)"
//               />
//               <input
//                 name="pincode"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="Pincode *"
//               />
//               <input
//                 name="city"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="City *"
//               />
//               <input
//                 name="state"
//                 onChange={handleChange}
//                 className="input"
//                 placeholder="State *"
//               />
//             </div>

//             <h2 className="text-xl font-bold">Challenge Category *</h2>
//             <select
//               name="category"
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Select</option>
//               <option>5 Km</option>
//               <option>10 Km</option>
//               <option>21 Km</option>
//               <option>25 Km Cycling</option>
//               <option>50 Km Cycling</option>
//             </select>

//             <h2 className="text-xl font-bold">How did you find us? *</h2>
//             <select
//               name="source"
//               onChange={handleChange}
//               className="input"
//             >
//               <option value="">Select</option>
//               <option>Instagram</option>
//               <option>WhatsApp</option>
//               <option>Friend</option>
//               <option>Other</option>
//             </select>

//             <input
//               name="coupon"
//               onChange={handleChange}
//               className="input"
//               placeholder="Coupon Code (optional)"
//             />
//           </form>

//           {/* ================= ORDER SUMMARY ================= */}
//           <div className="bg-white p-8 rounded-3xl shadow h-fit sticky top-32">
//             <h3 className="text-xl font-bold mb-4">Order Summary</h3>

//             <ul className="text-sm space-y-2 mb-4">
//               <li>✔ Premium Metal Medal</li>
//               <li>✔ Digital Certificate</li>
//               <li>✔ Free Shipping</li>
//             </ul>

//             <div className="border-t pt-3 space-y-2">
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span>₹{eventPrice}</span>
//               </div>
//             </div>

//             {!order && (
//               <button
//                 disabled={!isFormValid || loading}
//                 onClick={createOrder}
//                 className={`mt-6 w-full py-4 rounded-full text-white font-semibold
//                 ${
//                   isFormValid
//                     ? "bg-red-600 hover:bg-red-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Pay ₹{eventPrice}
//               </button>
//             )}

//             {order && (
//               <PaymentBox
//                 eventSlug={slug}
//                 form={form}
//                 order={order}
//                 router={router}
//               />
//             )}
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 14px;
//           border: 1px solid #d1d5db;
//           border-radius: 12px;
//         }
//       `}</style>
//     </main>
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

  const emailValid = form.email.includes("@");
  const phoneMatch =
    form.phone && form.phone2 && form.phone === form.phone2;

  const isFormValid =
    form.name &&
    emailValid &&
    phoneMatch &&
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
          body: JSON.stringify({ amount: eventPrice }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        alert("Failed to create order");
      }
    } catch {
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

          {/* ================= LEFT FORM ================= */}
          <form className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl space-y-6">

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
              <option>Google</option>
            </select>

            <Input name="coupon" placeholder="Coupon Code (optional)" onChange={handleChange} />

          </form>

          {/* ================= RIGHT SUMMARY ================= */}
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
                disabled={!isFormValid || loading}
                onClick={createOrder}
                className={`w-full py-4 rounded-full text-white font-semibold text-lg transition
                ${isFormValid ? "bg-red-600 hover:bg-red-700 hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"}`}
              >
                {loading ? "Processing..." : `Pay ₹${eventPrice}`}
              </button>
            ) : (
              <PaymentBox eventSlug={slug} form={form} order={order} />
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

/* ================= REUSABLE INPUT ================= */
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