import Image from "next/image";

type SkillCardProps = {
  title: string;
  content?: string;
  iconSrc: any;
};

const SkillCard: React.FC<SkillCardProps> = ({ title, content, iconSrc }) => {
  return (
    <div
      className="min-w-60 max-w-80 h-96
     dark:bg-slate-800 bg-slate-100  border border-slate-700
     shadow-lg p-7 rounded-md flex items-center flex-col"
    >
      <Image
        src={iconSrc}
        alt={title}
        style={{ height: "110px", width: "auto" }}
      />
      <h3 className="text-3xl font-semibold dark:text-white mb-8 mt-6">
        {title}
      </h3>
      <p className="dark:text-white text-center flex-1">{content}</p>
    </div>
  );
};

export default SkillCard;
