"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "../theme";
import { useCart, cartSetQty, cartRemove, priceCart, nextSaving, MAX_QTY } from "@/lib/medalCart";
import SavingsLadder from "../SavingsLadder";

export default function CartPage() {
  const router = useRouter();
  const { items, count, ready } = useCart();

  const [settings, setSettings] = useState({});
  const [live, setLive] = useState(null);      // server se taaza list
  const [gone, setGone] = useState([]);        // jo ab nahi mil rahe

  useEffect(() => {
    Promise.all([medalAPI.list(), medalAPI.settings()]).then(([l, s]) => {
      setSettings(s?.settings || {});
      setLive(l?.medals || []);
    });
  }, []);

  /* ⚠️ Cart browser mein pada rehta hai — kal ka cart aaj khola ja
     sakta hai. Tab tak daam badal sakta hai aur medal khatam ho
     sakta hai. Isliye kholte hi server se milaate hain, aur jo ab
     nahi milta use nikaal kar saaf batate hain. Chup-chaap purana
     daam dikhana aur checkout par zyada kaatna sabse bura hota. */
  useEffect(() => {
    if (!live || !ready) return;

    const byslug = new Map(live.map((m) => [m.slug, m]));
    const missing = [];

    for (const it of items) {
      const m = byslug.get(it.slug);

      if (!m) { missing.push(it.name); cartRemove(it.slug); continue; }

      // Stock se zyada pada hai to ghata do
      if (m.maxQty > 0 && it.qty > m.maxQty) cartSetQty(it.slug, m.maxQty);
    }

    if (missing.length) setGone(missing);
  }, [live, ready]);

  if (!ready || live === null) {
    return <Shell><div style={{ padding: 80, textAlign: "center", color: "#a8a29e" }}>Loading…</div></Shell>;
  }

  const byslug = new Map(live.map((m) => [m.slug, m]));

  /* Daam hamesha server wali list se — localStorage ka daam sirf
     tab tak chalta hai jab tak taaza nahi aata */
  const fresh = items.map((it) => {
    const m = byslug.get(it.slug);
    return { ...it, price: m ? m.price : it.price, maxQty: m ? m.maxQty : it.qty, left: m ? m.left : null };
  });

  const money = priceCart(fresh, settings);
  const per = nextSaving(settings);

  if (count === 0) {
    return (
      <Shell>
        <div className="ms-wrap ms-narrow" style={{ padding: "70px 20px 90px", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🛒</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#171717", letterSpacing: "-.6px" }}>
            Your cart is empty
          </h1>
          {gone.length > 0 && (
            <div className="ms-note" style={{ marginTop: 16, textAlign: "left" }}>
              {gone.join(", ")} {gone.length === 1 ? "is" : "are"} no longer available, so{" "}
              {gone.length === 1 ? "it was" : "they were"} removed.
            </div>
          )}
          <p style={{ fontSize: 15, color: "#78716c", lineHeight: 1.75, margin: "11px auto 0", maxWidth: 400 }}>
            Pick a medal and it will show up here.
          </p>
          <Link href="/medal-store" className="ms-btn" style={{ marginTop: 26 }}>See the medals</Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="ms-wrap ms-narrow" style={{ padding: "26px 20px 80px" }}>
        <Link href="/medal-store" style={{ fontSize: 13, color: "#78716c", textDecoration: "none" }}>
          ← Keep looking
        </Link>

        <h1 className="ms-title" style={{ marginTop: 14 }}>Your cart</h1>

        {gone.length > 0 && (
          <div className="ms-note" style={{ marginTop: 14 }}>
            {gone.join(", ")} {gone.length === 1 ? "is" : "are"} no longer available, so{" "}
            {gone.length === 1 ? "it was" : "they were"} removed from your cart.
          </div>
        )}

        {/* ── Lines ── */}
        <div className="ms-box" style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
          {fresh.map((it, i) => (
            <div key={it.slug} className="ms-line" style={{ borderTop: i ? "1px solid #f1efec" : "none" }}>
              {it.image
                ? <img src={it.image} alt="" className="ms-line-img" />
                : <div className="ms-line-img ms-noimg" style={{ fontSize: 26 }}>🏅</div>}

              <div className="ms-line-mid">
                {it.eventName && <div className="ms-event">{it.eventName}</div>}
                <Link href={`/medal-store/${it.slug}`} className="ms-line-name">{it.name}</Link>
                <div className="ms-line-each">{rupees(it.price)} each</div>

                {it.left !== null && it.left <= 5 && (
                  <div style={{ fontSize: 11.5, color: "#b91c1c", fontWeight: 700, marginTop: 4 }}>
                    Only {it.left} left
                  </div>
                )}

                <div className="ms-line-ctl">
                  <div className="ms-qty ms-qty-sm">
                    <button onClick={() => cartSetQty(it.slug, it.qty - 1)} aria-label="One less">−</button>
                    <span>{it.qty}</span>
                    <button onClick={() => cartSetQty(it.slug, it.qty + 1)}
                      disabled={it.qty >= Math.min(MAX_QTY, it.maxQty || MAX_QTY)}
                      aria-label="One more">+</button>
                  </div>
                  <button onClick={() => cartRemove(it.slug)} className="ms-line-x">Remove</button>
                </div>
              </div>

              <div className="ms-line-sum">{rupees(it.price * it.qty)}</div>
            </div>
          ))}
        </div>

        {/* ── Kitni chhoot mili, aur aage kitni milegi ── */}
        <SavingsLadder qty={money.totalQty} per={per} discount={money.discount} />

        {/* ── Paisa ── */}
        <div className="ms-box" style={{ marginTop: 14 }}>
          <Line label={`Medals (${money.totalQty})`} value={rupees(money.subtotal)} />
          {money.discount > 0 && (
            <Line label={`Multi-medal discount`} value={`− ${rupees(money.discount)}`} green />
          )}
          <Line label="Delivery" value={money.shipping > 0 ? rupees(money.shipping) : "Free"} />
          <div style={{ height: 1, background: "#e7e5e4", margin: "12px 0" }} />
          <Line label="Total" value={rupees(money.total)} big />

          {settings.freeOver > 0 && money.shipping > 0 && (
            <div style={{ fontSize: 12, color: "#78716c", marginTop: 9 }}>
              Add {rupees(settings.freeOver - (money.subtotal - money.discount))} more for free delivery
            </div>
          )}

          <button onClick={() => router.push("/medal-store/checkout")} className="ms-btn"
            style={{ marginTop: 18, width: "100%" }}>
            Checkout · {rupees(money.total)}
          </button>
        </div>
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

const Line = ({ label, value, big, green }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
    fontSize: big ? 18 : 14, fontWeight: big ? 900 : 500,
    color: big ? "#171717" : green ? "#15803d" : "#57534e", marginTop: big ? 0 : 8 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);
