import React from "react";
import Reveal from "../animation/Reveal";

type CompanyInfoProps = {
  role: string;
  company: string;
  children: React.ReactNode;
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({ role, company, children }) => {
  return (
    <Reveal>
      <div className="flex items-start gap-3">
        <div className="w-10 shrink-0 pt-1">
          {children}
        </div>
        <div className="flex min-w-0 flex-col sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-xl font-bold text-primary dark:text-slate-50 sm:text-2xl">
            {company}
          </p>
          <p className="text-lg font-bold text-black/50 dark:text-slate-300/70 sm:pl-2 sm:text-2xl">
            <span className="hidden sm:inline">{" • "}</span>
            {role}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export default CompanyInfo;
