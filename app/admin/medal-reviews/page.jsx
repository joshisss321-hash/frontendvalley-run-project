'use client';

import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';

export default function MedalReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadReviews(); }, []);

  const loadReviews = async () => {
    try {
      const res = await fetch(`${API}/api/admin/medal-reviews`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setReviews(data.reviews || data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`${API}/api/medal-reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    loadReviews();
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '60px', color: '#868e96' }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Medal Reviews</h1>
        <p style={{ color: '#868e96', margin: '4px 0 0', fontSize: '14px' }}>{reviews.length} reviews</p>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e9ecef', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Name', 'Instagram', 'Review', 'Photo', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: '#495057', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e9ecef' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>No medal reviews yet</td></tr>
            ) : (
              reviews.map(r => (
                <tr key={r._id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.name || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#1971c2' }}>@{r.instaId || '—'}</td>
                  <td style={{ padding: '12px 16px', maxWidth: '220px', color: '#495057', fontSize: '12px' }}>{(r.review || '').slice(0, 80)}{(r.review || '').length > 80 ? '…' : ''}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {r.imageUrl ? <a href={r.imageUrl} target="_blank" rel="noreferrer" style={{ color: '#1971c2', fontWeight: 600, fontSize: '12px' }}>View Photo</a> : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#868e96', fontSize: '11px' }}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={() => deleteReview(r._id)} style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #ffe3e3', background: '#ffe3e3', color: '#c92a2a', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}