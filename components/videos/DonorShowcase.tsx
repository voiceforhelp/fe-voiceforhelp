"use client";

import { Heart, IndianRupee } from "lucide-react";
import type { LinkedDonor } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DonorShowcaseProps {
  donors: LinkedDonor[];
}

export default function DonorShowcase({ donors }: DonorShowcaseProps) {
  if (!donors || donors.length === 0) return null;

  // Filter out anonymous donors
  const visibleDonors = donors.filter((d) => !d.isAnonymous);
  if (visibleDonors.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-400" />
        Donors Who Made This Possible
      </h2>
      <p className="text-sm text-gray-400 mb-5">These generous hearts funded this impact</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {visibleDonors.map((donor) => (
          <div
            key={donor._id}
            className="bg-dark-light rounded-xl p-4 border border-gray-700/50 text-center hover:border-gold/30 transition-colors"
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-white">
                {donor.name?.[0]?.toUpperCase() || "D"}
              </span>
            </div>

            {/* Name */}
            <p className="font-semibold text-white text-sm truncate">{donor.name}</p>

            {/* Category */}
            <p className="text-xs text-gold mt-1 truncate">
              {donor.category?.name || "General Donation"}
            </p>

            {/* Amount */}
            <div className="mt-2 inline-flex items-center gap-1 bg-green-900/40 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
              <IndianRupee className="h-3 w-3" />
              {donor.amount.toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
