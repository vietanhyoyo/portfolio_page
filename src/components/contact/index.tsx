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
import ContactBackground from "./ContactBackgournd";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="relative h-[850px] flex justify-center items-center">
      <ContactBackground />

      <div className="absolute top-14">
        <Reveal>
          <h1 className="text-4xl font-bold text-primary mb-6">Contact</h1>
        </Reveal>
      </div>

      <ContactForm
        name={t("name")}
        email={t("email")}
        message={t("message")}
        send={t("send")}
        thankMessage={t("message_sent")}
        formNote={t("message_note_form")}
        openBtnText={t("button_open")}
        closeBtnText={t("button_close")}
      />

      <div className="absolute w-full h-14 bg-white/85 dark:bg-slate-800/80 backdrop-blur-lg bottom-0 flex justify-center items-center text-slate-600 dark:text-white">
        ©vietanh - 2024
      </div>

      <div className="absolute bottom-20">
        <Reveal>
          <div className="flex justify-center items-center gap-4 w-11 mt-12">
            <ContactIcons />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
