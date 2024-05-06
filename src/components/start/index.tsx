import MailIcon from "@/../public/images/icons/mail.svg";
import FacebookIcon from "@/../public/images/icons/facebook.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import DownloadIcon from "@/../public/images/icons/download.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TypingText from "./TypingText";
import Button from "../button/Button";
import OutlineButton from "../button/OutlineButton";
import Reveal from "../animation/Reveal";

export default function Start() {
  const t = useTranslations("Index");

  const renderIcon = (iconSrc: any) => (
    <button className="bg-primary w-9 h-9 grid place-items-center rounded-full my-2 hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700">
      <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
    </button>
  );
  return (
    <div className="h-screen w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full flex justify-center flex-col px-4 xl:px-0">
        <div className="flex justify-between m-auto items-center">
          <div className="lg:flex-1">
            <Reveal>
              <p className="text-5xl font-semibold mb-4 dark:text-white text-slate-700">
                {t("hello")}
                <br />
                {t("my_name")}
              </p>
              <TypingText
                title={t("i_am_a_developer")}
                titleTwo={t("i_am_a_ui/ux_designer")}
              />
            </Reveal>
            <Reveal>
              <p className="mt-4 text-base dark:text-white text-neutral-800">
                {t("resume_content")}
              </p>
            </Reveal>
            <Reveal>
              <div className="pt-3 items-center flex">
                <Button>{t("hire_me")}</Button>
                <OutlineButton className="ml-4" icon={DownloadIcon}>
                  {t("download_cv")}
                </OutlineButton>
              </div>
            </Reveal>
          </div>
          <div className="flex justify-end xl:flex-1 text-right dark:text-white">
            <Reveal>
              <div className="flex justify-center items-center flex-col w-11">
                <div className="w-1 h-8 bg-primary dark:bg-white mb-2 rounded-full"></div>
                {renderIcon(MailIcon)}
                {renderIcon(FacebookIcon)}
                {renderIcon(BehanceIcon)}
                <div className="w-1 h-8 bg-primary dark:bg-white mt-2 rounded-full"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
