"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Eye, ArrowLeft, Clock } from "lucide-react";
import { blogService } from "@/services/blogService";
import BlogSidebar from "@/components/blog/BlogSidebar";
import type { Blog } from "@/types";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Sidebar search (navigates to listing)
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    if (searchInput.trim()) {
      window.location.href = `/blogs?search=${encodeURIComponent(searchInput)}`;
    }
  };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    blogService
      .getBlogBySlug(slug)
      .then((res) => setBlog(res.blog))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const estimateReadTime = (content: string) => {
    const text = content.replace(/<[^>]+>/g, "");
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-80 bg-gray-200 rounded-xl" />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded" style={{ width: `${80 + Math.random() * 20}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-500 mb-6">The article you are looking for does not exist.</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-green-700 font-medium hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.shortDescription || blog.title,
    image: blog.image || "https://www.voiceforhelp.com/VoiceForHelpLogo.jpeg",
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: blog.author?.name || "Voice For Help Trust",
      url: "https://www.voiceforhelp.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Voice For Help Trust",
      logo: { "@type": "ImageObject", url: "https://www.voiceforhelp.com/VoiceForHelpLogo.jpeg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.voiceforhelp.com/blogs/${blog.slug}`,
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 text-green-200 text-sm hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-green-200 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {blog.author?.name || "Admin"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {estimateReadTime(blog.content)} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" /> {blog.views} views
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Featured Image */}
              {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-96 object-cover" />
              )}

              {/* Article Body */}
              <div className="p-6 md:p-8">
                {blog.shortDescription && (
                  <p className="text-lg text-gray-600 italic border-l-4 border-green-500 pl-4 mb-8">
                    {blog.shortDescription}
                  </p>
                )}

                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-green-700 prose-strong:text-gray-800 prose-blockquote:border-green-500 prose-blockquote:text-gray-500"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <BlogSidebar searchValue={searchInput} onSearchChange={setSearchInput} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}
