import Image from "next/image";
import { useTheme } from "next-themes";
import SunIcon from "@/../public/images/icons/sun.svg";
import MoonIcon from "@/../public/images/icons/moon.svg";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      className={cn(
        "w-12 h-12 flex justify-center place-items-center",
        "bg-white/50 dark:bg-slate-100/15 rounded-full",
        "dark:border-gray-600 p-2",
        "uppercase leading-normal text-white",
        "transition duration-150 ease-in-out",
        "hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",
        "focus:ring-4 dark:focus:ring-primary-600 focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none",
        "active:bg-primary-700",
        "shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      )}
    >
      {theme === "light" ? (
        <Moon className="stroke-primary h-[24px] w-[24px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Sun className="h-[24px] w-[24px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </button>
  );
};

export default ModeToggle;
