interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string;
  prevLabel: string;
  nextLabel: string;
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

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <a
          key={page}
          href={pageHref(page)}
          className="pagination-link"
          data-active={page === currentPage ? "true" : undefined}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </a>
      ))}

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
