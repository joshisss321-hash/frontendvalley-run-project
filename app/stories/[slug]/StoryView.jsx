"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { storyCss, badgeLabel } from "../theme";

export default function StoryView({ data, url }) {
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
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
  const anon = s.name === "A Valley Run runner";

  const place = [s.city, s.state].filter(Boolean).join(", ");
  const date = s.publishedAt
    ? new Date(s.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  /* Kahani ko paragraph mein todna. Log form mein enter dabate hain,
     isliye khali line par todte hain; ek hi lamba block ho to ek hi
     paragraph rahega — hum uske andar apne se cheera nahi lagate. */
  const paras = String(s.body || "")
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  /* Ubhri hui line beech mein achhi lagti hai, shuru mein nahi.
     Quote hamesha kahani ke andar ka hi vaakya hota hai — server
     isse jaanchta hai, isliye yahan bas dikhana hai. */
  const quoteAt = s.pullQuote ? (paras.length >= 4 ? 2 : paras.length >= 2 ? 1 : paras.length) : -1;

  const rest = (s.photos || []).filter((p) => p.url && p.url !== s.featuredPhoto);
  const shareText = `${s.title} — a Valley Run story`;

  /* Link copy karna.

     ⚠️ Yahan teen raaste hain, kyunki clipboard har jagah nahi
     chalti. Hamare zyada log WhatsApp aur Instagram ke apne browser
     se aate hain, aur wahan navigator.clipboard aksar mana kar deta
     hai. Pehle naya tareeka, phir purana execCommand, aur dono fail
     hon to link khud saamne rakh dete hain — chup-chaap fail hona
     sabse bura hai, kyunki user ko lagta hai copy ho gaya. */
  const copy = async () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };

    try {
      await navigator.clipboard.writeText(url);
      return done();
    } catch {}

    try {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, url.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) return done();
    } catch {}

    setShowLink(true);
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

      {/* ═══ SIRA ═══ */}
      <header className="sd-top">
        <div className="sd-top-in">
          <Link href="/stories" className="sd-back">← Beyond the Finish Line</Link>

          <span className="sd-kicker">Valley Run Stories</span>

          {badge && <div style={{ marginTop: 11 }}><span className="st-badge">{badge}</span></div>}

          <h1 className="sd-h1">{s.title}</h1>
          {s.summary && <p className="sd-lede">{s.summary}</p>}

          {/* Lekhak */}
          <div className="sd-by">
            <div className="sd-ava" aria-hidden="true">
              {anon ? "VR" : s.name.trim().charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="sd-by-name">{s.name}</div>
              <div className="sd-by-meta">
                {place && <span><Pin />{place}</span>}
                {s.eventTitle && <span><Medal />{s.eventTitle}</span>}
                {date && <span><Cal />{date}</span>}
                {/* Server ye tabhi bhejta hai jab runner ne alag se
                    haan ki ho — yahan dobara jaanchne ki zaroorat nahi. */}
                {s.instaId && (
                  <a href={`https://instagram.com/${String(s.instaId).replace(/^@+/, "")}`}
                    target="_blank" rel="noopener noreferrer">
                    <Insta />@{String(s.instaId).replace(/^@+/, "")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ PEHLI PHOTO ═══
          width/height nahi dete kyunki asli naap pata nahi — par
          `height: auto` aur apna aspect-ratio hone se tasveer kabhi
          khinchti nahi. */}
      {s.featuredPhoto && (
        <div className="sd-lead">
          <img src={s.featuredPhoto} alt={`${s.name} — ${s.title}`} />
        </div>
      )}

      {/* ═══ KAHANI ═══ */}
      <article className="sd sd-article">
        <div className="sd-body">
          {/* Fragment, wrapper div nahi — warna har paragraph apne
              dabbe ka akela bachcha ban jaata hai aur
              `p:last-child` sab par lag kar beech ka gap kha jaata
              hai. Ye hua bhi tha. */}
          {paras.map((p, i) => (
            <Fragment key={i}>
              {i === quoteAt && <PullQuote text={s.pullQuote} name={s.name} anon={anon} />}
              <p>{p}</p>
            </Fragment>
          ))}
          {quoteAt >= paras.length && <PullQuote text={s.pullQuote} name={s.name} anon={anon} />}
        </div>

        {/* Baaki photos */}
        {rest.length > 0 && (
          <div className={`sd-gal ${rest.length === 1 ? "sd-gal-one" : ""}`}>
            {rest.map((p) => (
              <figure key={p.url}>
                <img src={p.url} alt={p.caption || `${s.name} — ${s.title}`} loading="lazy" />
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {/* ═══ BAANTO ═══ */}
        <section className="sd-share">
          <div className="sd-share-h">Share this journey</div>
          <p className="sd-share-p">
            If this story inspired you, share it with someone who needs a little
            motivation today.
          </p>

          <div className="sd-btns">
            <a className="sd-b sd-b-wa" target="_blank" rel="noopener noreferrer"
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`}>
              <Wa /> WhatsApp
            </a>

            <a className="sd-b sd-b-fb" target="_blank" rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}>
              <Fb /> Facebook
            </a>

            <button onClick={copy} className={`sd-b ${copied ? "sd-b-ok" : ""}`}>
              {copied ? <><Tick /> Link copied</> : <><LinkIco /> Copy link</>}
            </button>

            {hasNative && (
              <button onClick={nativeShare} className="sd-b"><Share /> More</button>
            )}
          </div>

          {/* Copy na ho paayi — link khud saamne, chuna hua, taaki
              user ek dabaane mein le le. */}
          {showLink && (
            <div className="sd-linkbox">
              <label htmlFor="sd-url">Your browser blocked copying. Here is the link:</label>
              <input id="sd-url" readOnly value={url} onFocus={(e) => e.target.select()}
                onClick={(e) => e.target.select()} />
            </div>
          )}
        </section>

        {/* ── Apni kahani hatane ka raasta ──
            Spec ki shart bhi hai aur sahi baat bhi: jisne kahani di
            hai use wapas lene ka raasta dikhna chahiye, chhupa nahi. */}
        <div className="sd-takedown">
          {!removalOpen ? (
            <button onClick={() => setRemovalOpen(true)}>
              Is this your story and you want it taken down?
            </button>
          ) : (
            <RemovalForm slug={s.slug} onDone={() => setRemovalOpen(false)} />
          )}
        </div>
      </article>

      {/* ═══ AUR KAHANIYAN ═══ */}
      {related.length > 0 && (
        <section className="sd-more">
          <div className="sd-more-in">
            <span className="st-eyebrow" style={{ color: "#dc2626" }}>Keep reading</span>
            <h2 className="sd-more-h">Beyond the Finish Line</h2>
            <p className="sd-more-p">More journeys. More inspiration.</p>
            <div className="st-grid">
              {related.map((r) => <StoryCard key={r.slug} s={r} />)}
            </div>
          </div>
        </section>
      )}

      {/* ═══ AAKHRI BULAWA ═══ */}
      <section className="sc-cta" style={{ marginTop: related.length > 0 ? 0 : 54 }}>
        <div className="st-wrap">
          <h2 className="sc-cta-h">Your journey could inspire someone.</h2>
          <p className="sc-cta-p">
            You do not need to be a professional athlete to inspire someone. Every step,
            every challenge and every achievement matters.
          </p>
          <Link href="/stories/submit" className="st-btn">Share your story</Link>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.4)", marginTop: 16 }}>
            Your story might be the motivation someone needs to begin.
          </p>
        </div>
      </section>
    </div>
  );
}

/* Kahani ke andar se chuni hui ek line. Likhi nahi gayi — chuni gayi:
   server save karte waqt jaanchta hai ki ye vaakya sach mein kahani
   mein hai. */
function PullQuote({ text, name, anon }) {
  if (!text) return null;
  return (
    <blockquote className="sd-quote">
      <p>“{text}”</p>
      {!anon && name && <cite>{name}</cite>}
    </blockquote>
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
          <img src={s.featuredPhoto} alt={`${s.name} — ${s.title}`} loading={big ? "eager" : "lazy"} />
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
        <span className="sd-read">Read story →</span>
      </div>
    </Link>
  );
}

/* ── Icons ──
   Inline SVG: koi icon library nahi chahiye, aur ye currentColor
   lete hain isliye dark aur light dono par theek dikhte hain. */
const lineIco = { className: "sd-ico", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };

const Pin = () => (
  <svg {...lineIco}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const Cal = () => (
  <svg {...lineIco}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
const Medal = () => (
  <svg {...lineIco}><circle cx="12" cy="15" r="6" /><path d="m9 9-3-7M15 9l3-7M9.5 15l1.8 1.6 3.2-3.4" /></svg>
);
const Insta = () => (
  <svg {...lineIco}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);

const solidIco = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": "true" };

const Wa = () => (
  <svg {...solidIco} fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.17L2 22l4.95-1.6A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.2 15.03l-.3-.18-2.94.95.96-2.86-.2-.3A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.1c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.18s.94 2.53 1.07 2.7c.13.18 1.82 2.9 4.5 3.95 2.22.87 2.67.7 3.15.65.48-.04 1.56-.63 1.78-1.25.22-.62.22-1.15.15-1.26-.06-.1-.24-.17-.5-.3-.27-.13-1.56-.78-1.8-.86-.24-.09-.42-.13-.6.13-.17.26-.68.86-.83 1.04-.16.17-.3.2-.57.07-.26-.14-1.1-.41-2.1-1.3a7.9 7.9 0 0 1-1.46-1.8c-.15-.27-.01-.41.12-.54.12-.12.26-.3.4-.46.12-.15.16-.26.25-.44.09-.17.04-.33-.02-.46-.07-.13-.6-1.42-.82-1.95-.19-.46-.38-.4-.52-.41h-.45Z" /></svg>
);
const Fb = () => (
  <svg {...solidIco} fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
);
const LinkIco = () => (
  <svg {...solidIco} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const Tick = () => (
  <svg {...solidIco} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m20 6-11 11-5-5" />
  </svg>
);
const Share = () => (
  <svg {...solidIco} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);
