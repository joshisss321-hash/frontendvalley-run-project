const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TOKEN_KEY = "vrToken";
const USER_KEY  = "vrUser";

/* ── Token storage ───────────────────────────────────────── */
export const getUserToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setUserSession = (token, user) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getCachedUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const clearUserSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => Boolean(getUserToken());

/* ── Fetch wrapper ───────────────────────────────────────── */
const authHeaders = () => {
  const token = getUserToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const request = async (path, options = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  // Token expire ho gaya — session saaf karo taaki page login pe bhej de
  if (res.status === 401) clearUserSession();

  return { ok: res.ok, status: res.status, ...data };
};

/* ── API ─────────────────────────────────────────────────── */
export const userAPI = {
  sendOtp: (email) =>
    request("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  verifyOtp: (email, code) =>
    request("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),

  me: () => request("/api/auth/me"),

  updateProfile: (fields) =>
    request("/api/auth/me", {
      method: "PUT",
      body: JSON.stringify(fields),
    }),

  getProfile: () => request("/api/profile"),

  trackMedal: (registrationId) => request(`/api/profile/track/${registrationId}`),

  /**
   * Activity submit — profile se seedha, phone se dhoondhne ki zaroorat nahi.
   * FormData bhejte hain isliye Content-Type khud set NAHI karte —
   * browser boundary ke saath sahi header lagata hai.
   */
  submitActivity: async ({ eventSlug, distance, timing, file }) => {
    const form = new FormData();
    form.append("eventSlug", eventSlug);
    form.append("distance", distance);
    if (timing) form.append("timing", timing);
    form.append("image", file);

    const res = await fetch(`${API_URL}/api/profile/submit-activity`, {
      method:  "POST",
      headers: authHeaders(),
      body:    form,
    });

    const data = await res.json().catch(() => ({}));
    if (res.status === 401) clearUserSession();
    return { ok: res.ok, status: res.status, ...data };
  },

  validateCoupon: ({ code, eventSlug, email }) =>
    request("/api/coupon/validate", {
      method: "POST",
      body: JSON.stringify({ code, eventSlug, email }),
    }),
};

/* ── Admin: bulk tracking upload ─────────────────────────── */
const adminHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const trackingAPI = {
  preview: async (eventSlug, rows) => {
    const res = await fetch(`${API_URL}/api/admin/tracking/preview`, {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify({ eventSlug, rows }),
    });
    return res.json();
  },

  commit: async (eventSlug, rows, { notify = true, overwrite = false } = {}) => {
    const res = await fetch(`${API_URL}/api/admin/tracking/commit`, {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify({ eventSlug, rows, notify, overwrite }),
    });
    return res.json();
  },

  markDelivered: async (registrationId) => {
    const res = await fetch(
      `${API_URL}/api/admin/tracking/${registrationId}/delivered`,
      { method: "PATCH", headers: adminHeaders() }
    );
    return res.json();
  },
};
