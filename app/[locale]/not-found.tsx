import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="not-found-page prose m-auto text-center py-16">
      {/* SVG geometric illustration */}
      <div className="not-found-illustration slide-enter-1" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Floating geometric shapes */}
          <g className="not-found-float">
            {/* Triangle */}
            <polygon
              points="100,45 120,80 80,80"
              stroke="var(--fg-light)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
            {/* Square */}
            <rect
              x="55" y="95" width="25" height="25"
              stroke="var(--fg-light)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
              transform="rotate(15 67.5 107.5)"
            />
            {/* Circle */}
            <circle
              cx="135" cy="110" r="12"
              stroke="var(--fg-light)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Orbiting dot */}
          <g className="not-found-orbit">
            <circle cx="100" cy="40" r="4" fill="var(--fg-light)" opacity="0.5" />
          </g>

          {/* Small decorative dots */}
          <circle cx="60" cy="60" r="2" fill="var(--fg-light)" opacity="0.3" />
          <circle cx="150" cy="70" r="1.5" fill="var(--fg-light)" opacity="0.2" />
          <circle cx="45" cy="140" r="1.5" fill="var(--fg-light)" opacity="0.25" />
          <circle cx="160" cy="150" r="2" fill="var(--fg-light)" opacity="0.2" />
        </svg>
      </div>

      {/* 404 title with gradient */}
      <h1 className="not-found-title slide-enter-2">404</h1>

      <p className="slide-enter-3" style={{ color: "var(--fg-light)", fontSize: "1rem" }}>
        {t("subtitle")}
      </p>

      <p className="slide-enter-4" style={{ color: "var(--fg-light)", fontSize: "0.875rem", opacity: 0.7 }}>
        {t("title")}
      </p>

      <Link
        href="/"
        className="not-prose text-sm slide-enter-5 inline-block transition-opacity opacity-50 hover:opacity-100 mt-4"
        style={{ color: "var(--fg)" }}
      >
        ← {t("backHome")}
      </Link>
    </div>
  );
}
