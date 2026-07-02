import React from "react";
import Reveal from "../animation/Reveal";

type CompanyInfoProps = {
  projectName: string;
};

const CompanyInfo: React.FC<CompanyInfoProps> = ({ projectName }) => {
  return (
    <Reveal>
      <div className="flex min-w-0">
        <p className="break-words text-xl font-bold text-primary dark:text-slate-50 sm:text-2xl">
          {projectName}
        </p>
      </div>
    </Reveal>
  );
};

export default CompanyInfo;
