"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss, cartCss } from "../theme";
import { useCart, cartClear, priceCart } from "@/lib/medalCart";
import MedalPay from "../MedalPay";

const BLANK = {
  name: "", email: "", phone: "",
  address1: "", address2: "", landmark: "",
  pincode: "", city: "", state: "",
};

const GIFT_MAX = 200;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, count, ready } = useCart();

  const [settings, setSettings] = useState({});
  const [live, setLive] = useState(null);
  const [f, setF] = useState(BLANK);
  const [isGift, setIsGift] = useState(false);
  const [giftMsg, setGiftMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [rzp, setRzp] = useState(null);      // server ne order bana diya

  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setErr(""); };

  useEffect(() => {
    Promise.all([medalAPI.list(), medalAPI.settings()]).then(([l, s]) => {
      setSettings(s?.settings || {});
      setLive(l?.medals || []);
    });
  }, []);

  useEffect(() => {
    if (ready && count === 0 && !rzp) router.replace("/medal-store/cart");
  }, [ready, count, rzp]);

  if (!ready || live === null) {
    return <Shell><div style={{ padding: 80, textAlign: "center", color: "#a8a29e" }}>Loading…</div></Shell>;
  }
  if (count === 0) return <Shell><div style={{ padding: 80 }} /></Shell>;

  /* Daam hamesha server wali taaza list se — cart localStorage mein
     pada rehta hai aur purana ho sakta hai. Charge karte waqt server
     phir bhi apne database se hi nikaalta hai. */
  const byslug = new Map(live.map((m) => [m.slug, m]));
  const fresh = items.map((it) => {
    const m = byslug.get(it.slug);
    return { ...it, price: m ? m.price : it.price };
  });

  const money = priceCart(fresh, settings);

  const filled =
    f.name.trim() && f.email.trim() && f.phone.trim() &&
    f.address1.trim() && f.address2.trim() &&
    f.pincode.trim() && f.city.trim() && f.state.trim();

  const start = async () => {
    setErr("");
    if (!filled) { setErr("Please fill in every field marked with *."); return; }

    /* Gift ka note wahi `note` field hai jo pehle se server tak
       jaata hai. Aage "GIFT —" lagane se admin ko orders list mein
       turant dikh jaata hai ki parcel alag tarah se pack karna hai. */
    const note = isGift ? `GIFT — ${giftMsg.trim() || "(no message)"}`.slice(0, 300) : "";

    setBusy(true);
    const r = await medalAPI.checkout({
      items: fresh.map((i) => ({ slug: i.slug, qty: i.qty })),
      ...f, note,
    });
    setBusy(false);

    if (r?.success) { setRzp({ order: r.order, orderNo: r.orderNo }); return; }

    /* Beech mein koi aur khareed gaya — saaf batao aur cart par
       wapas bhej do taaki wo theek kar sake */
    if (r?.code === "OUT_OF_STOCK" || r?.code === "GONE") {
      setErr(r.message + " — please check your cart.");
      setTimeout(() => router.push("/medal-store/cart"), 2200);
      return;
    }
    setErr(r?.message || "Could not start the payment. Please try again.");
  };

  return (
    <Shell>
      <div className="ms-wrap ms-narrow" style={{ padding: "26px 20px 80px" }}>
        <Link href="/medal-store/cart" style={{ fontSize: 13, color: "#78716c", textDecoration: "none" }}>
          ← Back to cart
        </Link>

        <h1 className="ms-title" style={{ marginTop: 14 }}>Checkout</h1>

        {/* ── Kya khareed rahe ho ── */}
        <div className="ms-box" style={{ marginTop: 18, padding: 0, overflow: "hidden" }}>
          {fresh.map((it, i) => (
            <div key={it.slug} style={{ display: "flex", gap: 12, alignItems: "center",
              padding: "13px 16px", borderTop: i ? "1px solid #f1efec" : "none" }}>
              {it.image && <img src={it.image} alt="" width={48} height={48}
                style={{ borderRadius: 9, objectFit: "cover", flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#171717" }}>{it.name}</div>
                <div style={{ fontSize: 12.5, color: "#78716c" }}>{it.qty} × {rupees(it.price)}</div>
              </div>
              <strong style={{ fontSize: 14 }}>{rupees(it.price * it.qty)}</strong>
            </div>
          ))}
        </div>

        {/* ── Pata ── */}
        <div className="ms-box" style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#171717", marginBottom: 4 }}>
            {isGift ? "Where should we send the gift?" : "Where should we send it?"}
          </div>
          <p style={{ fontSize: 12.5, color: "#a8a29e", margin: "0 0 16px" }}>
            {isGift
              ? "This should be the address of the person you are gifting it to."
              : "Please check the address carefully — this is where your medals go."}
          </p>

          <div className="ms-row">
            <F label="Full name *"><input className="ms-input" value={f.name}
              onChange={(e) => set("name", e.target.value)} disabled={!!rzp} /></F>
            <F label="Mobile number *"><input className="ms-input" inputMode="numeric" value={f.phone}
              onChange={(e) => set("phone", e.target.value)} disabled={!!rzp} /></F>
          </div>

          <F label="Email *" hint="Your order confirmation and tracking go here">
            <input className="ms-input" type="email" value={f.email}
              onChange={(e) => set("email", e.target.value)} disabled={!!rzp} />
          </F>

          <div className="ms-row">
            <F label="House / flat number *"><input className="ms-input" value={f.address1}
              onChange={(e) => set("address1", e.target.value)} disabled={!!rzp} /></F>
            <F label="Street / area *"><input className="ms-input" value={f.address2}
              onChange={(e) => set("address2", e.target.value)} disabled={!!rzp} /></F>
          </div>

          <F label="Landmark"><input className="ms-input" value={f.landmark}
            onChange={(e) => set("landmark", e.target.value)} disabled={!!rzp} /></F>

          <div className="ms-row">
            <F label="PIN code *"><input className="ms-input" inputMode="numeric" maxLength={6} value={f.pincode}
              onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} disabled={!!rzp} /></F>
            <F label="City *"><input className="ms-input" value={f.city}
              onChange={(e) => set("city", e.target.value)} disabled={!!rzp} /></F>
          </div>

          <F label="State *"><input className="ms-input" value={f.state}
            onChange={(e) => set("state", e.target.value)} disabled={!!rzp} /></F>
        </div>

        {/* ── Tohfa ── */}
        <div className={`ms-giftbox ${isGift ? "ms-giftbox-on" : ""}`} style={{ marginTop: 14 }}>
          <label className="ms-gifttick">
            <input type="checkbox" checked={isGift} disabled={!!rzp}
              onChange={(e) => setIsGift(e.target.checked)} />
            <span>
              🎁 This is a gift
              <span style={{ display: "block", fontWeight: 500, fontSize: 12.5,
                color: "#78716c", marginTop: 3 }}>
                We will leave the price out of the parcel and put your message on the slip.
              </span>
            </span>
          </label>

          {isGift && (
            <div style={{ marginTop: 13 }}>
              <label className="ms-label">Your message (optional)</label>
              <textarea className="ms-input" rows={3} maxLength={GIFT_MAX} value={giftMsg}
                disabled={!!rzp}
                placeholder="You earned this one the hard way. Here's to the next."
                onChange={(e) => setGiftMsg(e.target.value)}
                style={{ resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ display: "flex", justifyContent: "space-between",
                fontSize: 11.5, color: "#a8a29e", marginTop: 5 }}>
                <span>Make sure the address above is theirs, not yours.</span>
                <span>{giftMsg.length}/{GIFT_MAX}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Paisa ── */}
        <div className="ms-box" style={{ marginTop: 14 }}>
          <Line label={`Medals (${money.totalQty})`} value={rupees(money.subtotal)} />
          {money.discount > 0 && (
            <Line label="Multi-medal discount" value={`− ${rupees(money.discount)}`} green />
          )}
          <Line label="Delivery" value={money.shipping > 0 ? rupees(money.shipping) : "Free"} />
          <div style={{ height: 1, background: "#e7e5e4", margin: "12px 0" }} />
          <Line label="Total" value={rupees(money.total)} big />

          {err && <div className="ms-err" style={{ marginTop: 15 }}>{err}</div>}

          <div style={{ marginTop: 17 }}>
            {rzp ? (
              <>
                <MedalPay
                  order={rzp.order}
                  orderNo={rzp.orderNo}
                  buyer={f}
                  onDone={(orderNo, email) => {
                    cartClear();     // bik gaya — cart khali
                    router.replace(`/medal-store/order/${orderNo}?email=${encodeURIComponent(email)}&new=1`);
                  }}
                  onFail={(msg) => {
                    /* Khali message = user ne khud window band ki.
                       Uspar error dikhana bekaar hai. Par order ab
                       chhoot chuka hai, isliye dobara checkout
                       karna padega — cart waisa hi rehta hai. */
                    setErr(msg || "");
                    setRzp(null);
                  }}
                />
                <p style={{ fontSize: 11.5, color: "#a8a29e", textAlign: "center", marginTop: 11 }}>
                  Order {rzp.orderNo} · held for 20 minutes
                </p>
              </>
            ) : (
              <button onClick={start} disabled={busy || !filled} className="ms-btn" style={{ width: "100%" }}>
                {busy ? "Please wait…" : `Pay ${rupees(money.total)}`}
              </button>
            )}
          </div>

          <p style={{ fontSize: 11.5, color: "#a8a29e", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
            Payment is handled by Razorpay. We never see your card details.
          </p>
        </div>
      </div>
    </Shell>
  );
}

const Shell = ({ children }) => (
  <div className="ms">
    <style>{medalCss + cartCss}</style>
    {children}
  </div>
);

const F = ({ label, hint, children }) => (
  <div className="ms-field">
    <label className="ms-label">{label}</label>
    {children}
    {hint && <div style={{ fontSize: 11.5, color: "#a8a29e", marginTop: 5 }}>{hint}</div>}
  </div>
);

const Line = ({ label, value, big, green }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
    fontSize: big ? 18 : 14, fontWeight: big ? 900 : 500,
    color: big ? "#171717" : green ? "#15803d" : "#57534e", marginTop: big ? 0 : 8 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);
