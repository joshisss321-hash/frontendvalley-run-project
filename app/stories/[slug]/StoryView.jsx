"use client";

import { useState } from "react";
import Link from "next/link";
import { storyCss, badgeLabel } from "../theme";

export default function StoryView({ data, url }) {
  const [copied, setCopied] = useState(false);
  const [removalOpen, setRemovalOpen] = useState(false);

  if (!data?.story) {
    return (
      <div className="st">
        <style>{storyCss}</style>
        <div className="st-wrap" style={{ padding: "90px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 42, marginBottom: 14 }}>📖</div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Story not found</h1>
          <p style={{ color: "#78716c", marginTop: 10, lineHeight: 1.7 }}>
            This story may have been taken down, or the link is wrong.
          </p>
          <Link href="/stories" className="st-btn" style={{ marginTop: 24 }}>
            Read other stories
          </Link>
        </div>
      </div>
    );
  }

  const s = data.story;
  const related = data.related || [];
  const badge = badgeLabel(s.badge);

  const shareText = `${s.title} — a Valley Run story`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard har jagah nahi chalti (http, purane browser) —
      // chup-chaap fail hone se behtar hai link saamne rakh dein
      prompt("Copy this link:", url);
    }
  };

  /* Phone ka apna share sheet — wahi sabse aasan hai. Desktop par
     ye hota hi nahi, isliye button tabhi dikhega jab sach mein ho. */
  const nativeShare = async () => {
    try { await navigator.share({ title: s.title, text: shareText, url }); } catch {}
  };
  const hasNative = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="st">
      <style>{storyCss}</style>

      {/* ── Hero ── */}
      <div className="st-hero">
        <div className="st-hero-in">
          <Link href="/stories" style={{ color: "rgba(255,255,255,.55)", fontSize: 12.5, textDecoration: "none" }}>
            ← Beyond the Finish Line
          </Link>

          {badge && <div style={{ marginTop: 14 }}><span className="st-badge">{badge}</span></div>}

          <h1 className="st-h1">{s.title}</h1>
          {s.summary && <p className="st-lede">{s.summary}</p>}

          <div className="st-meta">
            <strong style={{ color: "#fff" }}>{s.name}</strong>
            {(s.city || s.state) && <span>· {[s.city, s.state].filter(Boolean).join(", ")}</span>}
            {s.eventTitle && <span>· {s.eventTitle}</span>}
            {s.publishedAt && (
              <span>· {new Date(s.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            )}
          </div>
        </div>
      </div>

      <div className="st-wrap" style={{ padding: "34px 20px 70px" }}>

        {s.featuredPhoto && (
          <img src={s.featuredPhoto} alt={s.title} className="st-photo" style={{ marginBottom: 30 }} />
        )}

        <div className="st-body">{s.body}</div>

        {/* Pehli photo upar lag chuki — baaki yahan */}
        {s.photos?.length > 1 && (
          <div className="st-photos">
            {s.photos.slice(1).map((p) => (
              <figure key={p.url} style={{ margin: 0 }}>
                <img src={p.url} alt={p.caption || ""} className="st-photo" />
                {p.caption && (
                  <figcaption style={{ fontSize: 12.5, color: "#a8a29e", marginTop: 7 }}>{p.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* ── Share ── */}
        <div style={{ marginTop: 40, paddingTop: 26, borderTop: "1px solid #ebe8e4" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#44403c" }}>
            Share {s.name === "A Valley Run runner" ? "this story" : `${s.name.split(" ")[0]}'s story`}
          </div>

          <div className="st-share">
            <button onClick={copy} className="st-sh">
              {copied ? "✓ Link copied" : "🔗 Copy link"}
            </button>

            <a className="st-sh st-sh-wa" target="_blank" rel="noopener noreferrer"
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`}>
              WhatsApp
            </a>

            <a className="st-sh st-sh-fb" target="_blank" rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}>
              Facebook
            </a>

            {hasNative && (
              <button onClick={nativeShare} className="st-sh">More…</button>
            )}
          </div>
        </div>

        {/* ── Apni kahani hatane ka raasta ──
            Spec ki shart bhi hai aur sahi baat bhi: jisne kahani di hai
            use wapas lene ka raasta dikhna chahiye, chhupa nahi hona. */}
        <div style={{ marginTop: 26, fontSize: 12, color: "#a8a29e" }}>
          {!removalOpen ? (
            <button onClick={() => setRemovalOpen(true)}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
                color: "#a8a29e", fontSize: 12, textDecoration: "underline", fontFamily: "inherit" }}>
              Is this your story and you want it taken down?
            </button>
          ) : (
            <RemovalForm slug={s.slug} onDone={() => setRemovalOpen(false)} />
          )}
        </div>

        {/* ── Aur kahaniyan ── */}
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div className="st-eyebrow" style={{ color: "#dc2626" }}>More stories</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.6px", margin: "8px 0 20px" }}>
              Beyond the Finish Line
            </h2>
            <div className="st-grid">
              {related.map((r) => <StoryCard key={r.slug} s={r} />)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 50, textAlign: "center" }}>
          <Link href="/stories/submit" className="st-btn st-btn-ghost">Share your own story</Link>
        </div>
      </div>
    </div>
  );
}

function RemovalForm({ slug, onDone }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    if (!email.trim()) { setMsg("Please enter the email you submitted with."); return; }
    setBusy(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${slug}/removal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), note }),
      });
      const data = await res.json();
      setMsg(data.message || (data.success ? "Done." : "Could not do that."));
      if (data.success) setTimeout(onDone, 3500);
    } catch {
      setMsg("Could not reach the server. Please try again.");
    }
    setBusy(false);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #ebe8e4", borderRadius: 14, padding: 16, marginTop: 10 }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#44403c", marginBottom: 4 }}>
        Take my story down
      </div>
      <p style={{ fontSize: 12.5, color: "#78716c", lineHeight: 1.65, margin: "0 0 12px" }}>
        Use the email address you sent the story from. It comes offline straight away,
        and our team will confirm by email.
      </p>
      <input className="st-input" placeholder="Your email" value={email}
        onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 9 }} />
      <input className="st-input" placeholder="Anything you'd like to tell us (optional)" value={note}
        onChange={(e) => setNote(e.target.value)} />
      <div style={{ display: "flex", gap: 9, marginTop: 11, flexWrap: "wrap" }}>
        <button onClick={submit} disabled={busy} className="st-btn" style={{ padding: "11px 20px", fontSize: 13.5 }}>
          {busy ? "Sending…" : "Take it down"}
        </button>
        <button onClick={onDone} className="st-btn st-btn-ghost" style={{ padding: "11px 20px", fontSize: 13.5 }}>
          Cancel
        </button>
      </div>
      {msg && <div style={{ fontSize: 12.5, color: "#44403c", marginTop: 10 }}>{msg}</div>}
    </div>
  );
}

/* `feature` = pehli, badi kahani (magazine jaisi). Photo ke bina bada
   do-column layout khaali dikhta hai, isliye photo ho tabhi. */
export function StoryCard({ s, feature = false }) {
  const badge = badgeLabel(s.badge);
  const big = feature && !!s.featuredPhoto;

  return (
    <Link
      href={`/stories/${s.slug}`}
      className={`st-card ${big ? "st-card-feature" : ""}`}
    >
      {s.featuredPhoto && (
        <div className="st-card-img">
          <img src={s.featuredPhoto} alt={s.title} loading={big ? "eager" : "lazy"} />
          {badge && (
            <span className="st-badge" style={{ position: "absolute", top: 11, left: 11 }}>{badge}</span>
          )}
        </div>
      )}
      <div className="st-card-body">
        {!s.featuredPhoto && badge && (
          <span className="st-badge" style={{ marginBottom: 9 }}>{badge}</span>
        )}
        <div className="st-card-title">{s.title}</div>
        {s.summary && <div className="st-card-sum">{s.summary}</div>}
        <div className="st-card-by">
          {s.name}{s.city ? ` · ${s.city}` : ""}
        </div>
        {big && <div className="st-read">Read the story →</div>}
      </div>
    </Link>
  );
}
