'use client';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import { usePathname } from 'next/navigation';
import HeaderComponent from '../HeaderComponent';

type Props = {
  params: { locale: string };
  children: React.ReactNode;
};

export default function Header({ params: { locale }, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();
  const isLoginPage = pathName.includes('/login');

  return (
    <>
      {isLoginPage ? (
        <div>{children}</div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <HeaderComponent
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              locale={locale}
            />
            <main>
              <div className="mx-auto">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

const Drawer = ({
  isOpen,
  closeDrawer,
}: {
  isOpen: boolean;
  closeDrawer: () => void;
}) => {
  return (
    <div
      className={`${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
      } transition-transform duration-300 ease-in-out top-0 left-0 h-full bg-gray-800 p-6 z-50 overflow-hidden`}
    >
      <button className="text-white" onClick={closeDrawer}>
        Close
      </button>
    </div>
  );
};
