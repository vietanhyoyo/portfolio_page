import { cn } from "@/lib/utils";
import Image from "next/image";
import { Star } from "lucide-react";

type SkillCardProps = {
  title: string;
  content?: string;
  iconSrc: any;
  starCount?: number;
};

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  content,
  iconSrc,
  starCount = 0,
}) => {
  const totalStars = 3;
  return (
    <div
      className={cn(
        "min-w-60 max-w-80 h-[360px] shadow-lg p-6 gap-4 rounded-3xl flex justify-center items-center flex-col",
        "dark:bg-slate-900/40 bg-slate-100/80",
        "text-slate-800/80 dark:text-white",
        // "dark:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]",
        "dark:shadow-primary/10 dark:shadow-2xl"
      )}
    >
      <div className="relative w-[80px] h-[80px] flex items-center justify-center ">
        <div
          className={cn(
            "absolute inset-0 w-[80px] h-[80px] rounded-full border-2 border-dashed animate-spin-slow-6",
            "border-slate-300 dark:border-slate-500"
          )}
        ></div>
        <Image
          src={iconSrc}
          alt={title}
          style={{ height: "34px", width: "auto" }}
          className="relative z-10"
        />
      </div>

      <h3 className="text-3xl font-semibold">{title}</h3>
      <div className="flex flex-col justify-center h-20">
        <p className="text-center dark:text-slate-400">{content}</p>
      </div>
      <div className="flex gap-4">
        {Array.from({ length: totalStars }, (_, index) => (
          <Star
            key={index}
            className={cn(
              "h-6 w-6",
              index < starCount ? "stroke-primary" : "stroke-slate-400"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
