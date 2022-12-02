const Btn = (props) => {
    return (
        <div className="flex items-center justify-center w-1/3 font-semibold border-2 border-indigo-400 bg-indigo-400 rounded-2xl h-12 hover:bg-indigo-50 hover:text-indigo-400 transition-all cursor-pointer">{props.text}</div>
    )
}

export default Btn;