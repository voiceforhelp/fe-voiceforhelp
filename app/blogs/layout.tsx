import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read stories of impact, hope and compassion from Voice For Help Trust. Learn how your donations create real change in people's lives across India.",
  keywords: ["Voice For Help blog", "NGO blog India", "charity stories", "donation impact stories", "animal welfare blog", "cow protection stories", "food distribution blog"],
  alternates: { canonical: `${BASE_URL}/blogs` },
  openGraph: {
    title: "Blog | Voice For Help Trust",
    description: "Stories of impact, hope and compassion — see how donations change lives every day.",
    url: `${BASE_URL}/blogs`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Voice For Help Trust Blog" }],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blogs` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
