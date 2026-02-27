"use client";

import { useEffect, useState } from "react";

export default function PaymentBox({ eventSlug, form, order }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD RAZORPAY SCRIPT ================= */
  useEffect(() => {
    if (window.Razorpay) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, []);

  /* ================= HANDLE PAYMENT ================= */
  const handlePayment = async () => {
    if (!ready) {
      alert("Payment system loading...");
      return;
    }

    if (!order) {
      alert("Order not found");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Valley Run",
        description: "Event Registration",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  eventSlug,
                  ...form,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              window.location.replace(
                `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`
              );
            } else {
              alert("Payment verification failed");
              setLoading(false);
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Verification server error");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold disabled:opacity-60"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}