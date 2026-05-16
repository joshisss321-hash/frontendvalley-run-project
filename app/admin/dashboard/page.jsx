'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats]   = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected event for drill-down
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('registrations'); // registrations | submissions

  // Registrations
  const [regs, setRegs]         = useState([]);
  const [regsLoading, setRegsLoading] = useState(false);
  const [regSearch, setRegSearch] = useState('');

  // Submissions
  const [subs, setSubsData]     = useState([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subStatus, setSubStatus] = useState('pending');
  const [imageModal, setImageModal] = useState(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [statsRes, eventsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getEvents(),
      ]);
      if (statsRes.success)  setStats(statsRes.stats);
      if (eventsRes.success) setEvents(eventsRes.events || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  // Open event drill-down
  const openEvent = async (ev) => {
    setSelectedEvent(ev);
    setActiveTab('registrations');
    loadRegs(ev.slug, '');
  };

  const loadRegs = async (slug, search) => {
    setRegsLoading(true);
    try {
      const res = await adminAPI.getRegistrations({ eventSlug: slug, search });
      setRegs(res.registrations || []);
    } catch {} finally { setRegsLoading(false); }
  };

  const loadSubs = async (slug, status) => {
    setSubsLoading(true);
    try {
      const res = await adminAPI.getSubmissions({ eventSlug: slug, status });
      setSubsData(res.submissions || []);
    } catch {} finally { setSubsLoading(false); }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'registrations') loadRegs(selectedEvent.slug, regSearch);
    if (tab === 'submissions')   loadSubs(selectedEvent.slug, subStatus);
  };

  const approve = async (id) => {
    await adminAPI.approveSubmission(id);
    loadSubs(selectedEvent.slug, subStatus);
  };
  const reject = async (id) => {
    await adminAPI.rejectSubmission(id);
    loadSubs(selectedEvent.slug, subStatus);
  };

  // Export Excel
  const exportExcel = async () => {
    if (!selectedEvent) return;
    try {
      const res = await adminAPI.exportRegistrations(selectedEvent.slug);
      if (!res.rows?.length) { alert('No data'); return; }
      const XLSX = await import('xlsx');
      const headers = ['Sr','Name','Email','Phone','Category','Address1','Address2','Landmark','City','State','Pincode','Amount','PaymentID','Medal Status','Date'];
      const data = res.rows.map(r => [r.sr,r.name,r.email,r.phone,r.category,r.address1,r.address2,r.landmark,r.city,r.state,r.pincode,r.amount,r.paymentId,r.medalStatus,r.date]);
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      ws['!cols'] = [6,22,28,14,14,24,20,18,14,14,10,10,22,14,14].map(w=>({wch:w}));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
      XLSX.writeFile(wb, `${selectedEvent.title}_registrations.xlsx`);
    } catch { alert('Export failed'); }
  };

  const s = (v) => ({
    page: { minHeight:'100vh', background:'#f8f9fa', fontFamily:'system-ui,-apple-system,sans-serif' },
    header: { background:'white', borderBottom:'1px solid #e9ecef', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 },
    logo: { fontWeight:800, fontSize:18, color:'#dc2626' },
    main: { maxWidth:1200, margin:'0 auto', padding:'24px' },
    grid4: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 },
    grid2: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:24 },
    card: { background:'white', borderRadius:12, border:'1px solid #e9ecef', overflow:'hidden' },
    cardHead: { padding:'14px 20px', borderBottom:'1px solid #f1f3f5', display:'flex', alignItems:'center', justifyContent:'space-between' },
    cardTitle: { fontWeight:700, fontSize:14, color:'#1a1a2e' },
    stat: (color) => ({ background:'white', borderRadius:12, padding:'20px', border:'1px solid #e9ecef', borderTop:`4px solid ${color}` }),
    statLabel: { fontSize:11, color:'#868e96', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:6 },
    statVal: { fontSize:30, fontWeight:800, color:'#1a1a2e' },
    btn: (bg,color='white') => ({ background:bg, color, border:'none', borderRadius:8, padding:'8px 16px', fontWeight:600, fontSize:13, cursor:'pointer' }),
    btnSm: (bg,color='white') => ({ background:bg, color, border:'none', borderRadius:6, padding:'4px 10px', fontWeight:600, fontSize:11, cursor:'pointer' }),
    input: { border:'1px solid #dee2e6', borderRadius:8, padding:'8px 12px', fontSize:13, outline:'none', width:'100%' },
    tab: (active) => ({ padding:'8px 16px', borderRadius:8, border:'none', fontWeight:600, fontSize:13, cursor:'pointer', background: active ? '#dc2626' : '#f1f3f5', color: active ? 'white' : '#495057' }),
    badge: (color,bg) => ({ fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700, background:bg, color }),
    table: { width:'100%', borderCollapse:'collapse', fontSize:13 },
    th: { padding:'10px 12px', textAlign:'left', background:'#f8f9fa', color:'#868e96', fontWeight:600, fontSize:11, textTransform:'uppercase', borderBottom:'1px solid #e9ecef' },
    td: { padding:'10px 12px', borderBottom:'1px solid #f8f9fa', color:'#1a1a2e', verticalAlign:'middle' },
    evCard: (selected) => ({ padding:'14px 20px', borderBottom:'1px solid #f1f3f5', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', background: selected ? '#fff5f5' : 'white', transition:'background 0.15s' }),
  });

  if (loading) return <div style={{textAlign:'center',padding:80,color:'#868e96'}}>Loading...</div>;

  const totalRevenue = events.reduce((sum, ev) => sum + (ev.registrationCount || 0) * (ev.price || 349), 0);

  return (
    <div style={s().page}>

      {/* ── Header ── */}
      <div style={s().header}>
        <div style={s().logo}>🏃 Valley Run Admin</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:13,color:'#868e96'}}>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
          <button onClick={()=>{localStorage.removeItem('adminToken');router.push('/admin/login');}} style={s().btn('#fee2e2','#dc2626')}>Logout</button>
        </div>
      </div>

      <div style={s().main}>

        {/* ── Stats row ── */}
        <div style={s().grid4}>
          <div style={s().stat('#1971c2')}>
            <div style={s().statLabel}>Total Registrations</div>
            <div style={s().statVal}>{events.reduce((s,e)=>s+(e.registrationCount||0),0)}</div>
          </div>
          <div style={s().stat('#2f9e44')}>
            <div style={s().statLabel}>Total Revenue</div>
            <div style={s().statVal}>₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div style={s().stat('#f08c00')}>
            <div style={s().statLabel}>Active Events</div>
            <div style={s().statVal}>{events.filter(e=>e.active&&!e.isPrevious).length}</div>
          </div>
          <div style={s().stat('#9c36b5')}>
            <div style={s().statLabel}>Total Events</div>
            <div style={s().statVal}>{events.length}</div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns: selectedEvent ? '340px 1fr' : '1fr',gap:20}}>

          {/* ── Events list ── */}
          <div style={s().card}>
            <div style={s().cardHead}>
              <span style={s().cardTitle}>Events</span>
              <button onClick={()=>router.push('/admin/events/create')} style={s().btn('#dc2626')}>+ New Event</button>
            </div>

            {events.length === 0 ? (
              <div style={{padding:32,textAlign:'center',color:'#868e96'}}>No events</div>
            ) : events.map(ev => (
              <div key={ev._id} style={s().evCard(selectedEvent?._id === ev._id)} onClick={()=>openEvent(ev)}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13,color:'#1a1a2e',marginBottom:3}}>{ev.title}</div>
                  <div style={{fontSize:11,color:'#868e96'}}>{ev.dates} · ₹{ev.price}</div>
                  <div style={{display:'flex',gap:6,marginTop:6,flexWrap:'wrap'}}>
                    <span style={s().badge(ev.active&&!ev.isPrevious?'#2b8a3e':'#868e96', ev.active&&!ev.isPrevious?'#d3f9d8':'#f1f3f5')}>
                      {ev.active && !ev.isPrevious ? '● LIVE' : ev.isPrevious ? '● PAST' : '● OFF'}
                    </span>
                    <span style={s().badge('#1971c2','#e7f5ff')}>{ev.registrationCount || 0} registered</span>
                  </div>
                </div>
                <div style={{display:'flex',gap:6,flexShrink:0,marginLeft:8}}>
                  <button onClick={e=>{e.stopPropagation();router.push(`/admin/events/edit/${ev._id}`);}} style={s().btnSm('#e7f5ff','#1971c2')}>Edit</button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Event Detail Panel ── */}
          {selectedEvent && (
            <div style={s().card}>
              <div style={s().cardHead}>
                <div>
                  <div style={s().cardTitle}>{selectedEvent.title}</div>
                  <div style={{fontSize:12,color:'#868e96',marginTop:2}}>{selectedEvent.dates} · {selectedEvent.registrationCount || 0} registrations</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={exportExcel} style={s().btn('#2f9e44')}>⬇ Excel</button>
                  <button onClick={()=>setSelectedEvent(null)} style={s().btn('#f1f3f5','#495057')}>✕</button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{padding:'12px 20px',borderBottom:'1px solid #f1f3f5',display:'flex',gap:8}}>
                <button style={s().tab(activeTab==='registrations')} onClick={()=>switchTab('registrations')}>
                  👥 Registrations ({regs.length})
                </button>
                <button style={s().tab(activeTab==='submissions')} onClick={()=>switchTab('submissions')}>
                  📸 Submissions
                </button>
              </div>

              {/* ── REGISTRATIONS TAB ── */}
              {activeTab === 'registrations' && (
                <div>
                  <div style={{padding:'12px 20px',borderBottom:'1px solid #f1f3f5'}}>
                    <input
                      value={regSearch}
                      onChange={e=>{setRegSearch(e.target.value);loadRegs(selectedEvent.slug,e.target.value);}}
                      placeholder="Search name, phone, email..."
                      style={s().input}
                    />
                  </div>

                  {regsLoading ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>Loading...</div>
                  ) : regs.length === 0 ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>No registrations found</div>
                  ) : (
                    <div style={{overflowX:'auto'}}>
                      <table style={s().table}>
                        <thead>
                          <tr>
                            {['#','Name','Phone','Category','City / State','Amount','Medal','Date'].map(h=>(
                              <th key={h} style={s().th}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {regs.map((r,i)=>(
                            <tr key={r._id} style={{background: i%2?'#fafafa':'white'}}>
                              <td style={s().td}><span style={{color:'#868e96'}}>{i+1}</span></td>
                              <td style={s().td}>
                                <div style={{fontWeight:600}}>{r.user?.name||'—'}</div>
                                <div style={{fontSize:11,color:'#868e96'}}>{r.user?.email}</div>
                              </td>
                              <td style={s().td}><span style={{fontSize:12}}>{r.user?.phone||'—'}</span></td>
                              <td style={s().td}><span style={s().badge('#1971c2','#e7f5ff')}>{r.category}</span></td>
                              <td style={s().td}><span style={{fontSize:12,color:'#495057'}}>{[r.user?.city,r.user?.state].filter(Boolean).join(', ')||'—'}</span></td>
                              <td style={s().td}><span style={{fontWeight:700,color:'#2f9e44'}}>₹{r.amount||selectedEvent.price||349}</span></td>
                              <td style={s().td}>
                                <select
                                  value={r.medalStatus||'pending'}
                                  onChange={async e=>{
                                    await adminAPI.updateMedalStatus(r._id,{medalStatus:e.target.value});
                                    loadRegs(selectedEvent.slug,regSearch);
                                  }}
                                  style={{fontSize:11,padding:'3px 6px',borderRadius:6,border:'1px solid #dee2e6',outline:'none'}}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="verified">Verified</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                              </td>
                              <td style={s().td}><span style={{fontSize:11,color:'#868e96'}}>{r.createdAt?.slice(0,10)}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ── SUBMISSIONS TAB ── */}
              {activeTab === 'submissions' && (
                <div>
                  <div style={{padding:'12px 20px',borderBottom:'1px solid #f1f3f5',display:'flex',gap:8}}>
                    {['pending','approved','rejected',''].map((st,i)=>(
                      <button key={i} style={s().tab(subStatus===st)} onClick={()=>{setSubStatus(st);loadSubs(selectedEvent.slug,st);}}>
                        {st==='pending'?'⏳ Pending':st==='approved'?'✅ Approved':st==='rejected'?'❌ Rejected':'All'}
                      </button>
                    ))}
                  </div>

                  {subsLoading ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>Loading...</div>
                  ) : subs.length === 0 ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>No submissions</div>
                  ) : (
                    <div style={{overflowX:'auto'}}>
                      <table style={s().table}>
                        <thead>
                          <tr>
                            {['Name','Distance','Timing','Status','Screenshot','Date','Actions'].map(h=>(
                              <th key={h} style={s().th}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {subs.map((sub,i)=>(
                            <tr key={sub._id} style={{background:i%2?'#fafafa':'white'}}>
                              <td style={s().td}>
                                <div style={{fontWeight:600}}>{sub.name}</div>
                                <div style={{fontSize:11,color:'#868e96'}}>{sub.phone}</div>
                              </td>
                              <td style={s().td}><span style={s().badge('#1971c2','#e7f5ff')}>{sub.distance}</span></td>
                              <td style={s().td}><span style={{fontWeight:700,color:'#dc2626'}}>{sub.timing||'—'}</span></td>
                              <td style={s().td}>
                                <span style={s().badge(
                                  sub.status==='approved'?'#2b8a3e':sub.status==='rejected'?'#c92a2a':'#b45309',
                                  sub.status==='approved'?'#d3f9d8':sub.status==='rejected'?'#ffe3e3':'#fff9db'
                                )}>
                                  {sub.status}
                                </span>
                              </td>
                              <td style={s().td}>
                                {sub.imageUrl ? (
                                  <button onClick={()=>setImageModal(sub.imageUrl)} style={s().btnSm('#e7f5ff','#1971c2')}>
                                    View 🔍
                                  </button>
                                ) : '—'}
                              </td>
                              <td style={s().td}><span style={{fontSize:11,color:'#868e96'}}>{sub.createdAt?.slice(0,10)}</span></td>
                              <td style={s().td}>
                                <div style={{display:'flex',gap:4}}>
                                  {sub.status!=='approved' && (
                                    <button onClick={()=>approve(sub._id)} style={s().btnSm('#d3f9d8','#2b8a3e')}>✓</button>
                                  )}
                                  {sub.status!=='rejected' && (
                                    <button onClick={()=>reject(sub._id)} style={s().btnSm('#ffe3e3','#c92a2a')}>✗</button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Image Modal */}
      {imageModal && (
        <div onClick={()=>setImageModal(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:600,width:'100%'}}>
            <button onClick={()=>setImageModal(null)} style={{position:'absolute',top:-40,right:0,background:'none',border:'none',color:'white',fontSize:28,cursor:'pointer'}}>✕</button>
            <img src={imageModal} alt="proof" style={{width:'100%',borderRadius:12}}/>
          </div>
        </div>
      )}

    </div>
  );
}
