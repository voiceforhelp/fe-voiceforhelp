"use client";

import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import VideoGrid from "@/components/videos/VideoGrid";
import { videoService } from "@/services/videoService";
import { Button } from "@/components/ui/button";
import type { VideoImpact } from "@/types";

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    videoService.getVideos(page, 16).then((res) => {
      setVideos(res.videos);
      setTotalPages(res.pages);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <section className="bg-texture py-16 md:py-20 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Impact Videos</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Watch how your donations create real change, updated daily</p>
        </div>
      </section>

      <section className="py-12 bg-texture-light">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading videos...</div>
          ) : videos.length > 0 ? (
            <>
              <VideoGrid videos={videos} />
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
                  <span className="flex items-center px-4 text-sm text-gray-500">Page {page} of {totalPages}</span>
                  <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Videos Yet</h3>
              <p className="text-gray-500">Impact videos are uploaded daily. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
