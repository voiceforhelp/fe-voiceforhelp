import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the real impact of Voice For Help Trust — lives changed, animals saved, meals served. Transparency impact data with video-verified proof from Jaipur , Rajasthan, India.",
  keywords: ["NGO impact India", "Voice For Help impact", "charity impact Rajasthan", "donation impact proof", "transparency NGO India"],
  alternates: { canonical: `${BASE_URL}/impact` },
  openGraph: {
    title: "Our Impact | Voice For Help Trust",
    description: "See the real measurable impact of your donations — lives changed, animals saved, meals served across Rajasthan.",
    url: `${BASE_URL}/impact`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Impact" }],
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Our Impact", item: `${BASE_URL}/impact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
