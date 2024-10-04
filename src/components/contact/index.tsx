"use client";
import { useForm } from "react-hook-form";
import Reveal from "../animation/Reveal";
import { useState } from "react";
import emailjs from "emailjs-com";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // You need to configure EmailJS with your service ID, template ID, and user ID
  const onSubmit = (data: any) => {
    console.log(data);
    emailjs
      .send("service_mj1wd1c", "template_ez2mgpj", data, "xLjfcOTwPF2B_hJDe")
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
        },
        (err) => {
          console.error("FAILED...", err);
        }
      );
  };

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
    <div className="relative h-[800px] flex justify-center items-center">
      <div
        className={cn(
          "absolute inset-0 bg-[url('/images/backgrounds/bg-02.png')] bg-center bg-fixed",
          "filter grayscale -z-10"
        )}
      />
      <div className="h-full w-full bg-white/90 dark:bg-slate-800/95 flex justify-center absolute">
        <div className="py-10 h-full max-w-7xl w-full flex justify-center flex-col px-4 xl:px-0 items-center">
          <Reveal>
            <h1 className="text-4xl font-bold text-primary mb-6">Contact</h1>
          </Reveal>

          <Reveal>
            {isSubmitted ? (
              <div className="text-green-500 text-xl">
                <p>Thank you! Your message has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="w-96 max-w-lg">
                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="bg-white/80 dark:bg-slate-800/95 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("from_name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your name.
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="bg-white/80 dark:bg-slate-800/95 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your email.
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="bg-white/80 dark:bg-slate-800/95 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your message.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </Reveal>
          <Reveal>
            <div className="flex justify-center items-center gap-4 w-11 mt-12">
              <div className="w-1 h-8 bg-slate-400 dark:bg-white mb-2 rounded-full"></div>
              {renderIcon(
                MailIcon,
                "vanhyoyo@gmail.com",
                "mailto:vanhyoyo@gmail.com"
              )}
              {renderIcon(PhoneIcon, "0358485077", undefined, () => {
                navigator.clipboard.writeText("0358485077");
                alert("Số điện thoại đã được sao chép vào clipboard!");
              })}
              {renderIcon(
                BehanceIcon,
                "behance.net/vitanhbi4",
                "https://www.behance.net/vitanhbi4"
              )}
              <div className="w-1 h-8 bg-slate-400 dark:bg-white mt-2 rounded-full"></div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
