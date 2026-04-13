

// "use client";

// import { useEffect, useState } from "react";

// export default function PaymentBox({ eventSlug, form, order, router }) {
//   const [ready, setReady] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /* ── Load Razorpay script ── */
//   useEffect(() => {
//     if (window.Razorpay) { setReady(true); return; }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => setReady(true);
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     if (!ready) { alert("Payment system loading..."); return; }
//     if (!order) { alert("Order not found"); return; }
//     if (loading) return;

//     try {
//       setLoading(true);

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: "INR",
//         name: "Valley Run",
//         description: `${form.category} Registration`,
//         order_id: order.id,

//         // ✅ Prefill form data in Razorpay modal
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.phone,
//         },

//         handler: async function (response) {
//           try {
//             // ✅ Verify payment + save registration with full form data
//             const verifyRes = await fetch(
//               `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature,
//                   eventSlug,
//                   // ✅ Full form data
//                   name: form.name,
//                   email: form.email,
//                   phone: form.phone,
//                   address1: form.address1,
//                   address2: form.address2,
//                   landmark: form.landmark,
//                   city: form.city,
//                   state: form.state,
//                   pincode: form.pincode,
//                   category: form.category,
//                   source: form.source,
//                 }),
//               }
//             );

//             const verifyData = await verifyRes.json();

//             if (verifyData.success) {
//               window.location.replace(
//                 `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`
//               );
//             } else {
//               alert("Payment verification failed. Please contact support.");
//               setLoading(false);
//             }
//           } catch (err) {
//             console.error("Verification error:", err);
//             alert("Verification error. Please contact support with Payment ID: " + response.razorpay_payment_id);
//             setLoading(false);
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             setLoading(false);
//           },
//         },

//         theme: {
//           color: "#dc2626",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Order summary */}
//       <div className="bg-gray-700 rounded-xl p-4 space-y-2 text-sm">
//         <h3 className="font-bold text-white text-base mb-3">Order Summary</h3>
//         <div className="flex justify-between">
//           <span className="text-gray-400">Name</span>
//           <span className="text-white font-semibold">{form.name}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-400">Category</span>
//           <span className="text-white font-semibold">{form.category}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-400">City</span>
//           <span className="text-white font-semibold">{form.city}</span>
//         </div>
//         <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
//           <span className="text-gray-300 font-bold">Amount</span>
//           <span className="text-green-400 font-bold text-base">
//             ₹{order ? (order.amount / 100).toFixed(0) : "—"}
//           </span>
//         </div>
//       </div>

//       <button
//         onClick={handlePayment}
//         disabled={loading || !ready}
//         className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full font-bold text-base disabled:opacity-60 transition-all hover:scale-105">
//         {loading ? "Processing..." : `Pay ₹${order ? (order.amount / 100).toFixed(0) : ""} →`}
//       </button>

//       <p className="text-center text-gray-400 text-xs">
//         🔒 Secure payment via Razorpay
//       </p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import PaymentBox from "./PaymentBox";

export default function RegistrationForm({ event, router }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phoneConfirm: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    category: "Running 5Km",
    source: "Instagram",
  });

  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone !== formData.phoneConfirm) {
      alert("Phone numbers do not match!");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoadingOrder(true);

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: event.price,
            eventSlug: event.slug,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            category: formData.category,
          }),
        }
      );

      const orderJson = await orderRes.json();

      if (!orderJson.success) {
        alert("Order creation failed. Please try again.");
        setLoadingOrder(false);
        return;
      }

      setOrderData(orderJson.order);
      setShowPayment(true);
      setLoadingOrder(false);

    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Please try again.");
      setLoadingOrder(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-800 p-4 rounded space-y-4">
      {!showPayment ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label>Re-enter Phone *</label>
              <input type="tel" name="phoneConfirm" value={formData.phoneConfirm} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
          </div>

          <div>
            <label>Flat/House No *</label>
            <input type="text" name="address1" value={formData.address1} onChange={handleChange} required
              className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label>Area/Street *</label>
            <input type="text" name="address2" value={formData.address2} onChange={handleChange} required
              className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label>Landmark</label>
            <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label>City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label>State *</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
            <div>
              <label>Pincode *</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required
                className="w-full p-2 rounded bg-gray-700" />
            </div>
          </div>

          <div>
            <label>Select Challenge Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700">
              <optgroup label="Running/Walking">
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
            <label>How did you find us?</label>
            <select name="source" value={formData.source} onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700">
              <option>Instagram</option>
              <option>Facebook</option>
              <option>WhatsApp</option>
              <option>Friend/Family</option>
              <option>Other</option>
            </select>
          </div>

          <button type="submit" disabled={loadingOrder}
            className="w-full py-2 mt-2 bg-red-600 rounded font-bold hover:scale-105 transition disabled:opacity-60">
            {loadingOrder ? "Please wait..." : "Proceed to Payment →"}
          </button>
        </form>
      ) : (
        <PaymentBox
          eventSlug={event.slug}
          form={formData}
          order={orderData}
          router={router}
        />
      )}
    </div>
  );
}