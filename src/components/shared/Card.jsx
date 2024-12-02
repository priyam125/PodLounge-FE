import Logo from "./icons/Logo";

const Card = ({title, icon, children}) => {
  return (
    <div className="w-[500px] max-w-[90%] min-h-[300px] bg-[#1d1d1d] p-7 rounded-[20px] text-center gap-7 flex flex-col">
      <div
        id="headingWrapper"
        className="flex items-center justify-center gap-3"
      >
        {icon}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
