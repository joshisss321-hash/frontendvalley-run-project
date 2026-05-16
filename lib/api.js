const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

const authHeader = () => ({ 'Authorization': `Bearer ${getToken()}` });
const jsonHeader = () => ({ 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' });

export const adminAPI = {

  // ─── AUTH ──────────────────────────────────────────────
  login: async (credentials) => {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  verifyToken: async () => {
    const res = await fetch(`${API_URL}/api/admin/verify`, { headers: authHeader() });
    return res.json();
  },

  // ─── STATS ─────────────────────────────────────────────
  getStats: async () => {
    const res = await fetch(`${API_URL}/api/admin/stats`, { headers: authHeader() });
    return res.json();
  },

  // ─── EVENTS ────────────────────────────────────────────
  getEvents: async () => {
    const res = await fetch(`${API_URL}/api/admin/events`, { headers: authHeader() });
    return res.json();
  },

  getEvent: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/events/${id}`, { headers: authHeader() });
    return res.json();
  },

  createEvent: async (data) => {
    const res = await fetch(`${API_URL}/api/admin/events`, {
      method: 'POST', headers: jsonHeader(), body: JSON.stringify(data),
    });
    return res.json();
  },

  updateEvent: async (id, data) => {
    const res = await fetch(`${API_URL}/api/admin/events/${id}`, {
      method: 'PUT', headers: jsonHeader(), body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteEvent: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/events/${id}`, {
      method: 'DELETE', headers: authHeader(),
    });
    return res.json();
  },

  // ─── IMAGE UPLOAD ───────────────────────────────────────
  uploadImage: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/api/admin/events/upload-image?type=${type}`, {
      method: 'POST',
      headers: authHeader(),
      body: formData,
    });
    return res.json();
  },

  // ─── SUBMISSIONS ────────────────────────────────────────
  // ✅ FIX: params object support karta hai
  getSubmissions: async (params = {}) => {
    const q = new URLSearchParams();
    if (params.eventSlug) q.set('eventSlug', params.eventSlug);
    if (params.status)    q.set('status',    params.status);
    if (params.distance)  q.set('distance',  params.distance);
    if (params.search)    q.set('search',    params.search);
    const res = await fetch(`${API_URL}/api/admin/submissions?${q}`, { headers: authHeader() });
    return res.json();
  },

  approveSubmission: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/submissions/${id}/approve`, {
      method: 'PUT', headers: authHeader(),
    });
    return res.json();
  },

  rejectSubmission: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/submissions/${id}/reject`, {
      method: 'PUT', headers: authHeader(),
    });
    return res.json();
  },

  deleteSubmission: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/submissions/${id}`, {
      method: 'DELETE', headers: authHeader(),
    });
    return res.json();
  },

  // ✅ NEW: Bulk approve
  bulkApprove: async (ids) => {
    const res = await fetch(`${API_URL}/api/admin/submissions/bulk-approve`, {
      method: 'PUT', headers: jsonHeader(), body: JSON.stringify({ ids }),
    });
    return res.json();
  },

  // ─── REGISTRATIONS ──────────────────────────────────────
  getRegistrations: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/api/admin/registrations?${params}`, { headers: authHeader() });
    return res.json();
  },

  // ✅ NEW: Export registrations as Excel data
  exportRegistrations: async (eventSlug) => {
    const res = await fetch(`${API_URL}/api/admin/registrations/export/${eventSlug}`, { headers: authHeader() });
    return res.json();
  },

  // ✅ NEW: Update medal status
  updateMedalStatus: async (id, data) => {
    const res = await fetch(`${API_URL}/api/admin/registrations/${id}/medal-status`, {
      method: 'PATCH', headers: jsonHeader(), body: JSON.stringify(data),
    });
    return res.json();
  },

  // ─── LEADERBOARD ────────────────────────────────────────
  getLeaderboard: async (eventId = '') => {
    const url = eventId
      ? `${API_URL}/api/admin/leaderboard?event=${eventId}`
      : `${API_URL}/api/admin/leaderboard`;
    const res = await fetch(url, { headers: authHeader() });
    return res.json();
  },

  addLeaderboardEntry: async (data) => {
    const res = await fetch(`${API_URL}/api/admin/leaderboard`, {
      method: 'POST', headers: jsonHeader(), body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteLeaderboardEntry: async (id) => {
    const res = await fetch(`${API_URL}/api/admin/leaderboard/${id}`, {
      method: 'DELETE', headers: authHeader(),
    });
    return res.json();
  },

  // ─── USERS ──────────────────────────────────────────────
  getUsers: async (search = '') => {
    const url = search
      ? `${API_URL}/api/admin/users?search=${search}`
      : `${API_URL}/api/admin/users`;
    const res = await fetch(url, { headers: authHeader() });
    return res.json();
  },
};