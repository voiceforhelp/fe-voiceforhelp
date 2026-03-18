"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinUsSection() {
  return (
    <section className="py-10 md:py-14 bg-texture">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Join Us & Make a Difference */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <div className="h-px flex-1 max-w-[50px] bg-[#d4a843]/40" />
              <h3 className="text-lg md:text-xl font-bold text-white italic">Join Us & Make a Difference</h3>
              <div className="h-px flex-1 max-w-[50px] bg-[#d4a843]/40" />
            </div>
            <Link href="/volunteer">
              <Button size="lg" className="text-sm px-6 bg-red-600 hover:bg-red-700 text-white border-none">
                Become a Volunteer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Help Us to Reach More People */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <div className="flex items-center justify-center md:justify-end gap-3 mb-5">
              <div className="h-px flex-1 max-w-[50px] bg-[#d4a843]/40" />
              <h3 className="text-lg md:text-xl font-bold text-white italic">Help Us to Reach More People</h3>
              <div className="h-px flex-1 max-w-[50px] bg-[#d4a843]/40" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <Link href="/donate">
                <Button size="lg" className="text-sm px-6">
                  Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" className="text-sm px-6 bg-blue-600 hover:bg-blue-700 text-white border-none">
                  Support Our Cause <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
