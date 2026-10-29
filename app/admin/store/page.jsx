'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import StoreShell, { Card } from './StoreShell';

/* Valley Store ka admin landing. Abhi Products aur Categories chalu hain;
   Orders/Coupons aage banenge, isliye wo tiles abhi band dikhte hain —
   click karke khali page milne se behtar hai saaf likha ho. */
export default function StoreAdminHome() {
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const [p, c] = await Promise.all([
        adminAPI.store.products.list({ limit: 1 }),
        adminAPI.store.categories.list(),
      ]);
      const live = await adminAPI.store.products.list({ published: '1', limit: 1 });
      setStats({
        products: p?.total ?? 0,
        live: live?.total ?? 0,
        categories: c?.categories?.length ?? 0,
      });
    })();
  }, []);

  const tiles = [
    { title: 'Products', desc: 'Add products, photos, price aur stock', href: '/admin/store/products', ready: true },
    { title: 'Categories', desc: 'Ghee, Atta, Honey — groups banayiye', href: '/admin/store/categories', ready: true },
    { title: 'Orders', desc: 'Checkout banne ke baad', href: null, ready: false },
    { title: 'Coupons', desc: 'Checkout banne ke baad', href: null, ready: false },
  ];

  return (
    <StoreShell title="Valley Store" subtitle="Pahadi products ka admin" back="/admin/dashboard">
      <Card>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Stat n={stats?.products} label="Total products" />
          <Stat n={stats?.live} label="Live" color="#15803d" />
          <Stat n={stats?.categories} label="Categories" />
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {tiles.map((t) => (
          <div
            key={t.title}
            onClick={() => t.ready && router.push(t.href)}
            style={{
              background: '#fff', borderRadius: 14, padding: 18,
              boxShadow: '0 2px 8px rgba(0,0,0,.06)',
              cursor: t.ready ? 'pointer' : 'default',
              opacity: t.ready ? 1 : .5,
              border: '2px solid transparent',
              transition: 'border-color .2s',
            }}
            onMouseEnter={(e) => { if (t.ready) e.currentTarget.style.borderColor = '#14532d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <div style={{ fontWeight: 800, fontSize: 16, color: '#14532d' }}>{t.title}</div>
            <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 5, lineHeight: 1.5 }}>{t.desc}</div>
            {!t.ready && (
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, fontWeight: 700 }}>Abhi nahi bana</div>
            )}
          </div>
        ))}
      </div>

      <Card style={{ marginTop: 14, background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: '#92400e', marginBottom: 6 }}>
          Store abhi customers ko nahi dikh raha
        </div>
        <div style={{ fontSize: 12.5, color: '#a16207', lineHeight: 1.65 }}>
          Aap yahan aaram se products bana sakte hain — website par kuch nahi dikhega jab tak
          server par <strong>STORE_ENABLED=true</strong> set na ho. Har product bhi alag se
          <strong> Publish</strong> karna padta hai. Yaani do taale hain, galti se kuch live
          nahi hoga.
        </div>
      </Card>
    </StoreShell>
  );
}

const Stat = ({ n, label, color = '#111827' }) => (
  <div>
    <div style={{ fontSize: 26, fontWeight: 800, color }}>{n ?? '—'}</div>
    <div style={{ fontSize: 12, color: '#9ca3af' }}>{label}</div>
  </div>
);
