"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storyCss } from "../theme";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SubmitStory() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", state: "", instaId: "",
    title: "", summary: "", body: "", eventTitle: "",
  });
  const [photos, setPhotos] = useState([]);
  const [consentStory, setConsentStory]   = useState(false);
  const [consentPhotos, setConsentPhotos] = useState(false);
  const [consentName, setConsentName]     = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    fetch(`${API}/api/stories/settings`)
      .then((r) => r.json())
      .then((d) => setSettings(d?.settings || {}))
      .catch(() => setSettings({}));
  }, []);

  const submit = async () => {
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.title.trim() || !form.body.trim()) {
      setError("Please fill your name, email, a title and your story.");
      return;
    }
    if (!consentStory) {
      setError("We can only publish your story if you give us permission.");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("consentStory",  consentStory);
    fd.append("consentPhotos", consentPhotos);
    fd.append("consentName",   consentName);
    // Photo tabhi bhejo jab uski ijazat ho — bina ijazat server waise
    // bhi phenk dega, par use bhejna hi nahi chahiye
    if (consentPhotos) photos.forEach((f) => fd.append("photos", f));

    setBusy(true);
    try {
      const res = await fetch(`${API}/api/stories`, { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) { setError(data.message || "Could not send your story."); setBusy(false); return; }
      setDone(true);
    } catch {
      setError("Could not reach the server. Please try again.");
    }
    setBusy(false);
  };

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

  if (done) {
    return (
      <Wrap>
        <div className="st-empty">
          <div style={{ fontSize: 42, marginBottom: 14 }}>🙏</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>Thank you</div>
          <p style={{ color: "#78716c", marginTop: 12, lineHeight: 1.75, fontSize: 15 }}>
            Your story is with our team. We read every one, and we will email you
            before it goes up.
          </p>
          <Link href="/stories" className="st-btn" style={{ marginTop: 24 }}>Read other stories</Link>
        </div>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <div style={{ background: "#fff", border: "1px solid #ebe8e4", borderRadius: 18, padding: 24 }}>

        <Section>About you</Section>
        <Row>
          <F label="Your name *"><input className="st-input" value={form.name} onChange={(e) => set("name", e.target.value)} /></F>
          <F label="Email *" hint="Only for us to reach you — never shown publicly">
            <input className="st-input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </F>
        </Row>
        <Row>
          <F label="City"><input className="st-input" value={form.city} onChange={(e) => set("city", e.target.value)} /></F>
          <F label="State"><input className="st-input" value={form.state} onChange={(e) => set("state", e.target.value)} /></F>
        </Row>
        <Row>
          <F label="Phone" hint="Never shown publicly"><input className="st-input" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></F>
          <F label="Instagram handle"><input className="st-input" placeholder="without @" value={form.instaId} onChange={(e) => set("instaId", e.target.value)} /></F>
        </Row>

        <Section>Your story</Section>
        <F label="Give it a title *" hint="Something that says what this was about">
          <input className="st-input" placeholder="Age is just a number" value={form.title} onChange={(e) => set("title", e.target.value)} />
        </F>
        <F label="One line to pull people in" hint="Shown on the card and when the link is shared">
          <input className="st-input" placeholder="At 58, I finished my first 21K." value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </F>
        <F label="Which challenge was it?">
          <input className="st-input" value={form.eventTitle} onChange={(e) => set("eventTitle", e.target.value)} />
        </F>
        <F label="Your story *" hint="Write it the way you would tell a friend. There is no length limit.">
          <textarea className="st-input" style={{ minHeight: 220, resize: "vertical", lineHeight: 1.7 }}
            value={form.body} onChange={(e) => set("body", e.target.value)} />
        </F>

        <Section>Photos</Section>
        <input type="file" accept="image/*" multiple
          onChange={(e) => setPhotos([...e.target.files].slice(0, 5))} />
        <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 6 }}>Up to 5 photos.</div>
        {photos.length > 0 && (
          <div style={{ fontSize: 12.5, color: "#44403c", marginTop: 8 }}>
            {photos.length} photo{photos.length > 1 ? "s" : ""} selected
          </div>
        )}

        {/* ══ CONSENT ══
            Jaan-bujh kar sabse aakhir mein aur alag dabbe mein. Form ke
            beech mein chhota sa checkbox daalna aisa lagta hai jaise
            chhupaya ja raha ho. */}
        <div style={{ marginTop: 28, background: "#fffbeb", border: "1.5px solid #fcd34d",
          borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#92400e", marginBottom: 10 }}>
            Your permission
          </div>

          {settings?.consentText && (
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#78350f", margin: "0 0 14px" }}>
              {settings.consentText}
            </p>
          )}

          <Check checked={consentStory} onChange={setConsentStory} strong
            label="Yes, Valley Run may publish my story." />
          <Check checked={consentPhotos} onChange={setConsentPhotos}
            label="Yes, Valley Run may publish the photos I uploaded." />
          <Check checked={consentName} onChange={setConsentName}
            label="Yes, show my name with the story." />

          {!consentName && (
            <div style={{ fontSize: 12.5, color: "#78350f", marginTop: 9, lineHeight: 1.6 }}>
              Your story will appear without your name or city.
            </div>
          )}
          {!consentPhotos && photos.length > 0 && (
            <div style={{ fontSize: 12.5, color: "#78350f", marginTop: 9, lineHeight: 1.6 }}>
              Your photos will not be uploaded at all.
            </div>
          )}

          <div style={{ fontSize: 12, color: "#a16207", marginTop: 13, lineHeight: 1.6 }}>
            You can ask us to take your story down at any time — there is a link on
            every published story.
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 16, background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 11, padding: 13, fontSize: 13.5, color: "#991b1b" }}>
            {error}
          </div>
        )}

        <button onClick={submit} disabled={busy || !consentStory} className="st-btn"
          style={{ marginTop: 20, width: "100%" }}>
          {busy ? "Sending…" : "Send my story"}
        </button>
        {!consentStory && (
          <div style={{ fontSize: 12, color: "#a8a29e", textAlign: "center", marginTop: 9 }}>
            Tick the first permission to continue
          </div>
        )}
      </div>
    </Wrap>
  );
}

const Wrap = ({ children }) => (
  <div className="st">
    <style>{storyCss}</style>
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

const Section = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase",
    color: "#dc2626", margin: "26px 0 14px" }}>{children}</div>
);

const F = ({ label, hint, children }) => (
  <div style={{ marginBottom: 15 }}>
    <label className="st-label">{label}</label>
    {children}
    {hint && <div style={{ fontSize: 11.5, color: "#a8a29e", marginTop: 5, lineHeight: 1.5 }}>{hint}</div>}
  </div>
);

const Row = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
    {children}
  </div>
);

const Check = ({ checked, onChange, label, strong }) => (
  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
    padding: "7px 0", fontSize: 13.5, lineHeight: 1.6, color: "#78350f",
    fontWeight: strong ? 700 : 500 }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 18, height: 18, marginTop: 1, flexShrink: 0, cursor: "pointer" }} />
    {label}
  </label>
);
