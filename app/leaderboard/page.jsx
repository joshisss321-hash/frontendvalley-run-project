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
      .then((r) => r.json())
      .then((d) => { setEvents(d.events || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const liveEvents = events.filter((e) => e.active && !e.isPrevious);
  const pastEvents = events.filter((e) => e.active && e.isPrevious);

  return (
    <div className="lbi">
      <style>{css}</style>
      <Navbar />

      <div className="lbi-hero">
        <div className="lbi-hero-in">
          <span className="lbi-tag">🏆 Leaderboards</span>
          <h1 className="lbi-title">Event Leaderboards</h1>
          <p className="lbi-sub">Ranked by time · updated automatically</p>
        </div>
      </div>

      <div className="lbi-wrap">
        {loading ? (
          <div className="lbi-empty">Loading…</div>
        ) : (
          <>
            {liveEvents.length > 0 && (
              <section className="lbi-sec">
                <div className="lbi-head">
                  <span className="lbi-dot" /> Active events
                </div>
                {liveEvents.map((ev) => (
                  <Link key={ev._id} href={`/leaderboard/${ev.slug}`} className="lbi-card lbi-card-live">
                    <div className="lbi-card-main">
                      <span className="lbi-live">● LIVE</span>
                      <div className="lbi-name">{ev.title}</div>
                      {ev.dates && <div className="lbi-dates">{ev.dates}</div>}
                    </div>
                    <span className="lbi-go">View →</span>
                  </Link>
                ))}
              </section>
            )}

            {pastEvents.length > 0 && (
              <section className="lbi-sec">
                <div className="lbi-head lbi-head-muted">
                  <span className="lbi-dot lbi-dot-off" /> Previous events
                </div>
                {pastEvents.map((ev) => (
                  <Link key={ev._id} href={`/leaderboard/${ev.slug}`} className="lbi-card">
                    <div className="lbi-card-main">
                      <div className="lbi-name lbi-name-past">{ev.title}</div>
                      {ev.dates && <div className="lbi-dates">{ev.dates}</div>}
                    </div>
                    <span className="lbi-go lbi-go-past">Results →</span>
                  </Link>
                ))}
              </section>
            )}

            {liveEvents.length === 0 && pastEvents.length === 0 && (
              <div className="lbi-empty">
                <div className="lbi-empty-ico">🏃</div>
                <div className="lbi-empty-h">No events yet</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const css = `
  .lbi { min-height: 100vh; background: #f6f7f9;
         font-family: 'Inter', system-ui, -apple-system, sans-serif; }

  .lbi-hero { background: linear-gradient(135deg,#dc2626,#991b1b); padding: 32px 18px 28px; }
  .lbi-hero-in { max-width: 680px; margin: 0 auto; text-align: center; }
  .lbi-tag { display: inline-block; background: rgba(255,255,255,.18); color: #fff;
             font-size: 10.5px; font-weight: 800; letter-spacing: 1.6px;
             text-transform: uppercase; padding: 5px 13px; border-radius: 100px; }
  .lbi-title { font-size: clamp(22px,4.6vw,34px); font-weight: 900; color: #fff;
               letter-spacing: -.8px; margin: 12px 0 0; }
  .lbi-sub { color: rgba(255,255,255,.78); font-size: 13px; margin: 7px 0 0; }

  .lbi-wrap { max-width: 680px; margin: 0 auto; padding: 22px 14px 64px; }
  .lbi-sec + .lbi-sec { margin-top: 28px; }

  .lbi-head { display: flex; align-items: center; gap: 8px; margin-bottom: 11px;
              font-size: 11.5px; font-weight: 800; letter-spacing: 1.3px;
              text-transform: uppercase; color: #374151; }
  .lbi-head-muted { color: #9ca3af; }
  .lbi-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
             box-shadow: 0 0 0 3px rgba(34,197,94,.2); }
  .lbi-dot-off { background: #d1d5db; box-shadow: none; }

  /* Card ek flex row — pehle title aur button ek dusre ko dabate the,
     aur lamba naam wrap hokar button ko neeche dhakel deta tha. */
  .lbi-card { display: flex; align-items: center; gap: 12px; text-decoration: none;
              background: #fff; border: 1px solid #e8eaed; border-radius: 16px;
              padding: 15px 16px; margin-bottom: 10px; transition: all .2s; }
  .lbi-card:hover { border-color: #dc2626; transform: translateY(-2px);
                    box-shadow: 0 10px 24px rgba(0,0,0,.07); }
  .lbi-card-live { border: 1.5px solid #fca5a5; }

  .lbi-card-main { flex: 1; min-width: 0; }
  .lbi-live { display: inline-block; background: #dcfce7; color: #166534;
              font-size: 9.5px; font-weight: 800; letter-spacing: .6px;
              padding: 3px 9px; border-radius: 100px; margin-bottom: 6px; }
  .lbi-name { font-size: 15.5px; font-weight: 800; color: #1f2937;
              line-height: 1.35; letter-spacing: -.2px; }
  .lbi-name-past { font-weight: 700; color: #4b5563; font-size: 14.5px; }
  .lbi-dates { font-size: 11.5px; color: #9ca3af; margin-top: 3px;
               overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .lbi-go { flex-shrink: 0; background: #dc2626; color: #fff; font-size: 12.5px;
            font-weight: 800; padding: 9px 16px; border-radius: 100px; white-space: nowrap; }
  .lbi-go-past { background: #f3f4f6; color: #6b7280; }

  .lbi-empty { background: #fff; border: 1px solid #e8eaed; border-radius: 18px;
               padding: 50px 20px; text-align: center; color: #9ca3af; font-size: 14px; }
  .lbi-empty-ico { font-size: 42px; margin-bottom: 10px; }
  .lbi-empty-h { font-size: 17px; font-weight: 800; color: #1f2937; }

  @media (max-width: 480px) {
    .lbi-hero { padding: 26px 16px 24px; }
    .lbi-wrap { padding: 18px 12px 56px; }
    .lbi-card { padding: 13px 13px; gap: 10px; }
    .lbi-name { font-size: 14.5px; }
    .lbi-go { padding: 8px 13px; font-size: 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lbi-card { transition: none; }
    .lbi-card:hover { transform: none; }
  }
`;
