import MailIcon from "@/../public/images/icons/mail.svg"
import BehanceIcon from "@/../public/images/icons/behance.svg"
import PhoneIcon from "@/../public/images/icons/phone.svg"
import DownloadIcon from "@/../public/images/icons/download.svg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import TypingText from "./TypingText"
import Reveal from "../animation/Reveal"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { GridBackground } from "./GridBackground"
import OrbitIconButton from "../button/OrbitIconButton"
import AudioPlayer from "../audio/AudioPlayer"
import type { AudioTrack } from "@/types/audio"

type StartProps = {
  tracks: AudioTrack[]
}

export default function Start({ tracks }: StartProps) {
  const t = useTranslations("Index")
  const cvPdfUrl =
    "https://drive.google.com/file/d/1i6rEUjqV-nUN3W9KuQUWEJvukAr1Njg3/view?usp=drive_link"

  const renderIcon = (iconSrc: any, info: string, href?: string) => (
    <div className='relative group'>
      <OrbitIconButton href={href} icon={iconSrc} />

      <div
        className={cn(
          "absolute z-10",
          "top-10 right-1/2 transform translate-x-1/2",
          "md:top-12 md:right-auto md:left-0 md:-translate-x-1",
          "bg-gray-700 text-white text-xs rounded py-1 px-2",
          "pointer-events-none translate-y-1 scale-95 opacity-0",
          "transition-all duration-500 ease-out",
          "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
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
      <div className='flex justify-center mx-4 mb:mx-0 m-auto max-w-7xl md:h-full'>
        <div className='flex min-h-[840px] md:h-full md:flex-row flex-col justify-between items-center'>
          <div className='flex md:flex-1 flex-col text-center md:text-start justify-center h-[840px] md:h-full'>
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
                {renderIcon(DownloadIcon, `${t("download_cv")} PDF`, cvPdfUrl)}
                {renderIcon(
                  MailIcon,
                  "vanhyoyo@gmail.com",
                  "mailto:vanhyoyo@gmail.com",
                )}
                {renderIcon(PhoneIcon, "0358485077")}
                {renderIcon(
                  BehanceIcon,
                  "behance.net/vitanhbi4",
                  "https://www.behance.net/vitanhbi4",
                )}
              </div>
            </Reveal>
          </div>
          <Reveal className='flex h-[500px] w-[90%] justify-center text-right dark:text-white md:w-[44%] md:justify-end [container-type:inline-size] [&>div:first-child]:relative [&>div:first-child]:flex [&>div:first-child]:h-full [&>div:first-child]:w-full [&>div:first-child]:justify-center'>
            <div className='mx-auto flex h-full w-fit max-w-full items-end justify-center overflow-hidden'>
              <div className='h-[300px] w-[40px] shrink-0 rounded-full bg-[hsl(211_100%_48%)] shadow-[0_10px_18px_rgba(0,0,0,0.24)]' />
              <div className='relative h-full w-[53.333333cqw] overflow-hidden'>
                <div className='relative flex h-full w-full items-center justify-center'>
                  <div className='absolute bottom-0 left-1/2 z-0 flex -translate-x-1/2 items-end justify-center gap-2'>
                    <div className='h-[400px] w-[50px] shrink-0 rounded-full bg-[hsl(203_96%_68%)]' />
                    <div className='h-[460px] w-[60px] shrink-0 rounded-full bg-[hsl(216_100%_43%)]' />
                    <div className='h-[450px] w-[40px] shrink-0 rounded-full bg-[hsl(211_100%_57%)]' />
                    <div className='h-[480px] w-[70px] shrink-0 rounded-full bg-[hsl(220_96%_52%)]' />
                    <div className='h-[350px] w-[20px] shrink-0 rounded-full bg-[hsl(207_92%_63%)]' />
                    <div className='h-[300px] w-[10px] shrink-0 rounded-full bg-[hsl(213_100%_36%)]' />
                  </div>
                  <Image
                    className='relative z-10 h-auto w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]'
                    width={1200}
                    height={1200}
                    src='/images/character5.png'
                    alt='character'
                  />
                </div>
              </div>
              <div className='h-[260px] w-[40px] shrink-0 rounded-full bg-[hsl(204_95%_62%)] shadow-[0_10px_18px_rgba(0,0,0,0.24)]' />
            </div>
            <div className='absolute bottom-0 left-4 top-[calc(50%_+_33.333333cqw_-_40px)] z-10 flex w-[calc(100%_-_32px)] items-center overflow-visible rounded-[40px] bg-primary p-6 shadow-[0_-10px_18px_rgba(0,0,0,0.28)] dark:bg-[#00539f]'>
              <AudioPlayer tracks={tracks} />
            </div>
          </Reveal>
        </div>
      </div>
    </GridBackground>
  )
}
