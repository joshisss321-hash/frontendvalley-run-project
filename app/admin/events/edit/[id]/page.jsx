'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminAPI } from '@/lib/api';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    dates: '',
    price: '',
    registrationDeadline: '',
    heroImage: '',
    coverImage: '',
    medalImage: '',
    medalImageBack: '',
    gallery: [],
    isActive: true
  });

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      const result = await adminAPI.getEvent(params.id);
      if (result.success) {
        const event = result.event;
        setFormData({
          title: event.title || '',
          slug: event.slug || '',
          description: event.description || '',
          dates: event.dates || '',
          price: event.price || '',
          registrationDeadline: event.registrationDeadline ? event.registrationDeadline.split('T')[0] : '',
          heroImage: event.heroImage || '',
          coverImage: event.coverImage || '',
          medalImage: event.medalImage || '',
          medalImageBack: event.medalImageBack || '',
          gallery: event.gallery || [],
          isActive: event.isActive ?? true
        });
      } else {
        alert('Event not found');
        router.push('/admin/events');
      }
    } catch (error) {
      console.error('Error loading event:', error);
      alert('Failed to load event');
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
    if (url) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, url]
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const result = await adminAPI.updateEvent(params.id, {
        ...formData,
        price: Number(formData.price)
      });

      if (result.success) {
        router.push('/admin/events');
      } else {
        alert(result.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Edit Event</h1>
        <p className="page-subtitle">Update event details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Basic Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Slug</label>
              <input
                type="text"
                name="slug"
                className="form-input"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Dates</label>
              <input
                type="text"
                name="dates"
                className="form-input"
                value={formData.dates}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                className="form-input"
                value={formData.registrationDeadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                style={{ width: '20px', height: '20px' }}
              />
              <span style={{ color: '#888' }}>Active Event</span>
            </label>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Event Images</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <ImageUpload
              label="Hero Image"
              currentImage={formData.heroImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, heroImage: url }))}
            />

            <ImageUpload
              label="Cover Image"
              currentImage={formData.coverImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <ImageUpload
              label="Medal Image (Front)"
              currentImage={formData.medalImage}
              onUpload={(url) => setFormData(prev => ({ ...prev, medalImage: url }))}
            />

            <ImageUpload
              label="Medal Image (Back)"
              currentImage={formData.medalImageBack}
              onUpload={(url) => setFormData(prev => ({ ...prev, medalImageBack: url }))}
            />
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Gallery</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {formData.gallery.map((img, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <ImageUpload
            label="Add Gallery Image"
            onUpload={handleGalleryUpload}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : '✓ Update Event'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => router.push('/admin/events')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}