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

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) return children;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.shortDescription || blog.title,
    image: blog.image || `${BASE_URL}/VoiceForHelpLogo.jpeg`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: blog.author?.name || "Voice For Help Trust",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Voice For Help Trust",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/VoiceForHelpLogo.jpeg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blogs/${blog.slug}`,
    },
    wordCount: blog.content ? blog.content.replace(/<[^>]+>/g, "").split(/\s+/).length : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blogs` },
      { "@type": "ListItem", position: 3, name: blog.title, item: `${BASE_URL}/blogs/${blog.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
