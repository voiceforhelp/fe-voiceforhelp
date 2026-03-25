import type { MetadataRoute } from "next";

const BASE_URL = "https://www.voiceforhelp.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchPublishedBlogSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API_URL}/blogs?limit=1000`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.blogs) {
      return data.blogs.map((b: { slug: string; updatedAt?: string; createdAt: string }) => ({
        slug: b.slug,
        updatedAt: b.updatedAt || b.createdAt,
      }));
    }
  } catch {}
  return [];
}

async function fetchPublishedVideos(): Promise<{ _id: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${API_URL}/videos?limit=1000`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.videos) {
      return data.videos.map((v: { _id: string; updatedAt?: string; createdAt: string }) => ({
        _id: v._id,
        updatedAt: v.updatedAt || v.createdAt,
      }));
    }
  } catch {}
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, videos] = await Promise.all([
    fetchPublishedBlogSlugs(),
    fetchPublishedVideos(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/impact`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/donate`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/fast-donate`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/volunteer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic video pages
  const videoPages: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${BASE_URL}/videos/${video._id}`,
    lastModified: new Date(video.updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...videoPages];
}
