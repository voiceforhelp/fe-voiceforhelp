import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate Now",
  description: "Donate to Voice For Help Trust and make a real difference. Every rupee is verified through daily video proof. Support food distribution, animal care, cow protection & more.",
  keywords: ["donate NGO India", "donate online India", "charity donation Rajasthan", "cow protection donation", "food donation India", "transparent donation"],
  alternates: { canonical: "https://www.voiceforhelp.com/donate" },
  openGraph: {
    title: "Donate Now | Voice For Help Trust",
    description: "Every rupee you donate is documented through daily video proof. Make a transparent donation today.",
    url: "https://www.voiceforhelp.com/donate",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Donate to Voice For Help Trust" }],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
