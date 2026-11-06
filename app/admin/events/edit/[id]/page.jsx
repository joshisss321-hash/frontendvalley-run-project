'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import { endOfDayIST, toDateInputIST } from '@/lib/deadline';
import ImageUpload from '@/app/components/admin/ImageUpload';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', dates: '',
    price: '', mrp: '', priceIncreaseAt: '', priceAfter: '',
    whatsappLink: '', registrationDeadline: '',
    submissionDeadline: '',   // ✅ NEW
    heroImage: '', coverImage: '', medalImage: '', medalImageBack: '',
    gallery: [],
    active: true,             // ✅ correct field name
    isPrevious: false,        // ✅ NEW
    isRegistrationOpen: true, // ✅ NEW

    // Streak challenge — purane events "distance" hi rahenge
    challengeType: 'distance',
    streakOptions: [],
    streakMinMinutes: 30,
    streakSports: ['Run', 'Walk', 'Ride', 'Hike'],
    streakOutdoorOnly: true,
    streakSource: 'both',
  });

  useEffect(() => { loadEvent(); }, [params.id]);

  const loadEvent = async () => {
    try {
      const result = await adminAPI.getEvent(params.id);
      if (result.success) {
        const ev = result.event;
        setFormData({
          title:               ev.title               || '',
          slug:                ev.slug                || '',
          description:         ev.description         || '',
          dates:               ev.dates               || '',
          price:               ev.price               || '',
          mrp:                 ev.mrp                 || '',
          priceIncreaseAt:     toDateInputIST(ev.priceIncreaseAt),
          priceAfter:          ev.priceAfter          || '',
          whatsappLink:        ev.whatsappLink        || '',
          // India ke hisaab se tareekh — UTC se kaatne par din khisak jaata tha
          registrationDeadline: toDateInputIST(ev.registrationDeadline),
          submissionDeadline:  toDateInputIST(ev.submissionDeadline),
          heroImage:           ev.heroImage           || '',
          coverImage:          ev.coverImage          || '',
          medalImage:          ev.medalImage          || '',
          medalImageBack:      ev.medalImageBack      || '',
          gallery:             ev.gallery             || [],
          active:              ev.active              ?? true,
          isPrevious:          ev.isPrevious          ?? false,
          isRegistrationOpen:  ev.isRegistrationOpen  ?? true,

          challengeType:     ev.challengeType     || 'distance',
          streakOptions:     ev.streakOptions     || [],
          streakMinMinutes:  ev.streakMinMinutes  ?? 30,
          streakSports:      ev.streakSports?.length ? ev.streakSports : ['Run', 'Walk', 'Ride', 'Hike'],
          streakOutdoorOnly: ev.streakOutdoorOnly ?? true,
          streakSource:      ev.streakSource      || 'both',
        });
      } else {
        alert('Event not found');
        router.push('/admin/events');
      }
    } catch (err) {
      console.error(err);
      router.push('/admin/events');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGalleryUpload = (url) => {
    if (url) setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  /* ── Streak ke window options ── */
  const addStreakOption = () =>
    setFormData(p => ({
      ...p,
      streakOptions: [...(p.streakOptions || []), { label: '', goalDays: 21, windowDays: 24 }],
    }));

  const setStreakOption = (i, key, value) =>
    setFormData(p => ({
      ...p,
      streakOptions: p.streakOptions.map((o, j) => {
        if (j !== i) return o;
        const next = { ...o, [key]: value };
        // Label khali ho to khud bana do — "21 of 24"
        if (key !== 'label' && !o.label) next.label = `${next.goalDays} of ${next.windowDays}`;
        return next;
      }),
    }));

  const removeStreakOption = (i) =>
    setFormData(p => ({ ...p, streakOptions: p.streakOptions.filter((_, j) => j !== i) }));

  /* Jo photo browser mein khulti hi nahi, use yaad rakho — purane image
     account wali kaafi photos 403 deti hain aur website par khaali
     dikhti hain. Admin ko pata hona chahiye ki kaunsi dobara daalni hai. */
  const [broken, setBroken] = useState(() => new Set());
  const markBroken = (url) =>
    setBroken(prev => (prev.has(url) ? prev : new Set(prev).add(url)));

  const brokenList = formData.gallery.filter(u => broken.has(u));

  const removeBrokenImages = () => {
    if (!brokenList.length) return;
    if (!confirm(
      `${brokenList.length} broken photos will be removed from the list.\n\n` +
      `Remember: this is only saved when you press "Update Event" below.`
    )) return;
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter(u => !broken.has(u)) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        // Khaali chhoda to null — tabhi pricing page par kata hua daam nahi dikhega
        mrp: formData.mrp === '' ? null : Number(formData.mrp),
        // Early bird us din raat 11:59 PM IST tak — uske baad naya daam
        priceIncreaseAt: endOfDayIST(formData.priceIncreaseAt),
        priceAfter: formData.priceAfter === '' ? null : Number(formData.priceAfter),
        // Chuni hui tareekh = us din raat 11:59 PM IST tak (pehle subah 5:30 ho jaata tha)
        registrationDeadline: endOfDayIST(formData.registrationDeadline),
        submissionDeadline:   endOfDayIST(formData.submissionDeadline),

        /* Streak event mein window options hi "categories" ban jaate hain.
           Isse registration, payment aur admin — sab purane raaste par
           chalte rehte hain, kuch alag karne ki zaroorat nahi. */
        ...(formData.challengeType === 'streak'
          ? { categories: (formData.streakOptions || []).map((o) => o.label).filter(Boolean) }
          : {}),
      };

      if (formData.challengeType === 'streak') {
        const opts = formData.streakOptions || [];
        if (!opts.length) { alert('Add at least one window option'); setSaving(false); return; }

        const bad = opts.findIndex(
          (o) => !String(o.label).trim() || o.goalDays < 1 || o.windowDays < o.goalDays
        );
        if (bad >= 0) {
          alert(`Option #${bad + 1} is not valid.\n\nIt needs a label, and window days cannot be fewer than goal days.`);
          setSaving(false);
          return;
        }
      }

      const result = await adminAPI.updateEvent(params.id, payload);

      if (!result.success) {
        alert(result.message || 'Failed to update');
        return;
      }

      /* Server returned jo usse milao.
         Agar backend purana chal raha ho to Mongoose anjaan fields
         CHUPCHAAP gira deta hai — "saved" dikhta hai par kuch bachta nahi.
         Pehle yahi hua tha, isliye ab saaf bata dete hain. */
      const dropped = ['priceIncreaseAt', 'priceAfter', 'mrp', 'whatsappLink']
        .filter((k) => payload[k] !== null && payload[k] !== '' && result.event?.[k] == null);

      if (dropped.length) {
        alert(
          '⚠️ Ye fields server par save NAHI hue:\n\n  ' + dropped.join(', ') +
          '\n\nSabse aam wajah: backend ka purana version chal raha hai.' +
          '\nRender par deploy "Live" hai ya nahi, wo check kijiye — fir dobara save kijiye.'
        );
        return;
      }

      router.push('/admin/events');
    } catch (err) {
      console.error(err);
      alert('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit Event</h1>
        <p className="page-subtitle">Update event details</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── Basic Info ── */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Basic Information</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" name="title" className="form-input" value={formData.title} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label className="form-label">Slug</label>
              <input type="text" name="slug" className="form-input" value={formData.slug} onChange={handleChange} required/>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-textarea" value={formData.description} onChange={handleChange} rows={5}/>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Dates (display text)</label>
              <input type="text" name="dates" className="form-input" value={formData.dates} onChange={handleChange} placeholder="23 Mar – 28 Mar 2026"/>
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input type="number" name="price" className="form-input" value={formData.price} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label className="form-label">Registration Deadline (closes 11:59 PM IST)</label>
              <input type="date" name="registrationDeadline" className="form-input" value={formData.registrationDeadline} onChange={handleChange}/>
            </div>
          </div>

          {/* Early bird — daam apne aap badhega */}
          <div style={{ border: '1px solid #e9ecef', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>⏫ Early Bird — price apne aap badhega</div>
            <small style={{ color: '#666', display: 'block', marginBottom: 14 }}>
              Dono khaane bharenge tabhi chalega. Tareekh tak purana daam, uske baad naya —
              site par countdown apne aap dikhne lagega aur charge bhi naya hi hoga.
              Khaali chhod denge to daam kabhi nahi badlega.
            </small>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div className="form-group">
                <label className="form-label">Early bird valid till (11:59 PM IST)</label>
                <input type="date" name="priceIncreaseAt" className="form-input"
                  value={formData.priceIncreaseAt} onChange={handleChange}/>
              </div>
              <div className="form-group">
                <label className="form-label">Price after that (₹)</label>
                <input type="number" name="priceAfter" className="form-input"
                  value={formData.priceAfter} onChange={handleChange} placeholder="e.g. 449"/>
                <small style={{ color: '#666' }}>Abhi ke daam se zyada hona chahiye</small>
              </div>
            </div>
          </div>

          {/* This event's WhatsApp group — email aur success page dono par lagta hai */}
          <div className="form-group">
            <label className="form-label">WhatsApp Group Link — optional</label>
            <input
              type="text"
              name="whatsappLink"
              className="form-input"
              value={formData.whatsappLink}
              onChange={handleChange}
              placeholder="https://chat.whatsapp.com/XXXXXXXXXXXX"
            />
            <small style={{ color: '#666' }}>
              Registration confirmation email aur success page dono par &quot;Join Group&quot;
              ka button lag jayega. Khaali chhodenge to kahin kuch nahi dikhega.
            </small>
          </div>

          {/* MRP — pricing page par kata hua daam. Khaali chhodo to kuch nahi dikhega. */}
          <div className="form-group">
            <label className="form-label">MRP / Original Price (₹) — optional</label>
            <input type="number" name="mrp" className="form-input" value={formData.mrp} onChange={handleChange} placeholder="e.g. 449"/>
            <small style={{ color: '#666' }}>
              Pricing page par kata hua daam. Price se zyada hoga tabhi dikhega — warna kuch nahi.
            </small>
          </div>

          {/* ✅ Submission Deadline */}
          <div className="form-group">
            <label className="form-label">
              Submission Deadline (Activity submit karne ki last date)
            </label>
            <input type="date" name="submissionDeadline" className="form-input"
              value={formData.submissionDeadline} onChange={handleChange}
              style={{ maxWidth: '300px' }}/>
            <p style={{ color: '#888', fontSize: '12px', marginTop: '6px' }}>
              Is date ke baad activity submission automatically band ho jaayegi
            </p>
          </div>
        </div>

        {/* ── Challenge ka type ── */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Challenge Type</h3>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              ['distance', '🏃 Distance', 'Finish the distance once, send proof'],
              ['streak',   '🔥 Streak',   'Be active on this many days in a window'],
            ].map(([val, label, desc]) => {
              const on = (formData.challengeType || 'distance') === val;
              return (
                <button key={val} type="button"
                  onClick={() => setFormData(p => ({ ...p, challengeType: val }))}
                  style={{
                    flex: 1, minWidth: 190, textAlign: 'left', cursor: 'pointer',
                    padding: '14px 16px', borderRadius: 10, fontFamily: 'inherit',
                    background: on ? 'rgba(0,255,136,.12)' : 'transparent',
                    border: `2px solid ${on ? '#00ff88' : '#333'}`,
                    color: on ? '#00ff88' : '#aaa',
                  }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{label}</div>
                  <div style={{ fontSize: 11.5, marginTop: 4, opacity: .8, lineHeight: 1.5 }}>{desc}</div>
                </button>
              );
            })}
          </div>

          {formData.challengeType === 'streak' && (
            <div style={{ borderTop: '1px solid #333', paddingTop: 18 }}>

              {/* Window options — user inme se ek chunega */}
              <label style={lbl}>Window options</label>
              <p style={hint}>
                The runner picks one of these at registration. Their window starts the next day.
              </p>

              {(formData.streakOptions || []).map((o, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 110 }}>
                    <label style={{ ...lbl, fontSize: 11 }}>Label</label>
                    <input className="input" placeholder="21 of 24" value={o.label}
                      onChange={(e) => setStreakOption(i, 'label', e.target.value)} />
                  </div>
                  <div style={{ width: 110 }}>
                    <label style={{ ...lbl, fontSize: 11 }}>Goal days</label>
                    <input className="input" type="number" value={o.goalDays}
                      onChange={(e) => setStreakOption(i, 'goalDays', Number(e.target.value) || 0)} />
                  </div>
                  <div style={{ width: 110 }}>
                    <label style={{ ...lbl, fontSize: 11 }}>Window days</label>
                    <input className="input" type="number" value={o.windowDays}
                      onChange={(e) => setStreakOption(i, 'windowDays', Number(e.target.value) || 0)} />
                  </div>
                  <div style={{ fontSize: 11.5, color: '#888', paddingBottom: 10, minWidth: 90 }}>
                    {o.windowDays > o.goalDays
                      ? `${o.windowDays - o.goalDays} rest days`
                      : o.windowDays === o.goalDays ? 'no rest days' : '⚠️ window is too small'}
                  </div>
                  <button type="button" onClick={() => removeStreakOption(i)}
                    style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontWeight: 700, fontSize: 12, paddingBottom: 12 }}>
                    Delete
                  </button>
                </div>
              ))}

              <button type="button" onClick={addStreakOption}
                style={{ background: '#222', border: '1px solid #444', color: '#ddd', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 12.5, marginBottom: 20 }}>
                + Add an option
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16 }}>
                <div>
                  <label style={lbl}>Minimum minutes per day</label>
                  <input className="input" type="number" value={formData.streakMinMinutes ?? 30}
                    onChange={(e) => setFormData(p => ({ ...p, streakMinMinutes: Number(e.target.value) || 0 }))} />
                </div>
                <div>
                  <label style={lbl}>How days are marked</label>
                  <select className="input" value={formData.streakSource || 'both'}
                    onChange={(e) => setFormData(p => ({ ...p, streakSource: e.target.value }))}>
                    <option value="both">Strava or manual upload</option>
                    <option value="strava">Strava only</option>
                    <option value="manual">Manual upload only</option>
                  </select>
                </div>
              </div>

              <label style={{ ...lbl, marginTop: 16 }}>Which activities count</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Run', 'Walk', 'Ride', 'Hike', 'Swim', 'VirtualRun'].map((sp) => {
                  const list = formData.streakSports || [];
                  const on = list.includes(sp);
                  return (
                    <button key={sp} type="button"
                      onClick={() => setFormData(p => ({
                        ...p,
                        streakSports: on ? list.filter(x => x !== sp) : [...list, sp],
                      }))}
                      style={{
                        padding: '7px 15px', borderRadius: 100, cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: 12.5, fontWeight: 700,
                        background: on ? '#00ff88' : 'transparent',
                        color: on ? '#000' : '#aaa',
                        border: `1.5px solid ${on ? '#00ff88' : '#444'}`,
                      }}>
                      {sp}
                    </button>
                  );
                })}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginTop: 18 }}>
                <input type="checkbox" checked={formData.streakOutdoorOnly ?? true}
                  onChange={(e) => setFormData(p => ({ ...p, streakOutdoorOnly: e.target.checked }))}
                  style={{ width: 20, height: 20, cursor: 'pointer' }} />
                <span>
                  <strong style={{ color: '#ddd' }}>Outdoor only</strong>
                  <span style={{ display: 'block', fontSize: 11.5, color: '#888', marginTop: 2 }}>
                    Treadmill and indoor trainer do not count
                  </span>
                </span>
              </label>

              <div style={{ background: 'rgba(0,255,136,.07)', border: '1px solid rgba(0,255,136,.25)', borderRadius: 9, padding: 13, marginTop: 18, fontSize: 12.5, color: '#9fe', lineHeight: 1.7 }}>
                Save karte hi ye options registration page par categories ki jagah dikhenge.
                Window har bande ka apna hota hai — uski registration ke agle din se.
              </div>
            </div>
          )}
        </div>

        {/* ── Status Toggles ── */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Event Status</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Active */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" name="active" checked={formData.active} onChange={handleChange}
                style={{ width: '20px', height: '20px', accentColor: '#00ff88' }}/>
              <div>
                <div style={{ color: '#fff', fontWeight: '600' }}>Active</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Website pe dikhega</div>
              </div>
            </label>

            {/* Registration Open */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" name="isRegistrationOpen" checked={formData.isRegistrationOpen} onChange={handleChange}
                style={{ width: '20px', height: '20px', accentColor: '#00ff88' }}/>
              <div>
                <div style={{ color: '#fff', fontWeight: '600' }}>Registration Open</div>
                <div style={{ color: '#888', fontSize: '12px' }}>Log register kar sakte hain</div>
              </div>
            </label>

            {/* ✅ isPrevious */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" name="isPrevious" checked={formData.isPrevious} onChange={handleChange}
                style={{ width: '20px', height: '20px', accentColor: '#ff4444' }}/>
              <div>
                <div style={{ color: '#ff4444', fontWeight: '600' }}>Mark as Previous Event 🔒</div>
                <div style={{ color: '#888', fontSize: '12px' }}>
                  Check karo toh activity submission band — "Previous Events" mein jaayega
                </div>
              </div>
            </label>

          </div>
        </div>

        {/* ── Images ── */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Event Images</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <ImageUpload label="Hero Image" currentImage={formData.heroImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, heroImage: url }))}/>
            <ImageUpload label="Cover Image" currentImage={formData.coverImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
            <ImageUpload label="Medal Image (Front)" currentImage={formData.medalImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, medalImage: url }))}/>
            <ImageUpload label="Medal Image (Back)" currentImage={formData.medalImageBack}
              onUpload={(url) => setFormData(prev => ({ ...prev, medalImageBack: url }))}/>
          </div>
        </div>

        {/* ── Gallery ── */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>
            Gallery ({formData.gallery.length} photos
            {brokenList.length > 0 && (
              <span style={{ color: '#ff4444' }}> — {brokenList.length} BROKEN</span>
            )})
          </h3>

          {/* Public API sirf active events lautati hai. Event band ho to uski
              photos kahin nahi dikhtin — aur admin ko lagta hai upload fail
              ho gaya. Isliye yahin, photos ke paas hi, saaf bata do. */}
          {!formData.active && formData.gallery.length > 0 && (
            <div style={{ background: 'rgba(255,170,0,.12)', border: '1px solid #ffaa00',
              borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ color: '#ffcc55', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                ⚠️ These photos will not appear on the website
              </div>
              <div style={{ color: '#ffddaa', fontSize: 13, lineHeight: 1.6 }}>
                This event's <strong>Active</strong> tick hata hua hai, isliye poora event
                website se chhupa hua hai — gallery ki photos bhi. Dikhani hain to upar{' '}
                <strong>Active</strong> above. (For a past event, leave{' '}
                <strong>Past Event</strong> ka tick lagaa rehne dijiye — wo Previous
                Challenges mein chala jayega, live events mein nahi.)
              </div>
            </div>
          )}

          {/* Purane ImageKit account ki photos ab 403 deti hain. Yahan laal
              nishaan lag jayega taaki pata chale kaunsi dobara daalni hai. */}
          {brokenList.length > 0 && (
            <div style={{ background: 'rgba(255,68,68,.12)', border: '1px solid #ff4444',
              borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ color: '#ff8888', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                ⚠️ {brokenList.length} photos are not loading
              </div>
              <div style={{ color: '#ffaaaa', fontSize: 13, lineHeight: 1.6 }}>
                Ye purane image account par padi hain, isliye website par khaali dikhti hain.
                Inhe hata kar nayi photo upload kijiye.
              </div>
              <button
                type="button"
                onClick={removeBrokenImages}
                style={{ marginTop: 10, background: '#ff4444', color: '#fff', border: 'none',
                  borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}
              >
                Remove {brokenList.length} broken photos
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {formData.gallery.map((img, index) => {
              const isBroken = broken.has(img);
              return (
                <div key={img || index} style={{ position: 'relative' }}>
                  <img src={img} alt={`Gallery ${index + 1}`}
                    onError={() => markBroken(img)}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px',
                      border: isBroken ? '2px solid #ff4444' : '2px solid transparent',
                      background: '#1a1a1a' }}/>
                  {isBroken && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', background: 'rgba(0,0,0,.6)', borderRadius: 8,
                      color: '#ff6b6b', fontWeight: 700, fontSize: 12, textAlign: 'center', padding: 8,
                      pointerEvents: 'none' }}>
                      ❌ Not loading
                    </div>
                  )}
                  <button type="button" onClick={() => removeGalleryImage(index)}
                    style={{ position: 'absolute', top: '6px', right: '6px', background: '#ff4444',
                      color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <ImageUpload label="Add Gallery Photo" onUpload={handleGalleryUpload}/>
        </div>

        {/* ── Buttons ── */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : '✓ Update Event'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => router.push('/admin/events')}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

const lbl  = { display: 'block', color: '#ddd', fontSize: 12.5, fontWeight: 700, marginBottom: 6 };
const hint = { color: '#888', fontSize: 11.5, marginTop: -2, marginBottom: 12, lineHeight: 1.6 };