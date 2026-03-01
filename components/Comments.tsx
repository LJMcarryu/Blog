"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const GISCUS_REPO = "LJMcarryu/Blog";
const GISCUS_REPO_ID = "R_kgDORbknjA";
const GISCUS_CATEGORY = "Announcements";
const GISCUS_CATEGORY_ID = "DIC_kwDORbknjM4C3c0j";

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

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
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", locale === "zh" ? "zh-CN" : "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, [locale]);

  return <div ref={ref} />;
}
