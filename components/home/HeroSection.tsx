"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      {/* Background image - full width, natural height, no cropping */}
      <div className="relative w-full">
        <img
          src={bannerImage}
          alt="Hero Banner"
          className="w-full h-auto block"
        />
        {/* Gradient overlay on the image for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      {/* Content - overlaid on top of image, pushed to the RIGHT side */}
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="container mx-auto px-4">
          <div className="max-w-xl text-right ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2 drop-shadow-lg">
              {heroTitle}
              <br />
              <span className="text-gold-gradient italic">Change a Life</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-md ml-auto mb-8 mt-3 drop-shadow-md">
              {heroSubtitle}
            </p>
          </motion.div>

          {/* CTA Buttons - aligned right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-end gap-3"
          >
            <Link href="/donate">
              <Button size="lg" className="text-sm md:text-base px-8 h-12 md:h-14 font-bold rounded-lg shadow-lg">
                Donate Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="dark" size="lg" className="text-sm md:text-base px-8 h-12 md:h-14 rounded-lg border-gray-400 bg-[#1e1c18]/80 backdrop-blur-sm shadow-lg">
                Learn More <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
