"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { register, verifyRegisterOTP } = useAuth();
  const router = useRouter();

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      toast.success("OTP sent to your email!");
      setStep("otp");
      setResendTimer(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await verifyRegisterOTP(form.email, otpString);
      toast.success("Account created successfully!");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.resendOTP(form.email, "register");
      toast.success("OTP resent to your email!");
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <button onClick={() => setStep("form")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-[#d4a843]/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Verify Your Email</h3>
          <p className="text-sm text-gray-500">
            We&apos;ve sent a 6-digit OTP to<br />
            <span className="font-semibold text-gray-300">{form.email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-700 bg-[#1a1a1a] text-white rounded-lg focus:border-[#d4a843] focus:ring-2 focus:ring-[#d4a843]/20 outline-none transition-all"
            />
          ))}
        </div>

        <Button onClick={handleVerifyOTP} size="lg" className="w-full" disabled={loading || otp.join("").length !== 6}>
          {loading ? "Verifying..." : "Verify & Create Account"}
        </Button>

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">Resend OTP in {resendTimer}s</p>
          ) : (
            <button onClick={handleResendOTP} className="text-sm text-[#d4a843] font-semibold hover:underline flex items-center gap-1 mx-auto">
              <RefreshCw className="h-3.5 w-3.5" /> Resend OTP
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" placeholder="Enter your name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      <Input label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
      <Input label="Phone Number" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
      <Input label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required />
      <Input label="Confirm Password" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending OTP..." : <><UserPlus className="mr-2 h-5 w-5" /> Create Account</>}
      </Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#d4a843] font-semibold hover:underline">Login</Link>
      </p>
    </form>
  );
}
