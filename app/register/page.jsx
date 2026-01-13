"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [category, setCategory] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-black text-white py-8 text-center">
        <h1 className="text-3xl font-bold">Premium Registration</h1>
        <p className="mt-2 text-gray-300">
          {/* Republic Day Challenge 2026 */}
        </p>
        <p className="text-sm mt-1">
          Complete the form below to secure your spot and premium finisher medal!
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT FORM */}
        <form className="lg:col-span-2 bg-white p-8 rounded-2xl shadow space-y-8">

          {/* PERSONAL DETAILS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input className="input" placeholder="Full Name *" required />
              <input className="input" placeholder="Email Address *" required />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input className="input" placeholder="Phone Number * (+91)" required />
              <input className="input" placeholder="Re-enter Phone Number *" required />
            </div>
          </section>

          {/* SHIPPING ADDRESS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

            <input
              className="input mb-4"
              placeholder="Flat, House no., Building, Apartment *"
            />

            <input
              className="input mb-4"
              placeholder="Area, Street, Sector, Village *"
            />

            <input
              className="input mb-4"
              placeholder="Landmark (Optional)"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <input className="input" placeholder="Pincode *" />
              <input className="input" placeholder="City / Town *" />
              <input className="input" placeholder="State *" />
            </div>

            <input
              className="input mt-4 bg-gray-100"
              value="India"
              disabled
            />
          </section>

          {/* CATEGORY */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Select Your Challenge Category *
            </h2>

            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">🏃 Running / Walking</p>
                <div className="flex flex-wrap gap-3">
                  {["5 Km", "10 Km", "21 Km"].map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setCategory(d)}
                      className={`chip ${category === d && "active"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2">🚴 Cycling</p>
                <div className="flex flex-wrap gap-3">
                  {["10 Km", "25 Km", "50 Km", "100 Km"].map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setCategory(d)}
                      className={`chip ${category === d && "active"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SOURCE */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              How did you find out about this event? *
            </h2>

            <select className="input">
              <option>Instagram</option>
              <option>Facebook</option>
              <option>WhatsApp</option>
              <option>Friend / Family</option>
              <option>Google Search</option>
              <option>Previous Event</option>
              <option>Other</option>
            </select>
          </section>

          {/* COUPON */}
          <section>
            <h2 className="text-xl font-bold mb-4">Have a Coupon Code?</h2>
            <div className="flex gap-3">
              <input className="input flex-1" placeholder="Enter coupon code" />
              <button type="button" className="bg-black text-white px-6 rounded-xl">
                Apply
              </button>
            </div>
          </section>
        </form>

        {/* RIGHT SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit sticky top-10">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <ul className="text-sm space-y-2 mb-4">
            <li>✔ 3" Premium Metal Medal</li>
            <li>✔ Digital E-Certificate</li>
            <li>✔ Name on Finishers List</li>
            <li>✔ Customized Poster</li>
            <li>✔ Free Shipping</li>
          </ul>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹499</span>
            </div>
            <div className="flex justify-between">
              <span> discount</span>
      
              <span>30%</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹349</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700">
            Pay ₹349
          </button>

          <p className="text-xs text-center mt-3 text-gray-500">
            Secure payment via Razorpay
          </p>

          <p className="text-xs text-center mt-4">
            Need help? WhatsApp us at <br />
            <span className="font-semibold">+91 70601 48183</span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 text-sm mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-white font-bold mb-2">valleyrun</h3>
            <p>Creating challenges since 2025.</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Navigate</h3>
            <p>Challenges</p>
            <p>Gallery</p>
            <p>About Us</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2">Connect</h3>
            <p>info@valleyrun.in</p>
            <p>Instagram</p>
          </div>
        </div>

        <div className="text-center py-4 border-t border-gray-800">
          © 2026 valleyrun. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
