import ArrowForward from "./icons/ArrowForward"

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick} className="bg-[#0077ff] py-2.5 px-5 border-none outline-none flex items-center gap-2 mx-auto text-lg font-bold rounded-[50px] cursor-pointer hover:bg-[#014a96] transition-all duration-300 ease-in-out">
        <span>{text}</span>
        <ArrowForward />
    </button>
  )
}

export default Button