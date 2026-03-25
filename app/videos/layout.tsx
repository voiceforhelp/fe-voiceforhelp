import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Impact Videos",
  description: "Watch real impact videos from Voice For Help Trust. See how your donations are used in food distribution, animal care, cow protection and community welfare — verified daily.",
  keywords: ["NGO impact videos", "donation proof videos", "Voice For Help videos", "transparency NGO India", "charity video proof"],
  alternates: { canonical: `${BASE_URL}/videos` },
  openGraph: {
    title: "Impact Videos | Voice For Help Trust",
    description: "Watch real impact videos showing how your donations help animals, the needy and communities across Rajasthan.",
    url: `${BASE_URL}/videos`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Impact Videos" }],
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Impact Videos", item: `${BASE_URL}/videos` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
