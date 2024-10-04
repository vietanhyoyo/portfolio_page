"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import Reveal from "../animation/Reveal";

type ContactFormProps = {
    name: string;
    email: string;
    message: string;
    send: string;
    thankMessage: string;
}

export default function ContactForm({name, email, message, send, thankMessage} : ContactFormProps) {
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
  return (
    <div>
      <Reveal>
        {isSubmitted ? (
          <div className="text-green-500 text-xl">
            <p>{thankMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-96 max-w-lg">
            <div className="mb-4">
              <label className="block text-slate-700 dark:text-white text-sm font-bold mb-2">
                {name}
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
                {email}
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
                {message}
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
                {send}
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </div>
  );
}
