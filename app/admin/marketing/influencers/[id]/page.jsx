'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, input, btn, btnLight, Stat, Pill, money } from '../../Shell';
import { DailyChart, FunnelBar, BarRows } from '../../Charts';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.valleyrun.in';

export default function InfluencerDetail() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ from: '', to: '' });
  const [copied, setCopied] = useState('');

  const load = async () => {
    setLoading(true);
    const res = await adminAPI.marketing.influencers.detail(id, range);
    if (res?.success === false) { alert(res.message); setLoading(false); return; }
    setD(res);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id, range.from, range.to]);

  const copy = async (text, key) => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      } catch { prompt('Copy this link:', text); return; }
    }
    setCopied(key); setTimeout(() => setCopied(''), 1800);
  };

  if (loading && !d) {
    return <Shell title="Influencer" back="/admin/marketing/influencers">
      <div style={{ padding: 50, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
    </Shell>;
  }
  if (!d) {
    return <Shell title="Influencer" back="/admin/marketing/influencers">
      <Card><div style={{ padding: 20, textAlign: 'center' }}>Not found.</div></Card>
    </Shell>;
  }

  const inf = d.influencer;
  const s = d.stats || {};
  const evs = inf.eventIds || [];

  return (
    <Shell title={inf.name}
      subtitle={inf.instagramUsername ? `@${inf.instagramUsername}` : 'Influencer analytics'}
      back="/admin/marketing/influencers">

      {/* ── Kaun ── */}
      <Card>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 15,
            color: '#1e3a8a', letterSpacing: 1 }}>{inf.code}</span>
          {inf.isActive
            ? <Pill bg="#dcfce7" fg="#166534">ACTIVE</Pill>
            : <Pill bg="#f3f4f6" fg="#6b7280">INACTIVE</Pill>}
          {inf.email && <span style={{ fontSize: 12, color: '#9ca3af' }}>{inf.email}</span>}
          {inf.phone && <span style={{ fontSize: 12, color: '#9ca3af' }}>{inf.phone}</span>}
        </div>

        {!inf.isActive && (
          <div style={{ fontSize: 12.5, color: '#6b7280', background: '#f8f9fb',
            borderRadius: 9, padding: '9px 11px', marginBottom: 12, lineHeight: 1.6 }}>
            This influencer is deactivated. Everything below is their history and stays exactly
            as it is — only new visits are no longer credited.
          </div>
        )}

        {evs.length === 0 ? (
          <div style={{ fontSize: 12.5, color: '#b45309', background: '#fffbeb',
            border: '1px solid #fde68a', borderRadius: 9, padding: '9px 11px', lineHeight: 1.6 }}>
            No event is linked to them, so no registration can be credited. Add one in Edit.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {evs.map((e) => {
              const url = `${SITE}/challenges/${e.slug}?via=${inf.code}`;
              return (
                <div key={e.slug} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
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
      </Card>

      {/* ── Date range ── */}
      <Card style={{ padding: 12 }}>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
          <input style={{ ...input, width: 'auto', flex: '1 1 140px' }} type="date" value={range.from}
            onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))} />
          <input style={{ ...input, width: 'auto', flex: '1 1 140px' }} type="date" value={range.to}
            onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))} />
          {(range.from || range.to) && (
            <button onClick={() => setRange({ from: '', to: '' })} style={btnLight}>All time</button>
          )}
        </div>
      </Card>

      {/* ── Numbers ── */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 8 }}>
          <Stat n={s.clicks}        label="Clicks" />
          <Stat n={s.unique}        label="Unique visitors" hint="estimate" />
          <Stat n={s.registrations} label="Registrations" color="#1e3a8a" />
          <Stat n={money(s.revenue)} label="Revenue" color="#15803d" />
          <Stat n={s.conversion === null || s.conversion === undefined ? '—' : `${s.conversion}%`}
            label="Conversion" hint="regs / unique" />
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 12 }}>
        <Card>
          <H>Clicks vs registrations</H>
          <FunnelBar clicks={s.clicks || 0} unique={s.unique || 0} registrations={s.registrations || 0} />
        </Card>

        <Card>
          <H>By event</H>
          <BarRows
            rows={(d.byEvent || []).map((e) => ({
              key: e._id || 'none', label: e._id || '(no event)', value: e.registrations, color: '#1e3a8a',
            }))}
            emptyText="No registrations credited yet"
          />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 12 }}>
        <Card>
          <H>Clicks per day</H>
          <DailyChart series={d.dailyClicks} emptyText="No clicks in this period" />
        </Card>
        <Card>
          <H>Registrations per day</H>
          <DailyChart series={d.dailyRegs} emptyText="No registrations in this period" />
        </Card>
      </div>

      {/* ── Who registered ── */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 10px' }}>
          <H style={{ margin: 0 }}>Registrations credited to {inf.name.split(' ')[0]}</H>
        </div>

        {(d.registrations || []).length === 0 ? (
          <div style={{ padding: '26px 16px 34px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
            Nothing yet. Clicks can take a while to turn into registrations.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 560 }}>
              <thead>
                <tr style={{ background: '#f8f9fb', textAlign: 'left' }}>
                  {['Date', 'Participant', 'Event', 'Category', 'BIB', 'Amount'].map((h, i) => (
                    <th key={h} style={{ padding: '9px 12px', fontWeight: 700, color: '#6b7280',
                      whiteSpace: 'nowrap', textAlign: i === 5 ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.registrations.map((r) => (
                  <tr key={r._id} style={{ borderTop: '1px solid #f1f3f5' }}>
                    <td style={td}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : ''}</td>
                    <td style={td}>
                      {r.user?.name || '—'}
                      {r.user?.city && <span style={{ color: '#9ca3af' }}> · {r.user.city}</span>}
                    </td>
                    <td style={td}>{r.eventSlug}</td>
                    <td style={td}>{r.category}</td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 11.5 }}>{r.bibNumber}</td>
                    <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>
                      {money(r.attribution?.paidAmount || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {d.registrations.length >= 200 && (
              <div style={{ padding: '10px 16px', fontSize: 11.5, color: '#9ca3af' }}>
                Showing the latest 200. Use the Export button on the main page for the full list.
              </div>
            )}
          </div>
        )}
      </Card>
    </Shell>
  );
}

const H = ({ children, style }) => (
  <div style={{ fontWeight: 800, fontSize: 13.5, color: '#1f2937', marginBottom: 13, ...style }}>
    {children}
  </div>
);

const td = { padding: '10px 12px', whiteSpace: 'nowrap' };
