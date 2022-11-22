import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex justify-center border border-transparent text-base font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm shadow-sm",
  {
    variants: {
      // name of prop
      intent: {
        // value of prop
        primary: "bg-zinc-900 text-white hover:bg-zinc-700",
        secondary:
          "border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-white",
        ghost: "text-zinc-900",
        danger: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        large: "px-8 py-4",
        medium: "px-4 py-2",
        small: "px-1 py-1",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  type = "button",
  children,
  ...props
}) => (
  <button
    type={type}
    className={button({ intent, size, class: className })}
    {...props}
  >
    {children}
  </button>
);
