"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { medalAPI, rupees } from "@/lib/medalApi";
import { medalCss } from "../../theme";

/* Order ka haal.

   Login nahi hai, isliye email maangna zaroori hai — warna koi bhi
   order number badal-badal kar doosron ka pata aur phone padh
   leta. Payment ke turant baad email URL mein aa jaata hai, isliye
   tab kuch poochhna nahi padta. */

const STEPS = [
  ["confirmed",  "Order confirmed"],
  ["processing", "Being packed"],
  ["shipped",    "On its way"],
  ["delivered",  "Delivered"],
];

export default function OrderPage() {
  return (
    <div className="ms">
      <style>{medalCss}</style>
      <Inner />
    </div>
  );
}

function Inner() {
  const { orderNo } = useParams();
  const params = useSearchParams();
  const isNew = params.get("new") === "1";

  const [email, setEmail] = useState(params.get("email") || "");
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [asked, setAsked] = useState(false);

  const load = async (addr) => {
    if (!addr?.trim()) { setErr("Please enter the email you ordered with."); return; }
    setBusy(true); setErr("");
    const r = await medalAPI.order(orderNo, addr.trim());
    setBusy(false);
    setAsked(true);
    if (r?.success) setOrder(r.order);
    else setErr(r?.message || "Could not find that order.");
  };

  useEffect(() => {
    if (params.get("email")) load(params.get("email"));
    else setAsked(true);
  }, []);

  /* ── Email maango ── */
  if (!order) {
    return (
      <div className="ms-wrap ms-narrow" style={{ padding: "50px 20px 80px" }}>
        <h1 className="ms-title">Your order</h1>
        <p style={{ fontSize: 14.5, color: "#78716c", marginTop: 9 }}>
          Order <strong style={{ color: "#171717" }}>{orderNo}</strong>
        </p>

        <div className="ms-box" style={{ marginTop: 20 }}>
          <label className="ms-label">The email you ordered with</label>
          <input className="ms-input" type="email" value={email} autoFocus
            onChange={(e) => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={(e) => e.key === "Enter" && load(email)} />
          {err && <div className="ms-err" style={{ marginTop: 13 }}>{err}</div>}
          <button onClick={() => load(email)} disabled={busy} className="ms-btn"
            style={{ marginTop: 15, width: "100%" }}>
            {busy ? "Checking…" : "Show my order"}
          </button>
        </div>

        {asked && (
          <p style={{ fontSize: 12.5, color: "#a8a29e", marginTop: 16, textAlign: "center" }}>
            Can't find it? Check the confirmation email we sent you.
          </p>
        )}
      </div>
    );
  }

  const o = order;
  const cancelled = ["cancelled", "refunded"].includes(o.orderStatus);
  const stepAt = STEPS.findIndex(([k]) => k === o.orderStatus);

  return (
    <div className="ms-wrap ms-narrow" style={{ padding: "36px 20px 80px" }}>
      {isNew && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 14,
          padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 19, fontWeight: 900, color: "#15803d" }}>
            Thank you — your order is confirmed
          </div>
          <p style={{ fontSize: 13.5, color: "#166534", margin: "7px 0 0", lineHeight: 1.65 }}>
            We have emailed the details to {o.address?.name ? "" : ""}<strong>{email}</strong>.
            Keep this order number safe: <strong>{o.orderNo}</strong>
          </p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
        <h1 className="ms-title" style={{ margin: 0 }}>{o.orderNo}</h1>
        <span style={{ fontSize: 13, color: "#78716c" }}>
          {new Date(o.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* ── Kahan tak pahuncha ── */}
      <div className="ms-box" style={{ marginTop: 18 }}>
        {cancelled ? (
          <div style={{ fontWeight: 800, color: "#991b1b", fontSize: 15 }}>
            This order was {o.orderStatus}.
          </div>
        ) : o.paymentStatus !== "paid" ? (
          <div style={{ fontWeight: 800, color: "#b45309", fontSize: 15 }}>
            Payment not completed yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {STEPS.map(([key, label], i) => {
              const done = i <= stepAt;
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: done ? "#15803d" : "#e7e5e4", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                    {done ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: 14.5, fontWeight: done ? 700 : 500,
                    color: done ? "#171717" : "#a8a29e" }}>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {o.trackingId && (
          <div style={{ marginTop: 18, paddingTop: 15, borderTop: "1px solid #e7e5e4" }}>
            <div style={{ fontSize: 12.5, color: "#78716c" }}>
              {o.courier || "Courier"} · <strong style={{ color: "#171717" }}>{o.trackingId}</strong>
            </div>
            {o.trackingUrl && (
              <a href={o.trackingUrl} target="_blank" rel="noopener noreferrer"
                className="ms-btn ms-btn-ghost" style={{ marginTop: 12, minHeight: 42, fontSize: 13.5 }}>
                Track the parcel
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Kya khareeda ── */}
      <div className="ms-box" style={{ marginTop: 14 }}>
        {o.items.map((i, n) => (
          <div key={n} style={{ display: "flex", gap: 13, alignItems: "center",
            paddingBottom: 13, marginBottom: 13, borderBottom: "1px solid #f1efec" }}>
            {i.image && <img src={i.image} alt="" width={56} height={56}
              style={{ borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: "#171717", fontSize: 14.5 }}>{i.name}</div>
              <div style={{ fontSize: 12.5, color: "#78716c" }}>Qty {i.qty}</div>
            </div>
            <strong style={{ fontSize: 14.5 }}>{rupees(i.lineTotal)}</strong>
          </div>
        ))}

        <Line label="Subtotal" value={rupees(o.subtotal)} />
        <Line label="Delivery" value={o.shipping > 0 ? rupees(o.shipping) : "Free"} />
        <div style={{ height: 1, background: "#e7e5e4", margin: "11px 0" }} />
        <Line label="Total paid" value={rupees(o.total)} big />
      </div>

      {/* ── Pata ── */}
      <div className="ms-box" style={{ marginTop: 14 }}>
        <div className="ms-event" style={{ color: "#a8a29e" }}>Delivering to</div>
        <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7, color: "#44403c" }}>
          <strong style={{ color: "#171717" }}>{o.address?.name}</strong><br />
          {[o.address?.line1, o.address?.line2, o.address?.landmark,
            o.address?.city, o.address?.state, o.address?.pincode].filter(Boolean).join(", ")}<br />
          {o.address?.phone}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 26 }}>
        <Link href="/medal-store" className="ms-btn ms-btn-ghost">See other medals</Link>
      </div>
    </div>
  );
}

const Line = ({ label, value, big }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
    fontSize: big ? 17 : 14, fontWeight: big ? 900 : 500,
    color: big ? "#171717" : "#57534e", marginTop: big ? 0 : 7 }}>
    <span>{label}</span><span>{value}</span>
  </div>
);
