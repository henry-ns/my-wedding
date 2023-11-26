"use client";

import { useEffect, useState } from "react";
import { env } from "../../env";
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
      className="z-10 flex min-h-screen items-center justify-center"
    >
      <div className="top-0s absolute left-0 min-h-screen w-20 translate-y-1/3 bg-primary-400/50" />

      <div className="flex space-x-5">
        <TimerUnit label="dias" value={days} />
        <TimerUnit label="horas" value={hours} />
        <TimerUnit label="minutos" value={minutes} />
        <TimerUnit label="segundos" value={seconds} />
      </div>
    </section>
  );
}
