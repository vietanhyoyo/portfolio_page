const TechTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-slate-800/80 bg-white border-2 inline-flex p-1 mr-1 rounded items-center max-w-max dark:border-slate-600">
      <span className="text-xs dark:text-slate-50">{children}</span>
    </div>
  );
};

export default TechTag;
