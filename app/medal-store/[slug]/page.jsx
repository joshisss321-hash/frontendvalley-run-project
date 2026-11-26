"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "../theme";
import MedalGallery from "../MedalGallery";

export default function MedalDetail() {
  const { slug } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [settings, setSettings] = useState({});
  const [qty, setQty] = useState(1);
  const [state, setState] = useState("loading");   // loading | ok | soldout | gone

  useEffect(() => {
    Promise.all([medalAPI.one(slug), medalAPI.settings()]).then(([r, s]) => {
      setSettings(s?.settings || {});
      if (r?.success) { setData(r); setState("ok"); }
      else if (r?.soldOut) { setData(r); setState("soldout"); }
      else setState("gone");
    });
  }, [slug]);

  if (state === "loading") {
    return <Shell><div style={{ padding: 80, textAlign: "center", color: "#a8a29e" }}>Loading…</div></Shell>;
  }

  if (state === "soldout") {
    return (
      <Shell>
        <Gone
          title="This one is sold out"
          text={`${data?.medal?.name || "This medal"} has found its home. Have a look at what is still left.`}
        />
      </Shell>
    );
  }

  if (state === "gone") {
    return (
      <Shell>
        <Gone title="Medal not found" text="This medal is no longer listed." />
      </Shell>
    );
  }

  const m = data.medal;
  const subtotal = m.price * qty;
  const shipFlat = Number(settings.shippingFlat) || 0;
  const freeOver = Number(settings.freeOver) || 0;
  const shipping = shipFlat <= 0 ? 0 : (freeOver > 0 && subtotal >= freeOver ? 0 : shipFlat);

  const buy = () => {
    /* Quantity URL mein — checkout page apne aap server se dobara
       jaanchta hai, isliye yahan se chhed-chaad ka koi faayda nahi */
    router.push(`/medal-store/checkout?medal=${encodeURIComponent(m.slug)}&qty=${qty}`);
  };

  return (
    <Shell>
      <div className="ms-wrap" style={{ padding: "26px 20px 70px" }}>
        <Link href="/medal-store" style={{ fontSize: 13, color: "#78716c", textDecoration: "none" }}>
          ← All medals
        </Link>

        <div className="ms-detail" style={{ marginTop: 20 }}>
          <MedalGallery images={m.images} name={m.name} />

          <div>
            {m.eventName && <div className="ms-event">{m.eventName}</div>}
            <h1 className="ms-title">{m.name}</h1>

            <div style={{ display: "flex", alignItems: "baseline", gap: 11, marginTop: 16 }}>
              <span className="ms-big-price">{rupees(m.price)}</span>
              {m.mrp && <span className="ms-mrp" style={{ fontSize: 16 }}>{rupees(m.mrp)}</span>}
              {m.discountPercent > 0 && <span className="ms-off" style={{ fontSize: 13 }}>{m.discountPercent}% off</span>}
            </div>

            <div style={{ marginTop: 12 }}>
              {m.left !== null && m.left <= 5
                ? <span className="ms-left">Only {m.left} left</span>
                : <span className="ms-instock">In stock</span>}
            </div>

            {m.shortDesc && (
              <p className="ms-desc" style={{ marginTop: 18 }}>{m.shortDesc}</p>
            )}

            {/* ── Quantity ── */}
            <div style={{ marginTop: 26 }}>
              <label className="ms-label">Quantity</label>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div className="ms-qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1} aria-label="One less">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(m.maxQty, q + 1))}
                    disabled={qty >= m.maxQty} aria-label="One more">+</button>
                </div>
                {qty >= m.maxQty && (
                  <span style={{ fontSize: 12.5, color: "#78716c" }}>
                    {m.left !== null && m.left <= 10
                      ? `That is all we have left`
                      : `Maximum ${m.maxQty} per order`}
                  </span>
                )}
              </div>
            </div>

            {/* ── Total ── */}
            <div className="ms-box" style={{ marginTop: 22, padding: 18 }}>
              <Line label={`${qty} × ${rupees(m.price)}`} value={rupees(subtotal)} />
              <Line label="Delivery" value={shipping > 0 ? rupees(shipping) : "Free"} />
              <div style={{ height: 1, background: "#e7e5e4", margin: "11px 0" }} />
              <Line label="Total" value={rupees(subtotal + shipping)} big />
              {freeOver > 0 && shipping > 0 && (
                <div style={{ fontSize: 12, color: "#78716c", marginTop: 9 }}>
                  Add {rupees(freeOver - subtotal)} more for free delivery
                </div>
              )}
            </div>

            <button onClick={buy} className="ms-btn" style={{ marginTop: 18, width: "100%" }}>
              Buy now
            </button>

            {/* Gift ka zikr yahin, kyunki faisla yahin hota hai —
                checkout tak pahunchne se pehle pata hona chahiye
                ki ye kisi aur ko bheja ja sakta hai. */}
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start",
              marginTop: 14, fontSize: 12.8, color: "#78716c", lineHeight: 1.6 }}>
              <span style={{ fontSize: 15, lineHeight: 1.3 }}>🎁</span>
              <span>
                Buying it for someone? Tick <strong style={{ color: "#44403c" }}>“This is a gift”</strong>{" "}
                at checkout — we send it to their address with your message, and no price in the parcel.
              </span>
            </div>

            {settings.dispatchNote && (
              <p style={{ fontSize: 12.5, color: "#78716c", marginTop: 14, lineHeight: 1.65 }}>
                {settings.dispatchNote}
              </p>
            )}

            {m.longDesc && (
              <div style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid #e7e5e4" }}>
                <div className="ms-event" style={{ color: "#a8a29e" }}>About this medal</div>
                <p className="ms-desc" style={{ marginTop: 10 }}>{m.longDesc}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Baaki medals ── */}
        {data.others?.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#171717",
              letterSpacing: "-.5px", marginBottom: 18 }}>
              Other medals
            </h2>
            <div className="ms-grid">
              {data.others.map((o) => (
                <Link key={o.slug} href={`/medal-store/${o.slug}`} className="ms-card">
                  <div className="ms-card-img">
                    {o.featuredImage
                      ? <img src={o.featuredImage} alt={o.name} loading="lazy" />
                      : <div style={{ display: "flex", alignItems: "center",
                          justifyContent: "center", height: "100%", fontSize: 36 }}>🏅</div>}
                  </div>
                  <div className="ms-card-body">
                    {o.eventName && <div className="ms-event">{o.eventName}</div>}
                    <div className="ms-name">{o.name}</div>
                    <div className="ms-price"><b>{rupees(o.price)}</b></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}

const Shell = ({ children }) => (
  <div className="ms">
    <style>{medalCss}</style>
    {children}
  </div>
);

const Line = ({ label, value, big }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
    fontSize: big ? 17 : 14, fontWeight: big ? 900 : 500,
    color: big ? "#171717" : "#57534e", marginTop: big ? 0 : 7 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);

const Gone = ({ title, text }) => (
  <div className="ms-wrap" style={{ padding: "80px 20px", textAlign: "center" }}>
    <div style={{ fontSize: 44, marginBottom: 14 }}>🎖️</div>
    <h1 style={{ fontSize: 25, fontWeight: 900, color: "#171717", letterSpacing: "-.6px" }}>{title}</h1>
    <p style={{ fontSize: 15, color: "#78716c", lineHeight: 1.75, margin: "11px auto 0", maxWidth: 420 }}>
      {text}
    </p>
    <Link href="/medal-store" className="ms-btn" style={{ marginTop: 26 }}>See all medals</Link>
  </div>
);
