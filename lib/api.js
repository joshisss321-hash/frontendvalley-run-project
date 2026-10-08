const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

const authHeader = () => ({ 'Authorization': `Bearer ${getToken()}` });

/* Admin token 7 din baad khud expire ho jaata hai. Tab tak agar tab khula
   pada hai to purana data screen par dikhta rehta hai, par har nayi call
   401 deti hai. Pehle har call `catch {}` mein chup ho jaati thi, isliye
   list khaali dikhti thi aur sirf Excel button par alert aata tha.
   Ab 401 ka matlab ek hi hai: token mar gaya — seedha login par bhejo. */
let bouncing = false;
const bounceToLogin = () => {
  if (typeof window === 'undefined' || bouncing) return;
  bouncing = true;
  try { localStorage.removeItem('adminToken'); } catch {}
  if (!window.location.pathname.startsWith('/admin/login')) {
    window.location.href = '/admin/login?expired=1';
  }
};

/* Jawab ko samajhdari se padho.
   Pehle seedha res.json() hota tha — 401 ya 500 par bhi. Tab kachra
   milta tha aur screen par sirf "failed" dikhta tha, wajah kabhi nahi. */
const safeJson = async (res) => {
  if (!res.ok) {
    let message = `Server ne ${res.status} lautaya`;
    if (res.status === 401) {
      message = 'Login khatam ho gaya — dobara login kijiye';
      bounceToLogin();
      return { success: false, message, expired: true };
    }
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {}
    return { success: false, message };
  }
  try {
    return await res.json();
  } catch {
    return { success: false, message: 'Server ka jawab padha nahi ja saka' };
  }
};

/* Har protected call isi se guzregi, taaki expiry kabhi chhupe nahi. */
const authGet = async (url) => safeJson(await fetch(url, { headers: authHeader() }));
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

  verifyToken: async () => authGet(`${API_URL}/api/admin/verify`),

  // ─── STATS ─────────────────────────────────────────────
  getStats: async () => authGet(`${API_URL}/api/admin/stats`),

  // ─── EVENTS ────────────────────────────────────────────
  getEvents: async () => authGet(`${API_URL}/api/admin/events`),

  getEvent: async (id) => authGet(`${API_URL}/api/admin/events/${id}`),

  createEvent: async (data) => safeJson(await fetch(`${API_URL}/api/admin/events`, {
    method: 'POST', headers: jsonHeader(), body: JSON.stringify(data),
  })),

  updateEvent: async (id, data) => safeJson(await fetch(`${API_URL}/api/admin/events/${id}`, {
    method: 'PUT', headers: jsonHeader(), body: JSON.stringify(data),
  })),

  deleteEvent: async (id) => safeJson(await fetch(`${API_URL}/api/admin/events/${id}`, {
    method: 'DELETE', headers: authHeader(),
  })),

  // ─── IMAGE UPLOAD ───────────────────────────────────────
  uploadImage: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_URL}/api/admin/events/upload-image?type=${type}`, {
      method: 'POST',
      headers: authHeader(),
      body: formData,
    });
    return safeJson(res);
  },

  // ─── SUBMISSIONS ────────────────────────────────────────
  // ✅ FIX: params object support karta hai
  getSubmissions: async (params = {}) => {
    const q = new URLSearchParams();
    if (params.eventSlug) q.set('eventSlug', params.eventSlug);
    if (params.status)    q.set('status',    params.status);
    if (params.distance)  q.set('distance',  params.distance);
    if (params.search)    q.set('search',    params.search);
    // ⚠️ Ye do pehle chhoot gaye the — isliye server ko hamesha page 1 hi
    //    dikhta tha aur 100 se aage ki submissions kabhi aati hi nahi thin.
    if (params.page)      q.set('page',      params.page);
    if (params.limit)     q.set('limit',     params.limit);
    return authGet(`${API_URL}/api/admin/submissions?${q}`);
  },

  approveSubmission: async (id) => safeJson(await fetch(`${API_URL}/api/admin/submissions/${id}/approve`, {
    method: 'PUT', headers: authHeader(),
  })),

  rejectSubmission: async (id) => safeJson(await fetch(`${API_URL}/api/admin/submissions/${id}/reject`, {
    method: 'PUT', headers: authHeader(),
  })),

  deleteSubmission: async (id) => safeJson(await fetch(`${API_URL}/api/admin/submissions/${id}`, {
    method: 'DELETE', headers: authHeader(),
  })),

  // ✅ NEW: Export submissions (Excel) — screen ki 100-row limit se azad
  exportSubmissions: async (params = {}) => {
    const q = new URLSearchParams();
    if (params.eventSlug) q.set('eventSlug', params.eventSlug);
    if (params.status)    q.set('status',    params.status);
    if (params.distance)  q.set('distance',  params.distance);
    if (params.search)    q.set('search',    params.search);
    const res = await fetch(`${API_URL}/api/admin/submissions/export?${q}`, { headers: authHeader() });
    return safeJson(res);
  },

  // ✅ NEW: Bulk approve
  bulkApprove: async (ids) => safeJson(await fetch(`${API_URL}/api/admin/submissions/bulk-approve`, {
    method: 'PUT', headers: jsonHeader(), body: JSON.stringify({ ids }),
  })),

  // ─── REGISTRATIONS ──────────────────────────────────────
  getRegistrations: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return authGet(`${API_URL}/api/admin/registrations?${params}`);
  },

  // ✅ NEW: Export registrations as Excel data
  exportRegistrations: async (eventSlug) => {
    const res = await fetch(
      `${API_URL}/api/admin/registrations/export/${encodeURIComponent(eventSlug)}`,
      { headers: authHeader() }
    );
    return safeJson(res);
  },

  // ✅ NEW: Update medal status
  updateMedalStatus: async (id, data) => safeJson(await fetch(`${API_URL}/api/admin/registrations/${id}/medal-status`, {
    method: 'PATCH', headers: jsonHeader(), body: JSON.stringify(data),
  })),

  // ─── LEADERBOARD ────────────────────────────────────────
  getLeaderboard: async (eventId = '') => authGet(
    eventId
      ? `${API_URL}/api/admin/leaderboard?event=${encodeURIComponent(eventId)}`
      : `${API_URL}/api/admin/leaderboard`
  ),

  addLeaderboardEntry: async (data) => safeJson(await fetch(`${API_URL}/api/admin/leaderboard`, {
    method: 'POST', headers: jsonHeader(), body: JSON.stringify(data),
  })),

  deleteLeaderboardEntry: async (id) => safeJson(await fetch(`${API_URL}/api/admin/leaderboard/${id}`, {
    method: 'DELETE', headers: authHeader(),
  })),

  // ─── USERS ──────────────────────────────────────────────
  getUsers: async (search = '') => authGet(
    search
      ? `${API_URL}/api/admin/users?search=${encodeURIComponent(search)}`
      : `${API_URL}/api/admin/users`
  ),
};