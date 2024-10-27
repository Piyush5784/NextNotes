"use client";

import { useEffect, useState } from "react";

const formatTime = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Timer = ({ duration = 180 }: { duration: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <p className="text-right pr-2 pt-2 text-gray-600">
        {formatTime({ time: timeLeft })}
      </p>
    </>
  );
};

export default Timer;
