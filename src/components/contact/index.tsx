import { useTranslations } from "next-intl";
import ContactSection from "./ContactSection";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <ContactSection
      copy={{
        name: t("name"),
        email: t("email"),
        message: t("message"),
        send: t("send"),
        thankMessage: t("message_sent"),
        formNote: t("message_note_form"),
        openBtnText: t("button_open"),
        closeBtnText: t("button_close"),
      }}
    />
  );
}
