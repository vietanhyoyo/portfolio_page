"use client";

import type { PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";
import CarouselArrowButton from "../button/CarouselArrowButton";
import { cn } from "@/lib/utils";

type AnimateCarouselProps = {
  cards: CardType[];
  className?: string;
  heading?: React.ReactNode;
  offset: number;
  showArrows: boolean;
};

type CardType = {
  key: string;
  content:
    | React.ReactNode
    | ((state: {
        isActive: boolean;
        isVisible: boolean;
        shouldLoadMedia: boolean;
        distance: number;
        onMediaLoad: () => void;
      }) => React.ReactNode);
};

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
  heading,
  offset,
  showArrows,
}: AnimateCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [loadedMediaKeys, setLoadedMediaKeys] = useState<Set<string>>(
    () => new Set()
  );
  const dragStartX = useRef<number | null>(null);
  const ignoreClickRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const totalCards = cards.length;
  const visibleRange = useMemo(
    () =>
      Math.min(
        Math.max(offset, 1),
        Math.max(Math.floor(totalCards / 2), 1)
      ),
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

  const markMediaAsLoaded = useCallback((key: string) => {
    setLoadedMediaKeys((currentKeys) => {
      if (currentKeys.has(key)) return currentKeys;

      const nextKeys = new Set(currentKeys);
      nextKeys.add(key);
      return nextKeys;
    });
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateViewportWidth = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
      });
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    const activeCard = rootRef.current?.querySelector<HTMLElement>(
      '[data-project-motion][data-active="true"]',
    );
    if (!activeCard) return;

    animate(activeCard, {
      opacity: { from: 0.55 },
      y: { from: 18 },
      scale: { from: 0.96 },
      duration: 520,
      ease: "out(4)",
    });
  }, [activeIndex]);

  useEffect(() => {
    const headingElement = rootRef.current?.querySelector<HTMLElement>(
      "[data-project-heading]",
    );
    if (!headingElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(headingElement, {
          opacity: { from: 0 },
          y: { from: 24 },
          duration: 620,
          ease: "out(4)",
        });
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(headingElement);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    setIsDragging(true);
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
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-[720px] w-full flex-1 flex-col items-center justify-start overflow-hidden pb-2 pt-8 md:min-h-[760px] md:pb-3 md:pt-10",
        className
      )}
      ref={rootRef}
    >
      {heading}

      <div
        className={cn(
          "relative z-10 mt-2 h-[620px] w-full select-none outline-none [perspective:1400px] md:h-[min(72svh,760px)] lg:[perspective:1800px]",
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
            const isMediaLoaded = loadedMediaKeys.has(card.key);
            const shouldKeepMounted = isVisible || isMediaLoaded;

            if (!shouldKeepMounted) return null;

            const scale = Math.max(0.66, 1 - absDistance * 0.085);
            const opacity = isVisible
              ? Math.max(0.26, 1 - absDistance * 0.18)
              : 0;
            const x = distance * layout.cardStep;
            const y = absDistance * layout.cardDrop + Math.max(absDistance - 1, 0) * 14;
            const z = absDistance * -layout.cardDepth;
            const backgroundBlur = isActive
              ? "none"
              : `blur(${Math.min(absDistance * 3, 6)}px)`;
            const shouldLoadMedia = isVisible || isMediaLoaded;
            const content =
              typeof card.content === "function"
                ? card.content({
                    isActive,
                    isVisible,
                    shouldLoadMedia,
                    distance,
                    onMediaLoad: () => markMediaAsLoaded(card.key),
                  })
                : card.content;

            return (
              <div
                key={card.key}
                className="absolute left-1/2 top-1/2 flex items-center justify-center transition-[filter,opacity,transform] duration-300 ease-out [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform"
                style={{
                  filter: backgroundBlur,
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
                <div data-project-motion data-active={isActive ? "true" : "false"}>
                  {content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <div className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center gap-4 px-4 md:bottom-4">
          <CarouselArrowButton
            direction="left"
            aria-label="Previous project"
            onClick={() => rotate(-1)}
          />
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
          <CarouselArrowButton
            direction="right"
            aria-label="Next project"
            onClick={() => rotate(1)}
          />
        </div>
      )}
    </div>
  );
}
