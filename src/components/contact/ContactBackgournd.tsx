"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const splineScenes = {
  dark: "https://my.spline.design/voiceinteractionanimationcopy-1f8b33488fa860c594937c701cfadcca/",
  light:
    "https://my.spline.design/voiceinteractionanimation-0658adfc2d83f3ec219d63168938831c/",
};

export default function ContactBackground() {
  const { theme, resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shouldLoadScene, setShouldLoadScene] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || shouldLoadScene || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: "450px 0px" }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [mounted, shouldLoadScene]);

  const activeTheme = theme === "system" ? resolvedTheme : theme;
  const sceneUrl = activeTheme === "dark" ? splineScenes.dark : splineScenes.light;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "absolute inset-0 overflow-hidden bg-sky-50 dark:bg-[#07111f]",
        "[contain:layout_paint_size]"
      )}
    >
      {mounted && shouldLoadScene && (
        <iframe
          key={sceneUrl}
          src={sceneUrl}
          title="Contact background animation"
          width="100%"
          height="100%"
          loading="lazy"
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
}
