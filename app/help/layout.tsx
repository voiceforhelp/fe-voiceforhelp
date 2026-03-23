import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How You Can Help",
  description: "Discover ways to contribute to Voice For Help Trust — donate, volunteer, share or fundraise. Every small action creates a big impact for those in need.",
  keywords: ["help NGO India", "volunteer India", "donate for cause", "how to help poor", "charity India", "cow feeding donation", "animal welfare help"],
  alternates: { canonical: "https://www.voiceforhelp.com/help" },
  openGraph: {
    title: "How You Can Help | Voice For Help Trust",
    description: "Discover ways to contribute — donate, volunteer, share or fundraise. Every action counts.",
    url: "https://www.voiceforhelp.com/help",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Help Voice For Help Trust" }],
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
