import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { Blog } from "@/types";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image */}
      <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
            <span className="text-4xl text-green-200">VFH</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {blog.author?.name || "Admin"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(blog.createdAt)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
            {blog.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{blog.shortDescription || "Read more about this article..."}</p>

        {/* Read More */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
        >
          Read More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
