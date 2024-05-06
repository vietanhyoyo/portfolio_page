import Link from "next/link";
import TechTag from "../tag/TechTag";

type Props = {
  image: React.ReactNode;
  subTitle: string;
  title: string;
  technicals: string[];
  content: string;
  oppositeDirection?: boolean;
  imageWidth?: any;
  gap?: any;
  link?: string | null;
  className?: string
};

const ProjectItem = ({
  image,
  subTitle,
  title,
  technicals,
  content,
  oppositeDirection = false,
  imageWidth = 500,
  gap = 0,
  link,
  className
}: Props) => {
  return (
    <div className={`flex items-center ${className}`}>
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
            {link != null && (
              <Link
                href={link}
                className="text-primary hover:text-blue-800"
              >
                {link}
              </Link>
            )}
          </div>
          <div style={{ width: imageWidth, marginLeft: gap }}>
            {image}
          </div>
        </>
      ) : (
        <>
          <div style={{ width: imageWidth, marginRight: gap }}>
          {image}
          </div>
          <div className="h-full flex flex-col justify-center">
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
            {link != null && (
              <Link
                href={link}
                className="text-primary hover:text-blue-800"
              >
                {link}
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectItem;
