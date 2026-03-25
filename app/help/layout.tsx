import type { Metadata } from "next";

const BASE_URL = "https://www.voiceforhelp.com";

export const metadata: Metadata = {
  title: "How You Can Help",
  description: "Discover ways to contribute to Voice For Help Trust — donate, volunteer, share or fundraise. Every small action creates a big impact for those in need.",
  keywords: ["help NGO India", "volunteer India", "donate for cause", "how to help poor", "charity India", "cow feeding donation", "animal welfare help"],
  alternates: { canonical: `${BASE_URL}/help` },
  openGraph: {
    title: "How You Can Help | Voice For Help Trust",
    description: "Discover ways to contribute — donate, volunteer, share or fundraise. Every action counts.",
    url: `${BASE_URL}/help`,
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Help Voice For Help Trust" }],
  },
};

const faqs = [
  { q: "How is my donation used?", a: "100% of your donation goes to the chosen category. Our team uses it in the field the next day and you receive a video proof of the impact." },
  { q: "How do I get the impact video?", a: "After your donation, the next day's field work is recorded. The video is uploaded and linked to your profile automatically." },
  { q: "Can I donate anonymously?", a: "Yes! Use our Fast Donate feature to make anonymous donations with just your phone number." },
  { q: "Is my donation tax deductible?", a: "We are in the process of obtaining 80G certification. Stay tuned for updates." },
  { q: "How can I verify my donation was used?", a: "Every donation is linked to a daily video. You can watch the impact video in your profile dashboard." },
];

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "How You Can Help", item: `${BASE_URL}/help` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
