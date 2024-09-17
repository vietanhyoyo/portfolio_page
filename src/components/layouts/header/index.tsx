"use client";
import Link from "next/link";

type Props = {
  params: { locale: string };
};

export default function Header({ params: { locale } }: Props) {
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/skill", text: "Skill" },
    { href: "/experience", text: "Experience" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="py-4 fixed top-0 left-0 w-full z-10">
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
