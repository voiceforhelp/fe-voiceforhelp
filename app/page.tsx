"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import ServicesStrip from "@/components/home/ServicesStrip";
import MissionSection from "@/components/home/MissionSection";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactCounter from "@/components/home/ImpactCounter";
import DonationSection from "@/components/home/DonationSection";
import LatestVideos from "@/components/home/LatestVideos";
import Testimonials from "@/components/home/Testimonials";
import DonationImpactFlow from "@/components/home/DonationImpactFlow";
import RecentDonors from "@/components/home/RecentDonors";
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
      <TrustBadges />
      <ServicesStrip />
      <MissionSection />
      <HowItWorks />
      <ImpactCounter />
      <DonationSection />
      <LatestVideos videos={videos} />
      <Testimonials />
      <DonationImpactFlow />
      <RecentDonors donors={donors} />
      <DonationCategories />
      <TopCauses categories={categories} />
      <JoinUsSection />
      <CTABanner />
    </>
  );
}
