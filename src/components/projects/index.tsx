import Link from "next/link";
import { useTranslations } from "next-intl";
import ProjectsCarousel from "./ProjectsCarousel";

export default function Projects() {
  const t = useTranslations("Projects");
  const slides = [
    {
      key: "project-7",
      mediaSrc: "https://www.behance.net/embed/project/211948513?ilo0=1",
      subTitle: "Website",
      title: t("name_7"),
      technicals: ["figma", "reactjs", "nodejs", "postgresql"],
      content: t("detail_7"),
    },
    {
      key: "project-1",
      mediaSrc: "https://www.behance.net/embed/project/132863579?ilo0=1",
      subTitle: "Java game",
      title: t("name_1"),
      technicals: ["java", "sql server"],
      content: t("detail_1"),
    },
    {
      key: "project-2",
      mediaSrc: "https://www.behance.net/embed/project/209349691?ilo0=1",
      subTitle: "UI/UX desgin",
      title: t("name_2"),
      technicals: ["figma"],
      content: t("detail_2"),
    },
    {
      key: "project-3",
      mediaSrc: "https://www.behance.net/embed/project/193127651?ilo0=1",
      subTitle: "App mobile / Website",
      title: t("name_3"),
      technicals: ["flutter", "figma", "nextjs", "nodejs", "mongodb"],
      content: t("detail_3"),
      link: "https://popcornsound.com/",
    },
    {
      key: "project-4",
      mediaSrc: "https://www.behance.net/embed/project/198626625?ilo0=1",
      subTitle: "UI/UX desgin",
      title: t("name_4"),
      technicals: ["figma"],
      content: t("detail_4"),
    },
    {
      key: "project-5",
      mediaSrc: "https://www.behance.net/embed/project/132632753?ilo0=1",
      subTitle: "Webpage",
      title: t("name_5"),
      technicals: ["HTML DOM", "Javascript", "CSS"],
      content: t("detail_5"),
      link: "https://vietanhyoyo.github.io/graphEditor/",
      mediaStyle: { borderRadius: "0px" },
    },
    {
      key: "project-6",
      mediaSrc: "https://www.behance.net/embed/project/133727469?ilo0=1",
      subTitle: "C/C++ Game",
      title: t("name_6"),
      technicals: ["C/C++"],
      content: t("detail_6"),
    },
  ];

  return (
    <div className="section-shell min-h-screen py-24 text-slate-950 dark:text-white sm:py-28">
      <div aria-hidden="true" className="ambient-glow absolute left-1/2 top-0 h-[44rem] w-[min(88rem,140vw)] -translate-x-1/2 opacity-80" />
      <div aria-hidden="true" className="ambient-glow absolute -left-[24rem] top-1/2 h-[48rem] w-[48rem] opacity-50" />
      <div className="section-container">
        <div className="relative w-full">
          <ProjectsCarousel heading="Projects" slides={slides} />

          <div className="mt-10 flex justify-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
