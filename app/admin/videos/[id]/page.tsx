"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Save, Sparkles, Search, X, Check, ChevronDown,
  Plus, Instagram, Youtube, Facebook, Users, Link as LinkIcon,
  Upload, Play, Eye, ThumbsUp, MessageSquare, Loader2,
  Calendar, Tag, Film, ExternalLink, Clock, CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { adminService } from "@/services/adminService";
import { videoService } from "@/services/videoService";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { VideoImpact, Category, DonorListItem, SocialLink } from "@/types";
import toast from "react-hot-toast";
import Link from "next/link";

type Platform = "instagram" | "youtube" | "facebook";
const emptySocialLinks = { instagram: [] as SocialLink[], youtube: [] as SocialLink[], facebook: [] as SocialLink[] };

// Section header component
function SectionTitle({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-[11px] text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function AdminVideoEditPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [video, setVideo] = useState<VideoImpact | null>(null);

  const [form, setForm] = useState({
    title: "", description: "", category: "", donorGroupDate: "",
    videoUrl: "", tags: "", status: "published" as string,
  });
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [donorsList, setDonorsList] = useState<DonorListItem[]>([]);
  const [donorsLoading, setDonorsLoading] = useState(false);
  const [donorSearch, setDonorSearch] = useState("");
  const [selectedDonorIds, setSelectedDonorIds] = useState<string[]>([]);
  const [donorDropdownOpen, setDonorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [socialLinks, setSocialLinks] = useState(emptySocialLinks);
  const [hasChanges, setHasChanges] = useState(false);

  // ─── Load ───
  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;
    Promise.all([
      videoService.getVideoById(videoId),
      adminService.getAllCategories(),
      adminService.getDonorsList(30, ""),
    ]).then(([videoRes, catRes, donorRes]) => {
      if (cancelled) return;
      const v = videoRes.video;
      setVideo(v);
      setCategories(catRes.categories);
      setDonorsList(donorRes.donors);
      setForm({
        title: v.title || "", description: v.description || "",
        category: typeof v.category === "object" ? v.category?._id || "" : v.category || "",
        donorGroupDate: v.donorGroupDate || "", videoUrl: v.videoUrl || "",
        tags: v.tags?.join(", ") || "", status: v.status || "published",
      });
      if (v.linkedDonors) setSelectedDonorIds(v.linkedDonors.map((d: any) => typeof d === "string" ? d : d._id));
      if (v.socialLinks) setSocialLinks({
        instagram: v.socialLinks.instagram || [], youtube: v.socialLinks.youtube || [], facebook: v.socialLinks.facebook || [],
      });
    }).catch(() => toast.error("Failed to load video"))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [videoId]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDonorDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const updateForm = useCallback((updates: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...updates }));
    setHasChanges(true);
  }, []);

  const fetchDonors = useCallback(async (search = "") => {
    setDonorsLoading(true);
    try { const res = await adminService.getDonorsList(30, search); setDonorsList(res.donors); }
    catch {} finally { setDonorsLoading(false); }
  }, []);

  const handleDonorSearch = useCallback((val: string) => { setDonorSearch(val); fetchDonors(val); }, [fetchDonors]);

  const toggleDonor = useCallback((id: string) => {
    setSelectedDonorIds((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);
    setHasChanges(true);
  }, []);

  const addSocialLink = useCallback((platform: Platform) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: [...prev[platform], { url: "", title: "", thumbnail: "" }] }));
    setHasChanges(true);
  }, []);

  const updateSocialLink = useCallback((platform: Platform, index: number, field: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: prev[platform].map((link, i) => (i === index ? { ...link, [field]: value } : link)) }));
    setHasChanges(true);
  }, []);

  const removeSocialLink = useCallback((platform: Platform, index: number) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: prev[platform].filter((_, i) => i !== index) }));
    setHasChanges(true);
  }, []);

  const handleAIGenerate = useCallback(async () => {
    if (!form.title.trim()) { toast.error("Enter a title first"); return; }
    setGeneratingAI(true);
    try {
      const res = await adminService.generateAIVideoContent(form.title);
      setForm((f) => ({ ...f, description: res.data.description, tags: res.data.tags.join(", ") }));
      setHasChanges(true);
      toast.success(res.cached ? "Loaded from cache" : "AI content generated!");
    } catch (err: any) { toast.error(err.response?.data?.message || "AI generation failed"); }
    finally { setGeneratingAI(false); }
  }, [form.title]);

  const handleReplaceVideo = useCallback(async () => {
    if (!newVideoFile) return;
    setUploadingVideo(true);
    try {
      const uploadRes = await adminService.uploadVideoFile(newVideoFile);
      setForm((f) => ({ ...f, videoUrl: uploadRes.url }));
      setNewVideoFile(null); setHasChanges(true);
      toast.success("Video file replaced!");
    } catch { toast.error("Video upload failed"); }
    finally { setUploadingVideo(false); }
  }, [newVideoFile]);

  const handleSave = useCallback(async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const cleanSocial = {
        instagram: socialLinks.instagram.filter((l) => l.url.trim()),
        youtube: socialLinks.youtube.filter((l) => l.url.trim()),
        facebook: socialLinks.facebook.filter((l) => l.url.trim()),
      };
      await adminService.updateVideo(videoId, {
        title: form.title, description: form.description,
        category: form.category || undefined, donorGroupDate: form.donorGroupDate,
        videoUrl: form.videoUrl, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        linkedDonors: selectedDonorIds, socialLinks: cleanSocial, status: form.status,
      } as any);
      toast.success("Video updated!");
      setHasChanges(false);
    } catch (err: any) { toast.error(err.response?.data?.message || "Update failed"); }
    finally { setSaving(false); }
  }, [videoId, form, socialLinks, selectedDonorIds]);

  const selectedDonorsInfo = useMemo(() =>
    donorsList.filter((d) => selectedDonorIds.includes(d._id)),
    [donorsList, selectedDonorIds]
  );

  const totalSocialLinks = socialLinks.instagram.length + socialLinks.youtube.length + socialLinks.facebook.length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
        <p className="text-sm text-gray-400">Loading video...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center py-24">
        <Film className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium mb-1">Video not found</p>
        <p className="text-xs text-gray-400 mb-4">This video may have been deleted</p>
        <Link href="/admin/videos"><Button variant="outline" size="sm">Back to Videos</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* ═══ HEADER ═══ */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/admin/videos">
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">Edit Video</h1>
              {hasChanges && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
                  <Clock className="h-2.5 w-2.5" /> Unsaved
                </span>
              )}
              {!hasChanges && !saving && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Saved
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-gray-400">Video</span>
              <span className="text-[11px] text-gray-300">/</span>
              <span className="text-[11px] text-gray-500 font-medium truncate max-w-[200px]">{video.title}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/videos/${videoId}`} target="_blank">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Preview
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={saving || !hasChanges} size="sm">
            {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* ═══ VIDEO PREVIEW HERO ═══ */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Thumbnail */}
          <div className="md:col-span-2 relative bg-gray-950 aspect-video md:aspect-auto md:min-h-[200px]">
            {video.thumbnailUrl ? (
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Film className="h-12 w-12 text-white/20" />
              </div>
            )}
            {/* Play overlay */}
            <a href={form.videoUrl} target="_blank" rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-all duration-200 group/play">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 group-hover/play:scale-100 transition-transform">
                <Play className="h-6 w-6 text-gray-900 ml-1" />
              </div>
            </a>
            {/* Status pill on thumbnail */}
            <div className="absolute top-3 left-3">
              <Badge variant={video.status === "published" ? "success" : "warning"} className="text-[10px] shadow-sm">
                {video.status}
              </Badge>
            </div>
          </div>

          {/* Stats + Info */}
          <div className="md:col-span-3 p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">{video.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {video.category && (
                  <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{video.category.name}</span>
                )}
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {formatDate(video.createdAt)}
                </span>
                {video.tags && video.tags.length > 0 && (
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {video.tags.length} tags
                  </span>
                )}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-3 text-center border border-blue-100/50">
                <Eye className="h-4 w-4 text-blue-500 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-gray-900 leading-none">{video.views}</p>
                <p className="text-[10px] text-gray-500 mt-1">Views</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-50/50 rounded-xl p-3 text-center border border-rose-100/50">
                <ThumbsUp className="h-4 w-4 text-rose-500 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-gray-900 leading-none">{video.likesCount || 0}</p>
                <p className="text-[10px] text-gray-500 mt-1">Likes</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 rounded-xl p-3 text-center border border-emerald-100/50">
                <MessageSquare className="h-4 w-4 text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xl font-bold text-gray-900 leading-none">{video.commentsCount || 0}</p>
                <p className="text-[10px] text-gray-500 mt-1">Comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FORM GRID ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-2 space-y-5">

          {/* Content Card */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6 space-y-5">
              <SectionTitle icon={Sparkles} title="Content" subtitle="Title, description and tags" />

              <Input label="Title *" value={form.title} onChange={(e) => updateForm({ title: e.target.value })} />

              <button
                type="button" onClick={handleAIGenerate} disabled={generatingAI || !form.title.trim()}
                className="w-full flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm"
              >
                {generatingAI ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {generatingAI ? "AI is generating..." : "Re-generate with AI"}
              </button>

              <Textarea label="Description" value={form.description} onChange={(e) => updateForm({ description: e.target.value })} rows={6} />

              <div>
                <Input label="Tags" value={form.tags} onChange={(e) => updateForm({ tags: e.target.value })} placeholder="food, donation, impact, ngo..." />
                {form.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        <Tag className="h-2.5 w-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6">
              <SectionTitle icon={Calendar} title="Settings" subtitle="Category, date and status" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 block text-xs font-medium text-gray-700">Category</Label>
                  <select value={form.category} onChange={(e) => updateForm({ category: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all">
                    <option value="">Select category</option>
                    {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                  </select>
                </div>
                <Input label="Group Date" type="date" value={form.donorGroupDate} onChange={(e) => updateForm({ donorGroupDate: e.target.value })} />
                <div>
                  <Label className="mb-1.5 block text-xs font-medium text-gray-700">Status</Label>
                  <select value={form.status} onChange={(e) => updateForm({ status: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all">
                    <option value="published">Published</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Source Card */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6 space-y-4">
              <SectionTitle icon={Film} title="Video Source" subtitle="Current URL or upload new file" />

              <div>
                <Label className="mb-1.5 block text-xs font-medium text-gray-700">Video URL</Label>
                <div className="flex gap-2">
                  <input value={form.videoUrl} onChange={(e) => updateForm({ videoUrl: e.target.value })}
                    className="flex-1 h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all truncate" />
                  {form.videoUrl && (
                    <a href={form.videoUrl} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] text-gray-400 uppercase tracking-wider">or replace</span></div>
              </div>

              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all
                {newVideoFile ? 'border-green-300 bg-green-50/50' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300'}">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  {newVideoFile ? (
                    <p className="text-sm text-green-600 font-medium truncate max-w-[300px] px-4">{newVideoFile.name}</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-600">Click to choose new video</p>
                      <p className="text-[10px] text-gray-400">MP4, WebM, MOV (max 100MB)</p>
                    </>
                  )}
                </div>
                <input type="file" accept="video/*" onChange={(e) => setNewVideoFile(e.target.files?.[0] || null)} className="hidden" />
              </label>
              {newVideoFile && (
                <div className="flex items-center gap-2">
                  <Button onClick={handleReplaceVideo} disabled={uploadingVideo} className="flex-1" size="sm">
                    {uploadingVideo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    {uploadingVideo ? "Uploading..." : "Upload & Replace"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setNewVideoFile(null)}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links Card */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle icon={LinkIcon} title="Social Media Links" subtitle={`${totalSocialLinks} link${totalSocialLinks !== 1 ? "s" : ""} added`} />
              </div>

              {(["instagram", "youtube", "facebook"] as const).map((platform) => {
                const Icon = platform === "instagram" ? Instagram : platform === "youtube" ? Youtube : Facebook;
                const colors = {
                  instagram: { text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
                  youtube: { text: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
                  facebook: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                };
                const c = colors[platform];
                return (
                  <div key={platform} className={`mb-4 last:mb-0 p-3.5 rounded-xl ${c.bg} border ${c.border}`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className={`flex items-center gap-1.5 text-sm font-semibold capitalize ${c.text}`}>
                        <Icon className="h-4 w-4" /> {platform}
                        {socialLinks[platform].length > 0 && (
                          <span className="text-[10px] bg-white/80 px-1.5 py-0.5 rounded-full font-bold">
                            {socialLinks[platform].length}
                          </span>
                        )}
                      </span>
                      <button type="button" onClick={() => addSocialLink(platform)}
                        className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 bg-white rounded-full px-2.5 py-1 shadow-sm border border-green-100 hover:border-green-200 transition-colors">
                        <Plus className="h-3 w-3" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {socialLinks[platform].map((link, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input value={link.url} onChange={(e) => updateSocialLink(platform, idx, "url", e.target.value)} placeholder="Paste URL..."
                            className="flex-1 h-9 rounded-lg border border-white/80 bg-white px-3 text-sm focus:border-green-400 focus:outline-none shadow-sm" />
                          <input value={link.title || ""} onChange={(e) => updateSocialLink(platform, idx, "title", e.target.value)} placeholder="Title"
                            className="w-32 h-9 rounded-lg border border-white/80 bg-white px-3 text-sm focus:border-green-400 focus:outline-none shadow-sm hidden sm:block" />
                          <button type="button" onClick={() => removeSocialLink(platform, idx)}
                            className="h-9 w-9 flex items-center justify-center text-red-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg shadow-sm border border-white/80 transition-colors">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {socialLinks[platform].length === 0 && (
                        <p className="text-[11px] text-gray-400 italic">No links yet</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Donor Selection */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6">
              <SectionTitle icon={Users} title="Linked Donors" subtitle={`${selectedDonorIds.length} donor${selectedDonorIds.length !== 1 ? "s" : ""} linked`} />

              {/* Selected pills */}
              {selectedDonorsInfo.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedDonorsInfo.map((d) => (
                    <span key={d._id} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-medium px-2 py-1 rounded-full border border-green-200">
                      {d.name}
                      <button type="button" onClick={() => toggleDonor(d._id)} className="hover:text-red-500 ml-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {selectedDonorIds.length > 0 && selectedDonorsInfo.length === 0 && (
                <p className="text-xs text-gray-400 mb-3">{selectedDonorIds.length} donor(s) linked</p>
              )}

              <div ref={dropdownRef} className="relative">
                <div onClick={() => { setDonorDropdownOpen(!donorDropdownOpen); if (!donorDropdownOpen) fetchDonors(donorSearch); }}
                  className="flex items-center justify-between h-10 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:border-green-400 transition-colors bg-white">
                  <span className="text-gray-500 text-xs">
                    {selectedDonorIds.length > 0 ? `${selectedDonorIds.length} selected` : "Click to select..."}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${donorDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {donorDropdownOpen && (
                  <div className="absolute top-11 left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-20 max-h-80 overflow-hidden">
                    <div className="p-2.5 border-b border-gray-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input value={donorSearch} onChange={(e) => handleDonorSearch(e.target.value)}
                          placeholder="Search donors..." autoFocus
                          className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:outline-none" />
                      </div>
                    </div>
                    <div className="max-h-56 overflow-y-auto">
                      {donorsLoading ? (
                        <div className="p-4 text-center"><Loader2 className="h-5 w-5 text-gray-300 animate-spin mx-auto" /></div>
                      ) : donorsList.length === 0 ? (
                        <div className="p-4 text-center text-gray-400 text-sm">No donors found</div>
                      ) : (
                        donorsList.map((donor) => {
                          const isSelected = selectedDonorIds.includes(donor._id);
                          return (
                            <div key={donor._id} onClick={() => toggleDonor(donor._id)}
                              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`}>
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                                {isSelected && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{donor.name}</p>
                                <p className="text-[10px] text-gray-400 truncate">{donor.category?.name || "General"}</p>
                              </div>
                              <span className="text-[11px] font-bold text-green-700 shrink-0">{formatCurrency(donor.amount)}</span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="sticky top-4 space-y-3">
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4 space-y-3">
                <Button onClick={handleSave} className="w-full h-11" disabled={saving || !hasChanges}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {saving ? "Saving..." : hasChanges ? "Save Changes" : "No Changes"}
                </Button>

                <Link href={`/videos/${videoId}`} target="_blank" className="block">
                  <Button variant="outline" className="w-full" size="sm">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" /> View Public Page
                  </Button>
                </Link>

                <Link href="/admin/videos" className="block">
                  <Button variant="ghost" className="w-full text-gray-500" size="sm">
                    <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to All Videos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Info</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Created</span>
                    <span className="font-medium text-gray-700">{formatDate(video.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Date</span>
                    <span className="font-medium text-gray-700">{video.donorGroupDate || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Donors</span>
                    <span className="font-medium text-gray-700">{selectedDonorIds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Links</span>
                    <span className="font-medium text-gray-700">{totalSocialLinks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
