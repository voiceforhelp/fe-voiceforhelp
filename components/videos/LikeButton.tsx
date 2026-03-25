"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { videoService } from "@/services/videoService";
import toast from "react-hot-toast";
import Link from "next/link";

interface LikeButtonProps {
  videoId: string;
  initialLikesCount: number;
}

export default function LikeButton({ videoId, initialLikesCount }: LikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Check like status on mount
  useEffect(() => {
    if (isAuthenticated) {
      videoService.getLikeStatus(videoId).then((res) => setLiked(res.liked)).catch(() => {});
    }
  }, [videoId, isAuthenticated]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast((t) => (
        <span className="flex items-center gap-2 text-sm">
          Please{" "}
          <Link href="/login" className="text-gold font-semibold underline" onClick={() => toast.dismiss(t.id)}>
            login
          </Link>{" "}
          to like videos
        </span>
      ), { duration: 3000 });
      return;
    }

    if (loading) return;
    setLoading(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount((c) => (wasLiked ? c - 1 : c + 1));
    if (!wasLiked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }

    try {
      const res = await videoService.toggleLike(videoId);
      setLiked(res.liked);
    } catch {
      // Revert optimistic update
      setLiked(wasLiked);
      setLikesCount((c) => (wasLiked ? c + 1 : c - 1));
      toast.error("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        liked
          ? "bg-red-500/15 text-red-500 hover:bg-red-500/25"
          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:text-white"
      )}
    >
      <ThumbsUp
        className={cn(
          "h-4 w-4 transition-transform",
          liked && "fill-current",
          animating && "animate-bounce"
        )}
      />
      <span className="tabular-nums">{likesCount}</span>
    </button>
  );
}
