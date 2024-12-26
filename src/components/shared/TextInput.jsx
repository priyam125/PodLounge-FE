const TextInput = (props) => {
  return (
    <div>
        <input style={{width: props.fullwidth ? "100%" : "inherit"}} className="bg-[#323232] border-none py-2.5 px-5 min-w-200px text-white text-lg rounded-[10px] outline-none" type="text" {...props} />
    </div>
  )
}

export default TextInput