'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, input, btn, btnLight, Pill, money } from '../Shell';

export default function MedalProducts() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [published, setPublished] = useState('');

  const load = async () => {
    setLoading(true);
    const r = await adminAPI.medalStore.products.list({ search, published });
    if (r?.success === false) { alert(r.message); setLoading(false); return; }
    setRows(r.medals || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [published]);

  const after = async (r) => {
    if (r?.success === false) { alert(r.message); return; }
    if (r?.message) alert(r.message);
    await load();
  };

  return (
    <Shell title="Medals" subtitle="Add, edit and restock" back="/admin/medal-store"
      right={
        <button onClick={() => router.push('/admin/medal-store/products/new')}
          style={{ background:'rgba(255,255,255,.18)', border:'none', borderRadius:8,
            padding:'7px 13px', color:'#fff', fontWeight:700, fontSize:12, cursor:'pointer' }}>
          + New medal
        </button>
      }>

      <Card style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 9 }}>
          <select style={input} value={published} onChange={(e) => setPublished(e.target.value)}>
            <option value="">All medals</option>
            <option value="1">Live only</option>
            <option value="0">Hidden only</option>
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...input, flex: 1 }} placeholder="Search by name…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load()} />
            <button onClick={load} style={btn}>Search</button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div style={{ padding: 44, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 12px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏅</div>
            <div style={{ fontWeight: 700 }}>
              {search || published ? 'Nothing matches those filters' : 'No medals yet'}
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: '7px 0 16px', lineHeight: 1.6 }}>
              Add a medal with its front and back photo, price and how many are left.
            </p>
            <button onClick={() => router.push('/admin/medal-store/products/new')} style={btn}>
              Add the first medal
            </button>
          </div>
        </Card>
      ) : (
        rows.map((m) => (
          <Card key={m._id}>
            <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {m.featuredImage || m.images?.[0]?.url
                ? <img src={m.featuredImage || m.images[0].url} alt="" style={{ width: 64, height: 64,
                    objectFit: 'cover', borderRadius: 10, background: '#f3f4f6' }} />
                : <div style={{ width: 64, height: 64, borderRadius: 10, background: '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏅</div>}

              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                  {m.isPublished
                    ? <Pill bg="#dcfce7" fg="#166534">LIVE</Pill>
                    : <Pill bg="#f3f4f6" fg="#6b7280">HIDDEN</Pill>}
                  {m.availableStock <= 0 && <Pill bg="#fee2e2" fg="#991b1b">OUT OF STOCK</Pill>}
                  {m.availableStock > 0 && m.availableStock <= 5 && <Pill bg="#fef3c7" fg="#92400e">LOW</Pill>}
                  {m.reserved > 0 && <Pill bg="#e0e7ff" fg="#3730a3">{m.reserved} IN CHECKOUT</Pill>}
                </div>

                <div style={{ fontWeight: 800, fontSize: 15 }}>{m.name}</div>
                {m.sourceRegion && (
                  <div style={{ fontSize: 11.5, color: '#a16207', fontWeight: 700, marginTop: 2 }}>
                    {m.sourceRegion}
                  </div>
                )}
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                  {money(m.price)} · <strong style={{ color: m.availableStock > 0 ? '#374151' : '#991b1b' }}>
                    {m.availableStock} available
                  </strong>
                  {m.reserved > 0 && ` (${m.stock} total, ${m.reserved} held)`}
                  {m.soldCount > 0 && ` · ${m.soldCount} sold`}
                  {` · ${(m.images || []).length} photo${(m.images || []).length === 1 ? '' : 's'}`}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                <button onClick={() => router.push(`/admin/medal-store/products/${m._id}`)} style={btnLight}>Edit</button>
                <button onClick={async () => after(await adminAPI.medalStore.products.togglePublish(m._id, !m.isPublished))}
                  style={btnLight}>{m.isPublished ? 'Hide' : 'Publish'}</button>
                <button onClick={async () => {
                  if (!confirm(`Delete ${m.name}?`)) return;
                  after(await adminAPI.medalStore.products.remove(m._id));
                }} style={{ ...btnLight, color: '#dc2626', borderColor: '#fecaca' }}>Delete</button>
              </div>
            </div>
          </Card>
        ))
      )}
    </Shell>
  );
}
