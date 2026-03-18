import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "Voice For Help Trust — Care With Compassion",
    template: "%s | Voice For Help Trust",
  },
  description: "Voice For Help Trust — A registered NGO from Rajasthan, India. Donate for food distribution, animal welfare, cow protection, child welfare, medical assistance & more. Every donation is proven through daily video proof.",
  keywords: ["Voice For Help Trust", "NGO Rajasthan", "donate India", "cow protection", "animal welfare", "food distribution", "transparent NGO", "video proof donation"],
  authors: [{ name: "Voice For Help Trust" }],
  icons: { icon: "/VoiceForHelpLogo.ico", apple: "/VoiceForHelpLogo.jpeg" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Voice For Help Trust",
    title: "Voice For Help Trust — Care With Compassion",
    description: "Every rupee you donate is documented through daily video proof. Registered NGO, Rajasthan.",
    images: [{ url: "/VoiceForHelpLogo.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice For Help Trust — Care With Compassion",
    description: "Every rupee you donate is documented through daily video proof.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "VoiceForHelp",
              description: "Transparent donation platform for animal care, food distribution, and social welfare.",
              url: "https://voiceforhelp.org",
              logo: "https://voiceforhelp.org/logo.png",
              sameAs: [
                "https://instagram.com/voiceforhelp",
                "https://facebook.com/voiceforhelp",
                "https://youtube.com/@voiceforhelp",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7737872585",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: "12px", padding: "12px 16px" } }} />
          <Header />
          <main className="min-h-screen">{children}</main>
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
