"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Shield, Clock, Video, CheckCircle2 } from "lucide-react";
import DonationForm from "@/components/donation/DonationForm";

function DonateContent() {
  const params = useSearchParams();
  const amount = params.get("amount") ? Number(params.get("amount")) : undefined;
  const category = params.get("category") || undefined;

  const benefits = [
    { icon: Shield, title: "100% Transparency", desc: "Every donation tracked with video proof" },
    { icon: Video, title: "Daily Video Updates", desc: "See your impact the very next day" },
    { icon: Clock, title: "Quick & Easy", desc: "Donate via UPI in under 2 minutes" },
  ];

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page title (mobile) */}
        <div className="mb-6 sm:mb-8 lg:hidden text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Make a Donation</h1>
          <p className="text-sm text-gray-500">Your contribution creates real, visible impact.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="hidden lg:block mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Make a Donation</h1>
                <p className="text-gray-500 text-sm sm:text-base">Your contribution creates real, visible impact.</p>
              </div>
              <DonationForm defaultAmount={amount} defaultCategory={category} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-5">
            {/* Why donate */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gold/20 shadow-sm">
              <h3 className="font-bold text-gold mb-4 text-sm sm:text-base">Why Donate With Us?</h3>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                      <b.icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-orange-200 shadow-sm">
              <h3 className="font-bold text-orange-500 mb-4 text-sm sm:text-base">How It Works</h3>
              <ol className="space-y-3">
                {[
                  "Fill in your details & amount",
                  "Pay via UPI QR code",
                  "Receive video proof next day",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600 leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Trust signals */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-green-200 shadow-sm">
              <h3 className="font-bold text-green-600 mb-3 text-sm">Trusted by Donors</h3>
              <div className="space-y-2">
                {["Video-verified impact", "No hidden fees", "Direct field work"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparency rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading donation form...</p>
        </div>
      </div>
    }>
      <DonateContent />
    </Suspense>
  );
}
