import api from "@/lib/api";
import type { Donation, DonationForm, FastDonationForm, UPIPaymentData } from "@/types";

export const donationService = {
  createDonation: async (data: DonationForm) => {
    const res = await api.post<{ success: boolean; donation: Donation; payment: UPIPaymentData }>("/donations", data);
    return res.data;
  },

  createFastDonation: async (data: FastDonationForm) => {
    const res = await api.post<{ success: boolean; donation: Donation; payment: UPIPaymentData }>("/donations/fast", data);
    return res.data;
  },

  getMyDonations: async () => {
    const res = await api.get<{ success: boolean; count: number; donations: Donation[] }>("/donations/my");
    return res.data;
  },

  getRecentDonors: async () => {
    const res = await api.get<{ success: boolean; donors: Donation[] }>("/donations/recent");
    return res.data;
  },
};
