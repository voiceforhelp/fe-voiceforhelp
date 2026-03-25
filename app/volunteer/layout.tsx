import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description: "Join Voice For Help Trust as a volunteer. Help us serve food, care for animals and support communities in Rajasthan. Make a hands-on difference today.",
  keywords: ["volunteer NGO India", "volunteer Rajasthan", "join NGO India", "charity volunteer", "social work India"],
  alternates: { canonical: `${BASE_URL}/volunteer` },
  openGraph: {
    title: "Volunteer With Us | Voice For Help Trust",
    description: "Join our volunteer community and make a hands-on difference in Rajasthan. Help serve food, care for animals and support communities.",
    url: `${BASE_URL}/volunteer`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Volunteer with Voice For Help Trust" }],
  },
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Volunteer", item: `${BASE_URL}/volunteer` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
