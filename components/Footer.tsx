"use client";

import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/data/social-links";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("footer");
  const { ref } = useScrollReveal();

  return (
    <footer className="site-footer">
      <div className="footer-gradient-border" aria-hidden="true" />
      <div className="site-footer-inner scroll-reveal-target" ref={ref}>
        <p className="footer-cta">{t("getInTouch")}</p>
        <div className="site-footer-links">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            >
              {label}
            </a>
          ))}
          <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        <p>
          &copy; {year} Jimmy&apos;s Blog
        </p>
      </div>
    </footer>
  );
}
