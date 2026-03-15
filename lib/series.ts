import { SERIES, type Series } from "@/data/series";

export function getAllSeries(): Series[] {
  return SERIES;
}

export function getSeriesById(id: string): Series | undefined {
  return SERIES.find((s) => s.id === id);
}

export function getSeriesForPost(slug: string): Series[] {
  return SERIES.filter((s) => s.posts.includes(slug));
}

export function getSeriesNavigation(
  seriesId: string,
  slug: string
): { index: number; total: number; prev: string | null; next: string | null } | null {
  const series = getSeriesById(seriesId);
  if (!series) return null;

  const index = series.posts.indexOf(slug);
  if (index === -1) return null;

  return {
    index,
    total: series.posts.length,
    prev: index > 0 ? series.posts[index - 1] : null,
    next: index < series.posts.length - 1 ? series.posts[index + 1] : null,
  };
}
