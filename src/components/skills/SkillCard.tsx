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
  console.log(color)
  return (
    <div className="prespective group">
      <div className="group-hover:rotate-y-180 duration-500 preserve-3d w-[308px] h-[360px] relative">
        <div
          className={cn(
            "absolute h-full shadow-lg p-6 gap-4 rounded-3xl flex justify-center items-center flex-col",
            "dark:bg-slate-900/40 bg-slate-100/80",
            "text-slate-800/80 dark:text-white",
            "backface-hidden",
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
        <div
          className={cn(
            "absolute h-full shadow-lg p-6 gap-4 rounded-3xl flex justify-center items-center flex-col",
            "text-white",
            // color
            //   ? "bg-[" + "color" + "] dark:bg-[" + "color" + "]/30"
            //   : "bg-primary dark:bg-primary/30",
            "rotate-y-180 backface-hidden",
            "dark:shadow-primary/10 dark:shadow-2xl"
          )}
          style={{backgroundColor: color}}
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
                  index < starCount ? "stroke-white" : "stroke-slate-200/50"
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
