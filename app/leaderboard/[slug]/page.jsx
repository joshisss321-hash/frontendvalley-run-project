"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function LeaderboardPage() {
  const { slug }    = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState("");
  const [distances, setDistances] = useState([]);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchEntries("");
  }, [slug]);

  const fetchEntries = async (dist) => {
    setLoading(true);
    try {
      const url = `${API}/api/leaderboard/${slug}${dist ? `?distance=${dist}` : ""}`;
      const res  = await fetch(url);
      const data = await res.json();
      const list = data.entries || [];
      setEntries(list);

      // Extract unique distances for filter tabs
      if (!dist) {
        const dists = [...new Set(list.map((e) => e.distance))].filter(Boolean);
        setDistances(dists);
      }
    } catch {}
    setLoading(false);
  };

  const rankIcon = (r) =>
    r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : `#${r}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Leaderboard
          </div>
          <h1 className="text-4xl font-black text-gray-800">
            {slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="text-gray-500 mt-2">Fastest runners · Sorted by completion time</p>
        </div>

        {/* Distance filter */}
        {distances.length > 1 && (
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            <button
              onClick={() => { setDistance(""); fetchEntries(""); }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                !distance ? "bg-red-600 text-white border-red-600" : "border-gray-200 text-gray-600 hover:border-red-300 bg-white"
              }`}
            >
              All
            </button>
            {distances.map((d) => (
              <button key={d} onClick={() => { setDistance(d); fetchEntries(d); }}
                className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  distance === d ? "bg-red-600 text-white border-red-600" : "border-gray-200 text-gray-600 hover:border-red-300 bg-white"
                }`}
              >
                {d.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-gray-400 animate-pulse">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🏃</div>
            <p className="text-gray-400">No verified entries yet. Be the first!</p>
          </div>
        ) : (
          <>
            {/* Podium — top 3 */}
            {entries.length >= 3 && (
              <div className="flex items-end justify-center gap-3 mb-8">
                {[entries[1], entries[0], entries[2]].map((e, i) => (
                  <div key={e.name + i}
                    className={`bg-white rounded-2xl border p-4 text-center flex-1 max-w-32 ${
                      i === 1 ? "border-yellow-300 shadow-lg" : "border-gray-100"
                    }`}
                    style={{ marginBottom: i === 1 ? 0 : "16px" }}
                  >
                    <div className="text-3xl mb-1">{i === 1 ? "🥇" : i === 0 ? "🥈" : "🥉"}</div>
                    <div className="font-black text-sm text-gray-800 truncate">{e.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{e.distance}</div>
                    {e.timing !== "—" && (
                      <div className="text-red-600 font-black text-sm mt-1">{e.timing}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Full list */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {entries.map((e, i) => (
                <div key={i}
                  className={`flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 ${
                    i < 3 ? "bg-yellow-50/50" : ""
                  }`}
                >
                  <div className="text-xl w-10 text-center font-black text-gray-700 flex-shrink-0">
                    {rankIcon(e.rank)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 truncate">{e.name}</div>
                    <div className="text-gray-400 text-xs">
                      {e.distance} {e.city && `· ${e.city}`} {e.state && `, ${e.state}`}
                    </div>
                  </div>
                  <div className="text-red-600 font-black text-lg flex-shrink-0">
                    {e.timing !== "—" ? e.timing : <span className="text-gray-300 font-normal text-sm">—</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
