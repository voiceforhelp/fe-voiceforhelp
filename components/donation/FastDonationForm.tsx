"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UPIPaymentModal from "./UPIPaymentModal";
import { donationService } from "@/services/donationService";
import { DONATION_AMOUNTS } from "@/lib/constants";
import type { UPIPaymentData } from "@/types";
import toast from "react-hot-toast";

export default function FastDonationForm() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<UPIPaymentData | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !amount) {
      toast.error("Please enter phone number and amount");
      return;
    }

    setLoading(true);
    try {
      const res = await donationService.createFastDonation({ phone, amount });

      if (res.paymentMethod === "phonepe" && res.paymentUrl) {
        toast.success("Redirecting to PhonePe...");
        window.location.href = res.paymentUrl;
      } else {
        setPaymentData(res.payment || null);
        setShowPayment(true);
        toast.success("Scan QR to complete payment");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to process");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Mobile Number *"
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Amount (₹) *</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {DONATION_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                  amount === amt
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-gray-200 text-gray-500 hover:border-gold/30"
                }`}
              >
                ₹{amt.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
          <Input
            type="number"
            placeholder="Or enter custom amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
          />
        </div>

        <Button type="submit" variant="secondary" size="lg" className="w-full text-base" disabled={loading}>
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" /> Pay Now {amount > 0 && `₹${amount.toLocaleString("en-IN")}`}
            </>
          )}
        </Button>
      </form>

      {showPayment && paymentData && (
        <UPIPaymentModal open={showPayment} onClose={() => setShowPayment(false)} paymentData={paymentData} />
      )}
    </>
  );
}
