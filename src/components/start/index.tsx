import MailIcon from "@/../public/images/icons/mail.svg";
import FacebookIcon from "@/../public/images/icons/facebook.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Start() {
  const t = useTranslations("Index");

  const renderIcon = (iconSrc: any) => (
    <button className="bg-primary w-9 h-9 grid place-items-center rounded-full my-2 hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700">
      <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
    </button>
  );
  return (
    <div className="h-screen w-full bg-slate-200 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full flex justify-center flex-col">
        <div className="flex justify-between m-auto">
          <div className="flex-1">
            <p className="text-7xl font-semibold mb-4 dark:text-white text-primary">
              {t("title")}
              Hello!!! <br />
              My name is Anh
            </p>
            <p className="text-lg dark:text-white text-neutral-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ultrices lectus, ut fringilla sem. Nulla facilisi. Phasellus in
              nisl a ex bibendum dictum. Ut eget enim eget neque laoreet varius
              a quis erat.
            </p>
          </div>
          <div className="flex justify-end flex-1 text-right dark:text-white">
            <div className="flex justify-center items-center flex-col w-11">
              <div className="w-1 h-8 bg-primary dark:bg-white mb-2 rounded-full"></div>
              {renderIcon(MailIcon)}
              {renderIcon(FacebookIcon)}
              {renderIcon(BehanceIcon)}
              <div className="w-1 h-8 bg-primary dark:bg-white mt-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
