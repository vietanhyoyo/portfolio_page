"use client";

import { animate } from "animejs";
import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import CarouselArrowButton from "../button/CarouselArrowButton";
import TechTag from "../tag/TechTag";
import { cn } from "@/lib/utils";

export type ProjectSlide = {
  key: string;
  mediaSrc: string;
  subTitle: string;
  title: string;
  technicals: string[];
  content: string;
  link?: string;
  mediaStyle?: CSSProperties;
};

type ProjectsCarouselProps = {
  heading: string;
  slides: ProjectSlide[];
};

export default function ProjectsCarousel({
  heading,
  slides,
}: ProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedMediaKeys, setLoadedMediaKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeSlide = slides[activeIndex];

  const selectProject = (index: number) => {
    if (slides.length === 0) return;
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = root.querySelector<HTMLElement>("[data-project-media]");
    const copy = root.querySelector<HTMLElement>("[data-project-copy]");

    if (media) {
      media.style.opacity = "1";
      animate(media, {
        scale: [1.015, 1],
        duration: 520,
        ease: "out(4)",
      });
    }
    if (copy) {
      copy.style.opacity = "1";
      animate(copy, {
        y: [12, 0],
        duration: 460,
        ease: "out(4)",
      });
    }
  }, [activeIndex]);

  if (!activeSlide) return null;

  const isMediaLoaded = loadedMediaKeys.has(activeSlide.key);

  return (
    <div ref={rootRef} className="w-full">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            Selected work
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="mr-1 text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <CarouselArrowButton
            direction="left"
            aria-label="Previous project"
            onClick={() => selectProject(activeIndex - 1)}
          />
          <CarouselArrowButton
            direction="right"
            aria-label="Next project"
            onClick={() => selectProject(activeIndex + 1)}
          />
        </div>
      </div>

      <div
        className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.65fr)]"
        role="region"
        aria-label="Projects showcase"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            selectProject(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            selectProject(activeIndex + 1);
          }
        }}
      >
        <article className="min-w-0">
          <div
            data-project-media
            className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 shadow-[0_22px_60px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
          >
            {!isMediaLoaded && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-slate-100 dark:bg-slate-900">
                <div className="flex flex-col items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span className="h-9 w-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
                  Loading preview
                </div>
              </div>
            )}
            <iframe
              key={activeSlide.key}
              title={`${activeSlide.title} project preview`}
              src={activeSlide.mediaSrc}
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
              scrolling="no"
              allow="clipboard-write"
              onLoad={() => {
                setLoadedMediaKeys((current) => {
                  const next = new Set(current);
                  next.add(activeSlide.key);
                  return next;
                });
              }}
              style={activeSlide.mediaStyle}
            />
          </div>

          <div
            data-project-copy
            className="mt-8 border-l-2 border-primary/45 pl-5 sm:mt-10 sm:pl-7"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  {activeSlide.subTitle}
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight text-slate-950 dark:text-white sm:text-3xl">
                  {activeSlide.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {activeSlide.content}
                </p>
              </div>

              {activeSlide.link && (
                <Link
                  href={activeSlide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_hsl(var(--primary)/0.28)] transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  Live project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {activeSlide.technicals.map((technical) => (
                <TechTag key={technical}>{technical}</TechTag>
              ))}
            </div>
          </div>
        </article>

        <aside className="soft-glass-card layout-card self-start p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between px-3 py-2">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              All projects
            </p>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              {slides.length}
            </span>
          </div>

          <div className="scrollbar-hide flex max-h-[620px] flex-col gap-2 overflow-y-auto">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.key}
                  type="button"
                  onClick={() => selectProject(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "layout-card-inner group flex w-full items-center gap-4 border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "border-primary/30 bg-primary text-white shadow-[0_14px_32px_hsl(var(--primary)/0.24)]"
                      : "border-transparent bg-white/55 text-slate-700 hover:border-primary/15 hover:bg-primary/[0.08] hover:text-primary dark:bg-white/[0.045] dark:text-slate-200 dark:hover:bg-white/[0.08] dark:hover:text-primary",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-black tabular-nums",
                      isActive
                        ? "bg-white/[0.18] text-white"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-xs font-bold uppercase tracking-wider", isActive ? "text-white/75" : "text-slate-400 dark:text-slate-500")}>
                      {slide.subTitle}
                    </span>
                    <span className="mt-1 block truncate text-sm font-bold sm:text-base">
                      {slide.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      isActive ? "text-white" : "text-slate-400",
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
