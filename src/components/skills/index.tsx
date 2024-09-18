import FlutterImg from "@/../public/images/skills/flutter.png";
import ReactImg from "@/../public/images/skills/react.png";
import FigmaImg from "@/../public/images/skills/figma.png";
import NodeImg from "@/../public/images/skills/node.png";
import GitImg from "@/../public/images/skills/git.png";
import RubyImg from "@/../public/images/skills/ruby.png";
import VueImg from "@/../public/images/skills/vue.png";
import DockerImg from "@/../public/images/skills/docker.png";
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
                "Clean architecture, Bloc, GetX, Provider, Map, Biometrics, Google ads, (Android/IOS)"
              }
              starCount={3}
              color="#29B5F6"
            />
            <SkillCard
              title="React"
              iconSrc={ReactImg}
              content={
                "Next.js, Tailwind, MUI, CEO, HTML/CSS, Bootstrap, Shadcn-ui, Dark-mode, multi language"
              }
              starCount={3}
              color="#15bede"
            />
            <SkillCard
              title="Figma"
              iconSrc={FigmaImg}
              content={
                "Knowledge about UI/UX, Proficient in figma, Web, Mobile App"
              }
              starCount={3}
              color="#A25BFF"
            />
            <SkillCard
              title="Node.js"
              iconSrc={NodeImg}
              content={
                "Nest.js, Socket, API, Crawl Data, Authenticate, Swagger, Schedule, I can use it at an intermediate level"
              }
              starCount={3}
              color="#60B147"
            />
            <SkillCard
              title="Vue"
              iconSrc={VueImg}
              content={
                "I can use Vue.js at an intermediate level, Element-plus, VueX"
              }
              starCount={2}
              color="#41B782"
            />
            <SkillCard
              title="Database"
              iconSrc={DatabseImg}
              content={"MySQL, Mongo db, Postgres, SQL Server"}
              starCount={2}
              color="#006CF0"
            />
            <SkillCard
              title="Docker"
              iconSrc={DockerImg}
              content={
                "I can use docker to run the project, deploy, CI/CD with Gitlab-runner, use Nginx to public server"
              }
              starCount={1}
              color="#089CEC"
            />
            <SkillCard
              title="Ruby"
              iconSrc={RubyImg}
              content={"I can create a basic api, write swagger file"}
              starCount={1}
              color="#AF1305"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
