"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back!");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input label="Email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-gold hover:underline">
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : <><LogIn className="mr-2 h-5 w-5" /> Sign In</>}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-gold font-semibold hover:underline">Register</Link>
      </p>
    </form>
  );
}
