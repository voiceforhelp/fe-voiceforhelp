"use client";

import { useEffect, useState, useCallback, useReducer } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, Play, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShareButtons from "@/components/common/ShareButtons";
import DonorShowcase from "@/components/videos/DonorShowcase";
import SocialCollection from "@/components/videos/SocialCollection";
import VideoPlayer from "@/components/videos/VideoPlayer";
import LikeButton from "@/components/videos/LikeButton";
import CommentSection from "@/components/videos/CommentSection";
import ReelPlayer from "@/components/videos/ReelPlayer";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";
import type { VideoImpact } from "@/types";

interface PageState {
  video: VideoImpact | null;
  relatedVideos: VideoImpact[];
  reelsFeed: VideoImpact[];
  reelsPage: number;
  reelsHasMore: boolean;
  loading: boolean;
}

const initialState: PageState = {
  video: null, relatedVideos: [], reelsFeed: [], reelsPage: 1, reelsHasMore: true, loading: true,
};

function reducer(state: PageState, action: Partial<PageState>): PageState {
  return { ...state, ...action };
}

export default function VideoDetailPage() {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { video, relatedVideos, reelsFeed, reelsPage, reelsHasMore, loading } = state;
  const isMobile = useIsMobile();

  // Fetch video + related (single batch state update)
  useEffect(() => {
    if (!params.id) return;
    const id = params.id as string;
    let cancelled = false;

    dispatch({ loading: true });
    Promise.all([
      videoService.getVideoById(id),
      videoService.getRelatedVideos(id, 20),
    ])
      .then(([videoRes, relatedRes]) => {
        if (cancelled) return;
        dispatch({
          video: videoRes.video,
          relatedVideos: relatedRes.videos,
          reelsFeed: relatedRes.videos,
          reelsPage: 1,
          reelsHasMore: relatedRes.videos.length >= 10,
          loading: false,
        });
      })
      .catch(() => { if (!cancelled) dispatch({ loading: false }); });

    return () => { cancelled = true; };
  }, [params.id]);

  // Load more reels
  const loadMoreReels = useCallback(async () => {
    if (!video) return;
    try {
      const nextPage = reelsPage + 1;
      const res = await videoService.getReelsFeed(nextPage, 10, undefined, video._id);
      const existingIds = new Set(reelsFeed.map((v) => v._id));
      const newVideos = res.videos.filter((v: VideoImpact) => !existingIds.has(v._id));
      dispatch({
        reelsFeed: [...reelsFeed, ...newVideos],
        reelsPage: nextPage,
        reelsHasMore: nextPage < res.pages,
      });
    } catch {}
  }, [video, reelsPage, reelsFeed]);

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-texture">
        <div className="container mx-auto px-4 max-w-5xl">
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

  /* ═══ MOBILE: Instagram Reels Experience ═══ */
  if (isMobile) {
    return (
      <ReelPlayer
        initialVideo={video}
        videos={reelsFeed}
        onLoadMore={loadMoreReels}
        hasMore={reelsHasMore}
      />
    );
  }

  /* ═══ DESKTOP: Video Player + Info + Related Grid ═══ */
  return (
    <section className="py-8 md:py-12 bg-texture">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/videos" className="inline-flex items-center text-sm text-gold hover:text-gold/80 mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Videos
        </Link>

        {/* Video Player */}
        {video.videoUrl ? (
          <VideoPlayer
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            title={video.title}
          />
        ) : (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center">
            <Play className="h-16 w-16 text-white/40" />
          </div>
        )}

        {/* Video Info */}
        <div className="bg-dark-light rounded-2xl p-6 mt-4 border border-gray-700/50">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-3">{video.title}</h1>

          {/* Stats + Like + Share */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-3">
              {video.category && <Badge>{video.category.name}</Badge>}
              <span className="flex items-center text-sm text-gray-400">
                <Eye className="h-4 w-4 mr-1" /> {video.views} views
              </span>
              <span className="flex items-center text-sm text-gray-400">
                <Calendar className="h-4 w-4 mr-1" /> {formatDate(video.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <LikeButton videoId={video._id} initialLikesCount={video.likesCount || 0} />
              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={video.title}
              />
            </div>
          </div>

          {video.description && (
            <p className="text-gray-400 mb-4 whitespace-pre-line leading-relaxed text-sm">{video.description}</p>
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

          <div className="pt-4 border-t border-gray-700/50">
            <Link href="/donate">
              <Button variant="secondary" size="sm">Donate Now</Button>
            </Link>
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection videoId={video._id} initialCommentsCount={video.commentsCount || 0} />

        {/* Donor group info */}
        <div className="mt-6 bg-gold/15 rounded-xl p-4 border border-gold/20">
          <p className="text-sm text-gold">
            <strong>Donation Group Date:</strong> {video.donorGroupDate} — This video shows the impact of all donations received on {formatDate(video.donorGroupDate)}.
          </p>
        </div>

        {/* Donor Showcase */}
        {video.linkedDonors && video.linkedDonors.length > 0 && (
          <DonorShowcase donors={video.linkedDonors} />
        )}

        {/* Social Media Collections */}
        {video.socialLinks && (
          <SocialCollection socialLinks={video.socialLinks} />
        )}

        {/* ═══ RELATED VIDEOS GRID ═══ */}
        {relatedVideos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-white mb-6">
              {video.category ? `More ${video.category.name} Videos` : "More Videos"}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {relatedVideos.map((rv) => (
                <Link key={rv._id} href={`/videos/${rv._id}`} className="group">
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700/50">
                    {rv.thumbnailUrl ? (
                      <img src={rv.thumbnailUrl} alt={rv.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                        <Play className="h-4 w-4 text-white ml-0.5" />
                      </div>
                    </div>
                    {rv.category && (
                      <div className="absolute top-1.5 left-1.5">
                        <span className="text-[9px] font-semibold bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                          {rv.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="pt-2.5 px-0.5">
                    <h3 className="text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-gold transition-colors leading-snug">
                      {rv.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                      <span>{rv.views} views</span>
                      <span>{formatDate(rv.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
