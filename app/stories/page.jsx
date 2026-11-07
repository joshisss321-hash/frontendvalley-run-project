import Link from "next/link";
import { storyCss } from "./theme";
import StoriesBrowser from "./StoriesBrowser";

/* Server component — kahaniyan Google ko bhi dikhni chahiye, aur hero
   ka content JavaScript ke peeche chhupana SEO ke liye bekaar hai. */

const API  = process.env.NEXT_PUBLIC_API_URL;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.valleyrun.in";

export const metadata = {
  title: "Beyond the Finish Line — Runner Stories · Valley Run",
  description:
    "Real stories from Valley Run runners — what it took to start, to keep going, and to finish. Every journey matters.",
  alternates: { canonical: `${SITE}/stories` },
  openGraph: {
    type: "website",
    url: `${SITE}/stories`,
    siteName: "Valley Run",
    title: "Beyond the Finish Line — Runner Stories",
    description: "Real people. Real journeys. Real inspiration.",
  },
};

async function load() {
  const grab = async (path, fallback) => {
    try {
      const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
      if (!res.ok) return fallback;
      return await res.json();
    } catch {
      return fallback;
    }
  };

  const [list, cfg] = await Promise.all([
    grab("/api/stories?limit=24", { stories: [], categories: [] }),
    grab("/api/stories/settings", { settings: {} }),
  ]);

  return { list, settings: cfg.settings || {} };
}

export default async function StoriesPage() {
  const { list, settings } = await load();
  const stories = list.stories || [];
  const heroImage = settings.pageHeroImage || "";

  /* Heading admin ke haath mein. "|" jahan hai wahan nayi line shuru
     hoti hai aur baaki hissa laal ho jaata hai. */
  const [headTop, headRed] = (settings.pageHeroHeading || "Beyond the | Finish Line.")
    .split("|")
    .map((x) => x.trim());

  return (
    <div className="st">
      <style>{storyCss}</style>

      {/* ═══ HERO ═══
          Photo ho to cinematic, na ho to saaf dark hero. Dono soorat
          mein poora dikhta hai — "image missing" wala khaali dabba kabhi
          nahi. */}
      <header className={`sh ${heroImage ? "sh-photo" : ""}`}>
        {heroImage && (
          <>
            <img src={heroImage} alt="" className="sh-bg" />
            <div className="sh-veil" />
          </>
        )}

        <div className="sh-in">
          <span className="sh-kicker">Valley Run Stories</span>

          <h1 className="sh-h1">
            {headTop}
            {headRed && (
              <>
                <br />
                <span className="sh-red">{headRed}</span>
              </>
            )}
          </h1>

          <p className="sh-sub">Every runner has a story.</p>
          <p className="sh-text">
            {settings.pageHeroText ||
              "Behind every medal is a journey of dedication, determination, challenges and small victories. Discover the real people and the miles behind them."}
          </p>

          <div className="sh-cta">
            <Link href="/stories/submit" className="st-btn">Share your story</Link>
            {stories.length > 0 && (
              <a href="#stories" className="st-btn st-btn-onhero">Explore stories</a>
            )}
          </div>
        </div>
      </header>

      {/* ═══ KAHANIYAN ═══ */}
      <StoriesBrowser
        initial={stories}
        categories={list.categories || []}
        total={list.total || 0}
      />

      {/* ═══ AAKHRI BULAWA ═══
          Ek bhi kahani na ho to ye nahi dikhta — upar khali wala
          section pehle hi yahi baat keh chuka hota hai, aur ek hi
          baat do kaale dibbon mein do baar kehna bura lagta hai. */}
      {stories.length > 0 && (
      <section className="sc-cta">
        <div className="st-wrap">
          <h2 className="sc-cta-h">Your journey could inspire someone.</h2>
          <p className="sc-cta-p">
            You do not have to be fast, and you do not have to be an athlete.
            Every step, every setback and every finish counts.
          </p>
          <Link href="/stories/submit" className="st-btn">Share your story</Link>
        </div>
      </section>
      )}
    </div>
  );
}
