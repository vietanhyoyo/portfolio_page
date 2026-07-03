"use client";
import Link from "next/link";
import TechTag from "../tag/TechTag";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
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
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });
  return (
    <animated.div
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <div
        className={cn(
          "flex min-h-[500px] w-[290px] select-none flex-col items-center overflow-hidden rounded-lg border border-slate-200/80 bg-white/90 p-4 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-900/95 dark:text-white dark:shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:min-h-[560px] md:w-[374px] md:rounded-2xl",
          className
        )}
      >
        <div
          className={cn(
            "rounded-lg md:rounded-2xl overflow-x-hidden pointer-events-none",
          )}
        >
          {image}
        </div>
        <div className="h-full flex flex-col justify-center pt-6 w-full">
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
    </animated.div>
  );
};

export default ProjectItem;
