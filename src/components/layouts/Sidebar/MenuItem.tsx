type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const MenuItem = ({ icon, children }: Props) => {
  return (
    <li className="m-0 p-4 hover:bg-primary800 cursor-pointer flex gap-3">
      {icon || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      )}
      <div>{children}</div>
    </li>
  );
};

export default MenuItem;
