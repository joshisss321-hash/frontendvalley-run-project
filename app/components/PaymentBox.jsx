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
// "use client";

// import { useEffect, useState } from "react";

// export default function PaymentBox({ eventSlug, form }) {
//   const [ready, setReady] = useState(false);

//   // load razorpay
//   useEffect(() => {
//     if (window.Razorpay) {
//       setReady(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => setReady(true);
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     if (!ready) {
//       alert("Payment system loading…");
//       return;
//     }

//     // ✅ CREATE ORDER (CORRECT API)
//     const orderRes = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: form.amount }),
//       }
//     );

//     const orderData = await orderRes.json();
//     if (!orderData.success) {
//       alert("Order creation failed");
//       return;
//     }

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: orderData.order.amount,
//       currency: "INR",
//       name: "Valley Run",
//       description: "Event Registration",
//       order_id: orderData.order.id,

//       handler: async (response) => {
//         // ✅ VERIFY PAYMENT (CORRECT API)
//         const verifyRes = await fetch(
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

//         const verifyData = await verifyRes.json();

//         if (verifyData.success) {
//           window.location.href =
//             `/success?event=${eventSlug}&name=${encodeURIComponent(form.name)}`;
//         } else {
//           alert("Payment verification failed");
//         }
//       },

//       theme: { color: "#16a34a" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="w-full bg-green-600 text-white py-4 rounded-full font-semibold"
//     >
//       Pay Now
//     </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function PaymentBox({ eventSlug, form }) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Load Razorpay Script
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

  const handlePayment = async () => {
    if (!ready) {
      alert("Payment system loading…");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      // ✅ CREATE ORDER (IMPORTANT: /api prefix)
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: form.amount }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Valley Run",
        description: "Event Registration",
        order_id: orderData.order.id,

       handler: async function (response) {
  try {
    console.log("Razorpay response:", response);

    if (
      !response.razorpay_order_id ||
      !response.razorpay_payment_id ||
      !response.razorpay_signature
    ) {
      alert("Invalid payment response");
      setLoading(false);
      return;
    }

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
          ...form,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    console.log("Verify Response:", verifyData);

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
