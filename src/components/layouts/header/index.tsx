"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: { locale: string };
};

export default function Header({ params: { locale } }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/skill", text: "Skill" },
    { href: "/experience", text: "Experience" },
    { href: "/contact", text: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu đã cuộn xuống hơn 50px
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

  return (
    <header className={`py-4 fixed top-0 left-0 w-full z-10 transition-colors duration-300 ${
      isScrolled ? "bg-white/70 shadow-[0_8px_9px_-4px_rgba(59,113,202,0.1),0_4px_18px_0_rgba(59,113,202,0.1)] dark:bg-slate-800/90 backdrop-blur-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4 xl:px-0">
        <h1 className="text-primary text-3xl font-bold">{"<A>"}</h1>
        <nav className="space-x-12">
          {navLinks.map(({ href, text }) => (
            <Link
              href={href}
              key={href}
              className="text-slate-800/75 text-xl dark:text-white hover:text-primary dark:hover:text-primary font-semibold"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
