"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import { formatCurrency } from "@/lib/utils";
import type { Category } from "@/types";

interface TopCausesProps {
  categories: Category[];
}

const fallbackGradients = [
  "from-amber-600 to-orange-700",
  "from-blue-600 to-cyan-700",
  "from-green-600 to-teal-700",
  "from-pink-600 to-rose-700",
];

export default function TopCauses({ categories }: TopCausesProps) {
  const displayCategories = categories.length > 0 ? categories : [
    { _id: "1", name: "Education Support", description: "Provide food to the hungry and those in need", targetAmount: 200000, raisedAmount: 85000 },
    { _id: "2", name: "Medical Aid", description: "Donate clothes to help someone warm and covered", targetAmount: 200000, raisedAmount: 120000 },
    { _id: "3", name: "Clean Water", description: "Help feed, shelter and care for animals", targetAmount: 200000, raisedAmount: 65000 },
    { _id: "4", name: "Plant a Tree", description: "Plant trees to help protect our environment", targetAmount: 200000, raisedAmount: 150000 },
  ] as any[];

  return (
    <section className="py-12 md:py-16 bg-texture">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <SectionHeading title="Top Causes" className="mb-0 text-left" align="left" />
          <Link href="/impact" className="hidden md:flex items-center text-sm text-[#d4a843] font-semibold hover:text-[#e8c860]">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.slice(0, 4).map((cat: any, i: number) => {
            const progress = cat.targetAmount > 0 ? Math.min((cat.raisedAmount / cat.targetAmount) * 100, 100) : 0;
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#2c2820] rounded-xl border border-gray-700/50 overflow-hidden hover:border-[#d4a843]/30 transition-all card-hover"
              >
                <div className={`h-40 bg-gradient-to-br ${fallbackGradients[i % 4]} flex items-center justify-center`}>
                  <span className="text-white text-4xl font-bold opacity-30">{cat.name[0]}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{cat.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#d4a843] font-semibold">{formatCurrency(cat.raisedAmount)}</span>
                      <span className="text-gray-500">of {formatCurrency(cat.targetAmount)}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#d4a843] to-[#e8c860] rounded-full"
                      />
                    </div>
                  </div>
                  <Link href={`/donate?category=${cat.name}`}>
                    <Button size="sm" className="w-full">Donate Now</Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
