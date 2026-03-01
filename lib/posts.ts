import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getPostsByLocale(locale: string): Post[] {
  const dir = path.join(contentDir, locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const filePath = path.join(contentDir, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    content,
  };
}
