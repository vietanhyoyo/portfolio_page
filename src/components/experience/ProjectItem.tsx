import Reveal from "../animation/Reveal";
import TechTag from "../tag/TechTag";

const ProjectItem = ({
  title,
  technicals,
  descriptions,
}: {
  title: string;
  technicals: string[];
  descriptions: string[];
}) => (
  <Reveal>
    <div className="mt-3">
      <div className="dark:text-slate-50 text-xl font-semibold text-slate-800">
        &#10022;&nbsp;{title}
        <div className="inline ml-2">
          {technicals.map((item, index) => {
            return <TechTag key={index}>{item}</TechTag>;
          })}
        </div>
      </div>
      <div className="pl-5 pt-1">
        {descriptions.map((item, index) => (
          <p key={index} className="dark:text-slate-300 text-lg text-slate-700">{item}</p>
        ))}
      </div>
    </div>
  </Reveal>
);

export default ProjectItem;
