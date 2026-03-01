export type BookStatus = "reading" | "read" | "want";

export interface Book {
  title: string;
  author: string;
  rating?: number; // 1–5，仅"已读"填写
  note?: string;
}

// ✏️ 在这里填写你的书单 / Edit your book list here
export const BOOKS: Record<BookStatus, Book[]> = {
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
