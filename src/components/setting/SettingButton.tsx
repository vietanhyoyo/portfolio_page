"use client";
import { Settings } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import LanguageButton from "./LanguageButton";

type SettingButtonProps = {
  className?: string;
  locale: string;
};

export default function SettingButton({ locale, className }: SettingButtonProps) {
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  const toggleModeToggle = () => {
    if (showModeToggle) {
      // Trigger exit animation
      setAnimatingOut(true);
      setTimeout(() => {
        setShowModeToggle(false);
        setAnimatingOut(false);
      }, 350); // Duration of the slide-down animation
    } else {
      // Show ModeToggle with slide-up animation
      setShowModeToggle(true);
    }
  };
  return (
    <div className="fixed bottom-2 md:bottom-6 right-2 md:right-6 flex flex-col gap-4 items-center w-auto z-50">
      {showModeToggle && (
        <div
          className={animatingOut ? "animate-slide-down" : "animate-slide-up"}
        >
          <div className="flex flex-col gap-4">
            <ModeToggle />
            <LanguageButton locale={locale} />
          </div>
        </div>
      )}

      <div
        onClick={toggleModeToggle}
        className="shadow-lg dark:shadow-primary/50 bg-primary p-3 z-50 cursor-pointer hover:bg-primary/80 text-white"
        style={{ borderRadius: "99px", borderBottomRightRadius: "30px" }}
      >
        <Settings className={"animate-spin-slow"} width={34} height={34} />
      </div>
    </div>
  );
}
