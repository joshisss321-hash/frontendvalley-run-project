'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      const data = res.users || res || [];
      setUsers(data);
      setFiltered(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSearch = (q) => {
    setSearch(q);
    if (!q) { setFiltered(users); return; }
    const ql = q.toLowerCase();
    setFiltered(users.filter(u =>
      (u.name || '').toLowerCase().includes(ql) ||
      (u.email || '').toLowerCase().includes(ql) ||
      (u.phone || '').toLowerCase().includes(ql)
    ));
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#868e96' }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Users</h1>
        <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>{filtered.length} total users</p>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e9ecef' }}>
          <input value={search} onChange={e => handleSearch(e.target.value)}
            placeholder="Search name, email, phone..."
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '13px', width: '300px' }} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['#', 'Name', 'Email', 'Phone', 'City', 'Events', 'Source', 'Joined'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#495057', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e9ecef' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>No users found</td></tr>
              ) : (
                filtered.map((u, i) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '12px 16px', color: '#868e96' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{u.name || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#495057', fontSize: '12px' }}>{u.email || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>{u.phone || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#868e96' }}>{u.city || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#e7f5ff', color: '#1971c2', fontWeight: 600 }}>{(u.joinedEvents || []).length} events</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#868e96', fontSize: '12px' }}>{u.source || '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#868e96', fontSize: '11px' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}</td>
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