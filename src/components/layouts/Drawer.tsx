// components/Drawer.js
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

export type NavLink = { href: string; text: string };

type DrawerProps = {
  navLinks: NavLink[];
  handleScrollToSection: (e: any, id: string) => void;
};

const Drawer = ({ navLinks, handleScrollToSection }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative block 2sm:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-header-menu"
        className={`relative z-50 rounded-full border border-white/30 bg-white/15 p-2.5 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl transition-all duration-300 hover:bg-white/25 dark:border-white/15 dark:bg-white/10 dark:text-slate-200 ${
          isOpen ? "rotate-90 bg-white/25" : "rotate-0"
        }`}
        onClick={toggleDrawer}
      >
        <AlignJustify className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleDrawer}
      />
      <nav
        id="mobile-header-menu"
        className={`absolute right-0 top-[calc(100%+0.85rem)] z-50 flex w-56 origin-top-right flex-col gap-2 rounded-[30px] border border-white/35 bg-white/45 p-3 shadow-[0_20px_55px_rgba(14,116,144,0.24),inset_0_1px_0_rgba(255,255,255,0.68),inset_0_-18px_32px_rgba(255,255,255,0.08)] backdrop-blur-[56px] backdrop-saturate-200 transition-all duration-300 ease-out dark:border-white/15 dark:bg-slate-950/85 dark:shadow-[0_20px_55px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.16)] ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {navLinks.map(({ href, text }) => (
          <Link
            href={href}
            key={href}
            onClick={(e) => {
              setIsOpen(false);
              handleScrollToSection(e, href);
            }}
            className="origin-center rounded-full border border-white/30 bg-white/45 px-5 py-3 text-center text-base font-semibold text-slate-800/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] transition-all duration-300 hover:scale-x-105 hover:scale-y-105 hover:bg-white/60 hover:text-primary active:scale-x-110 active:scale-y-90 dark:border-white/10 dark:bg-white/15 dark:text-white/90 dark:hover:bg-white/20 dark:hover:text-primary"
          >
            {text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Drawer;
