"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const name = searchParams.get("name");
  const event = searchParams.get("event");

  useEffect(() => {
    // ✅ prevent hydration / auto refresh issue
    setMounted(true);

    // ❌ back button se form pe na jaye
    window.history.replaceState(null, "", window.location.href);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-40 text-center text-lg">
        Processing payment...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        <div className="text-green-600 text-6xl mb-4">✔</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        {name && (
          <p className="mt-3 text-gray-600">
            Thank you <b>{name}</b>
          </p>
        )}

        {event && (
          <p className="mt-1 text-gray-600">
            You are registered for <b>{event}</b>
          </p>
        )}

        <p className="mt-4 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
