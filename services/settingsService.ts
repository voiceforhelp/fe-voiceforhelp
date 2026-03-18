import api from "@/lib/api";

export interface SiteSetting {
  _id: string;
  key: string;
  value: any;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const settingsService = {
  getPublicSettings: async () => {
    const res = await api.get<{ success: boolean; settings: Record<string, any> }>("/settings/public");
    return res.data;
  },

  getAllSettings: async () => {
    const res = await api.get<{ success: boolean; settings: SiteSetting[] }>("/settings");
    return res.data;
  },

  upsertSetting: async (key: string, value: any, description?: string) => {
    const res = await api.put<{ success: boolean; setting: SiteSetting }>("/settings", { key, value, description });
    return res.data;
  },

  bulkUpdateSettings: async (settings: { key: string; value: any; description?: string }[]) => {
    const res = await api.put<{ success: boolean; settings: SiteSetting[] }>("/settings/bulk", { settings });
    return res.data;
  },

  deleteSetting: async (id: string) => {
    const res = await api.delete(`/settings/${id}`);
    return res.data;
  },
};
