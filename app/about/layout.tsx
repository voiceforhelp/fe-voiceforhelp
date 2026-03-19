import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Voice For Help Trust — a registered NGO from Rajasthan dedicated to animal welfare, cow protection, food distribution, and helping the needy with 100% transparency.",
  keywords: ["about Voice For Help Trust", "NGO Rajasthan", "registered NGO India", "transparent charity", "animal welfare NGO"],
  alternates: { canonical: "https://www.voiceforhelp.com/about" },
  openGraph: {
    title: "About Us | Voice For Help Trust",
    description: "Learn about Voice For Help Trust — a registered NGO from Rajasthan dedicated to animal welfare, cow protection, food distribution, and helping the needy.",
    url: "https://www.voiceforhelp.com/about",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "About Voice For Help Trust" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
