export type BookStatus = "reading" | "read" | "want";

export interface Book {
  title: string;
  author: string;
  rating?: number; // 1–5，仅"已读"填写
  note?: Record<"zh" | "en", string>;
}

export const BOOKS: Record<BookStatus, Book[]> = {
  reading: [
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
    { title: "深入理解 TypeScript", author: "Basarat Ali Syed" },
  ],
  read: [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      rating: 5,
      note: {
        zh: "每个程序员都应该读的书，代码即沟通",
        en: "Every programmer should read this — code is communication",
      },
    },
    {
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      rating: 4,
      note: {
        zh: "虽然有��过时，但核心理念依然受用",
        en: "Somewhat dated, but the core ideas still hold up",
      },
    },
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      rating: 5,
      note: {
        zh: "职业发展的圣经，常读常新",
        en: "A career bible — always worth revisiting",
      },
    },
    {
      title: "Refactoring",
      author: "Martin Fowler",
      rating: 4,
      note: {
        zh: "重构思维的系统训练",
        en: "Systematic training for the refactoring mindset",
      },
    },
  ],
  want: [
    { title: "Rust Programming Language", author: "Steve Klabnik" },
    { title: "System Design Interview", author: "Alex Xu" },
    { title: "A Philosophy of Software Design", author: "John Ousterhout" },
  ],
};
