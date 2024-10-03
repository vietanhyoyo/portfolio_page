"use client"
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
          `flex flex-col items-center bg-card backdrop-blur-lg ${className} rounded-lg md:rounded-2xl p-4 text-slate-800 select-none w-[290px] md:w-[440px]`,
          show ? "pointer-events-auto" : "pointer-events-none"
          // show ? "select-text" : "select-none"
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
          <h4 className="text-1xl dark:text-slate-400 text-primary md:text-base text-sm">
            {subTitle}
          </h4>
          <h3 className="md:text-2xl text-xl font-semibold dark:text-white mb-2 mt-1">
            {title}
          </h3>
          <p className="dark:text-white flex-1 my-1 md:text-base text-sm">{content}</p>
          {link != null && (
            <Link href={link} className="text-primary hover:text-blue-800 line-clamp-1">
              {link}
            </Link>
          )}
          <div className="flex mt-4">
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
