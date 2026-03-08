"use client";

import { useDarkMode } from "@/hooks/useDarkMode";

export default function ThemedVideo() {
  const dark = useDarkMode();

  const baseClass = "fixed inset-0 w-full h-full object-cover -z-10";

  return (
    <>
      <video
        autoPlay={dark} muted loop playsInline
        preload={dark ? "auto" : "none"}
        className={baseClass}
        style={{ visibility: dark ? "visible" : "hidden" }}
      >
        <source src="/home_bg_video_dark.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay={!dark} muted loop playsInline
        preload={dark ? "none" : "auto"}
        className={baseClass}
        style={{ visibility: dark ? "hidden" : "visible" }}
      >
        <source src="/home_bg_video_light.mp4" type="video/mp4" />
      </video>
    </>
  );
}
