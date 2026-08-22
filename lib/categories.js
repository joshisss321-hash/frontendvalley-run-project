/**
 * Challenge categories — ek hi jagah.
 *
 * Pehle ye list register page ke andar hardcoded thi, aur pricing page
 * event.categories dikhata tha. Dono alag the, isliye log confuse hote the:
 * pricing par "5KM / 10KM / 21KM" dikhta, aur registration khol kar
 * Running/Walking/Cycling ke 13 option milte.
 *
 * Ab dono yahi se lete hain. Naya option jodna ho to sirf yahan jodiye —
 * dono pages par apne aap aa jayega.
 *
 * ⚠️ Yahan ka text hu-ba-hu wahi rehna chahiye jo DB mein save hota hai
 *    ("Running 5Km" — R aur K bade). Backend ka getNearestCategory isi
 *    text ko padhkar leaderboard ki category nikalta hai.
 */

export const CATEGORY_GROUPS = [
  {
    key: "running",
    label: "Running",
    icon: "🏃",
    options: [
      "Running 1600mtr",
      "Running 3.2Km",
      "Running 5Km",
      "Running 10Km",
      "Running 21Km",
    ],
  },
  {
    key: "walking",
    label: "Walking",
    icon: "🚶",
    options: [
      "Walking 2Km",
      "Walking 5Km",
      "Walking 10Km",
      "Walking 21Km",
    ],
  },
  {
    key: "cycling",
    label: "Cycling",
    icon: "🚴",
    options: [
      "Cycling 10Km",
      "Cycling 25Km",
      "Cycling 50Km",
      "Cycling 100Km",
    ],
  },
];

/** "Running 5Km" → "5KM" — chip par sirf doori dikhani hai, group upar likha hai */
export const distanceOf = (option) =>
  option.replace(/^(Running|Walking|Cycling)\s*/i, "").toUpperCase();

/** Saare options ek flat list mein */
export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.options);
