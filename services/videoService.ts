import api from "@/lib/api";
import type { VideoImpact } from "@/types";

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
};
