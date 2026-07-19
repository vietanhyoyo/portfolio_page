"use client";

import { animate, stagger } from "animejs";
import { useAnimeScope } from "@/hook/useAnimeScope";
import SkillCard from "./SkillCard";

export type SkillItem = {
  title: string;
  content: string;
  iconSrc: string;
  starCount: number;
  color: string;
};

export default function SkillsGrid({ skills }: { skills: SkillItem[] }) {
  const rootRef = useAnimeScope<HTMLElement>((scope, root) => {
    const reduceMotion = scope.matches.reduceMotion;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animate("[data-skill-heading]", {
          opacity: { from: 0 },
          y: { from: reduceMotion ? 0 : 24 },
          duration: reduceMotion ? 0 : 600,
          ease: "out(4)",
        });
        animate("[data-skill-card]", {
          opacity: { from: 0 },
          y: { from: reduceMotion ? 0 : 44 },
          scale: { from: reduceMotion ? 1 : 0.94 },
          delay: stagger(reduceMotion ? 0 : 70),
          duration: reduceMotion ? 0 : 720,
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
      className="section-shell pb-28 pt-48 sm:pt-56"
    >
      <div className="section-container">
        <div data-skill-heading className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Skills
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary shadow-[0_0_22px_hsl(var(--primary)/0.45)]" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} {...skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
