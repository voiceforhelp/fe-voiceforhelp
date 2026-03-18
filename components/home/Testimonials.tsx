"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    city: "Jaipur, Rajasthan",
    amount: "₹1,000 donor",
    initials: "RS",
    color: "bg-blue-500",
    stars: 5,
    text: "I donated ₹1,000 for food distribution and received a video the very next day showing meals being served to nearly 50 people. This is the most transparent NGO I have ever donated to. Completely trustworthy.",
  },
  {
    name: "Priya Mehta",
    city: "Udaipur, Rajasthan",
    amount: "₹500 donor",
    initials: "PM",
    color: "bg-rose-500",
    stars: 5,
    text: "What makes Voice For Help different is the video proof. You can literally watch your money creating real change. I donated for animal care and within 24 hours saw injured street dogs being treated. Incredible.",
  },
  {
    name: "Amit Patel",
    city: "Jodhpur, Rajasthan",
    amount: "Monthly donor",
    initials: "AP",
    color: "bg-green-600",
    stars: 5,
    text: "I have been a monthly donor for 6 months now. Every single month I receive a video proof. The team is dedicated, the founder is passionate, and every rupee genuinely reaches those who need it.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Donor Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            What Our Donors Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Real words from real people who have seen their donations make a difference.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote className="h-6 w-6 text-gold/40" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.city} · {t.amount}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          All testimonials are from verified donors. Names shared with permission.
        </p>
      </div>
    </section>
  );
}
