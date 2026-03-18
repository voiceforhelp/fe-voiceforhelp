"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DONATION_AMOUNTS } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="py-12 md:py-16 bg-[#faf7f2] border-t border-[#d4a843]/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Every Rupee Counts. <span className="text-gold-gradient italic">Start Today.</span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Join thousands of donors who trust us with transparent, video-verified impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DONATION_AMOUNTS.map((amt) => (
              <Link key={amt} href={`/donate?amount=${amt}`}>
                <Button size="lg" className="font-bold text-base">
                  ₹{amt.toLocaleString("en-IN")}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
