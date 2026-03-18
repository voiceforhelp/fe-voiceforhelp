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
    <section className="py-10 sm:py-12 md:py-16 bg-texture">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <SectionHeading title="Top Causes" className="mb-0 text-left" align="left" />
          <Link
            href="/impact"
            className="hidden md:flex items-center gap-1 text-sm text-gold font-semibold hover:text-gold-light transition-colors shrink-0 ml-4"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {displayCategories.slice(0, 4).map((cat: any, i: number) => {
            const progress = cat.targetAmount > 0
              ? Math.min((cat.raisedAmount / cat.targetAmount) * 100, 100)
              : 0;
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#2c2820] rounded-xl border border-gray-700/50 overflow-hidden hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-gold/10 flex flex-col"
              >
                {/* Category header */}
                <div className={`h-32 sm:h-36 md:h-40 bg-linear-to-br ${fallbackGradients[i % 4]} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-white text-5xl sm:text-6xl font-bold opacity-20 select-none">
                    {cat.name[0]}
                  </span>
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-sm sm:text-base mb-1 line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{cat.description}</p>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gold font-semibold">{formatCurrency(cat.raisedAmount)}</span>
                      <span className="text-gray-500">of {formatCurrency(cat.targetAmount)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="h-full bg-linear-to-r from-gold to-gold-light rounded-full"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1 text-right">{Math.round(progress)}% funded</p>
                  </div>

                  <Link href={`/donate?category=${cat.name}`}>
                    <Button size="sm" className="w-full h-10 text-xs sm:text-sm font-semibold">
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6 md:hidden">
          <Link href="/impact">
            <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10">
              View All Causes <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
