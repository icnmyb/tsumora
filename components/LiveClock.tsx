"use client";

import { useEffect, useState } from "react";

function formatJSTTime(d: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

interface Props {
  initial: string;
}

export function LiveClock({ initial }: Props) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    // Update immediately on mount in case SSR time is stale, then every 30s
    setTime(formatJSTTime(new Date()));
    const id = setInterval(() => setTime(formatJSTTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
