import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export default function Logo({ className, size = "md", variant = "dark" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-base", sub: "text-[9px]" },
    md: { icon: "w-10 h-10", text: "text-xl", sub: "text-xs" },
    lg: { icon: "w-14 h-14", text: "text-2xl", sub: "text-sm" },
  };

  const s = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-gray-900";
  const subColor = variant === "light" ? "text-gray-400" : "text-gray-500";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Brand Icon - Megaphone + Heart */}
      <svg viewBox="0 0 48 48" className={cn(s.icon, "shrink-0")} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="24" cy="24" r="24" fill="#d4a843" />
        {/* Megaphone body */}
        <path d="M14 20L14 28L18 28L26 34V14L18 20H14Z" fill="#1a1a1a" />
        {/* Sound waves */}
        <path d="M30 18C31.5 19.5 32.5 21.5 32.5 24C32.5 26.5 31.5 28.5 30 30" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 15C35.5 17.5 37 20.5 37 24C37 27.5 35.5 30.5 33 33" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        {/* Heart on megaphone */}
        <path d="M19 22.5C19 21.5 19.8 21 20.5 21C21.2 21 22 21.5 22 22.5C22 21.5 22.8 21 23.5 21C24.2 21 25 21.5 25 22.5C25 24.5 22 26.5 22 26.5C22 26.5 19 24.5 19 22.5Z" fill="#EF4444" />
      </svg>
      <div>
        <span className={cn("font-extrabold leading-tight block tracking-tight uppercase", s.text, textColor)}>
          Voice <span className="text-gold">For</span> Help
        </span>
        <span className={cn("leading-tight block italic", s.sub, subColor)}>Giving Hope, Changing Lives</span>
      </div>
    </div>
  );
}
