import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the real impact of Voice For Help Trust — lives changed, animals saved, meals served. Transparent impact data with video-verified proof from Rajasthan, India.",
  keywords: ["NGO impact India", "Voice For Help impact", "charity impact Rajasthan", "donation impact proof", "transparent NGO India"],
  alternates: { canonical: "https://www.voiceforhelp.com/impact" },
  openGraph: {
    title: "Our Impact | Voice For Help Trust",
    description: "See the real measurable impact of your donations — lives changed, animals saved, meals served across Rajasthan.",
    url: "https://www.voiceforhelp.com/impact",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Impact" }],
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
