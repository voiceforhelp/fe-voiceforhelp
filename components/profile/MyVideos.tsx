"use client";

import { useEffect, useState } from "react";
import { Play, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ShareButtons from "@/components/common/ShareButtons";
import VideoPlayerModal from "@/components/videos/VideoPlayerModal";
import { videoService } from "@/services/videoService";
import { formatDate } from "@/lib/utils";
import type { VideoImpact } from "@/types";

export default function MyVideos() {
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<VideoImpact | null>(null);

  useEffect(() => {
    videoService.getMyVideos()
      .then((res) => setVideos(res.videos))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="grid grid-cols-2 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-video rounded-xl" />)}</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No impact videos linked to your donations yet. Videos are uploaded the next day after your donation.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((v) => (
          <div key={v._id} className="bg-[#2a2a2a] rounded-xl border border-gray-700/50 overflow-hidden group cursor-pointer hover:border-[#d4a843]/30 transition-all" onClick={() => setSelected(v)}>
            <div className="relative aspect-video bg-[#1a1a1a] flex items-center justify-center">
              {v.thumbnailUrl ? (
                <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
              ) : (
                <Play className="h-10 w-10 text-white/40" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <Play className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                {v.category && <Badge variant="default" className="text-[10px]">{v.category.name}</Badge>}
                <span className="text-[10px] text-gray-500 flex items-center"><Calendar className="h-3 w-3 mr-0.5" />{formatDate(v.createdAt)}</span>
              </div>
              <p className="text-sm font-semibold text-white line-clamp-1">{v.title}</p>
              <div className="mt-2">
                <ShareButtons url={`/videos/${v._id}`} title={v.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selected && <VideoPlayerModal video={selected} open={!!selected} onClose={() => setSelected(null)} />}
    </>
  );
}
