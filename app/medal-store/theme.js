/* Medal Store ka CSS.

   Pahadi store jaan-bujh kar gehra hara hai — wo alag dukaan hai.
   Ye Valley Run ka apna laal aur charcoal rakhta hai, kyunki medal
   Valley Run ke hi hain aur log unhe usi bharose se khareedte hain.

   Namespace `ms-` — store ke `vs-` se kabhi nahi takrayega. */

export const C = {
  ink:    "#171717",
  inkSoft:"#44403c",
  muted:  "#78716c",
  faint:  "#a8a29e",
  line:   "#e7e5e4",
  paper:  "#faf9f7",
  red:    "#dc2626",
  redDark:"#b91c1c",
  gold:   "#b45309",
  green:  "#15803d",
};

export const medalCss = `
  .ms { background: ${C.paper}; color: ${C.inkSoft}; min-height: 100vh;
        font-family: 'Inter', system-ui, -apple-system, sans-serif; }
  .ms-wrap { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
  .ms-narrow { max-width: 760px; }

  /* ── Hero ── */
  .ms-hero { background: ${C.ink}; color: #fff; position: relative; overflow: hidden;
             padding: 54px 20px 56px; }
  .ms-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .22; }

  /* Halki si roshni — flat kaala dabba bejaan lagta hai */
  .ms-glow { position: absolute; top: -140px; right: -80px; width: 460px; height: 460px;
             border-radius: 50%; pointer-events: none;
             background: radial-gradient(circle, rgba(220,38,38,.26) 0%, rgba(220,38,38,0) 68%); }

  .ms-hero-in { position: relative; max-width: 1120px; margin: 0 auto; }
  .ms-hero-split .ms-hero-in { display: grid; grid-template-columns: 1fr 340px;
                               gap: 40px; align-items: center; }
  .ms-hero-text { min-width: 0; }

  .ms-kicker { font-size: 10.5px; font-weight: 800; letter-spacing: 2.4px;
               text-transform: uppercase; color: #f87171; }
  .ms-h1 { font-size: clamp(30px, 5vw, 50px); font-weight: 900; letter-spacing: -1.6px;
           line-height: 1.04; margin: 13px 0 0; }
  .ms-sub { font-size: clamp(14.5px, 1.9vw, 16.5px); line-height: 1.72;
            color: rgba(255,255,255,.66); margin: 15px 0 0; max-width: 520px; }

  .ms-chips { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 22px; }
  .ms-chip { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.82);
             background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.16);
             border-radius: 100px; padding: 7px 14px; }

  /* ── Asli medals, ek ke peeche ek ──
     Stock photo nahi lagayi — jo sach mein bik raha hai wahi upar
     dikhna chahiye. Teen se zyada daalne par bheed ho jaati hai. */
  .ms-stack { position: relative; height: 300px; }
  .ms-stack img { position: absolute; border-radius: 18px; object-fit: cover;
                  box-shadow: 0 26px 60px rgba(0,0,0,.5);
                  border: 1px solid rgba(255,255,255,.12); }
  .ms-stack-0 { width: 210px; height: 210px; top: 42px; left: 58px; z-index: 3;
                transform: rotate(-5deg); }
  .ms-stack-1 { width: 160px; height: 160px; top: 6px; left: 2px; z-index: 2;
                transform: rotate(7deg); opacity: .9; }
  .ms-stack-2 { width: 140px; height: 140px; bottom: 2px; right: 4px; z-index: 1;
                transform: rotate(-11deg); opacity: .8; }

  /* ── Do raaste: apne liye / kisi aur ke liye ──
     Barabar chaudai, barabar vazan — kyunki dono barabar sahi hain. */
  .ms-two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 30px 0 38px; }
  .ms-two-card { background: #fff; border: 1px solid ${C.line}; border-radius: 16px;
                 padding: 20px 22px; }
  .ms-two-i { font-size: 23px; line-height: 1.2; }
  .ms-two-t { font-size: 15.5px; font-weight: 800; color: ${C.ink}; margin-top: 9px; }
  .ms-two-x { font-size: 13.2px; line-height: 1.68; color: ${C.muted}; margin-top: 6px; }

  /* ── Grid ka sir ── */
  .ms-head { display: flex; justify-content: space-between; align-items: baseline;
             flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .ms-head-h { font-size: 21px; font-weight: 900; color: ${C.ink};
               letter-spacing: -.6px; margin: 0; }
  .ms-head-x { font-size: 13px; color: ${C.muted}; }

  /* ── Grid ── */
  .ms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }

  .ms-card { background: #fff; border: 1px solid ${C.line}; border-radius: 16px;
             overflow: hidden; text-decoration: none; color: inherit; display: block;
             transition: transform .22s, box-shadow .22s, border-color .22s; }
  .ms-card:hover { transform: translateY(-4px); border-color: #fca5a5;
                   box-shadow: 0 16px 34px rgba(28,25,23,.1); }
  .ms-card-img { aspect-ratio: 1/1; background: #f1efec; position: relative; overflow: hidden; }
  .ms-card-img img { width: 100%; height: 100%; object-fit: cover; display: block;
                     transition: transform .4s cubic-bezier(.2,.7,.3,1); }
  .ms-card:hover .ms-card-img img { transform: scale(1.04); }
  .ms-card-body { padding: 15px 16px 17px; }
  .ms-noimg { display: flex; align-items: center; justify-content: center;
              height: 100%; font-size: 40px;
              background: linear-gradient(140deg, #f5f3f0, #e9e5e0); }
  .ms-card-go { display: inline-block; font-size: 12px; font-weight: 800;
                color: ${C.red}; margin-top: 11px; transition: transform .2s; }
  .ms-card:hover .ms-card-go { transform: translateX(3px); }
  .ms-event { font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px;
              text-transform: uppercase; color: ${C.gold}; }
  .ms-name { font-size: 16px; font-weight: 800; letter-spacing: -.3px;
             line-height: 1.3; color: ${C.ink}; margin-top: 6px; }
  .ms-price { display: flex; align-items: baseline; gap: 8px; margin-top: 9px; }
  .ms-price b { font-size: 18px; font-weight: 900; color: ${C.ink}; }
  .ms-mrp { font-size: 13px; color: ${C.faint}; text-decoration: line-through; }
  .ms-off { font-size: 11px; font-weight: 800; color: ${C.green}; }

  .ms-tag { position: absolute; top: 10px; left: 10px; font-size: 10px; font-weight: 800;
            letter-spacing: .8px; text-transform: uppercase; padding: 5px 10px;
            border-radius: 100px; background: ${C.red}; color: #fff; }

  /* ── Buttons ── */
  .ms-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            min-height: 50px; padding: 0 28px; border-radius: 100px; border: none;
            cursor: pointer; font-family: inherit; font-weight: 800; font-size: 15px;
            text-decoration: none; background: ${C.red}; color: #fff; transition: all .2s; }
  .ms-btn:hover:not(:disabled) { background: ${C.redDark}; transform: translateY(-2px); }
  .ms-btn:disabled { background: #d6d3d1; cursor: not-allowed; transform: none; }
  .ms-btn-ghost { background: #fff; color: ${C.ink}; border: 1.5px solid ${C.line}; }
  .ms-btn-ghost:hover:not(:disabled) { background: ${C.ink}; color: #fff; border-color: ${C.ink}; }

  /* ── Detail ── */
  .ms-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; align-items: start; }
  .ms-shot { background: #fff; border: 1px solid ${C.line}; border-radius: 18px;
             overflow: hidden; aspect-ratio: 1/1; cursor: zoom-in; }
  .ms-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ms-thumbs { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
  .ms-thumb { width: 74px; height: 74px; border-radius: 11px; overflow: hidden;
              cursor: pointer; background: #fff; padding: 0;
              border: 2.5px solid transparent; transition: border-color .15s; }
  .ms-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ms-thumb-on { border-color: ${C.red}; }
  .ms-side-label { font-size: 10px; font-weight: 800; letter-spacing: 1px;
                   text-transform: uppercase; color: ${C.faint}; text-align: center; margin-top: 4px; }

  .ms-title { font-size: clamp(23px, 3.4vw, 32px); font-weight: 900; letter-spacing: -1px;
              line-height: 1.15; color: ${C.ink}; margin: 10px 0 0; }
  .ms-big-price { font-size: 30px; font-weight: 900; color: ${C.ink}; }
  .ms-desc { font-size: 15px; line-height: 1.75; color: ${C.inkSoft}; white-space: pre-line; }

  .ms-left { display: inline-block; font-size: 12.5px; font-weight: 700;
             background: #fef2f2; color: ${C.redDark}; border-radius: 100px; padding: 5px 13px; }
  .ms-instock { display: inline-block; font-size: 12.5px; font-weight: 700;
                background: #f0fdf4; color: ${C.green}; border-radius: 100px; padding: 5px 13px; }

  /* ── Quantity ── */
  .ms-qty { display: inline-flex; align-items: center; border: 1.5px solid ${C.line};
            border-radius: 100px; background: #fff; overflow: hidden; }
  .ms-qty button { width: 46px; height: 46px; border: none; background: none; cursor: pointer;
                   font-size: 21px; color: ${C.ink}; font-family: inherit; line-height: 1; }
  .ms-qty button:disabled { color: ${C.line}; cursor: not-allowed; }
  .ms-qty span { min-width: 44px; text-align: center; font-weight: 800; font-size: 16px; }

  /* ── Form ── */
  .ms-input { width: 100%; padding: 13px 15px; border-radius: 11px; border: 1.5px solid ${C.line};
              background: #fff; font-family: inherit; font-size: 15px; color: ${C.ink};
              outline: none; box-sizing: border-box; }
  .ms-input:focus { border-color: ${C.red}; }
  .ms-label { display: block; font-size: 12.5px; font-weight: 700; color: ${C.inkSoft}; margin-bottom: 6px; }
  .ms-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ms-field { margin-bottom: 15px; }

  .ms-box { background: #fff; border: 1px solid ${C.line}; border-radius: 16px; padding: 22px; }
  .ms-err { background: #fef2f2; border: 1px solid #fecaca; border-radius: 11px;
            padding: 13px 15px; font-size: 13.5px; color: #991b1b; line-height: 1.6; }
  .ms-note { background: #fffbeb; border: 1px solid #fde68a; border-radius: 11px;
             padding: 12px 14px; font-size: 12.8px; color: #92400e; line-height: 1.6; }

  /* ── Lightbox ── */
  .ms-lb { position: fixed; inset: 0; z-index: 1000; background: rgba(23,23,23,.93);
           backdrop-filter: blur(12px); display: flex; align-items: center;
           justify-content: center; padding: 20px; }
  .ms-lb img { max-width: 92vw; max-height: 82vh; border-radius: 12px; display: block; }
  .ms-lb-x { position: absolute; top: 18px; right: 20px; width: 42px; height: 42px;
             border-radius: 50%; border: none; cursor: pointer; font-size: 23px;
             background: rgba(255,255,255,.14); color: #fff; font-family: inherit; }
  .ms-lb-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px;
               border-radius: 50%; border: none; cursor: pointer; font-size: 25px;
               background: rgba(255,255,255,.14); color: #fff; font-family: inherit; }
  .ms-lb-cap { position: absolute; bottom: 22px; left: 0; right: 0; text-align: center;
               color: rgba(255,255,255,.75); font-size: 13px; }

  @media (max-width: 860px) {
    .ms-detail { grid-template-columns: 1fr; gap: 26px; }
  }
  @media (max-width: 940px) {
    /* Stack ke liye jagah nahi bachti — medals waise bhi neeche
       grid mein poore dikhte hain */
    .ms-hero-split .ms-hero-in { grid-template-columns: 1fr; gap: 0; }
    .ms-stack { display: none; }
  }
  @media (max-width: 760px) {
    .ms-two { grid-template-columns: 1fr; gap: 11px; margin: 24px 0 30px; }
    .ms-two-card { padding: 16px 17px; }
    .ms-gift { padding: 32px 22px; margin-top: 40px; border-radius: 16px; }
    .ms-glow { width: 300px; height: 300px; top: -110px; right: -70px; }
  }
  @media (max-width: 620px) {
    .ms-wrap { padding: 0 16px; }
    .ms-hero { padding: 38px 16px 36px; }
    .ms-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 13px; }
    .ms-card-body { padding: 11px 12px 13px; }
    .ms-name { font-size: 14px; }
    .ms-price b { font-size: 16px; }
    .ms-row { grid-template-columns: 1fr; gap: 0; }
    .ms-box { padding: 16px; }
    /* Phone par 16px se chhota input zoom kara deta hai */
    .ms-input { font-size: 16px; }
    .ms-btn { width: 100%; }
    .ms-lb-nav { width: 40px; height: 40px; font-size: 21px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ms-card, .ms-btn, .ms-card-img img { transition: none !important; }
    .ms-card:hover, .ms-btn:hover { transform: none !important; }
  }
`;

/* Cart ka CSS — alag se jodda gaya taaki upar wala hissa waisa hi
   rahe jaise tha. */
export const cartCss = `
  /* ── Neeche chipki patti ── */
  .ms-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
            background: ${C.ink}; color: #fff;
            box-shadow: 0 -8px 28px rgba(0,0,0,.26);
            padding-bottom: env(safe-area-inset-bottom); }
  .ms-bar-in { max-width: 1120px; margin: 0 auto; padding: 12px 20px;
               display: flex; align-items: center; gap: 14px; justify-content: space-between; }
  .ms-bar-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .ms-bar-n { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
              background: ${C.red}; color: #fff; font-weight: 900; font-size: 14px;
              display: flex; align-items: center; justify-content: center; }
  .ms-bar-t { font-size: 14px; font-weight: 800; }
  .ms-bar-save { color: #4ade80; font-weight: 800; }
  .ms-bar-x { font-size: 11.8px; color: rgba(255,255,255,.58); margin-top: 2px; }
  .ms-bar-btn { background: ${C.red}; color: #fff; border: none; border-radius: 100px;
                padding: 0 20px; min-height: 44px; font-family: inherit; font-weight: 800;
                font-size: 14px; cursor: pointer; white-space: nowrap; transition: background .18s; }
  .ms-bar-btn:hover { background: ${C.redDark}; }

  /* Patti page ke aakhri hisse ko na dhake */
  .ms-haspad { padding-bottom: 92px; }

  /* ── Cart ki line ── */
  .ms-line { display: flex; gap: 14px; padding: 16px; align-items: flex-start; }
  .ms-line-img { width: 84px; height: 84px; border-radius: 12px; object-fit: cover;
                 flex-shrink: 0; background: #f1efec; }
  .ms-line-mid { flex: 1; min-width: 0; }
  .ms-line-name { display: block; font-size: 15px; font-weight: 800; color: ${C.ink};
                  text-decoration: none; margin-top: 3px; }
  .ms-line-name:hover { color: ${C.red}; }
  .ms-line-each { font-size: 12.5px; color: ${C.muted}; margin-top: 3px; }
  .ms-line-ctl { display: flex; align-items: center; gap: 12px; margin-top: 10px; flex-wrap: wrap; }
  .ms-line-x { background: none; border: none; padding: 0; cursor: pointer; font-family: inherit;
               font-size: 12.5px; color: ${C.faint}; text-decoration: underline; }
  .ms-line-x:hover { color: ${C.red}; }
  .ms-line-sum { font-size: 15px; font-weight: 900; color: ${C.ink}; white-space: nowrap; }

  .ms-qty-sm button { width: 36px; height: 36px; font-size: 18px; }
  .ms-qty-sm span { min-width: 34px; font-size: 14px; }

  /* ── Bachat ki patti ── */
  .ms-save { display: flex; gap: 11px; align-items: flex-start; margin-top: 14px;
             background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px;
             padding: 13px 15px; font-size: 13.2px; line-height: 1.6; color: #166534; }

  /* ── Add to cart ── */
  .ms-add { width: 100%; min-height: 44px; border-radius: 100px; cursor: pointer;
            font-family: inherit; font-weight: 800; font-size: 13.5px;
            background: #fff; color: ${C.ink}; border: 1.5px solid ${C.line};
            transition: all .18s; margin-top: 11px; }
  .ms-add:hover { border-color: ${C.ink}; background: ${C.ink}; color: #fff; }
  .ms-add-in { background: #f0fdf4; border-color: #86efac; color: #15803d; }
  .ms-add-in:hover { background: #f0fdf4; border-color: #86efac; color: #15803d; }

  /* ── Chhoot ki seedhi ──
     Hara rang jaan-boojh kar: laal "khatra/jaldi karo" bolta hai,
     hara "bach gaya". Yahan baat bachat ki hai. */
  .ms-lad { background: linear-gradient(180deg, #f0fdf4, #fff);
            border: 1.5px solid #bbf7d0; border-radius: 16px;
            padding: 16px 17px; margin-top: 14px; }

  .ms-lad-top { display: flex; gap: 12px; align-items: flex-start; }
  .ms-lad-medal { font-size: 21px; line-height: 1.2; flex-shrink: 0; }
  .ms-lad-now { font-size: 16px; font-weight: 900; color: #15803d;
                letter-spacing: -.3px; }
  .ms-lad-next { font-size: 13px; line-height: 1.6; color: #3f6212; margin-top: 3px; }
  .ms-lad-next strong { color: #15803d; }

  .ms-lad-steps { display: grid; grid-template-columns: repeat(4, 1fr);
                  gap: 8px; margin-top: 14px; }
  .ms-lad-step { background: #fff; border: 1.5px solid #e7e5e4; border-radius: 11px;
                 padding: 9px 7px; text-align: center; position: relative;
                 transition: all .2s; }
  .ms-lad-qty { font-size: 10.5px; font-weight: 800; letter-spacing: .4px;
                text-transform: uppercase; color: #a8a29e; }
  .ms-lad-off { font-size: 14.5px; font-weight: 900; color: #57534e; margin-top: 3px; }

  /* Jo kadam paar ho gaye */
  .ms-lad-done { background: #dcfce7; border-color: #86efac; }
  .ms-lad-done .ms-lad-qty { color: #3f6212; }
  .ms-lad-done .ms-lad-off { color: #15803d; }

  /* Jahan abhi khade ho */
  .ms-lad-here { border-color: #15803d; border-width: 2px;
                 box-shadow: 0 3px 10px rgba(21,128,61,.14); }
  .ms-lad-you { position: absolute; left: 50%; transform: translateX(-50%);
                bottom: -8px; background: #15803d; color: #fff;
                font-size: 8.5px; font-weight: 800; letter-spacing: .5px;
                text-transform: uppercase; padding: 2px 7px; border-radius: 100px;
                white-space: nowrap; }

  .ms-lad-link { display: block; text-align: center; margin-top: 16px;
                 font-size: 13.5px; font-weight: 800; color: #15803d;
                 text-decoration: none; background: #fff;
                 border: 1.5px solid #86efac; border-radius: 100px;
                 padding: 11px 16px; transition: all .18s; }
  .ms-lad-link:hover { background: #15803d; color: #fff; border-color: #15803d; }

  .ms-lad-note { font-size: 11.5px; color: #78716c; text-align: center;
                 margin-top: 11px; }

  /* Checkout par bachat ka badge — yahan koi suggestion nahi,
     bas ye ki paisa bacha hai */
  .ms-saved { background: #dcfce7; border: 1.5px solid #86efac;
              border-radius: 11px; padding: 11px 14px; margin-bottom: 14px;
              font-size: 13.5px; color: #15803d; text-align: center; }
  .ms-saved strong { font-weight: 900; }

  .ms-lad-c { padding: 13px 14px; }
  .ms-lad-c .ms-lad-now { font-size: 14.5px; }
  .ms-lad-c .ms-lad-steps { margin-top: 11px; gap: 6px; }
  .ms-lad-c .ms-lad-note { display: none; }

  @media (max-width: 620px) {
    .ms-bar-in { padding: 10px 14px; gap: 10px; }
    .ms-bar-x { display: none; }
    .ms-bar-btn { padding: 0 15px; font-size: 13px; }
    .ms-line { padding: 13px; gap: 11px; }
    .ms-line-img { width: 68px; height: 68px; }
    .ms-line-sum { font-size: 14px; }

    /* Chaar kadam 375px par bhi ghus jaate hain, bas chhote
       akshar ke saath — todkar do line mein karne se seedhi
       seedhi nahi lagti */
    .ms-lad { padding: 14px; }
    .ms-lad-steps { gap: 5px; }
    .ms-lad-step { padding: 8px 3px; border-radius: 9px; }
    .ms-lad-qty { font-size: 9px; letter-spacing: 0; }
    .ms-lad-off { font-size: 12.5px; }
    .ms-lad-you { font-size: 8px; padding: 2px 5px; }
    .ms-lad-now { font-size: 15px; }
    .ms-lad-next { font-size: 12.5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ms-lad-step, .ms-lad-link { transition: none !important; }
  }
`;
