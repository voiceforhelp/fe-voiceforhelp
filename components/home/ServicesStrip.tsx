"use client";

import { motion } from "framer-motion";
import { Utensils, GraduationCap, HeartPulse } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Feed the Hungry",
    desc: "Help provide meals to those in need.",
    iconColor: "text-amber-400",
  },
  {
    icon: GraduationCap,
    title: "Support Education",
    desc: "Empower children with education.",
    iconColor: "text-red-400",
  },
  {
    icon: HeartPulse,
    title: "Medical Assistance",
    desc: "Provide healthcare to the needy.",
    iconColor: "text-red-400",
  },
];

export default function ServicesStrip() {
  return (
    <section className="relative -mt-14 z-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#2c2820]/95 backdrop-blur-sm rounded-xl p-5 border border-[#d4a843]/20 shadow-2xl hover:border-[#d4a843]/40 transition-all flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#d4a843]/15 flex items-center justify-center flex-shrink-0 border border-[#d4a843]/20">
                <service.icon className={`h-7 w-7 ${service.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{service.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
