"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/BlogCard";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { blogService } from "@/services/blogService";
import type { Blog } from "@/types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    blogService
      .getBlogs(page, search)
      .then((res) => {
        setBlogs(res.blogs);
        setTotalPages(res.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Blog</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Stories of impact, hope and compassion from Voice For Help Trust
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Grid */}
          <div className="lg:col-span-2">
            {search && (
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                Results for &quot;<span className="font-medium text-gray-700">{search}</span>&quot;
                <button
                  onClick={() => {
                    setSearch("");
                    setSearchInput("");
                    setPage(1);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Clear
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                    <div className="h-52 bg-gray-100" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                      <div className="h-5 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-400 text-lg">No blog posts found</p>
                <p className="text-gray-300 text-sm mt-1">Check back soon for new stories</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                      page === p ? "bg-green-700 text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
                  Next
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar searchValue={searchInput} onSearchChange={setSearchInput} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}
