'use client';

/* Haath se bane SVG charts.

   Koi chart library jaan-bujh kar nahi lagayi: is project mein ek
   bhi nahi hai, aur in do saadhe charts ke liye 100 KB ka bundle
   jodna admin panel ko sirf dheema karta. Jitna chahiye, utna hi.

   Dono charts khali data par apne aap "abhi kuch nahi" dikha dete
   hain — khali axis se behtar yahi hai. */

const C = {
  influencer:      '#1e3a8a',
  instagram_ads:   '#d946ef',
  facebook_ads:    '#2563eb',
  whatsapp_group:  '#16a34a',
  whatsapp_direct: '#22c55e',
  organic:         '#f59e0b',
  direct:          '#64748b',
  other:           '#a8a29e',
  not_tracked:     '#d6d3d1',
};

export const sourceColor = (k) => C[k] || '#94a3b8';

const Empty = ({ text }) => (
  <div style={{ padding: '34px 12px', textAlign: 'center', color: '#b0b6bd', fontSize: 13 }}>
    {text}
  </div>
);

/* ── Horizontal bars ──
   Source comparison ke liye. Vertical se behtar hai kyunki labels
   lambe hote hain ("WhatsApp Groups") aur phone par vertical bars
   ke labels tedhe karne padte. */
export function BarRows({ rows, valueKey = 'value', format, emptyText = 'No data yet' }) {
  const list = (rows || []).filter((r) => (r[valueKey] || 0) > 0);
  if (!list.length) return <Empty text={emptyText} />;

  const max = Math.max(...list.map((r) => r[valueKey]));
  const fmt = format || ((v) => v.toLocaleString('en-IN'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      {list.map((r) => (
        <div key={r.key}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            fontSize: 12.5, marginBottom: 4 }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>{r.label}</span>
            <span style={{ fontWeight: 800, color: '#111827' }}>{fmt(r[valueKey])}</span>
          </div>
          <div style={{ height: 9, borderRadius: 20, background: '#f1f3f5', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.max(2, (r[valueKey] / max) * 100)}%`,
              height: '100%', borderRadius: 20,
              background: r.color || sourceColor(r.key),
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Daily line / area ──
   viewBox se chart apne aap har chaudai mein fit ho jaata hai —
   phone par bhi, bina JS ke. */
export function DailyChart({ series, height = 150, emptyText = 'No activity in this period' }) {
  const data = series || [];
  if (data.length === 0) return <Empty text={emptyText} />;

  /* Ek hi din ka data — line khinchne ke liye kam se kam do point
     chahiye. Pehle yahan "No activity" dikhta tha, jo seedha jhooth
     tha: activity thi, bas ek hi din ki. */
  if (data.length === 1) {
    return (
      <div style={{ padding: '26px 12px', textAlign: 'center' }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#1e3a8a' }}>{data[0].n}</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>on {data[0].day}</div>
        <div style={{ fontSize: 11, color: '#c3c7cd', marginTop: 7 }}>
          A day-by-day chart appears once there are two or more days of data.
        </div>
      </div>
    );
  }

  const W = 600, H = height, P = 6;
  const max = Math.max(1, ...data.map((d) => d.n));

  const x = (i) => P + (i / (data.length - 1)) * (W - P * 2);
  const y = (v) => H - P - (v / max) * (H - P * 2 - 14);

  const line = data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.n).toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)},${H - P} L${x(0).toFixed(1)},${H - P} Z`;

  const first = data[0].day;
  const last  = data[data.length - 1].day;
  const peak  = data.reduce((a, b) => (b.n > a.n ? b : a), data[0]);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img" aria-label={`Daily chart, peak ${peak.n} on ${peak.day}`}>
        <defs>
          <linearGradient id="vrFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e3a8a" stopOpacity=".22" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#vrFade)" />
        <path d={line} fill="none" stroke="#1e3a8a" strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) =>
          d.n === peak.n ? (
            <circle key={i} cx={x(i)} cy={y(d.n)} r="3.5" fill="#1e3a8a" />
          ) : null
        )}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5,
        color: '#9ca3af', marginTop: 4 }}>
        <span>{first}</span>
        <span>peak {peak.n} · {peak.day}</span>
        <span>{last}</span>
      </div>
    </div>
  );
}

/* ── Clicks vs registrations ──
   Do number saath mein — funnel ka sabse chhota roop. */
export function FunnelBar({ clicks, unique, registrations }) {
  const max = Math.max(1, clicks, unique, registrations);
  const rows = [
    { key: 'clicks',  label: 'Link clicks',         value: clicks,        color: '#c7d2fe' },
    { key: 'unique',  label: 'Unique visitors',     value: unique,        color: '#818cf8' },
    { key: 'regs',    label: 'Registrations',       value: registrations, color: '#1e3a8a' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((r) => (
        <div key={r.key}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>{r.label}</span>
            <span style={{ fontWeight: 800 }}>{r.value.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ height: 11, borderRadius: 20, background: '#f1f3f5', overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(1.5, (r.value / max) * 100)}%`, height: '100%',
              borderRadius: 20, background: r.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
