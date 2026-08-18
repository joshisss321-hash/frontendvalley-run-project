"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminAPI } from "@/lib/api";
import { trackingAPI } from "@/lib/userApi";

/* Sheet ke headers alag-alag couriers mein alag hote hain —
   inme se jo mile, wahi column pakad lo. */
const GUESS = {
  phone:      ["phone", "mobile", "contact", "phone no", "mobile no", "customer phone"],
  trackingId: ["tracking", "awb", "consignment", "waybill", "docket", "tracking id", "awb no"],
  courier:    ["courier", "partner", "carrier", "courier name", "logistics"],
  // "tracking link" ko "tracking" se pehle mat pakadna — isliye poore
  // naam pehle likhe hain, guessColumn exact match pehle dekhta hai.
  trackingUrl: ["tracking link", "tracking url", "track link", "link", "url", "tracking website"],
};

/* "Tracking Link" mein bhi "tracking" hai — usse Tracking ID samajh lene
   ka khatra tha. ID dhoondhte waqt link-jaise headers chhod dete hain. */
const LOOKS_LIKE_LINK = /\b(link|url|website|http)\b/;

const guessColumn = (headers, kind) => {
  const lower = headers.map((h) => String(h || "").toLowerCase().trim());

  const allowed = (h) => (kind === "trackingId" ? !LOOKS_LIKE_LINK.test(h) : true);

  // Pehle poora naam milta ho to wahi
  for (const needle of GUESS[kind]) {
    const i = lower.findIndex((h) => h === needle && allowed(h));
    if (i !== -1) return headers[i];
  }
  // Warna jisme wo shabd aata ho
  for (const needle of GUESS[kind]) {
    const i = lower.findIndex((h) => h.includes(needle) && allowed(h));
    if (i !== -1) return headers[i];
  }
  return "";
};

export default function AdminTrackingPage() {
  const router = useRouter();

  const [events, setEvents]       = useState([]);
  const [eventSlug, setEventSlug] = useState("");

  const [fileName, setFileName]   = useState("");
  const [headers, setHeaders]     = useState([]);
  const [rawRows, setRawRows]     = useState([]);
  const [map, setMap]             = useState({ phone: "", trackingId: "", courier: "", trackingUrl: "" });

  const [preview, setPreview]     = useState(null);
  const [busy, setBusy]           = useState(false);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState("");

  const [notify, setNotify]       = useState(false);   // emails jaan-boojh kar bhejni hain, default nahi
  const [overwrite, setOverwrite] = useState(false);

  /* ── Auth + events ── */
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      router.replace("/admin/login");
      return;
    }
    adminAPI.getEvents().then((r) => setEvents(r.events || [])).catch(() => {});
  }, [router]);

  /* ── Sheet parse (browser mein hi, xlsx pehle se installed hai) ── */
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(""); setPreview(null); setResult(null);
    setFileName(file.name);

    try {
      const XLSX = await import("xlsx");
      const buf  = await file.arrayBuffer();
      const wb   = XLSX.read(buf, { type: "array" });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

      if (!rows.length) {
        setError("The sheet is empty or could not be read");
        return;
      }

      const hdrs = Object.keys(rows[0]);
      setHeaders(hdrs);
      setRawRows(rows);
      setMap({
        phone:      guessColumn(hdrs, "phone"),
        trackingId: guessColumn(hdrs, "trackingId"),
        courier:    guessColumn(hdrs, "courier"),
        trackingUrl: guessColumn(hdrs, "trackingUrl"),
      });
    } catch (err) {
      setError("Could not read the file: " + err.message);
    }
  };

  /* ── Mapped rows ── */
  const buildRows = () =>
    rawRows.map((r) => ({
      phone:      map.phone      ? r[map.phone]      : "",
      trackingId: map.trackingId ? r[map.trackingId] : "",
      courier:    map.courier    ? r[map.courier]    : "",
      trackingUrl: map.trackingUrl ? r[map.trackingUrl] : "",
    }));

  const canPreview = eventSlug && map.phone && map.trackingId && rawRows.length > 0;

  const runPreview = async () => {
    if (!canPreview || busy) return;
    setBusy(true); setError(""); setResult(null);

    try {
      const res = await trackingAPI.preview(eventSlug, buildRows());
      if (res.success) setPreview(res);
      else setError(res.message || "Preview failed");
    } catch (err) {
      setError("Preview fail: " + err.message);
    }
    setBusy(false);
  };

  const runCommit = async () => {
    if (!preview || busy) return;

    const willUpdate = overwrite
      ? preview.summary.matched
      : preview.summary.matched - preview.summary.overwrites;

    if (!confirm(
      `${willUpdate} registrations will be marked as "dispatched".\n\n` +
      (notify
        ? `📧 ${willUpdate} emails WILL be sent to runners.`
        : `🔕 NO emails will be sent — runners see the tracking ID in their profile.`) +
      "\n\nContinue?"
    )) return;

    setBusy(true); setError("");

    try {
      const res = await trackingAPI.commit(eventSlug, buildRows(), { notify, overwrite });
      if (res.success) { setResult(res); setPreview(null); }
      else setError(res.message || "Update failed");
    } catch (err) {
      setError("Update fail: " + err.message);
    }
    setBusy(false);
  };

  const reset = () => {
    setFileName(""); setHeaders([]); setRawRows([]);
    setMap({ phone: "", trackingId: "", courier: "", trackingUrl: "" });
    setPreview(null); setResult(null); setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-800">📦 Medal Tracking Upload</h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload the courier sheet — rows are matched by phone, and each tracking ID
              goes straight to the runner&apos;s profile
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white"
          >
            ← Dashboard
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* ── SUCCESS ── */}
        {result && (
          <div className="bg-white rounded-2xl border border-green-200 p-6 mb-4">
            <h2 className="text-lg font-bold text-green-700 mb-3">✅ Done</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Updated",  value: result.updated,      cls: "text-green-600" },
                { label: "Skipped",  value: result.skipped,      cls: "text-gray-600" },
                { label: "Not found",value: result.notFound,     cls: "text-amber-600" },
                { label: "Emails",   value: result.emailsQueued, cls: "text-blue-600" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">{s.label}</p>
                  <p className={`text-2xl font-extrabold ${s.cls}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={reset}
              className="bg-gray-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-800"
            >
              Upload another sheet
            </button>
          </div>
        )}

        {!result && (
          <>
            {/* ── STEP 1: EVENT ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
              <h2 className="font-bold text-gray-800 mb-3">
                <span className="text-red-600">1.</span> Choose the event
              </h2>
              <select
                value={eventSlug}
                onChange={(e) => { setEventSlug(e.target.value); setPreview(null); }}
                className="w-full sm:w-96 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">— Select event —</option>
                {events.map((ev) => (
                  <option key={ev._id} value={ev.slug}>{ev.title}</option>
                ))}
              </select>
            </div>

            {/* ── STEP 2: FILE ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
              <h2 className="font-bold text-gray-800 mb-1">
                <span className="text-red-600">2.</span> Upload the sheet
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                .xlsx, .xls or .csv — phone and tracking ID are required.
                Add a <strong>Tracking Link</strong> column so runners get a working Track button.
              </p>

              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFile}
                  className="hidden"
                />
                <p className="text-3xl mb-2">📄</p>
                <p className="font-semibold text-gray-700">
                  {fileName || "Click to choose a file"}
                </p>
                {rawRows.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">{rawRows.length} rows found</p>
                )}
              </label>
            </div>

            {/* ── STEP 3: COLUMN MAPPING ── */}
            {headers.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                <h2 className="font-bold text-gray-800 mb-1">
                  <span className="text-red-600">3.</span> Match the columns
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Auto-detected — change any that look wrong
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { key: "phone",      label: "Phone *",       required: true },
                    { key: "trackingId", label: "Tracking ID *", required: true },
                    { key: "courier",    label: "Courier",       required: false },
                    { key: "trackingUrl", label: "Tracking Link", required: false },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        {f.label}
                      </label>
                      <select
                        value={map[f.key]}
                        onChange={(e) => {
                          setMap({ ...map, [f.key]: e.target.value });
                          setPreview(null);
                        }}
                        className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          f.required && !map[f.key] ? "border-red-300" : "border-gray-200"
                        }`}
                      >
                        <option value="">— none —</option>
                        {headers.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Sample */}
                {map.phone && map.trackingId && (
                  <div className="mt-5 bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-2">
                      First 3 rows
                    </p>
                    <div className="overflow-x-auto">
                      <table className="text-xs w-full">
                        <thead>
                          <tr className="text-left text-gray-500">
                            <th className="pb-1 pr-4">Phone</th>
                            <th className="pb-1 pr-4">Tracking ID</th>
                            <th className="pb-1">Courier</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buildRows().slice(0, 3).map((r, i) => (
                            <tr key={i} className="text-gray-800">
                              <td className="py-1 pr-4 font-mono">{String(r.phone)}</td>
                              <td className="py-1 pr-4 font-mono">{String(r.trackingId)}</td>
                              <td className="py-1">{String(r.courier) || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <button
                  onClick={runPreview}
                  disabled={!canPreview || busy}
                  className="mt-5 bg-gray-900 disabled:bg-gray-300 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  {busy ? "Checking..." : "Preview matches →"}
                </button>
              </div>
            )}

            {/* ── STEP 4: PREVIEW ── */}
            {preview && (
              <div className="bg-white rounded-2xl border-2 border-gray-900 p-6 mb-4">
                <h2 className="font-bold text-gray-800 mb-4">
                  <span className="text-red-600">4.</span> Confirm — {preview.event}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Matched",   value: preview.summary.matched,  cls: "text-green-600" },
                    { label: "Not found", value: preview.summary.notFound, cls: "text-amber-600" },
                    { label: "Invalid",   value: preview.summary.invalid,  cls: "text-red-600" },
                    { label: "Already has ID", value: preview.summary.overwrites, cls: "text-blue-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">{s.label}</p>
                      <p className={`text-2xl font-extrabold ${s.cls}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {preview.summary.linkFromSheet > 0 && (
                  <p className="text-xs bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 mb-3">
                    🔗 {preview.summary.linkFromSheet} rows have a tracking link from your sheet —
                    runners will get a working &quot;Track&quot; button for these.
                  </p>
                )}

                {preview.summary.badLinks > 0 && (
                  <p className="text-xs bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 mb-3">
                    ⚠️ {preview.summary.badLinks} rows have a link that isn&apos;t a valid web address —
                    those were ignored. Check the Tracking Link column for typos.
                  </p>
                )}

                {preview.summary.unknownCourier > 0 && (
                  <p className="text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 mb-4">
                    ⚠️ {preview.summary.unknownCourier} rows will have <strong>no Track button</strong> —
                    the courier isn&apos;t one we know, and no link was given in the sheet.
                    The tracking ID still saves, but runners won&apos;t know where to track.
                    <br />
                    Fix it by adding a <strong>Tracking Link</strong> column to your sheet, or use one of:{" "}
                    {preview.supportedCouriers.join(", ")}
                  </p>
                )}

                {/* Not found list */}
                {preview.notFound.length > 0 && (
                  <details className="mb-4">
                    <summary className="cursor-pointer text-sm font-semibold text-amber-700 mb-2">
                      {preview.notFound.length} rows did not match — view
                    </summary>
                    <div className="bg-amber-50 rounded-xl p-4 max-h-52 overflow-y-auto mt-2">
                      {preview.notFound.map((r) => (
                        <p key={r.rowNo} className="text-xs text-amber-900 py-0.5">
                          Row {r.rowNo}: {r.phone} — {r.reason}
                        </p>
                      ))}
                    </div>
                  </details>
                )}

                {/* Invalid list */}
                {preview.invalid.length > 0 && (
                  <details className="mb-4">
                    <summary className="cursor-pointer text-sm font-semibold text-red-700 mb-2">
                      {preview.invalid.length} rows invalid — view
                    </summary>
                    <div className="bg-red-50 rounded-xl p-4 max-h-52 overflow-y-auto mt-2">
                      {preview.invalid.map((r) => (
                        <p key={r.rowNo} className="text-xs text-red-900 py-0.5">
                          Row {r.rowNo}: {r.reason}
                        </p>
                      ))}
                    </div>
                  </details>
                )}

                {/* Matched list */}
                {preview.matched.length > 0 && (
                  <details className="mb-5" open>
                    <summary className="cursor-pointer text-sm font-semibold text-green-700 mb-2">
                      {preview.matched.length} matched — view
                    </summary>
                    <div className="overflow-x-auto max-h-72 overflow-y-auto mt-2 border border-gray-100 rounded-xl">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr className="text-left text-gray-500">
                            <th className="p-2 font-semibold">Name</th>
                            <th className="p-2 font-semibold">Phone</th>
                            <th className="p-2 font-semibold">Tracking</th>
                            <th className="p-2 font-semibold">Courier</th>
                            <th className="p-2 font-semibold">Link</th>
                            <th className="p-2 font-semibold">Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          {preview.matched.map((m) => (
                            <tr key={m.registrationId} className="border-t border-gray-50">
                              <td className="p-2 text-gray-900">{m.name}</td>
                              <td className="p-2 font-mono text-gray-600">{m.phone}</td>
                              <td className="p-2 font-mono text-gray-900">{m.trackingId}</td>
                              <td className="p-2 text-gray-600">{m.courier || "—"}</td>

                              {/* Link kahan se aaya — admin ko commit se pehle saaf dikhe */}
                              <td className="p-2">
                                {m.trackingUrl ? (
                                  <a
                                    href={m.trackingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline font-semibold"
                                    title={m.trackingUrl}
                                  >
                                    {m.linkSource === "sheet" ? "🔗 sheet" : "auto"}
                                  </a>
                                ) : (
                                  <span className="text-amber-600 font-semibold" title="Runner ko sirf number dikhega">
                                    ⚠ none
                                  </span>
                                )}
                              </td>
                              <td className="p-2">
                                {m.alreadyHasTracking ? (
                                  <span className="text-blue-600 font-semibold">has ID</span>
                                ) : (
                                  <span className="text-gray-400">{m.currentStatus}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                )}

                {/* Options */}
                <div className="space-y-2 mb-5">
                  {/* Email ka faisla — kabhi shak na rahe ki kya hoga */}
                  <div
                    className={`rounded-xl px-4 py-3 mb-3 text-sm border ${
                      notify
                        ? "bg-amber-50 border-amber-300 text-amber-900"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    {notify ? (
                      <>
                        📧 <strong>
                          {overwrite
                            ? preview.summary.matched
                            : preview.summary.matched - preview.summary.overwrites} emails
                        </strong>{" "}
                        bhejji jayengi. Agar in logon ko pehle hi bata chuke hain,
                        to neeche wala tick hata dijiye.
                      </>
                    ) : (
                      <>
                        🔕 <strong>Koi email nahi jayegi.</strong> Tracking ID save hogi
                        aur runners ko unki profile mein turant dikh jayegi.
                      </>
                    )}
                  </div>

                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notify}
                      onChange={(e) => setNotify(e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                    Send a dispatch email to each runner
                    <span className="text-xs text-gray-400">(off by default)</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={overwrite}
                      onChange={(e) => setOverwrite(e.target.checked)}
                      className="w-4 h-4 accent-red-600"
                    />
                    Replace existing tracking IDs too
                    <span className="text-xs text-gray-400">
                      (affects {preview.summary.overwrites} rows)
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={runCommit}
                    disabled={busy || preview.summary.matched === 0}
                    className="bg-green-600 disabled:bg-gray-300 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-green-700 transition"
                  >
                    {busy ? "Applying..." : "✓ Confirm & Apply"}
                  </button>

                  <button
                    onClick={() => setPreview(null)}
                    className="border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
