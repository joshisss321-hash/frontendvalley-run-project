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


  /* ── /stories ka hero ── */
  .sh { background: #171717; color: #fff; position: relative; overflow: hidden;
        padding: 74px 20px 68px; }
  .sh-photo { padding: 110px 20px 96px; }
  .sh-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .sh-veil { position: absolute; inset: 0;
    background: linear-gradient(100deg, rgba(23,23,23,.93) 0%, rgba(23,23,23,.72) 48%, rgba(23,23,23,.28) 100%); }
  .sh-in { position: relative; max-width: 1060px; margin: 0 auto; }
  .sh-kicker { font-size: 10.5px; font-weight: 800; letter-spacing: 2.6px;
               text-transform: uppercase; color: #f87171; }
  .sh-h1 { font-size: clamp(38px, 7vw, 76px); font-weight: 900; letter-spacing: -.045em;
           line-height: .98; margin: 14px 0 0; text-transform: uppercase; }
  .sh-red { color: #dc2626; }
  .sh-sub { font-size: clamp(16px, 2.1vw, 21px); font-weight: 700;
            color: rgba(255,255,255,.9); margin: 20px 0 0; }
  .sh-text { font-size: 15.5px; line-height: 1.78; color: rgba(255,255,255,.66);
             margin: 12px 0 0; max-width: 540px; }
  .sh-cta { display: flex; gap: 12px; margin-top: 30px; flex-wrap: wrap; }
  .st-btn-onhero { background: rgba(255,255,255,.1); color: #fff;
                   border: 1.5px solid rgba(255,255,255,.32); }
  .st-btn-onhero:hover { background: #fff; color: #171717; border-color: #fff; }

  /* ── section head + filters ── */
  .sx-head { margin-bottom: 24px; }
  .sx-h2 { font-size: clamp(22px, 3.1vw, 32px); font-weight: 900; letter-spacing: -.9px;
           line-height: 1.2; color: #1c1917; margin: 9px 0 0; max-width: 620px; }
  .sx-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 26px; }
  .sx-chip { padding: 9px 16px; border-radius: 100px; cursor: pointer; font-family: inherit;
             font-size: 12.5px; font-weight: 700; background: #fff; color: #57534e;
             border: 1.5px solid #e7e5e4; transition: all .18s; }
  .sx-chip:hover { border-color: #a8a29e; }
  .sx-chip-on { background: #dc2626; border-color: #dc2626; color: #fff; }
  .sx-n { opacity: .55; margin-left: 3px; }

  /* ── badi (featured) kahani ── */
  .st-card-feature { display: grid; grid-template-columns: 1.15fr 1fr; align-items: stretch; }
  .st-card-feature .st-card-img { aspect-ratio: auto; height: 100%; min-height: 300px; }
  .st-card-feature .st-card-body { padding: 34px 32px; display: flex;
                                   flex-direction: column; justify-content: center; }
  .st-card-feature .st-card-title { font-size: 27px; letter-spacing: -.7px; line-height: 1.18; }
  .st-card-feature .st-card-sum { font-size: 15px; margin-top: 11px; }
  .st-card-feature .st-read { margin-top: 18px; font-size: 13.5px; font-weight: 800; color: #dc2626; }

  /* ── khali page ── */
  .sx-empty { background: #171717; color: #fff; padding: 86px 20px 90px; text-align: center; }
  .sx-empty .st-wrap { max-width: 640px; }
  .sx-empty-h { font-size: clamp(26px, 4.2vw, 40px); font-weight: 900; letter-spacing: -1.3px;
                line-height: 1.12; margin: 12px 0 0; }
  .sx-empty-p { font-size: 15.5px; line-height: 1.78; color: rgba(255,255,255,.6);
                margin: 16px auto 0; max-width: 480px; }
  .sx-empty-foot { font-size: 12.5px; color: rgba(255,255,255,.36); margin-top: 18px; }

  /* ── aakhri bulawa ── */
  .sc-cta { background: #1c1917; color: #fff; padding: 76px 20px; text-align: center;
            margin-top: 60px; }
  .sc-cta-h { font-size: clamp(23px, 3.4vw, 36px); font-weight: 900; letter-spacing: -1.1px;
              line-height: 1.16; margin: 0; }
  .sc-cta-p { font-size: 15.5px; line-height: 1.78; color: rgba(255,255,255,.62);
              margin: 15px auto 26px; max-width: 520px; }

  @media (max-width: 760px) {
    .sh, .sh-photo { padding: 52px 16px 48px; }
    .st-card-feature { grid-template-columns: 1fr; }
    .st-card-feature .st-card-img { min-height: 0; aspect-ratio: 16/10; }
    .st-card-feature .st-card-body { padding: 20px 18px 22px; }
    .st-card-feature .st-card-title { font-size: 20px; letter-spacing: -.4px; }
    .sx-empty { padding: 58px 16px 62px; }
    .sc-cta { padding: 54px 16px; margin-top: 44px; }
  }

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

/** Category ka padhne layak naam — backend ki key se */
export const CATEGORY_LABEL = {
  running_journey:       "Running Journeys",
  fitness_transformation:"Fitness Transformation",
  beginner_story:        "Beginner Stories",
  walking_journey:       "Walking Journeys",
  cycling_journey:       "Cycling Journeys",
  overcoming_challenges: "Overcoming Challenges",
  personal_achievement:  "Personal Achievements",
};
