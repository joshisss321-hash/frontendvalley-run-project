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

  /* ═══════════════════════════════════════════
     EK KAHANI KA PAGE — magazine jaisa
     ═══════════════════════════════════════════ */

  /* Padhne ki chaudai. 720px par ek line mein 70-80 akshar aate
     hain — ussey zyada par aankh agli line dhoondhte waqt bhatakti
     hai, kam par baar-baar toot-ti hai. */
  .sd { max-width: 720px; margin: 0 auto; padding: 0 22px; }

  .sd-top { background: #171717; color: #fff; padding: 30px 22px 46px; }
  .sd-top-in { max-width: 720px; margin: 0 auto; }
  .sd-back { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px;
             color: rgba(255,255,255,.5); text-decoration: none; transition: color .18s; }
  .sd-back:hover { color: #fff; }
  .sd-kicker { display: block; font-size: 10px; font-weight: 800; letter-spacing: 2.4px;
               text-transform: uppercase; color: #f87171; margin-top: 26px; }
  .sd-h1 { font-size: clamp(27px, 5.2vw, 46px); font-weight: 900; letter-spacing: -1.4px;
           line-height: 1.1; margin: 13px 0 0; color: #fff; }
  .sd-lede { font-size: clamp(15px, 1.9vw, 17.5px); line-height: 1.68;
             color: rgba(255,255,255,.7); margin: 15px 0 0; }

  /* Lekhak ki patti */
  .sd-by { display: flex; align-items: center; gap: 13px; margin-top: 26px;
           padding-top: 20px; border-top: 1px solid rgba(255,255,255,.12); }
  .sd-ava { width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
            background: #dc2626; color: #fff; display: flex; align-items: center;
            justify-content: center; font-size: 16px; font-weight: 800; }
  .sd-by-name { font-size: 14.5px; font-weight: 800; color: #fff; }
  .sd-by-meta { display: flex; flex-wrap: wrap; gap: 4px 13px; margin-top: 4px;
                font-size: 12.2px; color: rgba(255,255,255,.55); }
  .sd-by-meta span, .sd-by-meta a { display: inline-flex; align-items: center; gap: 5px; }
  .sd-by-meta a { color: rgba(255,255,255,.75); text-decoration: none; }
  .sd-by-meta a:hover { color: #fff; text-decoration: underline; }
  .sd-ico { width: 13px; height: 13px; flex-shrink: 0; opacity: .75; }

  /* Pehli photo — asli naap par, kaate bina */
  .sd-lead { margin: -26px auto 0; max-width: 760px; padding: 0 22px; position: relative; }
  .sd-lead img { width: 100%; height: auto; display: block; border-radius: 16px;
                 box-shadow: 0 18px 44px rgba(28,25,23,.16); background: #ebe8e4;
                 animation: sd-rise .6s cubic-bezier(.2,.7,.3,1); }

  /* ⚠️ Na opacity 0 se shuru, na koi fill-mode.
     Pehle fill-mode "both" ke saath 0 se shuru hota tha, aur agar animation
     chali hi nahi (chhupa hua tab, purana browser, animation band)
     to tasveer 0 par hi atak jaati thi — yaani kahani ki sabse
     zaroori cheez gayab. Ab bura se bura ye hoga ki jhalak na dikhe;
     tasveer phir bhi poori dikhegi. */
  @keyframes sd-rise { from { opacity: .4; transform: translateY(12px); } }

  .sd-article { padding-top: 38px; padding-bottom: 8px; }
  .sd-body { font-size: 17.5px; line-height: 1.78; color: #3f3b38; margin: 0; }
  .sd-body p { margin: 0 0 25px; }
  .sd-body > p:last-child { margin-bottom: 0; }

  /* Ubhri hui line */
  .sd-quote { margin: 38px 0; padding: 4px 0 4px 24px; border-left: 4px solid #dc2626; }
  .sd-quote p { font-size: clamp(19px, 2.6vw, 24px); line-height: 1.5; font-weight: 700;
                letter-spacing: -.45px; color: #1c1917; margin: 0; }
  .sd-quote cite { display: block; font-size: 12px; font-style: normal; font-weight: 700;
                   letter-spacing: 1.4px; text-transform: uppercase;
                   color: #a8a29e; margin-top: 13px; }

  /* Baaki photos */
  .sd-gal { display: grid; gap: 14px; margin-top: 34px;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
  .sd-gal figure { margin: 0; }
  .sd-gal img { width: 100%; height: auto; display: block; border-radius: 13px; background: #ebe8e4; }
  .sd-gal figcaption { font-size: 12.2px; color: #a8a29e; margin-top: 8px; line-height: 1.5; }
  .sd-gal-one { grid-template-columns: 1fr; }

  /* Baantna */
  .sd-share { margin-top: 46px; padding: 24px; border-radius: 16px;
              background: #f7f7f5; border: 1px solid #ebe8e4; }
  .sd-share-h { font-size: 11px; font-weight: 800; letter-spacing: 2px;
                text-transform: uppercase; color: #dc2626; }
  .sd-share-p { font-size: 14.2px; line-height: 1.65; color: #57534e; margin: 9px 0 16px; }
  .sd-btns { display: flex; gap: 9px; flex-wrap: wrap; }
  .sd-b { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 44px; padding: 0 18px; border-radius: 100px; cursor: pointer;
          border: 1.5px solid #e2e0dc; background: #fff; color: #44403c;
          font-family: inherit; font-size: 13.5px; font-weight: 700;
          text-decoration: none; transition: transform .18s, border-color .18s, color .18s; }
  .sd-b:hover { transform: translateY(-2px); border-color: #a8a29e; }
  .sd-b-wa:hover { border-color: #25d366; color: #128c7e; }
  .sd-b-fb:hover { border-color: #1877f2; color: #1877f2; }
  .sd-b-ok { border-color: #86efac; color: #15803d; background: #f0fdf4; }
  .sd-b svg { width: 16px; height: 16px; flex-shrink: 0; }

  .sd-linkbox { margin-top: 14px; }
  .sd-linkbox label { display: block; font-size: 12px; color: #78716c; margin-bottom: 6px; }
  .sd-linkbox input { width: 100%; box-sizing: border-box; padding: 11px 13px; border-radius: 10px;
                      border: 1.5px solid #e2e0dc; background: #fff; font-family: inherit;
                      font-size: 13.5px; color: #1c1917; }

  .sd-takedown { margin-top: 20px; font-size: 11.8px; color: #b4afa9; }
  .sd-takedown button { background: none; border: none; padding: 0; cursor: pointer;
                        color: #b4afa9; font-size: 11.8px; font-family: inherit;
                        text-decoration: underline; }
  .sd-takedown button:hover { color: #78716c; }

  /* Aur kahaniyan */
  .sd-more { background: #f7f7f5; border-top: 1px solid #ebe8e4; margin-top: 54px;
             padding: 54px 22px 58px; }
  .sd-more-in { max-width: 1060px; margin: 0 auto; }
  .sd-more-h { font-size: clamp(21px, 3vw, 28px); font-weight: 900; letter-spacing: -.9px;
               color: #1c1917; margin: 9px 0 3px; }
  .sd-more-p { font-size: 14px; color: #78716c; margin: 0 0 24px; }
  .sd-read { margin-top: 13px; font-size: 12.5px; font-weight: 800; color: #dc2626;
             display: inline-flex; align-items: center; gap: 6px; }
  .st-card:hover .sd-read { gap: 10px; }
  .sd-read { transition: gap .2s; }

  @media (max-width: 760px) {
    .sd, .sd-top, .sd-lead { padding-left: 18px; padding-right: 18px; }
    .sd-top { padding-top: 22px; padding-bottom: 40px; }
    .sd-lead { margin-top: -22px; }
    .sd-lead img { border-radius: 13px; }
    .sd-article { padding-top: 28px; }
    .sd-body { font-size: 16.5px; line-height: 1.8; }
    .sd-body p { margin-bottom: 22px; }
    .sd-quote { margin: 30px 0; padding-left: 18px; border-left-width: 3px; }
    .sd-gal { grid-template-columns: 1fr; }
    .sd-share { padding: 19px 17px; border-radius: 14px; }
    .sd-b { flex: 1 1 calc(50% - 5px); padding: 0 12px; }
    .sd-more { padding: 42px 18px 46px; margin-top: 42px; }
  }
  @media (max-width: 370px) {
    .sd-b { flex: 1 1 100%; }
  }

  /* Badi screen par tasveer text ke column se thoda bahar nikalti
     hai — magazine mein yahi hota hai, aur 1440px par 716px ki photo
     chhoti lagti hai. Text ki chaudai nahi badalti. */
  @media (min-width: 1100px) {
    .sd-lead { max-width: 900px; }
  }

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
  /* Page ke andar ke anchor (jaise "Explore stories") par jhatka
     na lage. Ye sirf stories ke pages par lagta hai, poori site par
     nahi — kyunki ye CSS wahin inject hota hai. */
  html { scroll-behavior: smooth; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .st-card, .st-btn, .st-sh, .st-card-img img,
    .sd-b, .sd-back, .sd-read { transition: none !important; }
    .st-card:hover, .st-btn:hover, .st-sh:hover, .sd-b:hover { transform: none !important; }
    /* Tasveer dikhni chahiye, bas aate waqt uchhalni nahi chahiye */
    .sd-lead img { animation: none !important; }
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
