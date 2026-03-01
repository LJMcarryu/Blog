"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="prose m-auto text-center py-20">
      <h2 className="slide-enter-1">Something went wrong</h2>
      <p
        className="text-sm slide-enter-2"
        style={{ color: "var(--fg-light)" }}
      >
        {error.message || "An error occurred while rendering this page."}
      </p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 transition-colors hover:border-gray-400 dark:hover:border-gray-500 slide-enter-3"
        style={{ color: "var(--fg)" }}
      >
        Try again
      </button>
    </div>
  );
}
