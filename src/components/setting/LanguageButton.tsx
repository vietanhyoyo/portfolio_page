import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  const changeLanguage = (nextLocale: "en" | "vi") => {
    const nextPathname = pathname.match(/^\/(en|vi)(?=\/|$)/)
      ? pathname.replace(/^\/(en|vi)(?=\/|$)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
    router.replace(nextPathname);
  };

  return (
    <button
      type="button"
      onClick={() => changeLanguage(locale === "en" ? "vi" : "en")}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full p-2",
        "bg-white/70 dark:bg-white/10",
        "uppercase leading-normal text-white",
        "transition duration-150 ease-in-out",
        "hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",
        "focus:ring-4 dark:focus:ring-primary-600 focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none",
        "active:bg-primary-700",
        "shadow-sm",
        className,
      )}
    >
      <Image
        src={locale === "en" ? USAIcon : VietNamIcon}
        alt={locale === "en" ? "Switch to Vietnamese" : "Switch to English"}
        width={20}
        height={20}
      />
    </button>
  );
}
