import type { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}
export function Tooltip({ label, children }: TooltipProps): React.JSX.Element {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs text-white opacity-0 transition group-focus-within/tooltip:opacity-100 group-hover/tooltip:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
