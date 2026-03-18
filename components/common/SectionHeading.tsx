import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({ title, titleHighlight, subtitle, className, align = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-12", align === "center" && "text-center", className)}>
      <h2 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold", light ? "text-gray-900" : "text-white")}>
        {title}
        {titleHighlight && <span className="text-gold-gradient italic"> {titleHighlight}</span>}
      </h2>
      {subtitle && <p className={cn("mt-2 text-sm md:text-base max-w-2xl", align === "center" && "mx-auto", light ? "text-gray-500" : "text-gray-400")}>{subtitle}</p>}
      <div className={cn("mt-4 ornament-divider max-w-xs", align === "center" && "mx-auto")}>
        <span className="w-2 h-2 rounded-full bg-[#d4a843] inline-block" />
      </div>
    </div>
  );
}
