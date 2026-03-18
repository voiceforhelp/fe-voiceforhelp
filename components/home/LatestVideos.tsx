"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { VideoImpact } from "@/types";

interface LatestVideosProps {
  videos: VideoImpact[];
}

export default function LatestVideos({ videos }: LatestVideosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayVideos = videos.length > 0 ? videos : [
    { _id: "1", title: "Donate Meal - Thank You James A.!", category: { name: "Donate Meal" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
    { _id: "2", title: "Support Education - Thank You Priya Sharma!", category: { name: "Education" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
    { _id: "3", title: "Medical Aid - Thank You Rajesh K.!", category: { name: "Medical Aid" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
  ] as any[];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let scrollPos = 0;
    const timer = setInterval(() => {
      scrollPos += 1;
      if (scrollPos >= el.scrollWidth - el.clientWidth) scrollPos = 0;
      el.scrollTo({ left: scrollPos, behavior: "smooth" });
    }, 50);
    const handleMouseEnter = () => clearInterval(timer);
    el.addEventListener("mouseenter", handleMouseEnter);
    return () => { clearInterval(timer); el.removeEventListener("mouseenter", handleMouseEnter); };
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#faf7f2]">
      <div className="container mx-auto px-4">
        {/* Section header - matching image layout */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Video className="h-8 w-8 text-[#b8922e]" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                See Videos of Your Impact
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Get a <strong className="text-gray-900">personalized video report</strong> showing how your donation has helped, featuring <em className="text-[#b8922e]">your name as a supporter</em>.
            </p>
            <Link href="/videos">
              <Button variant="secondary" size="sm" className="bg-[#b8922e] hover:bg-[#a07e28] text-white">
                Personalized Video Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Featured video preview (right side) */}
          <div className="hidden md:block">
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
              {displayVideos[0]?.thumbnailUrl ? (
                <img src={displayVideos[0].thumbnailUrl} alt="Impact" className="w-full h-52 object-cover" />
              ) : (
                <div className="w-full h-52 bg-gradient-to-br from-[#2c2820] to-[#1e1c18] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#d4a843] flex items-center justify-center mx-auto mb-2 glow-gold">
                      <Play className="h-7 w-7 text-black ml-1" fill="black" />
                    </div>
                    <p className="text-[#d4a843] text-xs font-bold uppercase tracking-wider">Your Donation Helped Many Children</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video cards carousel */}
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
          {displayVideos.map((video, i) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 snap-center w-72 md:w-80"
            >
              <div className="rounded-xl overflow-hidden border border-gray-200 hover:border-[#d4a843]/50 transition-all card-hover group shadow-sm bg-white">
                <div className="relative aspect-video bg-gradient-to-br from-[#3a3a3a] to-[#222] flex items-center justify-center">
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-500 p-4">
                      <Play className="h-12 w-12 mx-auto mb-2 opacity-40" />
                      <p className="text-sm font-medium">Impact Video</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#d4a843] flex items-center justify-center shadow-lg glow-gold">
                      <Play className="h-7 w-7 text-black ml-1" fill="black" />
                    </div>
                  </div>
                </div>
                {/* Golden bottom bar with category + donor name */}
                <div className="bg-gradient-to-r from-[#d4a843] to-[#b8922e] px-4 py-2 flex items-center justify-between">
                  <span className="text-black text-xs font-bold">{video.category?.name || "Impact"}</span>
                  <span className="text-black/70 text-xs font-medium">{video.title?.split("-")?.[1]?.trim() || ""}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-4">
          <Link href="/videos">
            <Button variant="link" className="text-[#b8922e]">See All Videos <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
