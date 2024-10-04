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
      className={`py-2 md:py-4 fixed top-0 left-0 w-full z-10 transition-colors duration-300 ${
        isScrolled
          ? "bg-white/70 shadow-[0_8px_9px_-4px_rgba(59,113,202,0.1),0_4px_18px_0_rgba(59,113,202,0.1)] dark:bg-slate-800/90 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-6 xl:px-0">
        <h1 className="text-primary text-3xl font-bold">{"<A>"}</h1>
        <nav className="md:space-x-12 space-x-6 hidden 2sm:block">
          {navLinks.map(({ href, text }) => (
            <Link
              href={href}
              key={href}
              onClick={(e) => handleScrollToSection(e, href)}
              className="text-slate-800/75 text-base md:text-lg dark:text-white hover:text-primary dark:hover:text-primary"
            >
              {text}
            </Link>
          ))}
        </nav>
        <Drawer
          handleScrollToSection={handleScrollToSection}
          navLinks={navLinks}
        />
      </div>
    </header>
  );
}
