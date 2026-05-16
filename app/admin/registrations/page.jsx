"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";

export default function AdminRegistrations() {
  const [events, setEvents]     = useState([]);
  const [regs, setRegs]         = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [eventSlug, setEventSlug] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch]     = useState("");

  useEffect(() => {
    adminAPI.getEvents().then((r) => setEvents(r.events || []));
    load({});
  }, []);

  const load = async (params) => {
    setLoading(true);
    try {
      const res = await adminAPI.getRegistrations(params);
      setRegs(res.registrations || []);
      setTotal(res.total || 0);
    } catch {}
    setLoading(false);
  };

  const applyFilter = (overrides = {}) => {
    const params = { eventSlug, category, search, ...overrides };
    Object.keys(params).forEach((k) => !params[k] && delete params[k]);
    load(params);
  };

  const updateMedal = async (id, medalStatus) => {
    await adminAPI.updateMedalStatus(id, { medalStatus });
    applyFilter();
  };

  // Export to Excel using SheetJS
  const exportExcel = async () => {
    if (!eventSlug) { alert("Select an event first to export"); return; }

    try {
      const res = await adminAPI.exportRegistrations(eventSlug);
      if (!res.rows?.length) { alert("No registrations found"); return; }

      // Dynamic import xlsx
      const XLSX = await import("xlsx");

      const headers = [
        "Sr", "Name", "Email", "Phone", "Category",
        "Address 1", "Address 2", "Landmark", "City", "State", "Pincode",
        "Amount", "Payment ID", "Order ID", "Medal Status", "Tracking ID", "Date"
      ];

      const data = res.rows.map((r) => [
        r.sr, r.name, r.email, r.phone, r.category,
        r.address1, r.address2, r.landmark, r.city, r.state, r.pincode,
        r.amount, r.paymentId, r.orderId, r.medalStatus, r.trackingId, r.date
      ]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      ws["!cols"] = [6,22,28,14,12,24,20,18,14,14,10,10,22,22,14,16,14].map((w) => ({ wch: w }));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registrations");
      XLSX.writeFile(wb, `${res.event || eventSlug}_registrations.xlsx`);
    } catch (err) {
      console.error(err);
      alert("Export failed");
    }
  };

  const exportCSV = () => {
    const headers = ["Sr","Name","Email","Phone","Category","City","State","Pincode","Amount","PaymentID","Medal Status","Date"];
    const rows = regs.map((r, i) => [
      i+1, r.user?.name||"", r.user?.email||"", r.user?.phone||"",
      r.category||"", r.user?.city||"", r.user?.state||"", r.user?.pincode||"",
      r.amount||"", r.paymentId||"", r.medalStatus||"pending",
      r.createdAt?.slice(0,10)||""
    ]);
    const csv = [headers,...rows].map((r)=>r.map((c)=>`"${c||""}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    a.download = `registrations-${eventSlug||"all"}.csv`;
    a.click();
  };

  const medalColors = {
    pending:    "bg-yellow-100 text-yellow-700",
    verified:   "bg-blue-100 text-blue-700",
    dispatched: "bg-purple-100 text-purple-700",
    delivered:  "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Registrations</h1>
          <p className="text-gray-500 text-sm mt-1">{total} total registrations</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportCSV}
            className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50">
            CSV
          </button>
          <button onClick={exportExcel}
            className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-700">
            ⬇ Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
        <select value={eventSlug} onChange={(e) => { setEventSlug(e.target.value); applyFilter({ eventSlug: e.target.value }); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-w-44">
          <option value="">All Events</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev.slug}>{ev.title} ({ev.registrationCount || 0})</option>
          ))}
        </select>

        <select value={category} onChange={(e) => { setCategory(e.target.value); applyFilter({ category: e.target.value }); }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">All Categories</option>
          {["5km","10km","21km"].map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input value={search} onChange={(e) => { setSearch(e.target.value); applyFilter({ search: e.target.value }); }}
          placeholder="Search name, email, phone..."
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 flex-1 min-w-40"/>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : regs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No registrations found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["#","Name","Phone","Category","City/State","Amount","Medal Status","Registered","Action"].map((h) => (
                    <th key={h} className="p-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {regs.map((r, i) => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="p-3 text-gray-400 text-xs">{i+1}</td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-800">{r.user?.name||"—"}</div>
                      <div className="text-gray-400 text-xs">{r.user?.email}</div>
                    </td>
                    <td className="p-3 text-gray-600 text-xs">{r.user?.phone||"—"}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg border border-blue-100">
                        {r.category}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 text-xs">
                      {[r.user?.city, r.user?.state].filter(Boolean).join(", ")||"—"}
                    </td>
                    <td className="p-3 font-bold text-gray-700">
                      {r.amount ? `₹${r.amount}` : "—"}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${medalColors[r.medalStatus] || "bg-gray-100 text-gray-500"}`}>
                        {r.medalStatus || "pending"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400 text-xs whitespace-nowrap">
                      {r.createdAt?.slice(0,10)}
                    </td>
                    <td className="p-3">
                      <select value={r.medalStatus||"pending"} onChange={(e) => updateMedal(r._id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500">
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
