"use client";

import Navbar from "../components/Navbar";


export default function About() {
  return (
    <>
      <Navbar />

      <section className="pt-32 bg-white text-gray-800 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 pb-16">
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-red-600">
            About Valley Run
          </h1>

          {/* Story Section */}
          <div className="space-y-6 text-lg md:text-xl leading-relaxed">
            <p>
              Valley Run is India’s premier virtual running & cycling platform,
              bringing together fitness enthusiasts from all corners of the
              country. Our mission is simple: <strong>motivate, challenge, and
              reward</strong> every individual who dares to move.
            </p>

            <p>
              Since our inception, we’ve hosted hundreds of virtual events,
              allowing participants to run, walk, or cycle at their own pace
              while connecting with a community that shares the same passion
              for fitness and achievement.
            </p>

            <p>
              Our events are more than just challenges—they’re experiences.
              Every participant receives a premium medal, a personalized
              certificate, and a chance to see their name on the leaderboard,
              celebrating their commitment and effort.
            </p>

            <p>
              We believe that fitness should be fun, inclusive, and rewarding.
              Whether you’re a beginner or a seasoned athlete, Valley Run
              provides a platform to achieve your goals while being part of a
              nationwide movement.
            </p>
          </div>
          
        </div>
      </section>

    
    </>
  );
}
