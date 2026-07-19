"use client";

import { animate } from "animejs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Drawer, { type NavLink } from "../Drawer";
import { cn } from "@/lib/utils";

const navLinks: NavLink[] = [
  { href: "#home", text: "Home" },
  { href: "#skills", text: "Skill" },
  { href: "#experience", text: "Experience" },
  { href: "#projects", text: "Projects" },
  { href: "#contact", text: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    if (headerRef.current) {
      // Do not animate the header's initial opacity: route changes and hot
      // reloads could otherwise leave this fixed navigation transparent.
      headerRef.current.style.opacity = "1";
      headerRef.current.style.transform = "";
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.3] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const activeLink = linkRefs.current.get(activeHref);
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!activeLink || !nav || !indicator) return;

    animate(indicator, {
      x: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      opacity: 1,
      duration: 420,
      ease: "out(4)",
    });
  }, [activeHref]);

  const handleScrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const element = document.querySelector<HTMLElement>(id);
    if (!element) return;
    setActiveHref(id);
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 72,
      behavior: "smooth",
    });
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 opacity-100 transition-transform duration-300 sm:px-5 sm:pt-4",
        isScrolled ? "-translate-y-1" : "translate-y-0",
      )}
    >
      <div
        data-scrolled={isScrolled ? "true" : "false"}
        className="site-header-surface relative mx-auto flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6"
      >
        <Link
          href="#home"
          onClick={(event) => handleScrollToSection(event, "#home")}
          className="relative z-10 rounded-full px-2 text-2xl font-black tracking-tight text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:text-3xl"
          aria-label="Home"
        >
          {"<A>"}
        </Link>

        <nav ref={navRef} className="relative hidden items-center 2sm:flex">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0 rounded-full border border-primary/15 bg-primary/10 opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
          />
          {navLinks.map(({ href, text }) => (
            <Link
              key={href}
              ref={(node) => {
                if (node) linkRefs.current.set(href, node);
                else linkRefs.current.delete(href);
              }}
              href={href}
              onClick={(event) => handleScrollToSection(event, href)}
              className={cn(
                "relative z-10 rounded-full px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:px-4 md:text-base",
                activeHref === href
                  ? "text-primary"
                  : "text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary",
              )}
            >
              {text}
            </Link>
          ))}
        </nav>

        <Drawer
          handleScrollToSection={handleScrollToSection}
          navLinks={navLinks}
          activeHref={activeHref}
        />
      </div>
    </header>
  );
}
