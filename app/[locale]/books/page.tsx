import { getTranslations } from "next-intl/server";

type BookStatus = "reading" | "read" | "want";

interface Book {
  title: string;
  author: string;
  rating?: number; // 1–5，仅"已读"填写
  note?: string;
}

// ✏️ 在这里填写你的书单 / Edit your book list here
const BOOKS: Record<BookStatus, Book[]> = {
  reading: [
    { title: "[ 书名 / Book Title ]", author: "[ 作者 / Author ]" },
  ],
  read: [
    {
      title: "[ 书名 / Book Title ]",
      author: "[ 作者 / Author ]",
      rating: 5,
      note: "[ 一句话评价 / One-line review ]",
    },
  ],
  want: [
    { title: "[ 书名 / Book Title ]", author: "[ 作者 / Author ]" },
  ],
};

function Stars({ count }: { count: number }) {
  return (
    <span className="text-yellow-400 text-xs" aria-label={`${count} stars`}>
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
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {sections.map(({ key, label }) =>
          BOOKS[key].length > 0 ? (
            <div key={key}>
              <h3 className="mt-8 mb-4">{label}</h3>
              <div className="not-prose flex flex-col gap-3">
                {BOOKS[key].map((book, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-sm">{book.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {book.author}
                        </p>
                      </div>
                      {book.rating !== undefined && (
                        <Stars count={book.rating} />
                      )}
                    </div>
                    {book.note && (
                      <p className="text-xs text-gray-500 mt-2 italic">
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
