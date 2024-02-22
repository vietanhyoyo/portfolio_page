"use client";
import { motion, useAnimate, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  width?: "fit-content" | "100%";
};

const Reveal: React.FC<Props> = ({
  children,
  className = "",
  width,
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);
  return (
    <div ref={ref} style={{ width, position: "relative" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { right: 0 },
          visible: { right: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.2, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          borderRadius: 10,
          background: "#3C50E0",
          zIndex: 20,
        }}
      ></motion.div>
    </div>
  );
};

export default Reveal;
function useRes(arg0: null) {
  throw new Error("Function not implemented.");
}
