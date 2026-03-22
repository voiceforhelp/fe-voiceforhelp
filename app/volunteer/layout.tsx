import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description: "Join Voice For Help Trust as a volunteer. Help us serve food, care for animals and support communities in Rajasthan. Make a hands-on difference today.",
  keywords: ["volunteer NGO India", "volunteer Rajasthan", "join NGO India", "charity volunteer", "social work India"],
  alternates: { canonical: "https://www.voiceforhelp.com/volunteer" },
  openGraph: {
    title: "Volunteer With Us | Voice For Help Trust",
    description: "Join our volunteer community and make a hands-on difference in Rajasthan. Help serve food, care for animals and support communities.",
    url: "https://www.voiceforhelp.com/volunteer",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630, alt: "Volunteer with Voice For Help Trust" }],
  },
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
