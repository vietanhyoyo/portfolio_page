import { useState } from "react";
import { useRouter } from "../../hook/navigation";
import Image from "next/image";
import VietNamIcon from "@/../public/images/icons/vietnam.svg";
import USAIcon from "@/../public/images/icons/usa.svg";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  locale: string;
};

export default function LanguageButton({ className, locale }: Props) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);

  const changeLanguage = (locale: any) => {
    router.replace("/portfolio", { locale: locale });
    setSelectedLanguage(locale);
  };

  return (
    <button
      type="button"
      onClick={() => changeLanguage(locale === "en" ? "vi" : "en")}
      className={cn(
        "w-12 h-12 flex justify-center place-items-center backdrop-blur-lg",
        "bg-card rounded-full",
        "dark:border-gray-600 p-2",
        "uppercase leading-normal text-white",
        "transition duration-150 ease-in-out",
        "hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",
        "focus:ring-4 dark:focus:ring-primary-600 focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none",
        "active:bg-primary-700",
        "shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      )}
    >
      <Image
        src={selectedLanguage === "en" ? USAIcon : VietNamIcon}
        alt="svg-icon"
        width={20}
        height={20}
      />
    </button>
  );
}
