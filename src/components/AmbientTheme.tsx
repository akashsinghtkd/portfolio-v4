"use client";

import { useEffect } from "react";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";

const themeMap = {
  dawn: {
    "--accent": "#d4956a",
    "--accent-dim": "#a06840",
    "--background": "#0f0a0a",
    "--surface": "#1a1210",
    "--surface-elevated": "#241a16",
    "--grain-opacity": "0.03",
  },
  day: {
    "--accent": "#c4a35a",
    "--accent-dim": "#8b7340",
    "--background": "#0a0a0f",
    "--surface": "#12121a",
    "--surface-elevated": "#1a1a26",
    "--grain-opacity": "0.035",
  },
  sunset: {
    "--accent": "#e8945a",
    "--accent-dim": "#b06830",
    "--background": "#0f0a08",
    "--surface": "#1a1410",
    "--surface-elevated": "#241c16",
    "--grain-opacity": "0.04",
  },
  night: {
    "--accent": "#8a9cc4",
    "--accent-dim": "#5a6a8b",
    "--background": "#06080f",
    "--surface": "#0e1018",
    "--surface-elevated": "#161822",
    "--grain-opacity": "0.03",
  },
} as const;

export default function AmbientTheme() {
  const { phase } = useTimeOfDay();

  useEffect(() => {
    const root = document.documentElement;
    const theme = themeMap[phase];

    // Smoothly transition CSS variables
    root.style.transition = "all 2s cubic-bezier(0.16, 1, 0.3, 1)";

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      root.style.transition = "";
    };
  }, [phase]);

  return null;
}
