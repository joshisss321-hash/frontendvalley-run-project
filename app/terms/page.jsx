"use client";

import Navbar from "../components/Navbar";


export default function TermsPage() {
  return (
    <main className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        {/* PAGE TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-center text-gray-500 mb-14">
          Please read these terms carefully before participating in any Valley Run challenge.
        </p>

        {/* CONTENT */}
        <div className="space-y-10 text-base leading-relaxed">

          <div>
            <h2 className="text-xl font-bold mb-3">
              1. Registration & Eligibility
            </h2>
            <p>
              All participants must register using accurate and complete personal
              details. Valley Run reserves the right to disqualify entries with
              incorrect or misleading information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              2. Challenge Duration & Completion
            </h2>
            <p>
              Each challenge must be completed within the officially announced
              challenge dates. Activities completed outside the specified period
              will not be considered valid.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              3. Activity Tracking & Proof
            </h2>
            <p>
              Participants must track their activity using a reliable fitness
              tracking application or device such as Strava, Nike Run Club,
              Garmin, Google Fit, Apple Fitness, or similar platforms.
            </p>
            <p className="mt-2">
              After completing the challenge, participants may be required to
              upload a screenshot or activity proof clearly showing:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Distance completed</li>
              <li>Date of activity</li>
              <li>Duration / time</li>
              <li>Application or device name</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              4. Safety & Responsibility
            </h2>
            <p>
              Participants are fully responsible for their own health and safety
              during the challenge. Please follow local traffic rules, government
              guidelines, and ensure you are medically fit before participating.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              5. Medals, Certificates & Shipping
            </h2>
            <p>
              Medals, certificates, and any physical merchandise will be shipped
              only to the address provided during registration. Valley Run is not
              responsible for delays caused by incorrect address details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              6. Refund & Cancellation Policy
            </h2>
            <p>
              Once registration is completed, refunds are not available under
              normal circumstances. Refunds may only be considered if an event
              is cancelled by Valley Run.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              7. Leaderboard & Public Sharing
            </h2>
            <p>
              By participating, you consent to having your name, challenge
              details, and achievements displayed on the Valley Run leaderboard
              and shared on Valley Run’s website or social media platforms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              8. Fair Play Policy
            </h2>
            <p>
              Any attempt to submit false activity data, edited screenshots, or
              manipulated results may lead to immediate disqualification without
              refund.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              9. Modification of Rules
            </h2>
            <p>
              Valley Run reserves the right to modify challenge rules, rewards,
              or dates. Registered participants will be notified of any major
              changes via email or WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              10. Acceptance of Terms
            </h2>
            <p>
              By registering for any Valley Run challenge, you acknowledge that
              you have read, understood, and agreed to these Terms & Conditions
              in full.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
