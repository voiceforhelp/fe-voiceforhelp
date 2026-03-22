"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Clock, ArrowLeft, Home, RefreshCw, UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { donationService } from "@/services/donationService";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface DonationStatus {
  _id: string;
  name: string;
  email?: string;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  transactionId?: string;
  category?: { _id: string; name: string };
  donationDate: string;
  paymentMethod: string;
  userId?: string;
}

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const txnId = searchParams.get("txnId");
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [donation, setDonation] = useState<DonationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const fetchStatus = async () => {
    if (!txnId) {
      setError("No transaction ID found");
      setLoading(false);
      return;
    }

    try {
      const res = await donationService.checkPaymentStatus(txnId);
      setDonation(res.donation);

      // If still pending, auto-retry up to 5 times with delay
      if (res.donation.paymentStatus === "pending" && retryCount < 5) {
        setTimeout(() => {
          setRetryCount((c) => c + 1);
        }, 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to check payment status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txnId, retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setRetryCount((c) => c + 1);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gold border-t-transparency rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Verifying Payment</h2>
          <p className="text-sm text-gray-500">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !donation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something Went Wrong</h2>
          <p className="text-gray-500 text-sm mb-6">{error || "Unable to find your donation. Please contact support."}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/donate" className="flex-1">
              <Button variant="secondary" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="ghost" className="w-full">
                <Home className="mr-2 h-4 w-4" /> Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── SUCCESS ───
  if (donation.paymentStatus === "completed") {
    const isLoggedIn = !authLoading && isAuthenticated;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-green-100 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for your generous donation{donation.name && donation.name !== "Anonymous" ? `, ${donation.name}` : ""}!
          </p>

          {/* Donation details */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-bold text-green-700">{formatCurrency(donation.amount)}</span>
            </div>
            {donation.category && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-semibold text-gray-700">{donation.category.name}</span>
              </div>
            )}
            {donation.transactionId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Transaction ID</span>
                <span className="text-xs font-mono text-gray-600 break-all ml-2">{donation.transactionId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm text-gray-700">
                {new Date(donation.donationDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Payment</span>
              <span className="text-sm text-gray-700 capitalize">{donation.paymentMethod}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-6">
            You will receive a video showing the impact of your donation within 24 hours.
          </p>

          {/* Logged in user → Go to Profile */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link href="/profile">
                <Button variant="default" className="w-full">
                  <User className="mr-2 h-4 w-4" /> View My Donations
                </Button>
              </Link>
              <Link href="/videos">
                <Button variant="ghost" className="w-full">View Impact Videos</Button>
              </Link>
            </div>
          ) : (
            /* Not logged in → Register prompt */
            <div className="space-y-4">
              <div className="bg-gold/10 rounded-xl p-4 border border-gold/20">
                <p className="text-sm font-semibold text-gray-900 mb-1">Create an account to track your donations</p>
                <p className="text-xs text-gray-500">
                  Register with <strong>{donation.email || "your email"}</strong> to see all your donations, get video proof updates and track your impact.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/register${donation.email ? `?email=${encodeURIComponent(donation.email)}` : ""}`}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                </Link>
                <Link href="/login" className="flex-1">
                  <Button variant="secondary" className="w-full">
                    Already have account? Login
                  </Button>
                </Link>
              </div>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  <Home className="mr-2 h-4 w-4" /> Go Home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── FAILED ───
  if (donation.paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-red-100 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Failed</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your payment of {formatCurrency(donation.amount)} could not be processed.
          </p>

          <div className="bg-red-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-700">
              Don&apos;t worry! No amount has been deducted. If any amount was deducted, it will be refunded within 5-7 business days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/donate" className="flex-1">
              <Button variant="default" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button variant="ghost" className="w-full">Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── PENDING (UPI payments wait for admin, PhonePe auto-checks) ───
  const isUPI = donation.paymentMethod === "upi";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-yellow-100 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-5">
          <Clock className="h-10 w-10 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Pending</h2>
        <p className="text-gray-500 text-sm mb-6">
          Your donation of {formatCurrency(donation.amount)} is being verified.
        </p>

        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-700">
            {isUPI
              ? "Your UPI payment will be manually verified by our team. You'll receive an email once confirmed."
              : "If you completed the payment, it will be verified automatically in a few moments."}
          </p>
        </div>

        {/* Donation details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-sm font-bold text-gray-700">{formatCurrency(donation.amount)}</span>
          </div>
          {donation.category && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm text-gray-700">{donation.category.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Payment via</span>
            <span className="text-sm text-gray-700 capitalize">{donation.paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="default" className="flex-1" onClick={handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" /> Check Again
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="ghost" className="w-full">
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          You will receive an email once your payment is confirmed.
        </p>
      </div>
    </div>
  );
}

export default function DonationStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-gold border-t-transparency rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Checking payment status...</p>
          </div>
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
}
