"use client";

import { useState } from "react";

/* Streak challenge ka card.
   Sabse upar wahi cheez jo roz dekhni hai: aaj hua ya nahi. Uske neeche
   grid, jisme ek nazar mein dikhe kitna chala aur kitna bacha.

   Rang ek hi matlab rakhte hain, poore card mein:
     hara  = ho gaya       |  amber = aaj baaki hai
     laal  = chhoot gaya   |  halka = abhi aana hai */

const C = {
  done: "#16a34a", doneBg: "#dcfce7",
  today: "#f59e0b", todayBg: "#fef3c7",
  miss: "#dc2626", missBg: "#fee2e2",
  future: "#e5e7eb",
  ink: "#111827", body: "#4b5563", muted: "#9ca3af",
};

const niceDate = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export default function StreakCard({ s, strava, onConnectStrava }) {
  const [showAll, setShowAll] = useState(false);

  const pct = Math.min(100, Math.round((s.daysDone / s.goalDays) * 100));
  const atRisk = s.missesLeft === 0 && s.status === "active";

  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,.07)", marginBottom: 18 }}>

      {/* ── Sir: aaj ka haal ── */}
      <Header s={s} atRisk={atRisk} />

      <div style={{ padding: "18px 18px 20px" }}>

        {/* ── Progress ── */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: 30, fontWeight: 900, color: C.ink, letterSpacing: "-1px" }}>
              {s.daysDone}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.muted }}> / {s.goalDays} days</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.body }}>{pct}%</div>
        </div>

        <div style={{ height: 9, background: "#f3f4f6", borderRadius: 100, overflow: "hidden", marginTop: 9 }}>
          <div style={{
            width: `${pct}%`, height: "100%", borderRadius: 100,
            background: s.status === "completed"
              ? `linear-gradient(90deg,${C.done},#4ade80)`
              : `linear-gradient(90deg,#dc2626,#f59e0b)`,
            transition: "width .6s ease",
          }} />
        </div>

        {/* ── Teen ginti ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
          <Stat
            value={s.currentStreak}
            label={s.currentStreak === 1 ? "day streak" : "day streak"}
            icon="🔥"
            tone={s.currentStreak > 0 ? C.today : C.muted}
          />
          <Stat
            value={s.missesLeft}
            label={s.missesLeft === 1 ? "miss left" : "misses left"}
            icon={s.missesLeft > 0 ? "🛟" : "⚠️"}
            tone={s.missesLeft > 0 ? C.body : C.miss}
          />
          <Stat
            value={s.daysRemaining}
            label="days remaining"
            icon="📅"
            tone={C.body}
          />
        </div>

        {/* ── Chetavni ── */}
        {atRisk && (
          <Note tone="warn">
            <strong>No misses left.</strong> Every remaining day has to count — but you can still finish.
          </Note>
        )}

        {s.status === "failed" && (
          <Note tone="fail">
            This window is over. {s.daysDone} of {s.goalDays} days done — that is still {s.daysDone} days
            you moved. Join the next round whenever you are ready.
          </Note>
        )}

        {s.status === "completed" && (
          <Note tone="win">
            <strong>Challenge complete.</strong> {s.daysDone} active days in {s.windowDays}.
            {s.certificateSent ? " Your certificate is in your email." : " Your certificate is on its way to your email."}
          </Note>
        )}

        {/* ── Calendar ── */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: C.muted }}>
              Your {s.windowDays} days
            </span>
            <span style={{ fontSize: 11.5, color: C.muted }}>
              {niceDate(s.windowStart)} – {niceDate(s.windowEnd)}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(38px,1fr))", gap: 6 }}>
            {s.grid.map((d) => <Cell key={d.date} d={d} />)}
          </div>

          <Legend />
        </div>

        {/* ── Strava ── */}
        {s.source !== "manual" && (
          <StravaRow strava={strava} onConnect={onConnectStrava} source={s.source} />
        )}

        {/* ── Niyam ── */}
        <button onClick={() => setShowAll(!showAll)} style={{
          marginTop: 14, background: "none", border: "none", padding: 0, cursor: "pointer",
          fontSize: 12.5, fontWeight: 700, color: C.body, fontFamily: "inherit",
        }}>
          {showAll ? "▾" : "▸"} What counts as a day?
        </button>

        {showAll && (
          <div style={{ fontSize: 13, color: C.body, lineHeight: 1.75, marginTop: 8, background: "#f9fafb", borderRadius: 11, padding: 13 }}>
            One activity of <strong>{s.minMinutes}+ minutes</strong> moving time
            {s.outdoorOnly ? ", outdoors with GPS" : ""}.<br />
            Counts: <strong>{(s.allowedSports || []).join(", ")}</strong>.<br />
            Two activities on the same day still count as one day. Days do not have to be
            back to back — you have {s.windowDays - s.goalDays} rest
            {s.windowDays - s.goalDays === 1 ? " day" : " days"} built in.
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sabse upar: aaj kya karna hai ── */
function Header({ s, atRisk }) {
  let bg, title, sub, emoji;

  if (s.status === "completed") {
    bg = `linear-gradient(135deg,${C.done},#15803d)`;
    emoji = "🏅"; title = "Challenge complete";
    sub = `${s.daysDone} of ${s.goalDays} days — you did it.`;
  } else if (s.status === "failed") {
    bg = "linear-gradient(135deg,#6b7280,#374151)";
    emoji = "🤝"; title = "Window closed";
    sub = `${s.daysDone} days moved. That still counts.`;
  } else if (!s.started) {
    bg = "linear-gradient(135deg,#1f2937,#111827)";
    emoji = "⏳"; title = "Starts soon";
    sub = `Your ${s.windowDays} days begin on ${niceDate(s.windowStart)}.`;
  } else if (s.doneToday) {
    bg = `linear-gradient(135deg,${C.done},#15803d)`;
    emoji = "✅"; title = "Today is done";
    sub = s.daysNeeded > 0
      ? `${s.daysNeeded} more ${s.daysNeeded === 1 ? "day" : "days"} to finish. See you tomorrow.`
      : "Goal reached — anything more is a bonus.";
  } else {
    bg = atRisk
      ? "linear-gradient(135deg,#b91c1c,#7f1d1d)"
      : `linear-gradient(135deg,${C.today},#d97706)`;
    emoji = atRisk ? "⚡" : "👟";
    title = "Today is still open";
    sub = atRisk
      ? `No misses left — ${s.minMinutes} minutes today keeps it alive.`
      : `${s.minMinutes} minutes of moving time locks today in.`;
  }

  return (
    <div style={{ background: bg, color: "#fff", padding: "18px 18px 17px" }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", opacity: .75 }}>
        {s.eventTitle}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 9 }}>
        <span style={{ fontSize: 30, lineHeight: 1 }}>{emoji}</span>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.4px" }}>{title}</div>
          <div style={{ fontSize: 13, opacity: .88, marginTop: 3, lineHeight: 1.5 }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Cell({ d }) {
  const map = {
    done:   { bg: C.doneBg,  color: C.done,   border: C.done,   mark: "✓" },
    today:  { bg: C.todayBg, color: "#b45309", border: C.today,  mark: d.dayNumber },
    missed: { bg: C.missBg,  color: C.miss,   border: "transparent", mark: "–" },
    future: { bg: "#f9fafb", color: C.muted,  border: "transparent", mark: d.dayNumber },
  }[d.status];

  const title = d.status === "done"
    ? `${niceDate(d.date)} — ${d.minutes} min ${d.sport}`
    : d.status === "missed"
      ? `${niceDate(d.date)} — missed`
      : niceDate(d.date);

  return (
    <div title={title} style={{
      aspectRatio: "1/1", borderRadius: 9, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 12.5, fontWeight: 800,
      background: map.bg, color: map.color,
      border: `2px solid ${map.border}`,
      // Aaj ka khana halka dhadakta hai — nazar wahi jaani chahiye
      animation: d.status === "today" ? "vrPulse 2s ease-in-out infinite" : undefined,
    }}>
      {map.mark}
      <style>{`
        @keyframes vrPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(245,158,11,.45) } 50%{ box-shadow:0 0 0 6px rgba(245,158,11,0) } }
        @media(prefers-reduced-motion:reduce){ *{ animation:none!important } }
      `}</style>
    </div>
  );
}

const Legend = () => (
  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 11 }}>
    {[["done", "Done"], ["today", "Today"], ["missed", "Missed"], ["future", "To come"]].map(([k, label]) => {
      const c = { done: C.done, today: C.today, missed: C.miss, future: C.future }[k];
      return (
        <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: C.muted }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: c, display: "inline-block" }} />
          {label}
        </span>
      );
    })}
  </div>
);

const Stat = ({ value, label, icon, tone }) => (
  <div style={{ background: "#f9fafb", borderRadius: 12, padding: "11px 10px", textAlign: "center" }}>
    <div style={{ fontSize: 17, fontWeight: 900, color: tone }}>
      <span style={{ fontSize: 13, marginRight: 3 }}>{icon}</span>{value}
    </div>
    <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2, fontWeight: 600 }}>{label}</div>
  </div>
);

const Note = ({ tone, children }) => {
  const map = {
    warn: { bg: "#fffbeb", border: "#fcd34d", color: "#92400e" },
    fail: { bg: "#f9fafb", border: "#e5e7eb", color: "#4b5563" },
    win:  { bg: "#f0fdf4", border: "#86efac", color: "#166534" },
  }[tone];
  return (
    <div style={{
      marginTop: 14, background: map.bg, border: `1px solid ${map.border}`,
      borderRadius: 11, padding: "11px 13px", fontSize: 13, lineHeight: 1.65, color: map.color,
    }}>
      {children}
    </div>
  );
};

/* ── Strava ki patti ── */
function StravaRow({ strava, onConnect, source }) {
  if (strava?.needsReconnect) {
    return (
      <div style={{ marginTop: 16, background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 12, padding: 13 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#991b1b" }}>Strava needs reconnecting</div>
        <div style={{ fontSize: 12.5, color: "#b91c1c", marginTop: 4, lineHeight: 1.6 }}>
          We lost access to your Strava account, so new activities are not syncing.
        </div>
        <button onClick={onConnect} style={stravaBtn}>Reconnect Strava</button>
      </div>
    );
  }

  if (strava?.connected) {
    return (
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 9, background: "#f9fafb", borderRadius: 11, padding: "11px 13px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.done, flexShrink: 0 }} />
        <div style={{ fontSize: 12.5, color: C.body, lineHeight: 1.5 }}>
          <strong>Strava connected</strong>
          {strava.athleteName ? ` as ${strava.athleteName}` : ""} — your activities sync on their own.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: 13 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#9a3412" }}>Connect Strava once</div>
      <div style={{ fontSize: 12.5, color: "#c2410c", marginTop: 4, lineHeight: 1.6 }}>
        {source === "strava"
          ? "This challenge tracks days from Strava. Connect once and every qualifying activity marks your day automatically."
          : "Connect once and your days get marked automatically — no uploading screenshots."}
      </div>
      <button onClick={onConnect} style={stravaBtn}>Connect Strava</button>
    </div>
  );
}

const stravaBtn = {
  marginTop: 10, background: "#fc4c02", color: "#fff", border: "none",
  borderRadius: 100, padding: "10px 20px", fontWeight: 700, fontSize: 13,
  cursor: "pointer", fontFamily: "inherit",
};
