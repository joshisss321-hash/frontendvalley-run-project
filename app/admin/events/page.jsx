'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await adminAPI.getEvents();
      if (result.success) {
        setEvents(result.events);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const result = await adminAPI.deleteEvent(id);
      if (result.success) {
        loadEvents();
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const toggleStatus = async (event) => {
    try {
      const result = await adminAPI.updateEvent(event._id, {
        isActive: !event.isActive
      });
      if (result.success) {
        loadEvents();
      }
    } catch (error) {
      console.error('Error updating event:', error);
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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Manage all your events</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/admin/events/create')}
        >
          + Create Event
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {event.heroImage && (
                        <img 
                          src={event.heroImage} 
                          alt={event.title}
                          style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                      )}
                      <span>{event.title}</span>
                    </div>
                  </td>
                  <td>{event.slug}</td>
                  <td>₹{event.price}</td>
                  <td>
                    <span 
                      className={`badge ${event.isActive ? 'badge-success' : 'badge-warning'}`}
                      onClick={() => toggleStatus(event)}
                      style={{ cursor: 'pointer' }}
                    >
                      {event.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="action-btn"
                        style={{ background: '#00ff88', color: '#0a0a0a' }}
                        onClick={() => router.push(`/admin/events/edit/${event._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn"
                        style={{ background: '#ff4444', color: 'white' }}
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </button>
                    </div>
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