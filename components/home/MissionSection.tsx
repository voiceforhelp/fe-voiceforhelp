"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import api from "@/lib/api";

const pillars = ["100% Transparent", "Video-Verified Impact", "Community-Driven"];

export default function MissionSection() {
  const [missionImage, setMissionImage] = useState("/Mission/OurMission.jpeg");
  const [missionText, setMissionText] = useState(
    "Our mission at Voice For Help Trust is to provide timely support, medical care, and nourishment to the needy, helpless animals, and cows. We are committed to ensuring transparency and honesty in every act of service"
  );

  useEffect(() => {
    api.get("/settings/public").then((res) => {
      const s = res.data.settings;
      if (s?.missionImage) setMissionImage(s.missionImage);
      if (s?.missionText) setMissionText(s.missionText);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="inline-block text-gold font-semibold uppercase tracking-widest text-sm mb-3">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
              Our Mission
            </h2>
            <p className="text-gold-dark font-semibold italic text-base sm:text-lg mb-5 underline decoration-gold/40 underline-offset-4">
              Together, We Can Bring Hope to Those in Need
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg mb-6">
              {missionText}
            </p>

            {/* Pillars */}
            <ul className="space-y-2">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex items-center gap-2.5 text-sm sm:text-base text-gray-700 font-medium">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-gold shrink-0" />
                  {pillar}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
            {/* Decorative backdrop */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gold/10 rounded-2xl sm:rounded-3xl -z-10" />
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gold/25 shadow-xl shadow-black/10">
              {missionImage ? (
                <img
                  src={missionImage}
                  alt="Our Mission"
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-56 sm:h-72 md:h-80 bg-linear-to-br from-gold/20 to-gold-dark/10 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Mission Image</span>
                </div>
              )}
              {/* Floating badge — inside image container, clipped by overflow-hidden */}
              <div className="absolute bottom-3 left-3 bg-gold text-black rounded-lg px-3 py-2 shadow-lg z-10">
                <p className="text-xs sm:text-sm font-extrabold leading-none">100%</p>
                <p className="text-[10px] sm:text-xs font-semibold">Transparent</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
