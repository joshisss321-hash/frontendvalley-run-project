"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* ── Package mein kya-kya milta hai ──
   Har cheez wahi hai jo sach mein di jaati hai. Kuch naya wada mat jodna. */
const INCLUDED = [
  { icon: "🏅", title: "Premium Metal Medal",   note: "3-inch zinc alloy, ghar tak courier" },
  { icon: "📜", title: "Digital E-Certificate", note: "Aapke naam ke saath" },
  { icon: "🏆", title: "Finishers List",        note: "Website par naam publish" },
  { icon: "📸", title: "Community Gallery",     note: "Apni photo feature karwaiye" },
  { icon: "🚚", title: "Free Shipping",         note: "Poore India mein, koi extra charge nahi" },
  { icon: "🎁", title: "Top Performer Hampers", note: "Leaderboard ke top runners ke liye" },
];

/* Chaar kadam — user ko pata rahe ki paise dene ke baad hota kya hai */
const STEPS = [
  { n: "1", title: "Register",         desc: "Form bharke payment kijiye. Do minute ka kaam." },
  { n: "2", title: "Apni Speed Se Run", desc: "Event ki dates mein kabhi bhi, kahin bhi — road, park ya treadmill." },
  { n: "3", title: "Activity Submit",   desc: "GPS app ka screenshot upload kijiye. Team 24 ghante mein verify karti hai." },
  { n: "4", title: "Medal Aapke Ghar",  desc: "Verify hote hi dispatch. Tracking aapki profile mein dikhegi." },
];

const FAQS = [
  {
    q: "Do I have to run on one fixed day?",
    a: "No. Complete your distance on any day within the event dates — early morning, late night, whatever suits you. Only activities done within the event dates count.",
  },
  {
    q: "Which app should I track with?",
    a: "Any GPS fitness app works — Strava, Nike Run Club, Google Fit, Garmin, Apple Watch, Samsung Health. Your screenshot just needs to clearly show the app name and the distance you covered.",
  },
  {
    q: "When does my medal reach me?",
    a: "Your medal is dispatched once your activity is verified, and delivery usually takes 7-10 days from dispatch. The tracking ID and courier appear in your profile under Medal Tracking.",
  },
  {
    q: "Where do I submit my activity?",
    a: "Submission opens after registration for the event closes — that is by design. Once it opens, you can submit from your profile under My Events, or from the Activity Submission page on the website.",
  },
  {
    q: "I'm a complete beginner. Can I still join?",
    a: "Yes. Pick a shorter distance and walk it if you like — walking categories exist for exactly this. There is no minimum pace and no qualifying time.",
  },
  {
    q: "Is the shipping really free?",
    a: "Yes, anywhere in India. Your medal ships to the address you enter at registration, so please double-check it before paying.",
  },
];

/* Deadline tak kitna waqt bacha — null agar deadline hi nahi hai */
const timeLeft = (deadline) => {
  if (!deadline) return null;
  const ms = new Date(deadline) - new Date();
  if (ms <= 0) return null;
  return {
    days:  Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    mins:  Math.floor((ms % 3600000) / 60000),
    secs:  Math.floor((ms % 60000) / 1000),
  };
};

export default function PricingPage() {
  const { slug } = useParams();
  const router   = useRouter();

  const [event, setEvent]   = useState(null);
  const [left,  setLeft]    = useState(null);
  const [face,  setFace]    = useState("front");   // medal ka aage/peeche
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          router.replace("/challenges");
          return;
        }
        setEvent(data.event);
      })
      .catch(() => router.replace("/challenges"));
  }, [slug, router]);

  /* Har second countdown update — deadline hone tak */
  useEffect(() => {
    if (!event?.registrationDeadline) return;
    const tick = () => setLeft(timeLeft(event.registrationDeadline));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading pricing…
      </div>
    );
  }

  const price = event.price;
  /* Kata hua daam sirf tab jab asli purana daam ho aur wo zyada ho */
  const mrp     = Number(event.mrp) > price ? Number(event.mrp) : null;
  const savings = mrp ? mrp - price : 0;
  const percent = mrp ? Math.round((savings / mrp) * 100) : 0;

  const closed =
    event.isRegistrationOpen === false ||
    event.isPrevious === true ||
    (event.registrationDeadline && new Date(event.registrationDeadline) < new Date());

  const medal =
    face === "back" && event.medalImageBack ? event.medalImageBack : event.medalImage;

  const goRegister = () => router.push(`/challenges/${slug}/register`);

  return (
    <>
      <section className="bg-gradient-to-b from-red-50/60 to-white">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-20">

          {/* ── Header ── */}
          <div className="text-center mb-12">
            {event.offerBadge && (
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                {event.offerBadge}
              </span>
            )}

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              {event.title}
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              One package. Everything included — the medal, the certificate, and
              free delivery to your door.
            </p>

            {event.dates && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border rounded-full px-4 py-2 shadow-sm">
                📅 {event.dates}
              </p>
            )}
          </div>

          {/* ── Registration band ho chuki ── */}
          {closed && (
            <div className="max-w-2xl mx-auto mb-10 bg-gray-900 text-white rounded-3xl p-8 text-center">
              <p className="text-2xl font-bold mb-2">Registration is closed</p>
              <p className="text-white/70 mb-6">
                This event is no longer accepting new entries. Already registered?
                Your activity submission opens now.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/activity-submission?event=${slug}`}>
                  <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-bold transition">
                    📸 Submit Your Activity
                  </button>
                </Link>
                <Link href="/challenges">
                  <button className="w-full sm:w-auto border border-white/30 hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition">
                    See Open Challenges
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* ── Medal + Pricing card ── */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Medal — yahi asli product hai, isliye bada dikhao */}
            <div className="bg-white rounded-3xl shadow-xl border p-6 lg:sticky lg:top-28">
              {medal ? (
                <img
                  src={medal}
                  alt={`${event.title} finisher medal`}
                  className={`w-full rounded-2xl object-cover transition ${closed ? "grayscale opacity-60" : ""}`}
                />
              ) : (
                <div className="aspect-square w-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                  Medal preview
                </div>
              )}

              {/* Aage/peeche toggle — sirf tab jab dono images ho */}
              {event.medalImage && event.medalImageBack && (
                <div className="flex gap-2 justify-center mt-4">
                  {["front", "back"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFace(f)}
                      className={`px-5 py-1.5 rounded-full text-sm font-semibold capitalize transition ${
                        face === f
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-4 text-center text-sm text-gray-500">
                Actual premium metal medal — delivered to your home, free anywhere in India.
              </p>
            </div>

            {/* Pricing card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-600 p-8 sm:p-10">

              {/* Daam */}
              <div className="mb-6">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-5xl font-extrabold text-red-600">₹{price}</span>
                  {mrp && (
                    <>
                      <span className="text-xl text-gray-400 line-through mb-1">₹{mrp}</span>
                      <span className="mb-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        Save ₹{savings} ({percent}% off)
                      </span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  One-time payment · No subscription · Includes delivery
                </p>
              </div>

              {/* Countdown — sirf jab registration khuli ho aur deadline set ho */}
              {!closed && left && (
                <div className="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">
                    Registration closes in
                  </p>
                  <div className="flex gap-3">
                    {[
                      ["Days", left.days],
                      ["Hrs",  left.hours],
                      ["Min",  left.mins],
                      ["Sec",  left.secs],
                    ].map(([label, value]) => (
                      <div key={label} className="text-center">
                        <div className="bg-white rounded-xl px-3 py-2 shadow-sm min-w-[52px]">
                          <span className="text-xl font-extrabold text-gray-900 tabular-nums">
                            {String(value).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block uppercase">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Distance options */}
              {event.categories?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Choose your distance at registration
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map((c) => (
                      <span
                        key={c}
                        className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full uppercase"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Kya-kya milega */}
              <ul className="space-y-3.5 mb-8">
                {INCLUDED.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 leading-snug">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {closed ? (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-4 rounded-full font-bold text-lg cursor-not-allowed"
                >
                  Registration Closed
                </button>
              ) : (
                <button
                  onClick={goRegister}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full font-bold text-lg transition hover:scale-[1.02] shadow-lg shadow-red-600/25"
                >
                  Get My Medal — ₹{price}
                </button>
              )}

              {/* Bharosa */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["🔒", "Secure payment"],
                  ["🚚", "Free delivery"],
                  ["🇮🇳", "Ships pan-India"],
                ].map(([icon, label]) => (
                  <div key={label} className="text-xs text-gray-600">
                    <div className="text-lg mb-0.5">{icon}</div>
                    {label}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-[11px] text-gray-400 leading-relaxed">
                Payments processed securely via Razorpay — UPI, cards and net banking.
                Valley Run never asks for your OTP, PIN or CVV.
              </p>

              {event.socialProofText && (
                <p className="mt-4 text-center text-sm font-medium text-gray-600">
                  {event.socialProofText}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Paise dene ke baad kya hota hai ── */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-3">
            What happens after you register
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-lg mx-auto">
            No confusion, no hidden steps. Four things, in this order.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="bg-gray-50 rounded-2xl p-6 border hover:border-red-200 hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12">
            Questions runners ask before paying
          </h2>

          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="bg-white rounded-2xl border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-gray-50 transition"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-gray-900">{f.q}</span>
                  <span
                    className={`text-red-600 text-xl shrink-0 transition-transform ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-10">
            Still unsure? Tap the chat bubble in the corner, or call{" "}
            <a href="tel:8171794766" className="text-red-600 font-semibold">
              8171794766
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Mobile par neeche chipka hua CTA ── */}
      {!closed && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-4">
          <div className="leading-tight">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-red-600">₹{price}</span>
              {mrp && (
                <span className="text-sm text-gray-400 line-through">₹{mrp}</span>
              )}
            </div>
            <span className="text-[11px] text-gray-500">Free delivery included</span>
          </div>
          <button
            onClick={goRegister}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-full font-bold transition"
          >
            Get My Medal
          </button>
        </div>
      )}

      {/* Sticky bar ke peeche content na chhupe */}
      {!closed && <div className="lg:hidden h-24" />}
    </>
  );
}
