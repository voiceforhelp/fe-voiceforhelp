"use client";
import { Instagram, Facebook, Youtube, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      <Button variant="ghost" size="icon" onClick={shareWhatsApp} className="h-8 w-8 text-green-500 hover:bg-green-500/10">
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={shareFacebook} className="h-8 w-8 text-blue-400 hover:bg-blue-400/10">
        <Facebook className="h-4 w-4" />
      </Button>
      <a href="https://instagram.com/voiceforhelp" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-400 hover:bg-pink-400/10">
          <Instagram className="h-4 w-4" />
        </Button>
      </a>
      <a href="https://youtube.com/@voiceforhelp" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/10">
          <Youtube className="h-4 w-4" />
        </Button>
      </a>
    </div>
  );
}
