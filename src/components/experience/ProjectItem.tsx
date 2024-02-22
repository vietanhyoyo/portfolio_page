import Reveal from "../animation/Reveal";

const ProjectItem = ({
  title,
  descriptions,
}: {
  title: string;
  descriptions: string[];
}) => (
  <Reveal>
    <div className="mt-3">
      <p className="dark:text-slate-50 text-xl font-semibold">
        &#10022;&nbsp;{title}
      </p>
      <div className="pl-5 pt-1">
        {descriptions.map((item) => (
          <p className="dark:text-slate-300 text-lg">{item}</p>
        ))}
      </div>
    </div>
  </Reveal>
);

export default ProjectItem;
