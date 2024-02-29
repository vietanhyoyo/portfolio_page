import TechTag from "../tag/TechTag";

import Image from "next/image";

type Props = {
  image: any;
  subTitle: string;
  title: string;
  technicals: string[];
  content: string;
  oppositeDirection?: boolean;
};

const ProjectItem = ({
  image,
  subTitle,
  title,
  technicals,
  content,
  oppositeDirection = false,
}: Props) => {
  return (
    <div className="flex items-center">
      {oppositeDirection ? (
        <>
          <div className="h-full flex flex-col justify-center text-end">
            <h4 className="text-1xl dark:text-slate-400 text-primary">
              {subTitle}
            </h4>
            <h3 className="text-3xl font-semibold dark:text-white mb-2 mt-1">
              {title}
            </h3>
            <div className="flex justify-end">
              {technicals.map((item) => (
                <TechTag>{item}</TechTag>
              ))}
            </div>
            <p className="dark:text-white flex-1 mt-2">{content}</p>
          </div>
          <div style={{ width: "500px" }}>
            <Image src={image} alt="project-img" />
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "500px" }}>
            <Image src={image} alt="project-img" />
          </div>
          <div className="ml-7 h-full flex flex-col justify-center">
            <h4 className="text-1xl dark:text-slate-400 text-primary">
              {subTitle}
            </h4>
            <h3 className="text-3xl font-semibold dark:text-white mb-2 mt-1">
              {title}
            </h3>
            <div className="flex">
              {technicals.map((item) => (
                <TechTag>{item}</TechTag>
              ))}
            </div>
            <p className="dark:text-white flex-1 mt-2">{content}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectItem;
