const TechTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex max-w-max items-center rounded border border-sky-100 bg-sky-50/90 p-1 backdrop-blur dark:border-white/10 dark:bg-white/10">
      <span className="text-xs text-sky-800 dark:text-slate-100">{children}</span>
    </div>
  );
};

export default TechTag;
