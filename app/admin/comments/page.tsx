"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Check, X, Trash2, Loader2, Filter, ThumbsUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { VideoComment, VideoLikeItem } from "@/types";

type CommentWithVideo = VideoComment & { video: { _id: string; title: string; thumbnailUrl?: string } };

type Tab = "comments" | "likes";

export default function AdminCommentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("comments");

  // ═══ COMMENTS STATE ═══
  const [comments, setComments] = useState<CommentWithVideo[]>([]);
  const [commentLoading, setCommentLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [commentPage, setCommentPage] = useState(1);
  const [commentTotalPages, setCommentTotalPages] = useState(1);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  // ═══ LIKES STATE ═══
  const [likes, setLikes] = useState<VideoLikeItem[]>([]);
  const [likeLoading, setLikeLoading] = useState(true);
  const [likePage, setLikePage] = useState(1);
  const [likeTotalPages, setLikeTotalPages] = useState(1);
  const [likeTotal, setLikeTotal] = useState(0);

  // ═══ FETCH COMMENTS ═══
  const fetchComments = useCallback(async () => {
    setCommentLoading(true);
    try {
      const res = await adminService.getAdminComments(commentPage, statusFilter);
      setComments(res.comments as CommentWithVideo[]);
      setCommentTotalPages(res.pages);
      setCounts(res.counts);
    } catch {
      toast.error("Failed to load comments");
    }
    setCommentLoading(false);
  }, [commentPage, statusFilter]);

  useEffect(() => {
    if (activeTab === "comments") fetchComments();
  }, [fetchComments, activeTab]);

  // ═══ FETCH LIKES ═══
  const fetchLikes = useCallback(async () => {
    setLikeLoading(true);
    try {
      const res = await adminService.getAdminLikes(likePage);
      setLikes(res.likes);
      setLikeTotalPages(res.pages);
      setLikeTotal(res.total);
    } catch {
      toast.error("Failed to load likes");
    }
    setLikeLoading(false);
  }, [likePage]);

  useEffect(() => {
    if (activeTab === "likes") fetchLikes();
  }, [fetchLikes, activeTab]);

  // ═══ COMMENT ACTIONS ═══
  const handleApprove = async (id: string) => {
    try {
      await adminService.updateCommentStatus(id, "approved");
      toast.success("Comment approved");
      fetchComments();
    } catch {
      toast.error("Failed to approve comment");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminService.updateCommentStatus(id, "rejected");
      toast.success("Comment rejected");
      fetchComments();
    } catch {
      toast.error("Failed to reject comment");
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    try {
      await adminService.deleteAdminComment(id);
      toast.success("Comment deleted");
      fetchComments();
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const handleBulkAction = async (action: "approve" | "reject" | "delete") => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return toast.error("No comments selected");
    if (action === "delete" && !confirm(`Delete ${ids.length} comments permanently?`)) return;

    setBulkLoading(true);
    try {
      await adminService.bulkCommentAction(ids, action);
      toast.success(`${action} completed for ${ids.length} comments`);
      setSelectedIds(new Set());
      fetchComments();
    } catch {
      toast.error(`Failed to ${action} comments`);
    }
    setBulkLoading(false);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === comments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(comments.map((c) => c._id)));
    }
  };

  // ═══ LIKE ACTIONS ═══
  const handleDeleteLike = async (id: string) => {
    if (!confirm("Remove this like?")) return;
    try {
      await adminService.deleteAdminLike(id);
      toast.success("Like removed");
      fetchLikes();
    } catch {
      toast.error("Failed to remove like");
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", styles[status])}>{status}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comments & Likes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage video interactions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        <button
          onClick={() => setActiveTab("comments")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "comments" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <MessageSquare className="h-4 w-4" />
          Comments
          {counts.pending > 0 && (
            <span className="bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{counts.pending}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("likes")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "likes" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <ThumbsUp className="h-4 w-4" />
          Likes
          {likeTotal > 0 && <span className="text-xs text-gray-400">({likeTotal})</span>}
        </button>
      </div>

      {/* ═══════════════ COMMENTS TAB ═══════════════ */}
      {activeTab === "comments" && (
        <div>
          {/* Status filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-gray-400" />
            {[
              { key: "pending", label: "Pending", count: counts.pending },
              { key: "approved", label: "Approved", count: counts.approved },
              { key: "rejected", label: "Rejected", count: counts.rejected },
              { key: "", label: "All", count: counts.pending + counts.approved + counts.rejected },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setStatusFilter(tab.key); setCommentPage(1); setSelectedIds(new Set()); }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  statusFilter === tab.key ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Bulk actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="text-sm text-blue-700 font-medium">{selectedIds.size} selected</span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" onClick={() => handleBulkAction("approve")} disabled={bulkLoading} className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs">
                  <Check className="h-3 w-3 mr-1" /> Approve
                </Button>
                <Button size="sm" onClick={() => handleBulkAction("reject")} disabled={bulkLoading} variant="outline" className="h-8 text-xs">
                  <X className="h-3 w-3 mr-1" /> Reject
                </Button>
                <Button size="sm" onClick={() => handleBulkAction("delete")} disabled={bulkLoading} variant="outline" className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          )}

          {commentLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No {statusFilter || ""} comments found</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[40px_1fr_1fr_100px_140px] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === comments.length && comments.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </label>
                <span>Comment</span>
                <span>Video</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {/* Rows */}
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-[40px_1fr_1fr_100px_140px] gap-3 md:gap-4 px-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors",
                    selectedIds.has(comment._id) && "bg-blue-50/50"
                  )}
                >
                  {/* Checkbox */}
                  <label className="hidden md:flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(comment._id)}
                      onChange={() => toggleSelect(comment._id)}
                      className="rounded border-gray-300"
                    />
                  </label>

                  {/* Comment content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{comment.user.name}</span>
                      <span className="text-xs text-gray-400">{comment.user.email}</span>
                    </div>
                    <p className="text-sm text-gray-600 break-words line-clamp-2">{comment.text}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{formatDate(comment.createdAt)}</span>
                  </div>

                  {/* Video */}
                  <div className="flex items-center gap-2 min-w-0">
                    {comment.video?.thumbnailUrl && (
                      <img src={comment.video.thumbnailUrl} alt="" className="w-12 h-8 rounded object-cover flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-600 truncate">{comment.video?.title || "Unknown"}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    {statusBadge(comment.status)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {comment.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(comment._id)}
                        className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors"
                        title="Approve"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    {comment.status !== "rejected" && (
                      <button
                        onClick={() => handleReject(comment._id)}
                        className="p-1.5 rounded-lg hover:bg-yellow-100 text-yellow-600 transition-colors"
                        title="Reject"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {commentTotalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommentPage((p) => Math.max(1, p - 1))}
                disabled={commentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-500">Page {commentPage} of {commentTotalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommentPage((p) => Math.min(commentTotalPages, p + 1))}
                disabled={commentPage === commentTotalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ LIKES TAB ═══════════════ */}
      {activeTab === "likes" && (
        <div>
          {likeLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : likes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <ThumbsUp className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No likes yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[1fr_1fr_120px_80px] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                <span>User</span>
                <span>Video</span>
                <span>Date</span>
                <span>Actions</span>
              </div>

              {likes.map((like) => (
                <div
                  key={like._id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_80px] gap-3 md:gap-4 px-4 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-900">{like.user.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{like.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    {like.video?.thumbnailUrl && (
                      <img src={like.video.thumbnailUrl} alt="" className="w-12 h-8 rounded object-cover flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-600 truncate">{like.video?.title || "Unknown"}</span>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">{formatDate(like.createdAt)}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDeleteLike(like._id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                      title="Remove like"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {likeTotalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLikePage((p) => Math.max(1, p - 1))}
                disabled={likePage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-500">Page {likePage} of {likeTotalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLikePage((p) => Math.min(likeTotalPages, p + 1))}
                disabled={likePage === likeTotalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
