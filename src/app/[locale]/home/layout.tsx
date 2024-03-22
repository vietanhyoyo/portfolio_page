import Header from '@/components/layouts/header';
import { ConfigProvider } from 'antd';

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return <Header params={{ locale: locale }}>{children}</Header>;
}
