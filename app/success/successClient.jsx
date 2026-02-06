"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const params = useSearchParams();
  const name = params.get("name");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>
        <p className="mt-4">Thank you <b>{name}</b></p>
        <p>You are successfully registered.</p>
      </div>
    </div>
  );
}
