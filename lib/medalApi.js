const API = process.env.NEXT_PUBLIC_API_URL;

/* Medal Store ka public client. Login nahi, token nahi — sirf
   padhne aur order karne ke liye.

   Pahadi store ke storeApi.js jaisa hi tareeka, par apna: dono
   alag switch ke peeche hain, aur ek band ho to doosra chalna
   chahiye. */

const shape = async (res) => {
  if (res.status === 503) {
    return { success: false, disabled: true, message: "The medal store is not open yet." };
  }
  if (res.status === 410) {
    // Bik chuka — page tha to sahi, isliye 404 se alag
    const body = await res.json().catch(() => ({}));
    return { success: false, soldOut: true, ...body };
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { success: false, status: res.status, message: body.message || `Server returned ${res.status}` };
  }
  try { return await res.json(); }
  catch { return { success: false, message: "Could not read the server's reply" }; }
};

const go = async (path, options) => {
  try {
    return await shape(await fetch(`${API}/api/medal-store${path}`, options));
  } catch {
    return { success: false, message: "Could not reach the store. Please check your connection." };
  }
};

export const medalAPI = {
  list:     () => go("/products"),
  one:      (slug) => go(`/products/${encodeURIComponent(slug)}`),
  settings: () => go("/settings"),

  checkout: (data) =>
    go("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  verify: (data) =>
    go("/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  /* User ne Razorpay ka window band kar diya — rok turant hatao,
     warna wo medal 20 minute tak bina wajah atka rehta. */
  cancel: (razorpay_order_id) =>
    go("/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ razorpay_order_id }),
    }),

  order: (orderNo, email) =>
    go(`/order/${encodeURIComponent(orderNo)}?email=${encodeURIComponent(email)}`),
};

export const rupees = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
