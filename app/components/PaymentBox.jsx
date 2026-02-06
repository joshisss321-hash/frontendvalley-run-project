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

import Script from "next/script";

export default function PaymentBox({ eventSlug, form }) {

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Payment system loading, refresh once");
      return;
    }

    // 1️⃣ Create order
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 349 }),
      }
    );

    const data = await res.json();
    if (!data.success) {
      alert("Order failed");
      return;
    }

    // 2️⃣ Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "Valley Run",
      description: "Event Registration",
      order_id: data.order.id,

      handler: async function (response) {
        const verify = await fetch(
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

        const result = await verify.json();

        if (result.success) {
          // 🔥 HARD redirect + state clear
          window.location.replace(
            `/success?event=${eventSlug}&name=${encodeURIComponent(
              form.name
            )}`
          );
        } else {
          alert("Payment verification failed");
        }
      },

      theme: { color: "#dc2626" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <button
        type="button"
        onClick={handlePayment}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold"
      >
        Pay Now ₹349
      </button>
    </>
  );
}
