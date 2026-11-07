'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';
import Shell, { Card, Field, input, btn } from '../Shell';

export default function StorySettingsPage() {
  const [s, setS] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => { setS((x) => ({ ...x, [k]: v })); setSaved(false); };

  useEffect(() => {
    adminAPI.stories.getSettings().then((r) => {
      if (r?.success === false) { alert(r.message); return; }
      setS(r.settings);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await adminAPI.stories.saveSettings(s);
    setSaving(false);
    if (res?.success === false) { alert('Could not save — ' + res.message); return; }
    setS(res.settings);
    setSaved(true);
  };

  if (!s) return <Shell title="Story Settings"><div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div></Shell>;

  return (
    <Shell title="Story Settings" subtitle="Homepage section, stories page and consent">

      <Card>
        <Sec>Homepage section</Sec>

        <Check label="Show Inspiring Stories on the homepage" checked={s.sectionEnabled}
          onChange={(v) => set('sectionEnabled', v)} />

        {!s.sectionEnabled && (
          <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 9, lineHeight: 1.6 }}>
            Currently off — the stories section does not appear on the homepage,
            however many stories are published.
          </div>
        )}

        {s.sectionEnabled && (
          <div style={{ marginTop: 16 }}>
            <Field label="Heading">
              <input style={input} value={s.heading || ''} onChange={(e) => set('heading', e.target.value)} />
            </Field>
            <Field label="Tagline">
              <input style={input} value={s.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
            </Field>
            <Field label="When no story is selected" hint="Either hide the section, or show a single line">
              <select style={input} value={s.whenEmpty} onChange={(e) => set('whenEmpty', e.target.value)}>
                <option value="hide">Hide the section</option>
                <option value="fallback">Show a line</option>
              </select>
            </Field>
            {s.whenEmpty === 'fallback' && (
              <Field label="That line">
                <input style={input} value={s.fallbackText || ''} onChange={(e) => set('fallbackText', e.target.value)} />
              </Field>
            )}
          </div>
        )}
      </Card>

      {/* ── /stories page ka hero ── */}
      <Card>
        <Sec>Stories page hero</Sec>
        <div style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 14, lineHeight: 1.7 }}>
          This is the big banner at the top of <strong>valleyrun.in/stories</strong>.
          A wide Himalayan running photo works best. If you leave it empty the page
          shows a clean dark banner instead — it never looks broken.
        </div>

        <HeroPicker url={s.pageHeroImage} onChange={(u) => set('pageHeroImage', u)} />

        <div style={{ marginTop: 16 }}>
          <Field label="Heading" hint="Put | where the line should break — the part after | turns red">
            <input style={input} value={s.pageHeroHeading || ''}
              onChange={(e) => set('pageHeroHeading', e.target.value)} />
          </Field>
          <Field label="Paragraph below the heading">
            <textarea style={{ ...input, minHeight: 80, resize: 'vertical' }} value={s.pageHeroText || ''}
              onChange={(e) => set('pageHeroText', e.target.value)} />
          </Field>
        </div>
      </Card>

      <Card>
        <Sec>Story submission form</Sec>
        <Check label="People can submit stories" checked={s.submissionsOpen}
          onChange={(v) => set('submissionsOpen', v)} />
        <div style={{ marginTop: 14 }}>
          <Field label="Short note on the form">
            <textarea style={{ ...input, minHeight: 70, resize: 'vertical' }} value={s.submitIntro || ''}
              onChange={(e) => set('submitIntro', e.target.value)} />
          </Field>
        </div>
      </Card>

      {/* ── CONSENT ── */}
      <Card style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
        <Sec color="#92400e">Consent wording</Sec>
        <div style={{ fontSize: 12.5, color: '#a16207', marginBottom: 14, lineHeight: 1.7 }}>
          This is the exact text shown on the submission form, and the text the
          runner agrees to.
          <br /><br />
          <strong>Please note:</strong> whatever text a runner saw at the time is saved
          along with their story. If you change it later,{' '}
          <strong>older stories keep their own record</strong> — each one holds the
          wording that was shown to that runner. So if a question ever comes up, the
          answer is on file.
        </div>
        <textarea style={{ ...input, minHeight: 130, resize: 'vertical' }} value={s.consentText || ''}
          onChange={(e) => set('consentText', e.target.value)} />
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

/* Hero photo chunna.
   Upload hote hi settings mein URL baith jaata hai, par save karna
   alag kaam hai — niche "Save settings" dabana hi padega. Isliye
   upload ke baad saaf-saaf likh diya hai. */
function HeroPicker({ url, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [justUploaded, setJustUploaded] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';            // same file dobara chune to bhi chale
    if (!file) return;

    setErr(''); setBusy(true);
    const res = await adminAPI.stories.uploadHero(file);
    setBusy(false);

    if (!res?.success) { setErr(res?.message || 'Upload failed'); return; }
    onChange(res.url);
    setJustUploaded(true);
  };

  return (
    <div>
      {url ? (
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#111827' }}>
          <img src={url} alt="" style={{ width: '100%', maxHeight: 210, objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{
          borderRadius: 12, border: '2px dashed #d1d5db', background: '#f9fafb',
          padding: '34px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13,
        }}>
          No hero photo yet
        </div>
      )}

      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
        <label style={{ ...btn, cursor: busy ? 'wait' : 'pointer', display: 'inline-block' }}>
          {busy ? 'Uploading…' : url ? 'Replace photo' : 'Upload photo'}
          <input type="file" accept="image/*" onChange={pick} disabled={busy} style={{ display: 'none' }} />
        </label>

        {url && (
          <button onClick={() => { onChange(''); setJustUploaded(false); }}
            style={{ background: '#fff', border: '1.5px solid #fecaca', color: '#dc2626',
              borderRadius: 9, padding: '9px 14px', fontWeight: 700, fontSize: 12.5,
              cursor: 'pointer', fontFamily: 'inherit' }}>
            Remove photo
          </button>
        )}
      </div>

      {justUploaded && (
        <div style={{ fontSize: 12.5, color: '#92400e', background: '#fffbeb',
          border: '1px solid #fcd34d', borderRadius: 9, padding: '9px 11px', marginTop: 10 }}>
          Photo uploaded. It is not live yet — press <strong>Save settings</strong> below.
        </div>
      )}
      {err && <div style={{ fontSize: 12.5, color: '#dc2626', marginTop: 8 }}>{err}</div>}
    </div>
  );
}

const Sec = ({ children, color = '#7c2d12' }) => (
  <div style={{ fontWeight: 800, fontSize: 15, color, marginBottom: 14 }}>{children}</div>
);

const Check = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
    <input type="checkbox" checked={Boolean(checked)} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 17, height: 17, cursor: 'pointer' }} />
    {label}
  </label>
);
