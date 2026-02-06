// "use client";

// import Script from "next/script";

// export default function PaymentBox({ eventSlug, form }) {

//   const handlePayment = async () => {
//     // 🔴 Razorpay must exist
//     if (typeof window === "undefined" || !window.Razorpay) {
//       alert("Razorpay not loaded, refresh page");
//       return;
//     }

//     // 1️⃣ Create order
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 349 }),
//       }
//     );

//     const data = await res.json();
//     if (!data.success) {
//       alert("Order failed");
//       return;
//     }

//     // 2️⃣ Razorpay popup
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: data.order.amount,
//       currency: "INR",
//       name: "Valley Run",
//       description: "Event Registration",
//       order_id: data.order.id,

//       handler: async function (response) {
//         const verify = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               ...response,
//               ...form,
//               eventSlug,
//             }),
//           }
//         );

//         const result = await verify.json();

//         if (result.success) {
//           window.location.href = `/success?event=${eventSlug}&name=${encodeURIComponent(
//             form.name
//           )}`;
//         } else {
//           alert("Payment verification failed");
//         }
//       },

//       theme: { color: "#dc2626" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <>
//       {/* 🔥 THIS IS THE FIX */}
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         strategy="afterInteractive"
//       />

//       <button
//         type="button"   // 🚨 VERY IMPORTANT
//         onClick={handlePayment}
//         className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold"
//       >
//         Pay Now ₹349
//       </button>
//     </>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";

export default function PaymentBox({ order, eventSlug, form }) {
  const rzpRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setReady(true);
      document.body.appendChild(script);
    } else {
      setReady(true);
    }
  }, []);

  const handlePayment = async () => {
    if (!ready) {
      alert("Payment system loading… please wait");
      return;
    }

    if (!order?.id || !order?.amount) {
      alert("Order not ready. Please refresh.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Valley Run",
      description: "Event Registration",
      order_id: order.id,

      handler: async (response) => {
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
            window.location.href =
              `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`;
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          alert("Server error after payment");
        }
      },

      modal: {
        ondismiss: () => {
          console.log("Razorpay closed");
        },
      },

      theme: { color: "#16a34a" },
    };

    rzpRef.current = new window.Razorpay(options);
    rzpRef.current.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold"
    >
      Pay Now
    </button>
  );
}
