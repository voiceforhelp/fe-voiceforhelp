"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import MissionSection from "@/components/home/MissionSection";
import DonationSection from "@/components/home/DonationSection";
import RecentDonors from "@/components/home/RecentDonors";
import DonationImpactFlow from "@/components/home/DonationImpactFlow";
import LatestVideos from "@/components/home/LatestVideos";
import DonationCategories from "@/components/home/DonationCategories";
import TopCauses from "@/components/home/TopCauses";
import JoinUsSection from "@/components/home/JoinUsSection";
import CTABanner from "@/components/home/CTABanner";
import { donationService } from "@/services/donationService";
import { videoService } from "@/services/videoService";
import { categoryService } from "@/services/categoryService";
import type { Donation, VideoImpact, Category } from "@/types";

export default function HomePage() {
  const [donors, setDonors] = useState<Donation[]>([]);
  const [videos, setVideos] = useState<VideoImpact[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    donationService.getRecentDonors().then((res) => setDonors(res.donors)).catch(() => {});
    videoService.getVideos().then((res) => setVideos(res.videos)).catch(() => {});
    categoryService.getCategories().then((res) => setCategories(res.categories)).catch(() => {});
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesStrip />
      <MissionSection />
      <DonationSection />
      <LatestVideos videos={videos} />
      <JoinUsSection />
      <DonationImpactFlow />
      <RecentDonors donors={donors} />
      <DonationCategories />
      <TopCauses categories={categories} />
      <CTABanner />
    </>
  );
}
