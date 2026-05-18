'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
const authH = () => ({ Authorization: `Bearer ${getToken()}` });

export default function AdminReviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [form, setForm]       = useState({ name:'', review:'', rating:5 });
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { router.replace('/admin/login'); return; }
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/api/admin/reviews`, { headers: authH() });
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {}
    setLoading(false);
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.review || !file) {
      setError('Name, review and photo are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('name',   form.name);
      fd.append('review', form.review);
      fd.append('rating', form.rating);
      fd.append('image',  file);

      const res  = await fetch(`${API}/api/admin/reviews`, { method:'POST', headers: authH(), body: fd });
      const data = await res.json();
      if (data.success) {
        setForm({ name:'', review:'', rating:5 });
        setFile(null);
        setPreview(null);
        setAdding(false);
        loadReviews();
      } else {
        setError(data.message || 'Failed to save');
      }
    } catch {
      setError('Server error');
    }
    setSaving(false);
  };

  const toggleActive = async (id) => {
    await fetch(`${API}/api/admin/reviews/${id}/toggle`, { method:'PATCH', headers: authH() });
    loadReviews();
  };

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`${API}/api/admin/reviews/${id}`, { method:'DELETE', headers: authH() });
    loadReviews();
  };

  return (
    <div style={{ minHeight:'100vh', background:'#f1f5f9', fontFamily:'system-ui,-apple-system,sans-serif', paddingBottom:40 }}>

      {/* Navbar */}
      <div style={{ background:'#dc2626', padding:'0 20px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 8px rgba(220,38,38,.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={()=>router.push('/admin/dashboard')}
            style={{ background:'rgba(255,255,255,.2)', border:'none', borderRadius:8, padding:'6px 12px', color:'white', cursor:'pointer', fontWeight:700, fontSize:13 }}>
            ← Back
          </button>
          <span style={{ fontWeight:800, fontSize:16, color:'white' }}>⭐ Reviews Manager</span>
        </div>
        <button onClick={()=>setAdding(true)}
          style={{ background:'white', color:'#dc2626', border:'none', borderRadius:10, padding:'8px 16px', fontWeight:700, fontSize:13, cursor:'pointer' }}>
          + Add Review
        </button>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:20 }}>

        {/* Add Review Modal */}
        {adding && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
            <div style={{ background:'white', borderRadius:20, padding:28, width:'100%', maxWidth:480, maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <span style={{ fontSize:18, fontWeight:800 }}>Add New Review</span>
                <button onClick={()=>{setAdding(false);setError('');}} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#888' }}>×</button>
              </div>

              {error && <div style={{ background:'#fee2e2', color:'#991b1b', padding:'10px 14px', borderRadius:10, marginBottom:16, fontSize:13 }}>{error}</div>}

              {/* Photo upload */}
              <label style={{ display:'block', marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#374151', marginBottom:8, textTransform:'uppercase', letterSpacing:.5 }}>Runner Photo *</div>
                <div style={{ border:'2px dashed #e5e7eb', borderRadius:14, padding:20, textAlign:'center', cursor:'pointer', background:'#f9fafb', transition:'border-color .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='#dc2626'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='#e5e7eb'}>
                  {preview ? (
                    <img src={preview} alt="preview" style={{ height:120, width:120, objectFit:'cover', borderRadius:'50%', margin:'0 auto', display:'block' }}/>
                  ) : (
                    <>
                      <div style={{ fontSize:32, marginBottom:8 }}>📸</div>
                      <div style={{ fontSize:13, color:'#9ca3af' }}>Click to upload runner photo</div>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }}/>
                </div>
              </label>

              {/* Name */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'#374151', display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:.5 }}>Runner Name *</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  placeholder="e.g. Rahul Sharma"
                  style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e5e7eb', borderRadius:12, fontSize:14, outline:'none', fontFamily:'inherit' }}
                  onFocus={e=>e.target.style.borderColor='#dc2626'}
                  onBlur={e=>e.target.style.borderColor='#e5e7eb'}/>
              </div>

              {/* Review */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'#374151', display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:.5 }}>Review Text *</label>
                <textarea value={form.review} onChange={e=>setForm(f=>({...f,review:e.target.value}))}
                  placeholder="Write their review here..."
                  rows={4}
                  style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e5e7eb', borderRadius:12, fontSize:14, outline:'none', fontFamily:'inherit', resize:'vertical' }}
                  onFocus={e=>e.target.style.borderColor='#dc2626'}
                  onBlur={e=>e.target.style.borderColor='#e5e7eb'}/>
              </div>

              {/* Rating */}
              <div style={{ marginBottom:24 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'#374151', display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:.5 }}>Rating</label>
                <div style={{ display:'flex', gap:8 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={()=>setForm(f=>({...f,rating:n}))}
                      style={{ fontSize:24, background:'none', border:'none', cursor:'pointer', opacity:n<=form.rating?1:.25, transition:'opacity .15s' }}>
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={()=>{setAdding(false);setError('');}}
                  style={{ flex:1, padding:'12px', border:'1.5px solid #e5e7eb', borderRadius:12, background:'transparent', color:'#374151', fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={saving}
                  style={{ flex:2, padding:'12px', border:'none', borderRadius:12, background:saving?'#f87171':'#dc2626', color:'white', fontWeight:700, fontSize:14, cursor:saving?'not-allowed':'pointer', fontFamily:'inherit' }}>
                  {saving ? 'Uploading...' : 'Save Review ✓'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#9ca3af' }}>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign:'center', padding:60, background:'white', borderRadius:20, marginTop:20 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>⭐</div>
            <div style={{ fontWeight:700, fontSize:18, color:'#1f2937', marginBottom:8 }}>No reviews yet</div>
            <div style={{ color:'#9ca3af', fontSize:14 }}>Click "+ Add Review" to add your first review</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop:8 }}>
            <div style={{ fontSize:13, color:'#6b7280', marginBottom:4 }}>{reviews.length} reviews total</div>
            {reviews.map(r => (
              <div key={r._id} style={{ background:'white', borderRadius:16, padding:18, display:'flex', gap:16, alignItems:'flex-start', boxShadow:'0 2px 8px rgba(0,0,0,.05)', opacity:r.active?1:.55, border:`1px solid ${r.active?'#e5e7eb':'#f3f4f6'}` }}>
                {/* Photo */}
                <img src={r.imageUrl} alt={r.name} style={{ width:60, height:60, borderRadius:'50%', objectFit:'cover', flexShrink:0, border:'2px solid #f3f4f6' }}/>

                {/* Content */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6, flexWrap:'wrap', gap:8 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, color:'#1f2937' }}>{r.name}</div>
                      <div style={{ display:'flex', gap:2, marginTop:2 }}>
                        {Array(r.rating||5).fill(0).map((_,i)=><span key={i} style={{color:'#f59e0b',fontSize:13}}>★</span>)}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                      {/* Toggle */}
                      <button onClick={()=>toggleActive(r._id)}
                        style={{ padding:'6px 14px', borderRadius:20, border:'none', fontWeight:600, fontSize:12, cursor:'pointer',
                          background:r.active?'#dcfce7':'#f3f4f6',
                          color:r.active?'#166534':'#6b7280' }}>
                        {r.active ? '✓ Live' : '○ Hidden'}
                      </button>
                      {/* Delete */}
                      <button onClick={()=>deleteReview(r._id)}
                        style={{ padding:'6px 12px', borderRadius:20, border:'none', fontWeight:600, fontSize:12, cursor:'pointer', background:'#fee2e2', color:'#991b1b' }}>
                        🗑
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:'#6b7280', lineHeight:1.7, fontStyle:'italic' }}>"{r.review}"</p>
                  <div style={{ fontSize:11, color:'#9ca3af', marginTop:6 }}>
                    Added: {new Date(r.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}