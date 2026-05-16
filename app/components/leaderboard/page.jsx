"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function LeaderboardIndex() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then(r => r.json())
      .then(d => {
        setEvents(d.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const liveEvents = events.filter(e => e.active && !e.isPrevious);
  const pastEvents = events.filter(e => e.active && e.isPrevious);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)", padding: "50px 20px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
          🏆 Leaderboards
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, color: "white", margin: "0 0 8px" }}>
          Event Leaderboards
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
          Ranked by completion time · Updated automatically
        </p>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 16px 60px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>Loading...</div>
        ) : (
          <>
            {/* Live Events */}
            {liveEvents.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }}/>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#374151", textTransform: "uppercase", letterSpacing: 1 }}>
                    Active Events
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {liveEvents.map(ev => (
                    <Link key={ev._id} href={`/leaderboard/${ev.slug}`}
                      style={{ textDecoration: "none" }}>
                      <div style={{
                        background: "white", border: "2px solid #dc2626",
                        borderRadius: 16, padding: "20px 24px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        boxShadow: "0 4px 16px rgba(220,38,38,0.1)",
                        cursor: "pointer", transition: "transform 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ background: "#dcfce7", color: "#166534", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>● LIVE</span>
                          </div>
                          <div style={{ fontWeight: 800, fontSize: 17, color: "#1f2937", marginBottom: 2 }}>{ev.title}</div>
                          <div style={{ color: "#9ca3af", fontSize: 12 }}>{ev.dates}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ background: "#dc2626", color: "white", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 50 }}>
                            View 🏆
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9ca3af", display: "inline-block" }}/>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1 }}>
                    Previous Events
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {pastEvents.map(ev => (
                    <Link key={ev._id} href={`/leaderboard/${ev.slug}`}
                      style={{ textDecoration: "none" }}>
                      <div style={{
                        background: "white", border: "1px solid #e5e7eb",
                        borderRadius: 14, padding: "16px 20px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#374151", marginBottom: 2 }}>{ev.title}</div>
                          <div style={{ color: "#9ca3af", fontSize: 12 }}>{ev.dates}</div>
                        </div>
                        <div style={{ color: "#9ca3af", fontWeight: 600, fontSize: 13 }}>
                          Results →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {liveEvents.length === 0 && pastEvents.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, background: "white", borderRadius: 20, border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 50, marginBottom: 12 }}>🏃</div>
                <div style={{ fontWeight: 700, color: "#1f2937", fontSize: 18 }}>No events yet</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}