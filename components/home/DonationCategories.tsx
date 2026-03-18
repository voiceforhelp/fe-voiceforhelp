"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Utensils, Shirt, PawPrint, TreePine } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const defaultCategories = [
  { name: "Food Donation", desc: "Provide food to the hungry", icon: Utensils, color: "text-orange-500", bg: "bg-orange-500/15", border: "hover:border-orange-400/40" },
  { name: "Cloth Donation", desc: "Donate clothes to help someone warm and covered", icon: Shirt, color: "text-blue-500", bg: "bg-blue-500/15", border: "hover:border-blue-400/40" },
  { name: "Animal Care", desc: "Help animals in need", icon: PawPrint, color: "text-green-500", bg: "bg-green-500/15", border: "hover:border-green-400/40" },
  { name: "Plant a Tree", desc: "Save the environment", icon: TreePine, color: "text-emerald-500", bg: "bg-emerald-500/15", border: "hover:border-emerald-400/40" },
];

export default function DonationCategories() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Donation Categories"
          subtitle="Choose a cause close to your heart"
          light
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {defaultCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/donate?category=${cat.name}`}>
                <div className={`rounded-xl border border-gray-100 ${cat.border} p-4 sm:p-5 md:p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white h-full flex flex-col items-center`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl ${cat.bg} flex items-center justify-center mb-2 sm:mb-3`}>
                    <cat.icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-snug line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
