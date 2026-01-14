"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessClient() {
  const params = useSearchParams();
  const name = params.get("name") || "Runner";
  const event = params.get("event") || "Valley Run";

  // ❌ reload block
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-700 mb-2">
          Congratulations <b>{name}</b>
        </p>

        <p className="text-gray-600 mb-6">
          You are registered for <b>{event}</b>
        </p>

        <p className="text-sm text-gray-500">
          Confirmation email will reach you shortly 📩
        </p>
      </div>
    </div>
  );
}
