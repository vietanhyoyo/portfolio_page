import Reveal from "../animation/Reveal";
import ProjectItem from "./ProjectItem";
import SoundAppImg from "@/../public/images/projects/app_sound.png";

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
          <ProjectItem
            image={SoundAppImg}
            subTitle="App mobile"
            title="Music listening app"
            technicals={["flutter","getx", "figma"]}
            content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
          />
          <ProjectItem
            oppositeDirection
            image={SoundAppImg}
            subTitle="App mobile"
            title="Music listening app"
            technicals={["flutter", "figma"]}
            content="Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Corrupti, vel. Nobis enim 
            unde voluptas, deserunt temporibus sed 
            illum dolor quod ratione aperiam?"
          />
        </div>
      </div>
    </div>
  );
}
