'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterEvent, setFilterEvent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    event: '',
    name: '',
    distance: '',
    time: '',
    rank: '',
    category: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    loadEntries();
  }, [filterEvent]);

  const loadEvents = async () => {
    try {
      const result = await adminAPI.getEvents();
      if (result.success) {
        setEvents(result.events);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const loadEntries = async () => {
    setLoading(true);
    try {
      const result = await adminAPI.getLeaderboard(filterEvent);
      if (result.success) {
        setEntries(result.entries);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await adminAPI.addLeaderboardEntry({
        ...formData,
        distance: Number(formData.distance),
        rank: Number(formData.rank)
      });

      if (result.success) {
        setShowModal(false);
        setFormData({
          event: '',
          name: '',
          distance: '',
          time: '',
          rank: '',
          category: ''
        });
        loadEntries();
      } else {
        alert(result.message || 'Failed to add entry');
      }
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add entry');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const result = await adminAPI.deleteLeaderboardEntry(id);
      if (result.success) {
        loadEntries();
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Leaderboard</h1>
          <p className="page-subtitle">Manage leaderboard entries</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Entry
        </button>
      </div>

      <div className="filter-container">
        <select
          className="form-select"
          value={filterEvent}
          onChange={(e) => setFilterEvent(e.target.value)}
          style={{ maxWidth: '300px' }}
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Distance</th>
                <th>Time</th>
                <th>Category</th>
                <th>Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    No entries found
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>
                      <span style={{ 
                        background: entry.rank <= 3 ? '#00ff88' : '#333',
                        color: entry.rank <= 3 ? '#0a0a0a' : 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                      }}>
                        #{entry.rank}
                      </span>
                    </td>
                    <td>{entry.name}</td>
                    <td>{entry.distance} km</td>
                    <td>{entry.time || '-'}</td>
                    <td>{entry.category || '-'}</td>
                    <td>{entry.event?.title || 'Unknown'}</td>
                    <td>
                      <button
                        className="action-btn"
                        style={{ background: '#ff4444', color: 'white' }}
                        onClick={() => handleDelete(entry._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Entry Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#00ff88', marginTop: 0 }}>Add Leaderboard Entry</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event</label>
                <select
                  className="form-select"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  required
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Distance (km)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 1:30:45"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Rank</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 10K, 21K"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary">
                  Add Entry
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-content {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 16px;
          padding: 30px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}