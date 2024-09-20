import { Divide } from "lucide-react";
import Reveal from "../animation/Reveal";
import TechTag from "../tag/TechTag";

const ProjectItem = ({
  title,
  // technicals,
  descriptions,
}: {
  title: string;
  // technicals: string[];
  descriptions: string[];
}) => (
  <Reveal>
    <div className="mt-3 flex text-slate-800/80">
      <div>
        <div className="text-md font-semibold dark:text-slate-50/90">
          {title}
          {/* <div className="inline ml-2">
            {technicals.map((item, index) => {
              return <TechTag key={index}>{item}</TechTag>;
            })}
          </div> */}
        </div>
        <div className="pt-1 dark:text-slate-50/70">
          {descriptions.map((item, index) => (
            <p key={index} className="text-base ">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  </Reveal>
);

export default ProjectItem;
