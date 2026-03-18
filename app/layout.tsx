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
    default: "VoiceForHelp - Transparent Donation Platform",
    template: "%s | VoiceForHelp",
  },
  description: "VoiceForHelp - Transparent donation platform. Donate for cow feeding, animal care, and social welfare. See your donation impact through daily video proof.",
  keywords: ["donate for cows", "animal donation India", "cow feeding donation", "NGO donation India", "transparent donation", "voiceforhelp"],
  authors: [{ name: "VoiceForHelp" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "VoiceForHelp",
    title: "VoiceForHelp - Transparent Donation Platform",
    description: "Donate and see your impact through daily video proof. Be The Voice, Be The Change.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceForHelp - Transparent Donation Platform",
    description: "Donate and see your impact through daily video proof.",
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
                telephone: "+91-9024408325",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-[#1a1a1a] text-gray-100`}>
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
