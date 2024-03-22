import { useState } from "react";
import { useRouter } from "../../../hook/navigation";
import Image from "next/image";
import VietNamIcon from "@/../public/images/icons/vietnam.svg";
import USAIcon from "@/../public/images/icons/usa.svg";

type Props = {
  className: string;
  locale: string;
};

export default function LanguageButton({ className, locale }: Props) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(locale);
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (locale: string) => {
    router.replace("/portfolio", { locale: locale });
    setSelectedLanguage(locale);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderButton = (locale: string, icon: string, label: string) => (
    <button
      type="button"
      onClick={() => changeLanguage(locale)}
      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <div className="flex items-center">
        <Image src={icon} alt="svg-icon" width={20} height={20} />
        <span className="ms-2">{label}</span>
      </div>
    </button>
  );

  return (
    <div className={"flex relative h-9 justify-center flex-col " + className}>
      <button
        onClick={toggleDropdown}
        className="rounded-3xl flex-shrink-0 z-10 inline-flex items-center h-full px-2 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-slate-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        <Image
          src={selectedLanguage === "en" ? USAIcon : VietNamIcon}
          alt="svg-icon"
          width={20}
          height={20}
        />
        <span className="ms-2">{selectedLanguage === "en" ? "EN" : "VN"}</span>
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {showDropdown === true ? (
        <div
          id="dropdown-states"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-12 "
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="states-button"
          >
            <li>{renderButton("en", USAIcon, "English")}</li>
            <li>{renderButton("vi", VietNamIcon, "Vietnamese")}</li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
