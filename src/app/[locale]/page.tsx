import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  const t = useTranslations();
  redirect(`/${locale}/login`);
}
