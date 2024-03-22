type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className="p-4 bg-white rounded-md shadow-sm">{children}</div>;
};

export default Card;
