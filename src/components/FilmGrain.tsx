"use client";

import { useDeviceDetect } from "@/hooks/useDeviceDetect";

export default function FilmGrain() {
  const { isMobile } = useDeviceDetect();

  if (isMobile) return null;

  return <div className="film-grain film-grain-animated" />;
}
