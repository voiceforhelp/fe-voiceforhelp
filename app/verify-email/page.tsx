"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const { verifyRegisterOTP } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) router.push("/register");
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      await verifyRegisterOTP(email, otpString);
      toast.success("Email verified successfully!");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.resendOTP(email, "register");
      toast.success("OTP resent to your email!");
      setResendTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  if (!email) return null;

  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-gold" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
              <p className="text-sm text-gray-500">
                Enter the 6-digit code sent to<br />
                <span className="font-semibold text-gray-600">{email}</span>
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

            <Button onClick={handleVerify} size="lg" className="w-full mb-4" disabled={loading || otp.join("").length !== 6}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">Resend OTP in {resendTimer}s</p>
              ) : (
                <button onClick={handleResend} className="text-sm text-gold font-semibold hover:underline flex items-center gap-1 mx-auto">
                  <RefreshCw className="h-3.5 w-3.5" /> Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
