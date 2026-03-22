// "use client";

// import { useEffect, useState } from "react";

// export default function CountdownTimer({ targetDate }) {
//   const [timeLeft, setTimeLeft] = useState({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const diff = new Date(targetDate) - new Date();
//       if (diff <= 0) {
//         clearInterval(interval);
//         setTimeLeft({});
//         return;
//       }

//       setTimeLeft({
//         days: Math.floor(diff / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((diff / 1000 / 60) % 60),
//         seconds: Math.floor((diff / 1000) % 60),
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetDate]);

//   if (!timeLeft.days && !timeLeft.hours) return <p>Event started!</p>;

//   return (
//     <div className="flex space-x-4 text-white text-center mt-4">
//       <div>
//         <span className="font-bold text-2xl">{timeLeft.days}</span>
//         <div className="text-sm">Days</div>
//       </div>
//       <div>
//         <span className="font-bold text-2xl">{timeLeft.hours}</span>
//         <div className="text-sm">Hours</div>
//       </div>
//       <div>
//         <span className="font-bold text-2xl">{timeLeft.minutes}</span>
//         <div className="text-sm">Minutes</div>
//       </div>
//       <div>
//         <span className="font-bold text-2xl">{timeLeft.seconds}</span>
//         <div className="text-sm">Seconds</div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // Target: TODAY March 22 at 11:59:59 PM (registration closes tonight)
    const target = new Date();
    target.setHours(23, 59, 59, 0);

    const interval = setInterval(() => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (expired) return <p className="text-red-500 font-semibold">Registrations Closed!</p>;
  if (!timeLeft) return null;

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center space-x-2 mt-2">
      <span className="text-sm text-gray-600">Closes in:</span>
      {[
        { value: timeLeft.days, label: "d" },
        { value: timeLeft.hours, label: "h" },
        { value: timeLeft.minutes, label: "m" },
        { value: timeLeft.seconds, label: "s" },
      ].map(({ value, label }) => (
        <span
          key={label}
          className="border border-red-500 text-red-500 text-sm font-semibold px-2 py-0.5 rounded-full"
        >
          {pad(value)}{label}
        </span>
      ))}
    </div>
  );
}