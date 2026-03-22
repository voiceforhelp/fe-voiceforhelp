"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search, Plus, Edit, Trash2, Eye, Sparkles, Save, Send, RefreshCw, ArrowLeft, X,
  Youtube, Instagram, Facebook, Copy, Check, ImagePlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import RichTextEditor from "@/components/blog/RichTextEditor";
import { formatDate } from "@/lib/utils";
import type { Blog, AIGeneratedContent } from "@/types";
import toast from "react-hot-toast";

type ViewMode = "list" | "editor";

export default function AdminBlogsPage() {
  // List state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Editor state
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [socialContent, setSocialContent] = useState<AIGeneratedContent | null>(null);

  // AI state
  const [generating, setGenerating] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  // Active social tab
  const [socialTab, setSocialTab] = useState<"youtube" | "instagram" | "facebook">("youtube");

  // ────────────── FETCH BLOGS ──────────────
  const fetchBlogs = useCallback(() => {
    setLoading(true);
    adminService
      .getAdminBlogs(page, search, filterStatus)
      .then((res) => {
        setBlogs(res.blogs);
        setTotalPages(res.pages);
        setTotal(res.total);
      })
      .catch(() => toast.error("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, [page, search, filterStatus]);

  useEffect(() => {
    if (viewMode === "list") fetchBlogs();
  }, [fetchBlogs, viewMode]);

  // ────────────── SEARCH ──────────────
  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  // ────────────── EDITOR HELPERS ──────────────
  const resetEditor = () => {
    setEditingBlog(null);
    setTitle("");
    setContent("");
    setShortDescription("");
    setImage("");
    setImageFile(null);
    setImagePreview("");
    setSocialContent(null);
  };

  const openCreate = () => {
    resetEditor();
    setViewMode("editor");
  };

  const openEdit = async (blog: Blog) => {
    try {
      const res = await adminService.getAdminBlogById(blog._id);
      const b = res.blog;
      setEditingBlog(b);
      setTitle(b.title);
      setContent(b.content);
      setShortDescription(b.shortDescription);
      setImage(b.image);
      setImagePreview(b.image);
      if (b.socialContent) {
        setSocialContent({
          blogContent: b.content,
          shortDescription: b.shortDescription,
          youtube: b.socialContent.youtube || { title: "", description: "", tags: [] },
          instagram: b.socialContent.instagram || { caption: "", hashtags: [] },
          facebook: b.socialContent.facebook || "",
        });
      }
      setViewMode("editor");
    } catch {
      toast.error("Failed to load blog");
    }
  };

  const goBackToList = () => {
    setViewMode("list");
    resetEditor();
  };

  // ────────────── AI GENERATION ──────────────
  const handleGenerate = async () => {
    if (!title.trim()) {
      toast.error("Enter a title first");
      return;
    }
    setGenerating(true);
    try {
      const res = await adminService.generateAIContent(title);
      const data = res.data;
      setContent(data.blogContent);
      setShortDescription(data.shortDescription);
      setSocialContent(data);
      if (res.cached) {
        toast.success("Content loaded from cache");
      } else {
        toast.success("AI content generated!");
      }
    } catch (err: any) {
      if (err.response?.status === 429) {
        toast.error("Rate limit reached. Wait a moment and try again.");
      } else {
        toast.error(err.response?.data?.message || "AI generation failed");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!title.trim()) return;
    setRegenerating(true);
    try {
      const res = await adminService.regenerateAIContent(title);
      const data = res.data;
      setContent(data.blogContent);
      setShortDescription(data.shortDescription);
      setSocialContent(data);
      toast.success("Content regenerated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Regeneration failed");
    } finally {
      setRegenerating(false);
    }
  };

  // ────────────── IMAGE UPLOAD ──────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string> => {
    if (imageFile) {
      setUploadingImage(true);
      try {
        const res = await adminService.uploadImage(imageFile);
        setImage(res.url);
        setImageFile(null);
        return res.url;
      } finally {
        setUploadingImage(false);
      }
    }
    return image;
  };

  // ────────────── SAVE/PUBLISH ──────────────
  const handleSave = async (status: "draft" | "published") => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const imageUrl = await uploadImage();

      const blogData: Record<string, unknown> = {
        title,
        content,
        shortDescription,
        image: imageUrl,
        status,
        socialContent: socialContent
          ? {
              youtube: socialContent.youtube,
              instagram: socialContent.instagram,
              facebook: socialContent.facebook,
            }
          : undefined,
      };

      if (editingBlog) {
        await adminService.updateBlog(editingBlog._id, blogData as Partial<Blog>);
        toast.success(status === "published" ? "Blog published!" : "Draft saved!");
      } else {
        await adminService.createBlog(blogData as Partial<Blog>);
        toast.success(status === "published" ? "Blog published!" : "Draft saved!");
      }

      goBackToList();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ────────────── DELETE ──────────────
  const handleDelete = async (blog: Blog) => {
    if (!confirm(`Delete "${blog.title}"?`)) return;
    try {
      await adminService.deleteBlog(blog._id);
      toast.success("Blog deleted");
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ────────────── COPY TO CLIPBOARD ──────────────
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied!");
    setTimeout(() => setCopiedField(""), 2000);
  };

  // ════════════════════════════════════════════════════
  // RENDER: LIST VIEW
  // ════════════════════════════════════════════════════
  if (viewMode === "list") {
    return (
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-sm text-gray-500 mt-1">{total} total blogs</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Blog
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2 flex-1">
            <Input
              placeholder="Search blogs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="max-w-xs"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            className="h-11 rounded-lg border border-gray-300 px-3 text-sm focus:border-green-500 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Blogs Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-600">Blog</th>
                    <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">Author</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-600 hidden lg:table-cell">Views</th>
                    <th className="text-left p-4 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">No blogs found</td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {blog.image ? (
                              <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                <ImagePlus className="h-5 w-5 text-green-300" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate max-w-xs">{blog.title}</p>
                              <p className="text-xs text-gray-400 truncate max-w-xs">{blog.shortDescription || "No description"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-500 hidden md:table-cell">{blog.author?.name || "-"}</td>
                        <td className="p-4">
                          <Badge variant={blog.status === "published" ? "success" : "warning"}>{blog.status}</Badge>
                        </td>
                        <td className="p-4 text-gray-500 hidden lg:table-cell">{blog.views}</td>
                        <td className="p-4 text-gray-500 hidden lg:table-cell">{formatDate(blog.createdAt)}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <button onClick={() => openEdit(blog)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(blog)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ════════════════════════════════════════════════════
  // RENDER: EDITOR VIEW
  // ════════════════════════════════════════════════════
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={goBackToList} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{editingBlog ? "Edit Blog" : "Create New Blog"}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
            <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave("published")} disabled={saving}>
            <Send className="mr-2 h-4 w-4" /> {saving ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Main Editor */}
        <div className="xl:col-span-2 space-y-6">
          {/* Title + AI Generate */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Input label="Blog Title *" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter your blog title..." className="text-lg" />

              <div className="flex gap-2">
                <Button onClick={handleGenerate} disabled={generating || !title.trim()} className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="mr-2 h-4 w-4" />
                  {generating ? "Generating..." : "Generate with AI"}
                </Button>
                {(content || socialContent) && (
                  <Button variant="outline" onClick={handleRegenerate} disabled={regenerating || !title.trim()}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
                    {regenerating ? "Regenerating..." : "Regenerate"}
                  </Button>
                )}
              </div>

              {generating && (
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparency rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-purple-800">AI is generating content...</p>
                    <p className="text-xs text-purple-600">This may take 10-15 seconds</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardContent className="p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="flex items-start gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-32 h-20 object-cover rounded-lg" />
                    <button
                      onClick={() => {
                        setImage("");
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <ImagePlus className="h-6 w-6 text-gray-300" />
                  </div>
                )}
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="text-sm" />
                  <p className="text-xs text-gray-400 mt-1">Recommended: 1200x630px, JPG or PNG</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Content Editor */}
          <Card>
            <CardContent className="p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
              <RichTextEditor value={content} onChange={setContent} placeholder="Write your blog content or generate with AI..." />
            </CardContent>
          </Card>

          {/* Short Description */}
          <Card>
            <CardContent className="p-5">
              <Textarea
                label="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief description for blog listing..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Social Content */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600" /> AI Social Content
              </h3>

              {!socialContent ? (
                <div className="text-center py-8 text-gray-400">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Generate AI content to see social media posts</p>
                </div>
              ) : (
                <>
                  {/* Social Tabs */}
                  <div className="flex border-b border-gray-200 mb-4">
                    {([
                      { key: "youtube", icon: Youtube, label: "YouTube", color: "text-red-600" },
                      { key: "instagram", icon: Instagram, label: "Instagram", color: "text-pink-600" },
                      { key: "facebook", icon: Facebook, label: "Facebook", color: "text-blue-600" },
                    ] as const).map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setSocialTab(tab.key)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                          socialTab === tab.key ? `${tab.color} border-current` : "text-gray-400 border-transparency hover:text-gray-600"
                        }`}
                      >
                        <tab.icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* YouTube Tab */}
                  {socialTab === "youtube" && socialContent.youtube && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-600">Title</label>
                          <button onClick={() => copyToClipboard(socialContent.youtube.title, "yt-title")} className="text-gray-400 hover:text-gray-600">
                            {copiedField === "yt-title" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <input
                          value={socialContent.youtube.title}
                          onChange={(e) =>
                            setSocialContent((prev) => prev ? { ...prev, youtube: { ...prev.youtube, title: e.target.value } } : null)
                          }
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-600">Description</label>
                          <button onClick={() => copyToClipboard(socialContent.youtube.description, "yt-desc")} className="text-gray-400 hover:text-gray-600">
                            {copiedField === "yt-desc" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <textarea
                          value={socialContent.youtube.description}
                          onChange={(e) =>
                            setSocialContent((prev) => prev ? { ...prev, youtube: { ...prev.youtube, description: e.target.value } } : null)
                          }
                          rows={5}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-600">Tags</label>
                          <button
                            onClick={() => copyToClipboard(socialContent.youtube.tags.join(", "), "yt-tags")}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {copiedField === "yt-tags" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <input
                          value={socialContent.youtube.tags.join(", ")}
                          onChange={(e) =>
                            setSocialContent((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    youtube: {
                                      ...prev.youtube,
                                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                                    },
                                  }
                                : null
                            )
                          }
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                          placeholder="Comma separated tags"
                        />
                      </div>
                    </div>
                  )}

                  {/* Instagram Tab */}
                  {socialTab === "instagram" && socialContent.instagram && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-600">Caption</label>
                          <button onClick={() => copyToClipboard(socialContent.instagram.caption, "ig-cap")} className="text-gray-400 hover:text-gray-600">
                            {copiedField === "ig-cap" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <textarea
                          value={socialContent.instagram.caption}
                          onChange={(e) =>
                            setSocialContent((prev) => prev ? { ...prev, instagram: { ...prev.instagram, caption: e.target.value } } : null)
                          }
                          rows={6}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-gray-600">Hashtags</label>
                          <button
                            onClick={() => copyToClipboard(socialContent.instagram.hashtags.join(" "), "ig-hash")}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {copiedField === "ig-hash" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <textarea
                          value={socialContent.instagram.hashtags.join(" ")}
                          onChange={(e) =>
                            setSocialContent((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    instagram: {
                                      ...prev.instagram,
                                      hashtags: e.target.value.split(/\s+/).filter(Boolean),
                                    },
                                  }
                                : null
                            )
                          }
                          rows={3}
                          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none resize-none"
                          placeholder="#hashtag1 #hashtag2"
                        />
                      </div>
                    </div>
                  )}

                  {/* Facebook Tab */}
                  {socialTab === "facebook" && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-gray-600">Post</label>
                        <button onClick={() => copyToClipboard(socialContent.facebook, "fb-post")} className="text-gray-400 hover:text-gray-600">
                          {copiedField === "fb-post" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <textarea
                        value={socialContent.facebook}
                        onChange={(e) => setSocialContent((prev) => (prev ? { ...prev, facebook: e.target.value } : null))}
                        rows={8}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none resize-none"
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving} className="w-full justify-start">
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <Button onClick={() => handleSave("published")} disabled={saving} className="w-full justify-start">
                <Send className="mr-2 h-4 w-4" /> Publish Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
