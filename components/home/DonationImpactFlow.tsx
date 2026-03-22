"use client";

import { motion } from "framer-motion";
import { Heart, ClipboardCheck, Handshake, VideoIcon, Send } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const steps = [
  {
    icon: Heart,
    title: "Donor Donates",
    desc: "You make a contribution through our secure platform",
    color: "from-red-500 to-pink-500",
    step: 1,
  },
  {
    icon: ClipboardCheck,
    title: "Donation Allocated",
    desc: "Your donation is assigned to the chosen cause",
    color: "from-blue-500 to-cyan-500",
    step: 2,
  },
  {
    icon: Handshake,
    title: "Field Impact",
    desc: "Our team uses the funds directly in the field",
    color: "from-green-500 to-emerald-500",
    step: 3,
  },
  {
    icon: VideoIcon,
    title: "Video Confirmation",
    desc: "Field team records video proof of the impact",
    color: "from-purple-500 to-violet-500",
    step: 4,
  },
  {
    icon: Send,
    title: "Video to Donor",
    desc: "You receive the impact video in your profile",
    color: "from-orange-500 to-amber-500",
    step: 5,
  },
];

export default function DonationImpactFlow() {
  return (
    <section className="py-10 sm:py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="How Your Donation Makes an Impact"
          subtitle="Complete transparency from donation to impact — every step is tracked"
          light
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-start justify-center gap-1 lg:gap-2 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center flex-1 px-1"
              >
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <step.icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center mb-2">
                  {step.step}
                </div>
                <h4 className="text-xs lg:text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-[10px] lg:text-xs text-gray-500 leading-snug">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="shrink-0 h-px w-4 lg:w-6 bg-linear-to-r from-gold/40 to-gold/40 -mt-15" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical flow with connecting line */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-linear-to-b from-gold/30 via-gold/20 to-transparency" />

          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 sm:gap-4"
              >
                {/* Icon + step number */}
                <div className="shrink-0 flex flex-col items-center z-10">
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-md`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm min-h-14 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-5 h-5 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
