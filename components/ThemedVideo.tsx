"use client";

import { useEffect, useRef, useState } from "react";

export default function ThemedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    function sync() {
      const isDark = document.documentElement.classList.contains("dark");
      setDark(isDark);
    }

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const src = dark ? "/home_bg_video_dark.mp4" : "/home_bg_video_light.mp4";

  // Reload video when src changes
  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
