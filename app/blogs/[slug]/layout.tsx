import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const BASE_URL = "https://www.voiceforhelp.com";

async function fetchBlog(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blogs/slug/${slug}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.blog) return data.blog;
  } catch {}
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const title = blog.title;
  const description = blog.shortDescription || blog.title;
  const image = blog.image || "/VoiceForHelpLogo.jpeg";
  const url = `${BASE_URL}/blogs/${slug}`;
  const authorName = blog.author?.name || "Voice For Help Trust";

  return {
    title,
    description,
    keywords: [blog.title, "Voice For Help Trust", "NGO blog", "charity India", "donation impact"],
    authors: [{ name: authorName }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Voice For Help Trust",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      authors: [authorName],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
