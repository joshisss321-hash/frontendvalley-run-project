"use client";

import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-500 mb-14">
          Effective Date: {new Date().getFullYear()}
        </p>

        <div className="space-y-10 leading-relaxed text-base">

          <div>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p>
              When you register for a Valley Run challenge, we may collect
              personal information such as your name, email address, phone
              number, and shipping address.
            </p>
            <p className="mt-2">
              We may also collect activity-related data submitted for challenge
              verification purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used strictly for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Processing registrations</li>
              <li>Sending event updates</li>
              <li>Leaderboard display</li>
              <li>Shipping medals & certificates</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. Data Protection</h2>
            <p>
              We implement reasonable security measures to protect your personal
              data. Valley Run does not sell, rent, or trade your information to
              third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Third-Party Services</h2>
            <p>
              Payments are securely processed via Razorpay. We do not store your
              card or UPI details on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">5. Contact Us</h2>
            <p>
              For any privacy-related concerns, please contact us at:
            </p>
            <p className="mt-2 font-semibold">
              📧 valleyrun.official@gmail.com  
              <br />
              📞 70601 48183
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}