"use client";

import { useEffect, useState } from "react";
import { env } from "~/env";
import { TimerUnit } from "./timer-unit";

type Timer = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function parseTimer(): Timer {
  let seconds = Math.max(
    Math.floor((env.NEXT_PUBLIC_WEDDING_DATE.getTime() - Date.now()) / 1000),
    0,
  );

  const days = Math.floor(seconds / 86400);
  seconds = seconds % 86400;

  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function TimerSection() {
  const [{ days, hours, minutes, seconds }, setTimer] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(parseTimer());
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <section
      id="timer"
      className="relative z-10 flex items-center justify-center py-64"
    >
      <div className="absolute top-0 left-0 h-[60%] w-5 translate-y-1/2 bg-primary-300/80 md:w-20 sm:w-10" />

      <div>
        <div className="grid grid-cols-2 gap-1 md:flex md:space-x-5">
          <TimerUnit label="dias" value={days} />
          <TimerUnit label="horas" value={hours} />
          <TimerUnit label="minutos" value={minutes} />
          <TimerUnit label="segundos" value={seconds} />

          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 mt-3 h-32 w-32 rotate-45 animate-pulse bg-gray-200/50 md:hidden" />
        </div>

        <div className="-mt-6 mx-auto flex justify-center lg:space-x-52 md:space-x-44">
          <Shape />
          <Shape />
        </div>
      </div>
    </section>
  );
}

function Shape() {
  return (
    <div className="flex animate-[bounce-slow_6s_linear_infinite] items-center justify-center lg:h-40 md:h-32 lg:w-40 md:w-32">
      <div className="rotate-45 bg-gray-200/50 lg:h-32 md:h-24 lg:w-32 md:w-24" />
    </div>
  );
}
