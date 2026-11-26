"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "./theme";

/* Medal Store ka mukhya page.

   ⚠️ Jo medal khatam ho gaya wo yahan aata hi nahi — server us-se
   pehle hi chhant deta hai.

   Lehja jaan-bujh kar tohfe wala hai, par jhootha nahi: ye medal
   sach mein guzre hue challenges ke hain aur dobara nahi banenge.
   Kahin ye nahi likha ki khareedne se koi daud jeet li — wo
   kehna galat hota, aur runner log use turant pakad lete. */

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
          <span className="ms-kicker">Valley Run · Limited Edition</span>

          {/* Heading aur text dono admin ki Settings se aate hain —
              yahan ka fallback sirf tab chalta hai jab server se
              jawab hi na aaye. */}
          <h1 className="ms-h1">
            {settings.heroHeading || "Own a piece of the finish line."}
          </h1>

          <p className="ms-sub">
            {settings.heroText ||
              "These are the real medals from our past challenges — the same ones that went out to finishers. A handful are left over, and once they are gone we are not making them again."}
          </p>

          {/* Dono raaste barabar dikhne chahiye. Pehle ye page gift
              ki taraf jhuk gaya tha — par zyadatar log apne liye hi
              khareedenge, aur unhe lagna nahi chahiye ki ye dukaan
              unke liye hai hi nahi. */}
          <div className="ms-two">
            <div className="ms-two-card">
              <div className="ms-two-i">🏅</div>
              <div className="ms-two-t">Keep it yourself</div>
              <div className="ms-two-x">
                Missed that challenge, or just want the one you liked. It arrives at your door.
              </div>
            </div>
            <div className="ms-two-card">
              <div className="ms-two-i">🎁</div>
              <div className="ms-two-t">Send it to someone</div>
              <div className="ms-two-x">
                Goes straight to their address with your message, and no price in the parcel.
              </div>
            </div>
          </div>

          {/* Do baatein jo dono soorat mein maayne rakhti hain */}
          <div className="ms-points">
            <Point icon="🎖️" title="The real thing"
              text="Exactly the medal our finishers received — not a reprint." />
            <Point icon="⏳" title="Once gone, gone"
              text="Leftover stock from past events. We are not making more." />
          </div>
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
          <Empty
            icon="🎖️"
            title="Every medal has found a home"
            text="All our leftover medals are gone. New challenges mean new medals — join one and earn yours."
            cta={{ href: "/challenges", label: "See the challenges" }}
          />
        ) : (
          <>
            <div style={{ marginBottom: 22, display: "flex", justifyContent: "space-between",
              alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#171717",
                letterSpacing: "-.5px", margin: 0 }}>
                What's left
              </h2>
              <div style={{ fontSize: 13, color: "#78716c" }}>
                {medals.length} {medals.length === 1 ? "medal" : "medals"}
                {settings.freeOver > 0 && settings.shippingFlat > 0 && (
                  <> · Free delivery over {rupees(settings.freeOver)}</>
                )}
              </div>
            </div>

            <div className="ms-grid">
              {medals.map((m) => <MedalCard key={m.slug} m={m} />)}
            </div>

            {/* ═══ TOHFA ═══
                Page ke neeche, kyunki yahan tak wahi aata hai jisne
                medals dekh liye hain aur ab soch raha hai. */}
            <section className="ms-gift">
              <span className="ms-kicker">However you want it</span>
              <h2 className="ms-gift-h">
                Every runner remembers their first medal.
              </h2>
              <p className="ms-gift-p">
                Buy it for yourself and it comes to you — nothing extra to do.
                Buying it for someone else? Tick <strong>“This is a gift”</strong> at checkout
                and we send it to their address with your message, and no price in the parcel.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

const Point = ({ icon, title, text }) => (
  <div className="ms-point">
    <div className="ms-point-i">{icon}</div>
    <div>
      <div className="ms-point-t">{title}</div>
      <div className="ms-point-x">{text}</div>
    </div>
  </div>
);

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
