"use client";

import { useRef, useState, ReactNode, Children, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SkillsScrollProps = {
  children: ReactNode;
};

export default function SkillsScroll({ children }: SkillsScrollProps) {
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const totalItems = Children.count(children);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Calculate number of dots based on content width and viewport
  const dotsCount = Math.ceil(totalItems / 3); // Show 3 items per dot section

  // Update current dot index and scroll states based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollViewportRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollViewportRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      // Update scroll states
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for floating point precision
      
      if (maxScroll > 0) {
        const progress = scrollLeft / maxScroll;
        const newDotIndex = Math.round(progress * (dotsCount - 1));
        setCurrentDotIndex(Math.max(0, Math.min(newDotIndex, dotsCount - 1)));
      }
    };

    const viewport = scrollViewportRef.current;
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => viewport.removeEventListener('scroll', handleScroll);
    }
  }, [dotsCount]);

  // Scroll to specific dot position
  const scrollToDot = (dotIndex: number) => {
    if (!scrollViewportRef.current) return;
    const { scrollWidth, clientWidth } = scrollViewportRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const targetScroll = (dotIndex / (dotsCount - 1)) * maxScroll;
    
    scrollViewportRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollViewportRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollViewportRef.current.offsetLeft);
    setScrollLeft(scrollViewportRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollViewportRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollViewportRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollViewportRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByViewport = (direction: "left" | "right") => {
    if (!scrollViewportRef.current) return;
    
    // Prevent scrolling if at boundary
    if (direction === "left" && !canScrollLeft) return;
    if (direction === "right" && !canScrollRight) return;
    
    const viewport = scrollViewportRef.current;
    const amount = Math.max(viewport.clientWidth * 0.8, 320);
    const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const target = direction === "right"
      ? Math.min(viewport.scrollLeft + amount, maxScrollLeft)
      : Math.max(viewport.scrollLeft - amount, 0);

    viewport.scrollTo({
      left: target,
      behavior: "smooth",
    });

    // Fallback for environments where smooth scroll is ignored.
    requestAnimationFrame(() => {
      if (Math.abs(viewport.scrollLeft - target) < 1) return;
      viewport.scrollLeft = target;
    });
  };

  return (
    <div className="w-full">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        ref={scrollViewportRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="mt-10 w-full overflow-x-auto cursor-grab active:cursor-grabbing scroll-smooth scrollbar-hide"
        style={{ 
          scrollBehavior: "smooth", 
          maxWidth: "100vw",
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none", /* IE and Edge */
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        <div
          className="flex shrink-0 gap-4 px-8 pt-10 pb-12"
          style={{
            perspective: "1200px",
            width: `${Math.max(totalItems * 320 + Math.max(totalItems - 1, 0) * 16 + 64, 1400)}px`,
            minWidth: "1400px"
          }}
        >
          {children}
        </div>
      </div>

      <div className="relative z-[80] pointer-events-auto mb-6 flex justify-center items-center gap-4">
        <button
          type="button"
          onClick={() => {
            scrollByViewport("left");
          }}
          disabled={!canScrollLeft}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm transition ${
            canScrollLeft
              ? 'border-slate-500 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-400 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 cursor-pointer'
              : 'border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed opacity-50'
          }`}
          aria-label="Scroll skills left"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: dotsCount }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToDot(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentDotIndex
                  ? 'w-3 h-3 bg-primary dark:bg-primary'
                  : 'w-2 h-2 bg-slate-400 dark:bg-slate-500 hover:bg-slate-600 dark:hover:bg-slate-300'
              }`}
              aria-label={`Scroll to section ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            scrollByViewport("right");
          }}
          disabled={!canScrollRight}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm transition ${
            canScrollRight
              ? 'border-primary bg-primary text-white hover:bg-primary/90 cursor-pointer'
              : 'border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed opacity-50'
          }`}
          aria-label="Scroll skills right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
