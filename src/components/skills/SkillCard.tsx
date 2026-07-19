"use client";

import { animate } from "animejs";
import { Star } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, FocusEvent, PointerEvent } from "react";
import { cn } from "@/lib/utils";

type SkillCardProps = {
  title: string;
  content: string;
  iconSrc: string;
  starCount: number;
  color: string;
  index: number;
};

export default function SkillCard({
  title,
  content,
  iconSrc,
  starCount,
  color,
  index,
}: SkillCardProps) {
  const settle = (target: HTMLElement) => {
    animate(target, {
      rotateX: 0,
      rotateY: 0,
      translateY: 0,
      scale: 1,
      duration: 540,
      ease: "out(4)",
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    animate(event.currentTarget, {
      rotateX: y * -5,
      rotateY: x * 6,
      translateY: -5,
      scale: 1.01,
      duration: 260,
      ease: "out(3)",
    });
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      settle(event.currentTarget);
    }
  };

  return (
    <article
      data-skill-card
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => settle(event.currentTarget)}
      onFocus={(event) =>
        animate(event.currentTarget, {
          translateY: -5,
          scale: 1.01,
          duration: 300,
          ease: "out(3)",
        })
      }
      onBlur={handleBlur}
      className={cn(
        "soft-glass-card layout-card preserve-3d group relative min-h-[310px] overflow-hidden p-6 outline-none",
        "transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-primary/60",
      )}
      style={
        {
          "--skill-accent": color,
          borderColor: `${color}35`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="layout-card-inner grid h-16 w-16 place-items-center border bg-white/75 shadow-lg dark:bg-slate-950/55"
            style={{ borderColor: `${color}45`, boxShadow: `0 16px 34px ${color}20` }}
          >
            <Image src={iconSrc} alt={title} width={38} height={38} className="h-9 w-9 object-contain" />
          </div>
          <span className="text-xs font-bold tracking-[0.22em] text-slate-400 dark:text-slate-500">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-7 text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{content}</p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200/70 pt-4 dark:border-white/10">
          <div className="flex gap-1.5" aria-label={`${starCount} of 3 stars`}>
            {Array.from({ length: 3 }, (_, starIndex) => (
              <Star
                key={starIndex}
                className={cn(
                  "h-4 w-4",
                  starIndex < starCount
                    ? "fill-primary stroke-primary"
                    : "fill-transparent stroke-slate-300 dark:stroke-slate-600",
                )}
              />
            ))}
          </div>
          <span className="h-2 w-10 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
