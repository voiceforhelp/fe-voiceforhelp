"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { VideoImpact } from "@/types";

interface LatestVideosProps {
  videos: VideoImpact[];
}

export default function LatestVideos({ videos }: LatestVideosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const scrollPos = useRef(0);
  const isScrolling = useRef(true);
  const lastTime = useRef(0);

  const autoScroll = useCallback((timestamp: number) => {
    if (!isScrolling.current) return;
    const el = scrollRef.current;
    if (el) {
      // ~0.5px per 16ms frame = smooth 30px/s scroll
      const delta = lastTime.current ? (timestamp - lastTime.current) * 0.03 : 0;
      lastTime.current = timestamp;
      scrollPos.current += delta;
      if (scrollPos.current >= el.scrollWidth - el.clientWidth) {
        scrollPos.current = 0;
      }
      el.scrollLeft = scrollPos.current;
    }
    rafRef.current = requestAnimationFrame(autoScroll);
  }, []);

  const startAutoScroll = useCallback(() => {
    isScrolling.current = true;
    lastTime.current = 0;
    rafRef.current = requestAnimationFrame(autoScroll);
  }, [autoScroll]);

  const stopAutoScroll = useCallback(() => {
    isScrolling.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll, stopAutoScroll]);

  const displayVideos = videos.length > 0 ? videos : [
    { _id: "1", title: "Donate Meal - Thank You James A.!", category: { name: "Donate Meal" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
    { _id: "2", title: "Support Education - Thank You Priya Sharma!", category: { name: "Education" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
    { _id: "3", title: "Medical Aid - Thank You Rajesh K.!", category: { name: "Medical Aid" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
    { _id: "4", title: "Animal Care - Thank You Sunita D.!", category: { name: "Animal Care" }, createdAt: new Date().toISOString(), videoUrl: "", thumbnailUrl: "" },
  ] as any[];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-dark/15 flex items-center justify-center">
                <Video className="h-4 w-4 sm:h-5 sm:w-5 text-gold-dark" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                See Videos of Your Impact
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
              Get a <strong className="text-gray-900">personalized video report</strong> showing
              how your donation has helped, featuring{" "}
              <em className="text-gold-dark">your name as a supporter</em>.
            </p>
            <Link href="/videos">
              <Button
                variant="secondary"
                size="sm"
                className="bg-gold-dark hover:bg-gold-dark text-white h-10 sm:h-11 px-4 sm:px-5 text-sm font-semibold"
              >
                Personalized Video Report <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Featured video preview */}
          <div className="hidden md:block">
            <Link href={displayVideos[0]?._id ? `/videos/${displayVideos[0]._id}` : "/videos"}>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-md aspect-video bg-gray-100 cursor-pointer hover:shadow-lg transition-shadow">
              {displayVideos[0]?.thumbnailUrl ? (
                <img
                  src={displayVideos[0].thumbnailUrl}
                  alt="Impact Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-2 glow-gold">
                      <Play className="h-6 w-6 text-black ml-0.5" fill="black" />
                    </div>
                    <p className="text-gold text-xs font-bold uppercase tracking-wider px-4">
                      Your Donation Helped Many Children
                    </p>
                  </div>
                </div>
              )}
            </div>
            </Link>
          </div>
        </div>

        {/* Video cards carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          onTouchStart={stopAutoScroll}
          onTouchEnd={startAutoScroll}
          className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 scrollbar-hide snap-x snap-mandatory touch-pan-x"
        >
          {displayVideos.map((video: any, i: number) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
              viewport={{ once: true }}
              className="shrink-0 snap-center w-64 sm:w-72 md:w-80"
            >
              <Link href={`/videos/${video._id}`}>
              <div className="rounded-xl overflow-hidden border border-gray-100 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 group shadow-sm bg-white cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-gray-400 p-4">
                        <Play className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-1.5 opacity-40" />
                        <p className="text-xs sm:text-sm font-medium">Impact Video</p>
                      </div>
                    </div>
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold flex items-center justify-center shadow-lg glow-gold">
                      <Play className="h-5 w-5 sm:h-7 sm:w-7 text-black ml-0.5" fill="black" />
                    </div>
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-0.5">
                    <span className="text-[10px] text-gray-200">{formatDate(video.createdAt)}</span>
                  </div>
                </div>
                {/* Golden footer bar */}
                <div className="bg-linear-to-r from-gold to-gold-dark px-3 py-2 flex items-center justify-between gap-2">
                  <span className="text-black text-xs font-bold truncate">
                    {video.category?.name || "Impact"}
                  </span>
                  <span className="text-black/70 text-[10px] font-medium truncate shrink-0">
                    {video.title?.split("-")?.[1]?.trim() || ""}
                  </span>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-4 sm:mt-5 md:hidden">
          <Link href="/videos">
            <Button variant="link" className="text-gold-dark font-semibold h-11">
              See All Videos <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
