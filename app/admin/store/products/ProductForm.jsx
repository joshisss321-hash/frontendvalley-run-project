'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import { Card, Field, input, btnPrimary, btnLight } from '../StoreShell';

const BLANK = {
  name: '', shortDesc: '', longDesc: '', categories: [],
  images: [], featuredImage: '',
  price: 0, mrp: '', sku: '', stock: 0, unit: '', weightGm: 0,
  variants: [], lowStockAt: 5,
  ingredients: '', sourceRegion: '', storage: '', shelfLife: '',
  fssaiNumber: '', gstHsnCode: '', sellerName: '', sellerAddress: '',
  packerName: '', packerAddress: '', countryOrigin: 'India',
  isPublished: false, isFeatured: false, isBestSeller: false, isNewArrival: false,
  sortOrder: 0,
  shippingNote: '', returnNote: '', isReturnable: false,
  seoTitle: '', seoDescription: '',
};

export default function ProductForm({ productId }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...BLANK });
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(Boolean(productId));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [useVariants, setUseVariants] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    adminAPI.store.categories.list().then((r) => setCats(r?.categories || []));

    if (!productId) return;
    adminAPI.store.products.get(productId).then((r) => {
      if (r?.success === false) { alert(r.message); router.push('/admin/store/products'); return; }
      const p = r.product;
      setForm({
        ...BLANK,
        ...p,
        mrp: p.mrp ?? '',
        categories: (p.categories || []).map((c) => c._id || c),
      });
      setUseVariants((p.variants || []).length > 0);
      setLoading(false);
    });
  }, [productId]);

  /* ── Photos ── */
  const addImage = async (file) => {
    if (!file) return;
    setUploading(true);
    const res = await adminAPI.store.products.uploadImage(file);
    setUploading(false);

    if (res?.success === false || !res?.url) {
      alert('Photo upload nahi hui — ' + (res?.message || 'dobara koshish kijiye'));
      return;
    }
    setForm((f) => ({
      ...f,
      images: [...(f.images || []), { url: res.url, alt: '' }],
      featuredImage: f.featuredImage || res.url,   // pehli photo khud featured
    }));
  };

  const removeImage = (url) =>
    setForm((f) => ({
      ...f,
      images: f.images.filter((i) => i.url !== url),
      featuredImage: f.featuredImage === url ? (f.images.find((i) => i.url !== url)?.url || '') : f.featuredImage,
    }));

  /* ── Variants ── */
  const addVariant = () =>
    setForm((f) => ({ ...f, variants: [...f.variants, { label: '', price: 0, mrp: '', stock: 0, sku: '', weightGm: 0, isActive: true }] }));

  const setVariant = (i, k, v) =>
    setForm((f) => ({ ...f, variants: f.variants.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }));

  const removeVariant = (i) =>
    setForm((f) => ({ ...f, variants: f.variants.filter((_, j) => j !== i) }));

  /* ── Save ── */
  const save = async () => {
    if (!form.name.trim()) { alert('Product ka naam likhiye'); return; }

    if (useVariants) {
      if (form.variants.length === 0) { alert('Kam se kam ek pack size daliye, ya variants band kar dijiye'); return; }
      const bad = form.variants.findIndex((v) => !String(v.label).trim() || Number(v.price) <= 0);
      if (bad >= 0) { alert(`Pack size #${bad + 1} ka naam aur daam dono chahiye`); return; }
    } else if (Number(form.price) <= 0) {
      alert('Daam daliye');
      return;
    }

    const payload = {
      ...form,
      mrp: form.mrp === '' ? null : Number(form.mrp),
      variants: useVariants
        ? form.variants.map((v) => ({ ...v, mrp: v.mrp === '' ? null : Number(v.mrp) }))
        : [],
    };

    setSaving(true);
    const res = productId
      ? await adminAPI.store.products.update(productId, payload)
      : await adminAPI.store.products.create(payload);
    setSaving(false);

    if (res?.success === false) { alert('Save nahi hua — ' + res.message); return; }
    router.push('/admin/store/products');
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>;

  return (
    <>
      {/* ── Basic ── */}
      <Card>
        <Section>Product ki jaankari</Section>

        <Field label="Naam *" hint="Jaise: Pure Pahadi Bilona Ghee">
          <input style={input} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>

        <Field label="Ek line ka description" hint="Card par dikhega">
          <input style={input} value={form.shortDesc} onChange={(e) => set('shortDesc', e.target.value)} />
        </Field>

        <Field label="Poora description">
          <textarea style={{ ...input, minHeight: 110, resize: 'vertical' }} value={form.longDesc}
            onChange={(e) => set('longDesc', e.target.value)} />
        </Field>

        <Field label="Category" hint={cats.length === 0 ? '⚠️ Pehle category banayiye' : 'Ek se zyada chun sakte hain'}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map((c) => {
              const on = form.categories.includes(c._id);
              return (
                <button key={c._id} type="button"
                  onClick={() => set('categories', on ? form.categories.filter((x) => x !== c._id) : [...form.categories, c._id])}
                  style={{
                    padding: '7px 14px', borderRadius: 100, fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'inherit',
                    background: on ? '#14532d' : '#fff', color: on ? '#fff' : '#374151',
                    border: `1.5px solid ${on ? '#14532d' : '#e5e7eb'}`,
                  }}>
                  {c.name}
                </button>
              );
            })}
          </div>
        </Field>
      </Card>

      {/* ── Photos ── */}
      <Card>
        <Section>Photos</Section>

        {form.images?.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            {form.images.map((img) => {
              const isFeatured = form.featuredImage === img.url;
              return (
                <div key={img.url} style={{ position: 'relative' }}>
                  <img src={img.url} alt=""
                    style={{
                      width: 108, height: 108, objectFit: 'cover', borderRadius: 10, display: 'block',
                      border: isFeatured ? '3px solid #14532d' : '3px solid transparent',
                    }} />
                  <button type="button" onClick={() => removeImage(img.url)}
                    style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer', fontSize: 13 }}>
                    ×
                  </button>
                  <button type="button" onClick={() => set('featuredImage', img.url)}
                    style={{
                      display: 'block', width: '100%', marginTop: 5, padding: '4px 0', borderRadius: 6,
                      border: 'none', cursor: 'pointer', fontSize: 10.5, fontWeight: 700, fontFamily: 'inherit',
                      background: isFeatured ? '#14532d' : '#f3f4f6', color: isFeatured ? '#fff' : '#6b7280',
                    }}>
                    {isFeatured ? 'MAIN' : 'Main banao'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <input type="file" accept="image/*" onChange={(e) => { addImage(e.target.files?.[0]); e.target.value = ''; }} />
        {uploading && <div style={{ fontSize: 12, color: '#14532d', marginTop: 6 }}>Upload ho rahi hai…</div>}
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>
          Photo apne aap chhoti ho jaati hai — badi file bhi chalegi.
        </div>
      </Card>

      {/* ── Daam aur stock ── */}
      <Card>
        <Section>Daam aur stock</Section>

        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 700, marginBottom: 14, cursor: 'pointer' }}>
          <input type="checkbox" checked={useVariants} onChange={(e) => setUseVariants(e.target.checked)}
            style={{ width: 17, height: 17, cursor: 'pointer' }} />
          Alag-alag pack size hain (250g / 500g / 1kg)
        </label>

        {!useVariants ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
            <Field label="Daam (₹) *">
              <input type="number" style={input} value={form.price}
                onChange={(e) => set('price', Number(e.target.value) || 0)} />
            </Field>
            <Field label="MRP (₹)" hint="Daam se zyada ho tabhi dikhegi">
              <input type="number" style={input} value={form.mrp}
                onChange={(e) => set('mrp', e.target.value)} />
            </Field>
            <Field label="Stock">
              <input type="number" style={input} value={form.stock}
                onChange={(e) => set('stock', Number(e.target.value) || 0)} />
            </Field>
            <Field label="Unit" hint="500 g, 1 L">
              <input style={input} value={form.unit} onChange={(e) => set('unit', e.target.value)} />
            </Field>
            <Field label="Weight (gram)" hint="Shipping ke liye">
              <input type="number" style={input} value={form.weightGm}
                onChange={(e) => set('weightGm', Number(e.target.value) || 0)} />
            </Field>
            <Field label="SKU">
              <input style={input} value={form.sku} onChange={(e) => set('sku', e.target.value)} />
            </Field>
          </div>
        ) : (
          <>
            {form.variants.map((v, i) => (
              <div key={i} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: 12.5, color: '#14532d' }}>Pack size #{i + 1}</span>
                  <button type="button" onClick={() => removeVariant(i)}
                    style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                    Hatao
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 10 }}>
                  <Field label="Size *"><input style={input} placeholder="500 g" value={v.label}
                    onChange={(e) => setVariant(i, 'label', e.target.value)} /></Field>
                  <Field label="Daam ₹ *"><input type="number" style={input} value={v.price}
                    onChange={(e) => setVariant(i, 'price', Number(e.target.value) || 0)} /></Field>
                  <Field label="MRP ₹"><input type="number" style={input} value={v.mrp}
                    onChange={(e) => setVariant(i, 'mrp', e.target.value)} /></Field>
                  <Field label="Stock"><input type="number" style={input} value={v.stock}
                    onChange={(e) => setVariant(i, 'stock', Number(e.target.value) || 0)} /></Field>
                  <Field label="Weight (g)"><input type="number" style={input} value={v.weightGm}
                    onChange={(e) => setVariant(i, 'weightGm', Number(e.target.value) || 0)} /></Field>
                </div>
              </div>
            ))}
            <button type="button" onClick={addVariant} style={btnLight}>+ Pack size jodiye</button>
          </>
        )}

        <Field label="Stock kam ka alert" hint="Itna ya kam bacha to dashboard par dikhega">
          <input type="number" style={{ ...input, maxWidth: 120 }} value={form.lowStockAt}
            onChange={(e) => set('lowStockAt', Number(e.target.value) || 0)} />
        </Field>
      </Card>

      {/* ── Khane ki jaankari ── */}
      <Card>
        <Section>Product ki detail</Section>
        <Field label="Kya-kya hai (ingredients)">
          <input style={input} value={form.ingredients} onChange={(e) => set('ingredients', e.target.value)} />
        </Field>
        <Field label="Kahan se aaya" hint="Jaise: Chamoli, Uttarakhand">
          <input style={input} value={form.sourceRegion} onChange={(e) => set('sourceRegion', e.target.value)} />
        </Field>
        <Field label="Kaise rakhein">
          <input style={input} value={form.storage} onChange={(e) => set('storage', e.target.value)} />
        </Field>
        <Field label="Kitne din chalega">
          <input style={input} value={form.shelfLife} onChange={(e) => set('shelfLife', e.target.value)} />
        </Field>
      </Card>

      {/* ── Kanooni ── */}
      <Card style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <button type="button" onClick={() => setShowLegal(!showLegal)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: '#92400e' }}>
            {showLegal ? '▾' : '▸'} Kanooni jaankari (FSSAI, GST) — baad mein bhar sakte hain
          </div>
        </button>

        {!showLegal && (
          <div style={{ fontSize: 12.5, color: '#a16207', marginTop: 8, lineHeight: 1.65 }}>
            Khali chhod dijiye to product page par ye hissa dikhega hi nahi — koi jhoota dava
            nahi hoga. License aate hi yahan bhar dijiye, apne aap aa jayega.
          </div>
        )}

        {showLegal && (
          <div style={{ marginTop: 14 }}>
            <Field label="FSSAI License Number"><input style={input} value={form.fssaiNumber}
              onChange={(e) => set('fssaiNumber', e.target.value)} /></Field>
            <Field label="HSN Code (GST)"><input style={input} value={form.gstHsnCode}
              onChange={(e) => set('gstHsnCode', e.target.value)} /></Field>
            <Field label="Marketed by (naam)"><input style={input} value={form.sellerName}
              onChange={(e) => set('sellerName', e.target.value)} /></Field>
            <Field label="Marketed by (pata)"><input style={input} value={form.sellerAddress}
              onChange={(e) => set('sellerAddress', e.target.value)} /></Field>
            <Field label="Packed by (naam)"><input style={input} value={form.packerName}
              onChange={(e) => set('packerName', e.target.value)} /></Field>
            <Field label="Packed by (pata)"><input style={input} value={form.packerAddress}
              onChange={(e) => set('packerAddress', e.target.value)} /></Field>
            <Field label="Country of Origin"><input style={input} value={form.countryOrigin}
              onChange={(e) => set('countryOrigin', e.target.value)} /></Field>
          </div>
        )}
      </Card>

      {/* ── Shipping / return ── */}
      <Card>
        <Section>Shipping aur return</Section>
        <Field label="Is product ke liye shipping note">
          <input style={input} value={form.shippingNote} onChange={(e) => set('shippingNote', e.target.value)} />
        </Field>
        <Check label="Ye product wapas liya ja sakta hai" checked={form.isReturnable}
          onChange={(v) => set('isReturnable', v)} />
        {form.isReturnable && (
          <Field label="Return ki shart"><input style={input} value={form.returnNote}
            onChange={(e) => set('returnNote', e.target.value)} /></Field>
        )}
      </Card>

      {/* ── Dikhna ── */}
      <Card>
        <Section>Website par</Section>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 14 }}>
          <Check label="Live karo (publish)" checked={form.isPublished} onChange={(v) => set('isPublished', v)} />
          <Check label="Featured" checked={form.isFeatured} onChange={(v) => set('isFeatured', v)} />
          <Check label="Best seller" checked={form.isBestSeller} onChange={(v) => set('isBestSeller', v)} />
          <Check label="New arrival" checked={form.isNewArrival} onChange={(v) => set('isNewArrival', v)} />
        </div>
        <Field label="Kram" hint="Chhota number pehle">
          <input type="number" style={{ ...input, maxWidth: 120 }} value={form.sortOrder}
            onChange={(e) => set('sortOrder', Number(e.target.value) || 0)} />
        </Field>
      </Card>

      {/* ── Save bar ── */}
      <div style={{
        position: 'sticky', bottom: 0, background: '#fff', padding: 14,
        borderRadius: 14, boxShadow: '0 -4px 16px rgba(0,0,0,.08)',
        display: 'flex', gap: 10, flexWrap: 'wrap',
      }}>
        <button onClick={save} disabled={saving} style={{ ...btnPrimary, flex: 1, minWidth: 150 }}>
          {saving ? 'Save ho raha hai…' : productId ? '✓ Update karo' : '✓ Product banao'}
        </button>
        <button onClick={() => router.push('/admin/store/products')} style={btnLight}>Cancel</button>
      </div>
    </>
  );
}

const Section = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: 15, color: '#14532d', marginBottom: 14 }}>{children}</div>
);

const Check = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 17, height: 17, cursor: 'pointer' }} />
    {label}
  </label>
);
