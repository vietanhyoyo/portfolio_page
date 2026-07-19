import { useTranslations } from "next-intl";
import ExperienceTimeline, {
  type ExperienceEntry,
} from "./ExperienceTimeline";

export default function Experience() {
  const t = useTranslations("Experience");

  const experienceConfigs = [
    { id: "1-1", clientCountryCode: "jp", responsibilityKeys: ["responsibility_1-1_a", "responsibility_1-1_b", "responsibility_1-1_c", "responsibility_1-1_d", "responsibility_1-1_e"] },
    { id: "1-2", clientCountryCode: "jp", includeFullProjectLifecycle: true, responsibilityKeys: ["responsibility_1-2_a", "responsibility_1-2_b", "responsibility_1-2_c"] },
    { id: "2-1", clientCountryCode: "vn", responsibilityKeys: ["responsibility_2-1_a", "responsibility_2-1_b", "responsibility_2-1_c"] },
    { id: "2-2", clientCountryCode: "vn", responsibilityKeys: ["responsibility_2-2_a", "responsibility_2-2_b", "responsibility_2-2_c"] },
    { id: "2-3", clientCountryCode: "vn", responsibilityKeys: ["responsibility_2-3_a", "responsibility_2-3_b"] },
    { id: "2-4", clientCountryCode: "vn", responsibilityKeys: ["responsibility_2-4_a", "responsibility_2-4_b"] },
    { id: "3-1", clientCountryCode: "jp", responsibilityKeys: ["responsibility_3-1_a", "responsibility_3-1_b"] },
    { id: "3-2", clientCountryCode: "eu", responsibilityKeys: ["responsibility_3-2_a", "responsibility_3-2_b", "responsibility_3-2_c", "responsibility_3-2_d"] },
    { id: "3-3", clientCountryCode: "jp", responsibilityKeys: ["responsibility_3-3_a", "responsibility_3-3_b"] },
    { id: "3-4", clientCountryCode: "vn", responsibilityKeys: ["responsibility_3-4_a", "responsibility_3-4_b"] },
  ] as const;

  const experiences: ExperienceEntry[] = experienceConfigs.map((experience) => ({
    id: experience.id,
    projectName: t(`project_name_${experience.id}`),
    clientName: t(`client_${experience.id}`),
    clientCountryCode: experience.clientCountryCode,
    time: t(`time_${experience.id}`),
    facts: [
      `${t("team_menbers")}: ${t(`team_members_${experience.id}`)}`,
      `${t("technologies")}: ${t(`technologies_${experience.id}`)}`,
      `${t("responsibility")}: ${t(`role_${experience.id}`)}`,
      ...("includeFullProjectLifecycle" in experience && experience.includeFullProjectLifecycle
        ? [t("full_project_lifecycle")]
        : []),
    ],
    responsibilities: experience.responsibilityKeys.map((key) => t(key)),
  }));

  return <ExperienceTimeline title={t("title")} experiences={experiences} />;
}
