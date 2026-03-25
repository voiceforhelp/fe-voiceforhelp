"use client";

import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  Heart, MessageCircle, Share2, Play, Volume2, VolumeX,
  ChevronUp, Loader2, X, Send, Trash2, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import type { VideoImpact, VideoComment } from "@/types";

function getOptimizedUrl(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/q_auto/");
}

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function timeAgo(dateStr: string) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// Like status cache to avoid re-fetching on scroll
const likeCache = new Map<string, boolean>();

/* ═══ Comment Bottom Sheet ═══ */
const CommentSheet = memo(function CommentSheet({
  videoId,
  open,
  onClose,
  commentsCount: initialCount,
}: {
  videoId: string;
  open: boolean;
  onClose: () => void;
  commentsCount: number;
}) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [pendingComments, setPendingComments] = useState<VideoComment[]>([]);
  const [commentsCount, setCommentsCount] = useState(initialCount);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setPendingComments([]);
    videoService.getComments(videoId, 1)
      .then((res) => {
        if (cancelled) return;
        setComments(res.comments);
        setTotalPages(res.pages);
        setCommentsCount(res.total);
        setPage(1);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [videoId, open]);

  const loadMore = useCallback(async () => {
    if (page >= totalPages) return;
    try {
      const res = await videoService.getComments(videoId, page + 1);
      setComments((prev) => {
        const ids = new Set(prev.map((c) => c._id));
        return [...prev, ...res.comments.filter((c: VideoComment) => !ids.has(c._id))];
      });
      setPage((p) => p + 1);
    } catch {}
  }, [videoId, page, totalPages]);

  const handleSubmit = useCallback(async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await videoService.addComment(videoId, text.trim());
      if (res.comment.status === "approved") {
        setComments((prev) => [res.comment, ...prev]);
        setCommentsCount((c) => c + 1);
      } else {
        setPendingComments((prev) => [res.comment, ...prev]);
        toast.success("Comment submitted for approval");
      }
      setText("");
    } catch {
      toast.error("Failed to post comment");
    }
    setSubmitting(false);
  }, [videoId, text, submitting]);

  const handleDelete = useCallback(async (commentId: string) => {
    try {
      await videoService.deleteComment(videoId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setPendingComments((prev) => prev.filter((c) => c._id !== commentId));
      setCommentsCount((c) => c - 1);
    } catch {
      toast.error("Failed to delete");
    }
  }, [videoId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-h-[70vh] bg-[#1a1a1a] rounded-t-2xl flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Comments</span>
            <span className="text-gray-500 text-xs">{commentsCount}</span>
          </div>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
            </div>
          ) : (
            <>
              {pendingComments.map((c) => (
                <div key={c._id} className="flex gap-2.5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-2.5">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-semibold shrink-0">
                    {getInitials(c.user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-medium">{c.user.name}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-yellow-400">
                        <Clock className="h-2.5 w-2.5" /> Pending
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mt-0.5">{c.text}</p>
                  </div>
                  <button onClick={() => handleDelete(c._id)} className="text-gray-600 p-1 self-start">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {comments.map((c) => (
                <div key={c._id} className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-xs font-semibold shrink-0">
                    {c.user.avatar ? (
                      <img src={c.user.avatar} alt="" className="w-full h-full rounded-full object-cover" loading="lazy" />
                    ) : (
                      getInitials(c.user.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-medium">{c.user.name}</span>
                      <span className="text-gray-500 text-[10px]">{timeAgo(c.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 text-xs mt-0.5 break-words">{c.text}</p>
                  </div>
                  {user && (c.user._id === (user.id || user._id) || user.role === "admin") && (
                    <button onClick={() => handleDelete(c._id)} className="text-gray-600 p-1 self-start">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}

              {comments.length === 0 && pendingComments.length === 0 && (
                <p className="text-gray-500 text-xs text-center py-6">No comments yet. Be the first!</p>
              )}

              {page < totalPages && (
                <button onClick={loadMore} className="w-full text-center text-xs text-gold py-2">
                  Load more comments
                </button>
              )}
            </>
          )}
        </div>

        {isAuthenticated ? (
          <div className="px-4 py-3 border-t border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-semibold shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(user?.name || "U")
              )}
            </div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Add a comment..."
              maxLength={1000}
              className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2.5 outline-none placeholder:text-gray-500"
            />
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || submitting}
              className="text-gold disabled:text-gray-600 p-1"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </div>
        ) : (
          <div className="px-4 py-3 border-t border-gray-800 text-center">
            <Link href="/login" className="text-gold text-sm font-semibold">Login to comment</Link>
          </div>
        )}
      </div>
    </div>
  );
});

/* ═══ Single Reel Card (memoized) ═══ */
const ReelCard = memo(function ReelCard({
  video,
  isActive,
  isPreload,
  isMuted,
  onToggleMute,
}: {
  video: VideoImpact;
  isActive: boolean;
  isPreload: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(() => likeCache.get(video._id) ?? false);
  const [likesCount, setLikesCount] = useState(video.likesCount || 0);
  const [showDesc, setShowDesc] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const optimizedSrc = useMemo(() => getOptimizedUrl(video.videoUrl), [video.videoUrl]);

  // Auto play/pause based on visibility
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isActive) {
      vid.currentTime = 0;
      vid.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setPlaying(false);
      setShowComments(false);
      setShowDesc(false);
    }
  }, [isActive]);

  // Mute sync
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Check like status (cached)
  useEffect(() => {
    if (!isAuthenticated || !isActive) return;
    if (likeCache.has(video._id)) {
      setLiked(likeCache.get(video._id)!);
      return;
    }
    let cancelled = false;
    videoService.getLikeStatus(video._id).then((r) => {
      if (cancelled) return;
      likeCache.set(video._id, r.liked);
      setLiked(r.liked);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [video._id, isAuthenticated, isActive]);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setPlaying(true));
    } else {
      vid.pause();
      setPlaying(false);
    }
  }, []);

  const handleLike = useCallback(async () => {
    if (!isAuthenticated) {
      toast("Login to like videos");
      return;
    }
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1));
    try {
      const res = await videoService.toggleLike(video._id);
      likeCache.set(video._id, res.liked);
      setLiked(res.liked);
    } catch {
      setLiked(wasLiked);
      setLikesCount((c) => (wasLiked ? c + 1 : c - 1));
    }
  }, [video._id, liked, isAuthenticated]);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/videos/${video._id}`;
    if (navigator.share) {
      navigator.share({ title: video.title, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
  }, [video._id, video.title]);

  const onCloseComments = useCallback(() => setShowComments(false), []);

  return (
    <div className="relative w-full h-full bg-black snap-start snap-always flex-shrink-0">
      <video
        ref={videoRef}
        src={optimizedSrc}
        poster={video.thumbnailUrl}
        loop
        playsInline
        muted={isMuted}
        preload={isActive ? "auto" : isPreload ? "metadata" : "none"}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onLoadedData={() => setLoading(false)}
      />

      {loading && isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      )}

      {!playing && isActive && !loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
            <Play className="h-8 w-8 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Right side actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-10">
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <div className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center transition-all",
            liked ? "bg-red-500 scale-110" : "bg-black/40 backdrop-blur-sm"
          )}>
            <Heart className={cn("h-6 w-6 text-white", liked && "fill-white")} />
          </div>
          <span className="text-white text-[11px] font-semibold drop-shadow">{formatCount(likesCount)}</span>
        </button>

        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-[11px] font-semibold drop-shadow">{formatCount(video.commentsCount || 0)}</span>
        </button>

        <button onClick={handleShare} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-white text-[11px] font-semibold drop-shadow">Share</span>
        </button>

        <button onClick={onToggleMute}>
          <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
        <Link href="/donate" className="inline-block text-[11px] font-bold bg-[#d4a843] text-black px-3 py-1 rounded-full mb-2">
          Donate Now
        </Link>
        {video.category && (
          <span className="inline-block ml-2 text-[11px] font-semibold bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full mb-2">
            {video.category.name}
          </span>
        )}
        <h3 className="text-white font-bold text-base leading-snug mb-1 line-clamp-2">{video.title}</h3>
        {video.description && (
          <div onClick={() => setShowDesc(!showDesc)}>
            <p className={cn("text-white/80 text-xs leading-relaxed", showDesc ? "" : "line-clamp-2")}>
              {video.description}
            </p>
            {video.description.length > 100 && (
              <span className="text-white/60 text-[11px] font-medium">{showDesc ? "Show less" : "...more"}</span>
            )}
          </div>
        )}
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {video.tags.slice(0, 5).map((tag, i) => (
              <span key={i} className="text-[10px] text-white/50">#{tag.replace(/\s+/g, "")}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 mt-1.5 text-white/40 text-[10px]">
          <span>{video.views} views</span>
          <span>{formatDate(video.createdAt)}</span>
        </div>
      </div>

      <CommentSheet videoId={video._id} open={showComments} onClose={onCloseComments} commentsCount={video.commentsCount || 0} />
    </div>
  );
});

/* ═══ Reels Feed Container ═══ */
export default function ReelPlayer({
  initialVideo,
  videos,
  onLoadMore,
  hasMore,
}: {
  initialVideo: VideoImpact;
  videos: VideoImpact[];
  onLoadMore: () => void;
  hasMore: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const loadingMore = useRef(false);

  // Memoize deduped video list
  const allVideos = useMemo(
    () => [initialVideo, ...videos.filter((v) => v._id !== initialVideo._id)],
    [initialVideo, videos]
  );

  // Stable mute toggle
  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  // Snap scroll observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.7 }
    );

    const children = container.querySelectorAll("[data-index]");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [allVideos.length]);

  // Load more when near end
  useEffect(() => {
    if (activeIndex >= allVideos.length - 3 && hasMore && !loadingMore.current) {
      loadingMore.current = true;
      onLoadMore();
      setTimeout(() => { loadingMore.current = false; }, 1000);
    }
  }, [activeIndex, allVideos.length, hasMore, onLoadMore]);

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {allVideos.map((video, i) => (
        <div key={video._id} data-index={i} className="h-[100dvh] w-full" style={{ scrollSnapAlign: "start" }}>
          <ReelCard
            video={video}
            isActive={i === activeIndex}
            isPreload={i === activeIndex + 1 || i === activeIndex - 1}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      ))}

      {activeIndex === 0 && allVideos.length > 1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none">
          <div className="flex flex-col items-center text-white/60">
            <ChevronUp className="h-5 w-5" />
            <span className="text-[10px]">Scroll for more</span>
          </div>
        </div>
      )}
    </div>
  );
}
