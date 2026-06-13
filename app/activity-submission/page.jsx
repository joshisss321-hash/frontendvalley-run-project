// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import Navbar from "../components/Navbar";

// export default function ActivitySubmission() {
//   const [events, setEvents]         = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
//   const [eventSlug, setEventSlug]   = useState("");
//   const [query, setQuery]           = useState("");
//   const [runner, setRunner]         = useState(null);
//   const [step, setStep]             = useState("search");
//   const [distance, setDistance]     = useState("");
//   const [customDist, setCustomDist] = useState("");
//   const [timing, setTiming]         = useState("");
//   const [file, setFile]             = useState(null);
//   const [preview, setPreview]       = useState(null);
//   const [loading, setLoading]       = useState(false);

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   const DISTANCES = [
//     "1600m", "3.2km", "5km", "10km", "21km",
//     "Cycling 10km", "Cycling 25km", "Cycling 50km"
//   ];

//   useEffect(() => {
//     fetch(`${API}/api/events`)
//       .then(r => r.json())
//       .then(data => {
//         const all  = data.events || [];
//         const live = all.filter(e => e.active && !e.isPrevious);
//         const past = all.filter(e => e.active && e.isPrevious);
//         setEvents(live);
//         setPastEvents(past);
//         const params = new URLSearchParams(window.location.search);
//         const ev = params.get("event");
//         if (ev) setEventSlug(ev);
//       })
//       .catch(() => {});
//   }, []);

//   const isSubmissionClosed = (event) => {
//     if (!event) return false;
//     if (!event.submissionDeadline) return false;
//     return new Date() > new Date(event.submissionDeadline);
//   };

//   const selectedEvent    = [...events, ...pastEvents].find(e => e.slug === eventSlug);
//   // const submissionClosed = isSubmissionClosed(selectedEvent) || selectedEvent?.isPrevious;
// const now2 = new Date();
// const regPassed = selectedEvent?.registrationDeadline 
//   ? new Date(selectedEvent.registrationDeadline) < now2 
//   : false;
// // const isEventOpen = selectedEvent?.isRegistrationOpen && !regPassed;
// // const submissionClosed = isSubmissionClosed(selectedEvent) || selectedEvent?.isPrevious || !isEventOpen;
// const submissionOpen2 = !selectedEvent?.isRegistrationOpen || regPassed;
// const submissionClosed = isSubmissionClosed(selectedEvent) || selectedEvent?.isPrevious || !submissionOpen2;
//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleCustomDist = (val) => {
//     setCustomDist(val);
//     if (val) {
//       setDistance(`${val}km`);
//     }
//   };

//   const handleDistanceBtn = (d) => {
//     setDistance(d);
//     setCustomDist(""); // clear custom input
//   };

//   async function searchRunner() {
//     if (!eventSlug)       { toast.error("Please select an event first"); return; }
//     if (submissionClosed) { toast.error("Submissions are closed for this event"); return; }
//     if (!query.trim())    { toast.error("Enter your phone or email"); return; }

//     try {
//       const res  = await fetch(`${API}/api/search-runner`, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify({ query: query.trim(), eventSlug }),
//       });
//       const data = await res.json();

//       if (!data.runner) {
//         toast.error("Registration not found. Please check your phone or email.");
//         return;
//       }
//       if (data.alreadySubmitted) {
//         toast.info(
//           data.submissionStatus === "approved"
//             ? "Your activity is already verified! ✅"
//             : "Already submitted — verification pending."
//         );
//         return;
//       }
//       setRunner(data.runner);
//       setStep("submit");
//       toast.success("Registration found! ✅");
//     } catch {
//       toast.error("Server error. Please try again.");
//     }
//   }

//   async function submitRun() {
//     if (loading)   return;
//     if (!distance) { toast.error("Please select or enter your distance"); return; }
//     if (!file)     { toast.error("Please upload your run screenshot"); return; }

//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("name",      runner.name);
//       fd.append("email",     runner.email);
//       fd.append("phone",     runner.phone);
//       fd.append("distance",  distance);
//       fd.append("timing",    timing);
//       fd.append("eventSlug", eventSlug);
//       fd.append("image",     file);

//       const res  = await fetch(`${API}/api/submit-run`, { method: "POST", body: fd });
//       const data = await res.json();

//       if (data.error) toast.error(data.error);
//       else { toast.success("Submitted successfully! 🎉"); setStep("done"); }
//     } catch {
//       toast.error("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const reset = () => {
//     setStep("search"); setRunner(null); setQuery("");
//     setDistance(""); setCustomDist(""); setTiming("");
//     setFile(null); setPreview(null);
//   };

//   const EventCard = ({ ev, isPast = false }) => {
//     // const closed     = isPast || isSubmissionClosed(ev);
//     const now = new Date();
// const regDeadlinePassed = ev.registrationDeadline 
//   ? new Date(ev.registrationDeadline) < now 
//   : false;
// // const isOpen = ev.isRegistrationOpen && !regDeadlinePassed;
// // const closed = isPast || isSubmissionClosed(ev) || !isOpen;
// const submissionOpen = !ev.isRegistrationOpen || regDeadlinePassed;
// const closed = isPast || isSubmissionClosed(ev) || !submissionOpen;
//     const isSelected = eventSlug === ev.slug;
//     return (
//       <button
//         onClick={() => !closed && setEventSlug(ev.slug)}
//         disabled={closed}
//         className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all ${
//           closed
//             ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
//             : isSelected
//             ? "border-red-500 bg-red-50"
//             : "border-gray-200 hover:border-red-300 bg-white cursor-pointer"
//         }`}
//       >
//         <div className="flex items-center justify-between gap-2">
//           <div className="min-w-0">
//             <div className={`font-bold text-sm truncate ${isSelected ? "text-red-600" : "text-gray-800"}`}>
//               {ev.title}
//             </div>
//             <div className="text-gray-400 text-xs mt-0.5">{ev.dates}</div>
//           </div>
//           {closed ? (
//             <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full font-semibold flex-shrink-0">
//               Closed
//             </span>
//           ) : (
//             <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold flex-shrink-0">
//               Open ✓
//             </span>
//           )}
//         </div>
//       </button>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-lg mx-auto px-4 py-12">
//         <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
//           Submit Your Activity
//         </h1>
//         <p className="text-gray-500 text-center text-sm mb-8">
//           Select your event and find your registration to get started
//         </p>

//         {/* ── STEP 1: SEARCH ── */}
//         {step === "search" && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

//             {/* Live Events */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-3">
//                 🟢 Active Events
//               </label>
//               {events.length === 0 ? (
//                 <div className="text-center py-4 text-gray-400 text-sm">
//                   No active events right now
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {events.map(ev => <EventCard key={ev._id} ev={ev} isPast={false}/>)}
//                 </div>
//               )}
//             </div>

//             {/* Past Events */}
//             {pastEvents.length > 0 && (
//               <div>
//                 <label className="block text-sm font-bold text-gray-500 mb-3 mt-2">
//                   🔒 Previous Events (Closed)
//                 </label>
//                 <div className="space-y-2">
//                   {pastEvents.map(ev => <EventCard key={ev._id} ev={ev} isPast={true}/>)}
//                 </div>
//               </div>
//             )}

//             {/* Closed warning */}
//             {submissionClosed && eventSlug && (
//               <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
//                 <div className="text-2xl mb-1">🔒</div>
//                 <div className="text-red-600 font-bold text-sm">
//                   Submissions are closed for this event
//                 </div>
//               </div>
//             )}

//             {/* Phone/email search */}
//             {eventSlug && !submissionClosed && (
//               <>
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2">
//                     Registered Phone or Email *
//                   </label>
//                   <input
//                     value={query}
//                     onChange={e => setQuery(e.target.value)}
//                     onKeyDown={e => e.key === "Enter" && searchRunner()}
//                     placeholder="9876543210 or you@email.com"
//                     className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
//                   />
//                 </div>
//                 <button
//                   onClick={searchRunner}
//                   disabled={!query.trim()}
//                   className={`w-full font-bold py-4 rounded-2xl text-white transition-all text-base ${
//                     query.trim()
//                       ? "bg-red-600 hover:bg-red-700 hover:scale-[1.02]"
//                       : "bg-gray-300 cursor-not-allowed"
//                   }`}
//                 >
//                   Find My Registration →
//                 </button>
//               </>
//             )}
//           </div>
//         )}

//         {/* ── STEP 2: SUBMIT ── */}
//         {step === "submit" && runner && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

//             {/* Event badge */}
//             {selectedEvent && (
//               <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-center">
//                 <span className="text-red-600 font-bold text-sm">📅 {selectedEvent.title}</span>
//               </div>
//             )}

//             {/* Runner info */}
//             <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
//               <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
//                 {runner.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <div className="font-bold text-gray-800">{runner.name}</div>
//                 <div className="text-gray-500 text-xs">{runner.email} · {runner.phone}</div>
//               </div>
//             </div>

//             {/* Distance */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">
//                 Select Your Distance *
//               </label>
//               <div className="grid grid-cols-3 gap-2">
//                 {DISTANCES.map(d => (
//                   <button
//                     key={d}
//                     onClick={() => handleDistanceBtn(d)}
//                     className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${
//                       distance === d && !customDist
//                         ? "bg-red-600 border-red-600 text-white"
//                         : "border-gray-200 text-gray-600 hover:border-red-300"
//                     }`}
//                   >
//                     {d.toUpperCase()}
//                   </button>
//                 ))}
//               </div>

//               {/* Custom distance */}
//               <div className="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
//                 <label className="block text-xs text-gray-500 mb-2 font-semibold">
//                   Or enter your exact distance:
//                 </label>
//                 <div className="flex gap-2 items-center">
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.1"
//                     value={customDist}
//                     onChange={e => handleCustomDist(e.target.value)}
//                     placeholder="e.g. 7.5"
//                     className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors bg-white"
//                   />
//                   <span className="text-gray-600 font-bold text-sm bg-gray-200 px-3 py-2.5 rounded-xl">
//                     km
//                   </span>
//                 </div>
//                 <p className="text-gray-400 text-xs mt-1.5">
//                   For any distance not listed above — e.g. 7.5km, 15km, 42km, 100km
//                 </p>
//               </div>

//               {/* Selected preview */}
//               {distance && (
//                 <div className="mt-2 text-center">
//                   <span className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold px-4 py-1.5 rounded-full">
//                     ✓ Selected: {distance.toUpperCase()}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Timing */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">
//                 Completion Time{" "}
//                 <span className="text-gray-400 font-normal text-xs">
//                   (for leaderboard ranking)
//                 </span>
//               </label>
//               <input
//                 value={timing}
//                 onChange={e => setTiming(e.target.value)}
//                 placeholder="HH:MM:SS  e.g. 1:23:45"
//                 className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
//               />
//               <p className="text-gray-400 text-xs mt-1">
//                 🏆 Fastest time = Top of leaderboard
//               </p>
//             </div>

//             {/* Screenshot */}
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">
//                 Run Screenshot *
//               </label>
//               <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-red-300 transition-colors text-center">
//                 {preview ? (
//                   <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-xl object-contain"/>
//                 ) : (
//                   <>
//                     <div className="text-4xl mb-2">📸</div>
//                     <div className="text-gray-500 text-sm font-medium">
//                       Click to upload your screenshot
//                     </div>
//                     <div className="text-gray-400 text-xs mt-1">
//                       Strava · Nike Run Club · Garmin · Google Fit · Any GPS app
//                     </div>
//                   </>
//                 )}
//                 <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
//               </label>
//             </div>

//             {/* Submit button */}
//             <button
//               onClick={submitRun}
//               disabled={loading || !distance || !file}
//               className={`w-full font-bold py-4 rounded-2xl text-white text-base transition-all ${
//                 !loading && distance && file
//                   ? "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
//                   : "bg-gray-300 cursor-not-allowed"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit Activity →"}
//             </button>

//             {/* Verification info */}
//             <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
//               <div className="text-green-700 font-bold text-sm mb-1">
//                 ✅ What happens after submission?
//               </div>
//               <div className="text-green-600 text-xs leading-relaxed">
//                 Your activity will be verified within <strong>24 hours</strong>.
//                 Once verified, you will receive your <strong>e-certificate</strong> and
//                 your medal dispatch process will begin. 🏅
//               </div>
//             </div>

//             <button
//               onClick={reset}
//               className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
//             >
//               ← Go back
//             </button>
//           </div>
//         )}

//         {/* ── STEP 3: DONE ── */}
//         {step === "done" && (
//           <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
//             <div className="text-6xl mb-4">🎉</div>
//             <h2 className="text-2xl font-black mb-3 text-gray-800">
//               Successfully Submitted!
//             </h2>
//             <p className="text-gray-600 mb-2 text-sm font-medium">
//               Your activity is under review.
//             </p>

//             <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-6 mt-4">
//               {[
//                 { icon: "⏳", text: "Activity verification within 24 hours" },
//                 { icon: "📜", text: "E-certificate sent after verification in mail" },
//                 { icon: "🏅", text: "Medal dispatch process begins" },
//                 { icon: "📦", text: "Medal delivered to your address" },
//               ].map((s, i) => (
//                 <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
//                   <span className="text-lg">{s.icon}</span>
//                   <span>{s.text}</span>
//                 </div>
//               ))}
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ActivitySubmission() {
  const [events, setEvents]         = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [eventSlug, setEventSlug]   = useState("");
  const [query, setQuery]           = useState("");
  const [runner, setRunner]         = useState(null);
  const [step, setStep]             = useState("search");
  const [distance, setDistance]     = useState("");
  const [timingH, setTimingH]       = useState("");
  const [timingM, setTimingM]       = useState("");
  const [timingS, setTimingS]       = useState("");
  const [file, setFile]             = useState(null);
  const [preview, setPreview]       = useState(null);
  const [loading, setLoading]       = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Fixed distances — no custom input
  const DISTANCE_GROUPS = [
    {
      label: "🏃 Running",
      options: ["Running 1600Mtr", "Running 3.2Km", "Running 5Km", "Running 10Km", "Running 21Km"],
    },
    {
      label: "🚶 Walking",
      options: ["Walking 2Km", "Walking 5Km", "Walking 10Km", "Walking 21Km"],
    },
    {
      label: "🚴 Cycling",
      options: ["Cycling 10Km", "Cycling 25Km", "Cycling 50Km", "Cycling 100Km"],
    },
  ];

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then(r => r.json())
      .then(data => {
        const all  = data.events || [];
        const live = all.filter(e => e.active && !e.isPrevious);
        const past = all.filter(e => e.active && e.isPrevious);
        setEvents(live);
        setPastEvents(past);
        const params = new URLSearchParams(window.location.search);
        const ev = params.get("event");
        if (ev) setEventSlug(ev);
      })
      .catch(() => {});
  }, []);

  const isSubmissionClosed = (event) => {
    if (!event) return false;
    if (!event.submissionDeadline) return false;
    return new Date() > new Date(event.submissionDeadline);
  };

  const selectedEvent = [...events, ...pastEvents].find(e => e.slug === eventSlug);
  const now2 = new Date();
  const regPassed = selectedEvent?.registrationDeadline
    ? new Date(selectedEvent.registrationDeadline) < now2
    : false;
  const submissionOpen2 = !selectedEvent?.isRegistrationOpen || regPassed;
  const submissionClosed = isSubmissionClosed(selectedEvent) || selectedEvent?.isPrevious || !submissionOpen2;

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  async function searchRunner() {
    if (!eventSlug)       { toast.error("Please select an event first"); return; }
    if (submissionClosed) { toast.error("Submissions are closed for this event"); return; }
    if (!query.trim())    { toast.error("Enter your phone or email"); return; }

    try {
      const res  = await fetch(`${API}/api/search-runner`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ query: query.trim(), eventSlug }),
      });
      const data = await res.json();

      if (!data.runner) {
        toast.error("Registration not found. Please check your phone or email.");
        return;
      }
      if (data.alreadySubmitted) {
        toast.info(
          data.submissionStatus === "approved"
            ? "Your activity is already verified! ✅"
            : "Already submitted — verification pending."
        );
        return;
      }
      setRunner(data.runner);
      setStep("submit");
      toast.success("Registration found! ✅");
    } catch {
      toast.error("Server error. Please try again.");
    }
  }

  async function submitRun() {
    if (loading)   return;
    if (!distance) { toast.error("Please select your distance"); return; }
    if (!file)     { toast.error("Please upload your run screenshot"); return; }

    // ✅ Combine timing from dropdowns
    const timing = timingH && timingM
      ? `${timingH}:${timingM}:${timingS || "00"}`
      : "";

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name",      runner.name);
      fd.append("email",     runner.email);
      fd.append("phone",     runner.phone);
      fd.append("distance",  distance);
      fd.append("timing",    timing);
      fd.append("eventSlug", eventSlug);
      fd.append("image",     file);

      const res  = await fetch(`${API}/api/submit-run`, { method: "POST", body: fd });
      const data = await res.json();

      if (data.error) toast.error(data.error);
      else { toast.success("Submitted successfully! 🎉"); setStep("done"); }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setStep("search"); setRunner(null); setQuery("");
    setDistance(""); setTimingH(""); setTimingM(""); setTimingS("");
    setFile(null); setPreview(null);
  };

  const EventCard = ({ ev, isPast = false }) => {
    const now = new Date();
    const regDeadlinePassed = ev.registrationDeadline
      ? new Date(ev.registrationDeadline) < now
      : false;
    const submissionOpen = !ev.isRegistrationOpen || regDeadlinePassed;
    const closed = isPast || isSubmissionClosed(ev) || !submissionOpen;
    const isSelected = eventSlug === ev.slug;
    return (
      <button
        onClick={() => !closed && setEventSlug(ev.slug)}
        disabled={closed}
        className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all ${
          closed
            ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
            : isSelected
            ? "border-red-500 bg-red-50"
            : "border-gray-200 hover:border-red-300 bg-white cursor-pointer"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className={`font-bold text-sm truncate ${isSelected ? "text-red-600" : "text-gray-800"}`}>
              {ev.title}
            </div>
            <div className="text-gray-400 text-xs mt-0.5">{ev.dates}</div>
          </div>
          {closed ? (
            <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full font-semibold flex-shrink-0">
              Closed
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold flex-shrink-0">
              Open ✓
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          Submit Your Activity
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Select your event and find your registration to get started
        </p>

        {/* ── STEP 1: SEARCH ── */}
        {step === "search" && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

            {/* Live Events */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🟢 Active Events
              </label>
              {events.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No active events right now
                </div>
              ) : (
                <div className="space-y-2">
                  {events.map(ev => <EventCard key={ev._id} ev={ev} isPast={false}/>)}
                </div>
              )}
            </div>

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 mt-2">
                  🔒 Previous Events (Closed)
                </label>
                <div className="space-y-2">
                  {pastEvents.map(ev => <EventCard key={ev._id} ev={ev} isPast={true}/>)}
                </div>
              </div>
            )}

            {/* Closed warning */}
            {submissionClosed && eventSlug && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-red-600 font-bold text-sm">
                  Submissions are closed for this event
                </div>
              </div>
            )}

            {/* Phone/email search */}
            {eventSlug && !submissionClosed && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Registered Phone or Email *
                  </label>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && searchRunner()}
                    placeholder="9876543210 or you@email.com"
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <button
                  onClick={searchRunner}
                  disabled={!query.trim()}
                  className={`w-full font-bold py-4 rounded-2xl text-white transition-all text-base ${
                    query.trim()
                      ? "bg-red-600 hover:bg-red-700 hover:scale-[1.02]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Find My Registration →
                </button>
              </>
            )}
          </div>
        )}

        {/* ── STEP 2: SUBMIT ── */}
        {step === "submit" && runner && (
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-5">

            {/* Event badge */}
            {selectedEvent && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2 text-center">
                <span className="text-red-600 font-bold text-sm">📅 {selectedEvent.title}</span>
              </div>
            )}

            {/* Runner info */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {runner.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-gray-800">{runner.name}</div>
                <div className="text-gray-500 text-xs">{runner.email} · {runner.phone}</div>
              </div>
            </div>

            {/* ✅ Distance — grouped buttons, no custom input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Select Your Distance *
              </label>
              <div className="space-y-4">
                {DISTANCE_GROUPS.map(group => (
                  <div key={group.label}>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      {group.label}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {group.options.map(d => (
                        <button
                          key={d}
                          onClick={() => setDistance(d)}
                          className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                            distance === d
                              ? "bg-red-600 border-red-600 text-white"
                              : "border-gray-200 text-gray-600 hover:border-red-300"
                          }`}
                        >
                          {d.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected preview */}
              {distance && (
                <div className="mt-3 text-center">
                  <span className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold px-4 py-1.5 rounded-full">
                    ✓ Selected: {distance.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* ✅ Timing — dropdowns HH:MM:SS */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Completion Time{" "}
                <span className="text-gray-400 font-normal text-xs">
                  (for leaderboard ranking)
                </span>
              </label>
              <div className="flex gap-2 items-center">
                {/* Hours */}
                <select
                  value={timingH}
                  onChange={e => setTimingH(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-red-500 text-center font-bold"
                >
                  <option value="">HH</option>
                  {Array.from({length: 12}, (_, i) => i).map(h => (
                    <option key={h} value={String(h).padStart(2, "0")}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <span className="font-black text-gray-400 text-xl">:</span>
                {/* Minutes */}
                <select
                  value={timingM}
                  onChange={e => setTimingM(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-red-500 text-center font-bold"
                >
                  <option value="">MM</option>
                  {Array.from({length: 60}, (_, i) => i).map(m => (
                    <option key={m} value={String(m).padStart(2, "0")}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <span className="font-black text-gray-400 text-xl">:</span>
                {/* Seconds */}
                <select
                  value={timingS}
                  onChange={e => setTimingS(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-2 py-3 text-sm focus:outline-none focus:border-red-500 text-center font-bold"
                >
                  <option value="">SS</option>
                  {Array.from({length: 60}, (_, i) => i).map(s => (
                    <option key={s} value={String(s).padStart(2, "0")}>
                      {String(s).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-400 text-xs mt-1.5">
                🏆 Hours : Minutes : Seconds — Fastest time = Top of leaderboard
                 ⚠️ Wrong or missing time will not appear on leaderboard
              </p>
              {/* Preview */}
              {timingH && timingM && (
                <div className="mt-2 text-center">
                  <span className="bg-gray-50 border border-gray-200 text-gray-600 text-sm font-bold px-4 py-1.5 rounded-full">
                    ⏱ {timingH}:{timingM}:{timingS || "00"}
                  </span>
                </div>
              )}
            </div>

            {/* Screenshot */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Run Screenshot *
              </label>
              <label className="block border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-red-300 transition-colors text-center">
                {preview ? (
                  <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-xl object-contain"/>
                ) : (
                  <>
                    <div className="text-4xl mb-2">📸</div>
                    <div className="text-gray-500 text-sm font-medium">
                      Click to upload your screenshot
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      Strava · Nike Run Club · Garmin · Google Fit · Any GPS app
                    </div>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
              </label>
            </div>

            {/* Submit button */}
            <button
              onClick={submitRun}
              disabled={loading || !distance || !file}
              className={`w-full font-bold py-4 rounded-2xl text-white text-base transition-all ${
                !loading && distance && file
                  ? "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit Activity →"}
            </button>

            {/* Verification info */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <div className="text-green-700 font-bold text-sm mb-1">
                ✅ What happens after submission?
              </div>
              <div className="text-green-600 text-xs leading-relaxed">
                Your activity will be verified within <strong>24 hours</strong>.
                Once verified, you will receive your <strong>e-certificate</strong> and
                your medal dispatch process will begin. 🏅
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
            >
              ← Go back
            </button>
          </div>
        )}

        {/* ── STEP 3: DONE ── */}
        {step === "done" && (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black mb-3 text-gray-800">
              Successfully Submitted!
            </h2>
            <p className="text-gray-600 mb-2 text-sm font-medium">
              Your activity is under review.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-6 mt-4">
              {[
                { icon: "⏳", text: "Activity verification within 24 hours" },
                { icon: "📜", text: "E-certificate sent after verification in mail" },
                { icon: "🏅", text: "Medal dispatch process begins" },
                { icon: "📦", text: "Medal delivered to your address" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">{s.icon}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
