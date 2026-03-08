"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || "LJMcarryu/Blog";
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_kgDORbknjA";
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_kwDORbknjM4C3c0j";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const initialized = useRef(false);

  // Monitor theme changes
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize Giscus once
  useEffect(() => {
    const container = ref.current;
    if (!container || initialized.current) return;

    initialized.current = true;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", locale === "zh" ? "zh-CN" : "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);
  }, [locale, theme]);

  // Update theme via postMessage (avoids recreating the iframe)
  useEffect(() => {
    const iframe = ref.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme]);

  return <div ref={ref} />;
}
