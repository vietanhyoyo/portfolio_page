import Header from "@/components/layouts/header";
import SettingButton from "@/components/setting/SettingButton";

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className={locale === "en" ? "font-english" : "font-roboto"}>
      <Header params={{ locale: locale }} />
      <div>{children}</div>
      <SettingButton locale={locale} />
    </div>
  );
}
