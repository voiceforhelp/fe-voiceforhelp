"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/profile");
  }, [isAuthenticated, router]);

  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Logo size="lg" /></div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-gray-500 text-sm">Join VoiceForHelp and start making a difference</p>
          </div>
          <div className="bg-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-gray-700/50">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
