"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/common/ShareButtons";
import LikeButton from "@/components/videos/LikeButton";
import VideoPlayer from "@/components/videos/VideoPlayer";
import { formatDate } from "@/lib/utils";
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";
import type { VideoImpact } from "@/types";

interface VideoPlayerModalProps {
  video: VideoImpact;
  open: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, open, onClose }: VideoPlayerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#0f0f0f] border-gray-800">
        {/* Video Player */}
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          autoPlay
        />

        <div className="p-5">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {video.category && <Badge>{video.category.name}</Badge>}
              <span className="flex items-center text-xs text-gray-500"><Calendar className="h-3 w-3 mr-1" />{formatDate(video.createdAt)}</span>
              <span className="flex items-center text-xs text-gray-500"><Eye className="h-3 w-3 mr-1" />{video.views} views</span>
            </div>
            <DialogTitle className="text-white text-lg">{video.title}</DialogTitle>
          </DialogHeader>

          {video.description && <p className="text-sm text-gray-400 mt-2 line-clamp-3">{video.description}</p>}

          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <LikeButton videoId={video._id} initialLikesCount={video.likesCount || 0} />
              <ShareButtons url={`${typeof window !== "undefined" ? window.location.origin : ""}/videos/${video._id}`} title={video.title} />
            </div>
            <Link
              href={`/videos/${video._id}`}
              onClick={onClose}
              className="text-gold text-sm hover:underline whitespace-nowrap"
            >
              View full page
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
