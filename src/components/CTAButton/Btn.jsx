import { NavLink, useLocation } from "react-router-dom"

const Btn = (props) => {

    const activeClassName = "bg-indigo-50 text-indigo-900 rounded-t-xl";

    return (
        <div 
        className="w-1/3 border-indigo-800 bg-indigo-800 h-full text-white hover:bg-indigo-50  hover:text-indigo-900 hover:rounded-t-xl transition-all cursor-pointer">
        <NavLink className={ ({ isActive }) => isActive ? `flex items-center font-semibold justify-center w-full h-full ${activeClassName}` : `flex items-center font-semibold justify-center w-full h-full`}  to={`${props.path}`}>
        {props.text}
        </NavLink>
        </div>
    )
}

export default Btn;