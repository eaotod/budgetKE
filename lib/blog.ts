import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "personal-finance" | "business-tools" | "industry-specific" | "advanced-solutions";
  image: string;
  productLink?: string;
  productLinks?: string[];
  content: string;
  readTime: string;
  featured?: boolean;
}

const blogDirectory = path.join(process.cwd(), "content/blog");

export function getBlogPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const image = data.image ?? data.coverImage;
      const productLinks = data.productLinks ?? (data.productLink ? [data.productLink] : []);
      return {
        slug,
        content,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        image: image ?? "/images/blogs/default-cover.jpg",
        productLink: data.productLink,
        productLinks,
        readTime: data.readTime,
        featured: data.featured || false,
      } as BlogPost;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const image = data.image ?? data.coverImage;
    const productLinks = data.productLinks ?? (data.productLink ? [data.productLink] : []);
    return {
      slug,
      content,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      image: image ?? "/images/blogs/default-cover.jpg",
      productLink: data.productLink,
      productLinks,
      readTime: data.readTime,
      featured: data.featured || false,
    } as BlogPost;
  } catch {
    return null;
  }
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts
    .filter((post) => post.category === category && post.slug !== currentSlug)
    .slice(0, limit);
}

export function getLatestBlogs(limit = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit);
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
