"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 7000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg text-center">
          <h1 className="text-3xl font-extrabold text-green-600 mb-4">
            🎉 Registration Successful!
          </h1>

          <p className="text-gray-700 mb-6">
            Thank you <b>{name || "Runner"}</b> for joining Valley Run.
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Your payment is confirmed.  
            Registration details have been sent to your email.
          </p>

          <button
            onClick={() => router.replace("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold"
          >
            Go to Home
          </button>

          <p className="text-xs text-gray-400 mt-6">
            You will be redirected automatically.
          </p>
        </div>
      </section>
    </>
  );
}
