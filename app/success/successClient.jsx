"use client";

import Link from "next/link";

export default function SuccessClient() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Registration Successful!
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Your payment has been verified successfully.
      </p>

      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
