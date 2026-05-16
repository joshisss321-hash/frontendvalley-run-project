"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";

export default function AdminSubmissions() {
  const [events, setEvents]   = useState([]);
  const [subs, setSubs]       = useState([]);
  const [counts, setCounts]   = useState({ pending: 0, approved: 0, rejected: 0 });
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventSlug, setEventSlug] = useState("");
  const [status, setStatus]   = useState("pending");
  const [distance, setDistance] = useState("");
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState([]);
  const [modal, setModal]     = useState(null);

  useEffect(() => {
    adminAPI.getEvents().then((r) => setEvents(r.events || []));
    const p = new URLSearchParams(window.location.search);
    const ev = p.get("event") || "";
    setEventSlug(ev);
    load({ eventSlug: ev, status: "pending" });
  }, []);

  const load = async (params) => {
    setLoading(true);
    setSelected([]);
    try {
      const res = await adminAPI.getSubmissions(params);
      setSubs(res.submissions || []);
      setTotal(res.total || 0);
      setCounts(res.counts || { pending: 0, approved: 0, rejected: 0 });
    } catch {}
    setLoading(false);
  };

  const applyFilter = (overrides = {}) => {
    const params = { eventSlug, status, distance, search, ...overrides };
    // ✅ FIX: distance lowercase karo — case mismatch nahi hoga
    if (params.distance) params.distance = params.distance.toLowerCase();
    // clean empty values
    Object.keys(params).forEach((k) => !params[k] && delete params[k]);
    load(params);
  };

  const approve = async (id) => {
    await adminAPI.approveSubmission(id);
    applyFilter();
  };
  const reject = async (id) => {
    await adminAPI.rejectSubmission(id);
    applyFilter();
  };
  const del = async (id) => {
    if (!confirm("Delete this submission?")) return;
    await adminAPI.deleteSubmission(id);
    applyFilter();
  };
  const bulkApprove = async () => {
    if (!selected.length || !confirm(`Approve ${selected.length} submissions?`)) return;
    await adminAPI.bulkApprove(selected);
    applyFilter();
  };

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAll = () =>
    setSelected(selected.length === subs.length ? [] : subs.map((s) => s._id));

  const exportCSV = () => {
    const headers = ["Name","Email","Phone","Distance","Timing","Event","Status","Date","Image URL"];
    const rows = subs.map((s) => [
      s.name, s.email, s.phone, s.distance, s.timing || "",
      s.eventSlug, s.status, s.createdAt?.slice(0, 10), s.imageUrl,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    a.download = `submissions-${eventSlug || "all"}-${status || "all"}.csv`;
    a.click();
  };

  const statusBadge = (s) => ({
    pending:  "bg-yellow-100 text-yellow-700 border border-yellow-200",
    approved: "bg-green-100 text-green-700 border border-green-200",
    rejected: "bg-red-100 text-red-700 border border-red-200",
  }[s] || "bg-gray-100 text-gray-600");

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Activity Submissions</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total · {counts.pending} pending</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {selected.length > 0 && (
            <button onClick={bulkApprove}
              className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-700">
              ✓ Approve ({selected.length})
            </button>
          )}
          <button onClick={exportCSV}
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700">
            ⬇ CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
        <select value={eventSlug}
          onChange={(e) => { setEventSlug(e.target.value); applyFilter({ eventSlug: e.target.value }); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-w-44">
          <option value="">All Events</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev.slug}>{ev.title}</option>
          ))}
        </select>

        <select value={distance}
          onChange={(e) => { setDistance(e.target.value); applyFilter({ distance: e.target.value }); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">All Distances</option>
          <option value="5km">5KM</option>
          <option value="10km">10KM</option>
          <option value="21km">21KM</option>
        </select>

        <input value={search}
          onChange={(e) => { setSearch(e.target.value); applyFilter({ search: e.target.value }); }}
          placeholder="Search name, email, phone..."
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 flex-1 min-w-40"/>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {[
          { v: "pending",  l: `Pending (${counts.pending})` },
          { v: "approved", l: `Approved (${counts.approved})` },
          { v: "rejected", l: `Rejected (${counts.rejected})` },
          { v: "",         l: "All" },
        ].map((t) => (
          <button key={t.v}
            onClick={() => { setStatus(t.v); applyFilter({ status: t.v }); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              status === t.v
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-red-300"
            }`}>
            {t.l}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : subs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No submissions found — try "All Distances" ya "All" tab
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 text-left w-8">
                    <input type="checkbox"
                      checked={selected.length === subs.length && subs.length > 0}
                      onChange={toggleAll}/>
                  </th>
                  {["Runner","Distance","Timing","Event","Proof","Status","Date","Actions"].map((h) => (
                    <th key={h} className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subs.map((s) => (
                  <tr key={s._id} className={`hover:bg-gray-50 ${selected.includes(s._id) ? "bg-red-50" : ""}`}>
                    <td className="p-3">
                      <input type="checkbox"
                        checked={selected.includes(s._id)}
                        onChange={() => toggle(s._id)}/>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800">{s.name}</div>
                      <div className="text-gray-400 text-xs">{s.email}</div>
                      <div className="text-gray-400 text-xs">{s.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-2 py-1 rounded-lg">
                        {s.distance?.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-red-600">{s.timing || "—"}</td>
                    <td className="p-3 text-xs text-gray-400 max-w-24 truncate">
                      {s.eventSlug || <span className="text-red-400">missing</span>}
                    </td>
                    <td className="p-3">
                      {s.imageUrl ? (
                        <button onClick={() => setModal(s.imageUrl)}
                          className="text-blue-600 hover:underline text-xs font-semibold">
                          View 🔍
                        </button>
                      ) : "—"}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusBadge(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400 text-xs whitespace-nowrap">
                      {s.createdAt?.slice(0, 10)}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {s.status !== "approved" && (
                          <button onClick={() => approve(s._id)}
                            className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-green-200">✓</button>
                        )}
                        {s.status !== "rejected" && (
                          <button onClick={() => reject(s._id)}
                            className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-red-200">✗</button>
                        )}
                        <button onClick={() => del(s._id)}
                          className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-lg hover:bg-gray-200">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image modal */}
      {modal && (
        <div onClick={() => setModal(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-xl w-full">
            <button onClick={() => setModal(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold">×</button>
            <img src={modal} alt="proof" className="w-full rounded-2xl shadow-2xl"/>
          </div>
        </div>
      )}
    </div>
  );
}