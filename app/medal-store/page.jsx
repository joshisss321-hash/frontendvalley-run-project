"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss, cartCss } from "./theme";
import { cartAdd, useCart } from "@/lib/medalCart";

/* Medal Store ka mukhya page.

   ⚠️ Jo medal khatam ho gaya wo yahan aata hi nahi — server us-se
   pehle hi chhant deta hai.

   Lehja tohfe wala hai par jhootha nahi: ye medal sach mein guzre
   hue challenges ke hain aur dobara nahi banenge. Kahin ye nahi
   likha ki khareedne se koi daud jeet li — wo kehna galat hota,
   aur runner log use turant pakad lete. */

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

  /* Hero mein asli medal dikhane ke liye. Stock photo nahi lagayi —
     dukaan mein jo sach mein bik raha hai wahi upar dikhna chahiye.

     ⚠️ Jo photo load na ho use hero se nikal dete hain. Is site par
     purani ImageKit photos 403 de chuki hain, aur hero mein toota
     hua dabba photo na hone se kahin bura lagta hai. */
  const [dead, setDead] = useState(() => new Set());
  const shots = (medals || [])
    .filter((m) => m.featuredImage && !dead.has(m.featuredImage))
    .slice(0, 3);

  const markDead = (url) => setDead((d) => new Set(d).add(url));

  const totalLeft = (medals || []).reduce((n, m) => n + (m.left ?? 0), 0);

  return (
    <div className="ms">
      <style>{medalCss + cartCss}</style>

      {/* ═══ HERO ═══ */}
      <header className={`ms-hero ${shots.length ? "ms-hero-split" : ""}`}>
        {settings.heroImage && <img src={settings.heroImage} alt="" className="ms-hero-bg" />}
        <div className="ms-glow" aria-hidden="true" />

        <div className="ms-hero-in">
          <div className="ms-hero-text">
            <span className="ms-kicker">Valley Run · Limited Edition</span>

            <h1 className="ms-h1">
              {settings.heroHeading || "Own a piece of the finish line."}
            </h1>

            <p className="ms-sub">
              {settings.heroText ||
                "These are the real medals from our past challenges — the same ones that went out to finishers. A handful are left over, and once they are gone we are not making them again."}
            </p>

            <div className="ms-chips">
              <span className="ms-chip">🎖️ The real finisher medal</span>
              <span className="ms-chip">⏳ No restocks</span>
            </div>
          </div>

          {/* Asli medals — ek ke peeche ek, jaise haath mein pakde hon */}
          {shots.length > 0 && (
            <div className="ms-stack" aria-hidden="true">
              {shots.map((m, i) => (
                <img key={m.slug} src={m.featuredImage} alt=""
                  className={`ms-stack-${i}`} loading="eager"
                  onError={() => markDead(m.featuredImage)} />
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="ms-wrap" style={{ padding: "0 20px 70px" }}>
        {medals === null ? (
          <div style={{ paddingTop: 40 }}><Skeletons /></div>
        ) : closed ? (
          <div style={{ paddingTop: 40 }}>
            <Empty icon="🏅" title="The medal store is not open yet"
              text="We are still setting it up. Come back in a little while." />
          </div>
        ) : medals.length === 0 ? (
          <div style={{ paddingTop: 40 }}>
            <Empty icon="🎖️" title="Every medal has found a home"
              text="All our leftover medals are gone. New challenges mean new medals — join one and earn yours."
              cta={{ href: "/challenges", label: "See the challenges" }} />
          </div>
        ) : (
          <>
            {/* ═══ DO RAASTE ═══
                Hero ke baad, grid se pehle — kyunki faisla yahi hai:
                apne liye le rahe ho ya kisi ko bhej rahe ho.
                Dono barabar chaudai ke, barabar vazan ke. */}
            <section className="ms-two">
              <div className="ms-two-card">
                <div className="ms-two-i">🏅</div>
                <div className="ms-two-t">Keep it yourself</div>
                <div className="ms-two-x">
                  Missed that challenge, or just want the one you liked.
                  It comes to your door — nothing extra to do.
                </div>
              </div>
              <div className="ms-two-card">
                <div className="ms-two-i">🎁</div>
                <div className="ms-two-t">Send it to someone</div>
                <div className="ms-two-x">
                  Tick “This is a gift” at checkout. It goes to their address
                  with your message, and no price in the parcel.
                </div>
              </div>
            </section>

            {/* ═══ GRID ═══ */}
            <div className="ms-head">
              <h2 className="ms-head-h">What's left</h2>
              <div className="ms-head-x">
                {totalLeft > 0 && totalLeft <= 40
                  ? `${totalLeft} ${totalLeft === 1 ? "medal" : "medals"} in all`
                  : `${medals.length} ${medals.length === 1 ? "design" : "designs"}`}
                {settings.freeOver > 0 && settings.shippingFlat > 0 && (
                  <> · Free delivery over {rupees(settings.freeOver)}</>
                )}
              </div>
            </div>

            <div className="ms-grid">
              {medals.map((m) => <MedalCard key={m.slug} m={m} />)}
            </div>

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

function MedalCard({ m }) {
  /* Card ki photo bhi toot sakti hai — tab saaf placeholder, toota
     hua icon nahi. */
  const [broken, setBroken] = useState(false);
  const [added, setAdded] = useState(false);
  const { items } = useCart();
  const showImg = m.featuredImage && !broken;
  const inCart = items.find((i) => i.slug === m.slug);

  /* Card poora ek link hai, isliye button ka click rokna zaroori
     hai — warna "Add to cart" dabate hi page badal jaata. */
  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const r = cartAdd(m, 1);
    if (!r.ok) { alert(r.reason); return; }
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/medal-store/${m.slug}`} className="ms-card">
      <div className="ms-card-img">
        {showImg
          ? <img src={m.featuredImage} alt={m.name} loading="lazy"
              onError={() => setBroken(true)} />
          : <div className="ms-noimg">🏅</div>}

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

        <button onClick={add}
          className={`ms-add ${added || inCart ? "ms-add-in" : ""}`}>
          {added ? "✓ Added" : inCart ? `In cart (${inCart.qty}) · Add another` : "Add to cart"}
        </button>
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
