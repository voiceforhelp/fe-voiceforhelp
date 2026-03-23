import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Donate",
  description: "Make a quick donation to Voice For Help Trust in seconds. Support cow feeding, animal welfare, food distribution and more with instant UPI payment.",
  keywords: ["quick donate India", "fast donation NGO", "UPI donation", "instant charity", "donate online India", "cow feeding donation"],
  alternates: { canonical: "https://www.voiceforhelp.com/fast-donate" },
  openGraph: {
    title: "Quick Donate | Voice For Help Trust",
    description: "Donate in seconds — support cow feeding, animal welfare and food distribution with instant UPI.",
    url: "https://www.voiceforhelp.com/fast-donate",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Quick Donate - Voice For Help Trust" }],
  },
};

export default function FastDonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
