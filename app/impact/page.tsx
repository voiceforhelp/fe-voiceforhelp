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
      <section className="bg-texture py-16 md:py-24 border-b border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our Impact</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See the real-world change your donations create every single day
          </p>
        </div>
      </section>

      <section className="py-12 bg-texture-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatsCard icon={IndianRupee} value={500000} prefix="₹" label="Total Raised" />
            <StatsCard icon={Users} value={1000} label="People Helped" />
            <StatsCard icon={Video} value={200} label="Impact Videos" />
            <StatsCard icon={Heart} value={50} label="Active Causes" />
          </div>

          <SectionHeading title="Impact Videos" subtitle="Watch how your donations make a difference" />

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading videos...</div>
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
            <div className="text-center py-12 text-gray-500">No impact videos yet. Check back soon!</div>
          )}
        </div>
      </section>
    </>
  );
}
