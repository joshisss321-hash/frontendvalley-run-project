"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  const { slug } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    phone2: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    category: "",
    source: "",
    coupon: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Registration submitted (payment integration next)");
  };

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
          
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white border rounded-2xl p-8 space-y-6 shadow-sm"
          >
            <h1 className="text-3xl font-bold">
              Premium Registration
            </h1>

            <p className="text-gray-600">
              <strong className="capitalize">{slug?.replaceAll("-", " ")}</strong><br />
              Complete the form below to secure your spot and premium finisher medal!
            </p>

            {/* PERSONAL */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Personal Details</h3>

              <input
                name="name"
                placeholder="Full Name *"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address *"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="+91 Phone Number *"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                name="phone2"
                placeholder="Re-enter Phone Number *"
                className="input"
                onChange={handleChange}
                required
              />
            </div>

            {/* ADDRESS */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>

              <input
                name="address1"
                placeholder="Flat, House no., Building *"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                name="address2"
                placeholder="Area, Street, Sector, Village *"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                name="landmark"
                placeholder="Landmark (Optional)"
                className="input"
                onChange={handleChange}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="pincode"
                  placeholder="Pincode *"
                  className="input"
                  onChange={handleChange}
                  required
                />

                <input
                  name="city"
                  placeholder="City *"
                  className="input"
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                name="state"
                placeholder="State *"
                className="input"
                onChange={handleChange}
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Select Your Challenge Category *
              </h3>

              <select
                name="category"
                className="input"
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>5 Km Run / Walk</option>
                <option>10 Km Run / Walk</option>
                <option>21 Km Half Marathon</option>
                <option>10 Km Cycling</option>
                <option>25 Km Cycling</option>
                <option>50 Km Cycling</option>
                <option>100 Km Cycling</option>
              </select>
            </div>

            {/* SOURCE */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                How did you find us?
              </h3>

              <select
                name="source"
                className="input"
                onChange={handleChange}
              >
                <option>Instagram</option>
                <option>Facebook</option>
                <option>WhatsApp</option>
                <option>Friend / Family</option>
                <option>Google</option>
                <option>Previous Event</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Pay ₹349 & Register
            </button>
          </form>

          {/* ORDER SUMMARY */}
          <aside className="bg-gray-50 border rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <ul className="space-y-2 text-gray-700">
              <li>🏅 3" Premium Metal Medal</li>
              <li>📄 Digital E-Certificate</li>
              <li>🌐 Name on Finishers List</li>
              <li>🖼️ Customized Poster</li>
              <li>🚚 Free Shipping</li>
            </ul>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹349</span>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Secure payment via Razorpay
            </p>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
