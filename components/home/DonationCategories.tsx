"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Utensils, Shirt, PawPrint, TreePine } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const defaultCategories = [
  { name: "Food Donation", desc: "Provide food to the hungry", icon: Utensils, color: "text-orange-400", bg: "bg-orange-500/15" },
  { name: "Cloth Donation", desc: "Donate clothes to help someone warm and covered", icon: Shirt, color: "text-blue-400", bg: "bg-blue-500/15" },
  { name: "Animal Care", desc: "Help animals in need", icon: PawPrint, color: "text-green-400", bg: "bg-green-500/15" },
  { name: "Plant a Tree", desc: "Save the environment", icon: TreePine, color: "text-emerald-400", bg: "bg-emerald-500/15" },
];

export default function DonationCategories() {
  return (
    <section className="py-12 md:py-16 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Donation Categories" subtitle="Choose a cause close to your heart" light />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {defaultCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/donate?category=${cat.name}`}>
                <div className={`rounded-xl border border-gray-200 p-6 text-center hover:border-[#d4a843]/50 hover:shadow-md transition-all cursor-pointer card-hover bg-white`}>
                  <div className={`w-16 h-16 rounded-xl ${cat.bg} flex items-center justify-center mx-auto mb-3`}>
                    <cat.icon className={`h-8 w-8 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
