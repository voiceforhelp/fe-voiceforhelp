"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Shield, Clock, Video } from "lucide-react";
import DonationForm from "@/components/donation/DonationForm";

function DonateContent() {
  const params = useSearchParams();
  const amount = params.get("amount") ? Number(params.get("amount")) : undefined;
  const category = params.get("category") || undefined;

  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-gray-700/50">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Make a Donation</h1>
              <p className="text-gray-400 mb-6">Your contribution creates real, visible impact.</p>
              <DonationForm defaultAmount={amount} defaultCategory={category} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#d4a843]/20">
              <h3 className="font-bold text-[#d4a843] mb-4">Why Donate With Us?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-[#d4a843] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">100% Transparent</p>
                    <p className="text-xs text-gray-500">Every donation tracked with video proof</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Video className="h-5 w-5 text-[#d4a843] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Daily Video Updates</p>
                    <p className="text-xs text-gray-500">See your impact the very next day</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-[#d4a843] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Quick & Easy</p>
                    <p className="text-xs text-gray-500">Donate via UPI in under 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-orange-500/20">
              <h3 className="font-bold text-orange-400 mb-2">How It Works</h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#d4a843] text-black flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>Fill in your details & amount</li>
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#d4a843] text-black flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>Pay via UPI QR code</li>
                <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-[#d4a843] text-black flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>Receive video proof next day</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
      <DonateContent />
    </Suspense>
  );
}
