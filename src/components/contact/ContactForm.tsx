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

const inputClassName =
  "flex h-10 w-full rounded-2xl border border-input bg-background px-4 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950/30 dark:hover:border-ring dark:focus-visible:border-ring dark:focus-visible:ring-ring";

const textareaClassName =
  "flex min-h-[120px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950/30 dark:hover:border-ring dark:focus-visible:border-ring dark:focus-visible:ring-ring";

const renderAnimatedButtonText = (text: string, direction: "down" | "in") =>
  Array.from(text).map((character, index) => (
    <span
      key={`${direction}-${character}-${index}`}
      className={cn(
        "inline-block whitespace-pre transition-transform ease-out",
        direction === "down"
          ? "group-hover/send:translate-y-[1.2em]"
          : "-translate-y-[1.2em] group-hover/send:translate-y-0"
      )}
      style={{ transitionDuration: `${200 + index * 100}ms` }}
    >
      {character}
    </span>
  ));

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
        "absolute top-36 py-6 max-w-7xl md:w-1/3 min-w-[360px] md:min-w-[520px] px-6 flex justify-center flex-col items-center rounded-3xl",
        "bg-white/85 dark:bg-slate-800/90 backdrop-blur-lg"
      )}
    >
      <div className="relative w-full">
        <div
          className={cn(
            "absolute top-0 right-0 transform -translate-y-10 text-slate-800 dark:text-white flex justify-center rounded-full py-2 px-4 gap-2 cursor-pointer transition-colors duration-200",
            "bg-white/80 dark:bg-slate-800/90 backdrop-blur-md hover:text-primary dark:hover:text-primary"
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
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity,transform] duration-500 ease-in-out",
            open
              ? "grid-rows-[0fr] -translate-y-2 opacity-0"
              : "grid-rows-[1fr] translate-y-0 opacity-100"
          )}
          aria-hidden={open}
        >
          <div className="overflow-hidden">
            <Reveal>
              <span className="text-slate-700 dark:text-white">{formNote}</span>
            </Reveal>
          </div>
        </div>

        <div
          className={cn(
            "grid origin-top transition-[grid-template-rows,opacity,transform] duration-500 ease-in-out",
            open
              ? "grid-rows-[1fr] translate-y-0 opacity-100"
              : "grid-rows-[0fr] -translate-y-3 opacity-0"
          )}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            {isSubmitted ? (
              <div className="text-green-500 text-xl">
                <Reveal>
                  <p>{thankMessage}</p>
                </Reveal>
              </div>
            ) : isLoading ? (
              <div className="flex justify-center">
                <LoadingDots />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="w-full w-max-96">

                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {name}
                  </label>
                  <input
                    type="text"
                    disabled={!open}
                    className={cn(
                      inputClassName,
                      errors.from_name &&
                      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                    )}
                    {...register("from_name", { required: true })}
                  />
                  {errors.from_name && (
                    <p className="text-destructive text-xs italic mt-1">
                      Please enter your name.
                    </p>
                  )}
                </div>


                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {email}
                  </label>
                  <input
                    type="email"
                    disabled={!open}
                    className={cn(
                      inputClassName,
                      errors.email &&
                      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                    )}
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs italic mt-1">
                      Please enter your email.
                    </p>
                  )}
                </div>



                <div className="mb-4">
                  <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                    {message}
                  </label>
                  <textarea
                    rows={5}
                    disabled={!open}
                    className={cn(
                      textareaClassName,
                      errors.message &&
                      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                    )}
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs italic mt-1">
                      Please enter your message.
                    </p>
                  )}
                </div>



                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={!open}
                    className="group/send relative flex h-[42px] min-w-[96px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-primary px-5 font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={send}
                  >
                    <span className="sr-only">{send}</span>
                    <span aria-hidden="true" className="flex overflow-hidden">
                      {renderAnimatedButtonText(send, "down")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute flex overflow-hidden"
                    >
                      {renderAnimatedButtonText(send, "in")}
                    </span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
