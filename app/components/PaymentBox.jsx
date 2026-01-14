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

import { useEffect, useRef } from "react";

export default function PaymentBox({ order, eventSlug, form, router }) {
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
      alert("Payment system loading, try again");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
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
                ...response,
                ...form,
                eventSlug,
              }),
            }
          );

          const data = await res.json();

          if (data.success) {
            // 🔒 HARD redirect (NO FAIL)
            window.location.href = `/success?event=${eventSlug}&name=${encodeURIComponent(
              form.name
            )}`;
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          alert("Server error after payment");
        }
      },

      modal: {
        ondismiss: function () {
          // ❌ remove reload – this was killing redirect
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
      className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-semibold"
    >
      Pay Now
    </button>
  );
}
