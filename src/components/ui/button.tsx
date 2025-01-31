import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", // rounded-lg for smoother corners, focus-visible adjustments for better accessibility
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-md hover:bg-blue-500", // Blue theme for default buttons
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-500",
        outline:
          "border border-blue-600 text-blue-600 shadow-sm hover:bg-blue-50", // Blue outline with hover effect
        secondary: "bg-blue-100 text-blue-600 shadow-sm hover:bg-blue-200", // Light blue for secondary buttons
        ghost: "hover:bg-blue-50 text-blue-600", // Ghost button with subtle blue hover
        link: "text-blue-600 underline-offset-4 hover:underline", // Blue text for links
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
