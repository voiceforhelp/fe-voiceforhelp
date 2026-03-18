"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const amounts = [
  { value: 500, label: "Feed a Child", emoji: "🍱" },
  { value: 1000, label: "Educate a Child", emoji: "📚" },
  { value: 2500, label: "Provide Medical Aid", emoji: "💊" },
];

export default function DonationSection() {
  return (
    <section className="py-12 sm:py-14 md:py-20 bg-texture">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Ornamental heading */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="h-px flex-1 max-w-15 sm:max-w-25 bg-linear-to-r from-transparent to-gold/50" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2">
              Make a Donation,{" "}
              <span className="italic text-gold-gradient">Change a Life</span>
            </h2>
            <div className="h-px flex-1 max-w-15 sm:max-w-25 bg-linear-to-l from-transparent to-gold/50" />
          </div>

          {/* Amount cards - grid layout for clean alignment */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 max-w-2xl sm:max-w-3xl mx-auto">
            {amounts.map((amt, i) => (
              <motion.div
                key={amt.value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/donate?amount=${amt.value}`}>
                  <div className="bg-[#2c2820] border border-gold/20 rounded-xl p-4 sm:p-5 md:p-6 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center group h-full">
                    <span className="text-2xl sm:text-3xl block mb-1">{amt.emoji}</span>
                    <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-gold-light transition-colors">
                      <span className="text-sm sm:text-base">₹</span>
                      {amt.value.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 leading-snug">{amt.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Other Amount card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/donate">
                <div className="bg-[#2c2820] border border-dashed border-gold/30 rounded-xl p-4 sm:p-5 md:p-6 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center group h-full flex flex-col items-center justify-center">
                  <Wallet className="h-7 w-7 sm:h-8 sm:w-8 mx-auto text-gray-500 group-hover:text-gold-light transition-colors mb-1.5" />
                  <p className="text-xs sm:text-sm font-bold text-white">Other</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Custom</p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* CTA Button */}
          <Link href="/donate">
            <Button size="lg" className="text-sm sm:text-base px-8 sm:px-10 h-12 sm:h-14 font-bold rounded-xl shadow-lg shadow-gold/20">
              Donate Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
