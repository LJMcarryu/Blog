"use client";

import { useLocale } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <div className="prose m-auto text-center py-20">
      <h2 className="slide-enter-1">
        {isZh ? "出错了" : "Something went wrong"}
      </h2>
      <p
        className="text-sm slide-enter-2"
        style={{ color: "var(--fg-light)" }}
      >
        {error.message ||
          (isZh
            ? "渲染此页面时发生错误。"
            : "An error occurred while rendering this page.")}
      </p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 text-sm rounded-lg border transition-opacity opacity-60 hover:opacity-100 slide-enter-3"
        style={{
          color: "var(--fg)",
          borderColor: "rgba(125, 125, 125, 0.2)"
        }}
      >
        {isZh ? "重试" : "Try again"}
      </button>
    </div>
  );
}
