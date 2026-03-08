"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-current text-sm"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--search-bg)",
          color: "var(--fg)",
        }}
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: "var(--fg-light)" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
}
