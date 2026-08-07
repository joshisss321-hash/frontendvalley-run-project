"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MedalTracker from "../components/profile/MedalTracker";
import { userAPI, clearUserSession, isLoggedIn } from "../../lib/userApi";

/* ═══════════════ Small building blocks ═══════════════ */

const StatCard = ({ label, value, sub, accent = "text-gray-900" }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5">
    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">{label}</p>
    <p className={`text-2xl font-extrabold mt-1 ${accent}`}>{value}</p>
    {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
  </div>
);

const SUB_BADGE = {
  approved: "bg-green-100 text-green-700",
  pending:  "bg-amber-100 text-amber-800",
  rejected: "bg-red-100 text-red-700",
};

const fmtDate = (d) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return "—"; }
};

/* ═══════════════ Page ═══════════════ */

export default function ProfilePage() {
  const router = useRouter();

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [tab,     setTab]     = useState("overview");
  const [copied,  setCopied]  = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
      return;
    }

    (async () => {
      const res = await userAPI.getProfile();

      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      if (res.success) setData(res);
      else setError(res.message || "Profile load nahi ho payi");

      setLoading(false);
    })();
  }, [router]);

  const logout = () => {
    clearUserSession();
    router.replace("/login");
  };

  const copyReferral = () => {
    if (!data?.referral?.link) return;
    navigator.clipboard?.writeText(data.referral.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Loading / error ── */
  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Aapki profile load ho rahi hai...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="bg-gray-50 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center max-w-sm">
            <p className="text-red-600 font-semibold mb-4">{error || "Kuch gadbad ho gayi"}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Dobara try karein
            </button>
          </div>
        </div>
      </main>
    );
  }

  const { user, stats, coachTip, events, referral } = data;

  const TABS = [
    { key: "overview",  label: "Overview" },
    { key: "events",    label: `My Events (${events.length})` },
    { key: "medals",    label: "Medal Tracking" },
    { key: "stats",     label: "Stats & Coach" },
    { key: "referrals", label: "Refer & Earn" },
  ];

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <section className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">

        {/* ─── Header ─── */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-6 sm:p-8 text-white mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-white/70 text-sm">Namaste 👋</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold truncate">{user.name}</h1>
              <p className="text-white/70 text-sm mt-1 truncate">{user.email}</p>
              <p className="text-white/60 text-xs mt-2">
                Member since {fmtDate(user.joinedAt)}
              </p>
            </div>

            <button
              onClick={logout}
              className="shrink-0 bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Events",     value: stats.totalEvents },
              { label: "Completed",  value: stats.completedEvents },
              { label: "Distance",   value: `${stats.totalKm} km` },
              { label: "Best Pace",  value: stats.bestPaceLabel },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold">{s.label}</p>
                <p className="text-lg font-extrabold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════ OVERVIEW ═══════════ */}
        {tab === "overview" && (
          <div className="space-y-6">

            {coachTip && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <p className="text-[11px] uppercase tracking-wide text-white/50 font-bold mb-2">
                  🤖 Your Coach
                </p>
                <p className="leading-relaxed">{coachTip}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Completion Rate"
                value={`${stats.completionRate}%`}
                sub={`${stats.completedEvents} of ${stats.totalEvents} events`}
                accent="text-green-600"
              />
              <StatCard label="Total Time" value={stats.totalTimeLabel} sub="Saare approved runs" />
              <StatCard
                label="Pending Review"
                value={stats.pendingReviews}
                sub={stats.pendingReviews ? "Verify hona baaki" : "Sab clear"}
                accent={stats.pendingReviews ? "text-amber-600" : "text-gray-900"}
              />
              <StatCard
                label="Referrals"
                value={referral.count}
                sub={referral.toNextReward
                  ? `${referral.toNextReward} aur = ${referral.rewardPercent}% off`
                  : "Reward ready!"}
                accent="text-red-600"
              />
            </div>

            {stats.improvement && (
              <div className={`rounded-2xl p-6 border ${
                stats.improvement.improved
                  ? "bg-green-50 border-green-200"
                  : "bg-amber-50 border-amber-200"
              }`}>
                <p className="font-bold text-gray-900 mb-1">
                  {stats.improvement.improved ? "📈 Aap tez ho rahe hain!" : "📉 Thoda dheeme rahe"}
                </p>
                <p className="text-sm text-gray-700">
                  {stats.improvement.from.paceLabel} → {stats.improvement.to.paceLabel}
                  {" "}({stats.improvement.percent}% {stats.improvement.improved ? "faster" : "slower"})
                </p>
              </div>
            )}

            {events.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <p className="text-gray-500 mb-4">Abhi tak koi event join nahi kiya.</p>
                <Link
                  href="/challenges"
                  className="inline-block bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition"
                >
                  Events dekhiye →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ MY EVENTS ═══════════ */}
        {tab === "events" && (
          <div className="space-y-4">
            {events.length === 0 && (
              <p className="text-gray-500 text-center py-10">Koi registration nahi mili.</p>
            )}

            {events.map((ev) => (
              <div key={ev.registrationId} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">{ev.event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {ev.category} · Registered {fmtDate(ev.registeredAt)}
                    </p>
                  </div>

                  {ev.bibNumber && (
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">BIB</p>
                      <p className="font-mono font-bold text-gray-900">{ev.bibNumber}</p>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Activity</p>
                    {ev.submission ? (
                      <>
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${SUB_BADGE[ev.submission.status]}`}>
                          {ev.submission.status}
                        </span>
                        <p className="text-sm text-gray-700 mt-2">
                          {ev.submission.distance} · {ev.submission.timing || "no timing"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400">Submit nahi kiya</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Rank</p>
                    {ev.rank ? (
                      <>
                        <p className="text-xl font-extrabold text-gray-900">#{ev.rank.rank}</p>
                        <p className="text-xs text-gray-500">
                          of {ev.rank.outOf} in {ev.rank.category} · top {100 - ev.rank.percentile}%
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400">Approve hone par</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-1">Paid</p>
                    <p className="text-xl font-extrabold text-gray-900">₹{ev.amount}</p>
                    {ev.discountAmount > 0 && (
                      <p className="text-xs text-green-600">
                        ₹{ev.discountAmount} saved ({ev.couponCode})
                      </p>
                    )}
                  </div>
                </div>

                <MedalTracker medal={ev.medal} compact />
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ MEDAL TRACKING ═══════════ */}
        {tab === "medals" && (
          <div className="grid md:grid-cols-2 gap-5">
            {events.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10">Koi medal nahi.</p>
            )}

            {events.map((ev) => (
              <div key={ev.registrationId} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  {ev.event.medalImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ev.event.medalImage}
                      alt={ev.event.title}
                      className="w-14 h-14 object-contain shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">{ev.event.title}</p>
                    {ev.bibNumber && (
                      <p className="text-xs font-mono text-gray-500">{ev.bibNumber}</p>
                    )}
                  </div>
                </div>

                <MedalTracker medal={ev.medal} compact />
              </div>
            ))}
          </div>
        )}

        {/* ═══════════ STATS & COACH ═══════════ */}
        {tab === "stats" && (
          <div className="space-y-6">

            {coachTip && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <p className="text-[11px] uppercase tracking-wide text-white/50 font-bold mb-2">
                  🤖 Your Coach
                </p>
                <p className="leading-relaxed">{coachTip}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-4">
              <StatCard label="Running"  value={`${stats.kmByActivity.running} km`} />
              <StatCard label="Walking"  value={`${stats.kmByActivity.walking} km`} />
              <StatCard label="Cycling"  value={`${stats.kmByActivity.cycling} km`} />
            </div>

            {/* Personal bests */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">🏆 Personal Bests</h3>
              {stats.personalBests.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Timing ke saath activity submit kijiye — yahan PB dikhne lagenge.
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.personalBests.map((pb) => (
                    <div key={pb.distance} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-900">{pb.distance}</p>
                        <p className="text-xs text-gray-500">{fmtDate(pb.achievedAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{pb.timing}</p>
                        <p className="text-xs text-gray-500">{pb.paceLabel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Next target */}
            {stats.nextTarget && (
              <div className="bg-white rounded-2xl border-2 border-red-200 p-6">
                <h3 className="font-bold text-gray-900 mb-1">🎯 Next Target</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Apne best se 3% tez — realistic agla goal
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-[11px] uppercase text-gray-500 font-semibold">Abhi</p>
                    <p className="text-lg font-bold text-gray-900">{stats.nextTarget.currentTiming}</p>
                    <p className="text-xs text-gray-500">{stats.nextTarget.currentPace}</p>
                  </div>
                  <div className="flex items-center justify-center text-2xl text-gray-300">→</div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-500 font-semibold">Target</p>
                    <p className="text-lg font-bold text-red-600">{stats.nextTarget.targetTiming}</p>
                    <p className="text-xs text-gray-500">{stats.nextTarget.targetPace}</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  {stats.nextTarget.distance} mein sirf{" "}
                  <strong>{stats.nextTarget.secondsToSave} second</strong> bachane hain
                </p>
              </div>
            )}

            {/* History */}
            {stats.history.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">📋 Run History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-200">
                        <th className="pb-3 font-semibold">Event</th>
                        <th className="pb-3 font-semibold">Distance</th>
                        <th className="pb-3 font-semibold">Timing</th>
                        <th className="pb-3 font-semibold">Pace</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...stats.history].reverse().map((h, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 text-gray-900">{h.eventSlug}</td>
                          <td className="py-3 text-gray-600">{h.distance}</td>
                          <td className="py-3 font-semibold text-gray-900">{h.timing}</td>
                          <td className="py-3 text-gray-600">{h.paceLabel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ REFERRALS ═══════════ */}
        {tab === "referrals" && (
          <div className="space-y-6">

            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl font-extrabold mb-2">Refer karo, discount pao 🎁</h3>
              <p className="text-white/80 text-sm mb-6">
                Aapke code se koi register kare to <strong>use {referral.welcomePercent}% off</strong> milta hai.
                Har <strong>{referral.perReward} successful referrals</strong> par aapko{" "}
                <strong>{referral.rewardPercent}% off ka coupon</strong> milta hai.
              </p>

              <div className="bg-white/15 backdrop-blur rounded-xl p-4 mb-4">
                <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold mb-1">
                  Aapka referral code
                </p>
                <p className="text-2xl font-extrabold font-mono tracking-wider">{referral.code}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copyReferral}
                  className="bg-white text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-gray-100 transition text-sm"
                >
                  {copied ? "✓ Copied!" : "Copy referral link"}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Main Valley Run pe daudta hoon 🏃 Tum bhi join karo — mere code ${referral.code} se ${referral.welcomePercent}% off milega: ${referral.link}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-green-600 transition text-sm"
                >
                  WhatsApp par share
                </a>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900">Progress</h4>
                <span className="text-sm text-gray-500">
                  {referral.count} referral{referral.count === 1 ? "" : "s"}
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-red-600 rounded-full transition-all"
                  style={{
                    width: `${((referral.count % referral.perReward) / referral.perReward) * 100}%`,
                  }}
                />
              </div>

              <p className="text-sm text-gray-600">
                {referral.toNextReward > 0
                  ? `${referral.toNextReward} aur referral = ${referral.rewardPercent}% discount coupon 🎉`
                  : `Aapka ${referral.rewardPercent}% coupon ready hai!`}
              </p>
            </div>

            {/* Coupons */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4">🎟️ Aapke Coupons</h4>

              {referral.coupons.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Abhi koi coupon nahi. {referral.perReward} logon ko refer kijiye!
                </p>
              ) : (
                <div className="space-y-3">
                  {referral.coupons.map((c) => (
                    <div
                      key={c.code}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 border-dashed ${
                        c.used ? "border-gray-200 bg-gray-50 opacity-60" : "border-green-300 bg-green-50"
                      }`}
                    >
                      <div>
                        <p className="font-mono font-bold text-gray-900">{c.code}</p>
                        <p className="text-xs text-gray-500">
                          {c.type === "percent" ? `${c.value}% off` : `₹${c.value} off`}
                          {c.expiresAt && ` · valid till ${fmtDate(c.expiresAt)}`}
                        </p>
                      </div>

                      {c.used ? (
                        <span className="text-xs font-bold text-gray-400">USED</span>
                      ) : (
                        <button
                          onClick={() => navigator.clipboard?.writeText(c.code)}
                          className="text-xs font-bold px-3 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition"
                        >
                          Copy
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
