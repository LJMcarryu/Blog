"use client";

import { useEffect } from "react";

export default function CodeCopyButton() {
  useEffect(() => {
    function addButtons() {
      document.querySelectorAll("article pre").forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;

        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.setAttribute("aria-label", "Copy code");
        btn.textContent = "Copy";

        btn.addEventListener("click", async () => {
          const code = pre.querySelector("code");
          if (!code) return;
          try {
            await navigator.clipboard.writeText(code.textContent ?? "");
            btn.textContent = "Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.textContent = "Copy";
              btn.classList.remove("copied");
            }, 2000);
          } catch {
            btn.textContent = "Failed";
            setTimeout(() => { btn.textContent = "Copy"; }, 2000);
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
  }, []);

  return null;
}
