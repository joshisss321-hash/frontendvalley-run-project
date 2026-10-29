/* Valley Store ka apna rang.
   Valley Run laal hai; store jaan-bujh kar alag — gehra jungle-hara,
   garam cream, mitti wala bhura aur halka sona. Mehsoos ho ki Himalaya
   se aaya hai, discount bazaar se nahi. */

export const C = {
  forest:      "#14532d",
  forestDeep:  "#0d3b20",
  forestLight: "#1f6b3b",
  moss:        "#3f7d52",

  cream:  "#faf7f0",
  sand:   "#f0e9dc",
  linen:  "#fffdf8",

  brown:  "#5c4733",
  gold:   "#b4883b",
  goldPale: "#e7d4a8",

  ink:    "#1c1917",
  body:   "#44403c",
  muted:  "#8b8378",
  line:   "#e7e2d8",

  white:  "#ffffff",
  danger: "#b91c1c",
};

/* Har store page ke liye ek hi CSS — font, buttons, grid, mobile rules.
   Har page apna likhta to chhota-chhota farak aata jaata. */
export const storeCss = `
  .vs { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        color: ${C.body}; background: ${C.cream}; }
  .vs *, .vs *::before, .vs *::after { box-sizing: border-box; }

  .vs-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vs-section { padding: 76px 0; }

  .vs-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2.4px;
                text-transform: uppercase; color: ${C.gold}; }
  .vs-h2 { font-size: 40px; font-weight: 800; letter-spacing: -1.2px;
           line-height: 1.12; color: ${C.ink}; margin: 10px 0 0; }
  .vs-lead { font-size: 15.5px; line-height: 1.75; color: ${C.body};
             margin-top: 14px; max-width: 620px; }

  .vs-btn { display: inline-flex; align-items: center; justify-content: center;
            gap: 9px; padding: 15px 32px; border-radius: 100px; border: none;
            font-family: inherit; font-weight: 700; font-size: 15px;
            cursor: pointer; text-decoration: none; transition: all .25s ease; }
  .vs-btn-primary { background: ${C.forest}; color: #fff; }
  .vs-btn-primary:hover { background: ${C.forestDeep}; transform: translateY(-2px);
                          box-shadow: 0 14px 32px rgba(20,83,45,.26); }
  .vs-btn-ghost { background: transparent; color: ${C.forest};
                  border: 1.5px solid ${C.forest}; }
  .vs-btn-ghost:hover { background: ${C.forest}; color: #fff; transform: translateY(-2px); }

  /* ── Product card ── */
  .vs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
  .vs-card { background: ${C.white}; border-radius: 16px; overflow: hidden;
             border: 1px solid ${C.line}; text-decoration: none; display: block;
             transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
  .vs-card:hover { transform: translateY(-5px); border-color: ${C.goldPale};
                   box-shadow: 0 18px 40px rgba(28,25,23,.10); }
  .vs-card-img { position: relative; aspect-ratio: 1/1; background: ${C.sand};
                 overflow: hidden; }
  .vs-card-img img { width: 100%; height: 100%; object-fit: cover; display: block;
                     transition: transform .5s cubic-bezier(.2,.7,.3,1); }
  .vs-card:hover .vs-card-img img { transform: scale(1.05); }
  .vs-card-body { padding: 15px 16px 17px; }

  .vs-badge { position: absolute; top: 11px; left: 11px; font-size: 10.5px;
              font-weight: 800; letter-spacing: .6px; text-transform: uppercase;
              padding: 5px 11px; border-radius: 100px; }

  .vs-cat { display: block; border-radius: 18px; overflow: hidden; position: relative;
            text-decoration: none; aspect-ratio: 4/3; background: ${C.sand};
            transition: transform .3s ease, box-shadow .3s ease; }
  .vs-cat:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(28,25,23,.14); }
  .vs-cat img { width: 100%; height: 100%; object-fit: cover; display: block;
                transition: transform .5s cubic-bezier(.2,.7,.3,1); }
  .vs-cat:hover img { transform: scale(1.06); }

  .vs-input { width: 100%; padding: 13px 16px; border-radius: 10px;
              border: 1.5px solid ${C.line}; background: ${C.white};
              font-family: inherit; font-size: 14.5px; color: ${C.ink}; outline: none; }
  .vs-input:focus { border-color: ${C.moss}; }

  @media (max-width: 1024px) { .vs-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 760px) {
    .vs-wrap { padding: 0 16px; }
    .vs-section { padding: 52px 0; }
    .vs-h2 { font-size: 27px; letter-spacing: -.5px; }
    .vs-grid { grid-template-columns: repeat(2, 1fr); gap: 13px; }
    .vs-btn { padding: 14px 26px; font-size: 14.5px; }
    .vs-card-body { padding: 12px 12px 14px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .vs-card, .vs-cat, .vs-btn, .vs-card-img img, .vs-cat img { transition: none !important; }
    .vs-card:hover, .vs-cat:hover, .vs-btn:hover { transform: none !important; }
  }
`;
