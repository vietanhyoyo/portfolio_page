import React from "react";
import Image from "next/image";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
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
            {icon}
          </span>
        )}
        {children}
      </div>
    </button>
  );
};

export default OutlineButton;
