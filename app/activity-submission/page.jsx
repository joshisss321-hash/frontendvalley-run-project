"use client";

import { useState } from "react";
import { toast } from "react-toastify";




export default function ActivitySubmission() {

const [query,setQuery] = useState("");
const [runner,setRunner] = useState(null);
const [step,setStep] = useState("search");

const [distance,setDistance] = useState("");
const [file,setFile] = useState(null);

const [loading, setLoading] = useState(false);

// 🔍 SEARCH
async function searchRunner(){
try{

const res = await fetch("https://valleyrunproject.onrender.com/api/search-runner",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({query})
});

const data = await res.json();

if(data.runner){
setRunner(data.runner);
setStep("submit");
toast.success("Registration found ✅");
}else{
toast.error("Registration not found ❌");
}

}catch(err){
console.log(err);
toast.error("Server error");
}
}


// 📤 SUBMIT (CLOUDINARY SUPPORT)
const submit = async () => {

if(loading) return; // 🚫 double click block

try{

if(!file){
toast.error("Please upload screenshot 📸");
return;
}

setLoading(true); // start loading

const formData = new FormData();

formData.append("name", runner.name);
formData.append("email", runner.email);
formData.append("phone", runner.phone);
formData.append("distance", distance);
formData.append("image", file);

const res = await fetch("https://valleyrunproject.onrender.com/api/submit-run", {
method: "POST",
body: formData
});

const data = await res.json();

if (data.error) {
toast.error(data.error);
} else {
toast.success("Activity submitted successfully 🎉");

// reset
setStep("search");
setQuery("");
setDistance("");
setFile(null);
}

}catch(err){
console.log(err);
toast.error("Something went wrong");
}

finally{
setLoading(false); // stop loading
}

};
return (

<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10">

<div className="max-w-5xl mx-auto px-6">

{/* Hero */}

<div className="text-center mb-10">

<h1 className="text-4xl font-bold">
Shaheed Diwas Tribute Run
</h1>

<p className="text-gray-600 mt-2">
Activity Submission Portal
</p>

<p className="text-sm text-gray-500 mt-3">
Submit your activity screenshot here. Once verified, you will receive your medal.
</p>

</div>


{/* Info Cards */}

<div className="grid md:grid-cols-2 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold">Challenge Period</h3>
<p className="text-gray-500">23 March – 28 March</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold">Valid Apps</h3>
<p className="text-gray-500">Strava / Garmin / Nike Run Club</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold">Upload Screenshot</h3>
<p className="text-gray-500">Distance, Time & Pace must be visible</p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold">Medal Delivery</h3>
<p className="text-gray-500">1–7 days after verification</p>
</div>

</div>


{/* Rules */}

<div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-10 rounded">

<h3 className="font-semibold mb-2">Important Rules</h3>

<ul className="text-sm text-gray-700 space-y-1">
<li>Distance must be completed in ONE session</li>
<li>Breaks allowed but split runs not allowed</li>
<li>Screenshot must show distance, time and pace</li>
</ul>

</div>


{/* Search */}

{step==="search" && (

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold mb-3">
Find Your Registration
</h3>

<p className="text-sm text-gray-500 mb-4">
Enter your registered email or phone number
</p>

<div className="flex gap-3">

<input
className="border p-3 rounded w-full"
placeholder="Email or Phone"
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

<button
onClick={submit}
disabled={loading}
className={`px-6 py-3 rounded text-white ${
loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
}`}
>
{loading ? "Submitting..." : "Submit Activity"}
</button>

</div>

</div>

)}


{/* Submission */}

{step==="submit" && (

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">
Submit Your Activity
</h3>

<p className="text-gray-500 mb-4">
Runner: {runner.name}
</p>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
className="border p-3 w-full mb-3"
/>

<input
placeholder="Distance Completed"
value={distance}
onChange={(e)=>setDistance(e.target.value)}
className="border p-3 w-full mb-3"
/>
<button
onClick={submit}
disabled={loading}
className={`px-6 py-3 rounded text-white ${
loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
}`}
>
{loading ? "Submitting..." : "Submit Activity"}
</button>

</div>

)}


{/* Medal Review */}

<div className="mt-16 bg-gray-50 p-8 rounded-xl text-center">

<h3 className="text-xl font-semibold mb-3">
After Receiving Your Medal 🎉
</h3>

<p className="text-gray-600 mb-4">
Once your medal reaches you, come back here and upload your photo with the medal along with your feedback.
</p>

<p className="text-sm text-gray-500">
Selected photos will be featured on our official page.
</p>

</div>


{/* FAQ */}

<div className="mt-16">

<h2 className="text-2xl font-bold text-center mb-8">
Frequently Asked Questions
</h2>

<div className="space-y-4">

{[
{q:"When should I complete the challenge?",a:"You can complete your run anytime between 23 March and 28 March."},
{q:"How do I submit my activity?",a:"After completing your run, come back here and upload your running app screenshot."},
{q:"Which apps are valid?",a:"Strava, Garmin, Nike Run Club or any app showing distance and time."},
{q:"Is there a time limit?",a:"No strict time limit, but distance must be completed in one session."},
{q:"Can I take breaks?",a:"Yes, short breaks are allowed."},
{q:"Can I split distance?",a:"No, it must be completed in one session."},
{q:"When will I receive my medal?",a:"Within 1–7 days after verification."}
].map((item,index)=>(

<details key={index} className="bg-white p-5 rounded-lg shadow cursor-pointer hover:shadow-md">
<summary className="font-semibold">{item.q}</summary>
<p className="text-gray-600 mt-2">{item.a}</p>
</details>

))}

</div>

</div>

</div>

</div>

);
}