"use client";
import Link from "next/link";
import Reveal from "../animation/Reveal";
import OutlineButton from "../button/OutlineButton";
import { v4 as uuidv4 } from "uuid";
import ProjectItem from "./ProjectItem";
import Carousel from "react-spring-3d-carousel";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamically import the AnimateCarousel with SSR disabled
const AnimateCarousel = dynamic(() => import("./AnimateCarousel"), {
  ssr: false,
});

export default function Projects() {
  const slides = [
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132863579?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="Java game"
          title="Mini Pixel game"
          technicals={["java", "sql server"]}
          content="A simple game written in Java. You can control a character to defeat enemies."
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
            src="https://www.behance.net/embed/project/209349691?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="UI/UX desgin"
          title="Meical app design"
          technicals={["figma"]}
          content="Design a healthcare application for the Hậu Giang Provincial Department of Health."
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/193127651?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="App mobile / Website"
          title="Music listening app"
          technicals={["flutter", "figma", "nextjs", "nodejs", "mongodb"]}
          content="An application that allows users to search for and listen to movie soundtracks."
          link={"https://popcornsound.com/"}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/198626625?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="UI/UX desgin"
          title="Manhwa page design"
          technicals={["figma"]}
          content="A personal project about designing a website for reading manhwa and news about popular anime."
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132632753?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allow="clipboard-write"
              style={{ borderRadius: "0px" }}
            ></iframe>
          }
          gap={40}
          subTitle="Webpage"
          title="Kruskal Algorithm Graph editor webpage"
          technicals={["HTML DOM", "Javascript", "CSS"]}
          content="A website that allows users to draw graphs with vertices and edges. They can run Kruskal's algorithm to find the minimum spanning tree on the graph."
          link={"https://vietanhyoyo.github.io/graphEditor/"}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/133727469?ilo0=1"
              className={cn(
                "md:w-[404px] md:h-[316px]",
                "w-[256px] h-[178px]"
              )}
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="C/C++ Game"
          title="Tetris game"
          technicals={["C/C++"]}
          content="A simple block-stacking game developed using C/C++ for the console."
        />
      ),
    },
  ];

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center absolute">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-4xl font-bold dark:text-white text-primary mb-6">
            Projects
          </h1>
        </Reveal>
        <Reveal>
          <div className="py-32 relative">
            <AnimateCarousel cards={slides} offset={2} showArrows={false} />
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <Link href="https://www.behance.net/vitanhbi4" target="_blank">
              <OutlineButton>You see more...</OutlineButton>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
