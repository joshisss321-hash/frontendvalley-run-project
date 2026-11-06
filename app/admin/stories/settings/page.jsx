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
    <Shell title="Story Settings" subtitle="Homepage section aur consent">

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
          Ye wahi text hai jo form par dikhega aur jispe runner haan karega.
          <br /><br />
          <strong>Yaad rakhiye:</strong> jo text runner ne us waqt dekha tha, wahi uski
          kahani ke saath save ho jaata hai. Aap ise baad mein badlein to bhi{' '}
          <strong>purani kahaniyon ka record nahi badalta</strong> — unke paas apna,
          us waqt ka text rehta hai. Kabhi sawaal uthe to jawab maujood hai.
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
