import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#d4a843] text-black hover:bg-[#e8c860] shadow-md hover:shadow-lg font-bold",
        secondary: "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg",
        outline: "border-2 border-[#d4a843] text-[#d4a843] hover:bg-[#d4a843]/10",
        ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link: "text-[#d4a843] underline-offset-4 hover:underline",
        dark: "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 shadow-sm",
        white: "bg-white text-gray-900 hover:bg-gray-100 shadow-md font-bold border border-gray-100",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
