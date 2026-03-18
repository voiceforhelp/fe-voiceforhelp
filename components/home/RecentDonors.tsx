"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials, formatCurrency } from "@/lib/utils";
import SectionHeading from "@/components/common/SectionHeading";
import type { Donation } from "@/types";

interface RecentDonorsProps {
  donors: Donation[];
}

export default function RecentDonors({ donors }: RecentDonorsProps) {
  const displayDonors = donors.length > 0 ? donors : [
    { _id: "1", name: "Rahul Sharma", amount: 100, category: { name: "Cow Feed" } },
    { _id: "2", name: "Neha Verma", amount: 500, category: { name: "Food" } },
    { _id: "3", name: "Amit Singh", amount: 1000, category: { name: "Animal Care" } },
    { _id: "4", name: "Priya Gupta", amount: 200, category: { name: "Plant a Tree" } },
    { _id: "5", name: "Vikram Patel", amount: 2000, category: { name: "Cloth" } },
    { _id: "6", name: "Suman Devi", amount: 50, category: { name: "Dog Feed" } },
  ] as any[];

  return (
    <section className="py-12 md:py-16 bg-texture">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Generous Donors" subtitle="Thank you for making a difference" />

        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
          {displayDonors.map((donor, i) => (
            <motion.div
              key={donor._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-center w-36 md:w-44"
            >
              <div className="flex flex-col items-center bg-[#2c2820] rounded-xl p-4 border border-gray-700/50 hover:border-[#d4a843]/30 transition-all card-hover">
                <Avatar className="h-16 w-16 mb-3 ring-2 ring-[#d4a843]/30 ring-offset-2 ring-offset-[#2a2a2a]">
                  <AvatarFallback className="text-lg bg-gradient-to-br from-[#d4a843] to-[#b8922e] text-black font-bold">
                    {getInitials(donor.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold text-white text-center truncate w-full">{donor.name}</p>
                <Badge variant="default" className="mt-1.5 text-[10px]">DONATED</Badge>
                <p className="text-base font-bold text-[#d4a843] mt-1">
                  {formatCurrency(donor.amount)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
