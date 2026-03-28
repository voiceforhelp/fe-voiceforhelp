import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Donate Now",
  description: "Donate to Voice For Help Trust and make a real difference. Every rupee is verified through daily video proof. Support food distribution, animal care, cow protection & more.",
  keywords: ["donate NGO India", "donate online India", "charity donation Rajasthan", "cow protection donation", "food donation India", "transparency donation"],
  alternates: { canonical: `${BASE_URL}/donate` },
  openGraph: {
    title: "Donate Now | Voice For Help Trust",
    description: "Every rupee you donate is documented through daily video proof. Make a transparency donation today.",
    url: `${BASE_URL}/donate`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Donate to Voice For Help Trust" }],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  const donateJsonLd = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Donate to Voice For Help Trust",
    description: "Support food distribution, animal welfare, cow protection and community welfare in Jaipur , Rajasthan, India. 100% video-verified transparency.",
    recipient: {
      "@type": "NGO",
      "@id": `${BASE_URL}/#organization`,
      name: "Voice For Help Trust",
      url: BASE_URL,
    },
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/donate`,
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Donate", item: `${BASE_URL}/donate` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donateJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
