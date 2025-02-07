import FlutterImg from "@/../public/images/skills/flutter.png";
import ReactImg from "@/../public/images/skills/react.png";
import FigmaImg from "@/../public/images/skills/figma.png";
import NodeImg from "@/../public/images/skills/node.png";
import GitImg from "@/../public/images/skills/git.png";
import JavaImg from "@/../public/images/skills/java.png";
import RubyImg from "@/../public/images/skills/ruby.png";
import VueImg from "@/../public/images/skills/vue.png";
import DockerImg from "@/../public/images/skills/docker.png";
import DatabseImg from "@/../public/images/skills/database.png";

import SkillCard from "./SkillCard";
import Reveal from "../animation/Reveal";
import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations("Skill");
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-800 flex justify-center pb-10">
      <div className="py-14 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-4xl font-bold dark:text-white text-slate-800 m-8">
            Skills
          </h1>
        </Reveal>
        <Reveal>
          <div className="flex gap-4 mt-10 w-full justify-center flex-wrap">
            <SkillCard
              title="Flutter"
              iconSrc={FlutterImg}
              content={t("flutter")}
              starCount={3}
              color="#29B5F6"
            />
            <SkillCard
              title="React"
              iconSrc={ReactImg}
              content={t("react")}
              starCount={3}
              color="#15bede"
            />
            <SkillCard
              title="Figma"
              iconSrc={FigmaImg}
              content={t("figma")}
              starCount={3}
              color="#A25BFF"
            />
            <SkillCard
              title="Node.js"
              iconSrc={NodeImg}
              content={t("node")}
              starCount={3}
              color="#60B147"
            />
            <SkillCard
              title="Vue"
              iconSrc={VueImg}
              content={t("vue")}
              starCount={3}
              color="#41B782"
            />
            <SkillCard
              title="Database"
              iconSrc={DatabseImg}
              content={t("database")}
              starCount={2}
              color="#006CF0"
            />
            <SkillCard
              title="Docker"
              iconSrc={DockerImg}
              content={t("docker")}
              starCount={1}
              color="#089CEC"
            />
            <SkillCard
              title="Java"
              iconSrc={JavaImg}
              content={t("java")}
              starCount={1}
              color="#E76F00"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
