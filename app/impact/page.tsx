"use client";

import { useEffect, useState } from "react";
import { Heart, Users, Video, IndianRupee } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import StatsCard from "@/components/common/StatsCard";
import VideoGrid from "@/components/videos/VideoGrid";
import { videoService } from "@/services/videoService";
import { Button } from "@/components/ui/button";
import type { VideoImpact } from "@/types";

export default function ImpactPage() {
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    videoService.getAllVideos(page, 12).then((res) => {
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
            Real Results
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Our Impact
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            See the real-world change your donations create every single day
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14 max-w-4xl mx-auto">
            <StatsCard icon={IndianRupee} value={500000} prefix="₹" label="Total Raised" />
            <StatsCard icon={Users} value={1000} label="People Helped" />
            <StatsCard icon={Video} value={200} label="Impact Videos" />
            <StatsCard icon={Heart} value={50} label="Active Causes" />
          </div>

          <SectionHeading
            title="Impact Videos"
            subtitle="Watch how your donations make a difference"
          />

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
              <Video className="h-12 w-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-base">No impact videos yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
