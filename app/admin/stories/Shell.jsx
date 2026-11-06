'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

/* Stories ke admin pages ka upar ka hissa — ek hi jagah.
   Token jaanchna bhi yahin, warna kisi page par chhoot jaata. */
export default function Shell({ title, subtitle, back = '/admin/stories', right, children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!localStorage.getItem('adminToken')) { router.replace('/admin/login'); return; }
      adminAPI.verifyToken()
        .then((r) => {
          if (!r.success) { localStorage.removeItem('adminToken'); router.replace('/admin/login?expired=1'); }
          else setReady(true);
        })
        .catch(() => router.replace('/admin/login'));
    };
    check();
    const onVis = () => { if (document.visibilityState === 'visible') check(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!ready) return <div style={{ padding: 60, textAlign: 'center', color: '#868e96' }}>Checking…</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7f9' }}>
      <header style={{
        background: '#7c2d12', color: '#fff', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <button onClick={() => router.push(back)} style={ghost}>← Back</button>
        <div style={{ flex: 1, minWidth: 130 }}>
          <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, opacity: .72, marginTop: 2 }}>{subtitle}</div>}
        </div>
        {right}
        <button onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login'); }}
          style={{ ...ghost, background: 'rgba(0,0,0,.25)' }}>Logout</button>
      </header>
      <main style={{ padding: 16, maxWidth: 1000, margin: '0 auto' }}>{children}</main>
    </div>
  );
}

const ghost = {
  background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8,
  padding: '7px 13px', color: '#fff', fontWeight: 700, fontSize: 12,
  cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
};

export const Card = ({ children, style }) => (
  <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,.06)', ...style }}>{children}</div>
);

export const Field = ({ label, hint, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>{label}</label>
    {children}
    {hint && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4, lineHeight: 1.5 }}>{hint}</div>}
  </div>
);

export const input = {
  width: '100%', padding: '10px 12px', borderRadius: 9, border: '1.5px solid #e5e7eb',
  outline: 'none', fontSize: 14, fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box',
};

export const btn = {
  background: '#7c2d12', color: '#fff', border: 'none', borderRadius: 9,
  padding: '10px 18px', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit',
};

export const btnLight = {
  background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: 9,
  padding: '9px 15px', fontWeight: 600, fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit',
};
