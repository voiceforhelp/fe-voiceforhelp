"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { IndianRupee, Users, Video, Heart, Leaf } from "lucide-react";

const stats = [
  { icon: IndianRupee, value: 500000, prefix: "₹", suffix: "+", label: "Total Donated", sub: "By our generous donors" },
  { icon: Users,       value: 2000,   prefix: "",  suffix: "+", label: "Lives Impacted", sub: "People helped directly" },
  { icon: Video,       value: 300,    prefix: "",  suffix: "+", label: "Impact Videos", sub: "Proof of every donation" },
  { icon: Heart,       value: 1000,   prefix: "",  suffix: "+", label: "Happy Donors",  sub: "And growing every day" },
  { icon: Leaf,        value: 500,    prefix: "",  suffix: "+", label: "Trees Planted",  sub: "For a greener India" },
];

function AnimatedNumber({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = (target / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = count >= 1000
    ? (count >= 100000 ? `${(count / 100000).toFixed(1)}L` : `${(count / 1000).toFixed(0)}K`)
    : count.toString();

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export default function ImpactCounter() {
  return (
    <section className="py-12 sm:py-16 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Numbers That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/20 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-gold text-xs sm:text-sm font-semibold">{stat.label}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
