"use client";

import { usePathname } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (pathname.startsWith("/admin")) return null;

  // Hide footer on mobile video detail pages (reels experience)
  const isVideoDetail = /^\/videos\/[a-f0-9]{24}$/.test(pathname);
  if (isVideoDetail && isMobile) return null;

  return <Footer />;
}
