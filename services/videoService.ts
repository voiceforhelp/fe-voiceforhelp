import api from "@/lib/api";
import type { VideoImpact, VideoComment } from "@/types";

export const videoService = {
  getVideos: async (page = 1, limit = 12) => {
    const res = await api.get<{ success: boolean; videos: VideoImpact[]; total: number; page: number; pages: number }>(
      `/videos?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  getAllVideos: async (page = 1, limit = 12) => {
    const res = await api.get<{ success: boolean; videos: VideoImpact[]; total: number; page: number; pages: number }>(
      `/videos?page=${page}&limit=${limit}&all=true`
    );
    return res.data;
  },

  getVideoById: async (id: string) => {
    const res = await api.get<{ success: boolean; video: VideoImpact }>(`/videos/${id}`);
    return res.data;
  },

  getMyVideos: async () => {
    const res = await api.get<{ success: boolean; count: number; videos: VideoImpact[] }>("/videos/user/my");
    return res.data;
  },

  getRelatedVideos: async (id: string, limit = 20) => {
    const res = await api.get<{ success: boolean; videos: VideoImpact[] }>(
      `/videos/${id}/related?limit=${limit}`
    );
    return res.data;
  },

  getReelsFeed: async (page = 1, limit = 10, category?: string, exclude?: string) => {
    let url = `/videos/feed/reels?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (exclude) url += `&exclude=${exclude}`;
    const res = await api.get<{ success: boolean; videos: VideoImpact[]; total: number; pages: number }>(url);
    return res.data;
  },

  // ═══ Likes ═══
  toggleLike: async (videoId: string) => {
    const res = await api.post<{ success: boolean; liked: boolean }>(`/videos/${videoId}/like`);
    return res.data;
  },

  getLikeStatus: async (videoId: string) => {
    const res = await api.get<{ success: boolean; liked: boolean }>(`/videos/${videoId}/like-status`);
    return res.data;
  },

  // ═══ Comments ═══
  getComments: async (videoId: string, page = 1, limit = 20) => {
    const res = await api.get<{
      success: boolean;
      comments: VideoComment[];
      total: number;
      page: number;
      pages: number;
    }>(`/videos/${videoId}/comments?page=${page}&limit=${limit}`);
    return res.data;
  },

  addComment: async (videoId: string, text: string) => {
    const res = await api.post<{ success: boolean; comment: VideoComment }>(`/videos/${videoId}/comments`, { text });
    return res.data;
  },

  deleteComment: async (videoId: string, commentId: string) => {
    const res = await api.delete<{ success: boolean }>(`/videos/${videoId}/comments/${commentId}`);
    return res.data;
  },
};
