"use client";

import { useState } from "react";
import { userAPI } from "../../../lib/userApi";

/* Wahi list jo /activity-submission page par hai — dono jagah ek jaisa */
const DISTANCE_GROUPS = [
  {
    label: "🏃 Running",
    options: ["Running 1600Mtr", "Running 3.2Km", "Running 5Km", "Running 10Km", "Running 21Km"],
  },
  {
    label: "🚶 Walking",
    options: ["Walking 2Km", "Walking 5Km", "Walking 10Km", "Walking 21Km"],
  },
  {
    label: "🚴 Cycling",
    options: ["Cycling 10Km", "Cycling 25Km", "Cycling 50Km", "Cycling 100Km"],
  },
];

const two = (n) => String(n).padStart(2, "0");

export default function SubmitActivity({ event, onDone }) {
  const [open,     setOpen]     = useState(false);
  const [distance, setDistance] = useState("");
  const [h, setH] = useState("");
  const [m, setM] = useState("");
  const [s, setS] = useState("");
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState("");
  const [done,    setDone]    = useState(false);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    if (f.size > 12 * 1024 * 1024) {
      setError("That image is larger than 12MB. Please choose a smaller one.");
      return;
    }

    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const timing = () => {
    if (!m && !s && !h) return "";
    return h ? `${h}:${two(m || 0)}:${two(s || 0)}` : `${m || 0}:${two(s || 0)}`;
  };

  const submit = async () => {
    if (!distance) { setError("Please select your distance"); return; }
    if (!file)     { setError("Please attach your activity screenshot"); return; }

    setBusy(true);
    setError("");

    const res = await userAPI.submitActivity({
      eventSlug: event.event.slug,
      distance,
      timing: timing(),
      file,
    });

    setBusy(false);

    if (res.success) {
      setDone(true);
      setTimeout(() => onDone?.(), 1200);
    } else {
      setError(res.message || "Could not submit. Please try again.");
    }
  };

  /* ── Already done ── */
  if (done) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <p className="font-bold text-green-800">Submitted 🎉</p>
        <p className="text-sm text-green-700 mt-1">
          We will verify it within 24 hours.
        </p>
      </div>
    );
  }

  /* ── Collapsed button ── */
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition"
      >
        Submit Activity →
      </button>
    );
  }

  /* ── Form ── */
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900">Submit your activity</h4>
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          What did you complete? *
        </label>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">— Select —</option>
          {DISTANCE_GROUPS.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Timing */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Your timing <span className="font-normal text-gray-400">(optional, but needed for the leaderboard)</span>
        </label>
        <div className="flex items-center gap-2">
          {[
            { v: h, set: setH, ph: "hh", max: 23 },
            { v: m, set: setM, ph: "mm", max: 59 },
            { v: s, set: setS, ph: "ss", max: 59 },
          ].map((f, i) => (
            <div key={f.ph} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-400 font-bold">:</span>}
              <input
                type="text"
                inputMode="numeric"
                value={f.v}
                placeholder={f.ph}
                onChange={(e) => {
                  const n = e.target.value.replace(/\D/g, "").slice(0, 2);
                  if (n === "" || Number(n) <= f.max) f.set(n);
                }}
                className="w-16 border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-center bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Screenshot */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Activity screenshot *
        </label>
        <p className="text-xs text-gray-500 mb-2">
          From Strava, Nike Run Club, Garmin, Google Fit — anything that shows your distance
        </p>

        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition">
          <input type="file" accept="image/*" onChange={pickFile} className="hidden" />
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="preview" className="max-h-44 mx-auto rounded-lg" />
          ) : (
            <>
              <p className="text-2xl mb-1">📸</p>
              <p className="text-sm font-semibold text-gray-700">Tap to choose a photo</p>
            </>
          )}
        </label>

        {file && (
          <p className="text-xs text-gray-500 mt-2 truncate">
            {file.name} · {(file.size / 1024 / 1024).toFixed(1)}MB
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        onClick={submit}
        disabled={busy || !distance || !file}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
      >
        {busy ? "Uploading..." : "Submit Activity"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        You can submit only once per event, so check before sending.
      </p>
    </div>
  );
}
