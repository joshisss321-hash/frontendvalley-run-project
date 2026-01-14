"use client";

import { useEffect, useRef } from "react";

export default function PaymentBox({ order, eventSlug, form }) {
  const rzpRef = useRef(null);

  useEffect(() => {
    if (!window.Razorpay) {
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

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount, // paise
      currency: "INR",
      name: "Valley Run",
      description: "Challenge Registration",
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
            // ✅ FORCE HARD REDIRECT (NO RE-RENDER)
            window.location.replace(
              `/success?event=${eventSlug}&name=${encodeURIComponent(
                form.name
              )}`
            );
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          alert("Server error after payment");
        }
      },

      modal: {
        ondismiss: function () {
          // ❌ DO NOTHING (reload hata diya)
        },
      },

      theme: {
        color: "#16a34a",
      },
    };

    rzpRef.current = new window.Razorpay(options);
    rzpRef.current.open();
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold"
    >
      Pay Now
    </button>
  );
}
