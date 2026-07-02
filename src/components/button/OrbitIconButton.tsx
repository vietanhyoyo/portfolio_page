import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type OrbitIconButtonProps = {
  href?: string;
  icon: any;
  alt?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
  size?: "sm" | "md";
};

const sizeClassName = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
};

export default function OrbitIconButton({
  href,
  icon,
  alt = "svg-icon",
  onClick,
  className,
  iconClassName,
  iconSize = 20,
  size = "sm",
}: OrbitIconButtonProps) {
  const buttonClassName = cn(
    "start-orbit-button relative isolate grid place-items-center rounded-full overflow-visible",
    "bg-primary dark:bg-card dark:hover:bg-primary",
    sizeClassName[size],
    "transition-transform duration-300 ease-out hover:scale-105",
    "focus:outline-none",
    className
  );

  const content = (
    <>
      <span className="start-orbit-ring start-orbit-ring-outer" />
      <span className="start-orbit-ring start-orbit-ring-inner" />
      <Image
        className={cn("relative z-10", iconClassName)}
        src={icon}
        alt={alt}
        width={iconSize}
        height={iconSize}
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClassName}>
      {content}
    </button>
  );
}
