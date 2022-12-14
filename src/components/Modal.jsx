import xmark from "../assets/xmark-solid.svg"
const Modal = ({children, setModal, visible, id}) => {
  return (
    <div className=
    {
        visible === true ? 
        "fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center shadow-xl" 
        : 
        "fixed inset-0 -z-50 bg-black bg-opacity-50 justify-center items-center shadow-xl hidden"}
        >
        <div className="w-96 border-4 border-indigo-800 bg-indigo-200 rounded-3xl flex justify-center flex-col">
            <div className="aspect-square w-4 mx-2 mt-2" onClick={() => setModal(false)}>
                <img src={xmark} alt="" />
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal