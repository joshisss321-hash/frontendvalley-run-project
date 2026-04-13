

"use client";

import { useEffect, useState } from "react";

export default function PaymentBox({ eventSlug, form, order, router }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Load Razorpay script ── */
  useEffect(() => {
    if (window.Razorpay) { setReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!ready) { alert("Payment system loading..."); return; }
    if (!order) { alert("Order not found"); return; }
    if (loading) return;

    try {
      setLoading(true);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Valley Run",
        description: `${form.category} Registration`,
        order_id: order.id,

        // ✅ Prefill form data in Razorpay modal
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        handler: async function (response) {
          try {
            // ✅ Verify payment + save registration with full form data
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  eventSlug,
                  // ✅ Full form data
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  address1: form.address1,
                  address2: form.address2,
                  landmark: form.landmark,
                  city: form.city,
                  state: form.state,
                  pincode: form.pincode,
                  category: form.category,
                  source: form.source,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              window.location.replace(
                `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`
              );
            } else {
              alert("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Verification error. Please contact support with Payment ID: " + response.razorpay_payment_id);
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#dc2626",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Order summary */}
      <div className="bg-gray-700 rounded-xl p-4 space-y-2 text-sm">
        <h3 className="font-bold text-white text-base mb-3">Order Summary</h3>
        <div className="flex justify-between">
          <span className="text-gray-400">Name</span>
          <span className="text-white font-semibold">{form.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Category</span>
          <span className="text-white font-semibold">{form.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">City</span>
          <span className="text-white font-semibold">{form.city}</span>
        </div>
        <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
          <span className="text-gray-300 font-bold">Amount</span>
          <span className="text-green-400 font-bold text-base">
            ₹{order ? (order.amount / 100).toFixed(0) : "—"}
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || !ready}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full font-bold text-base disabled:opacity-60 transition-all hover:scale-105">
        {loading ? "Processing..." : `Pay ₹${order ? (order.amount / 100).toFixed(0) : ""} →`}
      </button>

      <p className="text-center text-gray-400 text-xs">
        🔒 Secure payment via Razorpay
      </p>
    </div>
  );
}
