"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  prefix?: string;
  className?: string;
}

export default function StatsCard({ icon: Icon, value, label, prefix = "", className }: StatsCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn("bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center", className)}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">
        {prefix}{count.toLocaleString("en-IN")}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </motion.div>
  );
}
