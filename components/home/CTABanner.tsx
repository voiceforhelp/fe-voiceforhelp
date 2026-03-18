"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative text-center max-w-3xl mx-auto">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/25 rounded-full px-4 py-1.5 mb-6">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">
            Video-Verified · 100% Transparent
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Your ₹500 Can Feed a Family.{" "}
          <span className="text-gold-gradient">Will You Help?</span>
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Every donation is documented with a real video — you see exactly how your money changes lives. No excuses, no delays, just proof.
        </p>

        {/* Donation amounts */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {DONATION_AMOUNTS.map((amt) => (
            <Link key={amt} href={`/donate?amount=${amt}`}>
              <Button
                variant="outline"
                className="h-11 sm:h-12 px-5 sm:px-6 font-bold text-sm border-white/20 text-white hover:bg-gold hover:border-gold hover:text-black transition-all"
              >
                ₹{amt.toLocaleString("en-IN")}
              </Button>
            </Link>
          ))}
          <Link href="/donate">
            <Button className="h-11 sm:h-12 px-5 sm:px-6 font-bold text-sm">
              Custom Amount <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <p className="text-gray-600 text-xs">
          Secure payment · UPI / Card / Net Banking · Receipt provided
        </p>
      </div>
    </section>
  );
}
