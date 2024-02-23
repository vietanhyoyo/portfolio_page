import FlutterImg from "@/../public/images/skills/flutter.png";
import ReactImg from "@/../public/images/skills/react.png";
import FigmaImg from "@/../public/images/skills/figma.png";
import NodeImg from "@/../public/images/skills/node.png";
import GitImg from "@/../public/images/skills/git.png";
import VueImg from "@/../public/images/skills/vue.png";
import DatabseImg from "@/../public/images/skills/database.png";

import SkillCard from "./SkillCard";
import Reveal from "../animation/Reveal";

export default function Skills() {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-6xl font-bold dark:text-white text-primary mb-6">
            Skills
          </h1>
        </Reveal>
        <Reveal>
          <div className="w-96 h-2 bg-primary rounded-full mb-8"></div>
        </Reveal>
        <Reveal>
          <div className="flex gap-4 mt-8 w-full justify-center flex-wrap">
            <SkillCard
              title="Flutter"
              iconSrc={FlutterImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="ReactJS"
              iconSrc={ReactImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="VueJS"
              iconSrc={VueImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="Figma"
              iconSrc={FigmaImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="NodeJS"
              iconSrc={NodeImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="Git"
              iconSrc={GitImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
            <SkillCard
              title="Database"
              iconSrc={DatabseImg}
              content={
                "Lorem ipsum sit elit. Sapiente voluptatem iure voluptas! Debitis eaquetenetur distinctio recusandae? Quod, natus."
              }
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
