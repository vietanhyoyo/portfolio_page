"use client";

import { animate, stagger } from "animejs";
import { useAnimeScope } from "@/hook/useAnimeScope";
import ContactBackground from "./ContactBackground";
import ContactForm from "./ContactForm";
import ContactIcons from "./ContactIcons";

type ContactCopy = {
  name: string;
  email: string;
  message: string;
  send: string;
  thankMessage: string;
  formNote: string;
  openBtnText: string;
  closeBtnText: string;
};

export default function ContactSection({ copy }: { copy: ContactCopy }) {
  const rootRef = useAnimeScope<HTMLElement>((scope, root) => {
    const reduceMotion = scope.matches.reduceMotion;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate("[data-contact-enter]", {
          opacity: { from: 0 },
          y: { from: reduceMotion ? 0 : 34 },
          delay: stagger(reduceMotion ? 0 : 100),
          duration: reduceMotion ? 0 : 680,
          ease: "out(4)",
        });
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="section-shell flex min-h-[860px] items-center pb-24 pt-28"
    >
      <ContactBackground />
      <div className="section-container flex flex-col items-center">
        <div data-contact-enter className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-primary sm:text-5xl">Contact</h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.45)]" />
        </div>

        <div data-contact-enter className="w-full">
          <ContactForm
            name={copy.name}
            email={copy.email}
            message={copy.message}
            send={copy.send}
            thankMessage={copy.thankMessage}
            formNote={copy.formNote}
            openBtnText={copy.openBtnText}
            closeBtnText={copy.closeBtnText}
          />
        </div>

        <div data-contact-enter className="mt-10 flex justify-center gap-4">
          <ContactIcons />
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 flex h-14 items-center justify-center border-t border-slate-200/70 bg-white/65 text-sm text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300">
        ©vietanh - 2024
      </footer>
    </section>
  );
}
