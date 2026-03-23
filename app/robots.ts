import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/profile", "/profile/", "/login", "/register", "/verify-email", "/forgot-password"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/profile", "/profile/"],
      },
    ],
    sitemap: "https://www.voiceforhelp.com/sitemap.xml",
  };
}
