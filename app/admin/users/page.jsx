'use client';

import { useEffect, useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await adminAPI.getUsers(search);
      if (result.success) {
        setUsers(result.users);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <p className="page-subtitle">View and manage users</p>
      </div>

      <div className="filter-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Events Joined</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || '-'}</td>
                    <td>
                      <span className="badge badge-success">
                        {user.joinedEvents?.length || 0} events
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="action-btn"
                        style={{ background: '#00ff88', color: '#0a0a0a' }}
                        onClick={() => setSelectedUser(user)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#00ff88', marginTop: 0 }}>User Details</h2>
            
            <div className="detail-grid">
              <div className="detail-item">
                <label>Name</label>
                <p>{selectedUser.name}</p>
              </div>

              <div className="detail-item">
                <label>Email</label>
                <p>{selectedUser.email}</p>
              </div>

              <div className="detail-item">
                <label>Phone</label>
                <p>{selectedUser.phone || 'Not provided'}</p>
              </div>

              {selectedUser.address && (
                <div className="detail-item full-width">
                  <label>Address</label>
                  <p>
                    {selectedUser.address.street && `${selectedUser.address.street}, `}
                    {selectedUser.address.city && `${selectedUser.address.city}, `}
                    {selectedUser.address.state && `${selectedUser.address.state} `}
                    {selectedUser.address.pincode && selectedUser.address.pincode}
                  </p>
                </div>
              )}

              <div className="detail-item full-width">
                <label>Joined Events</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {selectedUser.joinedEvents?.length > 0 ? (
                    selectedUser.joinedEvents.map((event, index) => (
                      <span 
                        key={index}
                        style={{
                          background: 'rgba(0, 255, 136, 0.2)',
                          color: '#00ff88',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '14px'
                        }}
                      >
                        {event.title || event}
                      </span>
                    ))
                  ) : (
                    <p style={{ margin: 0, color: '#888' }}>No events joined</p>
                  )}
                </div>
              </div>

              <div className="detail-item">
                <label>Member Since</label>
                <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedUser(null)}
              style={{ marginTop: '24px' }}
            >
              Close
            </button>
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
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .detail-item {
          background: #2a2a2a;
          padding: 16px;
          border-radius: 8px;
        }

        .detail-item.full-width {
          grid-column: 1 / -1;
        }

        .detail-item label {
          display: block;
          color: #888;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .detail-item p {
          color: white;
          margin: 0;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}