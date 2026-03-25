import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Quick Donate",
  description: "Make a quick donation to Voice For Help Trust in seconds. Support cow feeding, animal welfare, food distribution and more with instant UPI payment.",
  keywords: ["quick donate India", "fast donation NGO", "UPI donation", "instant charity", "donate online India", "cow feeding donation"],
  alternates: { canonical: `${BASE_URL}/fast-donate` },
  openGraph: {
    title: "Quick Donate | Voice For Help Trust",
    description: "Donate in seconds — support cow feeding, animal welfare and food distribution with instant UPI.",
    url: `${BASE_URL}/fast-donate`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Quick Donate - Voice For Help Trust" }],
  },
};

export default function FastDonateLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Quick Donate", item: `${BASE_URL}/fast-donate` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
