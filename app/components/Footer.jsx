"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-sm text-gray-700">

        {/* ===== QUICK LINKS ===== */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-red-600">Search</Link></li>
            <li><Link href="/terms" className="hover:text-red-600">Terms of Service</Link></li>
            <li><Link href="/about" className="hover:text-red-600">About Us</Link></li>
          </ul>
        </div>

        {/* ===== ABOUT / MISSION ===== */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="leading-relaxed text-gray-600">
            We are a team of fitness enthusiasts who are working towards a vision
            to motivate others to build a healthy lifestyle.
          </p>
        </div>

        {/* ===== CONTACT ===== */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
          <p className="mb-2">
            📞 <span className="font-semibold">Call:</span>  70601 48183
          </p>
          <p>
            📧 <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:support@valleyrun.com"
              className="text-red-600 hover:underline"
            >
              valleyrun.official@gmail.com
            </a>
          </p>
        </div>

        {/* ===== SUBSCRIBE ===== */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Subscribe to our emails</h3>

          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-red-500"
            />
            <button className="bg-red-600 text-white px-4 rounded-r-lg hover:bg-red-700">
              Subscribe
            </button>
          </div>

          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-red-600">Facebook</a>
            <a href="https://www.instagram.com/valleyrunofficial/" className="hover:text-red-600">Instagram</a>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} valleyrun. All rights reserved.
      </div>
    </footer>
  );
}
