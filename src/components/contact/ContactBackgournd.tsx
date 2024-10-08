"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ContactBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("inset-0 absolute ", "filter")}>
      {theme == "dark" ? (
        <iframe src='https://my.spline.design/voiceinteractionanimationcopy-1f8b33488fa860c594937c701cfadcca/' width='100%' height='100%'></iframe>
      ) : (
        <iframe src='https://my.spline.design/voiceinteractionanimation-0658adfc2d83f3ec219d63168938831c/' width='100%' height='100%'></iframe>
      )}
    </div>
  );
}
