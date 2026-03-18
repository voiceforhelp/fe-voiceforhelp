"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import UPIPaymentModal from "./UPIPaymentModal";
import { donationService } from "@/services/donationService";
import { categoryService } from "@/services/categoryService";
import { DONATION_AMOUNTS, AVAILABILITY_TYPES } from "@/lib/constants";
import type { Category, UPIPaymentData } from "@/types";
import toast from "react-hot-toast";

interface DonationFormProps {
  defaultAmount?: number;
  defaultCategory?: string;
}

export default function DonationForm({ defaultAmount, defaultCategory }: DonationFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: defaultAmount || 0,
    category: "",
    isVolunteer: false,
    volunteerAvailability: "",
    volunteerDate: "",
    volunteerTime: "",
    volunteerLocation: "",
    volunteerNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<UPIPaymentData | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    categoryService.getCategories().then((res) => {
      setCategories(res.categories);
      if (defaultCategory) {
        const match = res.categories.find((c: Category) => c.name.toLowerCase().includes(defaultCategory.toLowerCase()));
        if (match) setForm((f) => ({ ...f, category: match._id }));
      }
    }).catch(() => {});
  }, [defaultCategory]);

  useEffect(() => {
    if (defaultAmount) setForm((f) => ({ ...f, amount: defaultAmount }));
  }, [defaultAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.amount < 1) {
      toast.error("Amount must be at least ₹1");
      return;
    }

    setLoading(true);
    try {
      const res = await donationService.createDonation({
        name: form.name,
        email: form.email,
        phone: form.phone,
        amount: form.amount,
        category: form.category,
        isVolunteer: form.isVolunteer,
      });
      setPaymentData(res.payment);
      setShowPayment(true);
      toast.success("Donation created! Complete payment via UPI.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create donation");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name *" placeholder="Enter your name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            <Input label="Email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <Input label="Phone Number *" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
        </div>

        {/* Category */}
        <div>
          <Label className="mb-1.5 block">Donation Category</Label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="flex h-11 w-full rounded-lg border border-gray-700 bg-[#1a1a1a] px-4 py-2 text-sm text-white focus:border-[#d4a843] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/20 transition-all"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <Label className="mb-1.5 block">Donation Amount (₹) *</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {DONATION_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => update("amount", amt)}
                className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                  form.amount === amt
                    ? "border-[#d4a843] bg-[#d4a843]/15 text-[#d4a843]"
                    : "border-gray-700 text-gray-400 hover:border-[#d4a843]/30"
                }`}
              >
                ₹{amt.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
          <Input
            type="number"
            placeholder="Or enter custom amount"
            value={form.amount || ""}
            onChange={(e) => update("amount", Number(e.target.value))}
            min={1}
          />
        </div>

        {/* Volunteer toggle */}
        <div className="bg-[#d4a843]/10 rounded-xl p-4 border border-[#d4a843]/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white text-sm">Want to volunteer with us?</h4>
              <p className="text-xs text-gray-500">Join our field team and make a direct impact</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => update("isVolunteer", true)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  form.isVolunteer ? "bg-[#d4a843] text-white" : "bg-[#1a1a1a] border border-gray-700 text-gray-400"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => update("isVolunteer", false)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !form.isVolunteer ? "bg-[#d4a843] text-white" : "bg-[#1a1a1a] border border-gray-700 text-gray-400"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <AnimatePresence>
            {form.isVolunteer && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-[#d4a843]/20 space-y-4">
                  <div>
                    <Label className="mb-1.5 block">Availability Type</Label>
                    <select
                      value={form.volunteerAvailability}
                      onChange={(e) => update("volunteerAvailability", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-gray-700 bg-[#1a1a1a] px-4 py-2 text-sm text-white focus:border-[#d4a843] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/20"
                    >
                      <option value="">Select availability</option>
                      {AVAILABILITY_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Preferred Date" type="date" value={form.volunteerDate} onChange={(e) => update("volunteerDate", e.target.value)} />
                    <Input label="Preferred Time" type="time" value={form.volunteerTime} onChange={(e) => update("volunteerTime", e.target.value)} />
                  </div>
                  <Input label="Location" placeholder="Your city or area" value={form.volunteerLocation} onChange={(e) => update("volunteerLocation", e.target.value)} />
                  <Textarea label="Notes" placeholder="Any additional information..." value={form.volunteerNotes} onChange={(e) => update("volunteerNotes", e.target.value)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
          {loading ? "Processing..." : (
            <>
              <Heart className="mr-2 h-5 w-5" /> Proceed to Pay {form.amount > 0 && `₹${form.amount.toLocaleString("en-IN")}`}
            </>
          )}
        </Button>
      </form>

      {showPayment && paymentData && (
        <UPIPaymentModal
          open={showPayment}
          onClose={() => setShowPayment(false)}
          paymentData={paymentData}
        />
      )}
    </>
  );
}
