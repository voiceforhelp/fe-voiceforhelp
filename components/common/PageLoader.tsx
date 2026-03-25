import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FFFDF7] flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Rotating border circle */}
        <div className="absolute w-28 h-28 rounded-full border-[3px] border-[#d4a843]/15 border-t-[#d4a843]/60 animate-spin" />

        {/* Outer glow ring */}
        <div className="absolute w-32 h-32 rounded-full border border-[#d4a843]/5" />

        {/* Logo */}
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm">
          <Image
            src="/VoiceForHelpLogo.jpeg"
            alt="Voice For Help"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
