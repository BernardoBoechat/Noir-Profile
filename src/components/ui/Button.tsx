import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}
export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={cn(
        "interactive inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan",
        variant === "primary"
          ? "bg-white text-black hover:bg-cyan"
          : "border border-white/10 bg-white/5 text-white hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
