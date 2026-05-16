'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats]   = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('registrations');

  const [regs, setRegs]             = useState([]);
  const [regsLoading, setRegsLoading] = useState(false);
  const [regSearch, setRegSearch]   = useState('');

  const [subs, setSubsData]           = useState([]);
  const [subsLoading, setSubsLoading] = useState(false);
  const [subStatus, setSubStatus]     = useState('pending');
  const [subCounts, setSubCounts]     = useState({ pending:0, approved:0, rejected:0 });
  const [imageModal, setImageModal]   = useState(null);

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

  const openEvent = (ev) => {
    setSelectedEvent(ev);
    setActiveTab('registrations');
    setRegSearch('');
    setSubStatus('pending');
    setRegs([]);
    setSubsData([]);
    loadRegs(ev, '');
  };

  // ✅ FIX: eventId se bhi dhundho — purani registrations bhi aayengi
  const loadRegs = async (ev, search) => {
    setRegsLoading(true);
    try {
      const res = await adminAPI.getRegistrations({
        eventId:   ev._id,
        eventSlug: ev.slug,
        search:    search || '',
      });
      setRegs(res.registrations || []);
    } catch (e) { console.error(e); }
    finally { setRegsLoading(false); }
  };

  const loadSubs = async (ev, status) => {
    setSubsLoading(true);
    try {
      const params = { eventSlug: ev.slug };
      if (status) params.status = status;
      const res = await adminAPI.getSubmissions(params);
      setSubsData(res.submissions || []);
      setSubCounts(res.counts || { pending:0, approved:0, rejected:0 });
    } catch (e) { console.error(e); }
    finally { setSubsLoading(false); }
  };

  // ✅ FIX: switchTab properly loads data
  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'registrations') loadRegs(selectedEvent, regSearch);
    if (tab === 'submissions')   { setSubStatus('pending'); loadSubs(selectedEvent, 'pending'); }
  };

  const changeSubStatus = (st) => {
    setSubStatus(st);
    loadSubs(selectedEvent, st);
  };

  const approve = async (id) => { await adminAPI.approveSubmission(id); loadSubs(selectedEvent, subStatus); };
  const reject  = async (id) => { await adminAPI.rejectSubmission(id);  loadSubs(selectedEvent, subStatus); };

  const exportExcel = async () => {
    if (!selectedEvent) return;
    try {
      const res = await adminAPI.exportRegistrations(selectedEvent.slug);
      if (!res.rows?.length) { alert('No data to export'); return; }
      const XLSX = await import('xlsx');
      const headers = ['Sr','Name','Email','Phone','Category','Address1','Address2','Landmark','City','State','Pincode','Amount','PaymentID','Medal Status','Date'];
      const data = res.rows.map(r => [r.sr,r.name,r.email,r.phone,r.category,r.address1,r.address2,r.landmark,r.city,r.state,r.pincode,r.amount,r.paymentId,r.medalStatus,r.date]);
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      ws['!cols'] = [6,22,28,14,14,24,20,18,14,14,10,10,22,14,14].map(w=>({wch:w}));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
      XLSX.writeFile(wb, `${selectedEvent.title}_registrations.xlsx`);
    } catch (err) { console.error(err); alert('Export failed'); }
  };

  if (loading) return <div style={{textAlign:'center',padding:80,color:'#868e96',fontFamily:'system-ui'}}>Loading...</div>;

  const totalRegs    = events.reduce((s,e) => s+(e.registrationCount||0), 0);
  const totalRevenue = events.reduce((s,e) => s+(e.registrationCount||0)*(e.price||349), 0);

  const S = {
    page:  { minHeight:'100vh', background:'#f8f9fa', fontFamily:'system-ui,-apple-system,sans-serif' },
    hdr:   { background:'white', borderBottom:'1px solid #e9ecef', padding:'0 24px', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 },
    main:  { maxWidth:1300, margin:'0 auto', padding:'24px' },
    card:  { background:'white', borderRadius:12, border:'1px solid #e9ecef', overflow:'hidden' },
    cardH: { padding:'14px 20px', borderBottom:'1px solid #f1f3f5', display:'flex', alignItems:'center', justifyContent:'space-between' },
    stat:  (c) => ({ background:'white', borderRadius:12, padding:'20px', border:'1px solid #e9ecef', borderTop:`4px solid ${c}` }),
    btn:   (bg,col='white') => ({ background:bg, color:col, border:'none', borderRadius:8, padding:'7px 14px', fontWeight:600, fontSize:13, cursor:'pointer' }),
    btnSm: (bg,col='white') => ({ background:bg, color:col, border:'none', borderRadius:6, padding:'3px 8px', fontWeight:600, fontSize:11, cursor:'pointer' }),
    inp:   { border:'1px solid #dee2e6', borderRadius:8, padding:'8px 12px', fontSize:13, outline:'none', width:'100%', boxSizing:'border-box' },
    tab:   (a) => ({ padding:'8px 14px', borderRadius:8, border:'none', fontWeight:600, fontSize:13, cursor:'pointer', background:a?'#dc2626':'#f1f3f5', color:a?'white':'#495057' }),
    stab:  (a) => ({ padding:'5px 12px', borderRadius:20, border:'none', fontWeight:600, fontSize:12, cursor:'pointer', background:a?'#dc2626':'#f1f3f5', color:a?'white':'#495057' }),
    th:    { padding:'10px 12px', textAlign:'left', background:'#f8f9fa', color:'#868e96', fontWeight:600, fontSize:11, textTransform:'uppercase', borderBottom:'1px solid #e9ecef' },
    td:    { padding:'9px 12px', borderBottom:'1px solid #f8f9fa', color:'#1a1a2e', verticalAlign:'middle' },
    evRow: (sel) => ({ padding:'12px 16px', borderBottom:'1px solid #f1f3f5', cursor:'pointer', background:sel?'#fff5f5':'white' }),
    badge: (col,bg) => ({ fontSize:10, padding:'2px 7px', borderRadius:20, fontWeight:700, background:bg, color:col }),
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.hdr}>
        <div style={{fontWeight:800,fontSize:18,color:'#dc2626'}}>🏃 Valley Run Admin</div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:13,color:'#868e96'}}>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
          <button onClick={()=>{localStorage.removeItem('adminToken');router.push('/admin/login');}} style={S.btn('#fee2e2','#dc2626')}>Logout</button>
        </div>
      </div>

      <div style={S.main}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
          {[
            {l:'Total Registrations', v:totalRegs,    c:'#1971c2'},
            {l:'Total Revenue',       v:`₹${totalRevenue.toLocaleString('en-IN')}`, c:'#2f9e44'},
            {l:'Active Events',       v:events.filter(e=>e.active&&!e.isPrevious).length, c:'#f08c00'},
            {l:'Total Events',        v:events.length, c:'#9c36b5'},
          ].map(s=>(
            <div key={s.l} style={S.stat(s.c)}>
              <div style={{fontSize:11,color:'#868e96',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>{s.l}</div>
              <div style={{fontSize:28,fontWeight:800,color:'#1a1a2e'}}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:selectedEvent?'300px 1fr':'1fr',gap:20}}>

          {/* Events */}
          <div style={S.card}>
            <div style={S.cardH}>
              <span style={{fontWeight:700,fontSize:14}}>Events</span>
              <button onClick={()=>router.push('/admin/events/create')} style={S.btn('#dc2626')}>+ New</button>
            </div>
            {events.map(ev=>(
              <div key={ev._id} style={S.evRow(selectedEvent?._id===ev._id)} onClick={()=>openEvent(ev)}>
                <div style={{fontWeight:700,fontSize:13,color:'#1a1a2e',marginBottom:3,lineHeight:1.3}}>{ev.title}</div>
                <div style={{fontSize:11,color:'#868e96',marginBottom:6}}>{ev.dates} · ₹{ev.price}</div>
                <div style={{display:'flex',gap:5,alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{display:'flex',gap:4}}>
                    <span style={S.badge(ev.active&&!ev.isPrevious?'#2b8a3e':'#868e96',ev.active&&!ev.isPrevious?'#d3f9d8':'#f1f3f5')}>
                      {ev.active&&!ev.isPrevious?'● LIVE':ev.isPrevious?'● PAST':'● OFF'}
                    </span>
                    <span style={S.badge('#1971c2','#e7f5ff')}>{ev.registrationCount||0} reg</span>
                  </div>
                  <button onClick={e=>{e.stopPropagation();router.push(`/admin/events/edit/${ev._id}`);}} style={S.btnSm('#e7f5ff','#1971c2')}>Edit</button>
                </div>
              </div>
            ))}
          </div>

          {/* Event detail */}
          {selectedEvent && (
            <div style={S.card}>
              <div style={S.cardH}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{selectedEvent.title}</div>
                  <div style={{fontSize:12,color:'#868e96',marginTop:2}}>{selectedEvent.dates} · {selectedEvent.registrationCount||0} registrations</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={exportExcel} style={S.btn('#2f9e44')}>⬇ Excel</button>
                  <button onClick={()=>{setSelectedEvent(null);setRegs([]);setSubsData([]);}} style={S.btn('#f1f3f5','#495057')}>✕</button>
                </div>
              </div>

              {/* Main tabs */}
              <div style={{padding:'10px 16px',borderBottom:'1px solid #f1f3f5',display:'flex',gap:8}}>
                <button style={S.tab(activeTab==='registrations')} onClick={()=>switchTab('registrations')}>
                  👥 Registrations ({regs.length})
                </button>
                <button style={S.tab(activeTab==='submissions')} onClick={()=>switchTab('submissions')}>
                  📸 Submissions ({subCounts.pending} pending)
                </button>
              </div>

              {/* Registrations tab */}
              {activeTab==='registrations' && (
                <div>
                  <div style={{padding:'10px 16px',borderBottom:'1px solid #f1f3f5'}}>
                    <input value={regSearch}
                      onChange={e=>{setRegSearch(e.target.value);loadRegs(selectedEvent,e.target.value);}}
                      placeholder="Search name, phone, email..." style={S.inp}/>
                  </div>
                  {regsLoading ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>Loading...</div>
                  ) : regs.length===0 ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>No registrations found</div>
                  ) : (
                    <div style={{overflowX:'auto'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                        <thead><tr>{['#','Name','Phone','Category','City','Amount','Medal','Date'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                        <tbody>
                          {regs.map((r,i)=>(
                            <tr key={r._id} style={{background:i%2?'#fafafa':'white'}}>
                              <td style={S.td}><span style={{color:'#868e96',fontSize:11}}>{i+1}</span></td>
                              <td style={S.td}>
                                <div style={{fontWeight:600}}>{r.user?.name||'—'}</div>
                                <div style={{fontSize:11,color:'#868e96'}}>{r.user?.email}</div>
                              </td>
                              <td style={S.td}><span style={{fontSize:12}}>{r.user?.phone||'—'}</span></td>
                              <td style={S.td}><span style={{fontSize:11,padding:'2px 8px',borderRadius:20,background:'#e7f5ff',color:'#1971c2',fontWeight:700}}>{r.category}</span></td>
                              <td style={S.td}><span style={{fontSize:12,color:'#495057'}}>{[r.user?.city,r.user?.state].filter(Boolean).join(', ')||'—'}</span></td>
                              <td style={S.td}><span style={{fontWeight:700,color:'#2f9e44'}}>₹{r.amount||selectedEvent.price||349}</span></td>
                              <td style={S.td}>
                                <select value={r.medalStatus||'pending'}
                                  onChange={async e=>{await adminAPI.updateMedalStatus(r._id,{medalStatus:e.target.value});loadRegs(selectedEvent,regSearch);}}
                                  style={{fontSize:11,padding:'3px 6px',borderRadius:6,border:'1px solid #dee2e6',outline:'none',cursor:'pointer'}}>
                                  <option value="pending">Pending</option>
                                  <option value="verified">Verified</option>
                                  <option value="dispatched">Dispatched</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                              </td>
                              <td style={S.td}><span style={{fontSize:11,color:'#868e96'}}>{r.createdAt?.slice(0,10)}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Submissions tab */}
              {activeTab==='submissions' && (
                <div>
                  <div style={{padding:'10px 16px',borderBottom:'1px solid #f1f3f5',display:'flex',gap:6,flexWrap:'wrap'}}>
                    {[
                      {v:'pending',  l:`⏳ Pending (${subCounts.pending})`},
                      {v:'approved', l:`✅ Approved (${subCounts.approved})`},
                      {v:'rejected', l:`❌ Rejected (${subCounts.rejected})`},
                      {v:'',         l:'All'},
                    ].map(t=>(
                      <button key={t.v} style={S.stab(subStatus===t.v)} onClick={()=>changeSubStatus(t.v)}>{t.l}</button>
                    ))}
                  </div>
                  {subsLoading ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>Loading...</div>
                  ) : subs.length===0 ? (
                    <div style={{textAlign:'center',padding:40,color:'#868e96'}}>No submissions found</div>
                  ) : (
                    <div style={{overflowX:'auto'}}>
                      <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                        <thead><tr>{['Name','Distance','Timing','Status','Screenshot','Date','Action'].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                        <tbody>
                          {subs.map((sub,i)=>(
                            <tr key={sub._id} style={{background:i%2?'#fafafa':'white'}}>
                              <td style={S.td}>
                                <div style={{fontWeight:600}}>{sub.name}</div>
                                <div style={{fontSize:11,color:'#868e96'}}>{sub.phone}</div>
                              </td>
                              <td style={S.td}><span style={{fontSize:11,padding:'2px 8px',borderRadius:20,background:'#e7f5ff',color:'#1971c2',fontWeight:700}}>{sub.distance?.toUpperCase()}</span></td>
                              <td style={S.td}><span style={{fontWeight:700,color:'#dc2626'}}>{sub.timing||'—'}</span></td>
                              <td style={S.td}>
                                <span style={{fontSize:11,padding:'2px 8px',borderRadius:20,fontWeight:700,
                                  background:sub.status==='approved'?'#d3f9d8':sub.status==='rejected'?'#ffe3e3':'#fff9db',
                                  color:sub.status==='approved'?'#2b8a3e':sub.status==='rejected'?'#c92a2a':'#b45309'}}>
                                  {sub.status}
                                </span>
                              </td>
                              <td style={S.td}>{sub.imageUrl?<button onClick={()=>setImageModal(sub.imageUrl)} style={S.btnSm('#e7f5ff','#1971c2')}>View 🔍</button>:'—'}</td>
                              <td style={S.td}><span style={{fontSize:11,color:'#868e96'}}>{sub.createdAt?.slice(0,10)}</span></td>
                              <td style={S.td}>
                                <div style={{display:'flex',gap:4}}>
                                  {sub.status!=='approved'&&<button onClick={()=>approve(sub._id)} style={S.btnSm('#d3f9d8','#2b8a3e')}>✓ Approve</button>}
                                  {sub.status!=='rejected'&&<button onClick={()=>reject(sub._id)}  style={S.btnSm('#ffe3e3','#c92a2a')}>✗ Reject</button>}
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

      {imageModal&&(
        <div onClick={()=>setImageModal(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{position:'relative',maxWidth:560,width:'100%'}}>
            <button onClick={()=>setImageModal(null)} style={{position:'absolute',top:-40,right:0,background:'none',border:'none',color:'white',fontSize:28,cursor:'pointer'}}>✕</button>
            <img src={imageModal} alt="proof" style={{width:'100%',borderRadius:12}}/>
          </div>
        </div>
      )}
    </div>
  );
}
