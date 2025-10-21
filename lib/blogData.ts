// lib/blogData.ts
export type BlogPost = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string | null;
};

const STORAGE_KEY = 'cricketingVeinsBlogs';

// Default initial static blog posts
const defaultBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to Cricketing Veins",
    category: "Community",
    excerpt: "Get the latest news about cricket, services, and exciting events.",
    content:
      "Welcome to Cricketing Veins! This is your hub for everything cricket related.\n\nStay tuned for updates and exciting news as we bring the best of cricket services to you.",
    author: "Admin",
    date: "2025-09-08",
    imageUrl: null,
  },
];

function loadFromLocalStorage(): BlogPost[] {
  if (typeof window === 'undefined') return defaultBlogs;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultBlogs;
}

function saveToLocalStorage(blogs: BlogPost[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

export function getAllBlogPosts(): BlogPost[] {
  return loadFromLocalStorage();
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return loadFromLocalStorage().find((post) => post.id === id);
}

export function addBlogPost(post: BlogPost) {
  const blogs = loadFromLocalStorage();
  blogs.push(post);
  saveToLocalStorage(blogs);
}

export function deleteBlogPost(id: number) {
  let blogs = loadFromLocalStorage();
  blogs = blogs.filter((post) => post.id !== id);
  saveToLocalStorage(blogs);
}
