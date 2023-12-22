import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeRemaining("অফার শেষ।");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div className="flex flex-col gap-7 justify-center items-center">
      <h2 className="text-center text-4xl text-[#8F268F] ">
        অফার শেষ হবে ......
      </h2>
      <div className="text-center text-3xl md:text-6xl font-bold bg-[#8F268F]  p-7 text-rose-100 px-10 w-full md:w-[40rem]">
        {timeRemaining}
      </div>
    </div>
  );
};

export default Countdown;
