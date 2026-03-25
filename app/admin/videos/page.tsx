"use client";

import { useEffect, useState, useRef } from "react";
import {
  Upload, Video, Trash2, Sparkles, Search, X, Check, ChevronDown,
  Plus, Instagram, Youtube, Facebook, Users, Link as LinkIcon, Pencil, Eye, Play,
} from "lucide-react";
import Link from "next/link";
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

const emptySocialLinks = { instagram: [] as SocialLink[], youtube: [] as SocialLink[], facebook: [] as SocialLink[] };

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  // Upload form state
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", donorGroupDate: "", videoUrl: "", tags: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Donor selection state
  const [donorsList, setDonorsList] = useState<DonorListItem[]>([]);
  const [donorsLoading, setDonorsLoading] = useState(false);
  const [donorSearch, setDonorSearch] = useState("");
  const [selectedDonors, setSelectedDonors] = useState<DonorListItem[]>([]);
  const [donorDropdownOpen, setDonorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Social links state
  const [socialLinks, setSocialLinks] = useState(emptySocialLinks);

  const fetchCategories = async () => {
    try {
      const res = await adminService.getAllCategories();
      setCategories(res.categories);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    videoService.getAllVideos(1, 50).then((res) => setVideos(res.videos)).catch(() => {}).finally(() => setLoading(false));
    fetchCategories();
  }, []);

  // Fetch donors list and categories when upload form opens
  useEffect(() => {
    if (showUpload) {
      fetchDonors();
      if (categories.length === 0) fetchCategories();
    }
  }, [showUpload]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDonorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchDonors = async (search = "") => {
    setDonorsLoading(true);
    try {
      const res = await adminService.getDonorsList(7, search);
      setDonorsList(res.donors);
    } catch {
      toast.error("Failed to load donors");
    } finally {
      setDonorsLoading(false);
    }
  };

  const handleDonorSearch = (val: string) => {
    setDonorSearch(val);
    fetchDonors(val);
  };

  const toggleDonor = (donor: DonorListItem) => {
    setSelectedDonors((prev) => {
      const exists = prev.find((d) => d._id === donor._id);
      if (exists) return prev.filter((d) => d._id !== donor._id);
      return [...prev, donor];
    });
  };

  const removeDonor = (id: string) => {
    setSelectedDonors((prev) => prev.filter((d) => d._id !== id));
  };

  // Social links helpers
  const addSocialLink = (platform: "instagram" | "youtube" | "facebook") => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: [...prev[platform], { url: "", title: "", thumbnail: "" }],
    }));
  };

  const updateSocialLink = (platform: "instagram" | "youtube" | "facebook", index: number, field: string, value: string) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: prev[platform].map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }));
  };

  const removeSocialLink = (platform: "instagram" | "youtube" | "facebook", index: number) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: prev[platform].filter((_, i) => i !== index),
    }));
  };

  const handleAIGenerate = async () => {
    if (!form.title.trim()) { toast.error("Enter a title first"); return; }
    setGeneratingAI(true);
    try {
      const res = await adminService.generateAIVideoContent(form.title);
      setForm((f) => ({ ...f, description: res.data.description, tags: res.data.tags.join(", ") }));
      toast.success(res.cached ? "Loaded from cache" : "AI content generated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "AI generation failed");
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleUpload = async () => {
    if (!form.title || !form.donorGroupDate) { toast.error("Title and donor group date required"); return; }
    setUploading(true);
    try {
      let videoUrl = form.videoUrl;
      let thumbnailUrl = "";
      if (videoFile) {
        const uploadRes = await adminService.uploadVideoFile(videoFile);
        videoUrl = uploadRes.url;
        thumbnailUrl = uploadRes.thumbnailUrl || "";
      }
      if (!videoUrl) { toast.error("Please provide a video file or URL"); setUploading(false); return; }

      // Filter out empty social links
      const cleanSocial = {
        instagram: socialLinks.instagram.filter((l) => l.url.trim()),
        youtube: socialLinks.youtube.filter((l) => l.url.trim()),
        facebook: socialLinks.facebook.filter((l) => l.url.trim()),
      };

      await adminService.uploadVideo({
        title: form.title,
        description: form.description,
        category: form.category || undefined,
        donorGroupDate: form.donorGroupDate,
        videoUrl,
        thumbnailUrl,
        linkedDonors: selectedDonors.map((d) => d._id),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        socialLinks: cleanSocial,
      });

      toast.success("Video uploaded!");
      resetForm();
      const res = await videoService.getAllVideos(1, 50);
      setVideos(res.videos);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setShowUpload(false);
    setForm({ title: "", description: "", category: "", donorGroupDate: "", videoUrl: "", tags: "" });
    setVideoFile(null);
    setSelectedDonors([]);
    setSocialLinks(emptySocialLinks);
    setDonorSearch("");
  };

  const deleteVideo = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    try {
      await adminService.deleteVideo(id);
      setVideos((v) => v.filter((vid) => vid._id !== id));
      toast.success("Video deleted");
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Video
        </Button>
      </div>

      {/* ═══ UPLOAD FORM (full page) ═══ */}
      {showUpload && (
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Upload Impact Video</h2>
            <Button variant="ghost" size="sm" onClick={resetForm}><X className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="xl:col-span-2 space-y-4">
              <Card>
                <CardContent className="p-5 space-y-4">
                  <Input label="Title *" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />

                  <Button type="button" onClick={handleAIGenerate} disabled={generatingAI || !form.title.trim()} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {generatingAI ? "Generating..." : "Generate Description & Tags with AI"}
                  </Button>

                  {generatingAI && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparency rounded-full" />
                      <p className="text-xs text-purple-700">AI is generating content...</p>
                    </div>
                  )}

                  <Textarea label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={5} />
                  <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="tag1, tag2, tag3" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">Category</Label>
                      <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="flex h-11 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none">
                        <option value="">{categories.length === 0 ? "Loading categories..." : "Select category"}</option>
                        {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                      </select>
                      {categories.length === 0 && (
                        <button type="button" onClick={fetchCategories} className="mt-1 text-xs text-green-600 hover:underline">Retry loading categories</button>
                      )}
                    </div>
                    <Input label="Donor Group Date *" type="date" value={form.donorGroupDate} onChange={(e) => setForm((f) => ({ ...f, donorGroupDate: e.target.value }))} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 block">Video File</Label>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-green-400 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                          <Upload className="h-6 w-6 text-gray-400 mb-1" />
                          {videoFile ? (
                            <p className="text-sm text-green-600 font-medium truncate max-w-[200px] px-2">{videoFile.name}</p>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-600">Click to upload video</p>
                              <p className="text-xs text-gray-400">MP4, WebM, MOV (max 100MB)</p>
                            </>
                          )}
                        </div>
                        <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="hidden" />
                      </label>
                      {videoFile && (
                        <button type="button" onClick={() => setVideoFile(null)} className="mt-1 text-xs text-red-500 hover:underline">Remove file</button>
                      )}
                    </div>
                    <Input label="Or Video URL" placeholder="https://..." value={form.videoUrl} onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))} />
                  </div>
                </CardContent>
              </Card>

              {/* ═══ SOCIAL LINKS ═══ */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Social Media Links
                  </h3>

                  {(["instagram", "youtube", "facebook"] as const).map((platform) => {
                    const Icon = platform === "instagram" ? Instagram : platform === "youtube" ? Youtube : Facebook;
                    const color = platform === "instagram" ? "text-pink-600" : platform === "youtube" ? "text-red-600" : "text-blue-600";
                    return (
                      <div key={platform} className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`flex items-center gap-1.5 text-sm font-medium capitalize ${color}`}>
                            <Icon className="h-4 w-4" /> {platform}
                          </span>
                          <button type="button" onClick={() => addSocialLink(platform)} className="text-xs text-green-600 hover:underline flex items-center gap-1">
                            <Plus className="h-3 w-3" /> Add Link
                          </button>
                        </div>
                        {socialLinks[platform].map((link, idx) => (
                          <div key={idx} className="flex gap-2 mb-2">
                            <input value={link.url} onChange={(e) => updateSocialLink(platform, idx, "url", e.target.value)} placeholder="URL" className="flex-1 h-9 rounded-lg border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none" />
                            <input value={link.title} onChange={(e) => updateSocialLink(platform, idx, "title", e.target.value)} placeholder="Title (optional)" className="w-40 h-9 rounded-lg border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none hidden sm:block" />
                            <button type="button" onClick={() => removeSocialLink(platform, idx)} className="h-9 w-9 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        {socialLinks[platform].length === 0 && (
                          <p className="text-xs text-gray-400 ml-6">No links added</p>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Right column — Donor Selection */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" /> Select Donors
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">Last 7 days completed donations</p>

                  {/* Selected donors pills */}
                  {selectedDonors.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {selectedDonors.map((d) => (
                        <span key={d._id} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                          {d.name} - {formatCurrency(d.amount)}
                          <button type="button" onClick={() => removeDonor(d._id)} className="hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dropdown */}
                  <div ref={dropdownRef} className="relative">
                    <div
                      onClick={() => setDonorDropdownOpen(!donorDropdownOpen)}
                      className="flex items-center justify-between h-11 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm cursor-pointer hover:border-green-400 transition-colors"
                    >
                      <span className="text-gray-500">
                        {selectedDonors.length > 0 ? `${selectedDonors.length} donor(s) selected` : "Click to select donors..."}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${donorDropdownOpen ? "rotate-180" : ""}`} />
                    </div>

                    {donorDropdownOpen && (
                      <div className="absolute top-12 left-0 right-0 bg-white rounded-lg border border-gray-200 shadow-lg z-20 max-h-80 overflow-hidden">
                        {/* Search */}
                        <div className="p-2 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              value={donorSearch}
                              onChange={(e) => handleDonorSearch(e.target.value)}
                              placeholder="Search donors..."
                              className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:outline-none"
                              autoFocus
                            />
                          </div>
                        </div>

                        {/* Donor list */}
                        <div className="max-h-56 overflow-y-auto">
                          {donorsLoading ? (
                            <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
                          ) : donorsList.length === 0 ? (
                            <div className="p-4 text-center text-gray-400 text-sm">No donors found in last 7 days</div>
                          ) : (
                            donorsList.map((donor) => {
                              const isSelected = selectedDonors.some((d) => d._id === donor._id);
                              return (
                                <div
                                  key={donor._id}
                                  onClick={() => toggleDonor(donor)}
                                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                                    isSelected ? "bg-green-50" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                                    isSelected ? "bg-green-600 border-green-600" : "border-gray-300"
                                  }`}>
                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{donor.name}</p>
                                    <p className="text-xs text-gray-400 truncate">
                                      {donor.category?.name || "General"} &bull; {formatCurrency(donor.amount)}
                                    </p>
                                  </div>
                                  <span className="text-xs font-bold text-green-700 shrink-0">{formatCurrency(donor.amount)}</span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-2">{selectedDonors.length} selected &bull; Emails will be sent on upload</p>
                </CardContent>
              </Card>

              {/* Upload button */}
              <Button onClick={handleUpload} className="w-full h-12" disabled={uploading}>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload & Publish Video"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ VIDEO LIST ═══ */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="grid gap-3">
          {videos.map((v) => (
            <Card key={v._id} className="hover:border-green-200 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 relative group">
                  {v.thumbnailUrl ? (
                    <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-700 to-green-800">
                      <Video className="h-6 w-6 text-white/60" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{v.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {v.category && <Badge variant="default" className="text-[10px]">{v.category.name}</Badge>}
                    <span className="text-xs text-gray-400">Group: {v.donorGroupDate}</span>
                    <Badge variant={v.status === "published" ? "success" : "warning"} className="text-[10px]">{v.status}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {v.views}
                    </span>
                    {v.linkedDonors && v.linkedDonors.length > 0 && (
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Users className="h-3 w-3" /> {v.linkedDonors.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 shrink-0">
                  <Link href={`/admin/videos/${v._id}`}>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </Link>
                  <button onClick={() => deleteVideo(v._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
          {videos.length === 0 && <div className="text-center py-12 text-gray-400">No videos uploaded yet</div>}
        </div>
      )}
    </div>
  );
}
