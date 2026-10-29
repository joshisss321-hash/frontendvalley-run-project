'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

/* Store ke har admin page ka upar ka hissa — ek hi jagah.
   Token jaanchna, header, Back aur Logout. Har page mein alag-alag
   likhte to kahin auth check chhoot jaata. */
export default function StoreShell({ title, subtitle, back = '/admin/store', right, children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) { router.replace('/admin/login'); return; }
      adminAPI.verifyToken()
        .then((r) => {
          if (!r.success) { localStorage.removeItem('adminToken'); router.replace('/admin/login?expired=1'); }
          else setReady(true);
        })
        .catch(() => router.replace('/admin/login'));
    };

    check();
    // Tab mahino khula reh sakta hai — wapas aate hi dobara jaancho
    const onVis = () => { if (document.visibilityState === 'visible') check(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!ready) {
    return <div style={{ padding: 60, textAlign: 'center', color: '#868e96' }}>Checking…</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7f9' }}>
      <header style={{
        background: '#14532d', color: '#fff', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <button onClick={() => router.push(back)} style={btnGhost}>← Back</button>

        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: 11, opacity: .7, marginTop: 2 }}>{subtitle}</div>
          )}
        </div>

        {right}

        <button
          onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login'); }}
          style={{ ...btnGhost, background: 'rgba(0,0,0,.25)' }}
        >
          Logout
        </button>
      </header>

      <main style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>{children}</main>
    </div>
  );
}

const btnGhost = {
  background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8,
  padding: '7px 13px', color: '#fff', fontWeight: 700, fontSize: 12,
  cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
};

/* Chhote reusable tukde — store ke saare admin pages inhi se bane hain */
export const Card = ({ children, style }) => (
  <div style={{
    background: '#fff', borderRadius: 14, padding: 16, marginBottom: 14,
    boxShadow: '0 2px 8px rgba(0,0,0,.06)', ...style,
  }}>
    {children}
  </div>
);

export const Field = ({ label, hint, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>
      {label}
    </label>
    {children}
    {hint && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{hint}</div>}
  </div>
);

export const input = {
  width: '100%', padding: '10px 12px', borderRadius: 9,
  border: '1.5px solid #e5e7eb', outline: 'none', fontSize: 14,
  fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
};

export const btnPrimary = {
  background: '#14532d', color: '#fff', border: 'none', borderRadius: 9,
  padding: '11px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
  fontFamily: 'inherit',
};

export const btnLight = {
  background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb',
  borderRadius: 9, padding: '10px 16px', fontWeight: 600, fontSize: 13,
  cursor: 'pointer', fontFamily: 'inherit',
};

export const Pill = ({ ok, children }) => (
  <span style={{
    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
    background: ok ? '#dcfce7' : '#f3f4f6',
    color: ok ? '#15803d' : '#6b7280',
  }}>
    {children}
  </span>
);
