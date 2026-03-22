"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function HeroSection() {
  const [heroTitle, setHeroTitle] = useState("One help , One new beginning.");
  const [heroSubtitle, setHeroSubtitle] = useState("Your Support Can Make a Difference");

  useEffect(() => {
    api.get("/settings/public").then((res) => {
      const s = res.data.settings;
      if (s?.heroTitle) setHeroTitle(s.heroTitle);
      if (s?.heroSubtitle) setHeroSubtitle(s.heroSubtitle);
    }).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden">

      {/* ── MOBILE: full banner image, no text overlay (hidden on sm+) ── */}
      <div className="sm:hidden w-full">
        <img
          src="/Banner/voiceforhelpbannermobile.png"
          alt="Voice For Help"
          className="w-full h-auto object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ── DESKTOP: banner image + text overlay (hidden below sm) ── */}
      <div className="hidden sm:block relative w-full h-105 md:h-130 lg:h-155 xl:h-170">
        <img
          src="/Banner/voiceforhelpbanner.png"
          alt="Voice For Help — Making a Difference"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-black/65" />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparency to-black/15" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="w-full flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-sm md:max-w-md lg:max-w-lg text-right"
              >
                {/* Trust badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-1 mb-4"
                >
                  <Heart className="h-3 w-3 text-gold" fill="currentColor" />
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                    100% Transparency NGO
                  </span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-lg">
                  {heroTitle}
                  <br />
                  <span className="text-gold-gradient italic">Change a Life</span>
                </h1>

                <p className="text-base md:text-lg text-gray-200 mb-8 drop-shadow-md leading-relaxed">
                  {heroSubtitle}
                </p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex items-center justify-end gap-3"
                >
                  <Link href="/donate">
                    <Button
                      size="lg"
                      className="text-sm md:text-base px-8 h-12 md:h-14 font-bold rounded-xl shadow-lg shadow-gold/25"
                    >
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="dark"
                      size="lg"
                      className="text-sm md:text-base px-8 h-12 md:h-14 rounded-xl border-white/30 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
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
                  className="flex items-center justify-end gap-6 mt-6"
                >
                  {[
                    { value: "1000+", label: "Donors" },
                    { value: "100%", label: "Transparency" },
                    { value: "Daily", label: "Video Proof" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-white font-bold text-base">{stat.value}</p>
                      <p className="text-gray-300 text-xs">{stat.label}</p>
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
