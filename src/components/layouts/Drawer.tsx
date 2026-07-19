// components/Drawer.js
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

export type NavLink = { href: string; text: string };

type DrawerProps = {
  navLinks: NavLink[];
  handleScrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  activeHref: string;
};

const Drawer = ({ navLinks, handleScrollToSection, activeHref }: DrawerProps) => {
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
        className={`relative z-50 rounded-full border border-primary/15 bg-primary/10 p-2.5 text-primary backdrop-blur-xl transition-all duration-300 hover:bg-primary/15 ${
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
        className={`glass-surface layout-card absolute right-0 top-[calc(100%+0.85rem)] z-50 flex w-56 origin-top-right flex-col gap-2 p-3 transition-all duration-300 ease-out ${
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
            className={`rounded-full px-5 py-3 text-center text-base font-semibold transition-colors ${
              activeHref === href
                ? "bg-primary text-white"
                : "text-slate-700 hover:bg-primary/10 hover:text-primary dark:text-slate-200"
            }`}
          >
            {text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Drawer;
