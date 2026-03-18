"use client";

import { useEffect, useState } from "react";
import { Upload, Video, Trash2, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { adminService } from "@/services/adminService";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import type { VideoImpact, Category } from "@/types";
import toast from "react-hot-toast";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", donorGroupDate: "", videoUrl: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    videoService.getAllVideos(1, 50).then((res) => setVideos(res.videos)).catch(() => {}).finally(() => setLoading(false));
    adminService.getAllCategories().then((res) => setCategories(res.categories)).catch(() => {});
  }, []);

  const handleUpload = async () => {
    if (!form.title || !form.donorGroupDate) { toast.error("Title and donor group date required"); return; }
    setUploading(true);
    try {
      let videoUrl = form.videoUrl;
      if (videoFile) {
        const uploadRes = await adminService.uploadVideoFile(videoFile);
        videoUrl = uploadRes.url;
      }
      if (!videoUrl) { toast.error("Please provide a video file or URL"); setUploading(false); return; }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("donorGroupDate", form.donorGroupDate);
      formData.append("videoUrl", videoUrl);

      await adminService.uploadVideo(formData);
      toast.success("Video uploaded!");
      setShowUpload(false);
      setForm({ title: "", description: "", category: "", donorGroupDate: "", videoUrl: "" });
      setVideoFile(null);
      const res = await videoService.getAllVideos(1, 50);
      setVideos(res.videos);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
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
        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogTrigger asChild>
            <Button><Upload className="mr-2 h-4 w-4" /> Upload Video</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Upload Impact Video</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Input label="Title *" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
              <Textarea label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              <div>
                <Label className="mb-1.5 block">Category</Label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="flex h-11 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20">
                  <option value="">Select category</option>
                  {categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
                </select>
              </div>
              <Input label="Donor Group Date *" type="date" value={form.donorGroupDate} onChange={(e) => setForm((f) => ({ ...f, donorGroupDate: e.target.value }))} />
              <div>
                <Label className="mb-1.5 block">Video File</Label>
                <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="text-sm" />
              </div>
              <Input label="Or Video URL" placeholder="https://..." value={form.videoUrl} onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))} />
              <Button onClick={handleUpload} className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {videos.map((v) => (
            <Card key={v._id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center flex-shrink-0">
                  <Video className="h-6 w-6 text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{v.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {v.category && <Badge variant="default" className="text-[10px]">{v.category.name}</Badge>}
                    <span className="text-xs text-gray-400">Group: {v.donorGroupDate}</span>
                    <Badge variant={v.status === "published" ? "success" : "warning"} className="text-[10px]">{v.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => deleteVideo(v._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
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
