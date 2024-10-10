"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, ChevronDown } from "lucide-react";
import emailjs from "emailjs-com";
import Reveal from "../animation/Reveal";
import { cn } from "@/lib/utils";
import LoadingDots from "../loading";

type ContactFormProps = {
  name: string;
  email: string;
  message: string;
  send: string;
  thankMessage: string;
  formNote: string;
  openBtnText: string;
  closeBtnText: string;
};

export default function ContactForm({
  name,
  email,
  message,
  send,
  thankMessage,
  formNote,
  openBtnText,
  closeBtnText,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  // You need to configure EmailJS with your service ID, template ID, and user ID
  const onSubmit = (data: any) => {
    setIsLoading(true);
    emailjs
      .send("service_mj1wd1c", "template_ez2mgpj", data, "xLjfcOTwPF2B_hJDe")
      .then(
        (response) => {
          setIsLoading(false);
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
        },
        (err) => {
          setIsLoading(false);
          console.error("FAILED...", err);
        }
      );
  };
  return (
    <div
      className={cn(
        "absolute top-36 py-6 max-w-7xl md:w-1/3 min-w-[360px] md:min-w-[520px] px-4 flex justify-center flex-col items-center rounded-xl",
        "bg-white/85 dark:bg-slate-800/90 backdrop-blur-lg"
      )}
    >
      <div className="relative w-full">
        <div
          className={cn(
            "absolute top-0 right-0 transform -translate-y-10 text-slate-800 dark:text-white flex justify-center border-2 rounded-full px-4 gap-2 cursor-pointer",
            "bg-white/80 dark:bg-slate-800/90 backdrop-blur-md"
          )}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span>{open ? closeBtnText : openBtnText}</span>
          {open ? (
            <X width={24} height={24} />
          ) : (
            <ChevronDown width={24} height={24} />
          )}
        </div>
        {open ? (
          isSubmitted ? (
            <div className="text-green-500 text-xl">
              <Reveal>
                <p>{thankMessage}</p>
              </Reveal>
            </div>
          ) : (
            isLoading ? <div className="flex justify-center"><LoadingDots /></div> :
            <form onSubmit={handleSubmit(onSubmit)} className="w-full w-max-96">
              <Reveal>
                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {name}
                  </label>
                  <input
                    type="text"
                    className="bg-white/70 dark:bg-slate-800/80 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("from_name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your name.
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {email}
                  </label>
                  <input
                    type="email"
                    className="bg-white/70 dark:bg-slate-800/80 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your email.
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal>
                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {message}
                  </label>
                  <textarea
                    rows={5}
                    className="bg-white/70 dark:bg-slate-800/80 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs italic">
                      Please enter your message.
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {send}
                  </button>
                </div>
              </Reveal>
            </form>
          )
        ) : (
          <Reveal>
            <span className="text-slate-700 dark:text-white">{formNote}</span>
          </Reveal>
        )}
      </div>
    </div>
  );
}
