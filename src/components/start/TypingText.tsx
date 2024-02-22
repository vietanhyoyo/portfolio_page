"use client"
import { TypeAnimation } from "react-type-animation";

export default function TypingText() {
  return (
    <div>
      <TypeAnimation
        sequence={[
          "I'm a Developer",
          1000,
          "I'm a Designer",
          1000,
        ]}
        speed={50}
        repeat={Infinity}
        className="text-7xl font-bold text-primary"
      />
    </div>
  );
}
