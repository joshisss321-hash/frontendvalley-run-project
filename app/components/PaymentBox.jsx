// "use client";

// import { useEffect, useState } from "react";

// export default function PaymentBox({ order, eventSlug, form, router }) {
//   const [razorpayReady, setRazorpayReady] = useState(false);

//   /* ===============================
//      LOAD RAZORPAY SCRIPT SAFELY
//   ================================ */
//   useEffect(() => {
//     if (window.Razorpay) {
//       setRazorpayReady(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;

//     script.onload = () => {
//       setRazorpayReady(true);
//     };

//     script.onerror = () => {
//       alert("Razorpay SDK failed to load. Please refresh.");
//     };

//     document.body.appendChild(script);
//   }, []);

//   /* ===============================
//      HANDLE PAYMENT
//   ================================ */
//   const handlePayment = () => {
//     if (!razorpayReady) {
//       alert("Payment system is still loading. Please wait...");
//       return;
//     }

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: "INR",
//       name: "Valley Run",
//       description: "Event Registration",
//       order_id: order.id,

//       handler: async function (response) {
//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 ...response,
//                 ...form,
//                 eventSlug,
//               }),
//             }
//           );

//           const data = await res.json();

//           if (data&&data.success===true) {
//             router.push(
//               `/success?event=${eventSlug}&name=${encodeURIComponent(
//                 form.name
//               )}`
//             );
//           } else {
//             alert("Payment verification failed");
//             window.location.reload();
//           }
//         } catch (err) {
//           alert("Server error after payment");
//           window.location.reload();
//         }
//       },

//       modal: {
//         ondismiss: function () {
//           window.location.reload();
//         },
//       },

//       theme: {
//         color: "#dc2626",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   /* ===============================
//      UI
//   ================================ */
//   return (
//     <button
//       onClick={handlePayment}
//       disabled={!razorpayReady}
//       className={`mt-6 w-full py-4 rounded-full font-semibold text-white
//         ${
//           razorpayReady
//             ? "bg-green-600 hover:bg-green-700"
//             : "bg-gray-400 cursor-not-allowed"
//         }`}
//     >
//       {razorpayReady ? "Pay Now" : "Loading Payment..."}
//     </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function PaymentBox({ order, eventSlug, form, router }) {
  const [ready, setReady] = useState(false);

  // ✅ Load Razorpay script safely
  useEffect(() => {
    if (window.Razorpay) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setReady(true);
    };

    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!ready) {
      alert("Payment system loading, please wait...");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      // ⚠️ amount ALREADY in paise from backend
      amount: order.amount,
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
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                ...form,
                eventSlug,
              }),
            }
          );

          const data = await res.json();

          if (data.success) {
            // ✅ NO reload, NO double redirect
            router.replace(
              `/success?event=${eventSlug}&name=${encodeURIComponent(
                form.name
              )}`
            );
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          alert("Payment completed but verification failed");
        }
      },

      modal: {
        // ❌ NO reload on dismiss
        ondismiss: function () {
          console.log("Payment popup closed by user");
        },
      },

      theme: {
        color: "#dc2626",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      disabled={!ready}
      onClick={handlePayment}
      className={`mt-6 w-full py-4 rounded-full font-semibold text-white transition
        ${ready ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}
      `}
    >
      {ready ? "Pay Now" : "Loading Payment..."}
    </button>
  );
}
