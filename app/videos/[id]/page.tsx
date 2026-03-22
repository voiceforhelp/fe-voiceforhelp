"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, Play, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/common/ShareButtons";
import DonorShowcase from "@/components/videos/DonorShowcase";
import SocialCollection from "@/components/videos/SocialCollection";
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

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-texture">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700 rounded w-32" />
            <div className="aspect-video bg-gray-800 rounded-2xl" />
            <div className="h-8 bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-800 rounded w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (!video) {
    return (
      <section className="py-20 bg-texture">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Video not found</p>
          <Link href="/videos" className="text-gold hover:underline">Back to Videos</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-texture">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/videos" className="inline-flex items-center text-sm text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Videos
        </Link>

        {/* Video Player — Lazy loaded */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-2xl">
          {video.videoUrl ? (
            <video
              src={video.videoUrl}
              controls
              preload="metadata"
              className="w-full h-full"
              poster={video.thumbnailUrl}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              <Play className="h-16 w-16 text-white/40" />
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="bg-dark-light rounded-2xl p-6 border border-gray-700/50">
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

          {video.description && (
            <p className="text-gray-400 mb-4 whitespace-pre-line leading-relaxed">{video.description}</p>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {video.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
                  <Tag className="h-3 w-3" /> {tag}
                </span>
              ))}
            </div>
          )}

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
        <div className="mt-6 bg-gold/15 rounded-xl p-4 border border-gold/20">
          <p className="text-sm text-gold">
            <strong>Donation Group Date:</strong> {video.donorGroupDate} — This video shows the impact of all donations received on {formatDate(video.donorGroupDate)}.
          </p>
        </div>

        {/* ═══ DONOR SHOWCASE ═══ */}
        {video.linkedDonors && video.linkedDonors.length > 0 && (
          <DonorShowcase donors={video.linkedDonors} />
        )}

        {/* ═══ SOCIAL MEDIA COLLECTIONS ═══ */}
        {video.socialLinks && (
          <SocialCollection socialLinks={video.socialLinks} />
        )}
      </div>
    </section>
  );
}
