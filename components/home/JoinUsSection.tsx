"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HandHeart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinUsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-texture">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Volunteer card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-red-900/30 to-red-800/20 border border-red-700/30 rounded-2xl p-6 sm:p-8 text-center hover:border-red-500/40 transition-all duration-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <HandHeart className="h-6 w-6 sm:h-7 sm:w-7 text-red-400" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-10 bg-red-700/40" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white italic">Join Us & Make a Difference</h3>
              <div className="h-px flex-1 max-w-10 bg-red-700/40" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-5">
              Join our field team. Help distribute food, care for animals, and create real change.
            </p>
            <Link href="/volunteer">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white border-none h-11 sm:h-12 px-6 font-semibold"
              >
                Become a Volunteer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Donate card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-gold/15 to-gold-dark/10 border border-gold/25 rounded-2xl p-6 sm:p-8 text-center hover:border-gold/50 transition-all duration-300"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-10 bg-gold/30" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white italic">Help Us Reach More People</h3>
              <div className="h-px flex-1 max-w-10 bg-gold/30" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mb-5">
              Every rupee makes a visible difference. See your impact through daily video proof.
            </p>
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3">
              <Link href="/donate" className="w-full xs:w-auto">
                <Button size="lg" className="w-full h-11 sm:h-12 px-5 font-semibold">
                  Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/videos" className="w-full xs:w-auto">
                <Button
                  size="lg"
                  className="w-full h-11 sm:h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white border-none font-semibold"
                >
                  <Share2 className="mr-1.5 h-4 w-4" /> Share Videos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
