"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({});
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
  }, [targetDate]);

  if (!timeLeft.days && !timeLeft.hours) return <p>Event started!</p>;

  return (
    <div className="flex space-x-4 text-white text-center mt-4">
      <div>
        <span className="font-bold text-2xl">{timeLeft.days}</span>
        <div className="text-sm">Days</div>
      </div>
      <div>
        <span className="font-bold text-2xl">{timeLeft.hours}</span>
        <div className="text-sm">Hours</div>
      </div>
      <div>
        <span className="font-bold text-2xl">{timeLeft.minutes}</span>
        <div className="text-sm">Minutes</div>
      </div>
      <div>
        <span className="font-bold text-2xl">{timeLeft.seconds}</span>
        <div className="text-sm">Seconds</div>
      </div>
    </div>
  );
}
