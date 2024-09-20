import React from "react";
import Reveal from "../animation/Reveal";

type CompanyInfoProps = {
  role: string;
  company: string;
  children: React.ReactNode
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({ role, company, children }) => {
  return (
    <Reveal>
      <div className="flex">
        <div className="w-10">
          {children}
          
        </div>
        <p className="dark:text-slate-50 text-2xl font-bold text-primary">
          {company}
        </p>
        <p className="dark:text-slate-300/70 text-2xl font-bold text-black/50 pl-2">
          {" • "}
          {role}
        </p>
      </div>
    </Reveal>
  );
};

export default CompanyInfo;
