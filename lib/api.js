const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

export const adminAPI = {

  // ─── AUTH ───────────────────────────────────────────────
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  verifyToken: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/verify`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── STATS ──────────────────────────────────────────────
  getStats: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── EVENTS ─────────────────────────────────────────────
  getEvents: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/events`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getEvent: async (id) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/events/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  createEvent: async (data) => {
    const token = getToken();
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
    const token = getToken();
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
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/events/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── IMAGE UPLOAD ────────────────────────────────────────
  uploadImage: async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/api/admin/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  },

  // ─── SUBMISSIONS ─────────────────────────────────────────
  getSubmissions: async (status = '') => {
    const token = getToken();
    const url = status
      ? `${API_URL}/api/admin/submissions?status=${status}`
      : `${API_URL}/api/admin/submissions`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  approveSubmission: async (id) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}/approve`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  rejectSubmission: async (id) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}/reject`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  deleteSubmission: async (id) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── LEADERBOARD ─────────────────────────────────────────
  getLeaderboard: async (eventId = '') => {
    const token = getToken();
    const url = eventId
      ? `${API_URL}/api/admin/leaderboard?event=${eventId}`
      : `${API_URL}/api/admin/leaderboard`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  addLeaderboardEntry: async (data) => {
    const token = getToken();
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
    const token = getToken();
    const response = await fetch(`${API_URL}/api/admin/leaderboard/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── USERS ───────────────────────────────────────────────
  getUsers: async (search = '') => {
    const token = getToken();
    const url = search
      ? `${API_URL}/api/admin/users?search=${search}`
      : `${API_URL}/api/admin/users`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // ─── REGISTRATIONS ───────────────────────────────────────
  getRegistrations: async (filters = {}) => {
    const token = getToken();
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/api/admin/registrations?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};