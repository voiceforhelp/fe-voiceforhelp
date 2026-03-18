"use client";

import { motion } from "framer-motion";
import { Utensils, GraduationCap, HeartPulse, PawPrint, Milk, Leaf, Siren } from "lucide-react";

const services = [
  {
    icon: PawPrint,
    title: "Animal Welfare",
    desc: "Care and protection for street animals.",
    iconColor: "text-orange-500",
    bg: "bg-orange-400/15",
  },
  {
    icon: Milk,
    title: "Cow Protection",
    desc: "Shelter, food and care for cows.",
    iconColor: "text-yellow-600",
    bg: "bg-yellow-400/15",
  },
  {
    icon: GraduationCap,
    title: "Child Welfare",
    desc: "Education and support for underprivileged children.",
    iconColor: "text-blue-500",
    bg: "bg-blue-400/15",
  },
  {
    icon: HeartPulse,
    title: "Medical Assistance",
    desc: "Healthcare access for those in need.",
    iconColor: "text-rose-500",
    bg: "bg-rose-400/15",
  },
  {
    icon: Utensils,
    title: "Food Distribution",
    desc: "Daily meals for the hungry and homeless.",
    iconColor: "text-amber-500",
    bg: "bg-amber-400/15",
  },
  {
    icon: Siren,
    title: "Emergency Help",
    desc: "Rapid response in times of crisis.",
    iconColor: "text-red-500",
    bg: "bg-red-400/15",
  },
  {
    icon: Leaf,
    title: "Plantation",
    desc: "Tree plantation for a greener earth.",
    iconColor: "text-green-600",
    bg: "bg-green-400/15",
  },
];

export default function ServicesStrip() {
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
          {[...services, ...services].map((service, i) => (
            <div
              key={i}
              className="w-[138px] shrink-0 bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-2.5"
            >
              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center shrink-0`}>
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs leading-tight">{service.title}</h3>
                <p className="text-[10px] text-gray-500 mt-1 leading-snug line-clamp-2">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:block container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-2.5"
            >
              <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center shrink-0`}>
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">{service.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
