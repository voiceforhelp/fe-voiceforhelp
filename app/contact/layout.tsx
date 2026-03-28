import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Voice For Help Trust. Contact us for donation queries, volunteering or partnership. We're based in Jaipur , Rajasthan, India.",
  keywords: ["contact Voice For Help Trust", "NGO contact India", "volunteer Rajasthan", "charity contact"],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact Us | Voice For Help Trust",
    description: "Get in touch with Voice For Help Trust for donations, volunteering or partnerships.",
    url: `${BASE_URL}/contact`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Contact Voice For Help Trust" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: `${BASE_URL}/contact` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
