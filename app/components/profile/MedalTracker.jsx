"use client";

/**
 * Amazon/Flipkart style vertical tracking timeline.
 * Stages backend se aate hain (registered → verified → dispatched → delivered).
 */

const fmtDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch {
    return "";
  }
};

const STATUS_BADGE = {
  pending:    { label: "Pending",    cls: "bg-gray-100 text-gray-700" },
  verified:   { label: "Verified",   cls: "bg-blue-100 text-blue-700" },
  dispatched: { label: "Dispatched", cls: "bg-amber-100 text-amber-800" },
  delivered:  { label: "Delivered",  cls: "bg-green-100 text-green-700" },
};

export default function MedalTracker({ medal, compact = false }) {
  if (!medal) return null;

  const badge = STATUS_BADGE[medal.status] || STATUS_BADGE.pending;
  const stages = medal.timeline || [];

  // Aakhri complete stage — progress bar isi tak bharta hai
  const lastDone = stages.reduce((acc, s, i) => (s.done ? i : acc), -1);

  return (
    <div className={compact ? "" : "bg-white rounded-2xl border border-gray-200 p-6"}>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          🏅 Medal Status
        </h4>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge.cls}`}>
          {badge.label}
        </span>
      </div>

      {/* Tracking ID box */}
      {medal.trackingId && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                {medal.courier || "Courier"}
              </p>
              <p className="font-mono font-bold text-gray-900 break-all">
                {medal.trackingId}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => navigator.clipboard?.writeText(medal.trackingId)}
                className="text-xs font-semibold px-3 py-2 rounded-lg border border-gray-300 hover:bg-white transition"
              >
                Copy
              </button>

              {medal.trackingUrl && (
                <a
                  href={medal.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Track →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <ol className="relative">
        {stages.map((stage, i) => {
          const isLast = i === stages.length - 1;
          const lineActive = i < lastDone;

          return (
            <li key={stage.key} className="relative flex gap-4 pb-6 last:pb-0">

              {/* Connector line */}
              {!isLast && (
                <span
                  className={`absolute left-[11px] top-6 bottom-0 w-0.5 ${
                    lineActive ? "bg-green-500" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Dot */}
              <span
                className={`relative z-10 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  stage.done
                    ? "bg-green-500 text-white"
                    : "bg-white border-2 border-gray-300 text-transparent"
                }`}
              >
                ✓
              </span>

              {/* Text */}
              <div className="min-w-0 -mt-0.5">
                <p className={`font-semibold text-sm ${stage.done ? "text-gray-900" : "text-gray-400"}`}>
                  {stage.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{stage.note}</p>
                {stage.at && stage.done && (
                  <p className="text-[11px] text-gray-400 mt-1">{fmtDate(stage.at)}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {medal.status === "pending" && (
        <p className="text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mt-2">
          Activity verify hone ke baad medal dispatch hota hai. Tracking ID yahin dikh jayegi.
        </p>
      )}
    </div>
  );
}
