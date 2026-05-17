
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

//   const isFormValid =
//     form.name &&
//     form.email.includes("@") &&
//     form.phone &&
//     form.phone === form.phone2 &&
//     form.address1 &&
//     form.address2 &&
//     form.landmark &&
//     form.pincode &&
//     form.city &&
//     form.state &&
//     form.category &&
//     form.source;

//   /* ================= CREATE ORDER ================= */
//   const createOrder = async () => {
//     if (!isFormValid || loading) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             amount: Number(eventPrice),
//           }),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setOrder(data.order);
//       } else {
//         alert(data.message || "Order creation failed");
//       }
//     } catch (err) {
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
//             Registration will be considered successful only after payment completion and redirection to the success page. Without confirmation, your entry will not be saved.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* LEFT FORM */}
//           <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl space-y-6">

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
//             <Input name="landmark" placeholder="Landmark *" onChange={handleChange} />
//             <Input name="pincode" placeholder="Pincode *" onChange={handleChange} />
//             <Input name="city" placeholder="City *" onChange={handleChange} />
//             <Input name="state" placeholder="State *" onChange={handleChange} />

//             <div>
//             <label>Select Challenge Category *</label>
//            <select 
//   name="category" 
//   value={form.category}   // ✅ yeh sahi hai
//   onChange={handleChange}
//   className="w-full p-2 rounded bg-slate-300"
// >
//   <option value="">Select Category *</option>

//   <optgroup label="Running">
//     <option>Running 1600mtr</option>
//     <option>Running 3.2Km</option>
//     <option>Running 5Km</option>
//     <option>Running 10Km</option>
//     <option>Running 21Km</option>
//   </optgroup>

//   <optgroup label="Cycling">
//     <option>Cycling 10Km</option>
//     <option>Cycling 25Km</option>
//     <option>Cycling 50Km</option>
//     <option>Cycling 100Km</option>
//   </optgroup>
// </select>
//           </div>


//             <select name="source" onChange={handleChange} className="input">
//               <option value="">How did you find us? *</option>
//               <option>Instagram</option>
//               <option>WhatsApp</option>
//               <option>Friend</option>
//               <option>Other</option>
//             </select>

//             {/* <Input name="coupon" placeholder="Coupon Code (optional)" onChange={handleChange} /> */}
//           </div>

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
//                 onClick={createOrder}
//                 className={`w-full py-4 rounded-full text-white font-semibold text-lg transition
//                 ${isFormValid
//                   ? "bg-red-600 hover:bg-red-700 hover:scale-105"
//                   : "bg-gray-400 cursor-not-allowed"}`}
//               >
//                 {loading ? "Processing..." : `Pay ₹${eventPrice}`}
//               </button>
//             ) : (
//               <PaymentBox
//                 eventSlug={slug}
//                 form={form}
//                 order={order}
//               />
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
  const { slug }  = useParams();
  const router    = useRouter();

  const [order, setOrder]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const [eventPrice, setEventPrice] = useState(349);

  const [form, setForm] = useState({
    name:     "",
    email:    "",
    phone:    "",
    phone2:   "",
    address1: "",
    address2: "",
    landmark: "",
    pincode:  "",
    city:     "",
    state:    "",
    category: "",
    source:   "",
    coupon:   "",
  });

  /* ── Fetch event price ── */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`);
        const data = await res.json();
        if (!data.success) { router.replace("/challenges"); return; }
        if (data.event?.price) setEventPrice(data.event.price);
      } catch {
        router.replace("/challenges");
      }
    };
    fetchEvent();
  }, [slug, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    form.name &&
    form.email.includes("@") &&
    form.phone &&
    form.phone === form.phone2 &&
    form.address1 &&
    form.address2 &&
    form.landmark &&
    form.pincode &&
    form.city &&
    form.state &&
    form.category &&
    form.source;

  /* ── Create Razorpay order ── */
  const createOrder = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
        {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          // ✅ FIX: notes mein poora form data bhejo
          // Webhook yahan se data uthayega agar user back press kare
          body: JSON.stringify({
            amount:    Number(eventPrice),
            eventSlug: slug,
            name:      form.name,
            email:     form.email,
            phone:     form.phone,
            address1:  form.address1,
            address2:  form.address2,
            landmark:  form.landmark,
            city:      form.city,
            state:     form.state,
            pincode:   form.pincode,
            category:  form.category,
            source:    form.source,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert(data.message || "Order creation failed. Try again.");
      }
    } catch {
      alert("Payment initiation failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="py-20 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-3">
            Premium Registration Form
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Step 1: Fill the registration form<br/>
            Step 2: Complete payment to confirm your entry.
            Registration is confirmed only after successful payment.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT — Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl space-y-6">

            <h2 className="text-2xl font-bold">Personal Details</h2>

            <Input name="name"     placeholder="Full Name *"        onChange={handleChange}/>
            <Input name="email"    placeholder="Email *"            onChange={handleChange} type="email"/>
            <Input name="phone"    placeholder="Phone *"            onChange={handleChange} type="tel"/>
            <Input name="phone2"   placeholder="Re-enter Phone *"   onChange={handleChange} type="tel"/>

            {form.phone && form.phone2 && form.phone !== form.phone2 && (
              <p className="text-red-500 text-sm">⚠️ Phone numbers do not match</p>
            )}

            <h2 className="text-2xl font-bold pt-4">Address Details</h2>
            <p className="text-gray-500 text-sm -mt-4">Your medal will be delivered here. Fill carefully.</p>

            <Input name="address1" placeholder="House / Flat No. *"  onChange={handleChange}/>
            <Input name="address2" placeholder="Street / Area *"     onChange={handleChange}/>
            <Input name="landmark" placeholder="Landmark *"          onChange={handleChange}/>
            <Input name="pincode"  placeholder="Pincode *"           onChange={handleChange}/>
            <Input name="city"     placeholder="City *"              onChange={handleChange}/>
            <Input name="state"    placeholder="State *"             onChange={handleChange}/>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Challenge Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
              >
                <option value="">-- Select Category --</option>
                <optgroup label="Running">
                  <option>Running 1600mtr</option>
                  <option>Running 3.2Km</option>
                  <option>Running 5Km</option>
                  <option>Running 10Km</option>
                  <option>Running 21Km</option>
                </optgroup>
                <optgroup label="Cycling">
                  <option>Cycling 10Km</option>
                  <option>Cycling 25Km</option>
                  <option>Cycling 50Km</option>
                  <option>Cycling 100Km</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How did you find us? *
              </label>
              <select name="source" onChange={handleChange} className="input">
                <option value="">-- Select --</option>
                <option>Instagram</option>
                <option>WhatsApp</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div className="bg-white p-10 rounded-3xl shadow-xl h-fit sticky top-28">

            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <ul className="space-y-3 text-gray-700 mb-6">
              <li>✔ Premium Metal Medal</li>
              <li>✔ Digital Certificate</li>
              <li>✔ Free Pan-India Shipping</li>
              <li>✔ Leaderboard Recognition</li>
            </ul>

            <div className="border-t pt-4 flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span className="text-red-600">₹{eventPrice}</span>
            </div>

            {!order ? (
              <>
                <button
                  type="button"
                  disabled={!isFormValid || loading}
                  onClick={createOrder}
                  className={`w-full py-4 rounded-full text-white font-bold text-lg transition-all
                    ${isFormValid
                      ? "bg-red-600 hover:bg-red-700 hover:scale-105"
                      : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  {loading ? "Processing..." : `Pay ₹${eventPrice} →`}
                </button>
                {!isFormValid && (
                  <p className="text-gray-400 text-xs text-center mt-3">
                    Fill all required fields to continue
                  </p>
                )}
              </>
            ) : (
              <PaymentBox eventSlug={slug} form={form} order={order}/>
            )}

            <p className="text-center text-gray-400 text-xs mt-4">
              🔒 100% secure payment via Razorpay
            </p>
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
          font-size: 14px;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }
      `}</style>
    </main>
  );
}

function Input({ name, placeholder, onChange, type = "text" }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="input"
    />
  );
}