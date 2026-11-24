"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "./theme";

/* Medal Store ka mukhya page.

   ⚠️ Jo medal khatam ho gaya wo yahan aata hi nahi — server us-se
   pehle hi chhant deta hai. Isliye yahan "out of stock" wala card
   dikhane ki zaroorat hi nahi; bachi hui cheez hi dikhti hai. */

export default function MedalStore() {
  const [medals, setMedals] = useState(null);
  const [settings, setSettings] = useState({});
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    Promise.all([medalAPI.list(), medalAPI.settings()]).then(([l, s]) => {
      if (l?.disabled) { setClosed(true); setMedals([]); return; }
      setMedals(l?.medals || []);
      setSettings(s?.settings || {});
    });
  }, []);

  return (
    <div className="ms">
      <style>{medalCss}</style>

      {/* ═══ HERO ═══ */}
      <header className="ms-hero">
        {settings.heroImage && <img src={settings.heroImage} alt="" className="ms-hero-bg" />}
        <div className="ms-hero-in">
          <span className="ms-kicker">Valley Run Medal Store</span>
          <h1 className="ms-h1">
            {settings.heroHeading || "Own a piece of the finish line."}
          </h1>
          <p className="ms-sub">
            {settings.heroText ||
              "Real medals from our past Valley Run challenges. A few are left over, and they are looking for someone to keep them."}
          </p>
        </div>
      </header>

      <main className="ms-wrap" style={{ padding: "40px 20px 70px" }}>
        {medals === null ? (
          <Skeletons />
        ) : closed ? (
          <Empty
            icon="🏅"
            title="The medal store is not open yet"
            text="We are still setting it up. Come back in a little while."
          />
        ) : medals.length === 0 ? (
          /* Ye screen sach mein dikhegi — jab saare medal bik jayenge.
             Khaali grid se behtar hai saaf kehna ki sab chale gaye. */
          <Empty
            icon="🎖️"
            title="Every medal has found a home"
            text="All our leftover medals are sold. New challenges mean new medals — join one and earn yours."
            cta={{ href: "/challenges", label: "See the challenges" }}
          />
        ) : (
          <>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 13, color: "#78716c" }}>
                {medals.length} {medals.length === 1 ? "medal" : "medals"} available
                {settings.freeOver > 0 && settings.shippingFlat > 0 && (
                  <> · Free delivery over {rupees(settings.freeOver)}</>
                )}
              </div>
            </div>

            <div className="ms-grid">
              {medals.map((m) => <MedalCard key={m.slug} m={m} />)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function MedalCard({ m }) {
  return (
    <Link href={`/medal-store/${m.slug}`} className="ms-card">
      <div className="ms-card-img">
        {m.featuredImage
          ? <img src={m.featuredImage} alt={m.name} loading="lazy" />
          : <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: 40 }}>🏅</div>}

        {/* Sirf tab jab sach mein kam bache hon — har card par
            "hurry" likhna jhooth hai aur log use pehchan lete hain */}
        {m.left !== null && m.left <= 5 && (
          <span className="ms-tag">Only {m.left} left</span>
        )}
      </div>

      <div className="ms-card-body">
        {m.eventName && <div className="ms-event">{m.eventName}</div>}
        <div className="ms-name">{m.name}</div>
        <div className="ms-price">
          <b>{rupees(m.price)}</b>
          {m.mrp && <span className="ms-mrp">{rupees(m.mrp)}</span>}
          {m.discountPercent > 0 && <span className="ms-off">{m.discountPercent}% off</span>}
        </div>
      </div>
    </Link>
  );
}

const Skeletons = () => (
  <div className="ms-grid">
    {[...Array(6)].map((_, i) => (
      <div key={i} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ aspectRatio: "1/1", background: "#f1efec" }} />
        <div style={{ padding: 16 }}>
          <div style={{ height: 11, width: "55%", background: "#f1efec", borderRadius: 4 }} />
          <div style={{ height: 15, width: "85%", background: "#f1efec", borderRadius: 4, marginTop: 10 }} />
        </div>
      </div>
    ))}
  </div>
);

const Empty = ({ icon, title, text, cta }) => (
  <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff",
    border: "1px solid #e7e5e4", borderRadius: 18 }}>
    <div style={{ fontSize: 44, marginBottom: 14 }}>{icon}</div>
    <h2 style={{ fontSize: 23, fontWeight: 900, color: "#171717", letterSpacing: "-.6px" }}>{title}</h2>
    <p style={{ fontSize: 15, color: "#78716c", lineHeight: 1.75, margin: "11px auto 0", maxWidth: 420 }}>
      {text}
    </p>
    {cta && <Link href={cta.href} className="ms-btn" style={{ marginTop: 26 }}>{cta.label}</Link>}
  </div>
);
