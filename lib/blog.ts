import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  categoryName?: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readingTime: string;
}

export function getBlogSlugs() {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs.readdirSync(blogDirectory);
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: realSlug,
      slug: realSlug,
      title: data.title,
      date: data.date,
      category: data.category,
      categoryName: data.categoryName || data.category,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      readingTime: data.readingTime || "5 min read",
      content,
    } as BlogPost;
  } catch (e) {
    return null;
  }
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((post) => post !== null) as BlogPost[];

  // Sort by date
  return posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getLatestBlogs(limit = 6): BlogPost[] {
  return getAllBlogs().slice(0, limit);
}
