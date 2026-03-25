"use client";

import { motion } from "framer-motion";
import { Play, Calendar, Eye, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { VideoImpact } from "@/types";

interface VideoGridProps {
  videos: VideoImpact[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video, i) => (
          <Link key={video._id} href={`/videos/${video._id}`}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="group cursor-pointer"
          >
            {/* Thumbnail - 16:9 ratio like YouTube */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              {video.thumbnailUrl ? (
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <Play className="h-10 w-10 text-gray-600" />
                </div>
              )}
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                  <Play className="h-5 w-5 text-white ml-0.5" />
                </div>
              </div>
              {/* Category badge */}
              {video.category && (
                <div className="absolute top-2 left-2">
                  <Badge variant="default" className="text-[10px] bg-gold/80 backdrop-blur-sm">{video.category.name}</Badge>
                </div>
              )}
            </div>

            {/* Video info below thumbnail - YouTube style */}
            <div className="pt-3 px-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 mt-1.5 text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />{video.views}
                </span>
                {(video.likesCount > 0) && (
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />{video.likesCount}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />{formatDate(video.createdAt)}
                </span>
              </div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
}
