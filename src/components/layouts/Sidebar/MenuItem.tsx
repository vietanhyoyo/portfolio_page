type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
};

const MenuItem = ({ icon, children, isActive }: Props) => {
  return (
    <li className="m-0 px-4 py-1 cursor-pointer">
      <div className={` hover:bg-primary800 p-3 flex gap-3 rounded-lg ${isActive == true ? "bg-primary800" : ""}`}>
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        )}
        <div>{children}</div>
      </div>
    </li>
  );
};

export default MenuItem;
