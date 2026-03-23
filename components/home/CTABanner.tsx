"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS } from "@/lib/constants";

export default function CTABanner() {
  // Duplicate for seamless infinite loop
  const scrollItems = [...DONATION_AMOUNTS, ...DONATION_AMOUNTS, ...DONATION_AMOUNTS];

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative text-center max-w-3xl">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/25 rounded-full px-4 py-1.5 mb-6">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <span className="text-gold text-xs font-semibold uppercase tracking-wider">
            Video-Verified · 100% Transparency
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Your ₹500 Can Feed a Family.{" "}
          <span className="text-gold-gradient">Will You Help?</span>
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Every donation is documented with a real video — you see exactly how your money changes lives. No excuses, no delays, just proof.
        </p>

        {/* Auto-scrolling donation amounts */}
        <div className="relative mb-6 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {scrollItems.map((amt, i) => (
              <Link key={`${amt}-${i}`} href={`/donate?amount=${amt}`} className="flex-shrink-0 mx-1.5 sm:mx-2">
                <div className="h-11 sm:h-12 px-5 sm:px-7 rounded-lg border border-white/20 text-white font-bold text-sm flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all cursor-pointer whitespace-nowrap">
                  ₹{amt.toLocaleString("en-IN")}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/donate">
          <Button className="h-11 sm:h-12 px-6 sm:px-8 font-bold text-sm mb-4">
            Donate Custom Amount <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </Link>

        <p className="text-gray-600 text-xs">
          Secure payment · UPI / Card / Net Banking · Receipt provided
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
