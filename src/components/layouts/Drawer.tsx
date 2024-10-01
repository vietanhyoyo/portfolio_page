// components/Drawer.js
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";
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
    <div className="sm:hidden block">
      <button
        className="p-2 dark:text-slate-200/80 dark:border-slate-200/80 text-character border-slate-300 border-2 rounded-md"
        onClick={toggleDrawer}
      >
        <AlignJustify />
      </button>

      <div
        className={`z-10 fixed top-0 left-0 w-full dark:bg-card bg-white/80 h-screen backdrop-blur-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="w-full flex justify-end">
          <button
            className="p-2 m-4 rounded-md text-character"
            onClick={toggleDrawer}
          >
            <X />
          </button>
        </div>
        <nav className="flex flex-col gap-4 items-center">
          {navLinks.map(({ href, text }) => (
            <Link
              href={href}
              key={href}
              onClick={(e) => {
                setIsOpen(false);
                handleScrollToSection(e, href);
              }}
              className="text-slate-800/75 text-lg dark:text-white hover:text-primary dark:hover:text-primary"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay when drawer is open */}
      {isOpen && (
        <div
          className="fixed h-screen inset-0 bg-black opacity-50"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default Drawer;
