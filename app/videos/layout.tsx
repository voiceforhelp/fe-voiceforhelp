import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Videos",
  description: "Watch real impact videos from Voice For Help Trust. See how your donations are used in food distribution, animal care, cow protection and community welfare — verified daily.",
  keywords: ["NGO impact videos", "donation proof videos", "Voice For Help videos", "transparent NGO India", "charity video proof"],
  alternates: { canonical: "https://www.voiceforhelp.com/videos" },
  openGraph: {
    title: "Impact Videos | Voice For Help Trust",
    description: "Watch real impact videos showing how your donations help animals, the needy, and communities across Rajasthan.",
    url: "https://www.voiceforhelp.com/videos",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Impact Videos" }],
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
