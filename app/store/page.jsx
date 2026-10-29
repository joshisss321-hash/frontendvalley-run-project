"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storeAPI } from "@/lib/storeApi";
import { C } from "./theme";
import { StorePage, StoreClosed, ProductCard } from "./StoreChrome";

export default function StoreHome() {
  const [data, setData] = useState(null);
  const [closed, setClosed] = useState(null);

  useEffect(() => {
    (async () => {
      const [settings, cats, products, banners] = await Promise.all([
        storeAPI.settings(),
        storeAPI.categories(),
        storeAPI.products({ limit: 8 }),
        storeAPI.banners(),
      ]);

      if (settings?.disabled) { setClosed(settings.message); return; }

      setData({
        settings: settings?.settings || {},
        categories: cats?.categories || [],
        products: products?.products || [],
        banners: banners?.banners || [],
      });
    })();
  }, []);

  if (closed) return <StoreClosed message={closed} />;
  if (!data) return <Loading />;

  const { settings, categories, products, banners } = data;
  const featured = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const strip = banners.filter((b) => b.placement !== "hero");

  return (
    <StorePage settings={settings}>
      {/* ═══ HERO ═══ */}
      <section style={{
        background: C.forestDeep, color: "#fff", position: "relative", overflow: "hidden",
      }}>
        {settings.heroImage && (
          <>
            <img src={settings.heroImage} alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .42 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${C.forestDeep} 12%, rgba(13,59,32,.55) 100%)` }} />
          </>
        )}

        <div className="vs-wrap" style={{ position: "relative", padding: "104px 24px 96px" }}>
          <div style={{ maxWidth: 650 }}>
            <span className="vs-eyebrow" style={{ color: C.goldPale }}>
              Authentic Pahadi Products
            </span>
            <h1 className="vs-hero-h1" style={{
              fontSize: 56, fontWeight: 900, letterSpacing: "-2.2px", lineHeight: 1.05,
              color: "#fff", margin: "14px 0 0",
            }}>
              {settings.heroHeading || "Bring the Goodness of the Himalayas Home."}
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "rgba(255,255,255,.82)", marginTop: 20, maxWidth: 540 }}>
              {settings.heroSubtext ||
                "Discover authentic Pahadi products, local flavours and traditional goodness from the mountains of Uttarakhand."}
            </p>

            <div style={{ display: "flex", gap: 13, marginTop: 34, flexWrap: "wrap" }}>
              <Link href={settings.heroCtaLink || "/store/search"} className="vs-btn"
                style={{ background: C.goldPale, color: C.forestDeep }}>
                {settings.heroCtaText || "Shop All Products"} →
              </Link>
              {categories.length > 0 && (
                <a href="#categories" className="vs-btn"
                  style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,.3)" }}>
                  Explore Pahadi Goodness
                </a>
              )}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:760px){ .vs-hero-h1{ font-size:36px!important; letter-spacing:-1px!important } }`}</style>
      </section>

      {/* ═══ TRUST STRIP ═══
          Sirf wahi baatein jo sach hain. "Verified Organic" ya "Lab Tested"
          jab tak certificate na ho, kabhi nahi. */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}>
        <div className="vs-wrap" style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
          gap: 16, padding: "22px 24px",
        }}>
          {[
            ["🏔️", "Pahadi Products"],
            ["📋", "Transparent Details"],
            ["🔒", "Secure Checkout"],
            ["📦", "Delivery Support"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
              <span style={{ fontSize: 19 }}>{icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ OFFER BANNER ═══
          Countdown tabhi jab asli endsAt ho — nakli timer kabhi nahi */}
      {strip.length > 0 && (
        <div style={{ background: C.gold, color: "#fff" }}>
          <div className="vs-wrap" style={{ padding: "15px 24px", textAlign: "center" }}>
            <strong style={{ fontSize: 14.5 }}>{strip[0].title}</strong>
            {strip[0].subtitle && (
              <span style={{ fontSize: 14, marginLeft: 9, opacity: .92 }}>{strip[0].subtitle}</span>
            )}
            {strip[0].couponCode && (
              <span style={{
                marginLeft: 11, background: "rgba(255,255,255,.22)", padding: "3px 11px",
                borderRadius: 6, fontWeight: 800, fontSize: 13, letterSpacing: .5,
              }}>
                {strip[0].couponCode}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ═══ CATEGORIES ═══ */}
      {categories.length > 0 && (
        <section className="vs-section" id="categories">
          <div className="vs-wrap">
            <span className="vs-eyebrow">Shop by Category</span>
            <h2 className="vs-h2">Straight from the mountains</h2>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))",
              gap: 20, marginTop: 36,
            }}>
              {categories.map((cat) => (
                <Link key={cat._id} href={`/store/category/${cat.slug}`} className="vs-cat">
                  {cat.image
                    ? <img src={cat.image} alt={cat.imageAlt || cat.name} loading="lazy" />
                    : <div style={{ width: "100%", height: "100%", background: C.sand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🧺</div>}

                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(13,59,32,.9) 0%, rgba(13,59,32,.1) 62%)",
                    display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 18,
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-.3px" }}>
                      {cat.name}
                    </div>
                    {cat.description && (
                      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.78)", marginTop: 4, lineHeight: 1.5 }}>
                        {cat.description}
                      </div>
                    )}
                    <div style={{ fontSize: 11.5, color: C.goldPale, marginTop: 7, fontWeight: 700 }}>
                      {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Row title="Featured" heading="Picked for you" items={featured} />
      <Row title="Best Sellers" heading="What people buy most" items={bestSellers} alt />
      <Row title="New Arrivals" heading="Fresh from the valley" items={newArrivals} />

      {/* Koi khaas tag nahi laga — to jo hai wahi dikha do */}
      {featured.length === 0 && bestSellers.length === 0 && newArrivals.length === 0 && (
        <Row title="Our Products" heading="From our mountains" items={products} />
      )}

      {/* ═══ STORY ═══ */}
      {(settings.storyBody || settings.storyHeading) && (
        <section className="vs-section" style={{ background: C.forestDeep, color: "#fff" }}>
          <div className="vs-wrap" style={{
            display: "grid", gridTemplateColumns: settings.storyImage ? "1fr 1fr" : "1fr",
            gap: 46, alignItems: "center",
          }} >
            <div>
              <span className="vs-eyebrow" style={{ color: C.goldPale }}>Our Pahadi Story</span>
              <h2 className="vs-h2" style={{ color: "#fff" }}>
                {settings.storyHeading || "From Our Mountains to Your Home."}
              </h2>
              {settings.storyBody && (
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: "rgba(255,255,255,.8)", marginTop: 18, whiteSpace: "pre-line" }}>
                  {settings.storyBody}
                </p>
              )}
            </div>
            {settings.storyImage && (
              <img src={settings.storyImage} alt="" loading="lazy"
                style={{ width: "100%", borderRadius: 18, display: "block" }} />
            )}
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      {settings.faqs?.length > 0 && (
        <section className="vs-section">
          <div className="vs-wrap" style={{ maxWidth: 780 }}>
            <span className="vs-eyebrow">Questions</span>
            <h2 className="vs-h2">Good to know</h2>
            <div style={{ marginTop: 30 }}>
              {settings.faqs.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>
      )}
    </StorePage>
  );
}

/* ── Ek product row ── */
function Row({ title, heading, items, alt }) {
  if (!items?.length) return null;
  return (
    <section className="vs-section" style={alt ? { background: C.white } : undefined}>
      <div className="vs-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <span className="vs-eyebrow">{title}</span>
            <h2 className="vs-h2">{heading}</h2>
          </div>
          <Link href="/store/search" style={{ fontSize: 13.5, fontWeight: 700, color: C.forest, textDecoration: "none", whiteSpace: "nowrap" }}>
            View all →
          </Link>
        </div>
        <div className="vs-grid" style={{ marginTop: 34 }}>
          {items.slice(0, 8).map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: "none", border: "none", padding: "19px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
        cursor: "pointer", fontFamily: "inherit", textAlign: "left",
      }}>
        <span style={{ fontSize: 15.5, fontWeight: 700, color: C.ink }}>{q}</span>
        <span style={{ fontSize: 20, color: C.gold, flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p style={{ fontSize: 14.5, lineHeight: 1.8, color: C.body, margin: "0 0 20px", paddingRight: 30 }}>{a}</p>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b8378", fontFamily: "Inter, sans-serif" }}>
      Loading the valley…
    </div>
  );
}
