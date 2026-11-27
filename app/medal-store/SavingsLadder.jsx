"use client";

import Link from "next/link";
import { rupees } from "@/lib/medalApi";

/* "Itni chhoot mili — ek aur lo to itni aur milegi."

   Sirf "₹40 off" likh dene se banda samajh nahi paata ki aage kya
   milega. Isliye poori seedhi dikhate hain: kahan khade ho, aur agla
   kadam kitna sasta karega.

   Jhoot nahi bolna hai — koi nakli timer, koi "sirf aaj" nahi. Bas
   asli ginti, saaf dikhi hui. Jo apne aap samajh mein aa jaaye.

   per = 0 (admin ne chhoot band kar di) to kuch nahi dikhta. */

export default function SavingsLadder({ qty = 0, per = 0, discount = 0, compact = false }) {
  if (per <= 0) return null;

  /* Chaar kadam dikhte hain, aur banda unke beech mein rehta hai —
     aage kya milega ye dikhna zaroori hai, isliye window khisakti
     hai. 0 ya 1 medal par seedhi 2 se shuru. */
  const start = Math.max(2, qty - 1);
  const tiers = [start, start + 1, start + 2, start + 3];

  const nextAt = Math.max(2, qty + 1);
  const nextOff = per * (nextAt - 1);

  return (
    <div className={`ms-lad ${compact ? "ms-lad-c" : ""}`}>
      {/* ── Upar: kitna bacha, aur agla kadam ── */}
      <div className="ms-lad-top">
        <span className="ms-lad-medal">🏅</span>

        <div style={{ minWidth: 0 }}>
          {discount > 0 ? (
            <>
              <div className="ms-lad-now">
                You saved {rupees(discount)}
              </div>
              <div className="ms-lad-next">
                Add one more medal → <strong>{rupees(nextOff)} off</strong>
                {" "}({rupees(per)} more than now)
              </div>
            </>
          ) : (
            <>
              <div className="ms-lad-now">Buy more, pay less</div>
              <div className="ms-lad-next">
                Every extra medal takes <strong>{rupees(per)}</strong> off.
                {" "}Add a second one and save {rupees(per)}.
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Neeche: poori seedhi ── */}
      <div className="ms-lad-steps">
        {tiers.map((t) => {
          const off = per * (t - 1);
          const done = qty >= t;
          const here = qty === t;
          return (
            <div key={t} className={`ms-lad-step ${done ? "ms-lad-done" : ""} ${here ? "ms-lad-here" : ""}`}>
              <div className="ms-lad-qty">{t} medals</div>
              <div className="ms-lad-off">− {rupees(off)}</div>
              {here && <div className="ms-lad-you">you are here</div>}
            </div>
          );
        })}
      </div>

      {!compact && (
        <Link href="/medal-store" className="ms-lad-link">
          Add another medal →
        </Link>
      )}

      {/* Alag event ke medal bhi ek hi ginti mein — ye saaf batana
          zaroori hai, warna log sochte hain ek hi medal ki copy
          leni padegi */}
      <div className="ms-lad-note">
        Mix any events you like — they all count together.
      </div>
    </div>
  );
}
