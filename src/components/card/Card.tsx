type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className="p-4 bg-white rounded-2xl shadow-sm">
    {children}
  </div>;
};

export default Card;
