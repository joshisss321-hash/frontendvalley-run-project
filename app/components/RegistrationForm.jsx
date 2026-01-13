"use client";

import { useState } from "react";
import PaymentBox from "./PaymentBox";

export default function RegistrationForm({ event, router }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    phoneConfirm: "",
    flat: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "India",
    country: "India",
    category: "Running 5Km",
    source: "",
    coupon: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);

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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, eventId: event.id }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (event.price > 0) {
          // create Razorpay order
          const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: event.price * 100, receipt: data.registration.id }),
          });
          const order = await orderRes.json();
          setOrderData(order.order);
          setShowPayment(true);
        } else {
          // Free registration → redirect to profile
          router.push("/profile");
        }
      } else alert("Registration failed");
    } catch (err) {
      alert("Error submitting registration");
    }
  };

  if (submitted && !showPayment) return <p className="text-green-400 font-bold">Registration successful!</p>;

  return (
    <div className="mt-4 bg-gray-800 p-4 rounded space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
          </div>
          <div>
            <label>Re-enter Phone</label>
            <input type="tel" name="phoneConfirm" value={formData.phoneConfirm} onChange={handleChange} required className="w-full p-2 rounded bg-gray-700" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label>Flat/House</label>
          <input type="text" name="flat" value={formData.flat} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        </div>
        <div>
          <label>Area/Street</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        </div>
        <div>
          <label>Landmark</label>
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        </div>
        <div>
          <label>Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        </div>

        {/* Category */}
        <div>
          <label>Select Challenge Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <optgroup label="Running/Walking">
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
          <label>How did you find out?</label>
          <select name="source" value={formData.source} onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
            <option>Instagram</option>
            <option>Facebook</option>
            <option>WhatsApp</option>
            <option>Friend/Family</option>
            <option>Google Search</option>
            <option>Previous Event</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Coupon Code</label>
          <input type="text" name="coupon" value={formData.coupon} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        </div>

        <button type="submit" className="w-full py-2 mt-2 bg-red-600 rounded font-bold hover:scale-105 transition">
          Submit
        </button>
      </form>

      {showPayment && orderData && <PaymentBox event={event} order={orderData} router={router} />}
    </div>
  );
}
