"use client";

import { useEffect } from "react";

/* Har page par chalta hai aur dekhta hai ki ye visit kisi campaign
   se aayi hai ya nahi.

   ⚠️ Ye ReferralCapture se ALAG cheez hai, aur jaan-bujh kar alag
   rakhi gayi hai. ReferralCapture `?ref=` padhta hai — wo kisi
   runner ka referral code hai jo checkout par DISCOUNT deta hai.
   Ye `?via=` padhta hai — wo influencer ka code hai jo sirf GINTI
   karta hai. Agar dono ek hi parameter par hote, to influencer ka
   code checkout ke coupon box mein bhar jaata aur user ko "This code
   is not valid" ka error milta — theek us campaign par jo chal raha
   hota.

   Yahan localStorage nahi hai. Attribution ek HttpOnly cookie mein
   rehti hai jo server set karta hai, taaki koi script use padh ya
   badal na sake. */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/* Ek hi page load par do baar na chale (React StrictMode dev mein
   effects do baar chalata hai) */
let sentThisLoad = false;

export default function AttributionCapture() {
  useEffect(() => {
    if (sentThisLoad) return;
    sentThisLoad = true;

    try {
      const url = new URL(window.location.href);
      const q = url.searchParams;

      const via = (q.get("via") || "").trim().toUpperCase().slice(0, 24);
      const utm = {};
      UTM_KEYS.forEach((k) => {
        const v = q.get(k);
        if (v) utm[k] = v.trim().slice(0, 80);
      });

      const hasSignal = Boolean(via) || Object.keys(utm).length > 0;

      /* Bina kisi signal ke sirf tab server se baat karte hain jab
         abhi tak koi attribution bani hi nahi — taaki pehli visit
         "direct" darj ho jaye. Uske baad har page par ek bekaar
         request bhejne ka koi matlab nahi, aur aisi request first
         touch ko mita bhi sakti thi. */
      if (!hasSignal && document.cookie.includes("vr_attr_seen=1")) return;

      /* Landing page sirf path — query mein kabhi-kabhi log apna
         email ya naam bhi chipka dete hain, wo hum nahi rakhna
         chahte. */
      let eventSlug = "";
      const m = url.pathname.match(/^\/challenges\/([^/]+)/);
      if (m) eventSlug = decodeURIComponent(m[1]).slice(0, 120);

      const payload = JSON.stringify({
        via,
        ...utm,
        eventSlug,
        landing: url.pathname.slice(0, 200),
        referrer: (document.referrer || "").slice(0, 300),
      });

      const send = () =>
        fetch("/api/attribution", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).then((r) => r.json());

      send()
        .then((r) => {
          if (r?.tracked) {
            /* Ek saadharan, bina kisi raaz wala nishaan — sirf ye
               yaad rakhne ke liye ki ginti ho chuki hai. Asli
               attribution HttpOnly cookie mein hai jise JS chhoo
               bhi nahi sakti.

               ⚠️ Ye sirf KAMYAABI par lagta hai. Pehle har soorat
               mein lag jaata tha, to agar pehli koshish fail hoti
               (server so raha tha) to wo visitor dobara kabhi
               ginna hi nahi jaata. */
            document.cookie = "vr_attr_seen=1; path=/; max-age=2592000; samesite=lax";
            return;
          }

          /* Campaign ka link tha par ginti nahi hui — ek baar aur.
             Render thanda ho to pehli request uthne mein hi lag
             jaati hai. Sirf ek retry, aur sirf tab jab sach mein
             kuch ginne layak ho. */
          if (hasSignal) {
            setTimeout(() => {
              send()
                .then((r2) => {
                  if (r2?.tracked) {
                    document.cookie = "vr_attr_seen=1; path=/; max-age=2592000; samesite=lax";
                  }
                })
                .catch(() => {});
            }, 2500);
          }
        })
        .catch(() => {
          /* Network gaya, cookie band hai, ad-blocker ne roka — kuch
             bhi ho, visitor ko pata bhi nahi chalega. Tracking na
             hone se uska page rukna nahi chahiye. */
        });
    } catch {
      /* same */
    }
  }, []);

  return null;
}

/** Register page create-order ke saath ye token bhejta hai.
 *  Token opaque hai — client ise na padh sakta hai na badal sakta. */
export async function getAttributionToken() {
  try {
    const res = await fetch("/api/attribution", { cache: "no-store" });
    if (!res.ok) return "";
    const data = await res.json();
    return data?.token || "";
  } catch {
    return "";
  }
}
