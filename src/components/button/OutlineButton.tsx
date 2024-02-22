import React from "react";
import Image from "next/image";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const OutlineButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-xl border-2 border-primary px-4 py-2 rounded-md text-primary hover:bg-slate-100 focus:outline-none ${className}`}
    >
      <div className="flex items-center justify-center">
        {icon && (
          <span className="mr-2" style={{ marginLeft: "-6px" }}>
            <Image src={icon} alt="svg-icon" width={20} height={20} />
          </span>
        )}
        {children}
      </div>
    </button>
  );
};

export default OutlineButton;
