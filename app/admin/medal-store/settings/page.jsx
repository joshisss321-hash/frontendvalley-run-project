'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import Shell, { Card, Field, input, btn, money } from '../Shell';

export default function MedalSettings() {
  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => { setS((x) => ({ ...x, [k]: v })); setSaved(false); };

  useEffect(() => {
    adminAPI.medalStore.settings.get().then((r) => {
      if (r?.success === false) { alert(r.message); return; }
      setS(r.settings);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await adminAPI.medalStore.settings.save(s);
    setSaving(false);
    if (r?.success === false) { alert('Could not save — ' + r.message); return; }
    setS(r.settings);
    setSaved(true);
  };

  const pickHero = async (file) => {
    if (!file) return;
    setUploading(true);
    const r = await adminAPI.medalStore.products.uploadImage(file);
    setUploading(false);
    if (r?.url) set('heroImage', r.url);
    else alert('Upload failed — ' + (r?.message || 'try again'));
  };

  if (!s) return <Shell title="Medal Store settings"><div style={{ padding: 44, textAlign: 'center', color: '#9ca3af' }}>Loading…</div></Shell>;

  const flat = Number(s.shippingFlat) || 0;
  const free = Number(s.freeOver) || 0;

  return (
    <Shell title="Medal Store settings" subtitle="Delivery, support and page text" back="/admin/medal-store">

      <Card>
        <Sec>Delivery</Sec>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
          <Field label="Delivery charge (₹)" hint="0 means delivery is always free">
            <input style={input} type="number" min="0" value={s.shippingFlat}
              onChange={(e) => set('shippingFlat', Number(e.target.value) || 0)} />
          </Field>
          <Field label="Free above (₹)" hint="0 means never free">
            <input style={input} type="number" min="0" value={s.freeOver}
              onChange={(e) => set('freeOver', Number(e.target.value) || 0)} />
          </Field>
        </div>

        {/* Admin ko wahi dikhao jo customer ko dikhega — numbers se
            samajhna mushkil hai, vaakya se aasan */}
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 9,
          padding: '10px 12px', fontSize: 12.5, color: '#166534', lineHeight: 1.6 }}>
          <strong>Right now:</strong>{' '}
          {flat <= 0
            ? 'delivery is free on every order.'
            : free > 0
              ? `₹${flat} delivery, free once the order crosses ${money(free)}.`
              : `₹${flat} delivery on every order.`}
        </div>
      </Card>

      <Card>
        <Sec>The shop page</Sec>
        <Field label="Heading">
          <input style={input} value={s.heroHeading} onChange={(e) => set('heroHeading', e.target.value)} />
        </Field>
        <Field label="Text below the heading">
          <textarea style={{ ...input, minHeight: 72, resize: 'vertical' }} value={s.heroText}
            onChange={(e) => set('heroText', e.target.value)} />
        </Field>
        <Field label="Background photo" hint="Optional. Without it the banner is a clean dark panel.">
          {s.heroImage && (
            <img src={s.heroImage} alt="" style={{ width: '100%', maxHeight: 150,
              objectFit: 'cover', borderRadius: 10, marginBottom: 9 }} />
          )}
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <label style={{ ...btn, cursor: uploading ? 'wait' : 'pointer', display: 'inline-block' }}>
              {uploading ? 'Uploading…' : s.heroImage ? 'Replace' : 'Upload'}
              <input type="file" accept="image/*" style={{ display: 'none' }} disabled={uploading}
                onChange={(e) => { pickHero(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
            {s.heroImage && (
              <button onClick={() => set('heroImage', '')}
                style={{ background: '#fff', border: '1.5px solid #fecaca', color: '#dc2626',
                  borderRadius: 9, padding: '9px 14px', fontWeight: 700, fontSize: 12.5,
                  cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
            )}
          </div>
        </Field>
      </Card>

      <Card>
        <Sec>After the order</Sec>
        <Field label="Dispatch note" hint="Shown on the medal page and in the confirmation email">
          <textarea style={{ ...input, minHeight: 64, resize: 'vertical' }} value={s.dispatchNote}
            onChange={(e) => set('dispatchNote', e.target.value)} />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
          <Field label="Support email">
            <input style={input} value={s.supportEmail} onChange={(e) => set('supportEmail', e.target.value)} />
          </Field>
          <Field label="Support phone">
            <input style={input} value={s.supportPhone} onChange={(e) => set('supportPhone', e.target.value)} />
          </Field>
        </div>
        <Field label="Email us when an order comes in" hint="Comma separated. Leave empty for none.">
          <input style={input} value={(s.notifyEmails || []).join(', ')}
            onChange={(e) => set('notifyEmails', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} />
        </Field>
      </Card>

      <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: 14, borderRadius: 14,
        boxShadow: '0 -4px 16px rgba(0,0,0,.08)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={save} disabled={saving} style={{ ...btn, flex: 1, minWidth: 150 }}>
          {saving ? 'Saving…' : '✓ Save settings'}
        </button>
        {saved && <span style={{ fontSize: 13, fontWeight: 700, color: '#15803d' }}>✓ Saved</span>}
      </div>
    </Shell>
  );
}

const Sec = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: 15, color: '#a16207', marginBottom: 14 }}>{children}</div>
);
