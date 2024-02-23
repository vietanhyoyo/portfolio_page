import React from "react";
import Reveal from "../animation/Reveal";

type CompanyInfoProps = {
  date: string;
  company: string;
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({ date, company }) => {
  return (
    <Reveal>
      <p className="dark:text-slate-300 ">{date}</p>
      <p className="dark:text-slate-50 text-2xl font-bold text-primary">{company}</p>
      <div className="w-96 h-1 bg-primary rounded-full my-2"></div>
    </Reveal>
  );
};

export default CompanyInfo;
