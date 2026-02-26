"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvents(data.events);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section
  className="relative min-h-[80vh] flex items-center"
  style={{
    backgroundImage: "url('/hero.jpg')", // 🔥 put image in /public/hero.jpg
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
    <p className="uppercase tracking-widest text-sm mb-4">
      Virtual Fitness Challenges
    </p>

    <h1 className="text-5xl font-extrabold leading-tight mb-6">
      Discipline Builds <br />
      <span className="text-red-500">Legends.</span>
    </h1>

    <p className="max-w-xl text-lg text-gray-200 mb-8">
      Anyone can start. Very few finish.  
      Valley Run exists for those who choose consistency over comfort.
    </p>

    <div className="flex gap-4">
      <a
        href="/challenges"
        className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-semibold"
      >
        Explore Challenges
      </a>

      <a
        href="/challenges"
        className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
      >
        Start Your Journey
      </a>
    </div>
  </div>
</section>


      {/* ================= WHY JOIN ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Join Valley Run?
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            This is not entertainment.
            This is structure, accountability and proof of effort.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                ⏳ Fixed Deadlines
              </h3>
              <p className="text-gray-600">
                Deadlines create discipline.
                You don’t train “someday” — you train now.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                🏅 Real Rewards
              </h3>
              <p className="text-gray-600">
                Heavy metal medals.
                Not digital badges that disappear.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                🧠 Mental Strength
              </h3>
              <p className="text-gray-600">
                You finish stronger than you started —
                mentally and physically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTIVE CHALLENGES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Active Challenges
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* COVER IMAGE */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-5">
                    {event.dates}
                  </p>

                  <button
                    onClick={() =>
                      router.push(`/challenges/${event.slug}`)
                    }
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
                  >
                    View Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU EARN ================= */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            What You Earn
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto mb-16">
            Proof beats motivation.
            Every finisher earns something tangible.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-gray-50 rounded-3xl p-6 shadow"
              >
                {/* MEDAL IMAGE */}
                <img
                  src={event.medalImage || event.gallery?.[0]}
                  alt="Premium Medal"
                  className="h-64 w-full object-cover rounded-xl mb-4"
                />

                <p className="font-semibold">
                  {event.title} – Finisher Medal
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY GALLERY ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Community Gallery
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {events
              .flatMap(e => e.gallery || [])
              .slice(0, 8)
              .map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Community"
                  className="h-48 w-full object-cover rounded-2xl"
                />
              ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Your Discipline Has a Deadline.
        </h2>

        <p className="text-gray-300 mb-10">
          Join now. Finish strong.
          Earn something that reminds you who you are.
        </p>

        <button
          onClick={() => router.push("/challenges")}
          className="bg-red-600 hover:bg-red-700 px-12 py-5 rounded-full font-semibold shadow-xl"
        >
          Join a Challenge
        </button>
      </section>
    </>
  );
}
