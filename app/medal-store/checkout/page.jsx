"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "../theme";
import MedalPay from "../MedalPay";

/* useSearchParams ko Suspense boundary chahiye — isliye page ek
   patla wrapper hai aur asli kaam andar. */
export default function CheckoutPage() {
  return (
    <div className="ms">
      <style>{medalCss}</style>
      <Inner />
    </div>
  );
}

const BLANK = {
  name: "", email: "", phone: "",
  address1: "", address2: "", landmark: "",
  pincode: "", city: "", state: "", note: "",
};

const GIFT_MAX = 200;

function Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("medal") || "";
  const wanted = Math.max(1, Math.min(10, Number(params.get("qty")) || 1));

  const [medal, setMedal] = useState(null);
  const [settings, setSettings] = useState({});
  const [qty, setQty] = useState(wanted);
  const [f, setF] = useState(BLANK);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [rzp, setRzp] = useState(null);      // server ne order bana diya
  const [isGift, setIsGift] = useState(false);
  const [giftMsg, setGiftMsg] = useState("");

  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setErr(""); };

  useEffect(() => {
    if (!slug) { router.replace("/medal-store"); return; }
    Promise.all([medalAPI.one(slug), medalAPI.settings()]).then(([r, s]) => {
      setSettings(s?.settings || {});
      if (!r?.success) { router.replace(`/medal-store/${slug}`); return; }
      setMedal(r.medal);
      setQty((q) => Math.min(q, r.medal.maxQty));
    });
  }, [slug]);

  if (!medal) {
    return <div style={{ padding: 80, textAlign: "center", color: "#a8a29e" }}>Loading…</div>;
  }

  const subtotal = medal.price * qty;
  const shipFlat = Number(settings.shippingFlat) || 0;
  const freeOver = Number(settings.freeOver) || 0;
  const shipping = shipFlat <= 0 ? 0 : (freeOver > 0 && subtotal >= freeOver ? 0 : shipFlat);
  const total = subtotal + shipping;

  const filled =
    f.name.trim() && f.email.trim() && f.phone.trim() &&
    f.address1.trim() && f.address2.trim() &&
    f.pincode.trim() && f.city.trim() && f.state.trim();

  const start = async () => {
    setErr("");
    if (!filled) { setErr("Please fill in every field marked with *."); return; }

    setBusy(true);
    /* Gift ka note wahi `note` field hai jo pehle se server tak
       jaata hai — naya kuch nahi. Aage "GIFT —" lagane se admin ko
       orders list mein turant dikh jaata hai ki parcel alag tarah
       se pack karna hai. */
    const note = isGift
      ? `GIFT — ${giftMsg.trim() || "(no message)"}`.slice(0, 300)
      : f.note;

    const r = await medalAPI.checkout({ slug, qty, ...f, note });
    setBusy(false);

    if (r?.success) { setRzp({ order: r.order, orderNo: r.orderNo }); return; }

    /* Beech mein koi aur khareed gaya — saaf batao aur taaza
       quantity dikha do, taaki user dobara try kar sake */
    if (r?.code === "OUT_OF_STOCK") {
      setErr(r.message);
      if (r.left > 0) setQty(Math.min(qty, r.left));
      else setTimeout(() => router.replace("/medal-store"), 2200);
      return;
    }
    setErr(r?.message || "Could not start the payment. Please try again.");
  };

  return (
    <div className="ms-wrap ms-narrow" style={{ padding: "26px 20px 70px" }}>
      <Link href={`/medal-store/${slug}`} style={{ fontSize: 13, color: "#78716c", textDecoration: "none" }}>
        ← Back to the medal
      </Link>

      <h1 className="ms-title" style={{ marginTop: 14 }}>Checkout</h1>

      {/* ── Kya khareed rahe ho ── */}
      <div className="ms-box" style={{ marginTop: 20, display: "flex", gap: 15, alignItems: "center" }}>
        {medal.featuredImage && (
          <img src={medal.featuredImage} alt="" width={72} height={72}
            style={{ borderRadius: 11, objectFit: "cover", flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {medal.eventName && <div className="ms-event">{medal.eventName}</div>}
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "#171717", marginTop: 3 }}>{medal.name}</div>
          <div style={{ fontSize: 13, color: "#78716c", marginTop: 3 }}>
            {qty} × {rupees(medal.price)}
          </div>
        </div>
        {!rzp && (
          <div className="ms-qty" style={{ flexShrink: 0 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(medal.maxQty, q + 1))}
              disabled={qty >= medal.maxQty}>+</button>
          </div>
        )}
      </div>

      {/* ── Pata ── */}
      <div className="ms-box" style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#171717", marginBottom: 4 }}>
          {isGift ? "Where should we send the gift?" : "Where should we send it?"}
        </div>
        <p style={{ fontSize: 12.5, color: "#a8a29e", margin: "0 0 16px" }}>
          {isGift
            ? "This should be the address of the person you are gifting it to."
            : "Please check the address carefully — this is where your medal goes."}
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
        <Line label={`Medals (${qty})`} value={rupees(subtotal)} />
        <Line label="Delivery" value={shipping > 0 ? rupees(shipping) : "Free"} />
        <div style={{ height: 1, background: "#e7e5e4", margin: "12px 0" }} />
        <Line label="Total" value={rupees(total)} big />

        {err && <div className="ms-err" style={{ marginTop: 15 }}>{err}</div>}

        <div style={{ marginTop: 17 }}>
          {rzp ? (
            <>
              <MedalPay
                order={rzp.order}
                orderNo={rzp.orderNo}
                buyer={f}
                onDone={(orderNo, email) =>
                  router.replace(`/medal-store/order/${orderNo}?email=${encodeURIComponent(email)}&new=1`)
                }
                onFail={(msg) => {
                  /* Khali message = user ne khud window band ki.
                     Uspar error dikhana bekaar hai. Par order ab
                     chhoot chuka hai, isliye dobara checkout karna
                     padega. */
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
              {busy ? "Please wait…" : `Pay ${rupees(total)}`}
            </button>
          )}
        </div>

        <p style={{ fontSize: 11.5, color: "#a8a29e", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
          Payment is handled by Razorpay. We never see your card details.
        </p>
      </div>
    </div>
  );
}

const F = ({ label, hint, children }) => (
  <div className="ms-field">
    <label className="ms-label">{label}</label>
    {children}
    {hint && <div style={{ fontSize: 11.5, color: "#a8a29e", marginTop: 5 }}>{hint}</div>}
  </div>
);

const Line = ({ label, value, big }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
    fontSize: big ? 18 : 14, fontWeight: big ? 900 : 500,
    color: big ? "#171717" : "#57534e", marginTop: big ? 0 : 8 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);
