"use client";

import Link from "next/link";
import { Heart, HandHeart, Share2, Handshake, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/home/CTABanner";

const ways = [
  { icon: Heart, title: "Donate", desc: "Make a one-time or recurring donation. Every rupee goes directly to field work with video proof.", color: "bg-[#d4a843]/15 text-[#d4a843]", link: "/donate", cta: "Donate Now" },
  { icon: HandHeart, title: "Volunteer", desc: "Join our field team. Help distribute food, care for animals, and plant trees.", color: "bg-[#d4a843]/15 text-[#d4a843]", link: "/volunteer", cta: "Join as Volunteer" },
  { icon: Share2, title: "Share", desc: "Spread the word on social media. Share our impact videos to inspire others.", color: "bg-[#d4a843]/15 text-[#d4a843]", link: "/videos", cta: "View & Share Videos" },
  { icon: Handshake, title: "Partner", desc: "Corporate partnerships and CSR collaborations welcome. Let's create impact together.", color: "bg-[#d4a843]/15 text-[#d4a843]", link: "/contact", cta: "Contact Us" },
];

const faqs = [
  { q: "How is my donation used?", a: "100% of your donation goes to the chosen category. Our team uses it in the field the next day, and you receive a video proof of the impact." },
  { q: "How do I get the impact video?", a: "After your donation, the next day's field work is recorded. The video is uploaded and linked to your profile automatically." },
  { q: "Can I donate anonymously?", a: "Yes! Use our Fast Donate feature to make anonymous donations with just your phone number." },
  { q: "Is my donation tax deductible?", a: "We are in the process of obtaining 80G certification. Stay tuned for updates." },
  { q: "How can I verify my donation was used?", a: "Every donation is linked to a daily video. You can watch the impact video in your profile dashboard." },
];

export default function HelpPage() {
  return (
    <>
      <section className="bg-texture py-16 md:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">How You Can Help</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            There are many ways to make a difference. Choose what works for you.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ways.map((w, i) => (
              <div key={i} className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700/50 hover:border-[#d4a843]/30 transition-all">
                <div className={`w-14 h-14 rounded-2xl ${w.color} flex items-center justify-center mb-4`}>
                  <w.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{w.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{w.desc}</p>
                <Link href={w.link}>
                  <Button variant={i === 0 ? "secondary" : "outline"} size="sm">{w.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-texture">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#2a2a2a] rounded-xl border border-gray-700/50 group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
