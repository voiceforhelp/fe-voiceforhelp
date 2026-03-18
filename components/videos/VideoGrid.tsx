"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import VideoPlayerModal from "./VideoPlayerModal";
import type { VideoImpact } from "@/types";

interface VideoGridProps {
  videos: VideoImpact[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoImpact | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, i) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a]">
              {video.thumbnailUrl ? (
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="h-10 w-10 text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                  <Play className="h-5 w-5 text-[#d4a843] ml-0.5" />
                </div>
              </div>
              {video.category && (
                <div className="absolute top-2 left-2">
                  <Badge variant="default" className="text-[10px] bg-[#d4a843]/80 backdrop-blur-sm">{video.category.name}</Badge>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium line-clamp-2">{video.title}</p>
                <div className="flex items-center gap-3 mt-1 text-white/70 text-[10px]">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(video.createdAt)}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{video.views}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
