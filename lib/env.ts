const FALLBACK_URL = "https://example.com";

let warned = false;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) {
    if (!warned) {
      console.warn(
        "[env] NEXT_PUBLIC_SITE_URL is not set — falling back to",
        FALLBACK_URL
      );
      warned = true;
    }
    return FALLBACK_URL;
  }

  // Validate URL format and strip trailing slash
  try {
    const parsed = new URL(raw);
    return parsed.origin + parsed.pathname.replace(/\/+$/, "");
  } catch {
    if (!warned) {
      console.warn("[env] NEXT_PUBLIC_SITE_URL is not a valid URL — falling back to", FALLBACK_URL);
      warned = true;
    }
    return FALLBACK_URL;
  }
}
