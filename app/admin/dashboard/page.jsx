"use client";

import { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    adminAPI.getStats().then((r) => setStats(r.stats));
    adminAPI.getEvents().then((r) => setEvents((r.events || []).slice(0, 6)));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Registrations", value: stats.totalRegs,    color: "text-red-600",    icon: "👥", href: "/admin/registrations" },
        { label: "Pending Proof",        value: stats.pendingSubs,  color: "text-yellow-600", icon: "⏳", href: "/admin/submissions?status=pending" },
        { label: "Total Revenue",        value: `₹${(stats.totalRevenue || 0).toLocaleString("en-IN")}`, color: "text-green-600", icon: "💰", href: null },
        { label: "Active Events",        value: stats.totalEvents,  color: "text-blue-600",   icon: "📅", href: "/admin/events" },
      ]
    : [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="text-gray-500 text-xs mb-1">{c.label}</div>
            <div className={`text-2xl font-black ${c.color}`}>{c.value ?? "—"}</div>
            {c.href && (
              <Link href={c.href} className="text-gray-400 text-xs mt-2 block hover:text-red-500 transition-colors">
                View all →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      {stats?.dailyChart && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="text-sm font-bold text-gray-700 mb-4">Registrations — Last 7 Days</div>
          <div className="flex items-end gap-2 h-24">
            {stats.dailyChart.map((d, i) => {
              const max = Math.max(...stats.dailyChart.map((x) => x.count), 1);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-gray-400">{d.count}</div>
                  <div
                    className="w-full bg-red-500 rounded-t-sm transition-all"
                    style={{ height: `${Math.max((d.count / max) * 72, 4)}px` }}
                  />
                  <div className="text-xs text-gray-400">{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Per-event stats */}
        {stats?.eventStats?.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-sm font-bold text-gray-700 mb-4">Per Event</div>
            <div className="space-y-3">
              {stats.eventStats.map((ev) => (
                <div key={ev.slug} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 truncate max-w-44">{ev.title}</div>
                    {ev.pendingSubmissions > 0 && (
                      <div className="text-yellow-600 text-xs">{ev.pendingSubmissions} pending proofs</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-black text-lg">{ev.registrations}</div>
                    <div className="text-gray-400 text-xs">registered</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-sm font-bold text-gray-700 mb-4">Quick Actions</div>
          <div className="flex flex-col gap-2">
            <Link href="/admin/submissions?status=pending"
              className="bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-yellow-100 transition-colors flex items-center justify-between">
              <span>⏳ Review Pending Proofs</span>
              <span className="bg-yellow-200 text-yellow-800 text-xs font-black px-2 py-0.5 rounded-full">{stats?.pendingSubs || 0}</span>
            </Link>
            <Link href="/admin/registrations"
              className="bg-green-50 border border-green-200 text-green-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-green-100 transition-colors">
              📊 Download Excel — All Registrations
            </Link>
            <Link href="/admin/events/create"
              className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors">
              + Create New Event
            </Link>
            <Link href="/admin/medal-reviews"
              className="bg-purple-50 border border-purple-200 text-purple-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-purple-100 transition-colors">
              ⭐ Medal Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
