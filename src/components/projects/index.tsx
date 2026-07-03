import Link from "next/link";
import Reveal from "../animation/Reveal";
import ProjectItem from "./ProjectItem";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import AnimateCarousel from "./AnimateCarousel";

export default function Projects() {
  const t = useTranslations("Projects");
  const slides = [
    {
      key: "project-7",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/211948513?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
              allow="clipboard-write"
            ></iframe>
          }
          gap={40}
          subTitle="Website"
          title={t("name_7")}
          technicals={["figma", "reactjs", "nodejs", "postgresql"]}
          content={t("detail_7")}
        />
      ),
    },
    {
      key: "project-1",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132863579?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
      key: "project-2",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/209349691?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
      key: "project-3",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/193127651?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
      key: "project-4",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/198626625?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
      key: "project-5",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/132632753?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
      key: "project-6",
      content: (
        <ProjectItem
          image={
            <iframe
              src="https://www.behance.net/embed/project/133727469?ilo0=1"
              className={cn("md:w-[343px] md:h-[269px]", "w-[256px] h-[178px]")}
              allowFullScreen
              loading="lazy"
              scrolling="no"
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
    <div className="relative flex min-h-screen w-full overflow-hidden bg-sky-50 text-slate-950 transition-colors duration-500 dark:bg-[#07111f] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,0.2),transparent_28%)] dark:bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.16),transparent_28%)]" />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center">
        <Reveal className="pt-8 md:pt-10">
          <h1 className="text-4xl font-bold text-primary md:text-5xl">
            Projects
          </h1>
        </Reveal>

        <div className="relative flex w-full flex-1 flex-col items-center pb-8 md:pb-10">
          <AnimateCarousel cards={slides} offset={2} showArrows={true} />

          <div className="mt-8 flex justify-center md:mt-6">
            <Reveal>
              <Link
                href="https://www.behance.net/vitanhbi4"
                target="_blank"
                rel="noreferrer"
                className="project-see-more"
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow" />
                </span>
                <span className="button-text">{t("button_see_more")}</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
