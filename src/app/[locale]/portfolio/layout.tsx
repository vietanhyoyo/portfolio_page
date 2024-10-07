import Header from "@/components/layouts/header";
import SettingButton from "@/components/setting/SettingButton";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className={cn(locale === "en" ? "font-english" : "font-roboto", "relative w-full")}>
      <Header params={{ locale: locale }} />
      <div className="w-full">{children}</div>
      <SettingButton locale={locale} />
    </div>
  );
}
