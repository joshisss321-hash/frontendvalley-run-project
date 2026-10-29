"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { storeAPI } from "@/lib/storeApi";
import { C } from "./theme";
import { StorePage, StoreClosed, ProductCard } from "./StoreChrome";

/* Search page aur category page dono yahi hain.
   categorySlug diya ho to wo category, warna poora store. Do alag listing
   likhte to filter ek jagah theek hota aur dusri jagah reh jaata. */
export default function ProductList({ categorySlug = null }) {
  const [settings, setSettings] = useState({});
  const [cats, setCats] = useState([]);
  const [rows, setRows] = useState([]);
  const [info, setInfo] = useState({ total: 0, totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");

  const category = cats.find((c) => c.slug === categorySlug);

  const load = async (page = 1) => {
    setLoading(true);
    const res = await storeAPI.products({
      category: categorySlug || undefined,
      q: q || undefined,
      sort: sort || undefined,
      inStock: onlyInStock ? 1 : undefined,
      max: maxPrice || undefined,
      page,
      limit: 24,
    });

    if (res?.disabled) { setClosed(res.message); return; }

    setRows(res?.products || []);
    setInfo({ total: res?.total || 0, totalPages: res?.totalPages || 1, page: res?.page || page });
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const [s, c] = await Promise.all([storeAPI.settings(), storeAPI.categories()]);
      if (s?.disabled) { setClosed(s.message); return; }
      setSettings(s?.settings || {});
      const list = c?.categories || [];
      setCats(list);

      // Category URL hai par aisi koi category live nahi — saaf batao
      if (categorySlug && !list.some((x) => x.slug === categorySlug)) setNotFound(true);
      load(1);
    })();
  }, [categorySlug]);

  // Filter badla to hamesha pehle page se
  useEffect(() => { if (!closed) load(1); }, [sort, onlyInStock]);

  if (closed) return <StoreClosed message={closed} />;

  return (
    <StorePage settings={settings}>
      {/* ── Page ka sir ── */}
      <div style={{ background: C.forestDeep, color: "#fff" }}>
        <div className="vs-wrap" style={{ padding: "48px 24px 42px" }}>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", marginBottom: 10 }}>
            <Link href="/store" style={{ color: "rgba(255,255,255,.55)", textDecoration: "none" }}>Store</Link>
            {category && <> <span style={{ opacity: .5 }}>/</span> {category.name}</>}
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.2px", margin: 0, color: "#fff" }}>
            {category ? category.name : "All Products"}
          </h1>
          {category?.description && (
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.75)", marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Chhantai ── */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 55, zIndex: 20 }}>
        <div className="vs-wrap" style={{ padding: "14px 24px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="vs-input"
            style={{ flex: 1, minWidth: 180 }}
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(1)}
          />
          <select className="vs-input" style={{ width: "auto", minWidth: 160 }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort: Featured</option>
            <option value="new">Newest first</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
            <option value="popular">Most popular</option>
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: C.ink, cursor: "pointer", whiteSpace: "nowrap" }}>
            <input type="checkbox" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer" }} />
            In stock only
          </label>
          <button onClick={() => load(1)} className="vs-btn vs-btn-primary" style={{ padding: "12px 24px", fontSize: 14 }}>
            Search
          </button>
        </div>
      </div>

      {/* ── Categories ki patti ── */}
      {cats.length > 0 && (
        <div className="vs-wrap" style={{ padding: "18px 24px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Chip href="/store/search" on={!categorySlug}>All</Chip>
          {cats.map((c) => (
            <Chip key={c._id} href={`/store/category/${c.slug}`} on={c.slug === categorySlug}>
              {c.name}
            </Chip>
          ))}
        </div>
      )}

      {/* ── Products ── */}
      <section style={{ padding: "26px 0 70px" }}>
        <div className="vs-wrap">
          {loading ? (
            <Empty icon="⏳" title="Loading…" />
          ) : notFound ? (
            <Empty icon="🔍" title="Category not found"
              text="This category is not available right now."
              cta={{ href: "/store/search", label: "Browse all products" }} />
          ) : rows.length === 0 ? (
            <Empty icon="🧺" title="Nothing here yet"
              text={q ? `No products matched "${q}".` : "Products will appear here soon."}
              cta={q ? null : { href: "/store", label: "Back to store" }} />
          ) : (
            <>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 18 }}>
                {info.total} {info.total === 1 ? "product" : "products"}
              </div>
              <div className="vs-grid">
                {rows.map((p) => <ProductCard key={p._id} p={p} />)}
              </div>

              {info.totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", marginTop: 42 }}>
                  <button onClick={() => load(info.page - 1)} disabled={info.page <= 1}
                    className="vs-btn vs-btn-ghost"
                    style={{ padding: "11px 20px", fontSize: 13.5, opacity: info.page <= 1 ? .4 : 1 }}>
                    ← Previous
                  </button>
                  <span style={{ fontSize: 13.5, color: C.muted }}>{info.page} / {info.totalPages}</span>
                  <button onClick={() => load(info.page + 1)} disabled={info.page >= info.totalPages}
                    className="vs-btn vs-btn-ghost"
                    style={{ padding: "11px 20px", fontSize: 13.5, opacity: info.page >= info.totalPages ? .4 : 1 }}>
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </StorePage>
  );
}

const Chip = ({ href, on, children }) => (
  <Link href={href} style={{
    padding: "8px 17px", borderRadius: 100, fontSize: 13, fontWeight: 700,
    textDecoration: "none", whiteSpace: "nowrap",
    background: on ? C.forest : C.white,
    color: on ? "#fff" : C.body,
    border: `1.5px solid ${on ? C.forest : C.line}`,
  }}>
    {children}
  </Link>
);

const Empty = ({ icon, title, text, cta }) => (
  <div style={{ textAlign: "center", padding: "70px 20px" }}>
    <div style={{ fontSize: 42, marginBottom: 14 }}>{icon}</div>
    <div style={{ fontSize: 19, fontWeight: 800, color: C.ink }}>{title}</div>
    {text && <p style={{ fontSize: 14.5, color: C.body, marginTop: 9, lineHeight: 1.7 }}>{text}</p>}
    {cta && (
      <Link href={cta.href} className="vs-btn vs-btn-primary" style={{ marginTop: 22 }}>
        {cta.label}
      </Link>
    )}
  </div>
);
