"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";

export default function Header() {
  return (
    <header className="bg-slate-200 dark:bg-slate-800 py-4 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <h1 className="text-primary dark:text-white text-xl font-bold">LOGO</h1>
        <nav className="space-x-4">
          <Link
            href="/"
            className="text-primary dark:text-white hover:text-gray-300 font-bold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-primary dark:text-white hover:text-gray-300 font-bold"
          >
            About
          </Link>
          <Link
            href="/skill"
            className="text-primary dark:text-white hover:text-gray-300 font-bold"
          >
            Experience
          </Link>
          <Link
            href="/contact"
            className="text-primary dark:text-white hover:text-gray-300 font-bold"
          >
            Contact
          </Link>
        </nav>
        <div>
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  );
}
