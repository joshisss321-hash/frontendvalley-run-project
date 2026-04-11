'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('');

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [regRes, evRes] = await Promise.all([adminAPI.getRegistrations({}), adminAPI.getEvents()]);
      const regs = regRes.registrations || regRes || [];
      setRegistrations(regs);
      setFiltered(regs);
      if (evRes.success) setEvents(evRes.events || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const applyFilters = (s, evSlug) => {
    let data = [...registrations];
    if (evSlug) data = data.filter(r => (r.eventSlug || r.event?.slug) === evSlug);
    if (s) {
      const q = s.toLowerCase();
      data = data.filter(r =>
        (r.user?.name || r.name || '').toLowerCase().includes(q) ||
        (r.user?.email || r.email || '').toLowerCase().includes(q) ||
        (r.user?.phone || r.phone || '').toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  };

  const exportCSV = () => {
    const rows = [['Name', 'Email', 'Phone', 'Category', 'Event', 'Date', 'Status']];
    filtered.forEach(r => rows.push([
      r.user?.name || r.name || '',
      r.user?.email || r.email || '',
      r.user?.phone || r.phone || '',
      r.category || '',
      r.eventSlug || r.event?.slug || '',
      r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : '',
      r.status || 'paid'
    ]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv,' + encodeURIComponent(csv);
    a.download = `registrations-${eventFilter || 'all'}.csv`;
    a.click();
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#868e96' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Registrations</h1>
          <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>{filtered.length} entries</p>
        </div>
        <button onClick={exportCSV} style={{ padding: '9px 18px', background: '#2f9e44', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Export CSV</button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e9ecef', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select value={eventFilter} onChange={e => { setEventFilter(e.target.value); applyFilters(search, e.target.value); }}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '13px', minWidth: '200px' }}>
            <option value="">All Events</option>
            {events.map(ev => <option key={ev._id} value={ev.slug}>{ev.title}</option>)}
          </select>
          <input value={search} onChange={e => { setSearch(e.target.value); applyFilters(e.target.value, eventFilter); }}
            placeholder="Search name, email, phone..."
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '13px', flex: 1, minWidth: '200px' }} />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['#', 'Name', 'Email', 'Phone', 'Category', 'Event', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#495057', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e9ecef' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>No registrations found</td></tr>
              ) : (
                filtered.map((r, i) => (
                  <tr key={r._id || i} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '12px 16px', color: '#868e96' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.user?.name || r.name || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#495057' }}>{r.user?.email || r.email || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>{r.user?.phone || r.phone || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#e7f5ff', color: '#1971c2', fontWeight: 600 }}>{r.category || '—'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '11px', color: '#868e96' }}>{r.eventSlug || r.event?.slug || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '11px', color: '#868e96' }}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#d3f9d8', color: '#2b8a3e', fontWeight: 600 }}>{r.status || 'paid'}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}