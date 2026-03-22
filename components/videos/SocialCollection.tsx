"use client";

import { useRef, useEffect } from "react";
import { Instagram, Youtube, Facebook, ExternalLink } from "lucide-react";
import type { SocialLink } from "@/types";

interface SocialCollectionProps {
  socialLinks: {
    instagram?: SocialLink[];
    youtube?: SocialLink[];
    facebook?: SocialLink[];
  };
}

interface SocialSectionProps {
  platform: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  links: SocialLink[];
}

function SocialSection({ platform, icon: Icon, color, bgColor, borderColor, links }: SocialSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || links.length <= 3) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth - el.clientWidth) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => { animationId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [links]);

  if (!links || links.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2 ${color}`}>
        <Icon className="h-4 w-4" />
        {platform} Collection
      </h3>

      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{ scrollBehavior: "auto" }}>
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-shrink-0 w-52 rounded-xl border ${borderColor} ${bgColor} p-4 hover:scale-[1.02] transition-transform group`}
          >
            {link.thumbnail ? (
              <img
                src={link.thumbnail}
                alt={link.title || platform}
                className="w-full h-28 object-cover rounded-lg mb-3"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-28 rounded-lg mb-3 flex items-center justify-center ${bgColor}`}>
                <Icon className={`h-10 w-10 ${color} opacity-40`} />
              </div>
            )}
            <p className="text-sm font-medium text-white truncate">
              {link.title || `${platform} Post`}
            </p>
            <span className={`text-xs ${color} flex items-center gap-1 mt-1 group-hover:underline`}>
              Open <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SocialCollection({ socialLinks }: SocialCollectionProps) {
  const hasAny =
    (socialLinks.instagram && socialLinks.instagram.length > 0) ||
    (socialLinks.youtube && socialLinks.youtube.length > 0) ||
    (socialLinks.facebook && socialLinks.facebook.length > 0);

  if (!hasAny) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-white mb-5">Watch On Social Media</h2>

      <SocialSection
        platform="YouTube"
        icon={Youtube}
        color="text-red-500"
        bgColor="bg-red-950/30"
        borderColor="border-red-900/40"
        links={socialLinks.youtube || []}
      />

      <SocialSection
        platform="Instagram"
        icon={Instagram}
        color="text-pink-500"
        bgColor="bg-pink-950/30"
        borderColor="border-pink-900/40"
        links={socialLinks.instagram || []}
      />

      <SocialSection
        platform="Facebook"
        icon={Facebook}
        color="text-blue-500"
        bgColor="bg-blue-950/30"
        borderColor="border-blue-900/40"
        links={socialLinks.facebook || []}
      />
    </div>
  );
}
