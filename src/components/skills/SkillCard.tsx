import { cn } from "@/lib/utils";
import Image from "next/image";
import { Star } from "lucide-react";

type SkillCardProps = {
  title: string;
  content?: string;
  iconSrc: any;
  starCount?: number;
  color?: string;
};

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  content,
  iconSrc,
  starCount = 0,
  color,
}) => {
  const totalStars = 3;
  return (
    <div className="prespective group shrink-0">
      <div className="group-hover:rotate-y-180 duration-500 preserve-3d w-[308px] h-[360px] relative">
        <div
          className={cn(
            "absolute h-full shadow-lg p-6 gap-4 rounded-3xl flex justify-center items-center flex-col",
            "dark:bg-slate-900/40 bg-slate-100/80",
            "text-slate-800/80 dark:text-white",
            "backface-hidden",
            "transition-[filter,background-color,box-shadow] duration-500",
            "dark:shadow-primary/10 dark:shadow-2xl",
            "group-hover:brightness-110 group-hover:saturate-125",
            "group-hover:shadow-[0_0_44px_rgba(59,130,246,0.48)] dark:group-hover:shadow-[0_0_52px_rgba(96,165,250,0.54)]"
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
                  index < starCount
                    ? "fill-primary stroke-primary"
                    : "fill-transparent stroke-slate-400"
                )}
              />
            ))}
          </div>
        </div>
        <div
          className={cn(
            "absolute h-full shadow-lg p-6 gap-4 rounded-3xl flex justify-center items-center flex-col",
            "text-white",
            "rotate-y-180 backface-hidden",
            "transition-[filter,box-shadow] duration-500",
            "dark:shadow-primary/10 dark:shadow-2xl",
            "group-hover:brightness-125 group-hover:saturate-125",
            "group-hover:shadow-[0_0_44px_var(--skill-glow-color)]"
          )}
          style={{
            backgroundColor: color,
            "--skill-glow-color": `${color}66`,
          } as React.CSSProperties}
        >
          <div className="relative w-[80px] h-[80px] flex items-center justify-center bg-white dark:bg-white/80 rounded-full">
            <div
              className={cn(
                "absolute inset-0 w-[80px] h-[80px] rounded-full border-2 border-dashed animate-spin-slow-6",
                "border-slate-300 dark:border-slate-500/50"
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
            <p className="text-center">{content}</p>
          </div>
          <div className="flex gap-4">
            {Array.from({ length: totalStars }, (_, index) => (
              <Star
                key={index}
                className={cn(
                  "h-6 w-6",
                  index < starCount
                    ? "fill-white stroke-white"
                    : "fill-transparent stroke-slate-200/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
