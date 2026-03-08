"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CodeCopyButton() {
  const t = useTranslations("a11y");
  const copyLabel = t("copyCode");
  const copiedLabel = t("copied");
  const failedLabel = t("copyFailed");

  useEffect(() => {
    function addButtons() {
      document.querySelectorAll("article pre").forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;

        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.type = "button";
        btn.setAttribute("aria-label", copyLabel);
        btn.textContent = copyLabel;

        btn.addEventListener("click", async () => {
          const code = pre.querySelector("code");
          if (!code) return;
          try {
            await navigator.clipboard.writeText(code.textContent ?? "");
            btn.textContent = copiedLabel;
            btn.setAttribute("aria-label", copiedLabel);
            btn.classList.add("copied");
            setTimeout(() => {
              btn.textContent = copyLabel;
              btn.setAttribute("aria-label", copyLabel);
              btn.classList.remove("copied");
            }, 2000);
          } catch {
            btn.textContent = failedLabel;
            btn.setAttribute("aria-label", failedLabel);
            setTimeout(() => {
              btn.textContent = copyLabel;
              btn.setAttribute("aria-label", copyLabel);
            }, 2000);
          }
        });

        (pre as HTMLElement).style.position = "relative";
        pre.appendChild(btn);
      });
    }

    // Run once immediately for any pre blocks already in the DOM
    addButtons();

    // Watch for new pre blocks added by MDX rendering
    const observer = new MutationObserver(addButtons);
    const article = document.querySelector("article");
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [copyLabel, copiedLabel, failedLabel]);

  return null;
}
