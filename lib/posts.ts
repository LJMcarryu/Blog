import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
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
      try {
        const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
        const { data, content } = matter(raw);

        return {
          slug,
          title: data.title ?? slug,
          date: data.date ?? "",
          description: data.description ?? "",
          tags: Array.isArray(data.tags) ? data.tags : [],
          content,
        };
      } catch {
        return {
          slug,
          title: slug,
          date: "",
          description: "",
          tags: [],
          content: "",
        };
      }
    })
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta;
    });
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const filePath = path.join(contentDir, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      content,
    };
  } catch {
    return null;
  }
}
