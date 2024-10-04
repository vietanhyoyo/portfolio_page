"use client"
import { useForm } from "react-hook-form";
import Reveal from "../animation/Reveal";
import { useState } from "react";
import emailjs from 'emailjs-com';

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // You need to configure EmailJS with your service ID, template ID, and user ID
  const onSubmit = (data: any) => {
    console.log(data)
    emailjs.send('service_mj1wd1c', 'template_ez2mgpj', data, 'xLjfcOTwPF2B_hJDe')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 flex justify-center">
      <div className="py-10 max-w-7xl h-full w-full flex justify-center flex-col px-4 xl:px-0 items-center">
        <Reveal>
          <h1 className="text-4xl font-bold dark:text-white text-primary mb-6">
            Contact
          </h1>
        </Reveal>

        {isSubmitted ? (
          <div className="text-green-500">
            <p>Thank you! Your message has been sent.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("from_name", { required: true })}
              />
              {errors.name && <p className="text-red-500 text-xs italic">Please enter your name.</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500 text-xs italic">Please enter your email.</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("message", { required: true })}
              />
              {errors.message && <p className="text-red-500 text-xs italic">Please enter your message.</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
