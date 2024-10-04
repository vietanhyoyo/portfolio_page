import Reveal from "../animation/Reveal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";
import ContactForm from "./ContactForm";
import ContactIcons from "./ContactIcons";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="relative h-[800px] flex justify-center items-center">
      <div
        className={cn(
          "absolute inset-0 bg-[url('/images/backgrounds/bg-02.png')] bg-center bg-fixed",
          "filter grayscale -z-10"
        )}
      />
      <div className="h-full w-full bg-white/90 dark:bg-slate-800/95 flex justify-center absolute">
        <div className="py-10 h-full max-w-7xl w-full flex justify-center flex-col px-4 xl:px-0 items-center">
          <Reveal>
            <h1 className="text-4xl font-bold text-primary mb-6">Contact</h1>
          </Reveal>

          <ContactForm
            name={t("name")}
            email={t("email")}
            message={t("message")}
            send={t("send")}
            thankMessage={t("message_sent")}
          />
          <Reveal>
            <div className="flex justify-center items-center gap-4 w-11 mt-12">
              <ContactIcons />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
