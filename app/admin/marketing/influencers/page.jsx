'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, Field, input, btn, btnLight, Pill, HealthWarning } from '../Shell';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.valleyrun.in';

/** Influencer ka link. Ye route sach mein maujood hai — /challenges/<slug>. */
const linkFor = (code, slug) => `${SITE}/challenges/${slug}?via=${code}`;

export default function InfluencersPage() {
  const router = useRouter();

  const [health, setHealth] = useState(null);
  const [events, setEvents] = useState([]);
  const [rows, setRows]     = useState([]);
  const [info, setInfo]     = useState({ total: 0, totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState('');
  const [eventId, setEventId] = useState('');
  const [search, setSearch] = useState('');

  const [editing, setEditing] = useState(null);   // null | 'new' | influencer object

  useEffect(() => {
    adminAPI.marketing.health().then(setHealth);
    adminAPI.getEvents().then((r) => setEvents(r?.events || []));
  }, []);

  const load = async (page = 1) => {
    setLoading(true);
    const res = await adminAPI.marketing.influencers.list({
      status, event: eventId, search, page, limit: 20,
    });
    if (res?.success === false) { alert(res.message); setLoading(false); return; }
    setRows(res.influencers || []);
    setInfo({ total: res.total || 0, totalPages: res.totalPages || 1, page: res.page || page });
    setLoading(false);
  };

  useEffect(() => { load(1); }, [status, eventId]);

  const after = async (res) => {
    if (res?.success === false) { alert(res.message); return false; }
    if (res?.message) alert(res.message);
    await load(info.page);
    return true;
  };

  return (
    <Shell
      title="Influencers"
      subtitle="Their links, and what each one brings in"
      back="/admin/marketing"
      right={
        <button onClick={() => setEditing('new')}
          style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8,
            padding: '7px 13px', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          + Add
        </button>
      }
    >
      <HealthWarning health={health} />

      {editing && (
        <InfluencerForm
          value={editing === 'new' ? null : editing}
          events={events}
          onClose={() => setEditing(null)}
          onSaved={async () => { setEditing(null); await load(info.page); }}
        />
      )}

      {/* ── Filters ── */}
      <Card style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 9 }}>
          <select style={input} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="active">Active only</option>
            <option value="inactive">Inactive only</option>
          </select>
          <select style={input} value={eventId} onChange={(e) => setEventId(e.target.value)}>
            <option value="">All events</option>
            {events.map((e) => <option key={e._id} value={e._id}>{e.title}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...input, flex: 1 }} placeholder="Name, code or Instagram…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load(1)} />
            <button onClick={() => load(1)} style={btn}>Search</button>
          </div>
        </div>
      </Card>

      {/* ── List ── */}
      {loading ? (
        <div style={{ padding: 44, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '30px 12px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📣</div>
            <div style={{ fontWeight: 700 }}>
              {search || status || eventId ? 'Nothing matches those filters' : 'No influencers yet'}
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', margin: '7px 0 16px', lineHeight: 1.6 }}>
              Add one, pick the events they are promoting, and share their link.
            </p>
            <button onClick={() => setEditing('new')} style={btn}>Add an influencer</button>
          </div>
        </Card>
      ) : (
        rows.map((inf) => (
          <InfluencerRow key={inf._id} inf={inf} after={after}
            onEdit={() => setEditing(inf)}
            onOpen={() => router.push(`/admin/marketing/influencers/${inf._id}`)} />
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
    </Shell>
  );
}

/* ── Ek influencer ── */
function InfluencerRow({ inf, after, onEdit, onOpen }) {
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState('');

  const run = async (fn) => { setBusy(true); await after(await fn()); setBusy(false); };

  /* Copy do tareeke se — admin panel https par hai, par clipboard
     API phir bhi mana kar sakti hai (iframe, purana browser). */
  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      } catch { prompt('Copy this link:', text); return; }
    }
    setCopied(key);
    setTimeout(() => setCopied(''), 1800);
  };

  const evs = inf.eventIds || [];

  return (
    <Card style={{ opacity: inf.isActive ? 1 : .72 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 800, fontSize: 15 }}>{inf.name}</span>
            {inf.isActive
              ? <Pill bg="#dcfce7" fg="#166534">ACTIVE</Pill>
              : <Pill bg="#f3f4f6" fg="#6b7280">INACTIVE</Pill>}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>
            {inf.instagramUsername && (
              <a href={`https://instagram.com/${inf.instagramUsername}`} target="_blank"
                rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>
                @{inf.instagramUsername}
              </a>
            )}
            {inf.instagramUsername && (inf.email || inf.phone) ? ' · ' : ''}
            {inf.email}{inf.email && inf.phone ? ' · ' : ''}{inf.phone}
          </div>
          <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
            color: '#1e3a8a', letterSpacing: .5 }}>
            {inf.code}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button onClick={onOpen} style={btnLight}>Analytics</button>
          <button onClick={onEdit} disabled={busy} style={btnLight}>Edit</button>
          <button disabled={busy}
            onClick={() => run(() => adminAPI.marketing.influencers.setStatus(inf._id, !inf.isActive))}
            style={btnLight}>
            {inf.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button disabled={busy}
            onClick={() => {
              if (!confirm(`Delete ${inf.name}? If any registrations are credited to them this will be refused.`)) return;
              run(() => adminAPI.marketing.influencers.remove(inf._id));
            }}
            style={{ ...btnLight, color: '#dc2626', borderColor: '#fecaca' }}>Delete</button>
        </div>
      </div>

      {/* ── Links ── */}
      <div style={{ marginTop: 12, paddingTop: 11, borderTop: '1px solid #f1f3f5' }}>
        {evs.length === 0 ? (
          /* Ye chup-chaap chhodna sabse badi galti hoti: link to chal
             jaata, par kisi registration ka credit nahi milta aur
             mahine baad pata chalta. */
          <div style={{ fontSize: 12.5, color: '#b45309', background: '#fffbeb',
            border: '1px solid #fde68a', borderRadius: 9, padding: '9px 11px', lineHeight: 1.6 }}>
            No event selected. Their link will still be tracked as clicks, but{' '}
            <strong>no registration will be credited to them</strong>. Pick at least one event in Edit.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {evs.map((e) => {
              const url = linkFor(inf.code, e.slug);
              return (
                <div key={e._id || e.slug} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <code style={{ flex: 1, minWidth: 200, fontSize: 11.5, background: '#f8f9fb',
                    border: '1px solid #eef0f3', borderRadius: 8, padding: '8px 10px',
                    color: '#374151', wordBreak: 'break-all' }}>{url}</code>
                  <button onClick={() => copy(url, e.slug)}
                    style={{ ...btnLight, borderColor: copied === e.slug ? '#86efac' : '#e5e7eb',
                      color: copied === e.slug ? '#15803d' : '#374151', whiteSpace: 'nowrap' }}>
                    {copied === e.slug ? '✓ Copied' : 'Copy link'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ── Add / edit ── */
function InfluencerForm({ value, events, onClose, onSaved }) {
  const isNew = !value;
  const [f, setF] = useState({
    name: value?.name || '',
    instagramUsername: value?.instagramUsername || '',
    email: value?.email || '',
    phone: value?.phone || '',
    code: value?.code || '',
    eventIds: (value?.eventIds || []).map((e) => String(e._id || e)),
    notes: value?.notes || '',
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setErr(''); };

  /* Naya influencer: naam aur event se code apne aap bana dete hain.
     Purane ka code chhedte nahi — wo link pehle se ghoom rahe hote
     hain. */
  useEffect(() => {
    if (!isNew || !f.name.trim()) return;
    const id = setTimeout(async () => {
      const r = await adminAPI.marketing.influencers.suggestCode({
        name: f.name, event: f.eventIds[0] || '',
      });
      if (r?.code) setF((x) => (x.code ? x : { ...x, code: r.code }));
    }, 450);
    return () => clearTimeout(id);
  }, [f.name, f.eventIds[0]]);

  const toggleEvent = (id) =>
    setF((x) => ({
      ...x,
      eventIds: x.eventIds.includes(id) ? x.eventIds.filter((e) => e !== id) : [...x.eventIds, id],
    }));

  const save = async () => {
    if (!f.name.trim()) { setErr('Name is required.'); return; }
    if (!f.code.trim() || f.code.trim().length < 3) { setErr('Referral code must be at least 3 characters.'); return; }

    setBusy(true);
    const res = isNew
      ? await adminAPI.marketing.influencers.create(f)
      : await adminAPI.marketing.influencers.update(value._id, f);
    setBusy(false);

    if (res?.success === false) { setErr(res.message || 'Could not save.'); return; }
    onSaved();
  };

  const codeChanged = !isNew && f.code !== value.code;

  return (
    <Card style={{ border: '2px solid #1e3a8a' }}>
      <div style={{ fontWeight: 800, fontSize: 15, color: '#1e3a8a', marginBottom: 14 }}>
        {isNew ? 'New influencer' : `Editing ${value.name}`}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        <Field label="Influencer name *">
          <input style={input} value={f.name} placeholder="Rahul Sharma"
            onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Instagram username" hint="Without the @ — we add it where needed">
          <input style={input} value={f.instagramUsername} placeholder="rahulfitness"
            onChange={(e) => set('instagramUsername', e.target.value)} />
        </Field>
        <Field label="Email">
          <input style={input} value={f.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
        <Field label="Contact number">
          <input style={input} value={f.phone} onChange={(e) => set('phone', e.target.value)} />
        </Field>
      </div>

      <Field label="Referral code *"
        hint={codeChanged
          ? '⚠️ Changing the code breaks every link already shared on Instagram and WhatsApp. Old links will stop earning credit.'
          : 'Letters and numbers only. Suggested from the name, but you can change it.'}>
        <input style={{ ...input, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1,
          borderColor: codeChanged ? '#fcd34d' : '#e5e7eb' }}
          value={f.code}
          onChange={(e) => set('code', e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 24))} />
      </Field>

      <Field label="Events they are promoting"
        hint="A registration is only credited to them if it is for one of these events.">
        {events.length === 0 ? (
          <div style={{ fontSize: 12.5, color: '#9ca3af' }}>No events found.</div>
        ) : (
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {events.map((e) => {
              const on = f.eventIds.includes(String(e._id));
              return (
                <button key={e._id} type="button" onClick={() => toggleEvent(String(e._id))}
                  style={{
                    padding: '7px 13px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 12.5, fontWeight: 700,
                    background: on ? '#1e3a8a' : '#fff',
                    color: on ? '#fff' : '#4b5563',
                    border: `1.5px solid ${on ? '#1e3a8a' : '#e5e7eb'}`,
                  }}>
                  {e.title}
                </button>
              );
            })}
          </div>
        )}
      </Field>

      {f.eventIds.length === 0 && (
        <div style={{ fontSize: 12.5, color: '#b45309', background: '#fffbeb',
          border: '1px solid #fde68a', borderRadius: 9, padding: '9px 11px',
          marginTop: -4, marginBottom: 14, lineHeight: 1.6 }}>
          With no event selected their clicks are counted, but no registration is ever credited to them.
        </div>
      )}

      <Field label="Internal note" hint="Only you see this — deal terms, payout, anything.">
        <input style={input} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
      </Field>

      {/* Link ka preview — admin ko wahi dikhe jo wo influencer ko bhejega */}
      {f.code && f.eventIds.length > 0 && (
        <div style={{ background: '#f8f9fb', border: '1px solid #eef0f3', borderRadius: 10,
          padding: '10px 12px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 5 }}>
            THEIR LINK WILL BE
          </div>
          {f.eventIds.map((id) => {
            const ev = events.find((e) => String(e._id) === id);
            if (!ev) return null;
            return (
              <code key={id} style={{ display: 'block', fontSize: 11.5, color: '#374151',
                wordBreak: 'break-all', marginTop: 3 }}>
                {linkFor(f.code, ev.slug)}
              </code>
            );
          })}
        </div>
      )}

      {err && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 9,
          padding: '10px 12px', fontSize: 13, color: '#991b1b', marginBottom: 12 }}>{err}</div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={save} disabled={busy} style={btn}>
          {busy ? 'Saving…' : isNew ? 'Create influencer' : 'Save changes'}
        </button>
        <button onClick={onClose} disabled={busy} style={btnLight}>Cancel</button>
      </div>
    </Card>
  );
}
