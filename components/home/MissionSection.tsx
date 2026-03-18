"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";

export default function MissionSection() {
  const [missionImage, setMissionImage] = useState("/mission/OurMission.jpeg");
  const [missionText, setMissionText] = useState(
    "We are dedicated to helping the underprivileged and bringing positive change to their lives. Join us in our mission to make a difference."
  );

  useEffect(() => {
    api.get("/settings/public").then((res) => {
      const s = res.data.settings;
      if (s?.missionImage) setMissionImage(s.missionImage);
      if (s?.missionText) setMissionText(s.missionText);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-14 md:py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Our Mission
            </h2>
            <p className="text-[#b8922e] font-semibold italic text-lg mb-6 underline decoration-[#d4a843]/40 underline-offset-4">
              Together, We Can Bring Hope to Those in Need
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {missionText}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-[#d4a843]/20 shadow-lg">
              {missionImage ? (
                <img src={missionImage} alt="Our Mission" className="w-full h-72 md:h-80 object-cover" />
              ) : (
                <div className="w-full h-72 md:h-80 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Mission Image</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
