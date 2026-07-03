"use client";

import type { ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselArrowButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  direction: "left" | "right";
};

export default function CarouselArrowButton({
  direction,
  className,
  disabled,
  ...props
}: CarouselArrowButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-slate-300/80 bg-white/75 text-slate-700 shadow-lg backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-primary",
        "hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
        "disabled:cursor-not-allowed disabled:border-slate-300/60 disabled:bg-slate-100/70 disabled:text-slate-400 disabled:opacity-60 disabled:hover:bg-slate-100/70",
        "dark:disabled:border-white/10 dark:disabled:bg-white/5 dark:disabled:text-white/35 dark:disabled:hover:bg-white/5",
        className
      )}
      {...props}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
