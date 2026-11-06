'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import StoreShell, { Card, Field, input, btnPrimary, btnLight, Pill } from '../StoreShell';

const BLANK = {
  name: '', description: '', image: '', imageAlt: '',
  sortOrder: 0, isPublished: false, isFeatured: false,
};

export default function StoreCategories() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);     // null = form band
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await adminAPI.store.categories.list();
    if (res?.success === false) alert(res.message);
    setRows(res?.categories || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name.trim()) { alert('Please enter a category name'); return; }
    setSaving(true);

    const res = form._id
      ? await adminAPI.store.categories.update(form._id, form)
      : await adminAPI.store.categories.create(form);

    setSaving(false);

    if (res?.success === false) { alert('Could not save — ' + res.message); return; }
    setForm(null);
    load();
  };

  const remove = async (c) => {
    if (!confirm(`"${c.name}" — delete it?`)) return;
    const res = await adminAPI.store.categories.remove(c._id);
    // Server product wali category hatane nahi deta — wajah seedhi dikhao
    if (res?.success === false) { alert(res.message); return; }
    load();
  };

  const togglePublish = async (c) => {
    const res = await adminAPI.store.categories.update(c._id, { isPublished: !c.isPublished });
    if (res?.success === false) { alert(res.message); return; }
    load();
  };

  const pickImage = async (file) => {
    if (!file) return;
    setUploading(true);
    const res = await adminAPI.store.products.uploadImage(file);
    setUploading(false);
    if (res?.success === false || !res?.url) { alert('Photo upload failed — ' + (res?.message || '')); return; }
    setForm((f) => ({ ...f, image: res.url }));
  };

  return (
    <StoreShell
      title="Categories"
      subtitle={`${rows.length} categories`}
      right={
        !form && (
          <button onClick={() => setForm({ ...BLANK })} style={{ ...btnPrimary, background: 'rgba(255,255,255,.18)', padding: '7px 13px', fontSize: 12 }}>
            + New category
          </button>
        )
      }
    >
      {form && (
        <Card style={{ border: '2px solid #14532d' }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 14, color: '#14532d' }}>
            {form._id ? 'Edit category' : 'New category'}
          </div>

          <Field label="Naam *" hint="Jaise: Pahadi Ghee">
            <input style={input} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>

          <Field label="Short description">
            <textarea style={{ ...input, minHeight: 70, resize: 'vertical' }} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>

          <Field label="Photo" hint="Shown on the category card">
            {form.image && (
              <img src={form.image} alt="" style={{ width: 150, height: 100, objectFit: 'cover', borderRadius: 9, marginBottom: 8, display: 'block' }} />
            )}
            <input type="file" accept="image/*" onChange={(e) => pickImage(e.target.files?.[0])} />
            {uploading && <div style={{ fontSize: 12, color: '#14532d', marginTop: 6 }}>Uploading…</div>}
            {form.image && (
              <button onClick={() => setForm({ ...form, image: '' })}
                style={{ ...btnLight, marginTop: 8, padding: '6px 12px', fontSize: 12 }}>
                Remove photo
              </button>
            )}
          </Field>

          <Field label="Order" hint="Lower number shows first">
            <input type="number" style={{ ...input, maxWidth: 120 }} value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
          </Field>

          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 16 }}>
            <Check label="Show on the website (publish)" checked={form.isPublished}
              onChange={(v) => setForm({ ...form, isPublished: v })} />
            <Check label="Highlight on the homepage" checked={form.isFeatured}
              onChange={(v) => setForm({ ...form, isFeatured: v })} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} disabled={saving} style={btnPrimary}>
              {saving ? 'Saving…' : '✓ Save'}
            </button>
            <button onClick={() => setForm(null)} style={btnLight}>Cancel</button>
          </div>
        </Card>
      )}

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>🗂️</div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>No categories yet</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
              Create a category first — Pahadi Ghee, Atta &amp; Grains, Honey. Product usi mein jayega.
            </div>
            <button onClick={() => setForm({ ...BLANK })} style={btnPrimary}>+ Create the first category</button>
          </div>
        </Card>
      ) : (
        rows.map((c) => (
          <Card key={c._id}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {c.image
                ? <img src={c.image} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, background: '#f3f4f6' }} />
                : <div style={{ width: 64, height: 64, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🗂️</div>}

              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{c.name}</span>
                  <Pill ok={c.isPublished}>{c.isPublished ? 'LIVE' : 'OFF'}</Pill>
                  {c.isFeatured && <Pill ok>FEATURED</Pill>}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                  /{c.slug} · {c.productCount} product
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => togglePublish(c)} style={btnLight}>
                  {c.isPublished ? 'Collapse' : 'Publish'}
                </button>
                <button onClick={() => setForm({ ...c })} style={btnLight}>Edit</button>
                <button onClick={() => remove(c)} style={{ ...btnLight, color: '#dc2626', borderColor: '#fecaca' }}>
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))
      )}
    </StoreShell>
  );
}

const Check = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 17, height: 17, cursor: 'pointer' }} />
    {label}
  </label>
);
