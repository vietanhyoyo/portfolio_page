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
        <iframe
          src="https://my.spline.design/3dglassherobgcopy-9e785f3caac349e77496d868067f0967/"
          width="100%"
          height="100%"
        ></iframe>
      ) : (
        <iframe
          src="https://my.spline.design/webstack-4e624ad7022d989911ccc69030f0beba/"
          width="100%"
          height="100%"
        ></iframe>
      )}
    </div>
  );
}
