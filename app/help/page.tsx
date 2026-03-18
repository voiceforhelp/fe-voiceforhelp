"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, HandHeart, Share2, Handshake, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/home/CTABanner";

const ways = [
  {
    icon: Heart,
    title: "Donate",
    desc: "Make a one-time or recurring donation. Every rupee goes directly to field work with video proof.",
    color: "bg-gold/15 text-gold",
    borderHover: "hover:border-gold/40",
    link: "/donate",
    cta: "Donate Now",
    variant: "default" as const,
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    desc: "Join our field team. Help distribute food, care for animals, and plant trees.",
    color: "bg-red-500/15 text-red-400",
    borderHover: "hover:border-red-500/30",
    link: "/volunteer",
    cta: "Join as Volunteer",
    variant: "outline" as const,
  },
  {
    icon: Share2,
    title: "Share",
    desc: "Spread the word on social media. Share our impact videos to inspire others.",
    color: "bg-blue-500/15 text-blue-400",
    borderHover: "hover:border-blue-500/30",
    link: "/videos",
    cta: "View & Share Videos",
    variant: "outline" as const,
  },
  {
    icon: Handshake,
    title: "Partner",
    desc: "Corporate partnerships and CSR collaborations welcome. Let's create impact together.",
    color: "bg-green-500/15 text-green-400",
    borderHover: "hover:border-green-500/30",
    link: "/contact",
    cta: "Contact Us",
    variant: "outline" as const,
  },
];

const faqs = [
  { q: "How is my donation used?", a: "100% of your donation goes to the chosen category. Our team uses it in the field the next day, and you receive a video proof of the impact." },
  { q: "How do I get the impact video?", a: "After your donation, the next day's field work is recorded. The video is uploaded and linked to your profile automatically." },
  { q: "Can I donate anonymously?", a: "Yes! Use our Fast Donate feature to make anonymous donations with just your phone number." },
  { q: "Is my donation tax deductible?", a: "We are in the process of obtaining 80G certification. Stay tuned for updates." },
  { q: "How can I verify my donation was used?", a: "Every donation is linked to a daily video. You can watch the impact video in your profile dashboard." },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Page hero */}
      <section className="bg-texture py-14 sm:py-20 md:py-28 border-b border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Get Involved
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            How You Can Help
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            There are many ways to make a difference. Choose what works for you.
          </p>
        </div>
      </section>

      {/* Ways to help */}
      <section className="py-12 sm:py-16 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
            {ways.map((w, i) => (
              <div
                key={i}
                className={`bg-dark-light rounded-2xl p-6 sm:p-7 md:p-8 border border-gray-700/50 ${w.borderHover} hover:-translate-y-1 transition-all duration-300 flex flex-col`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${w.color} flex items-center justify-center mb-4 shrink-0`}>
                  <w.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{w.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-5 flex-1 leading-relaxed">{w.desc}</p>
                <Link href={w.link}>
                  <Button variant={w.variant} size="sm" className="h-10 sm:h-11 text-sm font-semibold w-full sm:w-auto">
                    {w.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-texture">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8 sm:mb-10">Everything you need to know about donating with us</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-dark-light rounded-xl border border-gray-700/50 hover:border-gold/20 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left min-h-14"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-gold" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-gray-700/30 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
