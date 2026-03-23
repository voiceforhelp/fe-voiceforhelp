"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) router.push("/profile");
  }, [loading, isAuthenticated, router]);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Logo size="lg" /></div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
