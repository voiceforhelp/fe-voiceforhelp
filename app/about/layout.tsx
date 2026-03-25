import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Voice For Help Trust — a registered NGO from Rajasthan dedicated to animal welfare, cow protection, food distribution and helping the needy with 100% transparency.",
  keywords: ["about Voice For Help Trust", "NGO Rajasthan", "registered NGO India", "transparency charity", "animal welfare NGO"],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Us | Voice For Help Trust",
    description: "Learn about Voice For Help Trust — a registered NGO from Rajasthan dedicated to animal welfare, cow protection, food distribution and helping the needy.",
    url: `${BASE_URL}/about`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "About Voice For Help Trust" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${BASE_URL}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
