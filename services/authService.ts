import api from "@/lib/api";
import type { User, LoginForm, RegisterForm, OTPVerifyForm, ResetPasswordForm } from "@/types";

export const authService = {
  login: async (data: LoginForm) => {
    const res = await api.post<{ success: boolean; token: string; user: User; requiresOTP?: boolean; email?: string; message?: string }>("/auth/login", data);
    return res.data;
  },

  register: async (data: Omit<RegisterForm, "confirmPassword">) => {
    const res = await api.post<{ success: boolean; message: string; email: string; requiresOTP: boolean }>("/auth/register", data);
    return res.data;
  },

  verifyRegister: async (data: OTPVerifyForm) => {
    const res = await api.post<{ success: boolean; token: string; user: User; message: string }>("/auth/verify-register", data);
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await api.post<{ success: boolean; message: string }>("/auth/forgot-password", { email });
    return res.data;
  },

  verifyResetOTP: async (data: OTPVerifyForm) => {
    const res = await api.post<{ success: boolean; resetToken: string; message: string }>("/auth/verify-reset-otp", data);
    return res.data;
  },

  resetPassword: async (data: ResetPasswordForm) => {
    const res = await api.post<{ success: boolean; message: string }>("/auth/reset-password", data);
    return res.data;
  },

  resendOTP: async (email: string, purpose: "register" | "reset-password") => {
    const res = await api.post<{ success: boolean; message: string }>("/auth/resend-otp", { email, purpose });
    return res.data;
  },

  getMe: async () => {
    const res = await api.get<{ success: boolean; user: User }>("/auth/me");
    return res.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const res = await api.put<{ success: boolean; user: User }>("/auth/profile", data);
    return res.data;
  },
};
