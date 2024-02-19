import useColorMode from "@/hook/useColorMode";
import Image from "next/image";
import SunIcon from "@/../public/images/icons/sun.svg";
import MoonIcon from "@/../public/images/icons/moon.svg";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <button
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      onClick={() => {
        if (typeof setColorMode === "function") {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }
      }}
      className="w-9 h-9 place-items-center shadow-[0_4px_1px_-4px_rgba(255,255,255,0.1),0_4px_10px_0_rgba(255,255,255,0.1)] inline-block rounded-full bg-primary dark:bg-slate-800 p-2 uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    >
      <Image
        src={colorMode === "light" ? SunIcon : MoonIcon}
        alt="svg-icon"
        width={20}
        height={20}
      />
    </button>
  );
};

export default DarkModeSwitcher;
