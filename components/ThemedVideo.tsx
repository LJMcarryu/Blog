"use client";

import { useEffect, useState } from "react";

export default function ThemedVideo() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    function sync() {
      setDark(document.documentElement.classList.contains("dark"));
    }

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const baseClass = "fixed inset-0 w-full h-full object-cover -z-10";

  return (
    <>
      <video
        autoPlay muted loop playsInline
        className={baseClass}
        style={{ visibility: dark ? "visible" : "hidden" }}
      >
        <source src="/home_bg_video_dark.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay muted loop playsInline
        className={baseClass}
        style={{ visibility: dark ? "hidden" : "visible" }}
      >
        <source src="/home_bg_video_light.mp4" type="video/mp4" />
      </video>
    </>
  );
}
