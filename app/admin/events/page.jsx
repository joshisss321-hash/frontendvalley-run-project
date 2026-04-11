'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    try {
      const result = await adminAPI.getEvents();
      if (result.success) setEvents(result.events || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    const result = await adminAPI.deleteEvent(id);
    if (result.success) loadEvents();
    else alert('Failed to delete');
  };

  const toggleActive = async (ev) => {
    await adminAPI.updateEvent(ev._id, { active: !ev.active });
    loadEvents();
  };

  const toggleRegStatus = async (ev) => {
    const next = ev.registrationStatus === 'open' ? 'closed' : ev.registrationStatus === 'closed' ? 'upcoming' : 'open';
    await adminAPI.updateEvent(ev._id, { registrationStatus: next });
    loadEvents();
  };

  const Badge = ({ label, color, bg, onClick }) => (
    <span onClick={onClick} style={{
      fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
      fontWeight: 600, background: bg, color, cursor: onClick ? 'pointer' : 'default'
    }}>{label}</span>
  );

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#868e96' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Events</h1>
          <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>Manage all events</p>
        </div>
        <button onClick={() => router.push('/admin/events/create')} style={{
          padding: '9px 18px', background: '#1971c2', color: 'white',
          border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer'
        }}>+ Create Event</button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        {events.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#868e96' }}>No events yet. Create your first event!</div>
        ) : (
          events.map(ev => (
            <div key={ev._id} style={{ padding: '16px 20px', borderBottom: '1px solid #f1f3f5', display: 'flex', alignItems: 'center', gap: '16px' }}>
              {ev.image && <img src={ev.image} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{ev.title}</div>
                <div style={{ fontSize: '12px', color: '#868e96' }}>
                  {ev.slug} · ₹{ev.price} · {ev.dates}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <Badge label={ev.active ? 'Active' : 'Closed'} color={ev.active ? '#2b8a3e' : '#c92a2a'} bg={ev.active ? '#d3f9d8' : '#ffe3e3'} onClick={() => toggleActive(ev)} />
                <Badge
                  label={`Reg: ${ev.registrationStatus || 'open'}`}
                  color={ev.registrationStatus === 'closed' ? '#c92a2a' : ev.registrationStatus === 'upcoming' ? '#1971c2' : '#2b8a3e'}
                  bg={ev.registrationStatus === 'closed' ? '#ffe3e3' : ev.registrationStatus === 'upcoming' ? '#e7f5ff' : '#d3f9d8'}
                  onClick={() => toggleRegStatus(ev)}
                />
                <button onClick={() => router.push(`/admin/events/edit/${ev._id}`)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #e9ecef', background: 'white', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button onClick={() => handleDelete(ev._id)} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #ffe3e3', background: '#ffe3e3', color: '#c92a2a', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}