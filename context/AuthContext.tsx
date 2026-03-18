"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import { authService } from "@/services/authService";
import type { User, LoginForm, RegisterForm } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginForm) => Promise<{ requiresOTP?: boolean; email?: string }>;
  register: (data: Omit<RegisterForm, "confirmPassword">) => Promise<{ requiresOTP: boolean; email: string }>;
  verifyRegisterOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  setAuthFromToken: (token: string, user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      authService
        .getMe()
        .then((res) => setUser(res.user))
        .catch(() => {
          Cookies.remove("token");
          Cookies.remove("user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginForm) => {
    try {
      const res = await authService.login(data);
      if (res.token && res.user) {
        Cookies.set("token", res.token, { expires: 30 });
        Cookies.set("user", JSON.stringify(res.user), { expires: 30 });
        setUser(res.user);
      }
      return { requiresOTP: false };
    } catch (err: any) {
      // If 403 with requiresOTP, the user needs to verify email first
      if (err.response?.status === 403 && err.response?.data?.requiresOTP) {
        return { requiresOTP: true, email: err.response.data.email };
      }
      throw err;
    }
  };

  const register = async (data: Omit<RegisterForm, "confirmPassword">) => {
    const res = await authService.register(data);
    return { requiresOTP: res.requiresOTP, email: res.email };
  };

  const verifyRegisterOTP = async (email: string, otp: string) => {
    const res = await authService.verifyRegister({ email, otp });
    Cookies.set("token", res.token, { expires: 30 });
    Cookies.set("user", JSON.stringify(res.user), { expires: 30 });
    setUser(res.user);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    window.location.href = "/";
  };

  const updateUser = async (data: Partial<User>) => {
    const res = await authService.updateProfile(data);
    setUser(res.user);
    Cookies.set("user", JSON.stringify(res.user), { expires: 30 });
  };

  const setAuthFromToken = (token: string, user: User) => {
    Cookies.set("token", token, { expires: 30 });
    Cookies.set("user", JSON.stringify(user), { expires: 30 });
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        verifyRegisterOTP,
        logout,
        updateUser,
        setAuthFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
