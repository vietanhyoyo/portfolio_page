"use client";
import { TypeAnimation } from "react-type-animation";

type Props = {
  title: string;
  titleTwo: string;
};

export default function TypingText({ title, titleTwo }: Props) {
  return (
    <div>
      <TypeAnimation
        sequence={[title, 1000, titleTwo, 1000]}
        speed={50}
        repeat={Infinity}
        className="text-7xl font-bold text-primary"
      />
    </div>
  );
}
