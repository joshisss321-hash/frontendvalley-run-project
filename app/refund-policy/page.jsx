"use client";

import Navbar from "../components/Navbar";

export default function RefundPolicy() {
  return (
    <main className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          Refund & Cancellation Policy
        </h1>

        <p className="text-center text-gray-500 mb-14">
          Please review our refund terms carefully before registering.
        </p>

        <div className="space-y-10 leading-relaxed text-base">

          <div>
            <h2 className="text-xl font-bold mb-3">
              1. Registration Fees
            </h2>
            <p>
              Once registration is completed for a challenge, the fee is
              generally non-refundable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              2. Event Cancellation
            </h2>
            <p>
              Refunds may be issued only if a challenge is cancelled by Valley
              Run due to unavoidable circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              3. Incorrect Information
            </h2>
            <p>
              Valley Run is not responsible for losses due to incorrect personal
              or payment details provided during registration.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              4. Refund Requests
            </h2>
            <p>
              Any refund request must be made via email with proper details
              within 7 days of registration.
            </p>
            <p className="mt-2 font-semibold">
              📧 valleyrun.official@gmail.com
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}