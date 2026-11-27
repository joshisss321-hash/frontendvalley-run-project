"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { medalAPI, rupees } from "@/lib/medalApi";
import { useCart, priceCart, nextSaving } from "@/lib/medalCart";

/* Neeche chipki hui cart ki patti.

   Drawer ki jagah ye isliye: phone par drawer poora page dhak leta
   hai aur log usme phans jaate hain. Patti hamesha dikhti hai, kuch
   dhakti nahi, aur ek tap mein cart khul jaata hai.

   Cart khali ho ya cart/checkout page khula ho to kuch nahi dikhta. */

export default function CartBar() {
  const router = useRouter();
  const path = usePathname();
  const { items, count, ready } = useCart();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    medalAPI.settings().then((s) => setSettings(s?.settings || {}));
  }, []);

  if (!ready || count === 0) return null;
  if (path?.startsWith("/medal-store/cart") || path?.startsWith("/medal-store/checkout")) return null;

  const m = priceCart(items, settings);
  const per = nextSaving(settings);

  return (
    <>
      {/* Patti fixed hai, isliye page ka aakhri hissa uske neeche
          chhup jaata hai — khaas kar footer. Utni hi oonchai ka
          khaali tukda, taaki kuch bhi dhake nahi. */}
      <div style={{ height: 64 }} aria-hidden="true" />

    <div className="ms-bar">
      <div className="ms-bar-in">
        <div className="ms-bar-left">
          <span className="ms-bar-n">{count}</span>
          <div style={{ minWidth: 0 }}>
            <div className="ms-bar-t">
              {count === 1 ? "1 medal" : `${count} medals`}
              {m.discount > 0 && <span className="ms-bar-save"> · {rupees(m.discount)} off</span>}
            </div>
            {/* Agle medal par kitna bachega — seedhi baat, koi
                jhootha "hurry up" nahi */}
            {per > 0 && (
              <div className="ms-bar-x">
                {count === 1
                  ? `Add one more and save ${rupees(per)}`
                  : `${rupees(per)} more off with each extra medal`}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => router.push("/medal-store/cart")} className="ms-bar-btn">
          {rupees(m.total)} · View cart
        </button>
      </div>
    </div>
    </>
  );
}
