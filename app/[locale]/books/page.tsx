import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BOOKS, type BookStatus } from "@/data/books";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "books" });
  return { title: t("title") };
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-xs" style={{ color: "#facc15" }} aria-label={`${count} stars`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default async function BooksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "books" });

  const sections: { key: BookStatus; label: string }[] = [
    { key: "reading", label: t("reading") },
    { key: "read", label: t("read") },
    { key: "want", label: t("want") },
  ];

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {sections.map(({ key, label }) =>
          BOOKS[key].length > 0 ? (
            <div key={key}>
              <h3 className="mt-8 mb-4">{label}</h3>
              <div className="not-prose flex flex-col gap-3">
                {BOOKS[key].map((book) => (
                  <div
                    key={book.title}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: "rgba(125, 125, 125, 0.2)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--fg-light)" }}>
                          {book.author}
                        </p>
                      </div>
                      {book.rating !== undefined && (
                        <Stars count={book.rating} />
                      )}
                    </div>
                    {book.note && (
                      <p className="text-xs mt-2 italic" style={{ color: "var(--fg-light)" }}>
                        {book.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
