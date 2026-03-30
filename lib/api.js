const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
};

const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};


// ========== ADD THIS AT THE END OF FILE ==========

// Admin API
export const adminAPI = {
  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  verifyToken: async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/verify`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Stats
  getStats: async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Events
  getEvents: async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/events`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getEvent: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/events/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  createEvent: async (data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateEvent: async (id, data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteEvent: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Image Upload
  uploadImage: async (file) => {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/api/admin/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  },

  // Submissions
  getSubmissions: async (status = '') => {
    const token = localStorage.getItem('adminToken');
    const url = status 
      ? `${API_URL}/api/admin/submissions?status=${status}`
      : `${API_URL}/api/admin/submissions`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  approveSubmission: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}/approve`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  rejectSubmission: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}/reject`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  deleteSubmission: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Leaderboard
  getLeaderboard: async (eventId = '') => {
    const token = localStorage.getItem('adminToken');
    const url = eventId
      ? `${API_URL}/api/admin/leaderboard?event=${eventId}`
      : `${API_URL}/api/admin/leaderboard`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  addLeaderboardEntry: async (data) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteLeaderboardEntry: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_URL}/api/admin/leaderboard/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Users
  getUsers: async (search = '') => {
    const token = localStorage.getItem('adminToken');
    const url = search
      ? `${API_URL}/api/admin/users?search=${search}`
      : `${API_URL}/api/admin/users`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};