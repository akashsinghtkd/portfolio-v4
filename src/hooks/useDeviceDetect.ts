"use client";

import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTouch: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setDevice({ isMobile, isTouch, reducedMotion });

    const handleResize = () => {
      setDevice((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 768,
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
