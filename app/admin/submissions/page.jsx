'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => { loadSubmissions(''); }, []);

  const loadSubmissions = async (status) => {
    setLoading(true);
    setActiveTab(status);
    try {
      const res = await adminAPI.getSubmissions(status);
      setSubmissions(res.submissions || res || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') await adminAPI.approveSubmission(id);
      else await adminAPI.rejectSubmission(id);
      loadSubmissions(activeTab);
    } catch (e) { console.error(e); }
  };

  const tabs = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Run Submissions</h1>
        <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>{submissions.length} submissions</p>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #e9ecef', display: 'flex', gap: '6px' }}>
          {tabs.map(t => (
            <button key={t.value} onClick={() => loadSubmissions(t.value)} style={{
              padding: '6px 16px', borderRadius: '8px', border: 'none', fontSize: '12px',
              fontWeight: activeTab === t.value ? 600 : 400, cursor: 'pointer',
              background: activeTab === t.value ? '#e7f5ff' : 'transparent',
              color: activeTab === t.value ? '#1971c2' : '#495057',
            }}>{t.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  {['Runner', 'Email', 'Phone', 'Distance', 'Proof', 'Status', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#495057', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e9ecef' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>No submissions found</td></tr>
                ) : (
                  submissions.map(s => (
                    <tr key={s._id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.name || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12px', color: '#495057' }}>{s.email || '—'}</td>
                      <td style={{ padding: '12px 16px' }}>{s.phone || '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: '#e7f5ff', color: '#1971c2', fontWeight: 600 }}>{s.distance || '—'}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {s.imageUrl ? <a href={s.imageUrl} target="_blank" rel="noreferrer" style={{ color: '#1971c2', fontSize: '12px', fontWeight: 600 }}>View Proof</a> : '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: 600,
                          background: s.status === 'approved' ? '#d3f9d8' : s.status === 'rejected' ? '#ffe3e3' : '#fff9db',
                          color: s.status === 'approved' ? '#2b8a3e' : s.status === 'rejected' ? '#c92a2a' : '#e67700'
                        }}>{s.status || 'pending'}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '11px', color: '#868e96' }}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {s.status !== 'approved' && (
                            <button onClick={() => handleAction(s._id, 'approve')} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #d3f9d8', background: '#d3f9d8', color: '#2b8a3e', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>Approve</button>
                          )}
                          {s.status !== 'rejected' && (
                            <button onClick={() => handleAction(s._id, 'reject')} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #ffe3e3', background: '#ffe3e3', color: '#c92a2a', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>Reject</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}