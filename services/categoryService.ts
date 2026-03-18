import api from "@/lib/api";
import type { Category } from "@/types";

export const categoryService = {
  getCategories: async () => {
    const res = await api.get<{ success: boolean; categories: Category[] }>("/categories");
    return res.data;
  },
};
