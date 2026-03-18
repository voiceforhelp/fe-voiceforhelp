"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/common/ShareButtons";
import { formatDate } from "@/lib/utils";
import { Calendar, Eye } from "lucide-react";
import type { VideoImpact } from "@/types";

interface VideoPlayerModalProps {
  video: VideoImpact;
  open: boolean;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, open, onClose }: VideoPlayerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border-gray-100">
        <div className="aspect-video bg-black">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            poster={video.thumbnailUrl}
          >
            Your browser does not support video playback.
          </video>
        </div>
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {video.category && <Badge>{video.category.name}</Badge>}
              <span className="flex items-center text-xs text-gray-500"><Calendar className="h-3 w-3 mr-1" />{formatDate(video.createdAt)}</span>
              <span className="flex items-center text-xs text-gray-500"><Eye className="h-3 w-3 mr-1" />{video.views} views</span>
            </div>
            <DialogTitle className="text-white">{video.title}</DialogTitle>
          </DialogHeader>
          {video.description && <p className="text-sm text-gray-500 mt-2">{video.description}</p>}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <ShareButtons url={`${typeof window !== "undefined" ? window.location.origin : ""}/videos/${video._id}`} title={video.title} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
