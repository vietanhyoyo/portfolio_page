"use client";

import { animate, onScroll, stagger } from "animejs";
import { useAnimeScope } from "@/hook/useAnimeScope";

export type ExperienceEntry = {
  id: string;
  projectName: string;
  clientName: string;
  clientCountryCode: string;
  time: string;
  facts: string[];
  responsibilities: string[];
};

type ExperienceTimelineProps = {
  title: string;
  experiences: ExperienceEntry[];
};

export default function ExperienceTimeline({
  title,
  experiences,
}: ExperienceTimelineProps) {
  const rootRef = useAnimeScope<HTMLElement>((scope, root) => {
    const reduceMotion = scope.matches.reduceMotion;
    const track = root.querySelector<HTMLElement>("[data-experience-track]");
    const progress = root.querySelector<HTMLElement>("[data-experience-progress]");
    const cursor = root.querySelector<HTMLElement>("[data-experience-cursor]");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-experience-item]"));
    const contents = Array.from(root.querySelectorAll<HTMLElement>("[data-experience-content]"));
    const markers = Array.from(root.querySelectorAll<HTMLElement>("[data-experience-marker]"));
    if (!track || !progress || !cursor) return;

    let markerPositions: number[] = [];
    let currentProgress = 0;

    const measureTimeline = () => {
      const trackBounds = track.getBoundingClientRect();
      markerPositions = markers.map((marker) => {
        const bounds = marker.getBoundingClientRect();
        return bounds.top - trackBounds.top + bounds.height / 2;
      });
    };

    const updateActiveItems = (cursorCenter: number) => {
      items.forEach((item, index) => {
        item.dataset.active = markerPositions[index] <= cursorCenter ? "true" : "false";
      });
    };

    const renderProgress = (value: number) => {
      currentProgress = Math.min(1, Math.max(0, value));
      const maxCursorY = Math.max(track.clientHeight - cursor.offsetHeight, 0);
      const cursorY = maxCursorY * currentProgress;
      progress.style.transform = `scaleY(${currentProgress})`;
      cursor.style.transform = `translateY(${cursorY}px)`;
      updateActiveItems(cursorY + cursor.offsetHeight / 2);
    };

    const resizeObserver = new ResizeObserver(() => {
      measureTimeline();
      renderProgress(currentProgress);
    });
    resizeObserver.observe(track);
    measureTimeline();

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate("[data-experience-heading]", {
          opacity: { from: 0 },
          y: { from: reduceMotion ? 0 : 26 },
          duration: reduceMotion ? 0 : 650,
          ease: "out(4)",
        });
        animate(contents, {
          opacity: { from: 0 },
          y: { from: reduceMotion ? 0 : 28 },
          delay: stagger(reduceMotion ? 0 : 70),
          duration: reduceMotion ? 0 : 680,
          ease: "out(4)",
        });
        revealObserver.disconnect();
      },
      { threshold: 0.04 },
    );
    revealObserver.observe(root);

    if (reduceMotion) {
      renderProgress(1);
      items.forEach((item) => item.dataset.active = "true");
      return () => {
        revealObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    const scrollState = { value: 0 };
    animate(scrollState, {
      value: 1,
      ease: "linear",
      autoplay: onScroll({ target: track, sync: 0.18 }),
      onUpdate: () => renderProgress(scrollState.value),
    });

    return () => {
      revealObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [experiences.length]);

  return (
    <section
      ref={rootRef}
      className="section-shell py-28"
    >
      <div aria-hidden="true" className="ambient-glow absolute -left-[28rem] top-16 h-[56rem] w-[56rem] opacity-70" />
      <div aria-hidden="true" className="ambient-glow-purple absolute -right-[30rem] top-1/2 h-[58rem] w-[58rem] opacity-80" />
      <div className="section-container">
        <div data-experience-heading className="mb-14">
          <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">{title}</h2>
          <div className="mt-5 h-1 w-24 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]" />
        </div>

        <div data-experience-track className="relative pb-4">
          <div className="experience-line absolute bottom-0 left-[7px] top-0 w-[2px]">
            <div data-experience-progress className="experience-progress absolute inset-x-0 top-0 h-full scale-y-0" />
            <div
              data-experience-cursor
              className="experience-cursor absolute left-1/2 top-0 z-20 -ml-[7px] h-3.5 w-3.5 rounded-full border-2 border-white bg-primary dark:border-slate-950"
            />
          </div>

          <div className="space-y-10 sm:space-y-14">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                data-experience-item
                data-active="false"
                className="group relative grid grid-cols-[16px_minmax(0,1fr)] gap-x-5 sm:gap-x-8"
              >
                <div className="relative z-10 flex justify-center pt-2">
                  <span
                    data-experience-marker
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full border-2 border-slate-300 bg-slate-50 transition-[background-color,border-color,box-shadow,transform] duration-300 group-data-[active=true]:scale-125 group-data-[active=true]:border-primary group-data-[active=true]:bg-primary group-data-[active=true]:shadow-[0_0_16px_hsl(var(--primary)/0.7)] dark:border-slate-600 dark:bg-[#07111f]"
                  />
                </div>

                <div
                  data-experience-content
                  className="border-b border-slate-200/80 pb-10 dark:border-white/10 sm:pb-14"
                >
                  <div className="grid gap-7 lg:grid-cols-[minmax(220px,0.34fr)_minmax(0,1fr)] lg:gap-12">
                    <header className="min-w-0">
                      <p className="text-sm font-bold tracking-wide text-primary">
                        {experience.time}
                      </p>
                      <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900 transition-colors group-data-[active=true]:text-primary dark:text-white dark:group-data-[active=true]:text-primary sm:text-2xl">
                        {experience.projectName}
                      </h3>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        <span
                          aria-hidden="true"
                          className={`fi fi-${experience.clientCountryCode} rounded-[2px] shadow-sm`}
                        />
                        {experience.clientName}
                      </p>
                    </header>

                    <div>
                      <ul className="flex flex-wrap gap-x-7 gap-y-2 border-b border-slate-200/70 pb-5 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
                        {experience.facts.map((fact) => (
                          <li key={fact} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-primary"
                            />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>

                      <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200 sm:text-base">
                        {experience.responsibilities.map((responsibility, index) => (
                          <li key={responsibility} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                            <span
                              aria-hidden="true"
                              className="pt-0.5 text-xs font-bold tabular-nums text-primary/65"
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
