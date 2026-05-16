'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import ImageUpload from '@/app/components/admin/ImageUpload';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  const [formData, setFormData] = useState({
    title: '', slug: '', description: '', dates: '',
    price: '', registrationDeadline: '',
    submissionDeadline: '',   // ✅ NEW
    heroImage: '', coverImage: '', medalImage: '', medalImageBack: '',
    gallery: [],
    active: true,             // ✅ correct field name
    isPrevious: false,        // ✅ NEW
    isRegistrationOpen: true, // ✅ NEW
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
          registrationDeadline: ev.registrationDeadline ? ev.registrationDeadline.split('T')[0] : '',
          submissionDeadline:  ev.submissionDeadline  ? ev.submissionDeadline.split('T')[0] : '',
          heroImage:           ev.heroImage           || '',
          coverImage:          ev.coverImage          || '',
          medalImage:          ev.medalImage          || '',
          medalImageBack:      ev.medalImageBack      || '',
          gallery:             ev.gallery             || [],
          active:              ev.active              ?? true,
          isPrevious:          ev.isPrevious          ?? false,
          isRegistrationOpen:  ev.isRegistrationOpen  ?? true,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await adminAPI.updateEvent(params.id, {
        ...formData,
        price: Number(formData.price),
      });
      if (result.success) router.push('/admin/events');
      else alert(result.message || 'Failed to update');
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
              <label className="form-label">Registration Deadline</label>
              <input type="date" name="registrationDeadline" className="form-input" value={formData.registrationDeadline} onChange={handleChange}/>
            </div>
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
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Gallery ({formData.gallery.length} photos)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {formData.gallery.map((img, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img src={img} alt={`Gallery ${index + 1}`}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }}/>
                <button type="button" onClick={() => removeGalleryImage(index)}
                  style={{ position: 'absolute', top: '6px', right: '6px', background: '#ff4444',
                    color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}>
                  ✕
                </button>
              </div>
            ))}
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