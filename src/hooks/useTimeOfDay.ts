"use client";

import { useState, useEffect } from "react";

type TimePhase = "dawn" | "day" | "sunset" | "night";

interface TimeOfDay {
  phase: TimePhase;
  hour: number;
  warmth: number; // 0 = cool, 1 = warm
}

export function useTimeOfDay(): TimeOfDay {
  const [time, setTime] = useState<TimeOfDay>({
    phase: "night",
    hour: 0,
    warmth: 0,
  });

  useEffect(() => {
    function getPhase(): TimeOfDay {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8)
        return { phase: "dawn", hour, warmth: 0.6 };
      if (hour >= 8 && hour < 17)
        return { phase: "day", hour, warmth: 0.3 };
      if (hour >= 17 && hour < 20)
        return { phase: "sunset", hour, warmth: 0.9 };
      return { phase: "night", hour, warmth: 0.1 };
    }

    setTime(getPhase());
    const interval = setInterval(() => setTime(getPhase()), 60000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
