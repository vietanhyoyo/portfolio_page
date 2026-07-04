"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Drawer, { NavLink } from "../Drawer";

type Props = {
  params: { locale: string };
};

export default function Header({ params: { locale } }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { href: "#home", text: "Home" },
    { href: "#skills", text: "Skill" },
    { href: "#experience", text: "Experience" },
    { href: "#projects", text: "Projects" },
    { href: "#contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY; // Lấy vị trí tuyệt đối của phần tử
      window.scrollTo({
        top: elementPosition - 60, // Cuộn tới vị trí của phần tử, trừ đi 100px
        behavior: "smooth", // Cuộn mượt
      });
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 py-3 transition-all duration-300 md:py-4 ${
        isScrolled
          ? "-translate-y-2"
          : "translate-y-1"
      }`}
    >
      <div
        className={`relative isolate mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 md:px-8 ${
          isScrolled
            ? "border-white/45 bg-white/25 shadow-[0_18px_55px_rgba(14,116,144,0.22),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-20px_34px_rgba(255,255,255,0.08)] dark:border-white/15 dark:bg-slate-950/45 dark:shadow-[0_18px_55px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-20px_34px_rgba(255,255,255,0.04)]"
            : "border-white/35 bg-white/15 shadow-[0_16px_45px_rgba(14,116,144,0.14),inset_0_1px_0_rgba(255,255,255,0.58),inset_0_-18px_32px_rgba(255,255,255,0.06)] dark:border-white/10 dark:bg-slate-950/30 dark:shadow-[0_16px_45px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-18px_32px_rgba(255,255,255,0.03)]"
        } before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:h-6 before:rounded-full before:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.34),rgba(255,255,255,0)_68%)] before:blur-sm before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(120deg,rgba(255,255,255,0.34),rgba(255,255,255,0.05)_38%,rgba(14,165,233,0.16)_72%,rgba(255,255,255,0.12))] after:content-['']`}
      >
        <h1 className="relative z-10 text-2xl font-bold text-primary md:text-3xl">
          {"<A>"}
        </h1>
        <nav className="relative z-10 hidden space-x-6 2sm:block md:space-x-10">
          {navLinks.map(({ href, text }) => (
            <Link
              href={href}
              key={href}
              onClick={(e) => handleScrollToSection(e, href)}
              className="relative inline-block origin-center rounded-full px-3 py-1.5 text-base font-medium text-slate-800/75 transition-all duration-300 ease-out before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:scale-75 before:rounded-full before:border before:border-white/25 before:bg-white/0 before:opacity-0 before:shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] before:transition-all before:duration-300 hover:scale-x-110 hover:scale-y-105 hover:text-primary hover:before:scale-100 hover:before:bg-white/35 hover:before:opacity-100 hover:before:shadow-[0_10px_24px_rgba(14,116,144,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] active:scale-x-105 active:scale-y-95 dark:text-white/85 dark:hover:text-primary dark:hover:before:border-white/10 dark:hover:before:bg-white/10 md:text-lg"
            >
              {text}
            </Link>
          ))}
        </nav>
        <div className="relative z-10">
          <Drawer
            handleScrollToSection={handleScrollToSection}
            navLinks={navLinks}
          />
        </div>
      </div>
    </header>
  );
}
