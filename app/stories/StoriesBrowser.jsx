"use client";

import { useState } from "react";
import Link from "next/link";
import { StoryCard } from "./[slug]/StoryView";
import { CATEGORY_LABEL } from "./theme";

/* Kahaniyon ki list + category filter.
   Server pehli list bhej chuka hai (SEO ke liye), yahan sirf chhantai
   hoti hai — filter dabate hi page dobara load nahi hota. */
export default function StoriesBrowser({ initial, categories, total }) {
  const [cat, setCat] = useState("");

  const shown = cat ? initial.filter((s) => s.category === cat) : initial;

  // Pehli kahani badi, baaki chhoti — magazine jaisa
  const [lead, ...rest] = shown;

  if (initial.length === 0) return <EmptyState />;

  return (
    <section id="stories" className="st-wrap st-wide" style={{ padding: "64px 20px 10px" }}>
      <div className="sx-head">
        <span className="st-eyebrow">Stories that inspire</span>
        <h2 className="sx-h2">Every journey has the power to inspire another.</h2>
      </div>

      {categories.length > 0 && (
        <div className="sx-filters">
          <Chip on={cat === ""} onClick={() => setCat("")}>
            All stories <span className="sx-n">{total}</span>
          </Chip>
          {categories.map((c) => (
            <Chip key={c.key} on={cat === c.key} onClick={() => setCat(c.key)}>
              {CATEGORY_LABEL[c.key] || c.key} <span className="sx-n">{c.count}</span>
            </Chip>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <div className="st-empty" style={{ marginTop: 26 }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>No stories in this one yet</div>
          <p style={{ color: "#78716c", marginTop: 9 }}>
            Try another category, or be the first here.
          </p>
          <button onClick={() => setCat("")} className="st-btn" style={{ marginTop: 18 }}>
            Show all stories
          </button>
        </div>
      ) : (
        <>
          {/* Badi kahani */}
          {lead && <StoryCard s={lead} feature />}

          {/* Baaki */}
          {rest.length > 0 && (
            <div className="st-grid" style={{ marginTop: 20 }}>
              {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
            </div>
          )}
        </>
      )}
    </section>
  );
}

const Chip = ({ on, onClick, children }) => (
  <button onClick={onClick} className={`sx-chip ${on ? "sx-chip-on" : ""}`}>{children}</button>
);

/* ── Khali page ──
   Ye sabse zaroori screen hai, kyunki aaj yahi dikhegi. Ek khaali safed
   dabba "website adhoori hai" kehta hai; ye "pehli kahani tumhari ho
   sakti hai" kehta hai. */
function EmptyState() {
  return (
    <section className="sx-empty">
      <div className="st-wrap">
        <span className="st-eyebrow">The first page is blank</span>
        <h2 className="sx-empty-h">
          Every great journey starts<br />with a single step.
        </h2>
        <p className="sx-empty-p">
          Our community's stories are still waiting to be told. Yours could be the
          first — and the reason someone else decides to begin.
        </p>
        <Link href="/stories/submit" className="st-btn" style={{ marginTop: 26 }}>
          Be the first to share your story
        </Link>
        <p className="sx-empty-foot">Your journey matters. Let someone hear it.</p>
      </div>
    </section>
  );
}
