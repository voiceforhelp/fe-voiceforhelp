"use client";

import { motion } from "framer-motion";
import { Utensils, GraduationCap, HeartPulse } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Feed the Hungry",
    desc: "Help provide meals to those in need.",
    iconColor: "text-amber-400",
    bg: "bg-amber-400/15",
  },
  {
    icon: GraduationCap,
    title: "Support Education",
    desc: "Empower children with education.",
    iconColor: "text-red-400",
    bg: "bg-red-400/15",
  },
  {
    icon: HeartPulse,
    title: "Medical Assistance",
    desc: "Provide healthcare to the needy.",
    iconColor: "text-rose-400",
    bg: "bg-rose-400/15",
  },
];

export default function ServicesStrip() {
  return (
    <section className="relative -mt-6 sm:-mt-10 md:-mt-14 z-10 pb-2">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#2c2820]/95 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-gold/20 shadow-2xl shadow-black/40 hover:border-gold/50 hover:shadow-gold/10 transition-all duration-300 flex items-center gap-3 sm:gap-4"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${service.bg} flex items-center justify-center shrink-0 border border-gold/15`}>
                <service.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${service.iconColor}`} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm sm:text-base truncate">{service.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
