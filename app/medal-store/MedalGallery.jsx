"use client";

import { useEffect, useState } from "react";

/* Medal ki photos — bada shot, neeche thumbnails, aur click par
   lightbox.

   Front aur back dono dikhna zaroori hai: medal khareedte waqt log
   sabse pehle yahi dekhte hain ki peeche kya likha hai. Isliye
   pehli do photo ke neeche saaf "Front" / "Back" likha jaata hai.

   Lightbox ka tareeka `components/HomeGallery.jsx` se liya hai —
   Escape, arrow keys, swipe, aur body scroll lock. Wahan ka
   component seedha use nahi kiya kyunki wo event-gallery ke liye
   bana hai (filters, "show more", dead-image handling). */

const sideLabel = (i, total) => {
  if (total < 2) return "";
  if (i === 0) return "Front";
  if (i === 1) return "Back";
  return "";
};

export default function MedalGallery({ images = [], name = "" }) {
  const shots = images.filter((x) => x?.url);
  const [at, setAt] = useState(0);
  const [open, setOpen] = useState(false);
  const [touchX, setTouchX] = useState(null);

  const go = (d) => setAt((i) => (i + d + shots.length) % shots.length);

  /* ⚠️ Saare hooks yahan, kisi bhi `return` se PEHLE. Pehle maine
     "photo nahi hai" wala return upar rakh diya tha — React ke
     niyam se wo galat hai, kyunki tab useEffect kabhi chalta aur
     kabhi nahi. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, shots.length]);

  /* Photo na ho to kuch dikhane ka matlab nahi — khaali dabba
     "toota hua" lagta hai, isliye saaf placeholder. */
  if (shots.length === 0) {
    return (
      <div className="ms-shot" style={{ display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 54, cursor: "default" }}>
        🏅
      </div>
    );
  }

  /* Phone par swipe — 50px se kam ko galti maan kar chhod dete hain */
  const onTouchEnd = (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  return (
    <div>
      <div className="ms-shot" onClick={() => setOpen(true)}
        role="button" tabIndex={0} aria-label="Open larger photo"
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}>
        <img src={shots[at].url} alt={`${name} — ${sideLabel(at, shots.length) || "photo"}`} />
      </div>

      {shots.length > 1 && (
        <div className="ms-thumbs">
          {shots.map((s, i) => (
            <div key={s.url}>
              <button type="button" onClick={() => setAt(i)}
                className={`ms-thumb ${i === at ? "ms-thumb-on" : ""}`}
                aria-label={sideLabel(i, shots.length) || `Photo ${i + 1}`}>
                <img src={s.url} alt="" loading="lazy" />
              </button>
              {sideLabel(i, shots.length) && (
                <div className="ms-side-label">{sideLabel(i, shots.length)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="ms-lb" onClick={() => setOpen(false)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}>
          <button className="ms-lb-x" onClick={() => setOpen(false)} aria-label="Close">×</button>

          {shots.length > 1 && (
            <>
              <button className="ms-lb-nav" style={{ left: 16 }}
                onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
              <button className="ms-lb-nav" style={{ right: 16 }}
                onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
            </>
          )}

          <img src={shots[at].url} alt={name} onClick={(e) => e.stopPropagation()} />

          <div className="ms-lb-cap">
            {sideLabel(at, shots.length) && <strong>{sideLabel(at, shots.length)} · </strong>}
            {at + 1} / {shots.length}
          </div>
        </div>
      )}
    </div>
  );
}
