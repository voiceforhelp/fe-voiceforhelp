import api from "@/lib/api";
import type { Donation, DonationForm, FastDonationForm, UPIPaymentData } from "@/types";

interface DonationResponse {
  success: boolean;
  donation: Donation;
  paymentMethod: "phonepe" | "upi";
  paymentUrl?: string;
  payment?: UPIPaymentData;
}

interface PaymentStatusResponse {
  success: boolean;
  donation: {
    _id: string;
    name: string;
    amount: number;
    paymentStatus: "pending" | "completed" | "failed";
    transactionId?: string;
    category?: { _id: string; name: string };
    donationDate: string;
    paymentMethod: string;
  };
}

export const donationService = {
  createDonation: async (data: DonationForm): Promise<DonationResponse> => {
    const res = await api.post<DonationResponse>("/donations", data);
    return res.data;
  },

  createFastDonation: async (data: FastDonationForm): Promise<DonationResponse> => {
    const res = await api.post<DonationResponse>("/donations/fast", data);
    return res.data;
  },

  checkPaymentStatus: async (txnId: string): Promise<PaymentStatusResponse> => {
    const res = await api.get<PaymentStatusResponse>(`/donations/phonepe/status/${txnId}`);
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
