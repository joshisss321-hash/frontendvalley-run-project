"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { storeAPI, rupees } from "@/lib/storeApi";
import { C } from "../../theme";
import { StorePage, StoreClosed, ProductCard } from "../../StoreChrome";

export default function ProductDetail() {
  const { slug } = useParams();

  const [settings, setSettings] = useState({});
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState("loading");   // loading | ok | missing | closed
  const [closedMsg, setClosedMsg] = useState("");

  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      const [s, p] = await Promise.all([storeAPI.settings(), storeAPI.product(slug)]);

      if (s?.disabled || p?.disabled) { setClosedMsg(s?.message || p?.message); setState("closed"); return; }
      setSettings(s?.settings || {});

      if (!p?.success) { setState("missing"); return; }

      setProduct(p.product);
      setRelated(p.related || []);
      // Pehla aisa variant jisme stock ho — khatam wala pehle se chuna hona bura lagta hai
      const v = p.product.variants?.find((x) => x.inStock) || p.product.variants?.[0] || null;
      setVariant(v?._id || null);
      setState("ok");
    })();
  }, [slug]);

  if (state === "closed") return <StoreClosed message={closedMsg} />;
  if (state === "loading") {
    return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b8378", fontFamily: "Inter, sans-serif" }}>Loading…</div>;
  }

  if (state === "missing") {
    return (
      <StorePage settings={settings}>
        <div className="vs-wrap" style={{ padding: "90px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 42, marginBottom: 14 }}>🔍</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.ink }}>Product not found</h1>
          <p style={{ fontSize: 15, color: C.body, marginTop: 10 }}>
            This product may have been removed or is not available right now.
          </p>
          <Link href="/store/search" className="vs-btn vs-btn-primary" style={{ marginTop: 24 }}>
            Browse all products
          </Link>
        </div>
      </StorePage>
    );
  }

  const p = product;
  const hasVariants = p.variants?.length > 0;
  const chosen = hasVariants ? p.variants.find((v) => v._id === variant) : null;

  const price = chosen ? chosen.price : p.priceFrom;
  const mrp = chosen ? chosen.mrp : p.mrp;
  const canBuy = hasVariants ? Boolean(chosen?.inStock) : p.inStock;
  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const images = p.images?.length ? p.images : (p.featuredImage ? [{ url: p.featuredImage }] : []);

  return (
    <StorePage settings={settings}>
      <div className="vs-wrap" style={{ padding: "26px 24px 10px", fontSize: 12.5, color: C.muted }}>
        <Link href="/store" style={{ color: C.muted, textDecoration: "none" }}>Store</Link>
        {p.categories?.[0] && (
          <>
            {" / "}
            <Link href={`/store/category/${p.categories[0].slug}`} style={{ color: C.muted, textDecoration: "none" }}>
              {p.categories[0].name}
            </Link>
          </>
        )}
        {" / "}<span style={{ color: C.ink }}>{p.name}</span>
      </div>

      <section style={{ padding: "16px 0 60px" }}>
        <div className="vs-wrap">
          <div className="vs-pd" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

            {/* ── Photos ── */}
            <div>
              <div style={{
                borderRadius: 18, overflow: "hidden", background: C.sand,
                aspectRatio: "1/1", border: `1px solid ${C.line}`,
              }}>
                {images[img]
                  ? <img src={images[img].url} alt={images[img].alt || p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>🧺</div>}
              </div>

              {images.length > 1 && (
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  {images.map((im, i) => (
                    <button key={im.url} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}
                      style={{
                        width: 72, height: 72, borderRadius: 11, overflow: "hidden", padding: 0,
                        cursor: "pointer", background: C.sand,
                        border: `2.5px solid ${i === img ? C.forest : "transparent"}`,
                      }}>
                      <img src={im.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Jaankari ── */}
            <div>
              {p.sourceRegion && (
                <div className="vs-eyebrow" style={{ marginBottom: 10 }}>📍 {p.sourceRegion}</div>
              )}

              <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.1px", lineHeight: 1.15, color: C.ink, margin: 0 }}>
                {p.name}
              </h1>

              {p.shortDesc && (
                <p style={{ fontSize: 15.5, lineHeight: 1.75, color: C.body, marginTop: 13 }}>{p.shortDesc}</p>
              )}

              {/* Rating sirf asli reviews par — warna kuch nahi */}
              {p.ratingCount > 0 && (
                <div style={{ marginTop: 12, fontSize: 14, color: C.body }}>
                  ★ {p.ratingAvg.toFixed(1)} <span style={{ color: C.muted }}>({p.ratingCount})</span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                <span style={{ fontSize: 31, fontWeight: 800, color: C.forest }}>{rupees(price)}</span>
                {mrp && mrp > price && (
                  <>
                    <span style={{ fontSize: 16, color: C.muted, textDecoration: "line-through" }}>{rupees(mrp)}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: "#fff", background: C.gold, padding: "4px 11px", borderRadius: 100 }}>
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* ── Pack size ── */}
              {hasVariants && (
                <div style={{ marginTop: 26 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 10 }}>Pack size</div>
                  <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                    {p.variants.map((v) => {
                      const on = v._id === variant;
                      return (
                        <button key={v._id} onClick={() => v.inStock && setVariant(v._id)} disabled={!v.inStock}
                          style={{
                            padding: "11px 18px", borderRadius: 11, cursor: v.inStock ? "pointer" : "not-allowed",
                            fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, textAlign: "left",
                            background: on ? C.forest : C.white,
                            color: on ? "#fff" : v.inStock ? C.ink : C.muted,
                            border: `1.5px solid ${on ? C.forest : C.line}`,
                            opacity: v.inStock ? 1 : .55,
                            textDecoration: v.inStock ? "none" : "line-through",
                          }}>
                          <div>{v.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, opacity: .85, marginTop: 2 }}>
                            {rupees(v.price)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Kitne ── */}
              <div style={{ marginTop: 26, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${C.line}`, borderRadius: 11, background: C.white }}>
                  <QtyBtn onClick={() => setQty((n) => Math.max(1, n - 1))} disabled={qty <= 1}>−</QtyBtn>
                  <span style={{ minWidth: 42, textAlign: "center", fontWeight: 700, fontSize: 15 }}>{qty}</span>
                  <QtyBtn onClick={() => setQty((n) => n + 1)}>+</QtyBtn>
                </div>

                <span style={{ fontSize: 13.5, fontWeight: 700, color: canBuy ? C.moss : C.danger }}>
                  {canBuy ? "● In stock" : "● Out of stock"}
                </span>
              </div>

              {/* ── Kharidna ──
                  Cart agle phase mein banega. Jhootha button dikhane se behtar
                  hai saaf likhna ki abhi nahi khul raha. */}
              <button
                disabled
                title="Checkout abhi ban raha hai"
                className="vs-btn"
                style={{
                  marginTop: 22, width: "100%", background: C.sand, color: C.muted,
                  cursor: "not-allowed", border: `1.5px dashed ${C.line}`,
                }}>
                Add to Cart — coming soon
              </button>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 9, textAlign: "center" }}>
                Online ordering opens shortly. {settings.supportPhone ? `Until then, call ${settings.supportPhone}.` : ""}
              </div>

              {/* ── Detail ── */}
              <div style={{ marginTop: 32, borderTop: `1px solid ${C.line}` }}>
                <Detail label="About this product" value={p.longDesc} />
                <Detail label="Ingredients" value={p.ingredients} />
                <Detail label="Storage" value={p.storage} />
                <Detail label="Shelf life" value={p.shelfLife} />
                <Detail label="Shipping" value={p.shippingNote || shippingLine(settings)} />
                <Detail
                  label="Returns"
                  value={p.isReturnable ? (p.returnNote || settings.returnPolicy) : "This item cannot be returned once delivered."}
                />
              </div>

              {/* ── Kanooni ──
                  Server khali field bhejta hi nahi, isliye ye hissa tabhi
                  dikhega jab sach mein kuch bhara ho. */}
              {p.legal?.length > 0 && (
                <div style={{
                  marginTop: 22, padding: 16, borderRadius: 12,
                  background: C.white, border: `1px solid ${C.line}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.3, textTransform: "uppercase", color: C.muted, marginBottom: 10 }}>
                    Product Information
                  </div>
                  {p.legal.map((l) => (
                    <div key={l.label} style={{ display: "flex", gap: 10, fontSize: 13, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ color: C.muted, minWidth: 128 }}>{l.label}</span>
                      <span style={{ color: C.ink, fontWeight: 600 }}>{l.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 70 }}>
              <span className="vs-eyebrow">You may also like</span>
              <h2 className="vs-h2" style={{ fontSize: 28 }}>More from the valley</h2>
              <div className="vs-grid" style={{ marginTop: 26 }}>
                {related.slice(0, 4).map((r) => <ProductCard key={r._id} p={r} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`@media(max-width:860px){ .vs-pd{ grid-template-columns:1fr!important; gap:28px!important } }`}</style>
    </StorePage>
  );
}

const QtyBtn = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: 42, height: 44, border: "none", background: "none", fontSize: 19,
    cursor: disabled ? "not-allowed" : "pointer", color: disabled ? "#c9c3b8" : C.ink,
    fontFamily: "inherit",
  }}>
    {children}
  </button>
);

const Detail = ({ label, value }) => {
  if (!value) return null;
  return (
    <div style={{ padding: "16px 0", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: C.muted, marginBottom: 7 }}>
        {label}
      </div>
      <div style={{ fontSize: 14.5, lineHeight: 1.75, color: C.body, whiteSpace: "pre-line" }}>{value}</div>
    </div>
  );
};

/* Shipping ki baat settings se — jhoothi "guaranteed delivery" kabhi nahi */
const shippingLine = (s) => {
  if (!s) return "";
  if (s.shippingMode === "free") return "Free shipping on all orders.";
  if (s.freeShippingOver > 0) return `Free shipping on orders above ${rupees(s.freeShippingOver)}.`;
  if (s.shippingMode === "flat" && s.shippingFlat > 0) return `Shipping ${rupees(s.shippingFlat)} per order.`;
  return "";
};
