"use client";

import { useEffect, useState } from "react";

/** The current time in `timeZone` as "09:41", refreshed every 10s. Empty until mounted, so server and client markup match. */
export default function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-AU", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, [timeZone]);
  return time;
}
