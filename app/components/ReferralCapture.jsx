"use client";

import { useEffect } from "react";

/**
 * Referral link "valleyrun.in?ref=SONU7K2M" par land karta hai, par
 * registration form baad mein khulta hai. Isliye code yahan localStorage
 * mein rakh dete hain aur checkout par apne aap bhar jaata hai.
 *
 * useSearchParams() jaan-boojh kar use nahi kiya — wo Suspense boundary
 * maangta hai. window.location root layout mein bilkul safe hai.
 */
const REF_KEY = "vrRef";
const REF_TTL_DAYS = 30;

export default function ReferralCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (!ref) return;

      const clean = ref.trim().toUpperCase().slice(0, 20);
      if (!/^[A-Z0-9]+$/.test(clean)) return;

      localStorage.setItem(
        REF_KEY,
        JSON.stringify({ code: clean, at: Date.now() })
      );
    } catch {
      /* private mode / storage blocked — referral bina bhi sab chalega */
    }
  }, []);

  return null;
}

/** Saved referral code — 30 din baad apne aap expire. */
export const getSavedReferral = () => {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return "";

    const { code, at } = JSON.parse(raw);
    const ageDays = (Date.now() - at) / (1000 * 60 * 60 * 24);

    if (ageDays > REF_TTL_DAYS) {
      localStorage.removeItem(REF_KEY);
      return "";
    }
    return code || "";
  } catch {
    return "";
  }
};
