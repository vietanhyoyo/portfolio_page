import Link from "next/link";
import Reveal from "../animation/Reveal";
import OutlineButton from "../button/OutlineButton";
import ProjectItem from "./ProjectItem";

export default function Projects() {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-4xl font-bold dark:text-white text-primary mb-6">
            Projects
          </h1>
        </Reveal>
        <Reveal>
          <div className="w-96 h-1 bg-primary rounded-full mb-8"></div>
        </Reveal>
        <div className="flex mt-10 gap-4 overflow-x-hidden hover:overflow-x-scroll w-full">
          <Reveal>
            <ProjectItem
              image={
                <iframe
                  src="https://www.behance.net/embed/project/193127651?ilo0=1"
                  height="316"
                  width="404"
                  allow="clipboard-write"
                ></iframe>
              }
              gap={40}
              subTitle="App mobile / Website"
              title="Music listening app"
              technicals={[
                "flutter",
                "figma",
                "nextjs",
                "nodejs",
                "mongodb",
              ]}
              content="An application that allows users to search for and listen to movie soundtracks."
              link={"https://popcornsound.com/"}
            />
          </Reveal>
          <Reveal>
            <ProjectItem
              image={
                <iframe
                  src="https://www.behance.net/embed/project/132632753?ilo0=1"
                  height="316"
                  width="404"
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
          </Reveal>
          <Reveal>
            <ProjectItem
              image={
                <iframe
                  src="https://www.behance.net/embed/project/132863579?ilo0=1"
                  height="316"
                  width="404"
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
          </Reveal>
          <Reveal>
            <ProjectItem
              image={
                <iframe
                  src="https://www.behance.net/embed/project/133727469?ilo0=1"
                  height="316"
                  width="404"
                  allow="clipboard-write"
                ></iframe>
              }
              gap={40}
              subTitle="C/C++ Game"
              title="Tetris game"
              technicals={["C/C++"]}
              content="A simple block-stacking game developed using C/C++ for the console."
            />
          </Reveal>
        </div>
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
