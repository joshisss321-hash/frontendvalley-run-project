
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Navbar from "../../components/Navbar";

// export default function ChallengeDetailPage() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${slug}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setEvent(data.event);
//       });
//   }, [slug]);

//   if (!event) {
//     return (
//       <>
//         <Navbar />
//         <div className="pt-40 text-center text-gray-500">
//           Loading challenge details...
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       {/* ================= HERO SECTION ================= */}
//       <section className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        
//         {/* LEFT CONTENT */}
//         <div>
//           <h1 className="text-4xl font-extrabold leading-tight mb-6">
//             Invest in Your Health.
//             <br />
//             <span className="text-red-600">
//               Earn a Medal, Build Discipline.
//             </span>
//           </h1>

//           <p className="text-gray-600 mb-6 text-lg">
//             This is not just another online challenge.
//             Valley Run is a commitment — fixed deadlines,
//             real effort, and recognition that lasts forever.
//           </p>

//           <ul className="space-y-3 text-gray-700 mb-8">
//             <li>🏅 Premium Finisher Medal (Home Delivered)</li>
//             <li>📜 Digital Certificate with Your Name</li>
//             <li>🏆 Leaderboard Recognition</li>
//             <li>⏳ Fixed Deadline = Real Discipline</li>
//             <li>📸 Featured in Our Community Gallery</li>
//           </ul>

//           <p className="text-sm text-gray-500 mb-8">
//             💡 You are not paying for a medal.  
//             You are investing in your health, discipline,
//             and a version of yourself that finishes what it starts.
//           </p>

//           <button
//             onClick={() => router.push(`/challenges/${slug}/pricing`)}
//             className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-semibold text-lg"
//           >
//             View Pricing & Join Challenge
//           </button>
//         </div>

//         {/* RIGHT MEDAL CARD */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
//           {event.medalImage ? (
//             <img
//               src={event.medalImage}
//               alt="Premium Finisher Medal"
//               className="w-full max-w-sm rounded-xl object-cover"
//             />
//           ) : (
//             <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-xl">
//               Medal Preview
//             </div>
//           )}

//           <p className="mt-4 text-sm text-gray-500 text-center">
//             Actual Premium Metal Medal (Delivered to Your Home)
//           </p>
//         </div>
//       </section>

//       {/* ================= PREMIUM VALUE SECTION ================= */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

//           <div>
//             <h2 className="text-3xl font-bold mb-4">
//               More Than Just a Medal.
//               <br />
//               <span className="text-red-600">
//                 A Proof of Discipline.
//               </span>
//             </h2>

//             <p className="text-gray-600 mb-6">
//               Anyone can start.
//               Very few finish.
//               Valley Run is built to help you finish —
//               with accountability, structure, and public recognition.
//             </p>

//             <ul className="space-y-4 text-gray-700">
//               <li>✔ Structured challenge with fixed dates</li>
//               <li>✔ Motivation to stay consistent</li>
//               <li>✔ Your name published on our website</li>
//               <li>✔ Physical reward that lasts a lifetime</li>
//             </ul>
//           </div>

//           <div className="bg-white rounded-3xl shadow-lg p-6">
//             <img
//               src={event.coverImage || event.medalImage}
//               alt="Premium Medal Close View"
//               className="rounded-xl w-full object-cover"
//             />
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState({});
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const allImages = data.events.flatMap(e => e.gallery || []);
          setImages(allImages);
        }
      });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox(p => (p + 1) % images.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox(p => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, images.length]);

  // Masonry pattern — repeats every 8
  const sizePattern = [
    { col: 2, row: 2 }, // big square
    { col: 1, row: 1 }, // small
    { col: 1, row: 1 }, // small
    { col: 2, row: 1 }, // wide
    { col: 1, row: 2 }, // tall
    { col: 1, row: 1 }, // small
    { col: 1, row: 1 }, // small
    { col: 2, row: 1 }, // wide
  ];

  return (
    <>
      <Navbar />

      {/* Dark Hero Header */}
      <div className="pt-28 pb-10 text-center relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #ef4444 0%, transparent 65%)" }} />
        <div className="relative z-10 px-4">
          <span className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Community
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-3">
            Runner Gallery
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Real people. Real runs. Real medals. Every photo tells a finish line story.
          </p>
          {images.length > 0 && (
            <p className="text-gray-600 text-xs mt-3 font-medium">
              {images.length} photos · Click any photo to view full size
            </p>
          )}
        </div>
      </div>

      {/* Gallery Area */}
      <div className="bg-gray-950 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center text-4xl mb-5">📸</div>
              <p className="text-white font-bold text-xl mb-2">No photos yet</p>
              <p className="text-gray-500 text-sm">Complete your run → Submit proof → Get featured here</p>
            </div>
          ) : (
            <>
              {/* Desktop Masonry Grid */}
              <div
                className="hidden sm:grid gap-3"
                style={{ gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "160px" }}
              >
                {images.map((img, i) => {
                  const p = sizePattern[i % sizePattern.length];
                  const isHov = hoveredIdx === i;
                  return (
                    <div
                      key={i}
                      style={{
                        gridColumn: `span ${p.col}`,
                        gridRow: `span ${p.row}`,
                        transform: isHov ? "scale(1.03)" : "scale(1)",
                        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                        boxShadow: isHov
                          ? "0 25px 50px rgba(0,0,0,0.7), 0 0 0 2px rgba(239,68,68,0.4)"
                          : "0 4px 20px rgba(0,0,0,0.4)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => setLightbox(i)}
                    >
                      {/* Skeleton */}
                      {!loaded[i] && (
                        <div style={{ position:"absolute", inset:0, background:"#1f2937", animation:"pulse 1.5s infinite" }} />
                      )}

                      <img
                        src={img}
                        alt={`Runner ${i + 1}`}
                        style={{
                          width:"100%", height:"100%", objectFit:"cover",
                          opacity: loaded[i] ? 1 : 0,
                          transition: "opacity 0.4s ease",
                          display: "block",
                        }}
                        onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
                      />

                      {/* Dark overlay */}
                      <div style={{
                        position:"absolute", inset:0,
                        background: isHov
                          ? "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
                        transition: "background 0.3s ease",
                      }} />

                      {/* View icon on hover */}
                      <div style={{
                        position:"absolute", inset:0,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        opacity: isHov ? 1 : 0,
                        transition: "opacity 0.25s ease",
                      }}>
                        <div style={{
                          background:"rgba(255,255,255,0.15)",
                          backdropFilter:"blur(6px)",
                          border:"1px solid rgba(255,255,255,0.25)",
                          borderRadius:"50%",
                          width:44, height:44,
                          display:"flex", alignItems:"center", justifyContent:"center",
                        }}>
                          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>

                      {/* Red corner glow */}
                      <div style={{
                        position:"absolute", top:0, left:0, width:60, height:60,
                        background:"radial-gradient(circle at top left, rgba(239,68,68,0.35), transparent 70%)",
                        borderRadius:"16px 0 0 0",
                        opacity: isHov ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents:"none",
                      }} />

                      {/* Photo number */}
                      <div style={{
                        position:"absolute", bottom:8, right:8,
                        opacity: isHov ? 1 : 0,
                        transform: isHov ? "translateY(0)" : "translateY(4px)",
                        transition: "all 0.25s ease",
                      }}>
                        <span style={{
                          background:"rgba(0,0,0,0.65)",
                          backdropFilter:"blur(4px)",
                          color:"#fff",
                          fontSize:10, fontWeight:700,
                          padding:"3px 8px",
                          borderRadius:999,
                        }}>#{i + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Grid — simple 2 col */}
              <div className="grid sm:hidden grid-cols-2 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox(i)}
                    style={{
                      borderRadius:12, overflow:"hidden",
                      cursor:"pointer", position:"relative",
                      aspectRatio:"1",
                      boxShadow:"0 4px 16px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img src={img} alt={`Runner ${i+1}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-700 text-xs mt-8">
                Finish your run → Submit proof → Get featured here 🏃
              </p>
            </>
          )}
        </div>
      </div>

      {/* ══ LIGHTBOX ══ */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:"fixed", inset:0, zIndex:50,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(0,0,0,0.96)",
            animation:"fadeIn 0.2s ease",
          }}
        >
          {/* Top bar */}
          <div style={{
            position:"absolute", top:0, left:0, right:0,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"16px 24px", zIndex:10,
            background:"linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:"rgba(255,255,255,0.9)", fontWeight:800, fontSize:14 }}>
                {lightbox + 1}
              </span>
              <span style={{ color:"rgba(255,255,255,0.3)", fontSize:14 }}>/ {images.length}</span>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                width:36, height:36, borderRadius:"50%",
                background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
                color:"#fff", fontSize:18, fontWeight:700,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer",
              }}
            >×</button>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(p => (p - 1 + images.length) % images.length); }}
            style={{
              position:"absolute", left:16, zIndex:10,
              width:48, height:48, borderRadius:"50%",
              background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
              color:"#fff", fontSize:24, fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer",
            }}
          >‹</button>

          {/* Image */}
          <img
            src={images[lightbox]}
            alt="Runner"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight:"82vh", maxWidth:"85vw",
              objectFit:"contain", borderRadius:16,
              boxShadow:"0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)",
              animation:"zoomIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(p => (p + 1) % images.length); }}
            style={{
              position:"absolute", right:16, zIndex:10,
              width:48, height:48, borderRadius:"50%",
              background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
              color:"#fff", fontSize:24, fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer",
            }}
          >›</button>

          {/* Thumbnail strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position:"absolute", bottom:0, left:0, right:0,
              display:"flex", justifyContent:"center",
              gap:8, padding:"16px 24px",
              overflowX:"auto",
              background:"linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{
                  flexShrink:0,
                  width: i === lightbox ? 52 : 40,
                  height: i === lightbox ? 52 : 40,
                  borderRadius:8,
                  overflow:"hidden",
                  border: i === lightbox ? "2px solid #ef4444" : "2px solid transparent",
                  opacity: i === lightbox ? 1 : 0.45,
                  transform: i === lightbox ? "scale(1.1)" : "scale(1)",
                  transition:"all 0.2s ease",
                  cursor:"pointer",
                }}
              >
                <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes zoomIn { from { opacity:0; transform:scale(0.88) } to { opacity:1; transform:scale(1) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
    </>
  );
}
