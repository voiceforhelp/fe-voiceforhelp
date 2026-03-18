"use client";

import { motion } from "framer-motion";
import { Heart, ClipboardCheck, Handshake, VideoIcon, Send, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const steps = [
  {
    icon: Heart,
    title: "Donor Donates",
    desc: "You make a contribution through our secure platform",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: ClipboardCheck,
    title: "Donation Allocated",
    desc: "Your donation is assigned to the chosen cause",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Handshake,
    title: "Field Impact",
    desc: "Our team uses the funds directly in the field",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: VideoIcon,
    title: "Video Confirmation",
    desc: "Field team records video proof of the impact",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Send,
    title: "Video to Donor",
    desc: "You receive the impact video in your profile",
    color: "from-orange-500 to-amber-500",
  },
];

export default function DonationImpactFlow() {
  return (
    <section className="py-12 md:py-20 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="How Your Donation Makes an Impact"
          subtitle="Complete transparency from donation to impact — every step is tracked"
          light
        />

        {/* Desktop horizontal flow */}
        <div className="hidden md:flex items-start justify-center gap-2 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center w-40"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#d4a843] text-black text-sm font-bold flex items-center justify-center mb-2">
                  {i + 1}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-gray-400 mt-6 mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="md:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#d4a843] text-black text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
