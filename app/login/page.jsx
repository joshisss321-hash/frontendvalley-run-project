"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { userAPI, setUserSession, isLoggedIn } from "../../lib/userApi";

export default function LoginPage() {
  const router = useRouter();

  const [step,    setStep]    = useState("email"); // email → otp
  const [email,   setEmail]   = useState("");
  const [code,    setCode]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [info,    setInfo]    = useState("");
  const [cooldown, setCooldown] = useState(0);

  const otpRef = useRef(null);

  /* Pehle se logged in ho to seedha profile */
  useEffect(() => {
    if (isLoggedIn()) router.replace("/profile");
  }, [router]);

  /* Resend cooldown ticker */
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  /* OTP step pe aate hi input focus */
  useEffect(() => {
    if (step === "otp") otpRef.current?.focus();
  }, [step]);

  const sendOtp = async (e) => {
    e?.preventDefault();
    if (loading || cooldown > 0) return;

    setError(""); setInfo(""); setLoading(true);

    const res = await userAPI.sendOtp(email.trim().toLowerCase());
    setLoading(false);

    if (res.success) {
      setStep("otp");
      setCooldown(60);
      setInfo(`Code sent to ${email}. Check your inbox (and spam folder).`);
    } else {
      setError(res.message || "Could not send the code. Please try again.");
      if (res.retryAfter) setCooldown(res.retryAfter);
    }
  };

  const verifyOtp = async (e) => {
    e?.preventDefault();
    if (loading) return;

    setError(""); setLoading(true);

    const res = await userAPI.verifyOtp(email.trim().toLowerCase(), code.trim());
    setLoading(false);

    if (res.success && res.token) {
      setUserSession(res.token, res.user);
      router.replace("/profile");
    } else {
      setError(res.message || "Could not verify that code");
      setCode("");
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 text-sm">
              Sign in to see your registrations, medals and stats
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            {/* ── STEP 1: EMAIL ── */}
            {step === "email" && (
              <form onSubmit={sendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use the same email you registered with
                  </p>
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.includes("@") || cooldown > 0}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
                >
                  {loading
                    ? "Sending..."
                    : cooldown > 0
                      ? `Try again in ${cooldown}s`
                      : "Send Code →"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Not registered yet?{" "}
                  <Link href="/challenges" className="text-red-600 font-semibold hover:underline">
                    Browse events
                  </Link>
                </p>
              </form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === "otp" && (
              <form onSubmit={verifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    6-digit code
                  </label>
                  <input
                    ref={otpRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••••"
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 text-center text-3xl tracking-[0.5em] font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {info && !error && (
                  <p className="text-green-700 text-sm bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                    {info}
                  </p>
                )}

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
                >
                  {loading ? "Verifying..." : "Sign in →"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => { setStep("email"); setCode(""); setError(""); }}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ← Change email
                  </button>

                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={cooldown > 0 || loading}
                    className="text-red-600 font-semibold disabled:text-gray-400"
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            No password needed — we email you a fresh code each time
          </p>
        </div>
      </section>
    </main>
  );
}
