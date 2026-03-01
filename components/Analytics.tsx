"use client";

export default function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;

  if (!websiteId || !umamiUrl) return null;

  return (
    <script
      defer
      src={`${umamiUrl}/script.js`}
      data-website-id={websiteId}
    />
  );
}
