/**
 * Admin form ki tareekh → us din raat 11:59:59 (India time).
 *
 * <input type="date"> sirf "2026-09-11" deta hai. Seedha save karne par
 * wo UTC ki aadhi raat ban jaata tha = India mein SUBAH 5:30 — yaani
 * registration aadhi raat ke 5.5 ghante baad band hoti thi, aur
 * submission ki "last date" ke din subah hi khatam ho jaati thi.
 *
 * Ab chuni hui tareekh ka matlab: us din ke aakhir tak (11:59:59 PM IST).
 */
export const endOfDayIST = (ymd) => {
  if (!ymd) return null;

  // Poori ISO date pehle se ho to chhed-chhaad nahi
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(ymd))) return ymd;

  return `${ymd}T23:59:59+05:30`;
};

/** Save ki hui date ko wapas date-box ke liye "YYYY-MM-DD" (India time mein) */
export const toDateInputIST = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  // en-CA ka format hi YYYY-MM-DD hai
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
};
