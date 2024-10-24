import { useEffect, useState } from "react";

interface OtpTimerProps {
  initialTime: number;
  onTimerExpire: () => void; // Callback when timer expires
  isResending: boolean; // Track if OTP is being resent
}

const OtpTimer = ({
  initialTime,
  onTimerExpire,
  isResending,
}: OtpTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      onTimerExpire(); // Trigger when timer reaches 0
    }

    return () => clearTimeout(timer);
  }, [timeLeft, onTimerExpire]);

  // Reset timer if resend OTP is triggered
  useEffect(() => {
    if (isResending) {
      setTimeLeft(initialTime); // Reset the timer
    }
  }, [isResending, initialTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-center">
      <p className="text-gray-500 dark:text-gray-400">
        Time remaining: {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default OtpTimer;
