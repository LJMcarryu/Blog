/**
 * Calculate reading time for a post.
 * Chinese text: ~400 characters/min
 * English text: ~200 words/min
 *
 * Returns the estimated minutes (minimum 1).
 */
export function getReadingTime(content: string, locale: string): number {
  // Strip MDX/markdown syntax
  const clean = content
    .replace(/^import\s.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/[#*>\[\]!_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  let minutes: number;

  if (locale === "zh") {
    // Chinese: count characters (exclude spaces and ASCII)
    const chineseChars = clean.replace(/[\x00-\x7F]/g, "").length;
    const englishWords = clean
      .replace(/[^\x00-\x7F]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    minutes = chineseChars / 400 + englishWords / 200;
  } else {
    const words = clean.split(/\s+/).filter(Boolean).length;
    minutes = words / 200;
  }

  return Math.max(1, Math.ceil(minutes));
}
