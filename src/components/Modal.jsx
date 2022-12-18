import xmark from "../assets/xmark-solid.svg"
const Modal = ({children, setModal, visible}) => {
  return (
    <div className=
    {
        visible === true ? 
        "fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center shadow-xl" 
        : 
        "fixed inset-0 -z-50 bg-black bg-opacity-50 justify-center items-center shadow-xl hidden"} 
        >
        <div className="w-[90%] bg-indigo-50 rounded-3xl flex justify-center flex-col overflow-hidden shadow-lg shadow-slate-900 relative ">
            <div className="aspect-square w-5 mx-2 mt-2 absolute top-2 left-2 cursor-pointer" onClick={() => setModal(false)}>
                <img className="invert" src={xmark} alt="" />
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal