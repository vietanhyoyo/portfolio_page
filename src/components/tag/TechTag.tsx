const TechTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-900 inline-flex p-1 mr-1 rounded items-center max-w-max">
      <span className="text-xs font-light dark:text-slate-50">{children}</span>
    </div>
  );
};

export default TechTag;
