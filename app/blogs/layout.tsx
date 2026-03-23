import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read stories of impact, hope and compassion from Voice For Help Trust. Learn how your donations create real change in people's lives across India.",
  keywords: ["Voice For Help blog", "NGO blog India", "charity stories", "donation impact stories", "animal welfare blog", "cow protection stories", "food distribution blog"],
  alternates: { canonical: "https://www.voiceforhelp.com/blogs" },
  openGraph: {
    title: "Blog | Voice For Help Trust",
    description: "Stories of impact, hope and compassion — see how donations change lives every day.",
    url: "https://www.voiceforhelp.com/blogs",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Blog" }],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
