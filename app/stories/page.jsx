import Link from "next/link";
import { storyCss } from "./theme";
import { StoryCard } from "./[slug]/StoryView";

/* Server component — kahaniyan Google ko bhi dikhni chahiye, aur list
   ka content JavaScript ke peeche chhupana SEO ke liye bekaar hai. */

const API  = process.env.NEXT_PUBLIC_API_URL;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.valleyrun.in";

export const metadata = {
  title: "Beyond the Finish Line — Runner Stories · Valley Run",
  description:
    "Real stories from Valley Run runners — what it took to start, to keep going, and to finish.",
  alternates: { canonical: `${SITE}/stories` },
  openGraph: {
    type: "website",
    url: `${SITE}/stories`,
    siteName: "Valley Run",
    title: "Beyond the Finish Line — Runner Stories",
    description: "Real stories from Valley Run runners.",
  },
};

async function getStories() {
  try {
    const res = await fetch(`${API}/api/stories?limit=24`, { next: { revalidate: 60 } });
    if (!res.ok) return { stories: [], total: 0 };
    return await res.json();
  } catch {
    return { stories: [], total: 0 };
  }
}

export default async function StoriesPage() {
  const data = await getStories();
  const stories = data.stories || [];

  return (
    <div className="st st-wide">
      <style>{storyCss}</style>

      <div className="st-hero">
        <div className="st-hero-in">
          <span className="st-eyebrow">Beyond the Finish Line</span>
          <h1 className="st-h1">Every medal has a story behind it.</h1>
          <p className="st-lede">
            The distance is the easy part to measure. These are the parts that are not —
            told by the runners themselves.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/stories/submit" className="st-btn">Share your story</Link>
          </div>
        </div>
      </div>

      <div className="st-wrap st-wide" style={{ padding: "38px 20px 76px" }}>
        {stories.length === 0 ? (
          <div className="st-empty">
            <div style={{ fontSize: 42, marginBottom: 14 }}>📖</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>The first story is still being written</div>
            <p style={{ color: "#78716c", marginTop: 10, lineHeight: 1.7, fontSize: 14.5 }}>
              Finished a Valley Run challenge? Tell us what it took — yours could be the one.
            </p>
            <Link href="/stories/submit" className="st-btn" style={{ marginTop: 22 }}>
              Share your story
            </Link>
          </div>
        ) : (
          <div className="st-grid">
            {stories.map((s) => <StoryCard key={s.slug} s={s} />)}
          </div>
        )}
      </div>
    </div>
  );
}
