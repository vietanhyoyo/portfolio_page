"use client";
import { Settings } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { useEffect, useRef, useState } from "react";
import LanguageButton from "./LanguageButton";
import AudioToggle from "./AudioToggle";
import { cn } from "@/lib/utils";

type SettingButtonProps = {
  className?: string;
  locale: string;
};

export default function SettingButton({ locale, className }: SettingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none fixed bottom-3 right-3 z-[100] flex w-auto flex-col items-center gap-3 isolate md:bottom-6 md:right-6",
        className,
      )}
    >
      <div
        id="portfolio-settings-menu"
        aria-hidden={!isOpen}
        className={cn(
          "glass-surface pointer-events-auto flex origin-bottom flex-col gap-2 rounded-full p-2 shadow-[0_20px_55px_rgba(15,23,42,0.2)] transition-[opacity,transform] duration-200 ease-out dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-90 opacity-0",
        )}
      >
        <AudioToggle />
        <ModeToggle />
        <LanguageButton locale={locale} />
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto relative z-[101] grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-[0_16px_36px_hsl(var(--primary)/0.38)] transition hover:scale-105 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        aria-controls="portfolio-settings-menu"
        aria-expanded={isOpen}
        aria-label="Settings"
      >
        <Settings
          className={cn("transition-transform duration-300", isOpen && "rotate-90")}
          width={26}
          height={26}
        />
      </button>
    </div>
  );
}
