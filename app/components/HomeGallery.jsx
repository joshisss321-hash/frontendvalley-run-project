"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Homepage ka gallery section.

   Pehle yahan sirf 8 photo dikhti thin, bina kisi event ke naam ke, aur
   baaki 39 kabhi dikhti hi nahi thin. Ab saari photos ek jagah, event ke
   hisaab se chhant kar, aur ek dhang ke lightbox ke saath.

   INSTAGRAM: abhi feed API se nahi aati — niche sirf asli call-to-action
   hai (tag karo, feature hoge). API jodna ho to is file mein sirf `shots`
   banane wali jagah badalni padegi, baaki sab waisa hi rahega. */

const IG_HANDLE = "valleyrunofficial";
const IG_URL    = `https://www.instagram.com/${IG_HANDLE}/`;

const STEP = 12;

/* Event ka poora naam chip par bahut lamba lagta hai —
   "National Unity Day Virtual Run 2026 – Run for Unity" ko chhota karo. */
const shortName = (title = "") =>
  title
    .replace(/\s*\|\|.*$/, "")       // "|| 5km | 10km" wala hissa hata do
    .replace(/\s*\d{4}\s*$/, "")     // aakhir ka saal
    .replace(/Virtual\s+/i, "")
    .trim() || title;

/* Homepage ek section ke taur par use karta hai (apna heading ke saath),
   aur /gallery page poore page ke taur par — jahan upar apna hero pehle se
   hai, isliye wahan heading band aur zyada photos ek saath. */
export default function HomeGallery({
  events = [],
  showHeading = true,
  initial = 12,
  padded = true,
}) {
  const [filter, setFilter] = useState("all");
  const [limit, setLimit]   = useState(initial);
  const [lb, setLb]         = useState(null);

  /* Purane ImageKit account wali kaafi photos ab 403 deti hain. Unka
     khaali dabba dikhne se accha hai ki tile hi gायब ho jaye — aur ginti
     bhi utni hi dikhe jitni sach mein khulti hain. */
  const [dead, setDead] = useState(() => new Set());
  const markDead = (src) =>
    setDead((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  /* Har photo ke saath uska event bhi — lightbox mein naam dikhana hai */
  const shots = useMemo(() => {
    const out = [];
    for (const ev of events) {
      for (const src of ev.gallery || []) {
        if (src && !dead.has(src)) out.push({ src, event: ev.title || "", slug: ev.slug || "" });
      }
    }
    return out.reverse(); // naye event pehle
  }, [events, dead]);

  /* Sirf wahi events jinki photos sach mein hain */
  const tabs = useMemo(() => {
    const seen = new Map();
    for (const s of shots) {
      if (!seen.has(s.slug)) seen.set(s.slug, { slug: s.slug, label: shortName(s.event), n: 0 });
      seen.get(s.slug).n++;
    }
    return [...seen.values()];
  }, [shots]);

  const visible = useMemo(
    () => (filter === "all" ? shots : shots.filter((s) => s.slug === filter)),
    [shots, filter]
  );

  const shown = visible.slice(0, limit);

  // Filter badla to wapas pehle batch par
  useEffect(() => { setLimit(initial); }, [filter, initial]);

  /* ── Lightbox ke keyboard controls ── */
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     setLb(null);
      if (e.key === "ArrowRight") setLb((p) => (p + 1) % visible.length);
      if (e.key === "ArrowLeft")  setLb((p) => (p - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    // Peeche ka page scroll na ho
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lb, visible.length]);

  /* ── Mobile par swipe ── */
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      setLb((p) => (dx < 0 ? (p + 1) % visible.length : (p - 1 + visible.length) % visible.length));
    }
    touchX.current = null;
  };

  if (!shots.length) return null;

  return (
    <section className="vrg" style={{ padding: padded ? "88px 60px" : "0 60px 72px", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      {/* Halki laal roshni — flat kaala sapaat lagta hai */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 900, height: 500, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(192,57,43,.18), transparent 70%)",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* ── Header ── */}
        <div className="vrg-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 28, flexWrap: "wrap" }}>
          <div>
            {showHeading && (
              <>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#c0392b" }}>
                  Gallery
                </span>
                <h2 className="vrg-h2" style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, color: "#fff", marginTop: 6 }}>
                  Moments of Glory
                </h2>
              </>
            )}
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", marginTop: showHeading ? 10 : 0 }}>
              {shots.length} photos from {tabs.length} challenges — real runners, real medals.
            </p>
          </div>

          <a href={IG_URL} target="_blank" rel="noopener noreferrer"
            className="vrg-ig"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none",
              padding: "11px 20px", borderRadius: 100, color: "#fff", fontSize: 13, fontWeight: 700,
              border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.05)",
              transition: "all .25s",
            }}>
            <InstagramIcon />
            @{IG_HANDLE}
          </a>
        </div>

        {/* ── Event filter ── */}
        {tabs.length > 1 && (
          <div className="vrg-tabs">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              All <span style={{ opacity: .5 }}>{shots.length}</span>
            </Chip>
            {tabs.map((t) => (
              <Chip key={t.slug} active={filter === t.slug} onClick={() => setFilter(t.slug)}>
                {t.label} <span style={{ opacity: .5 }}>{t.n}</span>
              </Chip>
            ))}
          </div>
        )}

        {/* ── Photo wall ──
            CSS columns se masonry: kitni bhi photo ho, khaali jagah nahi bachti. */}
        <div className="vrg-wall">
          {shown.map((s, i) => (
            <figure key={`${s.src}-${i}`} className="vrg-tile" onClick={() => setLb(i)}>
              <img
                src={s.src}
                alt={s.event ? `${s.event} — Valley Run` : "Valley Run"}
                loading="lazy"
                onError={() => markDead(s.src)}
              />
              <figcaption>
                <span className="vrg-cap-text">{shortName(s.event)}</span>
                <span className="vrg-cap-icon" aria-hidden="true">⤢</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ── Aur dikhao ── */}
        {shown.length < visible.length && (
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <button onClick={() => setLimit((n) => n + STEP)} className="vrg-more">
              Show more photos
              <span style={{ opacity: .5, fontWeight: 600 }}>
                {shown.length} / {visible.length}
              </span>
            </button>
          </div>
        )}

        {/* ── Instagram CTA ── */}
        <div className="vrg-cta">
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-.4px" }}>
              Get featured on our page
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginTop: 6, lineHeight: 1.6 }}>
              Post your medal photo and tag <strong style={{ color: "#fff" }}>@{IG_HANDLE}</strong> —
              we share runners&apos; posts on our page every week.
            </p>
          </div>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="vrg-cta-btn">
            <InstagramIcon />
            Follow on Instagram
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lb !== null && visible[lb] && (
        <div
          onClick={() => setLb(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          style={{
            position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.95)",
            backdropFilter: "blur(14px)", display: "flex", alignItems: "center",
            justifyContent: "center", padding: 20,
          }}
        >
          <button onClick={() => setLb(null)} aria-label="Close" className="vrg-lb-btn" style={{ top: 18, right: 18, width: 44, height: 44 }}>×</button>

          {visible.length > 1 && (
            <>
              <button aria-label="Previous" className="vrg-lb-btn vrg-lb-nav" style={{ left: 18 }}
                onClick={(e) => { e.stopPropagation(); setLb((p) => (p - 1 + visible.length) % visible.length); }}>‹</button>
              <button aria-label="Next" className="vrg-lb-btn vrg-lb-nav" style={{ right: 18 }}
                onClick={(e) => { e.stopPropagation(); setLb((p) => (p + 1) % visible.length); }}>›</button>
            </>
          )}

          <img
            src={visible[lb].src}
            alt={visible[lb].event || "Valley Run"}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "82vh", maxWidth: "90vw", objectFit: "contain", borderRadius: 12, boxShadow: "0 30px 90px rgba(0,0,0,.6)" }}
          />

          <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", pointerEvents: "none", padding: "0 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{visible[lb].event}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 4 }}>
              {lb + 1} / {visible.length}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .vrg-wall{column-count:4;column-gap:14px}
        .vrg-tile{margin:0 0 14px;break-inside:avoid;position:relative;border-radius:14px;overflow:hidden;cursor:zoom-in;background:#141414;display:block}
        .vrg-tile img{width:100%;height:auto;display:block;transition:transform .5s cubic-bezier(.2,.7,.3,1)}
        .vrg-tile figcaption{position:absolute;inset:auto 0 0 0;display:flex;align-items:center;justify-content:space-between;gap:10;
          padding:26px 14px 12px;background:linear-gradient(to top,rgba(0,0,0,.85),transparent);
          opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}
        .vrg-cap-text{font-size:12px;font-weight:700;color:#fff;letter-spacing:.2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .vrg-cap-icon{font-size:14px;color:rgba(255,255,255,.75);flex-shrink:0;margin-left:10px}
        .vrg-tile:hover img{transform:scale(1.06)}
        .vrg-tile:hover figcaption{opacity:1;transform:translateY(0)}
        .vrg-tile::after{content:"";position:absolute;inset:0;border-radius:14px;border:2px solid transparent;transition:border-color .3s;pointer-events:none}
        .vrg-tile:hover::after{border-color:rgba(192,57,43,.55)}

        .vrg-ig:hover{background:rgba(192,57,43,.18)!important;border-color:rgba(192,57,43,.6)!important}

        /* Desktop par chips wrap hote hain — chhupa hua horizontal scroll
           kisi ko dikhta nahi, log samajh hi nahi paate ki aur chips hain. */
        .vrg-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
        .vrg-tabs::-webkit-scrollbar{height:0}

        .vrg-more{display:inline-flex;align-items:center;gap:10px;padding:13px 28px;border-radius:100px;cursor:pointer;
          background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);color:#fff;font-size:14px;font-weight:700;
          font-family:inherit;transition:all .25s}
        .vrg-more:hover{background:rgba(192,57,43,.2);border-color:rgba(192,57,43,.6);transform:translateY(-2px)}

        .vrg-cta{margin-top:48px;padding:28px 32px;border-radius:20px;display:flex;align-items:center;justify-content:space-between;
          gap:24px;flex-wrap:wrap;border:1px solid rgba(255,255,255,.1);
          background:linear-gradient(120deg,rgba(192,57,43,.16),rgba(255,255,255,.03))}
        .vrg-cta-btn{display:inline-flex;align-items:center;gap:9px;padding:13px 26px;border-radius:100px;text-decoration:none;
          background:#c0392b;color:#fff;font-size:14px;font-weight:700;white-space:nowrap;transition:all .25s}
        .vrg-cta-btn:hover{background:#a93226;transform:translateY(-2px);box-shadow:0 12px 30px rgba(192,57,43,.35)}

        .vrg-lb-btn{position:absolute;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;
          border-radius:50%;cursor:pointer;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;
          font-family:inherit;transition:background .2s}
        .vrg-lb-btn:hover{background:rgba(255,255,255,.22)}
        .vrg-lb-nav{top:50%;transform:translateY(-50%);width:52px;height:52px;font-size:28px}

        @media(max-width:1100px){.vrg-wall{column-count:3}}
        @media(max-width:900px){
          .vrg{padding:64px 20px!important}
          .vrg-h2{font-size:30px!important;letter-spacing:-.5px!important}
          /* Mobile par wrap karne se chips ki 4 line ban jaati hai —
             wahan ek line mein swipe karna behtar hai. */
          .vrg-tabs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:8px}
          .vrg-wall{column-count:2;column-gap:10px}
          .vrg-tile{margin-bottom:10px}
          /* Touch par hover nahi hota — caption hamesha dikhe */
          .vrg-tile figcaption{opacity:1;transform:none;padding:20px 10px 9px}
          .vrg-cap-text{font-size:11px}
          .vrg-cta{padding:22px;flex-direction:column;align-items:flex-start}
          .vrg-lb-nav{width:42px;height:42px;font-size:24px}
        }
        @media(prefers-reduced-motion:reduce){
          .vrg-tile img,.vrg-tile figcaption,.vrg-more,.vrg-cta-btn,.vrg-ig{transition:none!important}
          .vrg-tile:hover img{transform:none}
        }
      `}</style>
    </section>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, padding: "8px 16px", borderRadius: 100, cursor: "pointer",
        fontSize: 12.5, fontWeight: 700, fontFamily: "inherit", whiteSpace: "nowrap",
        transition: "all .2s",
        background: active ? "#c0392b" : "rgba(255,255,255,.06)",
        color:      active ? "#fff"    : "rgba(255,255,255,.65)",
        border: `1px solid ${active ? "#c0392b" : "rgba(255,255,255,.12)"}`,
      }}
    >
      {children}
    </button>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
