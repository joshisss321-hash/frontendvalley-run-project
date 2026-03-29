// frontend/src/admin/AdminPanel.jsx
// Ye ek complete React admin panel hai jo aapke backend se connect hoga
// Apne project mein src/admin/ folder banao aur ye file wahan rakho

import { useState, useEffect, useCallback } from "react";

// ─── API Base URL ─────────────────────────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ─── API Helper ───────────────────────────────────────────────────────────────
const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("vr_admin_token");
  const res = await fetch(`${API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api("/admin/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("vr_admin_token", data.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0b0f", display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: "system-ui"
    }}>
      <div style={{
        background: "#12141a", border: "1px solid #2a2f45", borderRadius: 16,
        padding: 40, width: 380
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏃</div>
          <h1 style={{ color: "#f97316", fontSize: 24, fontWeight: 800, margin: 0 }}>ValleyRun</h1>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Admin Panel Login</p>
        </div>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            color: "#ef4444", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 13
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={{
                width: "100%", background: "#1a1d26", border: "1px solid #2a2f45",
                borderRadius: 8, padding: "10px 14px", color: "#f1f5f9",
                fontSize: 14, outline: "none", boxSizing: "border-box"
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                width: "100%", background: "#1a1d26", border: "1px solid #2a2f45",
                borderRadius: 8, padding: "10px 14px", color: "#f1f5f9",
                fontSize: 14, outline: "none", boxSizing: "border-box"
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", background: loading ? "#7c3a0e" : "#f97316",
              color: "white", border: "none", borderRadius: 8, padding: "12px",
              fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PANEL ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("vr_admin_token"));
  const [page, setPage] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [regPagination, setRegPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [regFilters, setRegFilters] = useState({ page: 1, search: "", event: "", category: "" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const logout = () => {
    localStorage.removeItem("vr_admin_token");
    setIsLoggedIn(false);
  };

  // ─── Fetch Dashboard ────────────────────────────────────────────────────────
  const fetchDashboard = useCallback(async () => {
    try {
      const data = await api("/admin/dashboard");
      setStats(data.stats);
    } catch (err) { showToast(err.message, "error"); }
  }, []);

  // ─── Fetch Events ────────────────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api("/admin/events");
      setEvents(data.events);
    } catch (err) { showToast(err.message, "error"); }
    finally { setLoading(false); }
  }, []);

  // ─── Fetch Registrations ─────────────────────────────────────────────────────
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: regFilters.page,
        ...(regFilters.search && { search: regFilters.search }),
        ...(regFilters.event && { event: regFilters.event }),
        ...(regFilters.category && { category: regFilters.category }),
      });
      const data = await api(`/admin/registrations?${params}`);
      setRegistrations(data.registrations);
      setRegPagination(data.pagination);
    } catch (err) { showToast(err.message, "error"); }
    finally { setLoading(false); }
  }, [regFilters]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (page === "dashboard") fetchDashboard();
    if (page === "events" || page === "event-control") fetchEvents();
    if (page === "registrations") fetchRegistrations();
  }, [page, isLoggedIn, fetchDashboard, fetchEvents, fetchRegistrations]);

  // ─── Toggle Event Field ──────────────────────────────────────────────────────
  const toggleField = async (eventId, field, value) => {
    try {
      await api(`/admin/events/${eventId}/toggle`, {
        method: "PATCH",
        body: JSON.stringify({ field, value }),
      });
      showToast(`${field} updated!`);
      fetchEvents();
    } catch (err) { showToast(err.message, "error"); }
  };

  // ─── Save Event (Create or Update) ──────────────────────────────────────────
  const saveEvent = async (formData) => {
    try {
      if (editingEvent?._id) {
        await api(`/admin/events/${editingEvent._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        showToast("Event updated!");
      } else {
        await api("/admin/events", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        showToast("Event created!");
      }
      setEditingEvent(null);
      setPage("events");
      fetchEvents();
    } catch (err) { showToast(err.message, "error"); }
  };

  // ─── Delete Event ────────────────────────────────────────────────────────────
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await api(`/admin/events/${id}`, { method: "DELETE" });
      showToast("Event deleted");
      fetchEvents();
    } catch (err) { showToast(err.message, "error"); }
  };

  // ─── Upload Image ─────────────────────────────────────────────────────────────
  const uploadImage = async (file, type) => {
    const fd = new FormData();
    fd.append("image", file);
    fd.append("type", type);
    const token = localStorage.getItem("vr_admin_token");
    const res = await fetch(`${API}/admin/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.url;
  };

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "events", icon: "🗓️", label: "All Events" },
    { id: "create-event", icon: "➕", label: "Create Event" },
    { id: "event-control", icon: "🎛️", label: "Event Controls" },
    { id: "registrations", icon: "📋", label: "Registrations" },
  ];

  const s = {
    app: { display: "flex", minHeight: "100vh", background: "#0a0b0f", color: "#f1f5f9", fontFamily: "system-ui" },
    sidebar: { width: 240, background: "#12141a", borderRight: "1px solid #2a2f45", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0 },
    logo: { padding: "24px 20px", borderBottom: "1px solid #2a2f45" },
    logoText: { fontSize: 18, fontWeight: 800, color: "#f97316" },
    nav: { padding: "12px", flex: 1 },
    navItem: (active) => ({
      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
      borderRadius: 8, cursor: "pointer", marginBottom: 4,
      background: active ? "rgba(249,115,22,0.12)" : "transparent",
      color: active ? "#f97316" : "#94a3b8", fontSize: 14, fontWeight: 500,
      border: "none", width: "100%", textAlign: "left"
    }),
    main: { marginLeft: 240, flex: 1, padding: 28 },
    card: { background: "#12141a", border: "1px solid #2a2f45", borderRadius: 12, padding: 20, marginBottom: 16 },
    statCard: { background: "#12141a", border: "1px solid #2a2f45", borderRadius: 12, padding: 20 },
    btn: (variant = "primary") => ({
      padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13,
      fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6,
      background: variant === "primary" ? "#f97316" : variant === "danger" ? "rgba(239,68,68,0.15)" : "#1a1d26",
      color: variant === "primary" ? "white" : variant === "danger" ? "#ef4444" : "#94a3b8",
    }),
    input: { background: "#1a1d26", border: "1px solid #2a2f45", borderRadius: 8, padding: "9px 12px", color: "#f1f5f9", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" },
    label: { display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 6 },
    badge: (type) => {
      const styles = {
        active: { background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" },
        closed: { background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" },
        open: { background: "rgba(59,130,246,0.15)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.25)" },
      };
      return { padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, ...styles[type] };
    },
    toggle: { position: "relative", display: "inline-flex", alignItems: "center" },
    th: { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px", color: "#475569", background: "#1a1d26", borderBottom: "1px solid #2a2f45" },
    td: { padding: "12px 14px", fontSize: 13, borderBottom: "1px solid #1e2235", verticalAlign: "middle" },
  };

  // ─── EVENT FORM ─────────────────────────────────────────────────────────────
  const EventForm = () => {
    const [form, setForm] = useState(editingEvent || {
      title: "", slug: "", price: "", dates: "", description: "",
      categories: [], active: true, registrationOpen: true,
      registrationDeadline: "", isPrevious: false,
    });
    const [imgLoading, setImgLoading] = useState({});
    const cats = ["5km", "10km", "21km", "42km", "Virtual", "Kids 1km"];

    const handleImg = async (e, type) => {
      const file = e.target.files[0];
      if (!file) return;
      setImgLoading((p) => ({ ...p, [type]: true }));
      try {
        const url = await uploadImage(file, type);
        setForm((p) => ({ ...p, [type]: url }));
        showToast("Image uploaded!");
      } catch (err) { showToast(err.message, "error"); }
      finally { setImgLoading((p) => ({ ...p, [type]: false })); }
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{editingEvent ? "Edit Event" : "Create New Event"}</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={s.btn("ghost")} onClick={() => { setEditingEvent(null); setPage("events"); }}>Cancel</button>
            <button style={s.btn()} onClick={() => saveEvent(form)}>
              {editingEvent ? "Save Changes" : "Publish Event"}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 18 }}>
          <div>
            <div style={s.card}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", paddingBottom: 12, borderBottom: "1px solid #2a2f45" }}>📝 Basic Info</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={s.label}>Title *</label>
                  <input style={s.input} value={form.title} onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
                    setForm({ ...form, title, slug });
                  }} placeholder="Shaheed Diwas Tribute Run 2026" />
                </div>
                <div>
                  <label style={s.label}>Slug *</label>
                  <input style={s.input} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="monthly-marathon" />
                </div>
                <div>
                  <label style={s.label}>Price (₹) *</label>
                  <input style={s.input} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="349" />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={s.label}>Challenge Period</label>
                  <input style={s.input} value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} placeholder="Challenge period → 23 March – 28 March" />
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={s.label}>Description</label>
                  <textarea style={{ ...s.input, minHeight: 80, resize: "vertical" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Run your distance anytime during the month..." />
                </div>
                <div>
                  <label style={s.label}>Registration Deadline</label>
                  <input style={s.input} type="datetime-local" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })} />
                </div>
              </div>
            </div>

            <div style={s.card}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>🏷️ Categories</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {cats.map((c) => (
                  <button key={c} onClick={() => {
                    const has = form.categories.includes(c);
                    setForm({ ...form, categories: has ? form.categories.filter(x => x !== c) : [...form.categories, c] });
                  }}
                    style={{
                      padding: "5px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 600,
                      background: form.categories.includes(c) ? "rgba(249,115,22,0.15)" : "#1a1d26",
                      color: form.categories.includes(c) ? "#f97316" : "#64748b",
                      border: form.categories.includes(c) ? "1px solid rgba(249,115,22,0.4)" : "1px solid #2a2f45"
                    }}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={s.card}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>🖼️ Images</h3>
              {[["heroImage", "Hero Image"], ["coverImage", "Cover Image"], ["medalImage", "Medal Front"], ["medalImageBack", "Medal Back"]].map(([field, label]) => (
                <div key={field} style={{ marginBottom: 12 }}>
                  <label style={s.label}>{label}</label>
                  {form[field] && <img src={form[field]} alt={label} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 6, marginBottom: 6 }} />}
                  <input type="file" accept="image/*" onChange={(e) => handleImg(e, field)}
                    style={{ ...s.input, padding: "6px" }} disabled={imgLoading[field]} />
                  {imgLoading[field] && <div style={{ fontSize: 11, color: "#f97316", marginTop: 4 }}>Uploading...</div>}
                </div>
              ))}
            </div>

            <div style={s.card}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>⚙️ Status</h3>
              {[["active", "Event Active"], ["registrationOpen", "Registration Open"], ["isPrevious", "Is Previous Event"]].map(([field, label]) => (
                <div key={field} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#1a1d26", borderRadius: 8, marginBottom: 8, border: "1px solid #2a2f45" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                  <input type="checkbox" checked={form[field] || false} onChange={(e) => setForm({ ...form, [field]: e.target.checked })} style={{ width: 16, height: 16, accentColor: "#f97316", cursor: "pointer" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={s.app}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.logo}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "#f97316", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏃</div>
            <div>
              <div style={s.logoText}>ValleyRun</div>
              <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>Admin Panel</div>
            </div>
          </div>
        </div>
        <nav style={s.nav}>
          {navItems.map((item) => (
            <button key={item.id} style={s.navItem(page === item.id)} onClick={() => { setEditingEvent(null); setPage(item.id); }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: "1px solid #2a2f45" }}>
          <button style={{ ...s.btn("ghost"), width: "100%", justifyContent: "center" }} onClick={logout}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Dashboard</h2>
            {stats ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
                  {[
                    { label: "Total Registrations", val: stats.totalRegistrations, color: "#f97316" },
                    { label: "Active Events", val: stats.activeEvents, color: "#22c55e" },
                    { label: "Total Revenue", val: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, color: "#3b82f6" },
                    { label: "Weekly Registrations", val: stats.weeklyRegistrations, color: "#eab308" },
                  ].map((st) => (
                    <div key={st.label} style={s.statCard}>
                      <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>{st.label}</div>
                      <div style={{ fontSize: 30, fontWeight: 800, color: st.color }}>{st.val}</div>
                    </div>
                  ))}
                </div>
                <div style={s.card}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>📈 Last 7 Days</h3>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                    {stats.dailyChart?.map((d) => (
                      <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                          <div style={{ width: "100%", background: "#f97316", borderRadius: "4px 4px 0 0", height: `${Math.max(d.count * 8, 4)}px`, opacity: 0.7 }} />
                        </div>
                        <div style={{ fontSize: 10, color: "#475569" }}>{d.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : <div style={{ color: "#475569" }}>Loading stats...</div>}
          </div>
        )}

        {/* EVENTS */}
        {page === "events" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontWeight: 800 }}>All Events</h2>
              <button style={s.btn()} onClick={() => { setEditingEvent(null); setPage("create-event"); }}>+ Create Event</button>
            </div>
            <div style={{ background: "#12141a", border: "1px solid #2a2f45", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Event", "Price", "Regs", "Event Status", "Reg Status", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#475569" }}>Loading...</td></tr>
                  ) : events.length === 0 ? (
                    <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#475569" }}>No events found</td></tr>
                  ) : events.map((ev) => (
                    <tr key={ev._id}>
                      <td style={s.td}>
                        <div style={{ fontWeight: 600 }}>{ev.title}</div>
                        <div style={{ fontSize: 11, color: "#475569" }}>{ev.slug}</div>
                      </td>
                      <td style={s.td}>₹{ev.price}</td>
                      <td style={s.td}><strong>{ev.registrationCount || 0}</strong></td>
                      <td style={s.td}><span style={s.badge(ev.active ? "active" : "closed")}>{ev.active ? "Active" : "Closed"}</span></td>
                      <td style={s.td}><span style={s.badge(ev.registrationOpen ? "open" : "closed")}>{ev.registrationOpen ? "Open" : "Closed"}</span></td>
                      <td style={s.td}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ ...s.btn("ghost"), padding: "5px 10px", fontSize: 12 }} onClick={() => { setEditingEvent(ev); setPage("create-event"); }}>✏️</button>
                          <button style={{ ...s.btn("danger"), padding: "5px 10px", fontSize: 12 }} onClick={() => deleteEvent(ev._id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CREATE/EDIT EVENT */}
        {page === "create-event" && <EventForm />}

        {/* EVENT CONTROLS */}
        {page === "event-control" && (
          <div>
            <h2 style={{ fontWeight: 800, marginBottom: 20 }}>Event Controls</h2>
            {events.map((ev) => (
              <div key={ev._id} style={{ ...s.card, borderLeft: `3px solid ${ev.active ? "#22c55e" : "#ef4444"}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{ev.slug} · ₹{ev.price} · {ev.registrationCount || 0} registrations</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <span style={s.badge(ev.active ? "active" : "closed")}>{ev.active ? "Active" : "Inactive"}</span>
                      <span style={s.badge(ev.registrationOpen ? "open" : "closed")}>{ev.registrationOpen ? "Reg Open" : "Reg Closed"}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 220 }}>
                    {[["active", "Event Active"], ["registrationOpen", "Registration Open"]].map(([field, label]) => (
                      <div key={field} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1d26", borderRadius: 8, padding: "10px 12px", border: "1px solid #2a2f45" }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                        <input type="checkbox" checked={ev[field]} onChange={(e) => toggleField(ev._id, field, e.target.checked)}
                          style={{ width: 18, height: 18, accentColor: "#f97316", cursor: "pointer" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REGISTRATIONS */}
        {page === "registrations" && (
          <div>
            <h2 style={{ fontWeight: 800, marginBottom: 20 }}>Registrations</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              <input style={{ ...s.input, maxWidth: 260 }} placeholder="🔍 Search name/email/phone..." value={regFilters.search} onChange={(e) => setRegFilters({ ...regFilters, search: e.target.value, page: 1 })} />
              <select style={{ ...s.input, width: "auto" }} value={regFilters.event} onChange={(e) => setRegFilters({ ...regFilters, event: e.target.value, page: 1 })}>
                <option value="">All Events</option>
                {events.map((ev) => <option key={ev._id} value={ev._id}>{ev.title}</option>)}
              </select>
              <select style={{ ...s.input, width: "auto" }} value={regFilters.category} onChange={(e) => setRegFilters({ ...regFilters, category: e.target.value, page: 1 })}>
                <option value="">All Categories</option>
                {["5km", "10km", "21km", "42km"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ background: "#12141a", border: "1px solid #2a2f45", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["#", "Runner", "Event", "Category", "Phone", "Amount", "Payment", "Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#475569" }}>Loading...</td></tr>
                  ) : registrations.length === 0 ? (
                    <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#475569" }}>No registrations found</td></tr>
                  ) : registrations.map((r, i) => (
                    <tr key={r._id}>
                      <td style={{ ...s.td, color: "#475569", fontSize: 12 }}>#{((regFilters.page - 1) * 20) + i + 1}</td>
                      <td style={s.td}>
                        <div style={{ fontWeight: 600 }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: "#475569" }}>{r.email}</div>
                      </td>
                      <td style={{ ...s.td, fontSize: 12 }}>{r.event?.title || "—"}</td>
                      <td style={s.td}><span style={s.badge("open")}>{r.category || "—"}</span></td>
                      <td style={{ ...s.td, fontSize: 12 }}>{r.phone || "—"}</td>
                      <td style={s.td}><strong>₹{r.amount || "—"}</strong></td>
                      <td style={s.td}><span style={s.badge(r.paymentStatus === "paid" ? "active" : "closed")}>{r.paymentStatus || "pending"}</span></td>
                      <td style={{ ...s.td, fontSize: 12, color: "#475569" }}>{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {regPagination.totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#1a1d26", borderTop: "1px solid #2a2f45" }}>
                  <span style={{ fontSize: 12, color: "#475569" }}>Page {regPagination.page} of {regPagination.totalPages} · {regPagination.total} total</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={s.btn("ghost")} disabled={regFilters.page <= 1} onClick={() => setRegFilters(p => ({ ...p, page: p.page - 1 }))}>← Prev</button>
                    <button style={s.btn()} disabled={regFilters.page >= regPagination.totalPages} onClick={() => setRegFilters(p => ({ ...p, page: p.page + 1 }))}>Next →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24,
          background: toast.type === "error" ? "#1a0f0f" : "#12141a",
          border: `1px solid ${toast.type === "error" ? "#ef4444" : "#22c55e"}`,
          color: toast.type === "error" ? "#ef4444" : "#22c55e",
          padding: "12px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 9999
        }}>
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}
