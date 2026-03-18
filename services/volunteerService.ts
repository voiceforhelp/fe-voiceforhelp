import api from "@/lib/api";
import type { Volunteer, VolunteerForm } from "@/types";

export const volunteerService = {
  createVolunteer: async (data: VolunteerForm) => {
    const res = await api.post<{ success: boolean; volunteer: Volunteer }>("/volunteers", data);
    return res.data;
  },
};
