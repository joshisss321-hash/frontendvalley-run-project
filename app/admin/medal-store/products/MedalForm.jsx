'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import { Card, Field, input, btn, btnLight, Pill, money } from '../Shell';

/* Medal ka form.

   ⚠️ Pahadi store ke ProductForm se bahut chhota hai, aur ye
   jaan-bujh kar: medal mein na ingredients hote hain, na shelf
   life, na FSSAI, aur na hi pack sizes (variants). Variants ko
   jaan-bujh kar chhoda hai — unke hone par stock do jagah ho jaata
   aur reservation ka hisaab galat ho jaata. Server bhi variant
   wale medal ka checkout mana kar deta hai. */

const BLANK = {
  name: '', sourceRegion: '', shortDesc: '', longDesc: '',
  images: [], featuredImage: '',
  price: 0, mrp: '', stock: 0, weightGm: 0, sku: '',
  shippingNote: '', returnNote: '',
  isPublished: false, sortOrder: 0,
};

export default function MedalForm({ medalId }) {
  const router = useRouter();
  const [f, setF] = useState(BLANK);
  const [loaded, setLoaded] = useState(!medalId);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [info, setInfo] = useState(null);     // reserved / sold — sirf edit par
  const [log, setLog] = useState([]);

  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setErr(''); };

  useEffect(() => {
    if (!medalId) return;
    adminAPI.medalStore.products.get(medalId).then((r) => {
      if (r?.success === false) { alert(r.message); router.push('/admin/medal-store/products'); return; }
      const m = r.medal;
      setF({ ...BLANK, ...m, mrp: m.mrp ?? '' });
      setInfo({ reserved: m.reserved || 0, sold: m.soldCount || 0, available: m.availableStock });
      setLoaded(true);
    });
    adminAPI.medalStore.products.stockLog(medalId).then((r) => setLog(r?.log || []));
  }, [medalId]);

  const addImage = async (file) => {
    if (!file) return;
    setUploading(true);
    const r = await adminAPI.medalStore.products.uploadImage(file);
    setUploading(false);
    if (!r?.url) { setErr('Photo upload failed — ' + (r?.message || 'please try again')); return; }
    setF((x) => ({
      ...x,
      images: [...(x.images || []), { url: r.url, alt: '' }],
      featuredImage: x.featuredImage || r.url,   // pehli photo khud main
    }));
  };

  const removeImage = (url) =>
    setF((x) => ({
      ...x,
      images: x.images.filter((i) => i.url !== url),
      featuredImage: x.featuredImage === url ? (x.images.find((i) => i.url !== url)?.url || '') : x.featuredImage,
    }));

  const save = async () => {
    if (!f.name.trim())   { setErr('Medal name is required.'); return; }
    if (Number(f.price) <= 0) { setErr('Please set a price.'); return; }

    const payload = {
      ...f,
      price: Number(f.price) || 0,
      mrp: f.mrp === '' ? null : Number(f.mrp),
      stock: Math.max(0, Math.floor(Number(f.stock) || 0)),
      weightGm: Number(f.weightGm) || 0,
      sortOrder: Number(f.sortOrder) || 0,
    };

    setSaving(true);
    const r = medalId
      ? await adminAPI.medalStore.products.update(medalId, payload)
      : await adminAPI.medalStore.products.create(payload);
    setSaving(false);

    if (r?.success === false) { setErr(r.message || 'Could not save.'); return; }
    router.push('/admin/medal-store/products');
  };

  if (!loaded) return <div style={{ padding: 44, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>;

  const shots = f.images || [];

  return (
    <>
      <Card>
        <Field label="Medal name *" hint="What a buyer will see, e.g. “Winter Arc Challenge Medal”">
          <input style={input} value={f.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Event name" hint="Which challenge this medal is from — shown above the name">
          <input style={input} value={f.sourceRegion} placeholder="Winter Arc Challenge 2026"
            onChange={(e) => set('sourceRegion', e.target.value)} />
        </Field>
        <Field label="Short description" hint="One line, shown on the medal page">
          <input style={input} value={f.shortDesc} onChange={(e) => set('shortDesc', e.target.value)} />
        </Field>
        <Field label="Full description">
          <textarea style={{ ...input, minHeight: 90, resize: 'vertical' }} value={f.longDesc}
            onChange={(e) => set('longDesc', e.target.value)} />
        </Field>
      </Card>

      {/* ── Photos ── */}
      <Card>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>Photos</div>
        <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 12px', lineHeight: 1.55 }}>
          Upload the <strong>front first, then the back</strong> — the shop labels them in that order,
          and the back is what buyers look for.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {shots.map((im, i) => (
            <div key={im.url} style={{ position: 'relative' }}>
              <img src={im.url} alt="" style={{ width: 104, height: 104, objectFit: 'cover',
                borderRadius: 11, border: f.featuredImage === im.url ? '3px solid #a16207' : '1px solid #e5e7eb' }} />
              <button onClick={() => removeImage(im.url)} title="Remove"
                style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%',
                  border: 'none', background: 'rgba(0,0,0,.6)', color: '#fff', cursor: 'pointer', fontSize: 13 }}>×</button>
              <div style={{ fontSize: 10, textAlign: 'center', marginTop: 3,
                fontWeight: 700, color: '#9ca3af' }}>
                {i === 0 ? 'FRONT' : i === 1 ? 'BACK' : `#${i + 1}`}
              </div>
            </div>
          ))}

          <label style={{ width: 104, height: 104, borderRadius: 11, cursor: uploading ? 'wait' : 'pointer',
            border: '2px dashed #d1d5db', background: '#fafafa', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <span style={{ fontSize: 22, color: '#9ca3af' }}>+</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280' }}>
              {uploading ? 'Uploading…' : 'Add photo'}
            </span>
            <input type="file" accept="image/*" disabled={uploading} style={{ display: 'none' }}
              onChange={(e) => { addImage(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </div>
      </Card>

      {/* ── Daam aur stock ── */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
          <Field label="Price (₹) *">
            <input style={input} type="number" min="0" value={f.price}
              onChange={(e) => set('price', e.target.value)} />
          </Field>
          <Field label="MRP (₹)" hint="Only if it is genuinely higher">
            <input style={input} type="number" min="0" value={f.mrp}
              onChange={(e) => set('mrp', e.target.value)} />
          </Field>
          <Field label="Stock" hint="How many you actually have in hand">
            <input style={input} type="number" min="0" value={f.stock}
              onChange={(e) => set('stock', e.target.value)} />
          </Field>
          <Field label="Weight (grams)">
            <input style={input} type="number" min="0" value={f.weightGm}
              onChange={(e) => set('weightGm', e.target.value)} />
          </Field>
        </div>

        {info && (
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 2 }}>
            <Pill bg="#f3f4f6" fg="#374151">{info.available} available</Pill>
            {info.reserved > 0 && <Pill bg="#e0e7ff" fg="#3730a3">{info.reserved} in checkout</Pill>}
            {info.sold > 0 && <Pill bg="#dcfce7" fg="#166534">{info.sold} sold</Pill>}
          </div>
        )}

        {info?.reserved > 0 && (
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 9,
            padding: '10px 12px', marginTop: 12, fontSize: 12.5, color: '#3730a3', lineHeight: 1.6 }}>
            {info.reserved} {info.reserved === 1 ? 'medal is' : 'medals are'} held in a checkout right now,
            so stock cannot be set below {info.reserved}. The hold clears on its own if the payment is not completed.
          </div>
        )}
      </Card>

      {/* ── Dikhna ── */}
      <Card>
        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
          <input type="checkbox" checked={Boolean(f.isPublished)}
            onChange={(e) => set('isPublished', e.target.checked)}
            style={{ width: 17, height: 17, cursor: 'pointer' }} />
          Show this medal in the shop
        </label>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 7, lineHeight: 1.6 }}>
          Even when ticked, it disappears from the shop by itself once stock reaches zero —
          and comes back when you add more.
        </div>

        <div style={{ marginTop: 14 }}>
          <Field label="Order on the page" hint="Smaller number shows first">
            <input style={{ ...input, width: 120 }} type="number" value={f.sortOrder}
              onChange={(e) => set('sortOrder', e.target.value)} />
          </Field>
        </div>
      </Card>

      {log.length > 0 && (
        <Card>
          <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 10 }}>Stock history</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {log.slice(0, 12).map((l) => (
              <div key={l._id} style={{ display: 'flex', justifyContent: 'space-between',
                fontSize: 12.5, color: '#6b7280', gap: 10 }}>
                <span>
                  <strong style={{ color: l.delta < 0 ? '#991b1b' : l.delta > 0 ? '#15803d' : '#6b7280' }}>
                    {l.delta > 0 ? `+${l.delta}` : l.delta}
                  </strong>
                  {' '}{l.reason.replace(/_/g, ' ')}{l.note ? ` · ${l.note}` : ''}
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>{new Date(l.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {err && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 11,
          padding: '12px 14px', fontSize: 13.5, color: '#991b1b', marginBottom: 12 }}>{err}</div>
      )}

      <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: 14, borderRadius: 14,
        boxShadow: '0 -4px 16px rgba(0,0,0,.08)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={save} disabled={saving} style={{ ...btn, flex: 1, minWidth: 150 }}>
          {saving ? 'Saving…' : medalId ? 'Save changes' : 'Create medal'}
        </button>
        <button onClick={() => router.push('/admin/medal-store/products')} style={btnLight}>Cancel</button>
      </div>
    </>
  );
}
