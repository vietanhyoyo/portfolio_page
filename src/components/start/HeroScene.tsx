"use client";

import BehanceIcon from "@/../public/images/icons/behance.svg";
import DownloadIcon from "@/../public/images/icons/download.svg";
import MailIcon from "@/../public/images/icons/mail.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";
import type { AudioTrack } from "@/types/audio";
import { animate, stagger } from "animejs";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import AudioPlayer from "../audio/AudioPlayer";
import OrbitIconButton from "../button/OrbitIconButton";
import { cn } from "@/lib/utils";
import { useAnimeScope } from "@/hook/useAnimeScope";
import TypingText from "./TypingText";

type HeroSceneProps = {
  tracks: AudioTrack[];
  copy: {
    hello: string;
    myName: string;
    developer: string;
    designer: string;
    resume: string;
    downloadCv: string;
  };
};

const CV_URL =
  "https://drive.google.com/file/d/1i6rEUjqV-nUN3W9KuQUWEJvukAr1Njg3/view?usp=drive_link";

export default function HeroScene({ tracks, copy }: HeroSceneProps) {
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const tiltAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const rootRef = useAnimeScope<HTMLElement>((scope) => {
    const reduceMotion = scope.matches.reduceMotion;

    animate("[data-hero-enter]", {
      opacity: { from: 0 },
      y: { from: reduceMotion ? 0 : 30 },
      delay: stagger(reduceMotion ? 0 : 85),
      duration: reduceMotion ? 0 : 680,
      ease: "out(4)",
    });

    if (!reduceMotion) {
      animate("[data-hero-float]", {
        y: [-7, 7],
        rotateZ: [-0.7, 0.7],
        duration: 3600,
        ease: "inOutSine",
        alternate: true,
        loop: true,
      });
    }
  }, []);

  const resetTilt = useCallback(() => {
    if (!tiltRef.current) return;
    tiltAnimationRef.current?.pause();
    tiltAnimationRef.current = animate(tiltRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 650,
      ease: "out(4)",
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!tiltRef.current || event.pointerType === "touch") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      tiltAnimationRef.current?.pause();
      tiltAnimationRef.current = animate(tiltRef.current, {
        rotateX: y * -12,
        rotateY: x * 14,
        scale: 1.018,
        duration: 420,
        ease: "out(4)",
      });
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      className="section-shell min-h-[980px] pb-52 pt-28 md:min-h-screen md:pb-44 md:pt-24"
    >
      <div
        aria-hidden="true"
        className="ambient-glow absolute -left-[18rem] top-20 h-[42rem] w-[42rem]"
      />
      <div
        aria-hidden="true"
        className="ambient-glow absolute -right-[18rem] top-24 h-[40rem] w-[40rem] opacity-80"
      />

      <div className="section-container flex min-h-[760px] items-center">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.78fr)] lg:gap-14">
          <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p
              data-hero-enter
              className="text-2xl font-semibold leading-tight text-slate-700 dark:text-slate-100 sm:text-3xl md:text-4xl"
            >
              {copy.hello}
              <br />
              {copy.myName}
            </p>

            <div data-hero-enter className="mt-4">
              <TypingText title={copy.developer} titleTwo={copy.designer} />
            </div>

            <p
              data-hero-enter
              className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:mx-0"
            >
              {copy.resume}
            </p>

            <div
              data-hero-enter
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <HeroAction
                icon={DownloadIcon}
                label={`${copy.downloadCv} PDF`}
                href={CV_URL}
              />
              <HeroAction
                icon={MailIcon}
                label="vanhyoyo@gmail.com"
                href="mailto:vanhyoyo@gmail.com"
              />
              <HeroAction icon={PhoneIcon} label="0358485077" />
              <HeroAction
                icon={BehanceIcon}
                label="behance.net/vitanhbi4"
                href="https://www.behance.net/vitanhbi4"
              />
            </div>
          </div>

          <div data-hero-enter className="relative mx-auto w-full max-w-[520px]">
            <div
              data-hero-float
              className="relative mx-auto w-[min(88vw,410px)] [perspective:1400px]"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetTilt}
            >
              <div
                ref={tiltRef}
                className="glass-surface layout-card preserve-3d relative aspect-[0.78] overflow-hidden border-primary/25 bg-gradient-to-br from-white/85 via-sky-50/75 to-primary/10 p-4 shadow-[0_42px_100px_rgba(0,83,159,0.24)] dark:from-slate-900/[0.92] dark:via-slate-900/[0.78] dark:to-primary/15 dark:shadow-[0_42px_110px_rgba(0,0,0,0.5)]"
              >
                <div className="layout-card-inner absolute inset-4 border border-white/70 dark:border-white/10" />
                <div className="portrait-card-sheen pointer-events-none absolute inset-0" />
                <div className="absolute inset-x-8 bottom-4 top-16 rounded-[999px_999px_14px_14px] bg-gradient-to-b from-primary/15 via-cyan-200/15 to-primary/25 dark:from-primary/20 dark:via-cyan-400/5 dark:to-primary/20" />
                <div aria-hidden="true" className="absolute left-8 top-7 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                  <span className="h-px w-16 bg-primary/45" />
                </div>
                <Image
                  className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[91%] w-auto max-w-none object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.3)]"
                  width={1414}
                  height={2000}
                  priority
                  src="/images/character5.png"
                  alt="Viet Anh character portrait"
                  style={{ transform: "translate3d(-50%, 0, 52px)" }}
                />
                <div className="pointer-events-none absolute inset-x-10 bottom-5 z-20 h-10 rounded-full bg-slate-950/25 blur-xl" />
              </div>
            </div>

            <div
              data-hero-enter
              className="glass-surface layout-card relative z-30 mx-auto -mt-3 w-full max-w-[480px] p-3 shadow-[0_22px_60px_rgba(0,83,159,0.2)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
            >
              <AudioPlayer tracks={tracks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroActionProps = {
  icon: StaticImageData;
  label: string;
  href?: string;
};

function HeroAction({ icon, label, href }: HeroActionProps) {
  return (
    <div className="group relative">
      <OrbitIconButton href={href} icon={icon} size="md" />
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[calc(100%+0.7rem)] z-40 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl transition duration-200",
          "group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
        )}
      >
        {href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </Link>
        ) : (
          <span>{label}</span>
        )}
      </div>
    </div>
  );
}
