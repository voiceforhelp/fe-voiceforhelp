import api from "@/lib/api";
import type { Blog } from "@/types";

export const blogService = {
  getBlogs: async (page = 1, search = "") => {
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.append("search", search);
    const res = await api.get<{ success: boolean; blogs: Blog[]; total: number; page: number; pages: number }>(
      `/blogs?${params.toString()}`
    );
    return res.data;
  },

  getBlogBySlug: async (slug: string) => {
    const res = await api.get<{ success: boolean; blog: Blog }>(`/blogs/slug/${slug}`);
    return res.data;
  },

  getPopularBlogs: async () => {
    const res = await api.get<{ success: boolean; blogs: Blog[] }>("/blogs/popular");
    return res.data;
  },

  getRecentBlogs: async () => {
    const res = await api.get<{ success: boolean; blogs: Blog[] }>("/blogs/recent");
    return res.data;
  },
};
