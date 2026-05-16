"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ActivitySubmission() {
  const [events, setEvents]       = useState([]);
  const [eventSlug, setEventSlug] = useState("");
  const [query, setQuery]         = useState("");
  const [runner, setRunner]       = useState(null);
  const [step, setStep]           = useState("search");
  const [distance, setDistance]   = useState("");
  const [timing, setTiming]       = useState("");
  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);
  const [loading, setLoading]     = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ── Fetch all events ──────────────────────────────────────
  useEffect(() => {
    fetch(`${API}/api/events`)
      .then((r) => r.json())
      .then((data) => {
        // Sab events dikhao — active wale
        const list = (data.events || []).filter((e) => e.active);
        setEvents(list);

        // Auto-select if ?event= in URL
        const params = new URLSearchParams(window.location.search);
        const ev = params.get("event");
        if (ev) setEventSlug(ev);
      })
      .catch(() => {});
  }, []);

  // ── Check karo submission band hai ya nahi ────────────────
  const isSubmissionClosed = (event) => {
    if (!event) return false;
    if (!event.submissionDeadline) return false; // deadline set nahi — open hai
    return new Date() > new Date(event.submissionDeadline);
  };

  const selectedEvent = events.find((e) => e.slug === eventSlug);
  const submissionClosed = isSubmissionClosed(selectedEvent);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // ── SEARCH ────────────────────────────────────────────────
  async function searchRunner() {
    if (!eventSlug) { toast.error("Pehle event select karo"); return; }
    if (submissionClosed) { toast.error("Is event ki submission band ho gayi hai"); return; }
    if (!query.trim()) { toast.error("Phone ya email daalo"); return; }

    try {
      const res  = await fetch(`${API}/api/search-runner`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ query: query.trim(), eventSlug }),
      });
      const data = await res.json();

      if (!data.runner) {
        toast.error("Registration nahi mili. Phone ya email check karo.");
        return;
      }

      if (data.alreadySubmitted) {
        toast.info(
          data.submissionStatus === "approved"
            ? "Tumhari activity already verify ho gayi hai! ✅"
            : "Already submit ho gayi — verification pending hai."
        );
        return;
      }

      setRunner(data.runner);
      setStep("submit");
      toast.success("Registration mil gayi! ✅");
    } catch {
      toast.error("Server error. Dobara try karo.");
    }
  }

  // ── SUBMIT ────────────────────────────────────────────────
  async function submitRun() {
    if (loading) return;
    if (!distance) { toast.error("Distance select karo"); return; }
    if (!file)     { toast.error("Run screenshot upload karo"); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name",      runner.name);
      fd.append("email",     runner.email);
      fd.append("phone",     runner.phone);
      fd.append("distance",  distance);
      fd.append("timing",    timing);
      fd.append("eventSlug", eventSlug);
      fd.append("image",     file);

      const res  = await fetch(`${API}/api/submit-run`, { method: "POST", body: fd });
      const data = await res.json();

      if (data.error) toast.error(data.error);
      else { toast.success("Submit ho gayi! 24 ghante mein verify karenge 🎉"); setStep("done"); }
    } catch {
      toast.error("Server error. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setStep("search"); setRunner(null); setQuery("");
    setDistance(""); setTiming(""); setFile(null); setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Submit Your Activity
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Event select karo aur registered phone/email se login karo
        </p>

        {/* ── STEP 1: SEARCH ── */}
        {step === "search" && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

            {/* Event selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Event Select Karo *
              </label>

              {events.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-sm animate-pulse">
                  Events load ho rahe hain...
                </div>
              ) : (
                <div className="space-y-2">
                  {events.map((ev) => {
                    const closed = isSubmissionClosed(ev);
                    const isSelected = eventSlug === ev.slug;

                    return (
                      <button
                        key={ev._id}
                        onClick={() => !closed && setEventSlug(ev.slug)}
                        disabled={closed}
                        className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all ${
                          closed
                            ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300 bg-white cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-bold text-sm ${isSelected ? "text-red-600" : "text-gray-800"}`}>
                              {ev.title}
                            </div>
                            <div className="text-gray-400 text-xs mt-0.5">
                              {ev.dates}
                            </div>
                          </div>
                          {/* Status badge */}
                          {closed ? (
                            <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full font-semibold flex-shrink-0">
                              Closed
                            </span>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold flex-shrink-0">
                              Open ✓
                            </span>
                          )}
                        </div>

                        {/* Submission deadline info */}
                        {ev.submissionDeadline && !closed && (
                          <div className="text-orange-500 text-xs mt-1 font-medium">
                            ⏳ Last date: {new Date(ev.submissionDeadline).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submission closed warning */}
            {submissionClosed && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-red-600 font-bold text-sm">
                  Is event ki activity submission band ho gayi hai
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Deadline: {new Date(selectedEvent.submissionDeadline).toLocaleDateString("en-IN")}
                </div>
              </div>
            )}

            {/* Phone/email input — sirf tab dikhao jab event selected ho aur open ho */}
            {eventSlug && !submissionClosed && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Registered Phone ya Email *
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchRunner()}
                  placeholder="9876543210 ya you@email.com"
                  className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            )}

            {eventSlug && !submissionClosed && (
              <button
                onClick={searchRunner}
                disabled={!query.trim()}
                className={`w-full font-bold py-4 rounded-2xl text-white transition-all text-base ${
                  query.trim()
                    ? "bg-red-600 hover:bg-red-700 hover:scale-[1.02]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Find My Registration →
              </button>
            )}
          </div>
        )}

        {/* ── STEP 2: SUBMIT ── */}
        {step === "submit" && runner && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

            {/* Event badge */}
            {selectedEvent && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-center">
                <span className="text-red-600 font-bold text-sm">📅 {selectedEvent.title}</span>
              </div>
            )}

            {/* Runner info */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {runner.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-800">{runner.name}</div>
                <div className="text-gray-500 text-xs">{runner.email} · {runner.phone}</div>
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Distance *</label>
              <div className="grid grid-cols-3 gap-2">
                {["5km", "10km", "21km"].map((d) => (
                  <button key={d} onClick={() => setDistance(d)}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      distance === d
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-gray-200 text-gray-600 hover:border-red-300"
                    }`}>
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Completion Time{" "}
                <span className="text-gray-400 font-normal text-xs">(optional — leaderboard ke liye)</span>
              </label>
              <input
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="HH:MM:SS  jaise 1:23:45"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
              />
              <p className="text-gray-400 text-xs mt-1">🏆 Sabse kam time = leaderboard mein top rank</p>
            </div>

            {/* Screenshot */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Run Screenshot *</label>
              <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-red-300 transition-colors text-center">
                {preview ? (
                  <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-xl object-contain"/>
                ) : (
                  <>
                    <div className="text-4xl mb-2">📸</div>
                    <div className="text-gray-500 text-sm font-medium">Click karke screenshot upload karo</div>
                    <div className="text-gray-400 text-xs mt-1">Strava, Nike Run Club, Garmin, Google Fit...</div>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
              </label>
            </div>

            <button onClick={submitRun} disabled={loading || !distance || !file}
              className={`w-full font-bold py-4 rounded-2xl text-white text-base transition-all ${
                !loading && distance && file
                  ? "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}>
              {loading ? "Submitting..." : "Submit Activity →"}
            </button>

            <button onClick={reset} className="w-full text-gray-400 text-sm py-2 hover:text-gray-600">
              ← Wapas jaao
            </button>
          </div>
        )}

        {/* ── STEP 3: DONE ── */}
        {step === "done" && (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black mb-3 text-gray-800">Submit Ho Gayi!</h2>
            <p className="text-gray-500 mb-2 text-sm">Hum 24 ghante mein verify karenge.</p>
            <p className="text-gray-400 text-xs mb-8">Verification ke baad tumhara medal dispatch ho jaayega.</p>
            <button onClick={reset}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-all">
              Ek aur submit karo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
