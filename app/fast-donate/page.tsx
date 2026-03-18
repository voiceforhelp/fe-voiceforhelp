"use client";

import { Zap, Shield, Clock } from "lucide-react";
import FastDonationForm from "@/components/donation/FastDonationForm";

export default function FastDonatePage() {
  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/15 text-gold mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Fast Donate</h1>
            <p className="text-gray-500">Quick & anonymous donation. No account needed.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
            <div className="flex items-center gap-3 sm:gap-6 mb-6 text-center">
              <div className="flex-1">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold mx-auto mb-1">1</div>
                <p className="text-xs text-gray-500">Enter Details</p>
              </div>
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex-1">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold mx-auto mb-1">2</div>
                <p className="text-xs text-gray-500">Pay via UPI</p>
              </div>
              <div className="h-px flex-1 bg-gray-200" />
              <div className="flex-1">
                <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold mx-auto mb-1">3</div>
                <p className="text-xs text-gray-500">Done!</p>
              </div>
            </div>
            <FastDonationForm />
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 min</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> No signup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
