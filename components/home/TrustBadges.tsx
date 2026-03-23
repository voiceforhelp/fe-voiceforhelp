"use client";

import { ShieldCheck, Video, BadgeCheck, MapPin, Users } from "lucide-react";

const badges = [
  { icon: BadgeCheck, text: "Registered NGO", sub: "Govt. of Rajasthan" },
  { icon: ShieldCheck, text: "100% Transparency", sub: "Every Rupee Tracked" },
  { icon: Video,       text: "Video Proof Daily", sub: "Impact Documented" },
  { icon: Users,       text: "1,000+ Donors",    sub: "Trusted by Many" },
  { icon: MapPin,      text: "Rajasthan, India",  sub: "Serving Across India" },
];

const scrollBadges = [...badges, ...badges, ...badges];

export default function TrustBadges() {
  return (
    <section className="bg-gray-900 py-3 overflow-hidden">
      {/* Desktop — static, centered */}
      <div className="hidden lg:flex items-center justify-between gap-4 container mx-auto px-6">
        {badges.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 shrink-0 px-4 border-r border-white/10 last:border-r-0"
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

      {/* Mobile/Tablet — auto scroll */}
      <div className="lg:hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center animate-trust-scroll">
          {scrollBadges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-4 border-r border-white/10"
            >
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <b.icon className="h-3.5 w-3.5 text-gold" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-tight whitespace-nowrap">{b.text}</p>
                <p className="text-gray-500 text-[10px] leading-tight whitespace-nowrap">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes trust-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-trust-scroll {
          animation: trust-scroll 18s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
