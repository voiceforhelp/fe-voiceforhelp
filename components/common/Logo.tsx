import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ className, size = "md", variant = "dark" }: LogoProps) {
  const sizes = {
    sm: { img: "w-9 h-9",  text: "text-sm",  sub: "text-[9px]" },
    md: { img: "w-11 h-11", text: "text-base", sub: "text-[10px]" },
    lg: { img: "w-14 h-14", text: "text-xl",  sub: "text-xs" },
  };

  const s = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  const subColor  = variant === "light" ? "text-gray-400" : "text-gray-500";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/VoiceForHelpLogo.jpeg"
        alt="Voice For Help Trust"
        className={cn(s.img, "rounded-full object-cover shrink-0 border-2 border-gold/30")}
      />
      <div className="min-w-0">
        <span className={cn("font-extrabold leading-tight block tracking-tight", s.text, textColor)}>
          Voice <span className="text-gold">For</span> Help
        </span>
        <span className={cn("leading-tight block italic font-medium", s.sub, subColor)}>
          Care With Compassion
        </span>
      </div>
    </div>
  );
}
