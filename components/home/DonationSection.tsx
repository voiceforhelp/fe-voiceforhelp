"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const amounts = [
  { value: 500, label: "Feed a Child" },
  { value: 1000, label: "Educate a Child" },
  { value: 2500, label: "Provide Medical Aid" },
];

export default function DonationSection() {
  return (
    <section className="py-14 md:py-20 bg-texture">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Ornamental heading */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#d4a843]/50" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Make a Donation, <span className="italic text-gold-gradient">Change a Life</span>
            </h2>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#d4a843]/50" />
          </div>

          {/* Amount cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            {amounts.map((amt, i) => (
              <motion.div
                key={amt.value}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/donate?amount=${amt.value}`}>
                  <div className="bg-[#2c2820] border border-[#d4a843]/20 rounded-xl p-6 w-44 hover:border-[#d4a843]/60 hover:shadow-lg hover:shadow-[#d4a843]/10 transition-all cursor-pointer text-center group">
                    <p className="text-3xl md:text-4xl font-extrabold text-white group-hover:text-[#e8c860] transition-colors">
                      <span className="text-lg">₹</span> {amt.value.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{amt.label}</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Other Amount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/donate">
                <div className="bg-[#2c2820] border border-[#d4a843]/20 rounded-xl p-6 w-44 hover:border-[#d4a843]/60 hover:shadow-lg hover:shadow-[#d4a843]/10 transition-all cursor-pointer text-center group">
                  <Wallet className="h-8 w-8 mx-auto text-gray-500 group-hover:text-[#e8c860] transition-colors" />
                  <p className="text-sm font-bold text-white mt-2">Other Amount</p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* CTA Button */}
          <Link href="/donate">
            <Button size="lg" className="text-base px-10 h-14 text-lg font-bold">
              Donate Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
