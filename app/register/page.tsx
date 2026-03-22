"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

function RegisterContent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") || undefined;

  useEffect(() => {
    if (isAuthenticated) router.push("/profile");
  }, [isAuthenticated, router]);

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Logo size="lg" /></div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 text-sm">Join VoiceForHelp and start making a difference</p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <RegisterForm defaultEmail={prefillEmail} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparency rounded-full animate-spin" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
