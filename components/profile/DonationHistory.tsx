"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { donationService } from "@/services/donationService";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Donation } from "@/types";

export default function DonationHistory() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donationService.getMyDonations()
      .then((res) => setDonations(res.donations))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>;
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No donations yet. Make your first donation today!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {donations.map((d) => (
        <div key={d._id} className="flex items-center justify-between p-4 bg-dark-light rounded-xl border border-gray-700/50 hover:border-gold/30 transition-all">
          <div>
            <p className="font-semibold text-white">{formatCurrency(d.amount)}</p>
            <p className="text-xs text-gray-500">{d.category?.name || "General"} &middot; {formatDate(d.donationDate)}</p>
          </div>
          <Badge
            variant={d.paymentStatus === "completed" ? "success" : d.paymentStatus === "pending" ? "warning" : "danger"}
          >
            {d.paymentStatus}
          </Badge>
        </div>
      ))}
    </div>
  );
}
