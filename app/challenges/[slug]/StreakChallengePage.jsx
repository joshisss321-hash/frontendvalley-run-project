"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* Streak challenge ka apna page.
   Doori wale challenge ki baat alag hai — wahan ek din mehnat karni hai.
   Yahan roz lautkar aana hai, aur page ka kaam yahi samjhana hai.

   Har number event se aata hai — options, minutes, sports. Kuch bhi
   hardcode nahi, warna admin niyam badlega aur page jhooth bolta rahega. */

const RED = "#c0392b";
const INK = "#0a0a0a";

const niceDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function StreakChallengePage({ event }) {
  const router = useRouter();
  const [picked, setPicked] = useState(null);

  const options = event.streakOptions || [];
  const minMin  = event.streakMinMinutes || 30;
  const sports  = event.streakSports || [];
  const outdoor = event.streakOutdoorOnly !== false;
  const source  = event.streakSource || "both";

  const closed =
    event.isRegistrationOpen === false ||
    event.isPrevious === true ||
    (event.registrationDeadline ? new Date(event.registrationDeadline) < new Date() : false);

  const go = (label) =>
    router.push(`/challenges/${event.slug}/register${label ? `?window=${encodeURIComponent(label)}` : ""}`);

  const shortest = options.reduce((a, b) => (!a || b.goalDays < a.goalDays ? b : a), null);

  return (
    <div style={{ background: INK, color: "#fff", fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{css}</style>

      {/* ═══ HERO ═══ */}
      <section className="sc-hero">
        {(event.coverImage || event.heroImage || event.image) && (
          <img src={event.coverImage || event.heroImage || event.image} alt="" className="sc-hero-img" />
        )}
        <div className="sc-hero-veil" />

        <div className="sc-wrap sc-hero-inner">
          <div className="sc-kicker">
            <span className={closed ? "sc-dot sc-dot-off" : "sc-dot"} />
            {closed ? "Registration closed" : "Open now"}
            {!closed && <span className="sc-price">₹{event.price}</span>}
          </div>

          <h1 className="sc-h1">{event.title}</h1>

          {options.length > 0 && (
            <p className="sc-hero-sub">
              Pick {options.map((o) => o.goalDays).join(", ")} active days. Finish your window.
            </p>
          )}

          <div className="sc-cta-row">
            <button onClick={() => go()} disabled={closed} className="sc-btn sc-btn-red">
              {closed ? "Registration closed" : `Register — ₹${event.price}`}
            </button>
            <a href="#windows" className="sc-btn sc-btn-ghost">Pick a window</a>
          </div>

          {event.registrationDeadline && !closed && (
            <p className="sc-deadline">
              Registration closes {niceDate(event.registrationDeadline)}
            </p>
          )}
        </div>

        {/* Patti — sirf sach, event se */}
        <div className="sc-facts">
          <div className="sc-wrap sc-facts-inner">
            <span>{source === "strava" ? "Strava only" : source === "manual" ? "Upload your proof" : "Strava or upload"}</span>
            <span className="sc-sep">·</span>
            <span>{outdoor ? "Outdoor " : ""}{sports.join(" · ")}</span>
            <span className="sc-sep">·</span>
            <span>{minMin}+ min / day</span>
          </div>
        </div>
      </section>

      {/* ═══ BADA BAYAAN ═══ */}
      <section className="sc-statement">
        <div className="sc-wrap">
          <p className="sc-statement-small">The whole idea</p>
          <h2 className="sc-statement-big">
            GIVING UP IS<br />
            NOT IN THE <span className="sc-red">BLOOD</span>
          </h2>
          <p className="sc-statement-note">
            Missing a day is allowed. Walking away is not. That is the only difference
            between people who finish and people who restart.
          </p>
        </div>
      </section>

      {/* ═══ WINDOW CHUNO ═══ */}
      {options.length > 0 && (
        <section id="windows" className="sc-section">
          <div className="sc-wrap">
            <div className="sc-head">
              <h2 className="sc-h2">PICK A <span className="sc-red">WINDOW</span></h2>
              <p className="sc-head-note">
                Hit your goal days inside the window. Rest days are built in — they are part
                of the plan, not a failure.
              </p>
            </div>

            <div className="sc-windows">
              {options.map((o) => {
                const misses = Math.max(0, o.windowDays - o.goalDays);
                const on = picked === o.label;
                return (
                  <div key={o.label} className={`sc-win ${on ? "sc-win-on" : ""}`}
                    onMouseEnter={() => setPicked(o.label)}>
                    <div className="sc-win-num">{o.goalDays}</div>
                    <div className="sc-win-of">OF {o.windowDays}</div>

                    <div className="sc-win-row">
                      <span className="sc-win-label">Rest days</span>
                      <span className="sc-win-val">{misses || "None"}</span>
                    </div>
                    <div className="sc-win-row">
                      <span className="sc-win-label">Entry</span>
                      <span className="sc-win-val">₹{event.price}</span>
                    </div>

                    <button onClick={() => go(o.label)} disabled={closed} className="sc-win-btn">
                      Choose {o.goalDays}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TRACKING ═══ */}
      <section className="sc-band">
        <div className="sc-wrap sc-band-inner">
          <h2 className="sc-band-title">
            {source === "strava" ? "STRAVA-ONLY CHALLENGE"
              : source === "manual" ? "UPLOAD YOUR PROOF"
              : "STRAVA OR UPLOAD"}
          </h2>
          <div className="sc-band-text">
            {source === "strava" && (
              <>
                <p><strong>Only activities recorded on Strava count.</strong> Screenshots and
                manual entries are not accepted.</p>
                <p className="sc-band-sub">Connect Strava once — your days mark themselves.</p>
              </>
            )}
            {source === "manual" && (
              <>
                <p><strong>Upload your activity screenshot each day.</strong> Any app works —
                Strava, Nike Run Club, your watch.</p>
                <p className="sc-band-sub">Your day is marked once it is approved.</p>
              </>
            )}
            {source === "both" && (
              <>
                <p><strong>Connect Strava and forget about it</strong> — qualifying activities
                mark your days on their own.</p>
                <p className="sc-band-sub">No Strava? Upload a screenshot instead. Both count.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TEEN BAATEIN ═══ */}
      <section className="sc-section">
        <div className="sc-wrap">
          <div className="sc-three">
            <Tile big={source === "manual" ? "YOU" : "AUTO"}
              title={source === "manual" ? "Upload once a day" : "Days mark themselves"}
              text={source === "manual"
                ? "Finish, upload, done. Your grid fills up as days are approved."
                : "Connect Strava once. Every qualifying activity locks that day on its own."} />
            <Tile big={`${minMin}+`} unit="MIN"
              title="Moving time per day"
              text={`One ${outdoor ? "outdoor " : ""}activity with ${minMin}+ minutes of moving time locks the day. Two in a day still count as one.`} />
            <Tile big={String(options.length || 1)}
              unit={options.length === 1 ? "WINDOW" : "WINDOWS"}
              title="Your pace, your window"
              text={options.length > 1
                ? `Choose ${options.map((o) => o.goalDays).join(", ")} days. Your window and rest days lock to your pick.`
                : `${options[0]?.goalDays} days inside ${options[0]?.windowDays}. Your window starts the day after you register.`} />
          </div>
        </div>
      </section>

      {/* ═══ KYA GINTA HAI ═══ */}
      <section className="sc-section sc-section-alt">
        <div className="sc-wrap">
          <div className="sc-head">
            <h2 className="sc-h2">WHAT <span className="sc-red">COUNTS</span></h2>
            <p className="sc-head-note">
              {outdoor ? "Outdoor only · GPS required" : "Indoor and outdoor both count"}
              {source !== "manual" ? " · recorded on Strava" : ""}
            </p>
          </div>

          <div className="sc-counts">
            <div>
              <h3 className="sc-counts-h sc-green">Counts</h3>
              <ul className="sc-list">
                {sports.map((s) => (
                  <li key={s}>{outdoor ? "Outdoor " : ""}<strong>{s}</strong></li>
                ))}
                <li>At least <strong>{minMin} minutes</strong> of moving time</li>
              </ul>
            </div>
            <div>
              <h3 className="sc-counts-h sc-redt">Does not count</h3>
              <ul className="sc-list sc-list-off">
                <li>Anything under {minMin} minutes</li>
                {outdoor && <li>Treadmill, indoor cycling, gym machines</li>}
                {outdoor && <li>Virtual runs and rides</li>}
                <li>Activities outside your window dates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NIYAM ═══ */}
      <section className="sc-section">
        <div className="sc-wrap">
          <h2 className="sc-h2" style={{ marginBottom: 34 }}>THE <span className="sc-red">RULES</span></h2>

          <div className="sc-rules">
            {[
              `Pick your window at registration${options.length > 1 ? ` — ${options.map((o) => o.goalDays).join(", ")} qualifying days` : ""}. Your dates and rest days lock to that pick.`,
              `Your window starts the day after you register, so you get a full first day.`,
              `Each day needs one ${outdoor ? "outdoor " : ""}${sports.join(", ")} activity with ${minMin}+ minutes of moving time.`,
              `Days do not have to be back to back. Gaps are fine as long as you hit your goal inside the window.`,
              `Only one day counts per date. Three runs on Tuesday is still one Tuesday.`,
              source === "strava"
                ? "Only Strava-recorded activities count. Screenshots are not accepted."
                : source === "manual"
                  ? "Upload a screenshot from your profile. Your day is marked once approved."
                  : "Connect Strava for automatic tracking, or upload a screenshot. Both count.",
              `Finish your goal and your certificate reaches your email, with your name and your days.`,
            ].map((text, i) => (
              <div key={i} className="sc-rule">
                <span className="sc-rule-n">{String(i + 1).padStart(2, "0")}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AAKHRI DHAKKA ═══ */}
      <section className="sc-final">
        <div className="sc-wrap" style={{ textAlign: "center" }}>
          <h2 className="sc-final-h">
            {shortest
              ? <>Anyone can do one day.<br /><span className="sc-red">{shortest.goalDays} is the real test.</span></>
              : <>Show up.<br /><span className="sc-red">That is the whole challenge.</span></>}
          </h2>
          <button onClick={() => go()} disabled={closed} className="sc-btn sc-btn-red" style={{ marginTop: 28 }}>
            {closed ? "Registration closed" : `Register — ₹${event.price}`}
          </button>
          <p className="sc-final-note">
            <Link href="/challenges" style={{ color: "rgba(255,255,255,.5)" }}>See other challenges</Link>
          </p>
        </div>
      </section>

      {/* ═══ NEECHE CHIPKI PATTI ═══ */}
      {!closed && (
        <div className="sc-sticky">
          <div className="sc-sticky-left">
            <div className="sc-sticky-title">{event.title}</div>
            <div className="sc-sticky-sub">
              {source === "strava" ? "Strava" : source === "manual" ? "Upload" : "Strava or upload"} · ₹{event.price} · Entry
            </div>
          </div>
          <button onClick={() => go()} className="sc-btn sc-btn-red sc-sticky-btn">
            Register — ₹{event.price}
          </button>
        </div>
      )}
    </div>
  );
}

const Tile = ({ big, unit, title, text }) => (
  <div className="sc-tile">
    <div className="sc-tile-big">
      {big}{unit && <span className="sc-tile-unit">{unit}</span>}
    </div>
    <div className="sc-tile-title">{title}</div>
    <p className="sc-tile-text">{text}</p>
  </div>
);

const css = `
  .sc-wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
  .sc-red { color: ${RED}; }
  .sc-section { padding: 86px 0; }
  .sc-section-alt { background: #111; }

  /* Type screen ke hisaab se — fixed px par lamba naam ya lambi line
     kinare se bahar nikal jaati thi, aur chhote laptop par toot jaati. */
  .sc-h1 { font-size: clamp(38px, 6.2vw, 76px); font-weight: 900;
           letter-spacing: -.045em; line-height: .95;
           text-transform: uppercase; margin: 16px 0 0; }
  .sc-h2 { font-size: clamp(28px, 3.9vw, 46px); font-weight: 900;
           letter-spacing: -.04em; text-transform: uppercase; margin: 0; }
  .sc-head { margin-bottom: 38px; }
  .sc-head-note { font-size: 15px; color: rgba(255,255,255,.55); margin-top: 12px;
                  max-width: 560px; line-height: 1.7; }

  /* Hero */
  .sc-hero { position: relative; overflow: hidden; padding-top: 108px; }
  .sc-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .34; }
  .sc-hero-veil { position: absolute; inset: 0;
    background: linear-gradient(95deg, ${INK} 18%, rgba(10,10,10,.55) 100%); }
  .sc-hero-inner { position: relative; padding-bottom: 72px; }
  .sc-kicker { display: flex; align-items: center; gap: 10px; font-size: 11.5px; font-weight: 800;
               letter-spacing: 2.4px; text-transform: uppercase; color: rgba(255,255,255,.72); }
  .sc-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
            box-shadow: 0 0 0 4px rgba(34,197,94,.22); }
  .sc-dot-off { background: #6b7280; box-shadow: none; }
  .sc-price { color: ${RED}; }
  .sc-hero-sub { font-size: 19px; font-weight: 600; color: rgba(255,255,255,.8);
                 margin-top: 20px; max-width: 540px; line-height: 1.5; }
  .sc-cta-row { display: flex; gap: 13px; margin-top: 34px; flex-wrap: wrap; }
  .sc-deadline { font-size: 13px; color: rgba(255,255,255,.45); margin-top: 18px; }

  .sc-btn { display: inline-flex; align-items: center; justify-content: center;
            padding: 17px 38px; border-radius: 100px; border: none; cursor: pointer;
            font-family: inherit; font-weight: 800; font-size: 14.5px; letter-spacing: .6px;
            text-transform: uppercase; text-decoration: none; transition: all .25s; }
  .sc-btn-red { background: ${RED}; color: #fff; }
  .sc-btn-red:hover:not(:disabled) { background: #a93226; transform: translateY(-2px);
                                     box-shadow: 0 14px 34px rgba(192,57,43,.4); }
  .sc-btn-red:disabled { background: #374151; cursor: not-allowed; }
  .sc-btn-ghost { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.3); }
  .sc-btn-ghost:hover { border-color: #fff; transform: translateY(-2px); }

  .sc-facts { position: relative; border-top: 1px solid rgba(255,255,255,.1);
              border-bottom: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.4); }
  .sc-facts-inner { display: flex; gap: 14px; flex-wrap: wrap; padding: 17px 28px;
                    font-size: 12px; font-weight: 800; letter-spacing: 2px;
                    text-transform: uppercase; color: rgba(255,255,255,.6); }
  .sc-sep { color: ${RED}; }

  /* Bayaan */
  .sc-statement { padding: 96px 0; background: #fff; color: ${INK}; }
  .sc-statement-small { font-size: 11.5px; font-weight: 800; letter-spacing: 2.6px;
                        text-transform: uppercase; color: ${RED}; margin: 0; }
  .sc-statement-big { font-size: clamp(34px, 5.6vw, 68px); font-weight: 900;
                      letter-spacing: -.045em; line-height: .98; margin: 18px 0 0; }
  .sc-statement-note { font-size: 17px; line-height: 1.75; color: #52525b;
                       margin-top: 26px; max-width: 580px; }

  /* Windows */
  .sc-windows { display: grid; grid-template-columns: repeat(auto-fit,minmax(222px,1fr)); gap: 16px; }
  .sc-win { background: #141414; border: 1.5px solid rgba(255,255,255,.1); border-radius: 18px;
            padding: 26px 22px; text-align: center; transition: all .3s; }
  .sc-win-on { border-color: ${RED}; background: #181010; transform: translateY(-5px); }
  .sc-win-num { font-size: clamp(46px, 5vw, 62px); font-weight: 900; color: ${RED}; line-height: 1; letter-spacing: -3px; }
  .sc-win-of { font-size: 11.5px; font-weight: 800; letter-spacing: 2.4px;
               color: rgba(255,255,255,.45); margin-top: 4px; }
  .sc-win-row { display: flex; justify-content: space-between; font-size: 13px;
                padding: 11px 0; border-top: 1px solid rgba(255,255,255,.08); margin-top: 16px; }
  .sc-win-row:first-of-type { margin-top: 22px; }
  .sc-win-label { color: rgba(255,255,255,.5); }
  .sc-win-val { font-weight: 800; }
  .sc-win-btn { width: 100%; margin-top: 18px; padding: 13px; border-radius: 100px;
                border: none; cursor: pointer; background: ${RED}; color: #fff;
                font-family: inherit; font-weight: 800; font-size: 12.5px;
                letter-spacing: 1px; text-transform: uppercase; transition: background .2s; }
  .sc-win-btn:hover:not(:disabled) { background: #a93226; }
  .sc-win-btn:disabled { background: #374151; cursor: not-allowed; }

  /* Band */
  .sc-band { background: ${RED}; color: #fff; padding: 56px 0; }
  .sc-band-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; align-items: center; }
  .sc-band-title { font-size: clamp(26px, 3.6vw, 44px); font-weight: 900; letter-spacing: -.04em;
                   line-height: .96; text-transform: uppercase; margin: 0; }
  .sc-band-text p { font-size: 16.5px; line-height: 1.7; margin: 0 0 10px; }
  .sc-band-sub { opacity: .82; font-size: 15px !important; }

  /* Teen tile */
  .sc-three { display: grid; grid-template-columns: repeat(auto-fit,minmax(266px,1fr)); gap: 16px; }
  .sc-tile { background: #141414; border: 1px solid rgba(255,255,255,.09);
             border-radius: 18px; padding: 28px 24px; }
  .sc-tile-big { font-size: clamp(38px, 4vw, 50px); font-weight: 900; letter-spacing: -2.5px; line-height: 1; }
  .sc-tile-unit { font-size: 17px; margin-left: 7px; color: ${RED}; letter-spacing: 0; }
  .sc-tile-title { font-size: 12px; font-weight: 800; letter-spacing: 2px;
                   text-transform: uppercase; color: rgba(255,255,255,.65); margin-top: 16px; }
  .sc-tile-text { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,.55); margin: 10px 0 0; }

  /* Counts */
  .sc-counts { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; }
  .sc-counts-h { font-size: 12px; font-weight: 800; letter-spacing: 2.2px;
                 text-transform: uppercase; margin: 0 0 16px; }
  .sc-green { color: #22c55e; }
  .sc-redt { color: #f87171; }
  .sc-list { list-style: none; padding: 0; margin: 0; }
  .sc-list li { font-size: 15px; line-height: 1.6; padding: 11px 0;
                border-bottom: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
  .sc-list-off li { color: rgba(255,255,255,.45); }

  /* Rules */
  .sc-rules { display: grid; grid-template-columns: 1fr 1fr; gap: 0 48px; }
  .sc-rule { display: flex; gap: 18px; padding: 22px 0; border-top: 1px solid rgba(255,255,255,.1); }
  .sc-rule-n { font-size: 19px; font-weight: 900; color: ${RED}; flex-shrink: 0; line-height: 1.5; }
  .sc-rule p { font-size: 15px; line-height: 1.72; color: rgba(255,255,255,.72); margin: 0; }

  /* Final */
  .sc-final { padding: 100px 0 128px; background: #111; }
  .sc-final-h { font-size: clamp(27px, 3.9vw, 48px); font-weight: 900; letter-spacing: -.04em;
                line-height: 1.06; text-transform: none; margin: 0; }
  .sc-final-note { margin-top: 22px; font-size: 13.5px; }

  /* Sticky */
  .sc-sticky { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
               background: rgba(10,10,10,.96); backdrop-filter: blur(12px);
               border-top: 1px solid rgba(255,255,255,.12);
               display: flex; align-items: center; justify-content: space-between;
               gap: 16px; padding: 13px 28px; }
  .sc-sticky-title { font-size: 15px; font-weight: 800; }
  .sc-sticky-sub { font-size: 11.5px; color: rgba(255,255,255,.5); margin-top: 2px; }
  .sc-sticky-btn { padding: 13px 26px; font-size: 13px; }

  @media (max-width: 900px) {
    .sc-wrap { padding: 0 18px; }
    .sc-section { padding: 56px 0; }
    .sc-statement { padding: 60px 0; }
    .sc-statement-note { font-size: 15px; }
    .sc-hero-sub { font-size: 16px; }
    .sc-band-inner, .sc-counts, .sc-rules { grid-template-columns: 1fr; gap: 20px; }
    .sc-final { padding: 60px 0 120px; }
    .sc-sticky { padding: 11px 16px; }
    .sc-sticky-btn { padding: 12px 18px; font-size: 12px; }
    .sc-btn { padding: 15px 28px; font-size: 13.5px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sc-win, .sc-btn { transition: none !important; }
    .sc-win-on, .sc-btn:hover { transform: none !important; }
  }
`;
