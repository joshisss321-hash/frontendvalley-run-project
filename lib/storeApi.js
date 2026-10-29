const API = process.env.NEXT_PUBLIC_API_URL;

/* Valley Store ka public client — koi login nahi, sirf padhna.
   Admin wala client lib/api.js mein alag hai (wo token bhejta hai). */

const get = async (path) => {
  try {
    const res = await fetch(`${API}/api/store${path}`);

    /* Store abhi chalu nahi hua (STORE_ENABLED=false) — ye galti nahi hai,
       isliye page ko saaf jawab do, 500 ki paheli nahi. */
    if (res.status === 503) {
      return { success: false, disabled: true, message: "The store is not open yet." };
    }

    if (!res.ok) {
      return { success: false, message: `Server ne ${res.status} lautaya` };
    }
    return await res.json();
  } catch {
    return { success: false, message: "Could not reach the store. Please check your connection." };
  }
};

const qs = (params = {}) => {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") q.set(k, v);
  }
  const s = q.toString();
  return s ? `?${s}` : "";
};

export const storeAPI = {
  products:   (params = {}) => get(`/products${qs(params)}`),
  product:    (slug)        => get(`/products/${encodeURIComponent(slug)}`),
  categories: ()            => get(`/categories`),
  banners:    ()            => get(`/banners`),
  settings:   ()            => get(`/settings`),
};

/** "₹1,250" — har jagah ek hi tarah ka daam */
export const rupees = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
