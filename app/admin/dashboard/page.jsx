'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab]         = useState('registrations');
  const [regs, setRegs]                   = useState([]);
  const [regsLoading, setRegsLoading]     = useState(false);
  const [regSearch, setRegSearch]         = useState('');
  const [subs, setSubs]                   = useState([]);
  const [subsLoading, setSubsLoading]     = useState(false);
  const [subStatus, setSubStatus]         = useState('pending');
  const [subCounts, setSubCounts]         = useState({ pending:0, approved:0, rejected:0 });
  const [imageModal, setImageModal]       = useState(null);
  const [view, setView]                   = useState('events');

  // ✅ Auth check — bina login ke nahi khulega
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    adminAPI.verifyToken().then(res => {
      if (!res.success) {
        localStorage.removeItem('adminToken');
        router.replace('/admin/login');
      }
    }).catch(() => {
      router.replace('/admin/login');
    });

    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const res = await adminAPI.getEvents();
      setEvents(res.events || []);
    } catch {}
    setLoading(false);
  };

  const openEvent = (ev) => {
    setSelectedEvent(ev);
    setActiveTab('registrations');
    setRegSearch('');
    setRegs([]);
    setSubs([]);
    loadRegs(ev, '');
    setView('detail');
  };

  const loadRegs = async (ev, search) => {
    setRegsLoading(true);
    try {
      const res = await adminAPI.getRegistrations({ eventId: ev._id, eventSlug: ev.slug, search });
      setRegs(res.registrations || []);
    } catch {}
    setRegsLoading(false);
  };

  const loadSubs = async (ev, status) => {
    setSubsLoading(true);
    try {
      const params = { eventSlug: ev.slug };
      if (status) params.status = status;
      const res = await adminAPI.getSubmissions(params);
      setSubs(res.submissions || []);
      setSubCounts(res.counts || { pending:0, approved:0, rejected:0 });
    } catch {}
    setSubsLoading(false);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'registrations') loadRegs(selectedEvent, regSearch);
    if (tab === 'submissions')   { setSubStatus('pending'); loadSubs(selectedEvent, 'pending'); }
  };

  const approve = async (id) => { await adminAPI.approveSubmission(id); loadSubs(selectedEvent, subStatus); };
  const reject  = async (id) => { await adminAPI.rejectSubmission(id);  loadSubs(selectedEvent, subStatus); };

  const exportExcel = async () => {
    if (!selectedEvent) return;
    try {
      const res = await adminAPI.exportRegistrations(selectedEvent.slug);
      if (!res.rows?.length) { alert('No data'); return; }
      const XLSX = await import('xlsx');
      const headers = ['Sr','Name','Email','Phone','Category','Address1','Address2','Landmark','City','State','Pincode','Amount','PaymentID','Medal Status','Date'];
      const data = res.rows.map(r => [r.sr,r.name,r.email,r.phone,r.category,r.address1,r.address2,r.landmark,r.city,r.state,r.pincode,r.amount,r.paymentId,r.medalStatus,r.date]);
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
      XLSX.writeFile(wb, `${selectedEvent.title}_registrations.xlsx`);
    } catch { alert('Export failed'); }
  };

  const totalRegs    = events.reduce((s,e) => s+(e.registrationCount||0), 0);
  const totalRevenue = events.reduce((s,e) => s+(e.registrationCount||0)*(e.price||349), 0);

  return (
    <div style={{ minHeight:'100vh', background:'#f1f5f9', fontFamily:'system-ui,-apple-system,sans-serif', paddingBottom:70 }}>

      {/* TOP NAVBAR */}
      <div style={{ background:'#dc2626', padding:'0 16px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 8px rgba(220,38,38,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {view === 'detail' && (
            <button onClick={()=>setView('events')}
              style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:8, padding:'6px 12px', color:'white', cursor:'pointer', fontSize:16, fontWeight:700 }}>
              ← Back
            </button>
          )}
          <span style={{ fontWeight:800, fontSize:view==='detail'?14:18, color:'white', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {view === 'detail' ? selectedEvent?.title : '🏃 Valley Run Admin'}
          </span>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {view === 'detail' && (
            <button onClick={exportExcel}
              style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:8, padding:'6px 12px', color:'white', fontWeight:600, fontSize:12, cursor:'pointer' }}>
              ⬇ Excel
            </button>
          )}
          <button onClick={()=>{localStorage.removeItem('adminToken');router.push('/admin/login');}}
            style={{ background:'rgba(0,0,0,0.2)', border:'none', borderRadius:8, padding:'6px 12px', color:'white', fontWeight:600, fontSize:12, cursor:'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {/* EVENTS VIEW */}
      {view === 'events' && (
        <div style={{ padding:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:16 }}>
            {[
              { label:'Total Reg', value:totalRegs, icon:'👥', color:'#3b82f6' },
              { label:'Revenue', value:`₹${Math.round(totalRevenue/1000)}K`, icon:'💰', color:'#22c55e' },
              { label:'Events', value:events.filter(e=>e.active&&!e.isPrevious).length, icon:'🔴', color:'#dc2626' },
            ].map(s => (
              <div key={s.label} style={{ background:'white', borderRadius:14, padding:'14px 10px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', borderTop:`3px solid ${s.color}` }}>
                <div style={{ fontSize:22, marginBottom:2 }}>{s.icon}</div>
                <div style={{ fontSize:18, fontWeight:800, color:'#1f2937' }}>{s.value}</div>
                <div style={{ fontSize:10, color:'#9ca3af' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:16, color:'#374151' }}>All Events</div>
            <button onClick={()=>router.push('/admin/events/create')}
              style={{ background:'#dc2626', color:'white', border:'none', borderRadius:10, padding:'9px 16px', fontWeight:700, fontSize:13, cursor:'pointer' }}>
              + New Event
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign:'center', padding:60, color:'#9ca3af' }}>Loading...</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {events.map(ev => (
                <div key={ev._id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display:'flex', padding:'14px', gap:12 }}>
                    <div style={{ width:64, height:64, borderRadius:12, overflow:'hidden', flexShrink:0, background:'#f3f4f6' }}>
                      {ev.coverImage||ev.heroImage||ev.image ? (
                        <img src={ev.coverImage||ev.heroImage||ev.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                      ) : (
                        <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>🏃</div>
                      )}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:700, fontSize:14, color:'#1f2937', lineHeight:1.3, marginBottom:4 }}>{ev.title}</div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginBottom:6 }}>{ev.dates}</div>
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                        <span style={{ fontSize:10, padding:'3px 8px', borderRadius:20, fontWeight:700,
                          background:ev.active&&!ev.isPrevious?'#dcfce7':'#f3f4f6',
                          color:ev.active&&!ev.isPrevious?'#166534':'#6b7280' }}>
                          {ev.active&&!ev.isPrevious?'● LIVE':ev.isPrevious?'● PAST':'● OFF'}
                        </span>
                        <span style={{ fontSize:10, padding:'3px 8px', borderRadius:20, fontWeight:700, background:'#dbeafe', color:'#1e40af' }}>
                          {ev.registrationCount||0} registered
                        </span>
                        <span style={{ fontSize:10, padding:'3px 8px', borderRadius:20, fontWeight:700, background:'#fef3c7', color:'#92400e' }}>
                          ₹{ev.price||349}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid #f3f4f6' }}>
                    <button onClick={()=>openEvent(ev)}
                      style={{ padding:'12px', background:'#dc2626', color:'white', border:'none', fontWeight:700, fontSize:13, cursor:'pointer', borderRadius:'0 0 0 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                      👁 View Data
                    </button>
                    <button onClick={()=>router.push(`/admin/events/edit/${ev._id}`)}
                      style={{ padding:'12px', background:'#f8fafc', color:'#374151', border:'none', fontWeight:700, fontSize:13, cursor:'pointer', borderRadius:'0 0 16px 0', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DETAIL VIEW */}
      {view === 'detail' && selectedEvent && (
        <div style={{ padding:16 }}>
          <div style={{ background:'white', borderRadius:14, padding:'14px', marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:22, fontWeight:800, color:'#dc2626' }}>{selectedEvent.registrationCount||0}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>Total Registrations</div>
              </div>
              <div>
                <div style={{ fontSize:22, fontWeight:800, color:'#f59e0b' }}>{subCounts.pending}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>Pending Proofs</div>
              </div>
              <div>
                <div style={{ fontSize:22, fontWeight:800, color:'#22c55e' }}>₹{((selectedEvent.registrationCount||0)*(selectedEvent.price||349)).toLocaleString('en-IN')}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>Revenue</div>
              </div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
            <button onClick={()=>switchTab('registrations')}
              style={{ padding:'14px 10px', borderRadius:14, border:'2px solid', fontWeight:700, fontSize:13, cursor:'pointer',
                borderColor:activeTab==='registrations'?'#dc2626':'#e5e7eb',
                background:activeTab==='registrations'?'#dc2626':'white',
                color:activeTab==='registrations'?'white':'#374151' }}>
              👥 Registrations<br/>
              <span style={{ fontSize:11, fontWeight:400, opacity:0.8 }}>{regs.length} total</span>
            </button>
            <button onClick={()=>switchTab('submissions')}
              style={{ padding:'14px 10px', borderRadius:14, border:'2px solid', fontWeight:700, fontSize:13, cursor:'pointer',
                borderColor:activeTab==='submissions'?'#dc2626':'#e5e7eb',
                background:activeTab==='submissions'?'#dc2626':'white',
                color:activeTab==='submissions'?'white':'#374151' }}>
              📸 Submissions<br/>
              <span style={{ fontSize:11, fontWeight:400, opacity:0.8 }}>{subCounts.pending} pending</span>
            </button>
          </div>

          {/* REGISTRATIONS TAB */}
          {activeTab === 'registrations' && (
            <div>
              <input value={regSearch}
                onChange={e=>{setRegSearch(e.target.value);loadRegs(selectedEvent,e.target.value);}}
                placeholder="🔍 Search name, phone, email..."
                style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:12, padding:'12px 14px', fontSize:14, outline:'none', marginBottom:12, boxSizing:'border-box', background:'white' }}/>

              {regsLoading ? (
                <div style={{ textAlign:'center', padding:40, color:'#9ca3af' }}>Loading...</div>
              ) : regs.length===0 ? (
                <div style={{ textAlign:'center', padding:40, color:'#9ca3af', background:'white', borderRadius:14 }}>No registrations found</div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {regs.map((r,i) => (
                    <div key={r._id} style={{ background:'white', borderRadius:14, padding:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                        <div>
                          <div style={{ fontWeight:700, fontSize:15, color:'#1f2937' }}>{r.user?.name||'—'}</div>
                          <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>📱 {r.user?.phone||'—'}</div>
                          <div style={{ fontSize:11, color:'#9ca3af' }}>✉️ {r.user?.email||'—'}</div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <span style={{ fontSize:12, padding:'4px 12px', borderRadius:20, fontWeight:700, background:'#dbeafe', color:'#1e40af', display:'block', marginBottom:4 }}>
                            {r.category}
                          </span>
                          <span style={{ fontSize:15, fontWeight:800, color:'#22c55e' }}>₹{r.amount||selectedEvent.price||349}</span>
                        </div>
                      </div>
                      <div style={{ fontSize:12, color:'#6b7280', padding:'8px 12px', background:'#f8fafc', borderRadius:8, marginBottom:10 }}>
                        📍 {[r.user?.address1, r.user?.city, r.user?.state, r.user?.pincode].filter(Boolean).join(', ')||'No address'}
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{ fontSize:11, color:'#9ca3af' }}>📅 {r.createdAt?.slice(0,10)}</span>
                        <select value={r.medalStatus||'pending'}
                          onChange={async e=>{await adminAPI.updateMedalStatus(r._id,{medalStatus:e.target.value});loadRegs(selectedEvent,regSearch);}}
                          style={{ fontSize:12, padding:'6px 10px', borderRadius:10, border:'1.5px solid #e5e7eb', outline:'none', cursor:'pointer', background:'white' }}>
                          <option value="pending">🟡 Pending</option>
                          <option value="verified">🔵 Verified</option>
                          <option value="dispatched">🟣 Dispatched</option>
                          <option value="delivered">🟢 Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUBMISSIONS TAB */}
          {activeTab === 'submissions' && (
            <div>
              <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
                {[
                  { v:'pending',  l:`⏳ Pending (${subCounts.pending})` },
                  { v:'approved', l:`✅ Done (${subCounts.approved})` },
                  { v:'rejected', l:`❌ Rejected (${subCounts.rejected})` },
                  { v:'',         l:'All' },
                ].map(t => (
                  <button key={t.v} onClick={()=>{setSubStatus(t.v);loadSubs(selectedEvent,t.v);}}
                    style={{ padding:'8px 14px', borderRadius:20, border:'none', fontWeight:600, fontSize:12, cursor:'pointer',
                      background:subStatus===t.v?'#dc2626':'white',
                      color:subStatus===t.v?'white':'#374151',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                    {t.l}
                  </button>
                ))}
              </div>

              {subsLoading ? (
                <div style={{ textAlign:'center', padding:40, color:'#9ca3af' }}>Loading...</div>
              ) : subs.length===0 ? (
                <div style={{ textAlign:'center', padding:40, color:'#9ca3af', background:'white', borderRadius:14 }}>No submissions</div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {subs.map(sub => (
                    <div key={sub._id} style={{ background:'white', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                      <div style={{ padding:'16px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                          <div>
                            <div style={{ fontWeight:700, fontSize:15, color:'#1f2937' }}>{sub.name}</div>
                            <div style={{ fontSize:12, color:'#6b7280' }}>📱 {sub.phone}</div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <span style={{ fontSize:12, padding:'4px 10px', borderRadius:20, fontWeight:700, background:'#dbeafe', color:'#1e40af', display:'block', marginBottom:4 }}>
                              {sub.distance?.toUpperCase()}
                            </span>
                            {sub.timing && sub.timing !== '—' && (
                              <span style={{ fontSize:14, fontWeight:800, color:'#dc2626' }}>⏱ {sub.timing}</span>
                            )}
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                          <span style={{ fontSize:11, padding:'4px 12px', borderRadius:20, fontWeight:700,
                            background:sub.status==='approved'?'#dcfce7':sub.status==='rejected'?'#fee2e2':'#fef3c7',
                            color:sub.status==='approved'?'#166534':sub.status==='rejected'?'#991b1b':'#92400e' }}>
                            {sub.status==='approved'?'✅ Approved':sub.status==='rejected'?'❌ Rejected':'⏳ Pending Verification'}
                          </span>
                          <span style={{ fontSize:11, color:'#9ca3af' }}>{sub.createdAt?.slice(0,10)}</span>
                        </div>
                        {sub.imageUrl && (
                          <button onClick={()=>setImageModal(sub.imageUrl)}
                            style={{ width:'100%', background:'#eff6ff', border:'1.5px solid #bfdbfe', borderRadius:10, padding:'10px', cursor:'pointer', color:'#1d4ed8', fontWeight:600, fontSize:13 }}>
                            🔍 View Run Screenshot
                          </button>
                        )}
                      </div>
                      {sub.status === 'pending' && (
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', borderTop:'1px solid #f3f4f6' }}>
                          <button onClick={()=>approve(sub._id)}
                            style={{ padding:'14px', background:'#22c55e', color:'white', border:'none', fontWeight:800, fontSize:15, cursor:'pointer', borderRadius:'0 0 0 16px' }}>
                            ✓ Approve
                          </button>
                          <button onClick={()=>reject(sub._id)}
                            style={{ padding:'14px', background:'#ef4444', color:'white', border:'none', fontWeight:800, fontSize:15, cursor:'pointer', borderRadius:'0 0 16px 0' }}>
                            ✗ Reject
                          </button>
                        </div>
                      )}
                      {sub.status === 'approved' && (
                        <div style={{ borderTop:'1px solid #f3f4f6', padding:'10px 16px' }}>
                          <button onClick={()=>reject(sub._id)}
                            style={{ width:'100%', background:'#fee2e2', color:'#991b1b', border:'none', borderRadius:10, padding:'8px', fontWeight:600, fontSize:12, cursor:'pointer' }}>
                            ✗ Mark as Rejected
                          </button>
                        </div>
                      )}
                      {sub.status === 'rejected' && (
                        <div style={{ borderTop:'1px solid #f3f4f6', padding:'10px 16px' }}>
                          <button onClick={()=>approve(sub._id)}
                            style={{ width:'100%', background:'#dcfce7', color:'#166534', border:'none', borderRadius:10, padding:'8px', fontWeight:600, fontSize:12, cursor:'pointer' }}>
                            ✓ Mark as Approved
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Screenshot Modal */}
      {imageModal && (
        <div onClick={()=>setImageModal(null)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:500, width:'100%', position:'relative' }}>
            <button onClick={()=>setImageModal(null)}
              style={{ position:'absolute', top:-48, right:0, background:'white', border:'none', borderRadius:10, padding:'8px 16px', fontWeight:700, fontSize:14, cursor:'pointer', color:'#374151' }}>
              ✕ Close
            </button>
            <img src={imageModal} alt="proof" style={{ width:'100%', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}/>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e5e7eb', display:'flex', zIndex:50, boxShadow:'0 -4px 12px rgba(0,0,0,0.08)' }}>
        {[
          { label:'Events', icon:'📅', action:()=>setView('events'), active:view==='events' },
          { label:'New Event', icon:'➕', action:()=>router.push('/admin/events/create'), active:false },
          { label:'All Subs', icon:'📸', action:()=>router.push('/admin/submissions'), active:false },
          { label:'Edit Events', icon:'✏️', action:()=>router.push('/admin/events'), active:false },
        ].map(item => (
          <button key={item.label} onClick={item.action}
            style={{ flex:1, padding:'10px 4px', background:item.active?'#fff5f5':'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, borderTop:item.active?'2px solid #dc2626':'2px solid transparent' }}>
            <span style={{ fontSize:22 }}>{item.icon}</span>
            <span style={{ fontSize:10, color:item.active?'#dc2626':'#6b7280', fontWeight:600 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}