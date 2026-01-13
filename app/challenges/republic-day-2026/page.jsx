import Link from "next/link";

export default function ChallengeDetails() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">
        Republic Day Virtual Run & Ride 2026 🇮🇳
      </h1>

      <p className="text-gray-600 mb-6">
        Join 500+ runners & cyclists across India. Complete your challenge and earn a premium medal.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">📅 Challenge Dates</h3>
          <p>22Jan – 27 jan 2026</p>

          <h3 className="text-xl font-semibold mt-4 mb-2">🏃 Categories</h3>
          <p>Running/Walking: 5km, 10km, 21km</p>
          <p>Cycling: 10km, 25km, 50km, 100km</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-3">🎖 What You Get</h3>
          <ul className="space-y-2">
            <li>✔ Premium Metal Medal</li>
            <li>✔ Personalized E-Certificate</li>
            <li>✔ Leaderboard Access</li>
            <li>✔ Free Shipping</li>
          </ul>

          <Link
            href="/challenges/republic-day-2026/pricing"
            className="block mt-6 bg-black text-white text-center py-3 rounded-xl font-bold"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
