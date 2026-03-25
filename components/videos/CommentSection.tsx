"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Trash2, Loader2, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import type { VideoComment } from "@/types";

interface CommentSectionProps {
  videoId: string;
  initialCommentsCount: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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

export default function CommentSection({ videoId, initialCommentsCount }: CommentSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [pendingComments, setPendingComments] = useState<VideoComment[]>([]);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load comments when expanded
  useEffect(() => {
    if (!expanded) return;
    setLoading(true);
    videoService
      .getComments(videoId, 1)
      .then((res) => {
        setComments(res.comments);
        setTotalPages(res.pages);
        setCommentsCount(res.total);
        setPage(1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [videoId, expanded]);

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    try {
      const res = await videoService.getComments(videoId, page + 1);
      setComments((prev) => [...prev, ...res.comments]);
      setPage(page + 1);
    } catch {}
    setLoadingMore(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await videoService.addComment(videoId, text.trim());
      if (res.comment.status === "approved") {
        // Admin comments go directly to approved list
        setComments((prev) => [res.comment, ...prev]);
        setCommentsCount((c) => c + 1);
      } else {
        // User comments go to pending list (shown only to the user)
        setPendingComments((prev) => [res.comment, ...prev]);
        toast.success("Comment submitted! It will be visible after admin approval.");
      }
      setText("");
    } catch {
      toast.error("Failed to post comment");
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    try {
      await videoService.deleteComment(videoId, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setPendingComments((prev) => prev.filter((c) => c._id !== commentId));
      setCommentsCount((c) => c - 1);
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const totalVisible = commentsCount + pendingComments.length;

  return (
    <div className="mt-6">
      {/* Header - click to expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-dark-light rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-gray-400" />
          <span className="text-white font-medium">{commentsCount} Comments</span>
        </div>
        <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", expanded && "rotate-180")} />
      </button>

      {expanded && (
        <div className="mt-3 bg-dark-light rounded-xl border border-gray-700/50 p-4 md:p-6">
          {/* Add comment form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-semibold flex-shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  getInitials(user?.name || "U")
                )}
              </div>
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment..."
                  maxLength={1000}
                  rows={1}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                  className="w-full bg-transparent border-b border-gray-600 focus:border-gold text-white text-sm placeholder:text-gray-500 pb-2 outline-none resize-none min-h-[36px]"
                />
                {text.trim() && (
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setText("")}
                      className="text-gray-400 text-sm hover:text-white transition-colors px-3 py-1.5 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-gold hover:bg-gold/90 text-black text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="text-center py-4 mb-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 text-sm">
                <Link href="/login" className="text-gold font-semibold hover:underline">Login</Link> to add a comment
              </p>
            </div>
          )}

          {/* User's pending comments (only visible to them) */}
          {pendingComments.length > 0 && (
            <div className="mb-4 space-y-3">
              {pendingComments.map((comment) => (
                <div key={comment._id} className="flex gap-3 group/comment bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-semibold flex-shrink-0">
                    {getInitials(comment.user.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{comment.user.name}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                        <Clock className="h-2.5 w-2.5" /> Pending approval
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mt-0.5 break-words">{comment.text}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-gray-600 hover:text-red-500 transition-all p-1 self-start"
                    title="Delete comment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Comments list */}
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
            </div>
          ) : comments.length === 0 && pendingComments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="flex gap-3 group/comment">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-xs font-semibold flex-shrink-0">
                    {comment.user.avatar ? (
                      <img src={comment.user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(comment.user.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{comment.user.name}</span>
                      <span className="text-gray-500 text-xs">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-0.5 break-words">{comment.text}</p>
                  </div>
                  {/* Delete button (own comment or admin) */}
                  {user && (comment.user._id === (user.id || user._id) || user.role === "admin") && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-gray-600 hover:text-red-500 opacity-0 group-hover/comment:opacity-100 transition-all p-1 self-start"
                      title="Delete comment"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Load more */}
              {page < totalPages && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="w-full text-center text-sm text-gold hover:text-gold/80 py-2 transition-colors flex items-center justify-center gap-1"
                >
                  {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : "Show more comments"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
