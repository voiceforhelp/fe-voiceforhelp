"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, Milk, GraduationCap, HeartPulse, Utensils, Siren, Leaf, ArrowRight } from "lucide-react";

const categories = [
  { icon: Utensils,      label: "Food Distribution", desc: "Daily meals for the hungry.",              color: "text-amber-600",  bg: "bg-amber-50",  border: "hover:border-amber-300", slug: "food" },
  { icon: PawPrint,      label: "Animal Welfare",    desc: "Care for injured street animals.",         color: "text-orange-600", bg: "bg-orange-50", border: "hover:border-orange-300", slug: "animal" },
  { icon: Milk,          label: "Cow Protection",    desc: "Shelter and feed for cows.",               color: "text-yellow-600", bg: "bg-yellow-50", border: "hover:border-yellow-300", slug: "cow" },
  { icon: GraduationCap, label: "Child Welfare",     desc: "Education for underprivileged children.",  color: "text-blue-600",   bg: "bg-blue-50",   border: "hover:border-blue-300",  slug: "child" },
  { icon: HeartPulse,    label: "Medical Help",      desc: "Healthcare for those who need it.",        color: "text-rose-600",   bg: "bg-rose-50",   border: "hover:border-rose-300",  slug: "medical" },
  { icon: Siren,         label: "Emergency Help",    desc: "Rapid relief in times of crisis.",         color: "text-red-600",    bg: "bg-red-50",    border: "hover:border-red-300",   slug: "emergency" },
  { icon: Leaf,          label: "Plantation",        desc: "Tree planting for a greener India.",       color: "text-green-600",  bg: "bg-green-50",  border: "hover:border-green-300", slug: "plant" },
];

export default function DonationCategories() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Choose Your Cause
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Donate to What Matters Most to You
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Every cause receives 100% of your donation — tracked with daily video proof.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/donate?category=${cat.slug}`}
                className={`flex flex-col items-center text-center gap-3 p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md ${cat.border} transition-all duration-300 hover:-translate-y-1 group block`}
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center`}>
                  <cat.icon className={`h-7 w-7 ${cat.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight mb-1">{cat.label}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-snug line-clamp-2">{cat.desc}</p>
                </div>
                <span className={`text-[10px] font-semibold ${cat.color} flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Donate <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
