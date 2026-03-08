const FALLBACK_URL = "https://example.com";

let warned = false;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) {
    if (!warned) {
      console.warn(
        "[env] NEXT_PUBLIC_SITE_URL is not set — falling back to",
        FALLBACK_URL
      );
      warned = true;
    }
    return FALLBACK_URL;
  }
  return url;
}
