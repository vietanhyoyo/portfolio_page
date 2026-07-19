import { useTranslations } from "next-intl";
import type { AudioTrack } from "@/types/audio";
import HeroScene from "./HeroScene";

type StartProps = {
  tracks: AudioTrack[];
};

export default function Start({ tracks }: StartProps) {
  const t = useTranslations("Index");

  return (
    <HeroScene
      tracks={tracks}
      copy={{
        hello: t("hello"),
        myName: t("my_name"),
        developer: t("i_am_a_developer"),
        designer: t("i_am_a_ui/ux_designer"),
        resume: t("resume_content"),
        downloadCv: t("download_cv"),
      }}
    />
  );
}
