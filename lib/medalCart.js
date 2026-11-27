"use client";

import { useEffect, useState, useCallback } from "react";

/* Medal Store ka cart.

   Cart browser mein hi rehta hai (localStorage) — server par cart
   rakhne ke liye login chahiye hota, aur yahan login hai hi nahi.
   Isse ye bhi hota hai ki tab band karke wapas aane par cart bacha
   rehta hai.

   ⚠️ Jo daam yahan rakha hai wo sirf DIKHANE ke liye hai. Charge
   karte waqt server apne database se daam dobara nikalta hai —
   isliye koi localStorage mein ₹1 likh de to bhi kuch nahi hota. */

const KEY = "vrMedalCart";
const MAX_QTY = 10;      // ek tarah ke medal ki hadd
const MAX_LINES = 8;     // kitni alag tarah ke medal

/* Ek hi page par kai jagah cart dikhta hai (bar, page, button).
   Sab ko ek saath badalna hai, isliye chhota sa apna signal. */
const listeners = new Set();
const ping = () => listeners.forEach((fn) => fn());

const read = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter((i) => i?.slug && i?.qty > 0) : [];
  } catch {
    return [];      // private mode / kharab data — khali cart, koi error nahi
  }
};

const write = (list) => {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
  ping();
};

export const cartAdd = (medal, qty = 1) => {
  const list = read();
  const at = list.findIndex((i) => i.slug === medal.slug);

  if (at >= 0) {
    list[at].qty = Math.min(MAX_QTY, list[at].qty + qty);
    // Daam/photo taaza kar do — cart purana ho sakta hai
    list[at].price = medal.price;
    list[at].name = medal.name;
    list[at].image = medal.featuredImage || "";
    list[at].eventName = medal.eventName || "";
  } else {
    if (list.length >= MAX_LINES) return { ok: false, reason: `You can have up to ${MAX_LINES} different medals in one order.` };
    list.push({
      slug: medal.slug,
      name: medal.name,
      price: medal.price,
      image: medal.featuredImage || "",
      eventName: medal.eventName || "",
      qty: Math.min(MAX_QTY, qty),
    });
  }

  write(list);
  return { ok: true };
};

export const cartSetQty = (slug, qty) => {
  const n = Math.max(0, Math.min(MAX_QTY, Math.floor(Number(qty) || 0)));
  const list = read().map((i) => (i.slug === slug ? { ...i, qty: n } : i)).filter((i) => i.qty > 0);
  write(list);
};

export const cartRemove = (slug) => write(read().filter((i) => i.slug !== slug));
export const cartClear  = () => write([]);

/** Har jagah ek hi hisaab — page, cart aur checkout teeno yahi
 *  bulate hain. Server bhi bilkul yahi formula chalata hai
 *  (MedalSettings.bulkOff), isliye dikhaya hua daam aur kata hua
 *  daam kabhi alag nahi honge. */
export const priceCart = (items, settings = {}) => {
  const subtotal = items.reduce((s, i) => s + (Number(i.price) || 0) * i.qty, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const per  = Number(settings.perExtraOff) || 0;
  const raw  = per > 0 && totalQty > 1 ? per * (totalQty - 1) : 0;
  /* Total kabhi 0 ya minus nahi ho sakta — Razorpay us par charge
     hi nahi kar sakta. Server par bhi yahi rok hai. */
  const discount = Math.max(0, Math.min(raw, Math.max(0, subtotal - 1)));

  const after = subtotal - discount;
  const flat  = Number(settings.shippingFlat) || 0;
  const free  = Number(settings.freeOver) || 0;
  const shipping = flat <= 0 ? 0 : (free > 0 && after >= free ? 0 : flat);

  return { subtotal, totalQty, discount, shipping, total: after + shipping };
};

/** Agle medal par kitni aur bachat hogi — cart badhane ka seedha
 *  karan, bina kisi jhoothe "hurry" ke. */
export const nextSaving = (settings = {}) => Number(settings.perExtraOff) || 0;

export function useCart() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => setItems(read()), []);

  useEffect(() => {
    sync();
    setReady(true);
    listeners.add(sync);

    /* Doosre tab mein cart badla to yahan bhi — warna do tab khule
       hon to ek purana cart dikhata rehta hai. */
    const onStorage = (e) => { if (e.key === KEY) sync(); };
    window.addEventListener("storage", onStorage);

    return () => { listeners.delete(sync); window.removeEventListener("storage", onStorage); };
  }, [sync]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, count, ready };
}

export { MAX_QTY, MAX_LINES };
