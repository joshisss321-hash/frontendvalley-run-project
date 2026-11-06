import StoryView from "./StoryView";

/* Ye SERVER component hai — jaan-bujh kar.
   WhatsApp aur Facebook ka preview tabhi banta hai jab meta tags
   server se aayein. Client component mein tags JavaScript chalne ke
   baad lagte hain, aur crawler tab tak ja chuka hota hai — link bina
   photo aur bina title ke chipakta hai, jo share feature ka matlab
   hi khatam kar deta hai. */

const API  = process.env.NEXT_PUBLIC_API_URL;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.valleyrun.in";

async function getStory(slug) {
  try {
    const res = await fetch(`${API}/api/stories/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.success ? data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const data = await getStory(params.slug);
  if (!data) {
    return { title: "Story not found · Valley Run" };
  }

  const s = data.story;
  const title = s.seoTitle || s.title;
  const description =
    s.seoDescription ||
    s.summary ||
    `${s.name}'s story from Valley Run — Beyond the Finish Line.`;
  const url = `${SITE}/stories/${s.slug}`;

  return {
    title: `${title} · Valley Run`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Valley Run",
      images: s.featuredPhoto ? [{ url: s.featuredPhoto }] : undefined,
      publishedTime: s.publishedAt || undefined,
    },
    twitter: {
      card: s.featuredPhoto ? "summary_large_image" : "summary",
      title,
      description,
      images: s.featuredPhoto ? [s.featuredPhoto] : undefined,
    },
  };
}

export default async function StoryPage({ params }) {
  const data = await getStory(params.slug);
  const url = `${SITE}/stories/${params.slug}`;

  return <StoryView data={data} url={url} />;
}
