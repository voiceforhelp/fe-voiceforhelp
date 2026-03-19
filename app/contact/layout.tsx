import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Voice For Help Trust. Contact us for donation queries, volunteering, or partnership. We're based in Rajasthan, India.",
  keywords: ["contact Voice For Help Trust", "NGO contact India", "volunteer Rajasthan", "charity contact"],
  alternates: { canonical: "https://www.voiceforhelp.com/contact" },
  openGraph: {
    title: "Contact Us | Voice For Help Trust",
    description: "Get in touch with Voice For Help Trust for donations, volunteering, or partnerships.",
    url: "https://www.voiceforhelp.com/contact",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Contact Voice For Help Trust" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
