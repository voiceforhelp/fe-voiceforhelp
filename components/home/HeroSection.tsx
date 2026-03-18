"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function HeroSection() {
  const [bannerImage, setBannerImage] = useState("/Banner/Hero_banner_image1.png");
  const [heroTitle, setHeroTitle] = useState("Lend a Hand,");
  const [heroSubtitle, setHeroSubtitle] = useState("Your Support Can Make a Difference");

  useEffect(() => {
    api.get("/settings/public").then((res) => {
      const s = res.data.settings;
      if (s?.heroBannerImage) setBannerImage(s.heroBannerImage);
      if (s?.heroTitle) setHeroTitle(s.heroTitle);
      if (s?.heroSubtitle) setHeroSubtitle(s.heroSubtitle);
    }).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Hero image with fixed heights per breakpoint */}
      <div className="relative w-full h-80 sm:h-105 md:h-130 lg:h-155 xl:h-170">
        <img
          src={bannerImage}
          alt="Voice For Help — Making a Difference"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-black/65" />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile: centered, Tablet+: right aligned */}
            <div className="w-full flex justify-center sm:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center sm:text-right"
              >
                {/* Trust badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-1 mb-3 sm:mb-4"
                >
                  <Heart className="h-3 w-3 text-gold" fill="currentColor" />
                  <span className="text-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    100% Transparent NGO
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-2 sm:mb-3 drop-shadow-lg">
                  {heroTitle}
                  <br />
                  <span className="text-gold-gradient italic">Change a Life</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-8 drop-shadow-md leading-relaxed">
                  {heroSubtitle}
                </p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex flex-col xs:flex-row items-center justify-center sm:justify-end gap-2.5 sm:gap-3"
                >
                  <Link href="/donate" className="w-full xs:w-auto">
                    <Button
                      size="lg"
                      className="w-full xs:w-auto text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 md:h-14 font-bold rounded-xl shadow-lg shadow-gold/25"
                    >
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/about" className="w-full xs:w-auto">
                    <Button
                      variant="dark"
                      size="lg"
                      className="w-full xs:w-auto text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 md:h-14 rounded-xl border-white/30 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden sm:flex items-center justify-center sm:justify-end gap-4 mt-5 sm:mt-6"
                >
                  {[
                    { value: "1000+", label: "Donors" },
                    { value: "100%", label: "Transparent" },
                    { value: "Daily", label: "Video Proof" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-white font-bold text-sm sm:text-base">{stat.value}</p>
                      <p className="text-gray-300 text-[10px] sm:text-xs">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
