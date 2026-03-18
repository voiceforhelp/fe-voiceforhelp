"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="py-12 sm:py-14 md:py-20 bg-[#faf7f2] border-t border-gold/10">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-5">
            <Shield className="h-3.5 w-3.5 text-gold" />
            <span className="text-gold-dark text-xs font-semibold uppercase tracking-wide">
              Video-Verified Impact
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Every Rupee Counts.{" "}
            <span className="text-gold-gradient italic">Start Today.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-7 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of donors who trust us with transparent, video-verified impact.
          </p>

          {/* Donation amount buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DONATION_AMOUNTS.map((amt) => (
              <Link key={amt} href={`/donate?amount=${amt}`}>
                <Button
                  size="lg"
                  className="font-bold text-sm sm:text-base h-11 sm:h-12 px-5 sm:px-6 hover:scale-105 transition-transform"
                >
                  ₹{amt.toLocaleString("en-IN")}
                </Button>
              </Link>
            ))}
            <Link href="/donate">
              <Button
                variant="outline"
                size="lg"
                className="font-semibold text-sm sm:text-base h-11 sm:h-12 px-5 sm:px-6 border-gold/40 text-gold-dark hover:bg-gold/10"
              >
                Custom <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
