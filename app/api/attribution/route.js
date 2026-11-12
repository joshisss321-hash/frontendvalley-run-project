import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

/* ═══════════════════════════════════════════════════════════════
   Attribution cookie — yahan se, backend se NAHI.

   ⚠️ Ye hissa yahan hone ki ek saaf wajah hai: frontend
   www.valleyrun.in par hai aur backend onrender.com par. Backend ka
   set kiya hua cookie browser ke liye THIRD-PARTY hota, aur Safari,
   Firefox aur naya Chrome use chupchaap girra dete. Attribution
   kabhi kaam hi na karti aur pata bhi na chalta.

   Isliye cookie Next.js set karta hai (first-party), aur backend
   sirf uske andar ka token sign karta hai. Cookie HttpOnly hai, to
   koi script use padh nahi sakti; aur token signed hai, to koi use
   badal nahi sakta.
   ═══════════════════════════════════════════════════════════════ */

const COOKIE = "vr_attr";
const MAX_AGE = 30 * 24 * 60 * 60;          // 30 din
const API = process.env.NEXT_PUBLIC_API_URL;

export const dynamic = "force-dynamic";      // cookie wali cheez cache nahi hoti

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",                           // Instagram se aane par bhi chale
  secure: process.env.NODE_ENV === "production",  // localhost http par warna set hi nahi hoga
  path: "/",
  maxAge: MAX_AGE,
};

/** GET — register page ko token chahiye hota hai create-order ke saath. */
export async function GET() {
  try {
    const token = cookies().get(COOKIE)?.value || "";
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ token: "" });
  }
}

/** POST — link khulne par. Backend validate karta hai, hum cookie rakhte hain. */
export async function POST(request) {
  /* Kuch bhi ho jaye, visitor ko 200 — ye tracking hai. Agar ye
     endpoint kabhi error de, to bhi uska page bilkul theek chalta
     rahega. */
  const quiet = () => NextResponse.json({ ok: true, tracked: false });

  try {
    if (!API) return quiet();

    const body = await request.json().catch(() => ({}));
    const h = headers();

    /* Asli visitor ka IP aur browser aage bhejo — warna backend ko
       sirf Vercel ka IP dikhega aur duniya ke saare log ek hi
       "visitor" ginne jayenge. */
    const ip =
      (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
      h.get("x-real-ip") ||
      "";

    const res = await fetch(`${API}/api/track/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vr-ip": ip,
        "x-vr-ua": h.get("user-agent") || "",
      },
      body: JSON.stringify({
        ...body,
        token: cookies().get(COOKIE)?.value || "",
      }),
      cache: "no-store",
      // Backend thoda sa sust ho to visitor ka page latka nahi rehna chahiye
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return quiet();

    const data = await res.json().catch(() => ({}));
    if (!data?.token) return quiet();

    const out = NextResponse.json({ ok: true, tracked: true });
    out.cookies.set(COOKIE, data.token, cookieOptions);
    return out;
  } catch {
    return quiet();
  }
}
