"use client";

import { motion } from "framer-motion";
import { HandCoins, Clapperboard, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: HandCoins,
    title: "You Donate",
    desc: "Choose a cause — food, animals, education, or emergency. Donate any amount. Every rupee matters.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    num: "02",
    icon: Clapperboard,
    title: "We Take Action",
    desc: "Our ground team distributes food, provides care, or plants trees the very next day — recorded on video.",
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    num: "03",
    icon: PlayCircle,
    title: "You See the Impact",
    desc: "A video proof of your donation in action is uploaded to your profile within 24 hours. Watch the change you made.",
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            How Your Donation Works
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            We've built the most transparent donation process in India — you see every rupee in action.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-linear-to-r from-amber-200 via-blue-200 to-green-200 z-0" />

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border p-6 sm:p-7 text-center ${step.color}`}
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-100 select-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className={`h-7 w-7 ${step.iconColor}`} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/donate">
            <Button size="lg" className="h-12 px-8 font-bold text-base shadow-lg shadow-gold/20">
              Start Donating Now →
            </Button>
          </Link>
          <p className="text-xs text-gray-400 mt-3">No account needed · UPI / Cards / Net Banking accepted</p>
        </div>
      </div>
    </section>
  );
}
