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
      {/* Page hero */}
      <section className="bg-linear-to-b from-amber-50 to-white py-14 sm:py-20 md:py-28 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Proof of Impact
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Impact Videos
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Watch how your donations create real change, updated daily
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl bg-white animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-t-xl" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <>
              <SectionHeading
                title="All Impact Videos"
                subtitle={`${videos.length} video${videos.length !== 1 ? "s" : ""} showing your donations at work`}
              />
              <VideoGrid videos={videos} />
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-10 sm:h-11 px-4 sm:px-5 text-sm"
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm text-gray-500 whitespace-nowrap">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-10 sm:h-11 px-4 sm:px-5 text-sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <Video className="h-12 w-12 sm:h-16 sm:w-16 text-gray-700 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-500 mb-2">No Videos Yet</h3>
              <p className="text-sm sm:text-base text-gray-500">Impact videos are uploaded daily. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
