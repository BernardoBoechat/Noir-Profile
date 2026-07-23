import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, children, className, ...props },
    ref,
  ): React.JSX.Element {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          "interactive grid size-11 place-items-center rounded-full border border-white/10 bg-black text-white transition-colors hover:border-white/40 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
