"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Video, IndianRupee, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DonationHistory from "@/components/profile/DonationHistory";
import MyVideos from "@/components/profile/MyVideos";
import SectionHeading from "@/components/common/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login");
  }, [loading, isAuthenticated, router]);

  if (loading || !user) return <div className="py-20 text-center text-gray-400">Loading...</div>;

  return (
    <section className="py-12 md:py-20 bg-texture">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-dark-light border border-gray-700/50 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-gold/20">
              <AvatarFallback className="bg-gold text-white text-xl font-bold">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="mb-12">
          <SectionHeading title="My Donations" align="left" />
          <DonationHistory />
        </div>

        {/* My Videos */}
        <div>
          <SectionHeading title="My Impact Videos" subtitle="Videos linked to your donation dates" align="left" />
          <MyVideos />
        </div>
      </div>
    </section>
  );
}
