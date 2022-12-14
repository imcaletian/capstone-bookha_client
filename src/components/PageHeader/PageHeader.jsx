import { useEffect, useState } from "react"
import bars from "../../assets/bars-solid.svg"
import cross from "../../assets/xmark-solid.svg"
import { Link } from "react-router-dom"
import NavBar from "../NavBar"

const PageHeader = (props) => {
    const [nav, setNav] = useState (false)
    const navShow = () => {
        if (nav === true) {
            setNav(false)
        } else {
            setNav(true)
        }
    }
    return (
        <>
        {props.userInfo && 
                <div className="flex bg-indigo-800 items-center px-4 py-2 relative z-50">
                <button className="h-12 w-12 rounded-md bg-indigo-50 flex justify-center items-center" onClick={navShow}>
                    <img className="w-6" src={nav === true ? cross : bars} alt="" />
                </button>
                <div className="flex-1">
                <p className=" text-3xl font-semibold mx-0 text-center text-white select-none">BookEm</p>
                </div>
                <div className={nav === true ? "h-12 w-12 rounded-full bg-indigo-50 opacity-0 transition-opacity" : "h-12 w-12 rounded-full bg-indigo-50 transition-opacity"}>
                    <img className="overflow-hidden rounded-full" src={props.userInfo ? props.userInfo.avatar_url : ""} alt="" />
                </div>
                <NavBar userInfo={props.userInfo} visible={nav} navShow={navShow}/>
            </div>}
        {!props.userInfo && 
            <div className="flex bg-indigo-800 items-center justify-center px-4 py-2 relative z-50">
                <button className="h-12 w-12 rounded-md bg-indigo-50 flex justify-center items-center" onClick={navShow}>
                    <img className="w-6" src={nav === true ? cross : bars} alt="" />
                </button>
                <div className="flex-1">
                <p className=" text-3xl font-semibold mx-0 text-center text-white select-none">BookEm</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-indigo-50 invisible">
                    <img className="overflow-hidden rounded-full" src={props.userInfo ? props.userInfo.avatar_url : ""} alt="" />
                </div>
                <NavBar visible={nav} navShow={navShow} />
            </div>
        }
        </>
    )
}

export default PageHeader