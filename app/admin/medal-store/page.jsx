'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, Stat, btn, btnLight, money, OffWarning } from './Shell';

export default function MedalStoreHome() {
  const router = useRouter();
  const [d, setD] = useState(null);

  const load = () => adminAPI.medalStore.overview().then((r) => { if (r?.success) setD(r); });
  useEffect(() => { load(); }, []);

  const s = d?.stats || {};

  const tiles = [
    { title: 'Medals',   desc: 'Add medals, photos, price and stock', href: '/admin/medal-store/products' },
    { title: 'Orders',   desc: 'Who bought what, and where to send it', href: '/admin/medal-store/orders' },
    { title: 'Settings', desc: 'Delivery charge, support details, page text', href: '/admin/medal-store/settings' },
  ];

  return (
    <Shell title="Medal Store" subtitle="Leftover medals from past events" back="/admin/dashboard">
      <OffWarning enabled={d?.enabled} />

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(96px,1fr))', gap: 8 }}>
          <Stat n={s.totalProducts}  label="Medals" />
          <Stat n={s.activeProducts} label="Live" color="#15803d" />
          <Stat n={s.availableStock} label="In stock" />
          <Stat n={s.medalsSold}     label="Sold" color="#a16207" />
          <Stat n={s.paidOrders}     label="Paid orders" />
          <Stat n={money(s.revenue)} label="Revenue" color="#15803d" />
        </div>

        {s.heldStock > 0 && (
          <div style={{ marginTop: 12, paddingTop: 11, borderTop: '1px solid #f1f3f5',
            fontSize: 12, color: '#78716c', lineHeight: 1.6 }}>
            <strong>{s.heldStock}</strong> held in checkouts right now — someone is paying.
            These free up on their own if the payment is not completed.
          </div>
        )}
      </Card>

      {s.toDispatch > 0 && (
        <Card style={{ background: '#fffbeb', border: '1.5px solid #fcd34d' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 800, fontSize: 13.5, color: '#92400e' }}>
                {s.toDispatch} paid {s.toDispatch === 1 ? 'order is' : 'orders are'} waiting to be sent
              </div>
              <div style={{ fontSize: 12.5, color: '#b45309', marginTop: 4 }}>
                People have paid. Pack them and add the tracking number.
              </div>
            </div>
            <button onClick={() => router.push('/admin/medal-store/orders?status=confirmed')}
              style={{ ...btn, background: '#b45309', whiteSpace: 'nowrap' }}>
              See orders
            </button>
          </div>
        </Card>
      )}

      {/* Khatam ho chuke medal — public se gayab, par admin ko pata
          hona chahiye warna bharna yaad hi nahi rahega */}
      {d?.outOfStock?.length > 0 && (
        <Card style={{ border: '1.5px solid #fecaca' }}>
          <div style={{ fontWeight: 800, fontSize: 13.5, color: '#991b1b', marginBottom: 4 }}>
            {d.outOfStock.length} {d.outOfStock.length === 1 ? 'medal has' : 'medals have'} run out
          </div>
          <div style={{ fontSize: 12.5, color: '#b91c1c', marginBottom: 11, lineHeight: 1.6 }}>
            These are hidden from the shop automatically. Add stock to bring them back.
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {d.outOfStock.map((m) => (
              <button key={m._id} onClick={() => router.push(`/admin/medal-store/products/${m._id}`)}
                style={{ ...btnLight, borderColor: '#fecaca' }}>
                {m.name} <span style={{ color: '#9ca3af' }}>· {m.soldCount} sold</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {tiles.map((t) => (
          <button key={t.title} onClick={() => router.push(t.href)}
            style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 14,
              padding: 18, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>{t.title}</div>
            <div style={{ fontSize: 12.5, color: '#9ca3af', marginTop: 5, lineHeight: 1.55 }}>{t.desc}</div>
          </button>
        ))}
      </div>
    </Shell>
  );
}
