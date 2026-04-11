"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";

export default function MedalReviewSubmission() {
  const [name, setName] = useState("");
  const [instaId, setInstaId] = useState("");
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const fileRef = useRef();

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(selected);
  };

  const handleReview = (e) => {
    setReview(e.target.value);
    setCharCount(e.target.value.length);
  };

  const submit = async () => {
    if (loading) return;

    if (!name.trim()) { toast.error("Please enter your full name"); return; }
    if (!instaId.trim()) { toast.error("Please enter your Instagram handle"); return; }
    if (!review.trim() || review.trim().length < 20) {
      toast.error("Please write a bit more about your experience");
      return;
    }
    if (!file) { toast.error("Please upload a photo with your medal"); return; }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("instaId", instaId.trim().replace("@", ""));
      formData.append("review", review.trim());
      formData.append("image", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit-medal-review`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success Screen ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Mulish:wght@300;400;600&display=swap');
          .pop-in { animation: popIn 0.6s cubic-bezier(0.175,0.885,0.32,1.275) both; }
          @keyframes popIn { from { opacity:0; transform:scale(0.85) translateY(24px); } to { opacity:1; transform:scale(1) translateY(0); } }
          .gold { background:linear-gradient(135deg,#f6d365,#fda085); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
          .ribbon { position:absolute; width:8px; height:8px; border-radius:2px; animation:fall linear infinite; }
          @keyframes fall { 0%{transform:translateY(-10px) rotate(0); opacity:1;} 100%{transform:translateY(110vh) rotate(720deg); opacity:0;} }
        `}</style>

        <div
          className="pop-in"
          style={{
            position: "relative", overflow: "hidden",
            background: "rgba(255,255,255,0.07)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.12)", borderRadius: "28px",
            padding: "56px 44px", textAlign: "center", maxWidth: "420px", width: "100%",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="ribbon" style={{
              left: `${8 + i * 9}%`, top: "-10px",
              background: ["#f6d365","#fda085","#a18cd1","#fbc2eb","#84fab0"][i % 5],
              animationDuration: `${2.5 + i * 0.25}s`,
              animationDelay: `${i * 0.15}s`
            }} />
          ))}

          <div style={{ fontSize: "68px", marginBottom: "16px" }}>🥇</div>

          <h2
            className="gold"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "44px", fontWeight: "700", marginBottom: "14px" }}
          >
            Thank You!
          </h2>

          <p style={{ fontFamily: "'Mulish',sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: "1.75" }}>
            Your review has been successfully submitted.<br />
            <span style={{ color: "#f6d365", fontWeight: "600" }}>
              You will be featured on our official Instagram page.
            </span>
          </p>

          <button
            onClick={() => {
              setSubmitted(false); setName(""); setInstaId("");
              setReview(""); setFile(null); setPreview(null); setCharCount(0);
            }}
            style={{
              marginTop: "28px", padding: "10px 30px", borderRadius: "30px",
              fontFamily: "'Mulish',sans-serif", fontSize: "13px", fontWeight: "600",
              color: "rgba(255,255,255,0.7)", background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", letterSpacing: "0.3px"
            }}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen py-14 px-4"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Mulish:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; }

        .gold { background:linear-gradient(135deg,#f6d365,#fda085); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.45);
        }

        .lbl {
          display:block; font-family:'Mulish',sans-serif;
          font-size:11px; font-weight:700; letter-spacing:1.6px;
          text-transform:uppercase; color:rgba(255,255,255,0.38); margin-bottom:8px;
        }

        .field {
          width:100%; background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.11); border-radius:12px;
          padding:14px 18px; color:white;
          font-family:'Mulish',sans-serif; font-size:15px;
          outline:none; transition:all 0.25s;
        }
        .field::placeholder { color:rgba(255,255,255,0.22); }
        .field:focus {
          border-color:rgba(246,211,101,0.55);
          background:rgba(246,211,101,0.04);
          box-shadow:0 0 0 3px rgba(246,211,101,0.07);
        }

        .drop-zone {
          border:2px dashed rgba(255,255,255,0.13); border-radius:16px;
          padding:44px 24px; cursor:pointer; text-align:center;
          background:rgba(255,255,255,0.025); transition:all 0.25s;
        }
        .drop-zone:hover { border-color:rgba(246,211,101,0.45); background:rgba(246,211,101,0.035); }

        .cta {
          width:100%; padding:17px; border-radius:13px; border:none; cursor:pointer;
          font-family:'Mulish',sans-serif; font-size:15px; font-weight:700;
          letter-spacing:0.8px; transition:all 0.3s;
          background:linear-gradient(135deg,#f6d365,#fda085); color:#1a1a2e;
        }
        .cta:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 36px rgba(246,211,101,0.3); }
        .cta:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

        .hr { height:1px; background:rgba(255,255,255,0.07); margin:8px 0; }

        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        .pulsing { animation:pulse 1.2s ease-in-out infinite; }
      `}</style>

      <div style={{ maxWidth: "520px", margin: "0 auto", fontFamily: "'Mulish',sans-serif" }}>

        {/* ── Page Header ── */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(246,211,101,0.09)", border: "1px solid rgba(246,211,101,0.22)",
            color: "#f6d365", padding: "5px 16px", borderRadius: "20px",
            fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px",
            textTransform: "uppercase", marginBottom: "22px"
          }}>
            🏅 Medal Received
          </div>

          <h1
            className="gold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 9vw, 58px)",
              fontWeight: "700", lineHeight: "1.08", marginBottom: "16px"
            }}
          >
            Share Your<br />Experience
          </h1>

          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "14px", lineHeight: "1.75", fontWeight: "300", maxWidth: "320px", margin: "0 auto" }}>
            Your story inspires hundreds of fellow runners.<br />Tell us how it felt to cross the finish line.
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="card" style={{ padding: "clamp(24px,6vw,40px)" }}>

          {/* Writing tip */}
          <div style={{
            background: "rgba(246,211,101,0.05)", border: "1px solid rgba(246,211,101,0.14)",
            borderRadius: "14px", padding: "16px 20px", marginBottom: "30px"
          }}>
            <p style={{ color: "#f6d365", fontSize: "11px", fontWeight: "700", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "6px" }}>
              ✦ Tips for a Great Review
            </p>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "13px", lineHeight: "1.75", margin: 0 }}>
              Describe what motivated you, how the run felt, and the moment you held your medal. 
              Genuine, heartfelt stories are more likely to be featured on our page.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Full Name */}
            <div>
              <label className="lbl">Full Name</label>
              <input
                className="field"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="lbl">Instagram Handle</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: "rgba(246,211,101,0.55)", fontSize: "15px", fontWeight: "700",
                  pointerEvents: "none", fontFamily: "Mulish,sans-serif"
                }}>@</span>
                <input
                  className="field"
                  style={{ paddingLeft: "34px" }}
                  placeholder="your_handle"
                  value={instaId}
                  onChange={(e) => setInstaId(e.target.value.replace("@", ""))}
                />
              </div>
            </div>

            <div className="hr" />

            {/* Review */}
            <div>
              <label className="lbl">Your Review</label>
              <textarea
                className="field"
                style={{ minHeight: "150px", resize: "vertical", lineHeight: "1.7" }}
                placeholder="Tell us about your experience — why you signed up, how the run went, and the feeling of receiving your medal. What would you tell someone considering joining next year?"
                value={review}
                onChange={handleReview}
                maxLength={500}
              />
              {/* Progress bar */}
              <div style={{ height: "2px", borderRadius: "2px", background: "rgba(255,255,255,0.07)", marginTop: "8px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: "2px", transition: "width 0.3s, background 0.3s",
                  width: `${Math.min((charCount / 500) * 100, 100)}%`,
                  background: charCount < 20
                    ? "rgba(255,100,100,0.55)"
                    : "linear-gradient(90deg,#f6d365,#fda085)"
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ fontSize: "11px", color: charCount > 0 && charCount < 20 ? "#ff8888" : "transparent" }}>
                  Please write a bit more
                </span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)" }}>{charCount} / 500</span>
              </div>
            </div>

            <div className="hr" />

            {/* Photo Upload */}
            <div>
              <label className="lbl">Photo with Your Medal</label>

              {!preview ? (
                <div className="drop-zone" onClick={() => fileRef.current.click()}>
                  <div style={{ fontSize: "42px", marginBottom: "12px" }}>📸</div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", fontWeight: "600", marginBottom: "5px" }}>
                    Upload Your Medal Photo
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "12px", marginBottom: "20px" }}>
                    Ensure your medal is clearly visible in the photo
                  </p>
                  <div style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg,#f6d365,#fda085)",
                    color: "#1a1a2e", padding: "9px 26px",
                    borderRadius: "22px", fontSize: "13px", fontWeight: "700"
                  }}>
                    Choose Photo
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src={preview} alt="Medal preview"
                    style={{
                      width: "100%", borderRadius: "14px", objectFit: "cover",
                      maxHeight: "300px", border: "1px solid rgba(246,211,101,0.22)"
                    }}
                  />
                  <button
                    onClick={() => { setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                    style={{
                      position: "absolute", top: "10px", right: "10px",
                      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                      color: "white", border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "50%", width: "32px", height: "32px",
                      cursor: "pointer", fontSize: "14px",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >✕</button>
                  <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", marginTop: "8px", textAlign: "center" }}>
                    ✓ Photo selected — click ✕ to change
                  </p>
                </div>
              )}

              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            </div>

            {/* Submit Button */}
            <button
              className={`cta ${loading ? "pulsing" : ""}`}
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Submitting your review…" : "Submit Review →"}
            </button>

            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.18)", fontSize: "11px", lineHeight: "1.6" }}>
              By submitting, you agree that your review and photo may be featured<br />
              on our official Instagram and website.
            </p>

          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center", marginTop: "32px",
          color: "rgba(255,255,255,0.18)", fontSize: "10px",
          letterSpacing: "1.5px", textTransform: "uppercase"
        }}>
          Shaheed Diwas Tribute Run · Valley Run 
        </p>

      </div>
    </div>
  );
}
