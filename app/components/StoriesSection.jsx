"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* Homepage ka "This Week's Inspiring Journey".
   Sab kuch server se aata hai — heading, tagline, kaunsi kahani.
   Yahan ek bhi kahani hardcode nahi, aur hona bhi nahi chahiye:
   spec ki shart bhi yahi hai, aur admin ko har baar developer ke paas
   nahi aana chahiye. */

const RED = "#c0392b";

export default function StoriesSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/homepage`)
      .then((r) => r.json())
      .then((d) => setData(d?.success ? d : null))
      .catch(() => setData(null));
  }, []);

  // Section band hai, ya API nahi aayi — kuch mat dikhao
  if (!data || !data.enabled) return null;

  const weekly = data.weekly;
  const others = (data.stories || []).filter((s) => s.slug !== weekly?.slug);

  // Admin ne section chalu kiya par koi kahani nahi chuni
  if (!weekly && others.length === 0) {
    if (data.whenEmpty !== "fallback") return null;
    return (
      <section style={{ padding: "64px 60px", background: "#fff" }} className="mob-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <span className="vr-tag">{data.heading}</span>
          <p style={{ fontSize: 15, color: "#888", marginTop: 10 }}>{data.fallbackText}</p>
        </div>
      </section>
    );
  }

  const lead = weekly || others[0];
  const rest = weekly ? others : others.slice(1);

  return (
    <section style={{ padding: "80px 60px", background: "#fff" }} className="mob-pad">
      <style>{css}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="vr-tag">{data.heading}</span>
          <h2 className="mob-h2 vrs-h2">{data.tagline}</h2>
        </div>

        {/* ── Badi kahani ── */}
        <Link href={`/stories/${lead.slug}`} className="vrs-lead">
          {lead.featuredPhoto && (
            <div className="vrs-lead-img">
              <img src={lead.featuredPhoto} alt={lead.title} loading="lazy" />
            </div>
          )}
          <div className="vrs-lead-body">
            {weekly && lead.slug === weekly.slug && (
              <span className="vrs-badge">Valley Run Story of the Week</span>
            )}
            <h3 className="vrs-lead-title">{lead.title}</h3>
            {lead.summary && <p className="vrs-lead-sum">{lead.summary}</p>}
            <div className="vrs-by">
              {lead.name}{lead.city ? ` · ${lead.city}` : ""}
            </div>
            <span className="vrs-read">Read the story →</span>
          </div>
        </Link>

        {/* ── Baaki ── */}
        {rest.length > 0 && (
          <div className="vrs-grid">
            {rest.slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/stories/${s.slug}`} className="vrs-card">
                {s.featuredPhoto && (
                  <div className="vrs-card-img"><img src={s.featuredPhoto} alt={s.title} loading="lazy" /></div>
                )}
                <div className="vrs-card-body">
                  <div className="vrs-card-title">{s.title}</div>
                  <div className="vrs-by" style={{ marginTop: 7 }}>{s.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 38, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/stories" className="vr-btn-secondary">All stories</Link>
          <Link href="/stories/submit" className="vr-btn-primary">Share your story</Link>
        </div>
      </div>
    </section>
  );
}

const css = `
  .vrs-h2 { font-size: 40px; font-weight: 900; letter-spacing: -1.6px; line-height: 1.1;
            margin: 10px 0 0; color: #0a0a0a; }

  .vrs-lead { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0;
              background: #0a0a0a; border-radius: 22px; overflow: hidden;
              text-decoration: none; transition: transform .3s, box-shadow .3s; }
  .vrs-lead:hover { transform: translateY(-4px); box-shadow: 0 24px 50px rgba(0,0,0,.18); }
  .vrs-lead-img { aspect-ratio: 4/3; overflow: hidden; background: #1a1a1a; }
  .vrs-lead-img img { width: 100%; height: 100%; object-fit: cover; display: block;
                      transition: transform .5s cubic-bezier(.2,.7,.3,1); }
  .vrs-lead:hover .vrs-lead-img img { transform: scale(1.04); }
  .vrs-lead-body { padding: 38px 36px; display: flex; flex-direction: column;
                   justify-content: center; }
  .vrs-badge { display: inline-block; align-self: flex-start; font-size: 10px; font-weight: 800;
               letter-spacing: 1.4px; text-transform: uppercase; padding: 6px 14px;
               border-radius: 100px; background: ${RED}; color: #fff; margin-bottom: 16px; }
  .vrs-lead-title { font-size: 30px; font-weight: 900; letter-spacing: -1px; line-height: 1.15;
                    color: #fff; margin: 0; }
  .vrs-lead-sum { font-size: 15.5px; line-height: 1.75; color: rgba(255,255,255,.66);
                  margin: 14px 0 0; }
  .vrs-by { font-size: 12.5px; color: rgba(255,255,255,.45); margin-top: 18px; }
  .vrs-read { font-size: 13.5px; font-weight: 700; color: #fff; margin-top: 22px; }

  .vrs-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
              gap: 16px; margin-top: 16px; }
  .vrs-card { background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden;
              text-decoration: none; transition: transform .25s, border-color .25s, box-shadow .25s; }
  .vrs-card:hover { transform: translateY(-3px); border-color: #f5c6c2;
                    box-shadow: 0 14px 30px rgba(0,0,0,.08); }
  .vrs-card-img { aspect-ratio: 16/10; overflow: hidden; background: #f5f5f5; }
  .vrs-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .vrs-card-body { padding: 15px 16px 17px; }
  .vrs-card-title { font-size: 15.5px; font-weight: 800; color: #0a0a0a; line-height: 1.35;
                    letter-spacing: -.2px; }
  .vrs-card .vrs-by { color: #999; }

  @media (max-width: 900px) {
    .vrs-h2 { font-size: 26px !important; letter-spacing: -.5px !important; }
    .vrs-lead { grid-template-columns: 1fr; }
    .vrs-lead-body { padding: 24px 20px 26px; }
    .vrs-lead-title { font-size: 22px; letter-spacing: -.5px; }
    .vrs-lead-sum { font-size: 14.5px; }
    .vrs-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .vrs-card-title { font-size: 14px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .vrs-lead, .vrs-card, .vrs-lead-img img { transition: none !important; }
    .vrs-lead:hover, .vrs-card:hover { transform: none !important; }
  }
`;
