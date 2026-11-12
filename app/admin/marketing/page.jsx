'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import Shell, { Card, input, btn, btnLight, Stat, Pill, HealthWarning, money } from './Shell';
import { BarRows, DailyChart, FunnelBar, sourceColor } from './Charts';

const SORTS = [
  ['registrations', 'Most registrations'],
  ['revenue',       'Highest revenue'],
  ['conversion',    'Best conversion'],
  ['clicks',        'Most clicks'],
  ['name',          'Name (A–Z)'],
];

export default function MarketingOverview() {
  const router = useRouter();

  const [health, setHealth] = useState(null);
  const [events, setEvents] = useState([]);
  const [data, setData]     = useState(null);
  const [rows, setRows]     = useState([]);
  const [loading, setLoading] = useState(true);

  const [f, setF] = useState({ eventSlug: '', event: '', from: '', to: '', source: '', sort: 'registrations' });
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  useEffect(() => {
    adminAPI.marketing.health().then((r) => setHealth(r));
    adminAPI.getEvents().then((r) => setEvents(r?.events || []));
  }, []);

  const load = async () => {
    setLoading(true);
    const [o, p] = await Promise.all([
      adminAPI.marketing.overview({ eventSlug: f.eventSlug, from: f.from, to: f.to, source: f.source }),
      adminAPI.marketing.performance({ eventSlug: f.eventSlug, event: f.event, from: f.from, to: f.to, sort: f.sort }),
    ]);
    if (o?.success) setData(o);
    setRows(p?.rows || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [f.eventSlug, f.from, f.to, f.source, f.sort]);

  /* Event badla to slug aur id dono chahiye — table influencer ke
     event par filter karta hai, counts registration ke slug par */
  const pickEvent = (id) => {
    const ev = events.find((e) => String(e._id) === id);
    setF((x) => ({ ...x, event: id, eventSlug: ev ? ev.slug : '' }));
  };

  const t = data?.totals || {};
  const s = data?.sources || {};
  const labels = data?.sourceLabels || {};

  const sourceRows = Object.entries(s)
    .map(([key, v]) => ({
      key,
      label: key === 'not_tracked' ? 'Not tracked' : (labels[key] || key),
      value: v.registrations,
      revenue: v.revenue,
    }))
    .sort((a, b) => b.value - a.value);

  /* Roz ka total — chart ke liye saare source jod do */
  const dailyTotals = (() => {
    const by = {};
    (data?.daily || []).forEach((d) => { by[d.day] = (by[d.day] || 0) + d.n; });
    return Object.entries(by).sort(([a], [b]) => a.localeCompare(b)).map(([day, n]) => ({ day, n }));
  })();

  const download = async (kind) => {
    const res = await adminAPI.marketing.exportRows({
      eventSlug: f.eventSlug, from: f.from, to: f.to, source: f.source,
    });
    if (!res?.rows?.length) { alert('Nothing to export for these filters.'); return; }

    const headers = [
      'Sr', 'Registration ID', 'BIB', 'Event', 'Category', 'Date', 'Participant', 'City',
      'Marketing Source', 'Influencer', 'Referral Code', 'UTM Campaign', 'UTM Medium',
      'First Touch', 'Last Touch', 'Amount Charged', 'Amount On Record',
    ];
    const body = res.rows.map((r) => [
      r.sr, r.registrationId, r.bib, r.event, r.category, r.date, r.participant, r.city,
      r.marketingSource, r.influencer, r.referralCode, r.utmCampaign, r.utmMedium,
      r.firstTouch, r.lastTouch, r.amountCharged, r.amountOnRecord,
    ]);

    const name = `marketing-${f.eventSlug || 'all'}-${new Date().toISOString().slice(0, 10)}`;

    if (kind === 'csv') {
      const csv = [headers, ...body]
        .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
        .join('\n');
      const a = document.createElement('a');
      a.href = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv);
      a.download = `${name}.csv`;
      a.click();
      return;
    }

    const XLSX = await import('xlsx');
    const ws = XLSX.utils.aoa_to_sheet([headers, ...body]);
    ws['!cols'] = [5, 26, 15, 26, 12, 12, 20, 14, 18, 20, 14, 20, 16, 16, 16, 15, 16].map((w) => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Marketing');
    XLSX.writeFile(wb, `${name}.xlsx`);
  };

  return (
    <Shell
      title="Marketing & Influencer Analytics"
      subtitle="Where your registrations actually come from"
      back="/admin/dashboard"
      right={
        <button onClick={() => router.push('/admin/marketing/influencers')}
          style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8,
            padding: '7px 13px', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
          Influencers
        </button>
      }
    >
      <HealthWarning health={health} />

      {/* ── Filters ── */}
      <Card style={{ padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 9 }}>
          <select style={input} value={f.event} onChange={(e) => pickEvent(e.target.value)}>
            <option value="">All events</option>
            {events.map((e) => <option key={e._id} value={e._id}>{e.title}</option>)}
          </select>

          <select style={input} value={f.source} onChange={(e) => set('source', e.target.value)}>
            <option value="">All sources</option>
            {Object.entries(labels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <input style={input} type="date" value={f.from} onChange={(e) => set('from', e.target.value)} title="From" />
          <input style={input} type="date" value={f.to}   onChange={(e) => set('to', e.target.value)}   title="To" />

          <select style={input} value={f.sort} onChange={(e) => set('sort', e.target.value)}>
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        {(f.event || f.from || f.to || f.source) && (
          <button onClick={() => setF({ eventSlug: '', event: '', from: '', to: '', source: '', sort: f.sort })}
            style={{ ...btnLight, marginTop: 9 }}>Clear filters</button>
        )}
      </Card>

      {loading && !data ? (
        <div style={{ padding: 50, textAlign: 'center', color: '#9ca3af' }}>Loading…</div>
      ) : (
        <>
          {/* ── Stat cards ── */}
          <Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(104px,1fr))', gap: 8 }}>
              <Stat n={t.tracked}       label="Tracked regs" color="#1e3a8a" />
              <Stat n={s.influencer?.registrations || 0}      label="Influencer" />
              <Stat n={s.instagram_ads?.registrations || 0}   label="Instagram Ads" />
              <Stat n={(s.whatsapp_group?.registrations || 0) + (s.whatsapp_direct?.registrations || 0)}
                    label="WhatsApp" />
              <Stat n={s.direct?.registrations || 0}          label="Direct" />
              <Stat n={money(t.attributedRevenue)}            label="Attributed revenue" color="#15803d" />
            </div>

            {/* Ye line jaan-bujh kar hai: jhootha "Direct" dikhane se
                behtar hai saaf kehna ki kitni registrations ki source
                pata hi nahi chali. */}
            {t.notTracked > 0 && (
              <div style={{ marginTop: 12, paddingTop: 11, borderTop: '1px solid #f1f3f5',
                fontSize: 12, color: '#78716c', lineHeight: 1.6 }}>
                <strong>{t.notTracked}</strong> registration{t.notTracked > 1 ? 's have' : ' has'} no
                tracking data — either from before tracking was switched on, or the visitor's browser
                blocked cookies. They are <em>not</em> counted as Direct, because we do not know.
              </div>
            )}
          </Card>

          {/* ── Source breakdown ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 12 }}>
            <Card>
              <H>Registrations by source</H>
              <BarRows rows={sourceRows} emptyText="No registrations in this period" />
            </Card>

            <Card>
              <H>Revenue by source</H>
              <BarRows rows={sourceRows} valueKey="revenue" format={money}
                emptyText="No attributed revenue yet" />
            </Card>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 12 }}>
            <Card>
              <H>Registrations per day</H>
              <DailyChart series={dailyTotals} />
            </Card>

            <Card>
              <H>Clicks vs registrations</H>
              <FunnelBar clicks={t.clicks || 0} unique={t.uniqueVisitors || 0}
                registrations={s.influencer?.registrations || 0} />
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 10, lineHeight: 1.55 }}>
                Clicks and visitors count referral links only. “Unique visitors” is an estimate —
                two people on one Wi-Fi may count as one, and a phone that changes network may
                count twice.
              </div>
            </Card>
          </div>

          {/* ── Influencer table ── */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px 10px', display: 'flex', gap: 9,
              alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 170 }}>
                <H style={{ margin: 0 }}>Influencer performance</H>
              </div>
              <button onClick={() => download('csv')}   style={btnLight}>CSV</button>
              <button onClick={() => download('xlsx')}  style={btn}>⬇ Excel</button>
            </div>

            {rows.length === 0 ? (
              <div style={{ padding: '34px 16px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>📣</div>
                <div style={{ fontWeight: 700, color: '#374151' }}>No influencers yet</div>
                <p style={{ fontSize: 13, color: '#9ca3af', margin: '7px 0 16px', lineHeight: 1.6 }}>
                  Add one, give them their link, and everything they bring in shows up here.
                </p>
                <button onClick={() => router.push('/admin/marketing/influencers')} style={btn}>
                  Add an influencer
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 720 }}>
                  <thead>
                    <tr style={{ background: '#f8f9fb', textAlign: 'left' }}>
                      {['Influencer', 'Event', 'Code', 'Clicks', 'Unique', 'Regs', 'Revenue', 'Conv.', ''].map((h, i) => (
                        <th key={h + i} style={{ padding: '9px 12px', fontWeight: 700, color: '#6b7280',
                          whiteSpace: 'nowrap', textAlign: i >= 3 && i <= 7 ? 'right' : 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r._id} style={{ borderTop: '1px solid #f1f3f5' }}>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ fontWeight: 700, color: '#111827' }}>{r.name}</div>
                          {r.instagramUsername && (
                            <div style={{ fontSize: 11, color: '#9ca3af' }}>@{r.instagramUsername}</div>
                          )}
                          {!r.isActive && (
                            <div style={{ marginTop: 3 }}><Pill bg="#f3f4f6" fg="#6b7280">INACTIVE</Pill></div>
                          )}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#6b7280' }}>
                          {r.events.length ? r.events.map((e) => e.title).join(', ') : '—'}
                        </td>
                        <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12 }}>{r.code}</td>
                        <td style={num}>{r.clicks}</td>
                        <td style={num}>{r.unique}</td>
                        <td style={{ ...num, fontWeight: 800, color: '#1e3a8a' }}>{r.registrations}</td>
                        <td style={{ ...num, fontWeight: 700, color: '#15803d' }}>{money(r.revenue)}</td>
                        <td style={num}>{r.conversion === null ? '—' : `${r.conversion}%`}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <button onClick={() => router.push(`/admin/marketing/influencers/${r._id}`)}
                            style={{ ...btnLight, padding: '6px 11px', fontSize: 11.5 }}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </Shell>
  );
}

const H = ({ children, style }) => (
  <div style={{ fontWeight: 800, fontSize: 13.5, color: '#1f2937', marginBottom: 13, ...style }}>
    {children}
  </div>
);

const num = { padding: '10px 12px', textAlign: 'right', whiteSpace: 'nowrap' };
