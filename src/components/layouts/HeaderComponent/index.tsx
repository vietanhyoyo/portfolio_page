import { tokenKey } from '@/constants/constant';
import Button from 'antd/es/button';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const HeaderComponent = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  locale: string;
}) => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(tokenKey);
    router.push(`/${props.locale}/login`);
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <h1 className="text-slate-800">Welcome</h1>
        </div>

        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </header>
  );
};

export default HeaderComponent;
