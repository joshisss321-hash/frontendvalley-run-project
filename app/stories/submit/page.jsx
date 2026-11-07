"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { storyCss } from "../theme";

const API = process.env.NEXT_PUBLIC_API_URL;

/* Ye wahi vaakya hai jo checkbox ke saath dikhta hai AUR kahani ke
   saath save hota hai. Admin ise Settings se badal sakta hai; tab
   dono jagah wahi badla hua text jaata hai. Jo user ne padha aur jo
   record mein gaya — dono ek hi hone chahiye, warna record ka koi
   matlab nahi. */
const CONSENT_FALLBACK =
  "I confirm that this is my personal story and give Valley Run permission to " +
  "review and publish my submitted story and photographs if selected.";

const MAX_PHOTOS  = 3;
const MAX_MB      = 8;
const OK_TYPES    = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const NO_EVENT    = "__none__";

export default function SubmitStory() {
  const [settings, setSettings] = useState(null);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "", email: "", city: "", state: "", instaId: "",
    title: "", summary: "", body: "",
  });
  const [eventPick, setEventPick] = useState(NO_EVENT);

  /* Har photo: { file, url } — url sirf preview ke liye banaya gaya
     blob hai, hatate waqt use chhodna zaroori hai. */
  const [photos, setPhotos] = useState([]);
  const [photoErr, setPhotoErr] = useState("");

  const [consent, setConsent] = useState(false);       // zaroori
  const [showName, setShowName]   = useState(true);    // marzi
  const [showInsta, setShowInsta] = useState(false);   // marzi

  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch(`${API}/api/stories/settings`)
      .then((r) => r.json())
      .then((d) => setSettings(d?.settings || {}))
      .catch(() => setSettings({}));

    /* Dropdown na mile to form phir bhi chalna chahiye — challenge
       waise bhi optional hai. */
    fetch(`${API}/api/stories/event-options`)
      .then((r) => r.json())
      .then((d) => setEvents(d?.events || []))
      .catch(() => setEvents([]));
  }, []);

  /* Page chhodte waqt preview ke blob chhod do. Ref isliye ki cleanup
     ko aakhri list chahiye, mount wali khali list nahi. */
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const addPhotos = (fileList) => {
    setPhotoErr("");
    const picked = [...fileList];
    const room = MAX_PHOTOS - photos.length;

    const bad = [];
    const good = [];

    for (const f of picked) {
      if (!OK_TYPES.includes(String(f.type).toLowerCase())) { bad.push(`${f.name} — only JPG, PNG or WebP`); continue; }
      if (f.size > MAX_MB * 1024 * 1024)                    { bad.push(`${f.name} — larger than ${MAX_MB} MB`); continue; }
      good.push(f);
    }

    if (good.length > room) {
      bad.push(`You can add up to ${MAX_PHOTOS} photos in total.`);
      good.length = Math.max(0, room);
    }

    setPhotos((list) => [...list, ...good.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    if (bad.length) setPhotoErr(bad.join(" · "));
  };

  const dropPhoto = (i) =>
    setPhotos((list) => {
      URL.revokeObjectURL(list[i].url);
      return list.filter((_, n) => n !== i);
    });

  const submit = async () => {
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.title.trim() || !form.body.trim()) {
      setError("Please fill in your name, email, a title and your story.");
      return;
    }
    if (!consent) {
      setError("Please tick the permission box so we can review and publish your story.");
      return;
    }

    const chosen = events.find((e) => e.slug === eventPick);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v.trim()));
    fd.append("eventTitle", chosen?.title || "");
    fd.append("eventSlug",  chosen?.slug  || "");

    /* Ek hi checkbox kahani aur photo dono ko dhakta hai — wahi text
       user ne padha hai. Naam aur Instagram alag marzi hain. */
    fd.append("consentStory",  "true");
    fd.append("consentPhotos", "true");
    fd.append("consentName",   String(showName));
    fd.append("consentInsta",  String(showInsta && Boolean(form.instaId.trim())));

    photos.forEach((p) => fd.append("photos", p.file));

    setBusy(true);
    try {
      const res = await fetch(`${API}/api/stories`, { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not send your story. Please try again.");
        setBusy(false);
        return;
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Could not reach the server. Please check your connection and try again.");
    }
    setBusy(false);
  };

  /* ── Submissions band ── */
  if (settings && settings.submissionsOpen === false) {
    return (
      <Wrap>
        <div className="st-empty">
          <div style={{ fontSize: 42, marginBottom: 14 }}>📪</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Stories are closed right now</div>
          <p style={{ color: "#78716c", marginTop: 10, lineHeight: 1.7 }}>
            We are reading the ones we have. Come back soon.
          </p>
          <Link href="/stories" className="st-btn" style={{ marginTop: 22 }}>Read stories</Link>
        </div>
      </Wrap>
    );
  }

  /* ── Bhej diya ── */
  if (done) {
    return (
      <Wrap>
        <div className="st-empty">
          <div style={{ fontSize: 42, marginBottom: 14 }}>🙏</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Thank you for sharing your journey</div>
          <p style={{ color: "#78716c", marginTop: 12, lineHeight: 1.75, fontSize: 15 }}>
            Your story has been successfully submitted and is awaiting review.
            Your journey could inspire someone to take their first step.
          </p>
          <Link href="/stories" className="st-btn" style={{ marginTop: 24 }}>Read other stories</Link>
        </div>
      </Wrap>
    );
  }

  const hasInsta = Boolean(form.instaId.trim());

  return (
    <Wrap>
      <div className="sf-card">

        {/* ═══ A — ABOUT YOU ═══ */}
        <Section n="1">About you</Section>

        <Row>
          <F label="Your name" required>
            <input className="st-input" placeholder="Enter your full name"
              value={form.name} onChange={(e) => set("name", e.target.value)} />
          </F>
          <F label="Email address" required hint="Only so we can reach you — never shown publicly">
            <input className="st-input" type="email" placeholder="Enter your email address"
              value={form.email} onChange={(e) => set("email", e.target.value)} />
          </F>
        </Row>

        <Row>
          <F label="City">
            <input className="st-input" placeholder="Your city"
              value={form.city} onChange={(e) => set("city", e.target.value)} />
          </F>
          <F label="State">
            <input className="st-input" placeholder="Your state"
              value={form.state} onChange={(e) => set("state", e.target.value)} />
          </F>
        </Row>

        <F label="Instagram handle" hint="Not shown publicly unless you allow it below">
          <input className="st-input" placeholder="@yourusername"
            value={form.instaId} onChange={(e) => set("instaId", e.target.value)} />
        </F>

        {/* ═══ B — YOUR STORY ═══ */}
        <Section n="2">Your story</Section>

        <F label="Give your story a title" required
          hint="Give your journey a title that describes your experience.">
          <input className="st-input" placeholder="My Journey Towards Fitness"
            value={form.title} onChange={(e) => set("title", e.target.value)} />
        </F>

        <F label="One-line description"
          hint="Write a short introduction to your journey. This may appear on your story card and when your story link is shared.">
          <input className="st-input" placeholder="A small step that changed my life"
            value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </F>

        <F label="Which Valley Run challenge did you participate in?">
          <select className="st-input" value={eventPick} onChange={(e) => setEventPick(e.target.value)}>
            <option value={NO_EVENT}>Not related to a specific Valley Run event</option>
            {events.map((e) => (
              <option key={e.slug || e.title} value={e.slug}>{e.title}</option>
            ))}
          </select>
        </F>

        <F label="Your story" required>
          <textarea className="st-input sf-body"
            placeholder="Tell us how your journey began, what challenges you faced, what you achieved, and what motivates you to keep going. Write naturally, just as you would tell a friend."
            value={form.body} onChange={(e) => set("body", e.target.value)} />
        </F>

        {/* ── Photos ── */}
        <F label="Photos" hint={`Up to ${MAX_PHOTOS} photos · JPG, PNG or WebP · ${MAX_MB} MB each`}>
          <div className="sf-photos">
            {photos.map((p, i) => (
              <div key={p.url} className="sf-thumb">
                <img src={p.url} alt="" />
                <button type="button" onClick={() => dropPhoto(i)} className="sf-x" aria-label="Remove photo">×</button>
              </div>
            ))}

            {photos.length < MAX_PHOTOS && (
              <label className="sf-add">
                <span className="sf-add-plus">+</span>
                <span className="sf-add-t">Add photo</span>
                <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  multiple style={{ display: "none" }}
                  onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} />
              </label>
            )}
          </div>
          {photoErr && <div className="sf-photo-err">{photoErr}</div>}
        </F>

        {/* ══ PERMISSION ══
            Jaan-bujh kar sabse aakhir mein aur alag dabbe mein. Form ke
            beech mein chhota sa checkbox daalna aisa lagta hai jaise
            chhupaya ja raha ho. */}
        <div className="sf-consent">
          <div className="sf-consent-h">Your permission</div>

          <Check checked={consent} onChange={setConsent} strong
            label={settings?.consentText || CONSENT_FALLBACK} />

          <div className="sf-consent-line" />

          <Check checked={showName} onChange={setShowName}
            label="Show my name and city with the story" />
          {!showName && (
            <div className="sf-note">Your story will be published as “A Valley Run runner”.</div>
          )}

          <Check checked={showInsta && hasInsta} onChange={setShowInsta} disabled={!hasInsta}
            label="Show my Instagram handle with the story" />
          {!hasInsta && (
            <div className="sf-note">Add an Instagram handle above if you would like it shown.</div>
          )}

          <div className="sf-consent-foot">
            Nothing is published automatically — our team reads every story first.
            You can ask us to take yours down at any time; there is a link on every
            published story.
          </div>
        </div>

        {error && <div className="sf-error">{error}</div>}

        <button onClick={submit} disabled={busy || !consent} className="st-btn sf-send">
          {busy ? <><span className="sf-spin" /> Sending your story…</> : "Share my story"}
        </button>

        {!consent && !busy && (
          <div className="sf-hint-under">Tick the permission box above to continue</div>
        )}
      </div>
    </Wrap>
  );
}

const Wrap = ({ children }) => (
  <div className="st">
    <style>{storyCss}</style>
    <style>{formCss}</style>
    <div className="st-hero">
      <div className="st-hero-in">
        <Link href="/stories" style={{ color: "rgba(255,255,255,.55)", fontSize: 12.5, textDecoration: "none" }}>
          ← Beyond the Finish Line
        </Link>
        <h1 className="st-h1">Tell us what it took.</h1>
        <p className="st-lede">
          Not the distance — the part nobody saw. The early mornings, the week you
          wanted to quit, the person waiting at the finish.
        </p>
      </div>
    </div>
    <div className="st-wrap" style={{ padding: "30px 20px 70px" }}>{children}</div>
  </div>
);

const Section = ({ n, children }) => (
  <div className="sf-sec">
    <span className="sf-sec-n">{n}</span>
    {children}
  </div>
);

const F = ({ label, hint, required, children }) => (
  <div className="sf-f">
    <label className="st-label">
      {label}
      {required
        ? <span className="sf-req">Required</span>
        : <span className="sf-opt">Optional</span>}
    </label>
    {children}
    {hint && <div className="sf-hint">{hint}</div>}
  </div>
);

const Row = ({ children }) => <div className="sf-row">{children}</div>;

const Check = ({ checked, onChange, label, strong, disabled }) => (
  <label className={`sf-check ${strong ? "sf-check-main" : ""} ${disabled ? "sf-check-off" : ""}`}>
    <input type="checkbox" checked={checked} disabled={disabled}
      onChange={(e) => onChange(e.target.checked)} />
    <span>{label}</span>
  </label>
);

/* Sirf is form ka CSS. Inline styles mein media query nahi likhi
   jaati, aur phone par ye form sabse zyada bhara jaayega. */
const formCss = `
  .sf-card { background: #fff; border: 1px solid #ebe8e4; border-radius: 20px;
             padding: 26px 26px 28px; box-shadow: 0 10px 30px rgba(28,25,23,.045); }

  .sf-sec { display: flex; align-items: center; gap: 10px; margin: 30px 0 16px;
            font-size: 11px; font-weight: 800; letter-spacing: 1.6px;
            text-transform: uppercase; color: #dc2626; }
  .sf-sec:first-child { margin-top: 2px; }
  .sf-sec-n { display: inline-flex; align-items: center; justify-content: center;
              width: 21px; height: 21px; border-radius: 50%; background: #fef2f2;
              border: 1.5px solid #fecaca; color: #dc2626; font-size: 11px; }

  .sf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .sf-f { margin-bottom: 16px; }
  .sf-f .st-label { display: flex; align-items: center; gap: 8px; }
  .sf-req { font-size: 9.5px; font-weight: 800; letter-spacing: .7px; text-transform: uppercase;
            color: #b91c1c; background: #fef2f2; border-radius: 20px; padding: 2.5px 8px; }
  .sf-opt { font-size: 9.5px; font-weight: 700; letter-spacing: .7px; text-transform: uppercase;
            color: #a8a29e; background: #f5f5f4; border-radius: 20px; padding: 2.5px 8px; }
  .sf-hint { font-size: 11.8px; color: #a8a29e; margin-top: 6px; line-height: 1.55; }

  .sf-body { min-height: 240px; resize: vertical; line-height: 1.75; }
  select.st-input { cursor: pointer; }

  /* Photos */
  .sf-photos { display: flex; gap: 11px; flex-wrap: wrap; }
  .sf-thumb { position: relative; width: 104px; height: 104px; border-radius: 13px;
              overflow: hidden; background: #f5f5f4; border: 1px solid #e7e5e4; }
  .sf-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .sf-x { position: absolute; top: 5px; right: 5px; width: 24px; height: 24px;
          border-radius: 50%; border: none; cursor: pointer; font-size: 17px; line-height: 1;
          background: rgba(28,25,23,.72); color: #fff; font-family: inherit;
          display: flex; align-items: center; justify-content: center; }
  .sf-x:hover { background: #dc2626; }
  .sf-add { width: 104px; height: 104px; border-radius: 13px; cursor: pointer;
            border: 2px dashed #d6d3d1; background: #fafaf9; display: flex;
            flex-direction: column; align-items: center; justify-content: center;
            gap: 3px; transition: all .18s; }
  .sf-add:hover { border-color: #dc2626; background: #fef2f2; }
  .sf-add-plus { font-size: 23px; color: #a8a29e; line-height: 1; }
  .sf-add-t { font-size: 11px; font-weight: 700; color: #78716c; }
  .sf-photo-err { font-size: 12px; color: #b91c1c; margin-top: 9px; line-height: 1.55; }

  /* Permission */
  .sf-consent { margin-top: 30px; background: #fffbeb; border: 1.5px solid #fcd34d;
                border-radius: 15px; padding: 18px; }
  .sf-consent-h { font-size: 14px; font-weight: 800; color: #92400e; margin-bottom: 11px; }
  .sf-consent-line { height: 1px; background: #fde68a; margin: 13px 0 4px; }
  .sf-consent-foot { font-size: 11.8px; color: #a16207; margin-top: 13px; line-height: 1.65; }
  .sf-note { font-size: 12px; color: #78350f; margin: 2px 0 4px 29px; line-height: 1.55; }

  .sf-check { display: flex; align-items: flex-start; gap: 11px; cursor: pointer;
              padding: 7px 0; font-size: 13.2px; line-height: 1.62; color: #78350f; }
  .sf-check input { width: 18px; height: 18px; margin-top: 1px; flex-shrink: 0; cursor: pointer;
                    accent-color: #dc2626; }
  .sf-check-main { font-weight: 700; font-size: 13.6px; }
  .sf-check-off { opacity: .5; cursor: not-allowed; }
  .sf-check-off input { cursor: not-allowed; }

  .sf-error { margin-top: 17px; background: #fef2f2; border: 1px solid #fecaca;
              border-radius: 12px; padding: 13px 14px; font-size: 13.5px;
              color: #991b1b; line-height: 1.6; }

  .sf-send { margin-top: 20px; width: 100%; }
  .sf-hint-under { font-size: 11.8px; color: #a8a29e; text-align: center; margin-top: 10px; }

  .sf-spin { width: 14px; height: 14px; border-radius: 50%; display: inline-block;
             border: 2px solid rgba(255,255,255,.35); border-top-color: #fff;
             animation: sf-turn .7s linear infinite; }
  @keyframes sf-turn { to { transform: rotate(360deg); } }

  @media (max-width: 620px) {
    .sf-card { padding: 18px 16px 22px; border-radius: 16px; }
    .sf-row { grid-template-columns: 1fr; gap: 0; }
    .sf-thumb, .sf-add { width: 92px; height: 92px; }
    /* Phone par 16px se chhota input zoom kara deta hai */
    .st-input { font-size: 16px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sf-spin { animation-duration: 2s; }
    .sf-add { transition: none; }
  }
`;
