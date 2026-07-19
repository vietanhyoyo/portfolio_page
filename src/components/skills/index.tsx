import { useTranslations } from "next-intl";
import SkillsGrid, { type SkillItem } from "./SkillsGrid";

export default function Skills() {
  const t = useTranslations("Skill");

  const skills: SkillItem[] = [
    { title: "Flutter", iconSrc: "/images/skills/flutter.png", content: t("flutter"), starCount: 3, color: "#29B5F6" },
    { title: "React", iconSrc: "/images/skills/react.png", content: t("react"), starCount: 3, color: "#15BEDE" },
    { title: "Figma", iconSrc: "/images/skills/figma.png", content: t("figma"), starCount: 3, color: "#A25BFF" },
    { title: "Node.js", iconSrc: "/images/skills/node.png", content: t("node"), starCount: 3, color: "#60B147" },
    { title: "Vue", iconSrc: "/images/skills/vue.png", content: t("vue"), starCount: 3, color: "#41B782" },
    { title: "Java", iconSrc: "/images/skills/java.png", content: t("java"), starCount: 2, color: "#E76F00" },
    { title: "Database", iconSrc: "/images/skills/database.png", content: t("database"), starCount: 2, color: "#006CF0" },
    { title: "Docker", iconSrc: "/images/skills/docker.png", content: t("docker"), starCount: 2, color: "#089CEC" },
    { title: "Ruby", iconSrc: "/images/skills/ruby.png", content: t("ruby"), starCount: 2, color: "#CC342D" },
  ];

  return <SkillsGrid skills={skills} />;
}
