"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials, formatCurrency } from "@/lib/utils";
import SectionHeading from "@/components/common/SectionHeading";
import type { Donation } from "@/types";

interface RecentDonorsProps {
  donors: Donation[];
}

export default function RecentDonors({ donors }: RecentDonorsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  const displayDonors = donors.length > 0 ? donors : [
    { _id: "1", name: "Rahul Sharma", amount: 100, category: { name: "Cow Feed" } },
    { _id: "2", name: "Neha Verma", amount: 500, category: { name: "Food" } },
    { _id: "3", name: "Amit Singh", amount: 1000, category: { name: "Animal Care" } },
    { _id: "4", name: "Priya Gupta", amount: 200, category: { name: "Plant a Tree" } },
    { _id: "5", name: "Vikram Patel", amount: 2000, category: { name: "Cloth" } },
    { _id: "6", name: "Suman Devi", amount: 50, category: { name: "Dog Feed" } },
    { _id: "7", name: "Mohan Lal", amount: 750, category: { name: "Education" } },
    { _id: "8", name: "Anita Joshi", amount: 300, category: { name: "Food" } },
  ] as any[];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-texture">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <SectionHeading
            title="Our Generous Donors"
            subtitle="Thank you for making a difference"
            className="mb-0 text-left"
            align="left"
          />
          {/* Scroll controls - visible on all screens */}
          <div className="flex gap-2 shrink-0 ml-4">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2c2820] border border-gray-700 flex items-center justify-center text-gray-400 hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2c2820] border border-gray-700 flex items-center justify-center text-gray-400 hover:border-gold/50 hover:text-gold transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 scrollbar-hide snap-x snap-mandatory"
        >
          {displayDonors.map((donor: any, i: number) => (
            <motion.div
              key={donor._id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.08, 0.4) }}
              viewport={{ once: true }}
              className="shrink-0 snap-center w-32 sm:w-36 md:w-40"
            >
              <div className="flex flex-col items-center bg-[#2c2820] rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 card-hover h-full">
                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mb-2 sm:mb-3 ring-2 ring-gold/30 ring-offset-2 ring-offset-[#2c2820]">
                  <AvatarFallback className="text-sm sm:text-base md:text-lg bg-linear-to-br from-gold to-gold-dark text-black font-bold">
                    {getInitials(donor.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs sm:text-sm font-semibold text-white text-center truncate w-full px-1">
                  {donor.name}
                </p>
                <Badge variant="default" className="mt-1 text-[9px] sm:text-[10px] px-1.5 py-0">
                  DONATED
                </Badge>
                <p className="text-sm sm:text-base font-bold text-gold mt-1">
                  {formatCurrency(donor.amount)}
                </p>
                {donor.category?.name && (
                  <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 truncate w-full text-center px-1">
                    {donor.category.name}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
