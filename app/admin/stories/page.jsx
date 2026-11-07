'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, btn, btnLight, input } from './Shell';

const TABS = [
  { key: 'pending',   label: 'Pending Reviews', stat: 'pending' },
  { key: 'approved',  label: 'Approved',        stat: 'approved' },
  { key: 'published', label: 'Published',       stat: 'published' },
  { key: 'homepage',  label: 'On Homepage',     stat: 'homepage' },
  { key: 'week',      label: 'Story of Week',   stat: 'week' },
  { key: 'featured',  label: 'Badged' },
  { key: 'removal',   label: 'Removal Asked',   stat: 'removal' },
  { key: 'rejected',  label: 'Rejected',        stat: 'rejected' },
  { key: 'all',       label: 'All',             stat: 'total' },
];

/* /stories page ke filter chips isi se bante hain. Keys backend ke
   enum se bilkul milni chahiye (models/Story.js). */
const CATEGORIES = [
  ['', 'No category'],
  ['running_journey',        'Running Journeys'],
  ['fitness_transformation', 'Fitness Transformation'],
  ['beginner_story',         'Beginner Stories'],
  ['walking_journey',        'Walking Journeys'],
  ['cycling_journey',        'Cycling Journeys'],
  ['overcoming_challenges',  'Overcoming Challenges'],
  ['personal_achievement',   'Personal Achievements'],
];

const BADGES = [
  ['', 'No badge'],
  ['featured', 'Valley Run Featured Story'],
  ['story_of_week', 'Story of the Week'],
  ['community_inspiration', 'Community Inspiration'],
  ['journey_of_month', 'Journey of the Month'],
];

export default function StoriesAdmin() {
  const router = useRouter();
  const [tab, setTab] = useState('pending');
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState({});
  const [info, setInfo] = useState({ total: 0, totalPages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(null);   // khuli hui kahani ka id
  const [sectionOn, setSectionOn] = useState(null);   // null = abhi pata nahi

  const loadStats = () => adminAPI.stories.stats().then((r) => setStats(r?.stats || {}));

  /* Homepage ka master switch. Story par "Show on homepage" dabane se
     kuch nahi hota agar ye band hai — aur pehle iska koi ishaara nahi
     milta tha. Ab seedha upar likh dete hain. */
  const loadSection = () =>
    adminAPI.stories.getSettings().then((r) => {
      if (r?.success !== false) setSectionOn(Boolean(r.settings?.sectionEnabled));
    });

  const load = async (t = tab, page = 1) => {
    setLoading(true);
    const res = await adminAPI.stories.list({ tab: t, search, page, limit: 20 });
    if (res?.success === false) { alert(res.message); setLoading(false); return; }
    setRows(res.stories || []);
    setInfo({ total: res.total || 0, totalPages: res.totalPages || 1, page: res.page || page });
    setLoading(false);
  };

  useEffect(() => { loadStats(); loadSection(); load('pending', 1); }, []);
  useEffect(() => { load(tab, 1); }, [tab]);

  const after = async (res) => {
    if (res?.success === false) { alert(res.message); return false; }
    if (res?.archived) alert(res.message);
    await Promise.all([load(tab, info.page), loadStats()]);
    return true;
  };

  return (
    <Shell
      title="Inspiring Stories"
      subtitle="Beyond the Finish Line"
      back="/admin/dashboard"
      right={
        <button onClick={() => router.push('/admin/stories/settings')}
          style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8, padding: '7px 13px', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Settings
        </button>
      }
    >
      {/* ── Homepage ka master switch band hai ──
          Ye warning tabhi dikhti hai jab sach mein band ho. Isse
          pehle admin kahani par "Show on homepage" daba kar maan
          leta tha ki ho gaya, aur homepage khali rehti thi. */}
      {sectionOn === false && (
        <div style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 12,
          padding: '14px 16px', marginBottom: 14, display: 'flex', gap: 13,
          alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 800, fontSize: 13.5, color: '#92400e' }}>
              The stories section is switched off on the homepage
            </div>
            <div style={{ fontSize: 12.5, color: '#a16207', marginTop: 4, lineHeight: 1.6 }}>
              Marking a story “Show on homepage” will not do anything until you turn
              the section on. Published stories still appear on the Stories page.
            </div>
          </div>
          <button onClick={() => router.push('/admin/stories/settings')}
            style={{ ...btn, background: '#b45309', whiteSpace: 'nowrap' }}>
            Turn it on
          </button>
        </div>
      )}

      {/* ── Stats ── */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(96px,1fr))', gap: 10 }}>
          <Stat n={stats.total}     label="Total" />
          <Stat n={stats.pending}   label="Pending"  color={stats.pending ? '#d97706' : undefined} />
          <Stat n={stats.published} label="Published" color="#15803d" />
          <Stat n={stats.homepage}  label="Homepage" />
          <Stat n={stats.week}      label="Of the week" />
          <Stat n={stats.removal}   label="Removal" color={stats.removal ? '#dc2626' : undefined} />
        </div>
      </Card>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 8, marginBottom: 4 }}>
        {TABS.map((t) => {
          const n = t.stat ? stats[t.stat] : undefined;
          const on = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                flexShrink: 0, padding: '8px 14px', borderRadius: 100, cursor: 'pointer',
                fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit', whiteSpace: 'nowrap',
                background: on ? '#7c2d12' : '#fff',
                color: on ? '#fff' : '#4b5563',
                border: `1.5px solid ${on ? '#7c2d12' : '#e5e7eb'}`,
              }}>
              {t.label}{n !== undefined && n > 0 ? ` · ${n}` : ''}
            </button>
          );
        })}
      </div>

      <Card style={{ padding: 12 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          <input style={{ ...input, flex: 1 }} placeholder="Search by name, email or title…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load(tab, 1)} />
          <button onClick={() => load(tab, 1)} style={btn}>Search</button>
        </div>
      </Card>

      {/* ── List ── */}
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : rows.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '28px 10px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
            <div style={{ fontWeight: 700 }}>Nothing here yet</div>
          </div>
        </Card>
      ) : (
        rows.map((s) => (
          <StoryRow key={s._id} s={s} open={open === s._id}
            onToggle={() => setOpen(open === s._id ? null : s._id)} after={after} />
        ))
      )}

      {info.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', padding: 10 }}>
          <button disabled={info.page <= 1} onClick={() => load(tab, info.page - 1)}
            style={{ ...btnLight, opacity: info.page <= 1 ? .4 : 1 }}>← Previous</button>
          <span style={{ fontSize: 13, color: '#6b7280' }}>{info.page} / {info.totalPages}</span>
          <button disabled={info.page >= info.totalPages} onClick={() => load(tab, info.page + 1)}
            style={{ ...btnLight, opacity: info.page >= info.totalPages ? .4 : 1 }}>Next →</button>
        </div>
      )}
    </Shell>
  );
}

/* ── Ek kahani ── */
function StoryRow({ s, open, onToggle, after }) {
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState(s.adminNote || '');

  const run = async (fn) => { setBusy(true); await after(await fn()); setBusy(false); };

  const canPublish = s.consent?.publishStory && !s.removalRequestedAt;

  return (
    <Card style={{ border: s.removalRequestedAt ? '2px solid #fca5a5' : undefined }}>
      {/* Sir */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {s.featuredPhoto
          ? <img src={s.featuredPhoto} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 10, background: '#f3f4f6' }} />
          : <div style={{ width: 64, height: 64, borderRadius: 10, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📖</div>}

        <div style={{ flex: 1, minWidth: 170 }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
            <StatusPill status={s.status} />
            {s.onHomepage && <Pill bg="#dbeafe" fg="#1e40af">HOMEPAGE</Pill>}
            {s.isStoryOfWeek && <Pill bg="#fef3c7" fg="#92400e">STORY OF WEEK</Pill>}
            {s.badge && <Pill bg="#f3e8ff" fg="#6b21a8">{s.badge.replace(/_/g, ' ').toUpperCase()}</Pill>}
            {s.category && <Pill bg="#f1f5f9" fg="#334155">
              {(CATEGORIES.find(([v]) => v === s.category)?.[1] || s.category).toUpperCase()}
            </Pill>}
            {s.removalRequestedAt && <Pill bg="#fee2e2" fg="#991b1b">REMOVAL ASKED</Pill>}
          </div>
          <div style={{ fontWeight: 800, fontSize: 15.5 }}>{s.title}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>
            {s.name} · {s.email}{s.city ? ` · ${s.city}` : ''}
            {s.phone ? ` · ${s.phone}` : ''} · {new Date(s.createdAt).toLocaleDateString('en-IN')}
          </div>

          {/* Instagram sirf admin ko. Public par tabhi jab runner ne
              uski alag ijazat di ho — isliye haalat saaf likhi hai. */}
          {s.instaId && (
            <div style={{ fontSize: 12, marginTop: 4, color: '#6b7280' }}>
              Instagram: <strong>@{String(s.instaId).replace(/^@+/, '')}</strong>{' '}
              <span style={{ color: s.consent?.publishInsta ? '#15803d' : '#9ca3af' }}>
                {s.consent?.publishInsta ? '· runner allowed this publicly' : '· admin only, not shown on the site'}
              </span>
            </div>
          )}
        </div>

        <button onClick={onToggle} style={btnLight}>{open ? 'Collapse' : 'Read full'}</button>
      </div>

      {/* ── CONSENT — approve se pehle sabse zaroori ── */}
      <div style={{
        marginTop: 12, padding: '10px 12px', borderRadius: 10,
        background: s.consent?.publishStory ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${s.consent?.publishStory ? '#86efac' : '#fecaca'}`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: .6, color: s.consent?.publishStory ? '#166534' : '#991b1b', marginBottom: 6 }}>
          CONSENT
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12.5 }}>
          <Consent ok={s.consent?.publishStory}  label="Publish story" />
          <Consent ok={s.consent?.publishPhotos} label="Publish photos" />
          <Consent ok={s.consent?.publishName}   label="Show name" />
          {s.instaId && <Consent ok={s.consent?.publishInsta} label="Show Instagram" />}
        </div>
        {s.consent?.agreedAt && (
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>
            Agreed: {new Date(s.consent.agreedAt).toLocaleString('en-IN')}
          </div>
        )}
        {!s.consent?.publishStory && (
          <div style={{ fontSize: 12, color: '#991b1b', marginTop: 6, fontWeight: 600 }}>
            This story cannot be published — permission was not given.
          </div>
        )}
      </div>

      {open && (
        <div style={{ marginTop: 14 }}>
          {editing ? (
            <StoryEditor s={s} onCancel={() => setEditing(false)}
              onSaved={async (res) => { if (await after(res)) setEditing(false); }} />
          ) : (
            <>
              {s.summary ? (
                <p style={{ fontSize: 13.5, color: '#4b5563', fontStyle: 'italic', margin: '0 0 10px' }}>{s.summary}</p>
              ) : (
                <p style={{ fontSize: 12.5, color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a',
                  borderRadius: 9, padding: '8px 11px', margin: '0 0 10px' }}>
                  No one-line description. Write one in Edit — it is used on the story card
                  and in the WhatsApp / Facebook preview.
                </p>
              )}

              <div style={{ fontSize: 14, lineHeight: 1.8, color: '#374151', whiteSpace: 'pre-line',
                background: '#f9fafb', borderRadius: 10, padding: 14, maxHeight: 320, overflowY: 'auto' }}>
                {s.body}
              </div>

              {s.photos?.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                  {s.photos.map((p) => (
                    <div key={p.url} style={{ position: 'relative' }}>
                      <img src={p.url} alt="" style={{ width: 92, height: 92, objectFit: 'cover', borderRadius: 9,
                        outline: p.url === s.featuredPhoto ? '3px solid #15803d' : 'none', outlineOffset: 1 }} />
                      {p.url === s.featuredPhoto && (
                        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 8.5, fontWeight: 800,
                          background: '#15803d', color: '#fff', borderRadius: 20, padding: '2px 6px' }}>COVER</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => setEditing(true)} style={{ ...btnLight, marginTop: 12 }}>
                ✎ Edit story
              </button>
            </>
          )}

          {s.removalRequestedAt && (
            <div style={{ marginTop: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#991b1b' }}>
                Runner asked for removal — {new Date(s.removalRequestedAt).toLocaleString('en-IN')}
              </div>
              {s.removalNote && <div style={{ fontSize: 12.5, color: '#b91c1c', marginTop: 4 }}>"{s.removalNote}"</div>}
              <button disabled={busy} onClick={() => run(() => adminAPI.stories.removal(s._id, { clear: true }))}
                style={{ ...btnLight, marginTop: 9, borderColor: '#fca5a5', color: '#991b1b' }}>
                Clear request (runner has agreed)
              </button>
            </div>
          )}

          {/* Category — /stories page par isse filter chips bante hain */}
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 5 }}>
              CATEGORY — shows as a filter on the stories page
            </label>
            <select value={s.category || ''} disabled={busy}
              onChange={(e) => run(() => adminAPI.stories.update(s._id, { category: e.target.value }))}
              style={{ ...input, width: 'auto', fontSize: 12.5, padding: '8px 10px' }}>
              {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          <div style={{ marginTop: 12 }}>
            <input style={input} placeholder="Admin note (internal only)" value={note}
              onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
        {s.status !== 'published' && (
          <button disabled={busy || !canPublish}
            title={canPublish ? '' : 'No consent'}
            onClick={() => run(() => adminAPI.stories.setStatus(s._id, 'published', note))}
            style={{ ...btn, background: canPublish ? '#15803d' : '#d1d5db', cursor: canPublish ? 'pointer' : 'not-allowed' }}>
            ✓ Publish
          </button>
        )}
        {s.status === 'published' && (
          <button disabled={busy} onClick={() => run(() => adminAPI.stories.setStatus(s._id, 'approved', note))}
            style={btnLight}>Unpublish</button>
        )}
        {s.status === 'pending' && (
          <button disabled={busy} onClick={() => run(() => adminAPI.stories.setStatus(s._id, 'approved', note))}
            style={btnLight}>Approve (not public yet)</button>
        )}
        {s.status !== 'rejected' && (
          <button disabled={busy} onClick={() => {
            if (!confirm('Reject this story?')) return;
            run(() => adminAPI.stories.setStatus(s._id, 'rejected', note));
          }} style={{ ...btnLight, color: '#dc2626', borderColor: '#fecaca' }}>Reject</button>
        )}

        {s.status === 'published' && (
          <>
            <button disabled={busy} onClick={() => run(() => adminAPI.stories.setHomepage(s._id, { onHomepage: !s.onHomepage }))}
              style={{ ...btnLight, background: s.onHomepage ? '#dbeafe' : '#fff' }}>
              {s.onHomepage ? 'Remove from homepage' : 'Show on homepage'}
            </button>
            <button disabled={busy} onClick={() => run(() => adminAPI.stories.setWeek(s._id, { isStoryOfWeek: !s.isStoryOfWeek }))}
              style={{ ...btnLight, background: s.isStoryOfWeek ? '#fef3c7' : '#fff' }}>
              {s.isStoryOfWeek ? 'Remove from Story of the Week' : 'Story of the Week'}
            </button>
            <select value={s.badge || ''} disabled={busy}
              onChange={(e) => run(() => adminAPI.stories.setBadge(s._id, e.target.value))}
              style={{ ...input, width: 'auto', fontSize: 12.5, padding: '8px 10px' }}>
              {BADGES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <a href={`/stories/${s.slug}`} target="_blank" rel="noopener noreferrer"
              style={{ ...btnLight, textDecoration: 'none', display: 'inline-block' }}>View on site ↗</a>
          </>
        )}
      </div>
    </Card>
  );
}

/* ── Kahani theek karna ──
   Admin typo sudhar sakta hai, chhoti si ek-line likh sakta hai,
   cover photo chun sakta hai. Matlab badalna iska kaam nahi — ye
   kisi aur ki kahani hai. */
function StoryEditor({ s, onCancel, onSaved }) {
  const [f, setF] = useState({
    title: s.title || '',
    summary: s.summary || '',
    body: s.body || '',
    eventTitle: s.eventTitle || '',
    eventSlug: s.eventSlug || '',
    featuredPhoto: s.featuredPhoto || '',
    pullQuote: s.pullQuote || '',
  });
  const [events, setEvents] = useState([]);
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/event-options`)
      .then((r) => r.json())
      .then((d) => setEvents(d?.events || []))
      .catch(() => setEvents([]));
  }, []);

  /* Wahi jaanch jo server karta hai, bas pehle — taaki admin ko save
     dabane se pehle hi pata chal jaaye. Asli rok server par hi hai. */
  const flat = (t) => String(t || '')
    .replace(/[‘’‛ʼ]/g, "'")
    .replace(/[“”‟]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ').trim().toLowerCase();

  const quoteState = !f.pullQuote.trim()
    ? 'empty'
    : flat(f.body).includes(flat(f.pullQuote)) ? 'ok' : 'bad';

  const save = async () => {
    if (!f.title.trim() || !f.body.trim()) { alert('Title and story cannot be empty.'); return; }
    if (quoteState === 'bad') {
      alert('The highlighted line is not in the story. Copy the sentence exactly as the runner wrote it.');
      return;
    }
    setBusy(true);
    const res = await adminAPI.stories.update(s._id, f);
    setBusy(false);
    onSaved(res);
  };

  const L = ({ children }) => (
    <label style={{ fontSize: 11.5, fontWeight: 700, color: '#6b7280', display: 'block', margin: '12px 0 5px' }}>
      {children}
    </label>
  );

  return (
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 14 }}>
      <div style={{ fontWeight: 800, fontSize: 13.5, color: '#7c2d12' }}>Editing this story</div>
      <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 3, lineHeight: 1.55 }}>
        Fix typos and tighten the wording, but keep what the runner meant.
      </div>

      <L>TITLE</L>
      <input style={input} value={f.title} onChange={(e) => set('title', e.target.value)} />

      <L>ONE-LINE DESCRIPTION — used on the card and in link previews</L>
      <input style={input} value={f.summary} placeholder="A small step that changed my life"
        onChange={(e) => set('summary', e.target.value)} />

      <L>VALLEY RUN CHALLENGE</L>
      <select style={input} value={f.eventSlug || ''}
        onChange={(e) => {
          const picked = events.find((x) => x.slug === e.target.value);
          setF((x) => ({ ...x, eventSlug: picked?.slug || '', eventTitle: picked?.title || '' }));
        }}>
        <option value="">Not related to a specific Valley Run event</option>
        {/* Purani kahani ka event list mein na mile to use gayab nahi
            hone dete — warna save karte hi wo chup-chaap mit jaata. */}
        {!f.eventSlug && f.eventTitle && <option value="">{f.eventTitle} (saved earlier)</option>}
        {events.map((e) => <option key={e.slug || e.title} value={e.slug}>{e.title}</option>)}
      </select>

      <L>STORY</L>
      <textarea style={{ ...input, minHeight: 260, resize: 'vertical', lineHeight: 1.7 }}
        value={f.body} onChange={(e) => set('body', e.target.value)} />

      {/* Ubhri hui line. Admin ise likhta nahi — kahani mein se chunta
          hai. Server bhi yahi jaanchta hai; wahi aakhri rok hai. */}
      <L>HIGHLIGHTED LINE — copy one sentence from the story above</L>
      <textarea style={{ ...input, minHeight: 64, resize: 'vertical', lineHeight: 1.6 }}
        placeholder="Paste a sentence the runner actually wrote"
        value={f.pullQuote} onChange={(e) => set('pullQuote', e.target.value)} />
      <div style={{ fontSize: 11.5, lineHeight: 1.55, marginTop: 5,
        color: quoteState === 'bad' ? '#b91c1c' : quoteState === 'ok' ? '#15803d' : '#9ca3af' }}>
        {quoteState === 'bad'
          ? '✕ This line is not in the story. Copy it exactly — we never put words in someone’s mouth.'
          : quoteState === 'ok'
            ? '✓ Found in the story. It will appear in large type in the middle of the page.'
            : 'Optional. Leave it empty and no highlighted line is shown.'}
      </div>

      {s.photos?.length > 0 && (
        <>
          <L>COVER PHOTO — click one to use it on the card and in link previews</L>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {s.photos.map((p) => {
              const on = f.featuredPhoto === p.url;
              return (
                <button key={p.url} type="button" onClick={() => set('featuredPhoto', on ? '' : p.url)}
                  style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', position: 'relative' }}>
                  <img src={p.url} alt="" style={{ width: 92, height: 92, objectFit: 'cover', borderRadius: 9,
                    outline: on ? '3px solid #15803d' : '1px solid #e5e7eb', outlineOffset: 1, opacity: on ? 1 : .72 }} />
                  {on && (
                    <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 8.5, fontWeight: 800,
                      background: '#15803d', color: '#fff', borderRadius: 20, padding: '2px 6px' }}>COVER</span>
                  )}
                </button>
              );
            })}
          </div>
          {!s.consent?.publishPhotos && (
            <div style={{ fontSize: 12, color: '#991b1b', marginTop: 7 }}>
              The runner did not allow photos to be published — these will not appear on the site.
            </div>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={save} disabled={busy} style={btn}>{busy ? 'Saving…' : '✓ Save changes'}</button>
        <button onClick={onCancel} disabled={busy} style={btnLight}>Cancel</button>
      </div>
    </div>
  );
}

const Stat = ({ n, label, color = '#111827' }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 21, fontWeight: 800, color }}>{n ?? '—'}</div>
    <div style={{ fontSize: 10.5, color: '#9ca3af', marginTop: 2 }}>{label}</div>
  </div>
);

const Pill = ({ bg, fg, children }) => (
  <span style={{ fontSize: 9.5, fontWeight: 800, padding: '3px 8px', borderRadius: 20, background: bg, color: fg }}>
    {children}
  </span>
);

const StatusPill = ({ status }) => {
  const map = {
    pending:   ['#fef3c7', '#92400e', 'PENDING'],
    approved:  ['#e0e7ff', '#3730a3', 'APPROVED'],
    published: ['#dcfce7', '#166534', 'PUBLISHED'],
    rejected:  ['#f3f4f6', '#6b7280', 'REJECTED'],
  }[status] || ['#f3f4f6', '#6b7280', status];
  return <Pill bg={map[0]} fg={map[1]}>{map[2]}</Pill>;
};

const Consent = ({ ok, label }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600, color: ok ? '#166534' : '#991b1b' }}>
    {ok ? '✓' : '✕'} {label}
  </span>
);
