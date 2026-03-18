"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/common/ShareButtons";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import type { VideoImpact } from "@/types";

export default function VideoDetailPage() {
  const params = useParams();
  const [video, setVideo] = useState<VideoImpact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      videoService.getVideoById(params.id as string)
        .then((res) => setVideo(res.video))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) return <div className="py-20 text-center text-gray-400">Loading video...</div>;
  if (!video) return <div className="py-20 text-center text-gray-400">Video not found</div>;

  return (
    <section className="py-8 md:py-12 bg-texture">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/videos" className="inline-flex items-center text-sm text-[#d4a843] hover:text-[#d4a843]/80 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Videos
        </Link>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6">
          {video.videoUrl ? (
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              poster={video.thumbnailUrl}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              <Play className="h-16 w-16 text-white/40" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-[#2a2a2a] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {video.category && <Badge>{video.category.name}</Badge>}
            <span className="flex items-center text-sm text-gray-400">
              <Calendar className="h-4 w-4 mr-1" /> {formatDate(video.createdAt)}
            </span>
            <span className="flex items-center text-sm text-gray-400">
              <Eye className="h-4 w-4 mr-1" /> {video.views} views
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{video.title}</h1>
          {video.description && <p className="text-gray-400 mb-4">{video.description}</p>}

          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <ShareButtons
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={video.title}
            />
            <Link href="/donate">
              <Button variant="secondary" size="sm">Donate Now</Button>
            </Link>
          </div>
        </div>

        {/* Donor group info */}
        <div className="mt-6 bg-[#d4a843]/15 rounded-xl p-4 border border-[#d4a843]/20">
          <p className="text-sm text-[#d4a843]">
            <strong>Donation Group Date:</strong> {video.donorGroupDate} — This video shows the impact of all donations received on {formatDate(video.donorGroupDate)}.
          </p>
        </div>
      </div>
    </section>
  );
}
