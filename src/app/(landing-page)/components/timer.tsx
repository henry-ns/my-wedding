"use client";

import { useEffect, useState } from "react";
import { env } from "../../../env";
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
      <div className="absolute left-0 top-0 h-[60%] w-5 translate-y-1/2 bg-primary-300/80 sm:w-10 md:w-20" />

      <div>
        <div className="grid grid-cols-2 gap-1 md:flex md:space-x-5">
          <TimerUnit label="dias" value={days} />
          <TimerUnit label="horas" value={hours} />
          <TimerUnit label="minutos" value={minutes} />
          <TimerUnit label="segundos" value={seconds} />

          <div className="absolute left-1/2 top-1/2 mt-3 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse bg-gray-200/50 md:hidden" />
        </div>

        <div className="mx-auto -mt-6 flex justify-center md:space-x-44 lg:space-x-52">
          <Shape />
          <Shape />
        </div>
      </div>
    </section>
  );
}

function Shape() {
  return (
    <div className="flex animate-[bounce-slow_6s_linear_infinite] items-center justify-center md:h-32 md:w-32 lg:h-40 lg:w-40">
      <div className="rotate-45 bg-gray-200/50 md:h-24 md:w-24 lg:h-32 lg:w-32" />
    </div>
  );
}
