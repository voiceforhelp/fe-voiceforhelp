import api from "@/lib/api";
import type { DashboardStats, Donation, VideoImpact, Category, Volunteer } from "@/types";

export const adminService = {
  getDashboardStats: async () => {
    const res = await api.get<{ success: boolean; stats: DashboardStats }>("/analytics/dashboard");
    return res.data;
  },

  getDailyDonations: async () => {
    const res = await api.get<{ success: boolean; data: { date: string; amount: number; count: number }[] }>("/analytics/daily");
    return res.data;
  },

  getMonthlyDonations: async () => {
    const res = await api.get<{ success: boolean; data: { month: string; amount: number; count: number }[] }>("/analytics/monthly");
    return res.data;
  },

  getCategoryWiseDonations: async () => {
    const res = await api.get<{ success: boolean; data: { name: string; totalAmount: number; count: number }[] }>("/analytics/categories");
    return res.data;
  },

  getDonations: async (page = 1, search = "") => {
    const res = await api.get<{ success: boolean; donations: Donation[]; total: number; page: number; pages: number }>(
      `/donations?page=${page}&search=${search}`
    );
    return res.data;
  },

  getDonationsByGroupDate: async (date: string) => {
    const res = await api.get<{ success: boolean; donations: Donation[]; totalAmount: number; count: number }>(
      `/donations/group/${date}`
    );
    return res.data;
  },

  updateDonationStatus: async (id: string, paymentStatus: string, transactionId?: string) => {
    const res = await api.put(`/donations/${id}/status`, { paymentStatus, transactionId });
    return res.data;
  },

  // Videos
  uploadVideo: async (formData: FormData) => {
    const res = await api.post<{ success: boolean; video: VideoImpact }>("/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateVideo: async (id: string, data: Partial<VideoImpact>) => {
    const res = await api.put<{ success: boolean; video: VideoImpact }>(`/videos/${id}`, data);
    return res.data;
  },

  deleteVideo: async (id: string) => {
    const res = await api.delete(`/videos/${id}`);
    return res.data;
  },

  // Categories
  getAllCategories: async () => {
    const res = await api.get<{ success: boolean; categories: Category[] }>("/categories/all");
    return res.data;
  },

  createCategory: async (data: Partial<Category>) => {
    const res = await api.post<{ success: boolean; category: Category }>("/categories", data);
    return res.data;
  },

  updateCategory: async (id: string, data: Partial<Category>) => {
    const res = await api.put<{ success: boolean; category: Category }>(`/categories/${id}`, data);
    return res.data;
  },

  deleteCategory: async (id: string) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  },

  // Volunteers
  getVolunteers: async (page = 1, status = "") => {
    const res = await api.get<{ success: boolean; volunteers: Volunteer[]; total: number; page: number; pages: number }>(
      `/volunteers?page=${page}${status ? `&status=${status}` : ""}`
    );
    return res.data;
  },

  updateVolunteerStatus: async (id: string, status: string) => {
    const res = await api.put(`/volunteers/${id}/status`, { status });
    return res.data;
  },

  // Upload
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post<{ success: boolean; url: string }>("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  uploadVideoFile: async (file: File) => {
    const formData = new FormData();
    formData.append("video", file);
    const res = await api.post<{ success: boolean; url: string }>("/upload/video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
