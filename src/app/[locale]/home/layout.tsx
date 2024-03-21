import Header from '@/components/layouts/header';

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Header
        params={{
          locale: locale,
        }}
      >
        {' '}
        <div>{children}</div>
      </Header>
    </div>
  );
}
