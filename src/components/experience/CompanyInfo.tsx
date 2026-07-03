import React from "react";
import Reveal from "../animation/Reveal";

type CompanyInfoProps = {
  projectName: string;
  clientName: string;
  clientCountryCode: string;
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  projectName,
  clientName,
  clientCountryCode,
}) => {
  return (
    <Reveal>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <p className="min-w-0 flex-1 break-words text-lg font-bold leading-tight text-black dark:text-slate-50 sm:text-xl md:text-2xl">
          {projectName}
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary md:px-2.5 md:text-xs">
          <span
            aria-hidden="true"
            className={`fi fi-${clientCountryCode} rounded-[2px] text-sm shadow-sm`}
          />
          <span className="hidden md:inline">{clientName}</span>
        </span>
      </div>
    </Reveal>
  );
};

export default CompanyInfo;
