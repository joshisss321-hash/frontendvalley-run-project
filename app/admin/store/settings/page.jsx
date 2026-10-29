'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import StoreShell, { Card, Field, input, btnPrimary, btnLight } from '../StoreShell';

export default function StoreSettingsPage() {
  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState('');

  const set = (k, v) => { setS((x) => ({ ...x, [k]: v })); setSaved(false); };

  useEffect(() => {
    adminAPI.store.settings.get().then((r) => {
      if (r?.success === false) { alert(r.message); return; }
      setS(r.settings);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await adminAPI.store.settings.save(s);
    setSaving(false);
    if (res?.success === false) { alert('Save nahi hua — ' + res.message); return; }
    setS(res.settings);
    setSaved(true);
  };

  const pickImage = async (field, file) => {
    if (!file) return;
    setUploading(field);
    const res = await adminAPI.store.products.uploadImage(file);
    setUploading('');
    if (res?.success === false || !res?.url) { alert('Photo upload nahi hui — ' + (res?.message || '')); return; }
    set(field, res.url);
  };

  if (!s) return <StoreShell title="Store Settings" back="/admin/store"><div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div></StoreShell>;

  const money = (k, label, hint) => (
    <Field label={label} hint={hint}>
      <input type="number" style={{ ...input, maxWidth: 170 }} value={s[k] ?? 0}
        onChange={(e) => set(k, Number(e.target.value) || 0)} />
    </Field>
  );

  return (
    <StoreShell title="Store Settings" subtitle="Shipping, charges aur content" back="/admin/store">

      {/* ── SHIPPING ── */}
      <Card>
        <Sec>Shipping charge</Sec>

        <Field label="Charge kaise lagega">
          <select style={{ ...input, maxWidth: 300 }} value={s.shippingMode}
            onChange={(e) => set('shippingMode', e.target.value)}>
            <option value="flat">Flat — har order par ek hi charge</option>
            <option value="weight">Weight ke hisaab se (per kg)</option>
            <option value="free">Hamesha free</option>
          </select>
        </Field>

        {s.shippingMode === 'flat' && money('shippingFlat', 'Flat charge (₹)', 'Har order par itna lagega')}
        {s.shippingMode === 'weight' && money('shippingPerKg', 'Per kg charge (₹)', 'Adhoora kg poora gina jayega — 1.2 kg = 2 kg')}

        {s.shippingMode !== 'free' &&
          money('freeShippingOver', 'Itne se upar free (₹)', '0 rakhein to ye chhoot nahi milegi')}

        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 9, padding: '12px 14px', fontSize: 13, color: '#166534', lineHeight: 1.65 }}>
          <strong>Abhi ka hisaab:</strong>{' '}
          {s.shippingMode === 'free'
            ? 'Har order par shipping free.'
            : s.shippingMode === 'weight'
              ? `₹${s.shippingPerKg || 0} per kg` + (s.freeShippingOver > 0 ? `, aur ₹${s.freeShippingOver} se upar ke order par free.` : '.')
              : `₹${s.shippingFlat || 0} har order par` + (s.freeShippingOver > 0 ? `, aur ₹${s.freeShippingOver} se upar free.` : '.')}
        </div>
      </Card>

      {/* ── COD ── */}
      <Card>
        <Sec>Cash on Delivery</Sec>
        <Check label="COD chalu karo" checked={s.codEnabled} onChange={(v) => set('codEnabled', v)} />

        {!s.codEnabled ? (
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 10, lineHeight: 1.65 }}>
            Abhi band hai — sirf online payment chalega. Khane ke saamaan mein COD se return
            bahut aate hain, isliye shuru mein band rakhna theek rehta hai. Baad mein kabhi
            bhi yahin se chalu kar sakte hain.
          </div>
        ) : (
          <div style={{ marginTop: 14 }}>
            {money('codCharge', 'COD charge (₹)', 'Order par extra lagega')}
            {money('codMaxOrder', 'COD ki max limit (₹)', '0 = koi limit nahi')}
          </div>
        )}
      </Card>

      {/* ── TAX ── */}
      <Card>
        <Sec>Tax</Sec>
        <Check label="Tax lagao" checked={s.taxEnabled} onChange={(v) => set('taxEnabled', v)} />
        {s.taxEnabled && money('taxPercent', 'Tax %', '0 se 100 ke beech')}
        {!s.taxEnabled && (
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 10 }}>
            Band hai. GST registration ho jaye tab chalu kijiye.
          </div>
        )}
      </Card>

      {/* ── KANOONI ── */}
      <Card style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <Sec color="#92400e">Kanooni jaankari — baad mein</Sec>
        <div style={{ fontSize: 12.5, color: '#a16207', marginBottom: 14, lineHeight: 1.65 }}>
          Khali chhod dijiye to website par ye hissa dikhega hi nahi. License aate hi yahan
          bhar dijiye — har product page aur footer par apne aap aa jayega.
        </div>
        <Field label="FSSAI License Number">
          <input style={input} value={s.fssaiNumber || ''} onChange={(e) => set('fssaiNumber', e.target.value)} />
        </Field>
        <Field label="GST Number">
          <input style={input} value={s.gstNumber || ''} onChange={(e) => set('gstNumber', e.target.value)} />
        </Field>
        <Field label="Kiske naam par bech rahe hain">
          <input style={input} value={s.legalEntityName || ''} onChange={(e) => set('legalEntityName', e.target.value)} />
        </Field>
        <Field label="Pata">
          <textarea style={{ ...input, minHeight: 64, resize: 'vertical' }} value={s.legalAddress || ''}
            onChange={(e) => set('legalAddress', e.target.value)} />
        </Field>
      </Card>

      {/* ── SAMPARK ── */}
      <Card>
        <Sec>Store ki pehchaan</Sec>
        <Field label="Store ka naam">
          <input style={input} value={s.storeName || ''} onChange={(e) => set('storeName', e.target.value)} />
        </Field>
        <Field label="Ek line (footer par dikhegi)">
          <input style={input} value={s.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
        </Field>
        <Field label="Support email">
          <input style={input} value={s.supportEmail || ''} onChange={(e) => set('supportEmail', e.target.value)} />
        </Field>
        <Field label="Support phone">
          <input style={input} value={s.supportPhone || ''} onChange={(e) => set('supportPhone', e.target.value)} />
        </Field>
      </Card>

      {/* ── HOMEPAGE ── */}
      <Card>
        <Sec>Homepage</Sec>
        <Field label="Bada heading">
          <input style={input} value={s.heroHeading || ''} onChange={(e) => set('heroHeading', e.target.value)} />
        </Field>
        <Field label="Uske neeche ki line">
          <textarea style={{ ...input, minHeight: 64, resize: 'vertical' }} value={s.heroSubtext || ''}
            onChange={(e) => set('heroSubtext', e.target.value)} />
        </Field>
        <ImgField label="Hero ki photo" value={s.heroImage} field="heroImage"
          uploading={uploading} onPick={pickImage} onClear={() => set('heroImage', '')} />
        <Field label="Button ka text">
          <input style={input} value={s.heroCtaText || ''} onChange={(e) => set('heroCtaText', e.target.value)} />
        </Field>
      </Card>

      <Card>
        <Sec>Pahadi Story</Sec>
        <Field label="Heading">
          <input style={input} value={s.storyHeading || ''} onChange={(e) => set('storyHeading', e.target.value)} />
        </Field>
        <Field label="Kahani" hint="Khali chhodenge to ye section dikhega hi nahi">
          <textarea style={{ ...input, minHeight: 130, resize: 'vertical' }} value={s.storyBody || ''}
            onChange={(e) => set('storyBody', e.target.value)} />
        </Field>
        <ImgField label="Story ki photo" value={s.storyImage} field="storyImage"
          uploading={uploading} onPick={pickImage} onClear={() => set('storyImage', '')} />
      </Card>

      {/* ── FAQ ── */}
      <Card>
        <Sec>FAQ</Sec>
        {(s.faqs || []).map((f, i) => (
          <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 12.5, color: '#14532d' }}>Sawaal #{i + 1}</span>
              <button onClick={() => set('faqs', s.faqs.filter((_, j) => j !== i))}
                style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                Hatao
              </button>
            </div>
            <input style={{ ...input, marginBottom: 8 }} placeholder="Sawaal" value={f.q}
              onChange={(e) => set('faqs', s.faqs.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} />
            <textarea style={{ ...input, minHeight: 64, resize: 'vertical' }} placeholder="Jawab" value={f.a}
              onChange={(e) => set('faqs', s.faqs.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} />
          </div>
        ))}
        <button onClick={() => set('faqs', [...(s.faqs || []), { q: '', a: '' }])} style={btnLight}>
          + Sawaal jodiye
        </button>
      </Card>

      {/* ── POLICIES ── */}
      <Card>
        <Sec>Policies</Sec>
        {[
          ['shippingPolicy', 'Shipping Policy'],
          ['returnPolicy', 'Return & Refund Policy'],
          ['cancellationPolicy', 'Cancellation Policy'],
          ['aboutStore', 'About Valley Store'],
        ].map(([k, label]) => (
          <Field key={k} label={label}>
            <textarea style={{ ...input, minHeight: 90, resize: 'vertical' }} value={s[k] || ''}
              onChange={(e) => set(k, e.target.value)} />
          </Field>
        ))}
      </Card>

      {/* ── SAVE ── */}
      <div style={{
        position: 'sticky', bottom: 0, background: '#fff', padding: 14, borderRadius: 14,
        boxShadow: '0 -4px 16px rgba(0,0,0,.08)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
      }}>
        <button onClick={save} disabled={saving} style={{ ...btnPrimary, flex: 1, minWidth: 150 }}>
          {saving ? 'Save ho raha hai…' : '✓ Settings save karo'}
        </button>
        {saved && <span style={{ fontSize: 13, fontWeight: 700, color: '#15803d' }}>✓ Save ho gaya</span>}
      </div>
    </StoreShell>
  );
}

const Sec = ({ children, color = '#14532d' }) => (
  <div style={{ fontWeight: 800, fontSize: 15, color, marginBottom: 14 }}>{children}</div>
);

const Check = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
    <input type="checkbox" checked={Boolean(checked)} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 17, height: 17, cursor: 'pointer' }} />
    {label}
  </label>
);

const ImgField = ({ label, value, field, uploading, onPick, onClear }) => (
  <Field label={label}>
    {value && (
      <img src={value} alt="" style={{ width: 190, height: 110, objectFit: 'cover', borderRadius: 9, marginBottom: 8, display: 'block' }} />
    )}
    <input type="file" accept="image/*" onChange={(e) => { onPick(field, e.target.files?.[0]); e.target.value = ''; }} />
    {uploading === field && <div style={{ fontSize: 12, color: '#14532d', marginTop: 6 }}>Upload ho rahi hai…</div>}
    {value && (
      <button onClick={onClear} style={{ ...btnLight, marginTop: 8, padding: '6px 12px', fontSize: 12 }}>
        Photo hatao
      </button>
    )}
  </Field>
);
