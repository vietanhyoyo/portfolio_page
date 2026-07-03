"use client";
import Link from "next/link";
import TechTag from "../tag/TechTag";
import { cn } from "@/lib/utils";

type Props = {
  image: React.ReactNode;
  subTitle: string;
  title: string;
  technicals: string[];
  content: string;
  oppositeDirection?: boolean;
  imageWidth?: any;
  gap?: any;
  link?: string | null;
  className?: string;
};

const ProjectItem = ({
  image,
  subTitle,
  title,
  technicals,
  content,
  link,
  className,
}: Props) => {
  return (
    <div className="group relative transition-transform duration-200 ease-out hover:scale-[1.03]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 rounded-[28px] bg-sky-400/0 blur-2xl transition-[opacity,transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-sky-400/45 group-hover:opacity-100 dark:group-hover:bg-cyan-400/35"
      />
      <div
        className={cn(
          "relative isolate z-10 flex min-h-[500px] w-[290px] select-none flex-col items-center overflow-hidden rounded-lg border border-slate-200/80 bg-transparent p-4 text-slate-900 shadow-[0_2px_10px_rgb(0_0_0_/_8%)] transition-[border-color,box-shadow] duration-300 group-hover:border-sky-300/80 group-hover:shadow-[0_22px_45px_rgba(14,165,233,0.28)] dark:border-white/10 dark:text-white dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)] dark:group-hover:border-cyan-300/40 dark:group-hover:shadow-[0_22px_55px_rgba(34,211,238,0.22)] md:min-h-[560px] md:w-[374px] md:rounded-2xl",
          className
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-white/80 backdrop-blur-lg [backdrop-filter:blur(24px)_saturate(160%)] [-webkit-backdrop-filter:blur(24px)_saturate(160%)] dark:bg-slate-900/80"
        />
        <div
          className={cn(
            "relative z-10 rounded-lg md:rounded-2xl overflow-x-hidden pointer-events-none",
          )}
        >
          {image}
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center pt-6 w-full">
          <h4 className="text-1xl text-sky-600 dark:text-sky-300 md:text-base text-sm">
            {subTitle}
          </h4>
          <h3 className="md:text-2xl text-xl font-semibold text-slate-950 dark:text-white mb-2 mt-1">
            {title}
          </h3>
          <p className="flex-1 my-1 text-slate-700 dark:text-slate-100 md:text-base text-sm">{content}</p>
          {link != null && (
            <Link href={link} className="text-sky-600 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-200 line-clamp-1">
              {link}
            </Link>
          )}
          <div className="flex flex-wrap gap-1 mt-4">
            {technicals.map((item, index) => (
              <TechTag key={index}>{item}</TechTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
