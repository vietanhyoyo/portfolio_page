"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimateCarouselProps = {
  cards: CardType[];
  className?: string;
  offset: number;
  showArrows: boolean;
};

type CardType = {
  key: string;
  content: React.ReactNode;
};

const AUTO_ROTATE_MS = 3000;
const DRAG_THRESHOLD = 28;

const getSignedDistance = (
  index: number,
  activeIndex: number,
  total: number
) => {
  let distance = index - activeIndex;
  const half = total / 2;

  if (distance > half) distance -= total;
  if (distance < -half) distance += total;

  return distance;
};

export default function AnimateCarousel({
  cards,
  className,
  offset,
  showArrows,
}: AnimateCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const dragStartX = useRef<number | null>(null);
  const ignoreClickRef = useRef(false);

  const totalCards = cards.length;
  const visibleRange = useMemo(
    () => Math.min(Math.max(offset + 2, 4), Math.max(totalCards - 1, 1)),
    [offset, totalCards]
  );

  const layout = useMemo(() => {
    const isDesktop = viewportWidth >= 768;

    return {
      cardStep: isDesktop
        ? Math.min(Math.max(viewportWidth * 0.23, 250), 410)
        : Math.min(Math.max(viewportWidth * 0.48, 148), 210),
      cardDrop: isDesktop
        ? Math.min(Math.max(viewportWidth * 0.035, 34), 76)
        : 34,
      cardDepth: isDesktop ? 95 : 56,
      rotateY: isDesktop ? 18 : 14,
      rotateZ: isDesktop ? 7 : 5,
    };
  }, [viewportWidth]);

  const rotate = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((currentIndex) => {
        if (totalCards === 0) return 0;
        return (currentIndex + direction + totalCards) % totalCards;
      });
    },
    [totalCards]
  );

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging || totalCards <= 1) return;

    const timer = window.setInterval(() => rotate(1), AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [isDragging, isPaused, rotate, totalCards]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    setIsDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current == null) return;

    const dragDistance = event.clientX - dragStartX.current;
    const hasDragged = Math.abs(dragDistance) > DRAG_THRESHOLD;

    if (hasDragged) {
      ignoreClickRef.current = true;
      rotate(dragDistance < 0 ? 1 : -1);
      window.setTimeout(() => {
        ignoreClickRef.current = false;
      }, 0);
    }

    dragStartX.current = null;
    setIsDragging(false);
    setIsPaused(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = null;
    setIsDragging(false);
    setIsPaused(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[840px] w-full flex-1 flex-col items-center justify-center overflow-hidden py-6 md:min-h-[840px]",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className={cn(
          "relative z-10 h-[700px] w-full select-none outline-none [perspective:1400px] md:h-[min(82svh,840px)] lg:[perspective:1800px]",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        role="region"
        aria-label="Projects carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            rotate(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            rotate(-1);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {cards.map((card, index) => {
            const distance = getSignedDistance(index, activeIndex, totalCards);
            const absDistance = Math.abs(distance);
            const isActive = distance === 0;
            const isVisible = absDistance <= visibleRange;
            const scale = Math.max(0.66, 1 - absDistance * 0.085);
            const opacity = isVisible
              ? Math.max(0.26, 1 - absDistance * 0.18)
              : 0;
            const blur = isActive ? 0 : Math.min(8, absDistance * 1.8);
            const brightness = Math.max(0.5, 1 - absDistance * 0.13);
            const x = distance * layout.cardStep;
            const y = absDistance * layout.cardDrop + Math.max(absDistance - 1, 0) * 14;
            const z = absDistance * -layout.cardDepth;

            return (
              <div
                key={card.key}
                className="absolute left-1/2 top-1/2 flex items-center justify-center transition-[opacity,filter,transform] duration-300 ease-out [backface-visibility:hidden] [transform-style:preserve-3d]"
                style={{
                  filter: `blur(${blur}px) brightness(${brightness}) saturate(${brightness})`,
                  opacity,
                  transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, ${z}px) rotateY(${
                    distance * -layout.rotateY
                  }deg) rotateZ(${distance * layout.rotateZ}deg) scale(${scale})`,
                  zIndex: Math.round(100 - absDistance * 10),
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                aria-hidden={!isActive}
                onClickCapture={(event) => {
                  if (ignoreClickRef.current) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }

                  if (!isActive) {
                    event.preventDefault();
                    event.stopPropagation();
                    setActiveIndex(index);
                  }
                }}
              >
                {card.content}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <div className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center gap-4 px-4 md:bottom-4">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300/80 bg-white/75 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label="Previous project"
            onClick={() => rotate(-1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {cards.map((card, index) => (
              <button
                key={`${card.key}-dot`}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary",
                  index === activeIndex
                    ? "w-7 bg-primary"
                    : "w-2 bg-slate-400/60 hover:bg-slate-500/70 dark:bg-white/35 dark:hover:bg-white/60"
                )}
                aria-label={`Go to project ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-300/80 bg-white/75 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label="Next project"
            onClick={() => rotate(1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
