import Reveal from "../animation/Reveal";

type DetailItem =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "bullets";
      items: string[];
    };

const ProjectItem = ({
  title,
  descriptions,
}: {
  title: string;
  descriptions: DetailItem[];
}) => (
  <Reveal>
    <div className="mt-3 flex text-slate-800/80">
      <div>
        <div className="text-md font-semibold dark:text-slate-50/90">
          {title}
        </div>
        <div className="pt-1 dark:text-slate-50/70">
          {descriptions.map((item, index) => (
            item.type === "text" ? (
              <p key={index} className="text-base">
                {item.content}
              </p>
            ) : (
              <ul key={index} className="pl-6">
                {item.items.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="text-base list-disc">
                    {bullet}
                  </li>
                ))}
              </ul>
            )
          ))}
        </div>
      </div>
    </div>
  </Reveal>
);

export default ProjectItem;
