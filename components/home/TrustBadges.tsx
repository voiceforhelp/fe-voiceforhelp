"use client";

import { ShieldCheck, Video, BadgeCheck, MapPin, Users } from "lucide-react";

const badges = [
  { icon: BadgeCheck, text: "Registered NGO", sub: "Govt. of Rajasthan" },
  { icon: ShieldCheck, text: "100% Transparency", sub: "Every Rupee Tracked" },
  { icon: Video,       text: "Video Proof Daily", sub: "Impact Documented" },
  { icon: Users,       text: "1,000+ Donors",    sub: "Trusted by Many" },
  { icon: MapPin,      text: "Rajasthan, India",  sub: "Serving Across India" },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-900 py-3 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-3 sm:px-4 border-r border-white/10 last:border-r-0"
            >
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <b.icon className="h-3.5 w-3.5 text-gold" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">{b.text}</p>
                <p className="text-gray-500 text-[10px] leading-tight">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
