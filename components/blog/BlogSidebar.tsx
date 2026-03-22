"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Clock } from "lucide-react";
import { blogService } from "@/services/blogService";
import type { Blog } from "@/types";

interface BlogSidebarProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearch: () => void;
}

export default function BlogSidebar({ searchValue, onSearchChange, onSearch }: BlogSidebarProps) {
  const [popularPosts, setPopularPosts] = useState<Blog[]>([]);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);

  useEffect(() => {
    blogService.getPopularBlogs().then((res) => setPopularPosts(res.blogs)).catch(() => {});
    blogService.getRecentBlogs().then((res) => setRecentPosts(res.blogs)).catch(() => {});
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Search</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search articles..."
            className="flex-1 h-10 rounded-lg border border-gray-200 px-3 text-sm focus:border-green-500 focus:outline-none"
          />
          <button
            onClick={onSearch}
            className="h-10 w-10 rounded-lg bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" /> Popular Posts
          </h3>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <Link key={post._id} href={`/blogs/${post.slug}`} className="flex gap-3 group">
                {post.image ? (
                  <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-green-50 shrink-0 flex items-center justify-center">
                    <span className="text-xs text-green-300">VFH</span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(post.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-600" /> Recent Posts
          </h3>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link key={post._id} href={`/blogs/${post.slug}`} className="block group">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                  {post.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(post.createdAt)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
