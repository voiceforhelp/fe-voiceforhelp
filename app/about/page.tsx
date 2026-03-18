"use client";

import { Heart, Eye, Target, Users, Award, Calendar } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import StatsCard from "@/components/common/StatsCard";
import CTABanner from "@/components/home/CTABanner";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every life matters. We serve with love and empathy." },
  { icon: Eye, title: "Transparency", desc: "Every donation tracked with daily video proof." },
  { icon: Target, title: "Impact", desc: "100% of donations go directly to field work." },
  { icon: Users, title: "Community", desc: "Building a network of caring individuals." },
];

const milestones = [
  { year: "2023", event: "VoiceForHelp was founded with a mission to bring transparency to charitable giving" },
  { year: "2023", event: "First 100 donors joined our transparent donation platform" },
  { year: "2024", event: "Launched daily video proof system for donation tracking" },
  { year: "2024", event: "Expanded to cover 5+ donation categories including animal care, food, and environment" },
  { year: "2025", event: "Reached 1000+ donations with 100% video-verified impact" },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-texture py-14 sm:py-20 md:py-28 border-b border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            About VoiceForHelp
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Be The Voice, Be The Change — We believe in complete transparency in charitable giving.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading title="Our Purpose" />
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-dark-light rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                To create a fully transparent donation ecosystem where every contributor can see exactly how their money creates real-world impact through daily video documentation of field activities.
              </p>
            </div>
            <div className="bg-dark-light rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-orange-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                A world where every act of charity is visible, accountable, and creates a ripple effect of kindness. We envision becoming India&apos;s most trusted transparent donation platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-12 sm:py-16 bg-texture">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading title="Our Core Values" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div
                key={i}
                className="text-center bg-[#2c2820]/60 rounded-2xl p-5 sm:p-6 border border-gray-800/40 hover:border-gold/20 transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto mb-3">
                  <v.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="font-bold text-white mb-1 text-sm sm:text-base">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-texture-light">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading title="Our Numbers" subtitle="Impact through transparency and dedication" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <StatsCard icon={Heart} value={5000} prefix="₹" label="Total Donations" />
            <StatsCard icon={Users} value={200} label="Total Donors" />
            <StatsCard icon={Award} value={150} label="Impact Videos" />
            <StatsCard icon={Calendar} value={50} label="Volunteers" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-texture">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading title="Our Journey" />
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-gold/50 via-gold/20 to-transparent" />

              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5 relative">
                    <div className="flex flex-col items-center shrink-0 z-10">
                      <div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center text-xs font-bold shadow-md shadow-gold/30">
                        {m.year.slice(2)}
                      </div>
                    </div>
                    <div className="pb-7 sm:pb-8 pt-1.5 flex-1">
                      <p className="text-xs font-semibold text-gold mb-1">{m.year}</p>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
