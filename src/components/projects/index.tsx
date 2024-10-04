import Link from "next/link";
import Reveal from "../animation/Reveal";
import OutlineButton from "../button/OutlineButton";
import { v4 as uuidv4 } from "uuid";
import ProjectItem from "./ProjectItem";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Dynamically import the AnimateCarousel with SSR disabled
const AnimateCarousel = dynamic(() => import("./AnimateCarousel"), {
  ssr: false,
});

export default function Projects() {
  const t = useTranslations("Projects");
  const slides = [
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132863579?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="Java game"
          title={t("name_1")}
          technicals={["java", "sql server"]}
          content={t("detail_1")}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/209349691?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="UI/UX desgin"
          title={t("name_2")}
          technicals={["figma"]}
          content={t("detail_2")}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/193127651?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="App mobile / Website"
          title={t("name_3")}
          technicals={["flutter", "figma", "nextjs", "nodejs", "mongodb"]}
          content={t("detail_3")}
          link={"https://popcornsound.com/"}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/198626625?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allowFullScreen
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="UI/UX desgin"
          title={t("name_4")}
          technicals={["figma"]}
          content={t("detail_4")}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132632753?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allow="clipboard-write"
              style={{ borderRadius: "0px" }}
            ></iframe>
          }
          gap={40}
          subTitle="Webpage"
          title={t("name_5")}
          technicals={["HTML DOM", "Javascript", "CSS"]}
          content={t("detail_5")}
          link={"https://vietanhyoyo.github.io/graphEditor/"}
        />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/133727469?ilo0=1"
              className={cn("md:w-[404px] md:h-[316px]", "w-[256px] h-[178px]")}
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="C/C++ Game"
          title={t("name_6")}
          technicals={["C/C++"]}
          content={t("detail_6")}
        />
      ),
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-4xl font-bold dark:text-white text-primary mb-6">
            Projects
          </h1>
        </Reveal>
        <Reveal>
          <div className="py-32 relative">
            <AnimateCarousel cards={slides} offset={2} showArrows={false} />
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <Link href="https://www.behance.net/vitanhbi4" target="_blank">
              <OutlineButton>{t("button_see_more")}</OutlineButton>
            </Link>
          </Reveal>
          </div>
        </div>
      </div>
  );
}
