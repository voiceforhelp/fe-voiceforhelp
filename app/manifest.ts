import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Voice For Help Trust",
    short_name: "VoiceForHelp",
    description: "A registered NGO from Jaipur , Rajasthan, India. Donate for food distribution, animal welfare, cow protection & more with 100% video-verified transparency.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#166534",
    orientation: "portrait-primary",
    categories: ["nonprofit", "social"],
    icons: [
      {
        src: "/VoiceForHelpLogo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/VoiceForHelpLogo.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
