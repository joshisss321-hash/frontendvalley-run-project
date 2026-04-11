'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [recentRegs, setRecentRegs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [statsRes, eventsRes, regsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getEvents(),
        adminAPI.getRegistrations({}),
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (eventsRes.success) setEvents(eventsRes.events || []);
      const regs = regsRes.registrations || regsRes || [];
      setRecentRegs(regs.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ label, value, color }) => (
    <div style={{
      background: 'white', borderRadius: '12px', padding: '20px',
      border: '1px solid #e9ecef', borderLeft: `4px solid ${color}`
    }}>
      <div style={{ fontSize: '12px', color: '#868e96', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{value ?? '—'}</div>
    </div>
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#868e96' }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>Welcome back! Here's your overview</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Total Users" value={stats?.totalUsers} color="#1971c2" />
        <StatCard label="Registrations" value={stats?.totalRegistrations} color="#2f9e44" />
        <StatCard label="Submissions" value={stats?.totalSubmissions} color="#f08c00" />
        <StatCard label="Certificates" value={stats?.certificates} color="#9c36b5" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Pending Submissions" value={stats?.pendingSubmissions} color="#e03131" />
        <StatCard label="Approved Submissions" value={stats?.approvedSubmissions} color="#2f9e44" />
      </div>

      {/* Events */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef', marginBottom: '24px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>Active Events</div>
          <button onClick={() => router.push('/admin/events')} style={{ fontSize: '12px', color: '#1971c2', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Manage →</button>
        </div>
        {events.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#868e96', fontSize: '13px' }}>No events found</div>
        ) : (
          events.map(ev => (
            <div key={ev._id} style={{ padding: '14px 20px', borderBottom: '1px solid #f1f3f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{ev.title}</div>
                <div style={{ fontSize: '11px', color: '#868e96', marginTop: '2px' }}>{ev.dates} · ₹{ev.price}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 600, background: ev.active ? '#d3f9d8' : '#ffe3e3', color: ev.active ? '#2b8a3e' : '#c92a2a' }}>
                  {ev.active ? 'Active' : 'Closed'}
                </span>
                <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 600, background: '#e7f5ff', color: '#1971c2' }}>
                  Reg: {ev.registrationStatus || 'Open'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Registrations */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>Recent Registrations</div>
          <button onClick={() => router.push('/admin/registrations')} style={{ fontSize: '12px', color: '#1971c2', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View all →</button>
        </div>
        {recentRegs.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#868e96', fontSize: '13px' }}>No registrations yet</div>
        ) : (
          recentRegs.map((r, i) => (
            <div key={i} style={{ padding: '12px 20px', borderBottom: '1px solid #f1f3f5', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e7f5ff', color: '#1971c2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                {(r.user?.name || r.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{r.user?.name || r.name || '—'}</div>
                <div style={{ fontSize: '11px', color: '#868e96' }}>{r.user?.email || r.email || ''} · {r.category || ''}</div>
              </div>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#d3f9d8', color: '#2b8a3e', fontWeight: 600 }}>Paid</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}