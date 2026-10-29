'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import StoreShell, { Card, input, btnPrimary, btnLight, Pill } from '../StoreShell';

export default function StoreProducts() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState('');
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({ total: 0, totalPages: 1 });

  const load = async (p = page) => {
    setLoading(true);
    const res = await adminAPI.store.products.list({
      search, category, published, page: p, limit: 20,
    });
    if (res?.success === false) { alert(res.message); setLoading(false); return; }

    setRows(res.products || []);
    setInfo({ total: res.total || 0, totalPages: res.totalPages || 1 });
    setPage(res.page || p);
    setLoading(false);
  };

  useEffect(() => {
    adminAPI.store.categories.list().then((r) => setCats(r?.categories || []));
    load(1);
  }, []);

  // Filter badla to hamesha pehle page se — warna page 3 par khali list dikhti hai
  useEffect(() => { load(1); }, [category, published]);

  const togglePublish = async (p) => {
    const res = await adminAPI.store.products.togglePublish(p._id, !p.isPublished);
    if (res?.success === false) { alert(res.message); return; }
    load();
  };

  const remove = async (p) => {
    const sold = (p.soldCount || 0) > 0;
    const msg = sold
      ? `"${p.name}" ke orders ho chuke hain, isliye ye mitega nahi — sirf band ho jayega. Theek hai?`
      : `"${p.name}" hamesha ke liye hata dein?`;
    if (!confirm(msg)) return;

    const res = await adminAPI.store.products.remove(p._id);
    if (res?.success === false) { alert(res.message); return; }
    if (res?.archived) alert(res.message);
    load();
  };

  return (
    <StoreShell
      title="Products"
      subtitle={`${info.total} products`}
      right={
        <button onClick={() => router.push('/admin/store/products/new')}
          style={{ ...btnPrimary, background: 'rgba(255,255,255,.18)', padding: '7px 13px', fontSize: 12 }}>
          + Naya product
        </button>
      }
    >
      <Card>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            placeholder="Naam se dhoondhiye…"
            style={{ ...input, flex: 1, minWidth: 180 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(1)}
          />
          <select style={{ ...input, maxWidth: 190 }} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Saari categories</option>
            {cats.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select style={{ ...input, maxWidth: 150 }} value={published} onChange={(e) => setPublished(e.target.value)}>
            <option value="">Sab</option>
            <option value="1">Sirf live</option>
            <option value="0">Sirf band</option>
          </select>
          <button onClick={() => load(1)} style={btnPrimary}>Dhoondho</button>
        </div>
      </Card>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>📦</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {info.total === 0 ? 'Abhi koi product nahi' : 'Is filter par kuch nahi mila'}
            </div>
            {info.total === 0 && (
              <>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
                  {cats.length === 0
                    ? 'Pehle ek category banayiye, phir product daliye.'
                    : 'Pehla product daliye — photo, daam aur stock ke saath.'}
                </div>
                <button
                  onClick={() => router.push(cats.length === 0 ? '/admin/store/categories' : '/admin/store/products/new')}
                  style={btnPrimary}>
                  {cats.length === 0 ? 'Category banayiye' : '+ Pehla product'}
                </button>
              </>
            )}
          </div>
        </Card>
      ) : (
        rows.map((p) => {
          const low = p.totalStock > 0 && p.totalStock <= (p.lowStockAt || 5);
          return (
            <Card key={p._id}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                {p.featuredImage || p.images?.[0]?.url
                  ? <img src={p.featuredImage || p.images[0].url} alt=""
                      style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, background: '#f3f4f6' }} />
                  : <div style={{ width: 64, height: 64, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📦</div>}

                <div style={{ flex: 1, minWidth: 170 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{p.name}</span>
                    <Pill ok={p.isPublished}>{p.isPublished ? 'LIVE' : 'BAND'}</Pill>
                    {p.totalStock === 0 && (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: '#fee2e2', color: '#b91c1c' }}>
                        STOCK KHATAM
                      </span>
                    )}
                    {low && (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: '#fef3c7', color: '#92400e' }}>
                        STOCK KAM
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                    {(p.categories || []).map((c) => c.name).join(', ') || 'koi category nahi'}
                    {' · '}stock {p.totalStock}
                    {p.variants?.length > 0 && ` · ${p.variants.length} pack size`}
                    {(p.soldCount || 0) > 0 && ` · ${p.soldCount} bike`}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button onClick={() => togglePublish(p)} style={btnLight}>
                    {p.isPublished ? 'Band karo' : 'Live karo'}
                  </button>
                  <button onClick={() => router.push(`/admin/store/products/${p._id}`)} style={btnLight}>Edit</button>
                  <button onClick={() => remove(p)} style={{ ...btnLight, color: '#dc2626', borderColor: '#fecaca' }}>
                    Hatao
                  </button>
                </div>
              </div>
            </Card>
          );
        })
      )}

      {info.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', padding: 10 }}>
          <button disabled={page <= 1} onClick={() => load(page - 1)}
            style={{ ...btnLight, opacity: page <= 1 ? .4 : 1 }}>← Pichla</button>
          <span style={{ fontSize: 13, color: '#6b7280' }}>{page} / {info.totalPages}</span>
          <button disabled={page >= info.totalPages} onClick={() => load(page + 1)}
            style={{ ...btnLight, opacity: page >= info.totalPages ? .4 : 1 }}>Agla →</button>
        </div>
      )}
    </StoreShell>
  );
}
