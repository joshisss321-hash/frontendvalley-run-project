"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

const CATEGORIES = ["1600m", "3.2km", "5km", "10km", "21km"];

function timeToSeconds(t) {
  if (!t) return 99999;
  const clean = t.toString().toLowerCase().replace(/\s/g, "");
  if (clean.includes("h") || clean.includes("m")) {
    const h = parseInt(clean.match(/(\d+)h/)?.[1] || 0);
    const m = parseInt(clean.match(/(\d+)m(?!in)/)?.[1] || clean.match(/(\d+)min/)?.[1] || 0);
    const s = parseInt(clean.match(/(\d+)s/)?.[1] || 0);
    return h * 3600 + m * 60 + s;
  }
  const parts = clean.split(":");
  if (parts.length === 3) return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  return parseInt(clean) * 60;
}

function getRankIcon(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

export default function LeaderboardPage() {
  const params = useParams();
  const slug = params?.slug;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("5km");

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setRows(d.rows);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const availableCats = CATEGORIES.filter(cat =>
    rows.some(r => r.distance?.toLowerCase().replace(/\s/g, "") === cat.toLowerCase())
  );

  useEffect(() => {
    if (availableCats.length > 0 && !availableCats.includes(activeTab)) {
      setActiveTab(availableCats[0]);
    }
  }, [availableCats.length]);

  const filtered = rows
    .filter(r => r.distance?.toLowerCase().replace(/\s/g, "") === activeTab.toLowerCase())
    .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time))
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const top3 = filtered.slice(0, 3);

  const eventName = slug
    ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Event";

  return (
    <>
      <Navbar />

      {/* Hero — white bg with red accent */}
      <section className="pt-32 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-100">
            Official Results
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-2">
            {eventName}
          </h1>
          <p className="text-gray-400 text-sm">Discipline decides the ranking.</p>
          {rows.length > 0 && (
            <p className="text-gray-400 text-xs mt-2">{rows.length} total finishers</p>
          )}
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400 font-medium">Loading results...</p>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-5xl mb-4">🏁</div>
              <p className="text-gray-900 font-bold text-xl mb-2">No results yet</p>
              <p className="text-gray-400 text-sm">Results will appear here once the event concludes.</p>
            </div>
          ) : (
            <>
              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 pt-8 pb-8">
                {availableCats.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                      activeTab === cat
                        ? "bg-red-600 text-white shadow-lg shadow-red-200 scale-105"
                        : "bg-white text-gray-500 hover:text-gray-900 border-2 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {cat}
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === cat ? "bg-red-500/40 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {rows.filter(r => r.distance?.toLowerCase().replace(/\s/g, "") === cat.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">No entries for {activeTab}</div>
              ) : (
                <>
                  {/* Podium — Top 3 */}
                  {top3.length > 0 && (
                    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 sm:p-10 mb-6 shadow-sm">
                      <p className="text-center text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">Top Finishers</p>
                      <div className="flex items-end justify-center gap-3 sm:gap-6">

                        {/* 2nd */}
                        {top3[1] && (
                          <div className="flex flex-col items-center flex-1 max-w-[140px]">
                            <div className="text-4xl mb-2">🥈</div>
                            <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-t-2xl px-3 py-4 text-center" style={{ height: 90 }}>
                              <p className="text-gray-900 font-black text-sm truncate">{top3[1].name}</p>
                              <p className="text-gray-400 text-xs mt-1 font-semibold">{top3[1].time}</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-b-xl py-2 text-center">
                              <span className="text-gray-600 text-xs font-black">2nd Place</span>
                            </div>
                          </div>
                        )}

                        {/* 1st */}
                        {top3[0] && (
                          <div className="flex flex-col items-center flex-1 max-w-[160px]">
                            <div className="text-5xl mb-2">🥇</div>
                            <div className="w-full bg-yellow-50 border-2 border-yellow-300 rounded-t-2xl px-3 py-4 text-center shadow-md" style={{ height: 110 }}>
                              <p className="text-yellow-800 font-black text-sm truncate">{top3[0].name}</p>
                              <p className="text-yellow-600 text-xs mt-1 font-bold">{top3[0].time}</p>
                              <span className="inline-block bg-yellow-200 text-yellow-800 text-[10px] font-black px-2 py-0.5 rounded-full mt-2">WINNER 🏆</span>
                            </div>
                            <div className="w-full bg-yellow-400 rounded-b-xl py-2 text-center">
                              <span className="text-yellow-900 text-xs font-black">1st Place</span>
                            </div>
                          </div>
                        )}

                        {/* 3rd */}
                        {top3[2] && (
                          <div className="flex flex-col items-center flex-1 max-w-[140px]">
                            <div className="text-4xl mb-2">🥉</div>
                            <div className="w-full bg-orange-50 border-2 border-orange-200 rounded-t-2xl px-3 py-4 text-center" style={{ height: 72 }}>
                              <p className="text-orange-900 font-black text-sm truncate">{top3[2].name}</p>
                              <p className="text-orange-400 text-xs mt-1 font-semibold">{top3[2].time}</p>
                            </div>
                            <div className="w-full bg-orange-300 rounded-b-xl py-2 text-center">
                              <span className="text-orange-900 text-xs font-black">3rd Place</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Full Rankings Table */}
                  <div className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-sm mb-6">
                    {/* Header */}
                    <div className="grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
                      <div className="col-span-1 text-gray-400 text-xs font-bold uppercase">#</div>
                      <div className="col-span-7 text-gray-400 text-xs font-bold uppercase">Runner</div>
                      <div className="col-span-2 text-gray-400 text-xs font-bold uppercase text-center">Dist</div>
                      <div className="col-span-2 text-gray-400 text-xs font-bold uppercase text-right">Time</div>
                    </div>

                    {filtered.map((row, i) => {
                      const icon = getRankIcon(row.rank);
                      const isTop = row.rank <= 3;
                      return (
                        <div
                          key={row._id || i}
                          className={`grid grid-cols-12 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            row.rank === 1 ? "bg-yellow-50/50" :
                            row.rank === 2 ? "bg-gray-50/50" :
                            row.rank === 3 ? "bg-orange-50/40" : ""
                          }`}
                        >
                          {/* Rank */}
                          <div className="col-span-1 flex items-center">
                            {icon
                              ? <span className="text-xl">{icon}</span>
                              : <span className="text-gray-400 text-sm font-bold">{row.rank}</span>
                            }
                          </div>
                          {/* Name */}
                          <div className="col-span-7 flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                              row.rank === 1 ? "bg-yellow-400 text-yellow-900" :
                              row.rank === 2 ? "bg-gray-300 text-gray-700" :
                              row.rank === 3 ? "bg-orange-300 text-orange-900" :
                              "bg-gray-100 text-gray-500"
                            }`}>
                              {row.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className={`font-bold text-sm ${isTop ? "text-gray-900" : "text-gray-700"}`}>
                              {row.name}
                            </span>
                          </div>
                          {/* Distance */}
                          <div className="col-span-2 flex items-center justify-center">
                            <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-100">
                              {row.distance}
                            </span>
                          </div>
                          {/* Time */}
                          <div className="col-span-2 flex items-center justify-end">
                            <span className={`text-sm font-black ${
                              row.rank === 1 ? "text-yellow-600" :
                              row.rank === 2 ? "text-gray-500" :
                              row.rank === 3 ? "text-orange-500" :
                              "text-gray-500"
                            }`}>
                              {row.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      ["🏃", "Finishers", filtered.length],
                      ["⚡", "Best Time", top3[0]?.time || "—"],
                      ["📏", "Category", activeTab],
                    ].map(([icon, label, val]) => (
                      <div key={label} className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:border-red-200 transition-colors">
                        <div className="text-2xl mb-1">{icon}</div>
                        <div className="text-gray-900 font-black text-sm">{val}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
