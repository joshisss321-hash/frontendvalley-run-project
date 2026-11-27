"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";

/* Homepage par medals ki jhalak.

   Jo banda site par kisi aur kaam se aaya hai, use pata hi nahi
   chalta ki medal bhi bikte hain. Isliye yahan chaar medal, aur
   seedha dukaan ka raasta.

   ⚠️ Store band ho ya ek bhi medal na bache to ye section poora
   gayab ho jaata hai — homepage par khaali dabba ya "coming soon"
   likhna usse kahin bura hai. */

export default function MedalStoreSection() {
  const [medals, setMedals] = useState([]);
  const [settings, setSettings] = useState({});
  const [dead, setDead] = useState(() => new Set());

  useEffect(() => {
    Promise.all([medalAPI.list(), medalAPI.settings()])
      .then(([l, s]) => {
        if (l?.success) setMedals(l.medals || []);
        setSettings(s?.settings || {});
      })
      .catch(() => {});
  }, []);

  if (medals.length === 0) return null;

  const show = medals.slice(0, 4);
  const per = Number(settings.perExtraOff) || 0;

  return (
    <section className="vmz">
      <style>{css}</style>

      <div className="vmz-in">
        <div className="vmz-head">
          <div>
            <span className="vmz-kicker">Valley Run · Limited Edition</span>
            <h2 className="vmz-h2">Take a medal home.</h2>
            <p className="vmz-p">
              Real medals from our past challenges — the same ones that went out to
              finishers. A few are left over, and we are not making them again.
              Keep one, or send it to someone as a gift.
            </p>
            {/* Chhoot ki seedhi, yahin homepage par. Sirf "₹20 off"
                likhne se banda ye nahi samajhta ki teen lene par 40
                bachega — isliye ginti saaf dikha di. */}
            {per > 0 && (
              <div className="vmz-lad">
                <div className="vmz-lad-h">🏅 Buy more, pay less</div>
                <div className="vmz-lad-row">
                  {[2, 3, 4].map((n) => (
                    <span key={n} className="vmz-lad-s">
                      <b>{n} medals</b> − {rupees(per * (n - 1))}
                    </span>
                  ))}
                </div>
                <div className="vmz-lad-n">Any events — they all count together.</div>
              </div>
            )}
          </div>

          <Link href="/medal-store" className="vmz-all">See all medals →</Link>
        </div>

        <div className="vmz-grid">
          {show.map((m) => {
            const broken = dead.has(m.featuredImage);
            return (
              <Link key={m.slug} href={`/medal-store/${m.slug}`} className="vmz-card">
                <div className="vmz-img">
                  {m.featuredImage && !broken
                    ? <img src={m.featuredImage} alt={m.name} loading="lazy"
                        onError={() => setDead((d) => new Set(d).add(m.featuredImage))} />
                    : <div className="vmz-noimg">🏅</div>}
                  {m.left !== null && m.left <= 5 && (
                    <span className="vmz-tag">Only {m.left} left</span>
                  )}
                </div>
                <div className="vmz-body">
                  {m.eventName && <div className="vmz-ev">{m.eventName}</div>}
                  <div className="vmz-name">{m.name}</div>
                  <div className="vmz-price">{rupees(m.price)}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Phone par upar ka link chhota pad jaata hai — neeche
            poori chaudai ka */}
        <Link href="/medal-store" className="vmz-all-m">See all medals →</Link>
      </div>
    </section>
  );
}

const css = `
  .vmz { background: #171717; padding: 66px 20px; }
  .vmz-in { max-width: 1140px; margin: 0 auto; }

  .vmz-head { display: flex; justify-content: space-between; align-items: flex-end;
              gap: 26px; margin-bottom: 30px; }
  .vmz-kicker { font-size: 10.5px; font-weight: 800; letter-spacing: 2.4px;
                text-transform: uppercase; color: #f87171; }
  .vmz-h2 { font-size: clamp(25px, 3.6vw, 38px); font-weight: 900; letter-spacing: -1.3px;
            line-height: 1.1; color: #fff; margin: 12px 0 0; }
  .vmz-p { font-size: 14.5px; line-height: 1.72; color: rgba(255,255,255,.62);
           margin: 13px 0 0; max-width: 520px; }
  /* Chhoot ki seedhi — dark band par, isliye hara halka aur
     background bhi halka hara. Laal yahan "khatra" bolta, aur baat
     bachat ki hai. */
  .vmz-lad { display: inline-block; margin-top: 17px; padding: 13px 16px;
             background: rgba(74,222,128,.08);
             border: 1px solid rgba(74,222,128,.24); border-radius: 13px; }
  .vmz-lad-h { font-size: 12.5px; font-weight: 800; color: #4ade80;
               letter-spacing: .2px; }
  .vmz-lad-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; }
  .vmz-lad-s { font-size: 12px; color: rgba(255,255,255,.72);
               background: rgba(255,255,255,.06);
               border: 1px solid rgba(255,255,255,.12);
               border-radius: 100px; padding: 5px 11px; white-space: nowrap; }
  .vmz-lad-s b { color: #fff; font-weight: 800; }
  .vmz-lad-n { font-size: 11px; color: rgba(255,255,255,.42); margin-top: 9px; }

  .vmz-all { flex-shrink: 0; font-size: 13.5px; font-weight: 800; color: #fff;
             text-decoration: none; border: 1.5px solid rgba(255,255,255,.26);
             border-radius: 100px; padding: 11px 20px; white-space: nowrap;
             transition: all .18s; }
  .vmz-all:hover { background: #fff; color: #171717; border-color: #fff; }
  .vmz-all-m { display: none; }

  .vmz-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  .vmz-card { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
              border-radius: 16px; overflow: hidden; text-decoration: none;
              display: block; transition: transform .22s, border-color .22s, background .22s; }
  .vmz-card:hover { transform: translateY(-4px); border-color: rgba(248,113,113,.5);
                    background: rgba(255,255,255,.08); }
  .vmz-img { aspect-ratio: 1/1; background: #222; position: relative; overflow: hidden; }
  .vmz-img img { width: 100%; height: 100%; object-fit: cover; display: block;
                 transition: transform .4s cubic-bezier(.2,.7,.3,1); }
  .vmz-card:hover .vmz-img img { transform: scale(1.05); }
  .vmz-noimg { display: flex; align-items: center; justify-content: center;
               height: 100%; font-size: 38px; }
  .vmz-tag { position: absolute; top: 9px; left: 9px; font-size: 9.5px; font-weight: 800;
             letter-spacing: .7px; text-transform: uppercase; padding: 4px 9px;
             border-radius: 100px; background: #dc2626; color: #fff; }

  .vmz-body { padding: 13px 14px 15px; }
  .vmz-ev { font-size: 9.5px; font-weight: 800; letter-spacing: 1.1px;
            text-transform: uppercase; color: #d4a017; }
  .vmz-name { font-size: 14px; font-weight: 800; color: #fff; line-height: 1.3;
              margin-top: 5px; }
  .vmz-price { font-size: 15px; font-weight: 900; color: #fff; margin-top: 7px; }

  @media (max-width: 900px) {
    .vmz-head { flex-direction: column; align-items: flex-start; gap: 16px; }
    .vmz-all { display: none; }
    .vmz-all-m { display: block; text-align: center; margin-top: 22px;
                 font-size: 14px; font-weight: 800; color: #fff; text-decoration: none;
                 border: 1.5px solid rgba(255,255,255,.26); border-radius: 100px;
                 padding: 13px 20px; }
  }
  @media (max-width: 620px) {
    .vmz { padding: 46px 16px; }
    .vmz-grid { grid-template-columns: 1fr 1fr; gap: 11px; }
    .vmz-body { padding: 10px 11px 12px; }
    .vmz-name { font-size: 13px; }
    .vmz-price { font-size: 14px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .vmz-card, .vmz-img img, .vmz-all { transition: none !important; }
    .vmz-card:hover { transform: none !important; }
  }
`;
