"use client"
import Link from "next/link";
import Image from "next/image";
import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";

export default function ContactIcons() {
  const renderIcon = (
    iconSrc: any,
    info: string,
    href?: string,
    onClick?: () => void
  ) => (
    <div className="relative group">
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary dark:bg-card hover:bg-primary/90 dark:hover:bg-primary w-12 h-12 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700"
        >
          <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="bg-primary dark:bg-card hover:bg-primary/90 dark:hover:bg-primary w-12 h-12 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700"
        >
          <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
        </button>
      )}

      <div className="absolute z-10 top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {info}
          </Link>
        ) : (
          <span>{info}</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      {renderIcon(MailIcon, "vanhyoyo@gmail.com", "mailto:vanhyoyo@gmail.com")}
      {renderIcon(PhoneIcon, "0358485077", undefined, () => {
        navigator.clipboard.writeText("0358485077");
        alert("Số điện thoại đã được sao chép vào clipboard!");
      })}
      {renderIcon(
        BehanceIcon,
        "behance.net/vitanhbi4",
        "https://www.behance.net/vitanhbi4"
      )}
    </>
  );
}
