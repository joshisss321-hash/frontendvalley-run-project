"use client";

import { useEffect, useState } from "react";
import { medalAPI } from "@/lib/medalApi";

/* Razorpay ka modal kholna.

   ⚠️ `components/PaymentBox.jsx` seedha use nahi kiya — wo LIVE
   registration ka hissa hai aur roz chalta hai. Usme ek line
   badalne ka matlab hota registrations ko khatre mein daalna.
   Isliye wahi tareeka, par apni file.

   Ek cheez PaymentBox se alag hai: yahan `ondismiss` par server ko
   batana zaroori hai. Checkout ne medal rok rakha hai; user agar
   window band kar de aur hum chup rahein, to wo medal 20 minute
   tak kisi aur ko nahi milega. */

export default function MedalPay({ order, orderNo, buyer, onDone, onFail }) {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (window.Razorpay) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload  = () => setReady(true);
    s.onerror = () => onFail?.("Could not load the payment window. Please check your connection.");
    document.body.appendChild(s);
  }, []);

  const pay = () => {
    if (!ready || busy) return;
    setBusy(true);

    const rzp = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Valley Run",
      description: `Medal order ${orderNo}`,
      order_id: order.id,

      prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
      theme: { color: "#dc2626" },

      handler: async (response) => {
        try {
          const r = await medalAPI.verify({
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
          });

          if (r?.success) { onDone(r.orderNo, buyer.email); return; }

          /* Paisa kat chuka hai par verify nahi hua. Yahan ghabrane
             ki baat nahi — webhook isi payment ko pakad lega. User
             ko payment id dena zaroori hai taaki wo support se baat
             kar sake. */
          onFail?.(
            "Your payment went through but we could not confirm it instantly. " +
            `It will be confirmed shortly. Payment ID: ${response.razorpay_payment_id}`
          );
        } catch {
          onFail?.(`Payment ID: ${response.razorpay_payment_id} — please contact us if your order does not appear.`);
        }
        setBusy(false);
      },

      modal: {
        ondismiss: () => {
          setBusy(false);
          /* Rok turant hatao — warna ye medal bina wajah atka rahega */
          medalAPI.cancel(order.id).catch(() => {});
          onFail?.("");
        },
      },
    });

    rzp.on?.("payment.failed", () => {
      medalAPI.cancel(order.id).catch(() => {});
      onFail?.("The payment did not go through. Nothing has been charged — please try again.");
      setBusy(false);
    });

    rzp.open();
  };

  return (
    <button onClick={pay} disabled={!ready || busy} className="ms-btn" style={{ width: "100%" }}>
      {!ready ? "Loading payment…" : busy ? "Opening…" : "Pay securely"}
    </button>
  );
}
