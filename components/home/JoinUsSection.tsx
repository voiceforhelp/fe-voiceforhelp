"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HandHeart, Share2, Heart, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  {
    icon: HandHeart,
    tag: "Volunteer",
    title: "Give Your Time, Change Lives",
    desc: "Join our ground team in Rajasthan. Help distribute food, care for animals, plant trees and support children — every weekend or whenever you can.",
    features: ["No prior experience needed", "Field training provided", "Certificate of appreciation", "Orientation within 48 hrs"],
    cta: "Become a Volunteer",
    href: "/volunteer",
    gradient: "from-red-50 to-orange-50",
    border: "border-red-100 hover:border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    tagColor: "bg-red-100 text-red-700",
    ctaVariant: "outline" as const,
  },
  {
    icon: Heart,
    tag: "Donate",
    title: "Your Money, Proven Impact",
    desc: "Even ₹500 feeds a family or rescues an animal. Every donation is matched with a video proof uploaded within 24 hours — so you know exactly where your money went.",
    features: ["Any amount helps", "Video proof in 24 hrs", "UPI · Card · Net Banking", "Receipt issued"],
    cta: "Donate Now",
    href: "/donate",
    gradient: "from-amber-50 to-yellow-50",
    border: "border-amber-100 hover:border-gold/40",
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
    tagColor: "bg-gold/15 text-amber-700",
    ctaVariant: "default" as const,
  },
  {
    icon: Share2,
    tag: "Spread the Word",
    title: "Share Our Impact Videos",
    desc: "Share our real impact videos on social media. Every share reaches new donors and multiplies the impact of every rupee donated.",
    features: ["Share on WhatsApp", "Post on Instagram", "Tag friends & family", "Every share counts"],
    cta: "Watch & Share Videos",
    href: "/videos",
    gradient: "from-blue-50 to-indigo-50",
    border: "border-blue-100 hover:border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tagColor: "bg-blue-100 text-blue-700",
    ctaVariant: "outline" as const,
  },
];

export default function JoinUsSection() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Get Involved
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Three Ways to Make a Difference
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            You don't need to be rich to help. You just need to care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className={`bg-linear-to-br ${opt.gradient} rounded-2xl border ${opt.border} p-6 sm:p-7 flex flex-col transition-all hover:-translate-y-1 hover:shadow-md`}
            >
              {/* Tag + icon */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                  <opt.icon className={`h-5 w-5 ${opt.iconColor}`} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${opt.tagColor}`}>
                  {opt.tag}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{opt.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{opt.desc}</p>

              {/* Feature list */}
              <ul className="space-y-1.5 mb-5">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={opt.href}>
                <Button variant={opt.ctaVariant} className="w-full h-11 font-semibold text-sm gap-1.5">
                  {opt.cta} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Social proof note */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
          <Users className="h-4 w-4" />
          <span>Join <strong className="text-gray-700">1,000+ donors</strong> who have already made a real difference</span>
        </div>
      </div>
    </section>
  );
}
