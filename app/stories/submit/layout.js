const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.valleyrun.in";

/* Form khud client component hai, isliye metadata yahan se jaata hai —
   warna tab ka naam khali rehta hai aur share kiya hua link bejaan
   dikhta hai. */
export const metadata = {
  title: "Share your story — Beyond the Finish Line · Valley Run",
  description:
    "Tell us what it took. Share your running, walking or fitness journey with the Valley Run community.",
  alternates: { canonical: `${SITE}/stories/submit` },
  openGraph: {
    type: "website",
    url: `${SITE}/stories/submit`,
    siteName: "Valley Run",
    title: "Share your story — Beyond the Finish Line",
    description: "Your journey could inspire someone to take their first step.",
  },
};

export default function SubmitLayout({ children }) {
  return children;
}
