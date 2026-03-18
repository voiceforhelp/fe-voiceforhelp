"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, RefreshCw, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ─── Step 1: Send OTP ───
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success("If this email is registered, you'll receive an OTP.");
      setStep("otp");
      setResendTimer(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ─── OTP handlers ───
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
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

  // ─── Step 2: Verify OTP ───
  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) { toast.error("Enter the complete 6-digit OTP"); return; }

    setLoading(true);
    try {
      const res = await authService.verifyResetOTP({ email, otp: otpString });
      setResetToken(res.resetToken);
      setStep("reset");
      toast.success("OTP verified! Set your new password.");
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
      await authService.resendOTP(email, "reset-password");
      toast.success("OTP resent!");
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend");
    }
  };

  // ─── Step 3: Reset Password ───
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }

    setLoading(true);
    try {
      await authService.resetPassword({ email, resetToken, newPassword });
      toast.success("Password reset successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">

            {/* ─── Step 1: Email ─── */}
            {step === "email" && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-gold" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                  <p className="text-sm text-gray-500">Enter your email to receive a verification code.</p>
                </div>
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <Input label="Email Address" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                  <Link href="/login" className="text-gold font-semibold hover:underline flex items-center gap-1 justify-center">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </p>
              </>
            )}

            {/* ─── Step 2: OTP ─── */}
            {step === "otp" && (
              <>
                <button onClick={() => setStep("email")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-4">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="h-8 w-8 text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Enter OTP</h2>
                  <p className="text-sm text-gray-500">
                    Code sent to <span className="font-semibold text-gray-600">{email}</span>
                  </p>
                </div>

                <div className="flex justify-center gap-2 sm:gap-3 mb-6" onPaste={handleOtpPaste}>
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
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 bg-white text-white rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                    />
                  ))}
                </div>

                <Button onClick={handleVerifyOTP} size="lg" className="w-full mb-4" disabled={loading || otp.join("").length !== 6}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500">Resend OTP in {resendTimer}s</p>
                  ) : (
                    <button onClick={handleResendOTP} className="text-sm text-gold font-semibold hover:underline flex items-center gap-1 mx-auto">
                      <RefreshCw className="h-3.5 w-3.5" /> Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ─── Step 3: New Password ─── */}
            {step === "reset" && (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="h-8 w-8 text-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Set New Password</h2>
                  <p className="text-sm text-gray-500">Create a strong password for your account.</p>
                </div>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <Input label="New Password" type="password" placeholder="Min 6 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                  <Input label="Confirm Password" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
