'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, input, btn, btnLight, Pill, money } from '../Shell';

/* Medal Store ke orders.

   ⚠️ Yahan sirf medal ke orders hain. Event registrations ka ispar
   koi lena-dena nahi — wo alag model, alag page, alag sab kuch. */

const FLOW = ['confirmed', 'processing', 'packed', 'shipped', 'delivered'];

const PAY = {
  paid:      ['#dcfce7', '#166534'],
  pending:   ['#fef3c7', '#92400e'],
  failed:    ['#fee2e2', '#991b1b'],
  cancelled: ['#f3f4f6', '#6b7280'],
  refunded:  ['#ede9fe', '#5b21b6'],
};

export default function MedalOrders() {
  return (
    <Shell title="Medal orders" subtitle="Who bought what, and where it goes" back="/admin/medal-store">
      <Inner />
    </Shell>
  );
}

function Inner() {
  const params = useSearchParams();
  const [rows, setRows] = useState([]);
  const [info, setInfo] = useState({ total: 0, totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [payment, setPayment] = useState('');
  const [status, setStatus] = useState(params.get('status') || '');
  const [open, setOpen] = useState(null);

  const load = async (page = 1) => {
    setLoading(true);
    const r = await adminAPI.medalStore.orders.list({
      search, paymentStatus: payment, orderStatus: status, page, limit: 20,
    });
    if (r?.success === false) { alert(r.message); setLoading(false); return; }
    setRows(r.orders || []);
    setInfo({ total: r.total || 0, totalPages: r.totalPages || 1, page: r.page || page });
    setLoading(false);
  };

  useEffect(() => { load(1); }, [payment, status]);

  const after = async (r) => {
    if (r?.success === false) { alert(r.message); return false; }
    if (r?.message) alert(r.message);
    await load(info.page);
    return true;
  };

  return (
    <>
      <Card style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 9 }}>
          <select style={input} value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="">All payments</option>
            {Object.keys(PAY).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <select style={input} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All stages</option>
            {FLOW.map((k) => <option key={k} value={k}>{k}</option>)}
            <option value="cancelled">cancelled</option>
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...input, flex: 1 }} placeholder="Order no, name, email, phone…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load(1)} />
            <button onClick={() => load(1)} style={btn}>Search</button>
          </div>
        </div>
        {info.total > 0 && (
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 9 }}>{info.total} orders</div>
        )}
      </Card>

      {loading ? (
        <div style={{ padding: 44, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 12px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
            <div style={{ fontWeight: 700 }}>No orders yet</div>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 7 }}>
              They will show up here the moment someone buys a medal.
            </p>
          </div>
        </Card>
      ) : (
        rows.map((o) => (
          <OrderRow key={o._id} o={o} open={open === o._id}
            onToggle={() => setOpen(open === o._id ? null : o._id)} after={after} />
        ))
      )}

      {info.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', padding: 10 }}>
          <button disabled={info.page <= 1} onClick={() => load(info.page - 1)}
            style={{ ...btnLight, opacity: info.page <= 1 ? .4 : 1 }}>← Previous</button>
          <span style={{ fontSize: 13, color: '#6b7280' }}>{info.page} / {info.totalPages}</span>
          <button disabled={info.page >= info.totalPages} onClick={() => load(info.page + 1)}
            style={{ ...btnLight, opacity: info.page >= info.totalPages ? .4 : 1 }}>Next →</button>
        </div>
      )}
    </>
  );
}

function OrderRow({ o, open, onToggle, after }) {
  const [busy, setBusy] = useState(false);
  const [courier, setCourier] = useState(o.courier || '');
  const [trackingId, setTrackingId] = useState(o.trackingId || '');
  const [trackingUrl, setTrackingUrl] = useState(o.trackingUrl || '');

  const pay = PAY[o.paymentStatus] || ['#f3f4f6', '#6b7280'];
  const paid = o.paymentStatus === 'paid';

  const run = async (data) => {
    setBusy(true);
    await after(await adminAPI.medalStore.orders.setStatus(o._id, data));
    setBusy(false);
  };

  const addr = o.address || {};
  const full = [addr.line1, addr.line2, addr.landmark, addr.city, addr.state, addr.pincode]
    .filter(Boolean).join(', ');

  return (
    <Card>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {o.items?.[0]?.image
          ? <img src={o.items[0].image} alt="" style={{ width: 56, height: 56, objectFit: 'cover',
              borderRadius: 10, background: '#f3f4f6' }} />
          : <div style={{ width: 56, height: 56, borderRadius: 10, background: '#f3f4f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21 }}>🏅</div>}

        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
            <strong style={{ fontSize: 14 }}>{o.orderNo}</strong>
            <Pill bg={pay[0]} fg={pay[1]}>{o.paymentStatus.toUpperCase()}</Pill>
            <Pill bg="#f3f4f6" fg="#374151">{o.orderStatus.replace(/_/g, ' ').toUpperCase()}</Pill>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>
            {o.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>
            {o.name} · {o.phone} · {new Date(o.createdAt).toLocaleDateString('en-IN')}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{money(o.total)}</div>
          <button onClick={onToggle} style={{ ...btnLight, marginTop: 7 }}>
            {open ? 'Close' : 'Open'}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid #f1f3f5' }}>
          {/* ── Pata — yahi admin ko sabse zyada chahiye ── */}
          <div style={{ background: '#f9fafb', borderRadius: 10, padding: 13 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: .7, color: '#9ca3af' }}>
              SHIP TO
            </div>
            <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.7 }}>
              <strong>{addr.name || o.name}</strong><br />
              {full}<br />
              {o.phone} · {o.email}
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(
                `${addr.name || o.name}\n${full}\n${o.phone}`
              ).catch(() => {})}
              style={{ ...btnLight, marginTop: 10, fontSize: 11.5, padding: '6px 11px' }}>
              Copy address
            </button>
          </div>

          <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 11 }}>
            {money(o.subtotal)} + {o.shipping > 0 ? `${money(o.shipping)} delivery` : 'free delivery'}
            {o.razorpayPaymentId && <> · payment {o.razorpayPaymentId}</>}
          </div>
          {o.customerNote && (
            <div style={{ fontSize: 12.5, color: '#92400e', background: '#fffbeb',
              borderRadius: 8, padding: '8px 11px', marginTop: 9 }}>
              Note from buyer: {o.customerNote}
            </div>
          )}

          {/* ── Bhejne ka intezaam ── */}
          {paid ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 9 }}>
                <input style={input} placeholder="Courier" value={courier}
                  onChange={(e) => setCourier(e.target.value)} />
                <input style={input} placeholder="Tracking ID" value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)} />
                <input style={input} placeholder="Tracking link (optional)" value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)} />
              </div>

              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 11 }}>
                {FLOW.map((st) => (
                  <button key={st} disabled={busy || o.orderStatus === st}
                    onClick={() => run({ orderStatus: st, courier, trackingId, trackingUrl })}
                    style={{ ...btnLight,
                      background: o.orderStatus === st ? '#a16207' : '#fff',
                      color: o.orderStatus === st ? '#fff' : '#374151',
                      borderColor: o.orderStatus === st ? '#a16207' : '#e5e7eb' }}>
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: '#92400e', background: '#fffbeb',
              border: '1px solid #fde68a', borderRadius: 9, padding: '10px 12px', marginTop: 13 }}>
              This order has not been paid, so it cannot be dispatched.
              {o.paymentStatus === 'pending' && ' If the payment never completes, it cancels itself.'}
            </div>
          )}

          {/* ── Cancel ── */}
          {!['cancelled', 'refunded', 'delivered'].includes(o.orderStatus) && (
            <button disabled={busy}
              onClick={() => {
                const warn = paid
                  ? 'This order is PAID. Cancelling will not put the medal back in stock — do that yourself after the refund. Continue?'
                  : 'Cancel this order?';
                if (!confirm(warn)) return;
                run({ orderStatus: 'cancelled' });
              }}
              style={{ ...btnLight, marginTop: 12, color: '#dc2626', borderColor: '#fecaca' }}>
              Cancel order
            </button>
          )}

          {o.statusHistory?.length > 0 && (
            <div style={{ marginTop: 14, fontSize: 11.5, color: '#9ca3af', lineHeight: 1.7 }}>
              {o.statusHistory.slice(-6).map((h, i) => (
                <div key={i}>
                  {new Date(h.at).toLocaleString('en-IN')} — {h.status}
                  {h.note ? ` (${h.note})` : ''}{h.by ? ` · ${h.by}` : ''}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
