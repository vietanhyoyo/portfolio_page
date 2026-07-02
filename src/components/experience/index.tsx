import { useTranslations } from "next-intl"
import Reveal from "../animation/Reveal"
import CompanyInfo from "./CompanyInfo"
import ProjectItem from "./ProjectItem"

export default function Experience() {
  const t = useTranslations("Experience")

  const experienceConfigs = [
    {
      id: "1-1",
      responsibilityKeys: [
        "responsibility_1-1_a",
        "responsibility_1-1_b",
        "responsibility_1-1_c",
        "responsibility_1-1_d",
        "responsibility_1-1_e",
      ],
    },
    {
      id: "1-2",
      includeFullProjectLifecycle: true,
      responsibilityKeys: [
        "responsibility_1-2_a",
        "responsibility_1-2_b",
        "responsibility_1-2_c",
      ],
    },
    {
      id: "2-1",
      responsibilityKeys: [
        "responsibility_2-1_a",
        "responsibility_2-1_b",
        "responsibility_2-1_c",
      ],
    },
    {
      id: "2-2",
      responsibilityKeys: [
        "responsibility_2-2_a",
        "responsibility_2-2_b",
        "responsibility_2-2_c",
      ],
    },
    {
      id: "2-3",
      responsibilityKeys: [
        "responsibility_2-3_a",
        "responsibility_2-3_b",
      ],
    },
    {
      id: "2-4",
      responsibilityKeys: [
        "responsibility_2-4_a",
        "responsibility_2-4_b",
      ],
    },
    {
      id: "3-1",
      responsibilityKeys: [
        "responsibility_3-1_a",
        "responsibility_3-1_b",
      ],
    },
    {
      id: "3-2",
      responsibilityKeys: [
        "responsibility_3-2_a",
        "responsibility_3-2_b",
        "responsibility_3-2_c",
        "responsibility_3-2_d",
      ],
    },
    {
      id: "3-3",
      responsibilityKeys: [
        "responsibility_3-3_a",
        "responsibility_3-3_b",
      ],
    },
    {
      id: "3-4",
      responsibilityKeys: [
        "responsibility_3-4_a",
        "responsibility_3-4_b",
      ],
    },
  ]

  const experiences = experienceConfigs.map((experience) => ({
    projectName: t(`project_name_${experience.id}`),
    time: t(`time_${experience.id}`),
    descriptions: [
      {
        type: "text" as const,
        content: `- ${t("team_menbers")}: ${t(`team_members_${experience.id}`)}`,
      },
      {
        type: "text" as const,
        content: `- ${t("technologies")}: ${t(`technologies_${experience.id}`)}`,
      },
      {
        type: "text" as const,
        content: `- ${t("responsibility")}: ${t(`role_${experience.id}`)}`,
      },
      ...(experience.includeFullProjectLifecycle
        ? [
            {
              type: "text" as const,
              content: `- ${t("full_project_lifecycle")}`,
            },
          ]
        : []),
      {
        type: "bullets" as const,
        items: experience.responsibilityKeys.map((key) => t(key)),
      },
    ],
  }))

  return (
    <div className='w-full bg-slate-50 dark:bg-slate-800 flex justify-center'>
      <div className='py-14 max-w-7xl h-full w-full flex justify-center flex-col px-6 xl:px-0'>
        <Reveal>
          <div className='text-4xl font-bold dark:text-white text-black/50 dark:text-state-50 mb-6'>
            {t("title")}
          </div>
        </Reveal>
        <Reveal>
          <div className='w-80 md:w-96 h-1 bg-primary rounded-full mb-8'></div>
        </Reveal>
        <div className='w-full mb-5 flex flex-col gap-12'>
          {experiences.map((experience) => (
            <div key={experience.projectName} className='leading-7'>
              <CompanyInfo projectName={experience.projectName} />
              <div className='border-l-2 border-black/30 dark:border-primary pl-7 mt-3'>
                <Reveal>
                  <p className='text-black/50 dark:text-primary'>
                    {experience.time}
                  </p>
                </Reveal>
                <ProjectItem descriptions={experience.descriptions} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
