"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ActivitySubmission() {
  const [eventSlug, setEventSlug]   = useState("");
  const [eventLabel, setEventLabel] = useState("");
  const [query, setQuery]           = useState("");
  const [runner, setRunner]         = useState(null);
  const [step, setStep]             = useState("search"); // search | submit | done
  const [distance, setDistance]     = useState("");
  const [timing, setTiming]         = useState("");
  const [file, setFile]             = useState(null);
  const [preview, setPreview]       = useState(null);
  const [loading, setLoading]       = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Read eventSlug from URL ?event=republic-day-2026
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ev = params.get("event") || "";
    setEventSlug(ev);
    if (ev) {
      setEventLabel(
        ev.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      );
    }
  }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // ── SEARCH ────────────────────────────────────────────────
  async function searchRunner() {
    if (!query.trim()) { toast.error("Enter your phone or email"); return; }
    try {
      const res  = await fetch(`${API}/api/search-runner`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ query: query.trim(), eventSlug }),
      });
      const data = await res.json();

      if (!data.runner) {
        toast.error("Registration not found. Check your phone or email.");
        return;
      }

      if (data.alreadySubmitted) {
        const status = data.submissionStatus;
        toast.info(
          status === "approved"
            ? "Your activity is already verified! ✅"
            : "Already submitted — pending verification."
        );
        return;
      }

      setRunner(data.runner);
      setStep("submit");
      toast.success("Registration found! ✅");
    } catch {
      toast.error("Server error. Try again.");
    }
  }

  // ── SUBMIT ────────────────────────────────────────────────
  async function submitRun() {
    if (loading) return;
    if (!distance) { toast.error("Select your distance"); return; }
    if (!file)     { toast.error("Upload your run screenshot"); return; }
    if (!eventSlug) { toast.error("Event not selected"); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name",      runner.name);
      fd.append("email",     runner.email);
      fd.append("phone",     runner.phone);
      fd.append("distance",  distance);
      fd.append("timing",    timing);     // ✅ timing field
      fd.append("eventSlug", eventSlug);  // ✅ event-wise
      fd.append("image",     file);

      const res  = await fetch(`${API}/api/submit-run`, { method: "POST", body: fd });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Submitted! We'll verify within 24 hours 🎉");
        setStep("done");
      }
    } catch {
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Event Badge */}
        {eventLabel && (
          <div className="text-center mb-6">
            <span className="bg-red-100 text-red-700 text-sm font-bold px-4 py-2 rounded-full border border-red-200">
              📅 {eventLabel}
            </span>
          </div>
        )}

        <h1 className="text-3xl font-extrabold text-center mb-2">Submit Your Activity</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Enter your registered phone or email to get started
        </p>

        {/* ── STEP 1: SEARCH ── */}
        {step === "search" && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone number or Email
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchRunner()}
              placeholder="9876543210 or you@email.com"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            <button
              onClick={searchRunner}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02]"
            >
              Find My Registration →
            </button>
          </div>
        )}

        {/* ── STEP 2: SUBMIT ── */}
        {step === "submit" && runner && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
            {/* Runner info card */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {runner.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-800">{runner.name}</div>
                <div className="text-gray-500 text-xs">{runner.email} · {runner.phone}</div>
              </div>
            </div>

            {/* Distance selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Distance *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["5km", "10km", "21km"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDistance(d)}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      distance === d
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-red-300"
                    }`}
                  >
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Completion Time (optional — for leaderboard)
              </label>
              <input
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="HH:MM:SS  e.g. 1:23:45"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-gray-400 text-xs mt-1">
                Fastest time = top of leaderboard 🏆
              </p>
            </div>

            {/* Screenshot upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Run Screenshot *
              </label>
              <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-red-300 transition-colors text-center">
                {preview ? (
                  <img src={preview} alt="preview" className="max-h-36 mx-auto rounded-xl object-contain" />
                ) : (
                  <>
                    <div className="text-4xl mb-2">📸</div>
                    <div className="text-gray-500 text-sm font-medium">Click to upload screenshot</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Strava, Nike Run Club, Garmin, Google Fit...
                    </div>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            </div>

            <button
              onClick={submitRun}
              disabled={loading}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all text-base ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"
              }`}
            >
              {loading ? "Submitting..." : "Submit Activity →"}
            </button>

            <button
              onClick={() => { setStep("search"); setRunner(null); setQuery(""); setDistance(""); setTiming(""); setFile(null); setPreview(null); }}
              className="w-full text-gray-400 text-sm py-2 hover:text-gray-600"
            >
              ← Search again
            </button>
          </div>
        )}

        {/* ── STEP 3: DONE ── */}
        {step === "done" && (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black mb-2">Submitted!</h2>
            <p className="text-gray-500 mb-6 text-sm">
              We will verify your activity within 24 hours. Your medal will be dispatched after verification.
            </p>
            <button
              onClick={() => { setStep("search"); setRunner(null); setQuery(""); setDistance(""); setTiming(""); setFile(null); setPreview(null); }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-all"
            >
              Submit Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
