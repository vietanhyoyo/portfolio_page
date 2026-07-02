"use client"
import Link from "next/link";
import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";
import OrbitIconButton from "../button/OrbitIconButton";

export default function ContactIcons() {
  const renderIcon = (
    iconSrc: any,
    info: string,
    href?: string,
    onClick?: () => void
  ) => (
    <div className="relative group">
      <OrbitIconButton href={href} icon={iconSrc} onClick={onClick} size="md" />

      <div className="absolute z-10 top-14 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 pointer-events-none translate-y-1 scale-95 opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
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
