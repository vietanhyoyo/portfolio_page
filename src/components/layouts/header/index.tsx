"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import LanguageButton from "./LanguageButton";

type Props = {
  params: { locale: string };
};

export default function Header({ params: { locale } }: Props) {
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/skill", text: "Experience" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="bg-slate-200 dark:bg-slate-800 py-4 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <h1 className="text-primary dark:text-white text-xl font-bold">LOGO</h1>
        <nav className="space-x-4">
          {navLinks.map(({ href, text }) => (
            <Link
              href={href}
              key={href}
              className="text-primary dark:text-white hover:text-gray-300 font-bold"
            >
              {text}
            </Link>
          ))}
        </nav>
        <div className="flex">
          <LanguageButton className="mr-3" locale={locale} />
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  );
}
