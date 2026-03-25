import type { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const BASE_URL = "https://www.voiceforhelp.com";

async function fetchVideo(id: string) {
  try {
    const res = await fetch(`${API_URL}/videos/${id}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.video) return data.video;
  } catch {}
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const video = await fetchVideo(id);

  if (!video) {
    return { title: "Video Not Found" };
  }

  const title = video.title;
  const description = video.description || `Watch impact video: ${video.title} — Voice For Help Trust`;
  const thumbnail = video.thumbnailUrl || "/VoiceForHelpLogo.jpeg";
  const url = `${BASE_URL}/videos/${id}`;

  return {
    title,
    description,
    keywords: [video.title, "impact video", "Voice For Help Trust", "NGO video proof", "donation impact", ...(video.tags || [])],
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      title,
      description,
      url,
      siteName: "Voice For Help Trust",
      images: [{ url: thumbnail, width: 1280, height: 720, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [thumbnail],
    },
  };
}

export default async function VideoDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await fetchVideo(id);

  if (!video) return children;

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: video.thumbnailUrl || `${BASE_URL}/VoiceForHelpLogo.jpeg`,
    uploadDate: video.createdAt,
    contentUrl: video.videoUrl,
    embedUrl: video.videoUrl,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "WatchAction" },
      userInteractionCount: video.views || 0,
    },
    publisher: {
      "@type": "Organization",
      name: "Voice For Help Trust",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/VoiceForHelpLogo.jpeg` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Videos", item: `${BASE_URL}/videos` },
      { "@type": "ListItem", position: 3, name: video.title, item: `${BASE_URL}/videos/${id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
