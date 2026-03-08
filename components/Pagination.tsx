interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string;
  prevLabel: string;
  nextLabel: string;
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseHref,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function pageHref(page: number) {
    const separator = baseHref.includes("?") ? "&" : "?";
    return page === 1 ? baseHref : `${baseHref}${separator}page=${page}`;
  }

  const pages = getPageRange(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-10 text-sm"
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <a href={pageHref(currentPage - 1)} className="pagination-link">
          {prevLabel}
        </a>
      ) : (
        <span className="pagination-link disabled">{prevLabel}</span>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="pagination-link disabled" aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <a
            key={page}
            href={pageHref(page)}
            className="pagination-link"
            data-active={page === currentPage ? "true" : undefined}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </a>
        )
      )}

      {currentPage < totalPages ? (
        <a href={pageHref(currentPage + 1)} className="pagination-link">
          {nextLabel}
        </a>
      ) : (
        <span className="pagination-link disabled">{nextLabel}</span>
      )}
    </nav>
  );
}
