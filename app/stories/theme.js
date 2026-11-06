/* Stories ke pages ka saajha CSS — Valley Run ka laal, par padhne ke
   liye shaant. Kahani padhne wala page chamakdar nahi hona chahiye. */

export const storyCss = `
  .st { background: #faf9f7; color: #292524;
        font-family: 'Inter', system-ui, -apple-system, sans-serif; min-height: 100vh; }
  .st-wrap { max-width: 720px; margin: 0 auto; padding: 0 20px; }
  .st-wide { max-width: 1060px; }

  .st-hero { background: #1c1917; color: #fff; padding: 42px 20px 38px; }
  .st-hero-in { max-width: 720px; margin: 0 auto; }
  .st-wide .st-hero-in { max-width: 1060px; }
  .st-eyebrow { font-size: 10.5px; font-weight: 800; letter-spacing: 2.2px;
                text-transform: uppercase; color: #f87171; }
  .st-h1 { font-size: clamp(26px, 4.6vw, 42px); font-weight: 900; letter-spacing: -1.2px;
           line-height: 1.12; margin: 12px 0 0; color: #fff; }
  .st-lede { font-size: 15.5px; line-height: 1.7; color: rgba(255,255,255,.72); margin: 14px 0 0; }
  .st-meta { display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
             font-size: 12.5px; color: rgba(255,255,255,.6); margin-top: 18px; }

  .st-badge { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 1.1px;
              text-transform: uppercase; padding: 5px 12px; border-radius: 100px;
              background: #dc2626; color: #fff; }
  .st-badge-soft { background: rgba(255,255,255,.14); color: #fff; }

  /* Kahani ka matn — lamba text padhne layak */
  .st-body { font-size: 17px; line-height: 1.85; color: #44403c; white-space: pre-line;
             margin: 0; }
  .st-body p { margin: 0 0 22px; }

  .st-photo { width: 100%; border-radius: 16px; display: block; }
  .st-photos { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
               gap: 12px; margin-top: 26px; }

  /* Share */
  .st-share { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 10px; }
  .st-sh { display: inline-flex; align-items: center; gap: 7px; padding: 10px 17px;
           border-radius: 100px; border: 1.5px solid #e7e5e4; background: #fff;
           color: #44403c; font-size: 13px; font-weight: 700; cursor: pointer;
           font-family: inherit; text-decoration: none; transition: all .2s; }
  .st-sh:hover { border-color: #a8a29e; transform: translateY(-1px); }
  .st-sh-wa:hover { border-color: #25d366; color: #128c7e; }
  .st-sh-fb:hover { border-color: #1877f2; color: #1877f2; }

  /* Card */
  .st-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(290px,1fr)); gap: 20px; }
  .st-card { background: #fff; border: 1px solid #ebe8e4; border-radius: 18px;
             overflow: hidden; text-decoration: none; display: block; color: inherit;
             transition: transform .25s, box-shadow .25s, border-color .25s; }
  .st-card:hover { transform: translateY(-4px); border-color: #fca5a5;
                   box-shadow: 0 16px 36px rgba(28,25,23,.1); }
  .st-card-img { aspect-ratio: 16/10; background: #f5f5f4; overflow: hidden; position: relative; }
  .st-card-img img { width: 100%; height: 100%; object-fit: cover; display: block;
                     transition: transform .45s cubic-bezier(.2,.7,.3,1); }
  .st-card:hover .st-card-img img { transform: scale(1.05); }
  .st-card-body { padding: 16px 17px 18px; }
  .st-card-title { font-size: 17px; font-weight: 800; letter-spacing: -.3px;
                   line-height: 1.3; color: #1c1917; }
  .st-card-sum { font-size: 13.5px; line-height: 1.6; color: #78716c; margin-top: 7px; }
  .st-card-by { font-size: 12px; color: #a8a29e; margin-top: 11px; }

  .st-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 14px 28px; border-radius: 100px; border: none; cursor: pointer;
            font-family: inherit; font-weight: 700; font-size: 14.5px; text-decoration: none;
            background: #dc2626; color: #fff; transition: all .22s; }
  .st-btn:hover { background: #b91c1c; transform: translateY(-2px); }
  .st-btn-ghost { background: transparent; color: #1c1917; border: 1.5px solid #d6d3d1; }
  .st-btn-ghost:hover { background: #1c1917; color: #fff; border-color: #1c1917; }
  .st-btn:disabled { background: #d6d3d1; cursor: not-allowed; transform: none; }

  .st-input { width: 100%; padding: 13px 15px; border-radius: 11px; border: 1.5px solid #e7e5e4;
              background: #fff; font-family: inherit; font-size: 15px; color: #1c1917;
              outline: none; box-sizing: border-box; }
  .st-input:focus { border-color: #dc2626; }
  .st-label { display: block; font-size: 13px; font-weight: 700; color: #44403c; margin-bottom: 6px; }

  .st-empty { background: #fff; border: 1px solid #ebe8e4; border-radius: 18px;
              padding: 58px 22px; text-align: center; }

  @media (max-width: 640px) {
    .st-wrap { padding: 0 16px; }
    .st-hero { padding: 30px 16px 28px; }
    .st-body { font-size: 16px; line-height: 1.8; }
    .st-grid { grid-template-columns: 1fr; gap: 14px; }
    .st-sh { padding: 9px 14px; font-size: 12.5px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .st-card, .st-btn, .st-sh, .st-card-img img { transition: none !important; }
    .st-card:hover, .st-btn:hover, .st-sh:hover { transform: none !important; }
  }
`;

/** Badge ka padhne layak naam */
export const badgeLabel = (b) => ({
  featured: "Valley Run Featured Story",
  story_of_week: "Story of the Week",
  community_inspiration: "Community Inspiration",
  journey_of_month: "Journey of the Month",
}[b] || "");
