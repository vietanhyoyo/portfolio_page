"use client";

import type { CSSProperties } from "react";
import Reveal from "../animation/Reveal";
import AnimateCarousel from "./AnimateCarousel";
import ProjectItem from "./ProjectItem";
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

type LazyProjectFrameProps = {
  src: string;
  title: string;
  shouldLoad: boolean;
  onLoad?: () => void;
  style?: CSSProperties;
};

function LazyProjectFrame({
  src,
  title,
  shouldLoad,
  onLoad,
  style,
}: LazyProjectFrameProps) {
  const frameClassName = cn(
    "md:w-[343px] md:h-[269px]",
    "w-[256px] h-[178px]"
  );

  if (!shouldLoad) {
    return (
      <div
        className={cn(
          frameClassName,
          "grid place-items-center bg-slate-100 text-slate-400 dark:bg-slate-800/80 dark:text-slate-500"
        )}
        aria-label={`${title} preview placeholder`}
      >
        <div className="h-8 w-8 rounded-full border-2 border-current border-t-transparent opacity-60" />
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={src}
      className={frameClassName}
      allowFullScreen
      loading="lazy"
      scrolling="no"
      allow="clipboard-write"
      onLoad={onLoad}
      style={style}
    />
  );
}

export default function ProjectsCarousel({ heading, slides }: ProjectsCarouselProps) {
  const cards = slides.map((slide) => ({
    key: slide.key,
    content: ({
      shouldLoadMedia,
      onMediaLoad,
    }: {
      shouldLoadMedia: boolean;
      onMediaLoad: () => void;
    }) => (
      <ProjectItem
        image={
          <LazyProjectFrame
            title={slide.title}
            src={slide.mediaSrc}
            shouldLoad={shouldLoadMedia}
            onLoad={onMediaLoad}
            style={slide.mediaStyle}
          />
        }
        gap={40}
        subTitle={slide.subTitle}
        title={slide.title}
        technicals={slide.technicals}
        content={slide.content}
        link={slide.link}
      />
    ),
  }));

  return (
    <AnimateCarousel
      cards={cards}
      heading={
        <Reveal>
          <h1 className="text-4xl font-bold text-primary md:text-5xl">
            {heading}
          </h1>
        </Reveal>
      }
      offset={2}
      showArrows={true}
    />
  );
}
