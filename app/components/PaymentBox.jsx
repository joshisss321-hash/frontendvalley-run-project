"use client";

import { useEffect, useRef, useState } from "react";

export default function PaymentBox({ order, eventSlug, form, router }) {
  const rzpRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Load Razorpay script once
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Payment system loading, please try again");
      return;
    }

    if (loading) return; // 🔒 prevent double click
    setLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount, // paise (backend se)
      currency: "INR",
      name: "Valley Run",
      description: "Event Registration",
      order_id: order.id,

      handler: async function (response) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                ...form,
                eventSlug,
              }),
            }
          );

          const data = await res.json();

          if (data.success) {
            // ✅ HARD redirect (fast + reliable)
            window.location.assign(
              `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`
            );
          } else {
            alert("Payment verification failed");
            setLoading(false);
          }
        } catch (err) {
          alert("Server error after payment");
          setLoading(false);
        }
      },

      modal: {
        ondismiss: function () {
          setLoading(false); // user closed popup
        },
      },

      theme: {
        color: "#dc2626",
      },
    };

    rzpRef.current = new window.Razorpay(options);
    rzpRef.current.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`mt-6 w-full py-4 rounded-full font-semibold text-white ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
