import Reveal from "../animation/Reveal";
import FigmaImg from "@/../public/images/skills/figma.png";
import Image from "next/image";

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
        <div className="flex">
          <img
            src="https://help.apple.com/assets/656912ADA28BF1B7E90BF0F6/656912B3021EA3AD750FB887/en_US/c61bfbef2fc063162694b6f088e2a620.png"
            alt="project-img"
            style={{height: "300px"}}
          />
          <div className="ml-5">
            <h3 className="text-3xl font-semibold dark:text-white mb-8 mt-6">
              App data
            </h3>
            <p className="dark:text-white flex-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
              libero mollitia ipsum, obcaecati modi, accusantium molestiae botam
              eligendi non sunt architecto dolore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
