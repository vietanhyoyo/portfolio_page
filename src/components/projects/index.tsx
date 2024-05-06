import Link from "next/link";
import Reveal from "../animation/Reveal";
import OutlineButton from "../button/OutlineButton";
import ProjectItem from "./ProjectItem";

export default function Projects() {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-6xl font-bold dark:text-white text-primary mb-6">
            Projects
          </h1>
        </Reveal>
        <Reveal>
          <div className="w-96 h-2 bg-primary rounded-full mb-8"></div>
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <ProjectItem
              className="pt-8"
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
                "getx",
                "figma",
                "nextjs",
                "nodejs",
                "mongodb",
              ]}
              content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
              link={"https://popcornsound.com/"}
            />
          </Reveal>
          <Reveal>
            <ProjectItem
              className="pt-8"
              image={
                <iframe
                  src="https://www.behance.net/embed/project/132632753?ilo0=1"
                  height="316"
                  width="404"
                  allow="clipboard-write"
                ></iframe>
              }
              gap={40}
              subTitle="Webpage"
              title="Kruskal Algorithm Graph editor webpage"
              technicals={["HTML DOM", "Javascript", "CSS"]}
              content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
              link={"https://vietanhyoyo.github.io/graphEditor/"}
            />
          </Reveal>
          <Reveal>
            <ProjectItem
              className="pt-8"
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
              content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
            />
          </Reveal>
          <Reveal>
            <ProjectItem
              className="pt-8"
              image={
                <iframe
                  src="https://www.behance.net/embed/project/146215013?ilo0=1"
                  height="316"
                  width="404"
                  allow="clipboard-write"
                ></iframe>
              }
              gap={40}
              subTitle="Website"
              title="Shop 24/7 website"
              technicals={["reactjs", "nodejs", "mongodb"]}
              content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
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
