"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils, GraduationCap, HeartPulse, PawPrint, Milk, Leaf, Siren,
  Loader2, type LucideIcon,
} from "lucide-react";
import { categoryService } from "@/services/categoryService";
import type { Category } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Utensils, PawPrint, Milk, GraduationCap, HeartPulse, Siren, Leaf,
};

const colorMap: Record<string, { iconColor: string; bg: string }> = {
  amber:  { iconColor: "text-amber-500",  bg: "bg-amber-400/15" },
  orange: { iconColor: "text-orange-500", bg: "bg-orange-400/15" },
  yellow: { iconColor: "text-yellow-600", bg: "bg-yellow-400/15" },
  blue:   { iconColor: "text-blue-500",   bg: "bg-blue-400/15" },
  rose:   { iconColor: "text-rose-500",   bg: "bg-rose-400/15" },
  red:    { iconColor: "text-red-500",    bg: "bg-red-400/15" },
  green:  { iconColor: "text-green-600",  bg: "bg-green-400/15" },
};

const defaultColor = { iconColor: "text-gray-500", bg: "bg-gray-400/15" };

export default function ServicesStrip() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService
      .getCategories()
      .then((res) => setCategories(res.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-10 bg-white">
        <div className="flex justify-center items-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  const marqueeItems = [...categories, ...categories];

  return (
    <section className="py-8 sm:py-10 bg-white">

      {/* Mobile: infinite auto-scroll marquee */}
      <div className="sm:hidden overflow-hidden">
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee-scroll 22s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track flex gap-3 w-max px-3">
          {marqueeItems.map((cat, i) => {
            const Icon = iconMap[cat.icon || ""] || Utensils;
            const colors = colorMap[cat.color || ""] || defaultColor;
            return (
              <div
                key={i}
                className="w-[138px] shrink-0 bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-2.5"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs leading-tight">{cat.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug line-clamp-2">{cat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:block container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon || ""] || Utensils;
            const colors = colorMap[cat.color || ""] || defaultColor;
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-2.5"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-6 w-6 ${colors.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">{cat.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{cat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
