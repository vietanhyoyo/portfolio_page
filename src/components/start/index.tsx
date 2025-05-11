import MailIcon from "@/../public/images/icons/mail.svg"
import BehanceIcon from "@/../public/images/icons/behance.svg"
import PhoneIcon from "@/../public/images/icons/phone.svg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import TypingText from "./TypingText"
import Reveal from "../animation/Reveal"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { GridBackground } from "./GridBackground"

export default function Start() {
  const t = useTranslations("Index")

  const renderIcon = (iconSrc: any, info: string, href?: string) => (
    <div className='relative group'>
      {href ? (
        <Link
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-primary w-9 h-9 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700'
        >
          <Image src={iconSrc} alt='svg-icon' width={20} height={20} />
        </Link>
      ) : (
        <button className='bg-primary w-9 h-9 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700'>
          <Image src={iconSrc} alt='svg-icon' width={20} height={20} />
        </button>
      )}

      <div
        className={cn(
          "absolute z-10",
          "top-10 right-1/2 transform translate-x-1/2",
          "md:top-12 md:right-auto md:left-0 md:-translate-x-1",
          "bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        {href ? (
          <Link href={href} target='_blank' rel='noopener noreferrer'>
            {info}
          </Link>
        ) : (
          <span>{info}</span>
        )}
      </div>
    </div>
  )

  return (
    <GridBackground>
        <div className='flex justify-center mx-4 mb:mx-0 m-auto max-w-7xl'>
          <div className='flex md:flex-row flex-col justify-between items-center h-min'>
            <div className='flex md:flex-1 flex-col text-center md:text-start justify-center h-[840px] md:h-auto'>
              <Reveal>
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 dark:text-white text-slate-700'>
                  {t("hello")}
                  <br />
                  {t("my_name")}
                </p>
                <TypingText
                  title={t("i_am_a_developer")}
                  titleTwo={t("i_am_a_ui/ux_designer")}
                />
              </Reveal>
              <Reveal>
                <p className='mt-4 text-base dark:text-white text-neutral-800 w-full'>
                  {t("resume_content")}
                </p>
              </Reveal>
              <Reveal>
                <div className='flex justify-center md:justify-start items-center flex-row gap-4 mt-8'>
                  {renderIcon(
                    MailIcon,
                    "vanhyoyo@gmail.com",
                    "mailto:vanhyoyo@gmail.com"
                  )}
                  {renderIcon(PhoneIcon, "0358485077")}
                  {renderIcon(
                    BehanceIcon,
                    "behance.net/vitanhbi4",
                    "https://www.behance.net/vitanhbi4"
                  )}
                </div>
              </Reveal>
            </div>
            <div className='flex justify-center md:justify-end items-end text-right dark:text-white w-[90%] md:w-[44%]'>
              <Reveal className='md:ml-20'>
                <Image
                  width={1800}
                  height={1800}
                  src='/images/character4.png'
                  alt='character'
                />
              </Reveal>
            </div>
          </div>
        </div>
    </GridBackground>
  )
}
