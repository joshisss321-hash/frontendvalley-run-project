"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const router = useRouter();
  const params = useSearchParams();

  const paymentId = params.get("paymentId");

  useEffect(() => {
    if (!paymentId) {
      // direct access hua toh home bhej do
      router.push("/");
    }
  }, [paymentId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for registering with <b>Valley Run</b>.<br />
          Your payment has been received successfully.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
          <p className="font-semibold">Payment ID</p>
          <p className="break-all">{paymentId}</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
