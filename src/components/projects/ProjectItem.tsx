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
  className?: string;
};

const ProjectItem = ({
  image,
  subTitle,
  title,
  technicals,
  content,
  link,
  className,
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center bg-card ${className} rounded-lg p-4 text-slate-800`}
    >
      <div className="w-404px rounded-lg overflow-x-hidden">{image}</div>
      <div className="h-full flex flex-col justify-center pt-6">
        <h4 className="text-1xl dark:text-slate-400 text-primary">
          {subTitle}
        </h4>
        <h3 className="text-2xl font-semibold dark:text-white mb-2 mt-1">
          {title}
        </h3>
        <p className="dark:text-white flex-1 my-1">{content}</p>
        {link != null && (
          <Link href={link} className="text-primary hover:text-blue-800">
            {link}
          </Link>
        )}
        <div className="flex mt-4">
          {technicals.map((item, index) => (
            <TechTag key={index}>{item}</TechTag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
