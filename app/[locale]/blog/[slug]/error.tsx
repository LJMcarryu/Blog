"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="prose m-auto text-center py-20">
      <h2 className="slide-enter-1">
        {t("title")}
      </h2>
      <p
        className="text-sm slide-enter-2"
        style={{ color: "var(--fg-light)" }}
      >
        {error.message || t("fallback")}
      </p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 text-sm rounded-lg border transition-opacity opacity-60 hover:opacity-100 slide-enter-3"
        style={{
          color: "var(--fg)",
          borderColor: "var(--border)"
        }}
      >
        {t("retry")}
      </button>
    </div>
  );
}
