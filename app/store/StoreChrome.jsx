"use client";

import Link from "next/link";
import { C, storeCss } from "./theme";
import { rupees } from "@/lib/storeApi";

/* Store ke har page ka dhaancha — header, footer, aur CSS.
   Cart ka icon jaan-bujh kar abhi NAHI hai: cart agle phase mein banega,
   aur jo button kuch karta hi nahi wo na hone se bura hota hai. */

export function StoreHeader({ settings }) {
  return (
    <header style={{
      background: C.forestDeep, color: "#fff", position: "sticky", top: 0, zIndex: 40,
    }}>
      <div className="vs-wrap" style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "14px 24px", justifyContent: "space-between",
      }}>
        <Link href="/store" style={{ textDecoration: "none", color: "#fff", display: "flex", alignItems: "baseline", gap: 9 }}>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.4px" }}>
            Valley <span style={{ color: C.goldPale }}>Store</span>
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13.5, fontWeight: 600 }}>
          <Link href="/store/search" style={navLink}>All Products</Link>
          <Link href="/" style={{ ...navLink, opacity: .65 }}>Valley Run</Link>
        </nav>
      </div>
    </header>
  );
}

const navLink = { color: "#fff", textDecoration: "none", whiteSpace: "nowrap" };

export function StoreFooter({ settings }) {
  const s = settings || {};
  return (
    <footer style={{ background: C.forestDeep, color: "rgba(255,255,255,.72)", padding: "48px 0 32px" }}>
      <div className="vs-wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 30 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 10 }}>
              Valley <span style={{ color: C.goldPale }}>Store</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>
              {s.tagline || "Authentic Pahadi products from the mountains of Uttarakhand."}
            </p>
          </div>

          <div>
            <FootHead>Shop</FootHead>
            <FootLink href="/store">Home</FootLink>
            <FootLink href="/store/search">All Products</FootLink>
          </div>

          <div>
            <FootHead>Help</FootHead>
            {s.supportEmail && <FootLink href={`mailto:${s.supportEmail}`}>{s.supportEmail}</FootLink>}
            {s.supportPhone && <FootLink href={`tel:${s.supportPhone}`}>{s.supportPhone}</FootLink>}
            {!s.supportEmail && !s.supportPhone && (
              <div style={{ fontSize: 13.5 }}>Contact details coming soon</div>
            )}
          </div>
        </div>

        {/* Kanooni jaankari — bhari hui ho tabhi. Khali heading nahi dikhegi. */}
        {(s.legalEntityName || s.fssaiNumber || s.gstNumber) && (
          <div style={{
            marginTop: 30, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.12)",
            fontSize: 12, lineHeight: 1.8,
          }}>
            {s.legalEntityName && <div>{s.legalEntityName}</div>}
            {s.fssaiNumber && <div>FSSAI Lic. No. {s.fssaiNumber}</div>}
            {s.gstNumber && <div>GSTIN {s.gstNumber}</div>}
          </div>
        )}

        <div style={{
          marginTop: 26, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.12)",
          fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
        }}>
          <span>© {new Date().getFullYear()} Valley Store · A Valley Run initiative</span>
          <Link href="/" style={{ color: "rgba(255,255,255,.72)" }}>valleyrun.in</Link>
        </div>
      </div>
    </footer>
  );
}

const FootHead = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: C.goldPale, marginBottom: 11 }}>
    {children}
  </div>
);

const FootLink = ({ href, children }) => (
  <Link href={href} style={{ display: "block", fontSize: 13.5, color: "rgba(255,255,255,.72)", textDecoration: "none", marginBottom: 7 }}>
    {children}
  </Link>
);

/* Poore page ka lifafa — CSS yahin se aata hai */
export function StorePage({ settings, children }) {
  return (
    <div className="vs">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); ${storeCss}`}</style>
      <StoreHeader settings={settings} />
      {children}
      <StoreFooter settings={settings} />
    </div>
  );
}

/* Store band hai — ye galti nahi, isliye saaf aur sundar jawab */
export function StoreClosed({ message }) {
  return (
    <div className="vs" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{storeCss}</style>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ fontSize: 46, marginBottom: 16 }}>🏔️</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: C.ink, letterSpacing: "-.8px", margin: 0 }}>
          Opening soon
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: C.body, marginTop: 14 }}>
          {message || "Valley Store is not open yet. We are getting the mountains ready."}
        </p>
        <Link href="/" className="vs-btn vs-btn-primary" style={{ marginTop: 26 }}>
          Back to Valley Run
        </Link>
      </div>
    </div>
  );
}

/* Product card — homepage, category aur search, teeno jagah yahi */
export function ProductCard({ p }) {
  return (
    <Link href={`/store/product/${p.slug}`} className="vs-card">
      <div className="vs-card-img">
        {p.featuredImage
          ? <img src={p.featuredImage} alt={p.name} loading="lazy" />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>🧺</div>}

        {!p.inStock && (
          <div className="vs-badge" style={{ background: "rgba(28,25,23,.82)", color: "#fff" }}>
            Out of stock
          </div>
        )}
        {/* Discount tabhi jab MRP sach mein zyada ho — server ne pehle hi jaancha */}
        {p.inStock && p.discountPercent > 0 && (
          <div className="vs-badge" style={{ background: C.gold, color: "#fff" }}>
            {p.discountPercent}% off
          </div>
        )}
      </div>

      <div className="vs-card-body">
        <div style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, lineHeight: 1.4, minHeight: 40 }}>
          {p.name}
        </div>

        {p.sourceRegion && (
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 5 }}>📍 {p.sourceRegion}</div>
        )}

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16.5, fontWeight: 800, color: C.forest }}>
            {p.hasRange ? `${rupees(p.priceFrom)} – ${rupees(p.priceTo)}` : rupees(p.priceFrom)}
          </span>
          {p.mrp && (
            <span style={{ fontSize: 13, color: C.muted, textDecoration: "line-through" }}>
              {rupees(p.mrp)}
            </span>
          )}
        </div>

        {p.variants?.length > 1 && (
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>
            {p.variants.length} sizes
          </div>
        )}
        {p.variants?.length === 0 && p.unit && (
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>{p.unit}</div>
        )}
      </div>
    </Link>
  );
}
