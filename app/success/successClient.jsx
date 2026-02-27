"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("event");
  const name = searchParams.get("name");

  const [eventTitle, setEventTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`
        );
        const data = await res.json();

        if (data.success && data.event) {
          setEventTitle(data.event.title); // 🔥 title show hoga
        }
      } catch (err) {
        console.error("Event fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="py-24 px-6 max-w-4xl mx-auto text-center">

        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Registration Successful 🎉
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          Thank you{" "}
          <span className="font-semibold text-black">
            {name || "Champion"}
          </span>{" "}
          for registering in
        </p>

        <h2 className="text-2xl font-bold text-red-600 mb-10">
          {loading ? "Loading Event..." : eventTitle}
        </h2>

        {/* Info Box */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-left space-y-6">
          <h3 className="text-xl font-bold text-gray-800">
            📌 Next Steps
          </h3>

          <ul className="space-y-4 text-gray-700">
            <li>✔ Complete your selected distance before deadline.</li>
            <li>✔ Take a screenshot from your fitness app.</li>
            <li>✔ Submit your screenshot on our website.</li>
            <li>✔ After verification, your medal will be shipped.</li>
          </ul>

          <div className="border-t pt-6 mt-6">
            <p className="text-gray-600">
              🏅 Complete the challenge and send your proof to receive your official medal.
            </p>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold mb-3">
            Best of Luck 💪
          </h3>
          <p className="text-gray-600">
            Stay disciplined. Stay committed. Finish strong.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition hover:scale-105"
          >
            Back to Home
          </Link>
        </div>

      </section>
    </main>
  );
}