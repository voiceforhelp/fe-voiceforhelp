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
      {/* Hero */}
      <section className="bg-texture py-16 md:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">About VoiceForHelp</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Be The Voice, Be The Change — We believe in complete transparency in charitable giving.
          </p>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-12 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700/50">
              <div className="w-12 h-12 rounded-full bg-[#d4a843]/15 text-[#d4a843] flex items-center justify-center mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To create a fully transparent donation ecosystem where every contributor can see exactly how their money creates real-world impact through daily video documentation of field activities.
              </p>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700/50">
              <div className="w-12 h-12 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                A world where every act of charity is visible, accountable, and creates a ripple effect of kindness. We envision becoming India&apos;s most trusted transparent donation platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-texture">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Core Values" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#d4a843]/15 text-[#d4a843] flex items-center justify-center mx-auto mb-3">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-white mb-1">{v.title}</h3>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatsCard icon={Heart} value={5000} prefix="₹" label="Total Donations" />
            <StatsCard icon={Users} value={200} label="Total Donors" />
            <StatsCard icon={Award} value={150} label="Impact Videos" />
            <StatsCard icon={Calendar} value={50} label="Volunteers" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-texture">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Journey" />
          <div className="max-w-2xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#d4a843] text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-full bg-gray-700 mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs font-semibold text-[#d4a843] mb-1">{m.year}</p>
                  <p className="text-sm text-gray-400">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
