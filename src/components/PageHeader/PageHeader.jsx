import { useEffect, useState } from "react"
import bars from "../../assets/bars-solid.svg"
import { Link } from "react-router-dom"

const PageHeader = (props) => {
    return (
        <div className="flex bg-indigo-800 items-center px-4 py-2">
            <div className="h-12 w-12 rounded-md bg-indigo-50 flex justify-center items-center">
                <img className="w-6" src={bars} alt="" />
            </div>
            <Link to="/" className="flex-1">
            <p className="text-3xl font-semibold mx-0 text-center text-white">BookEm</p>
            </Link>
            <div className="h-12 w-12 rounded-full bg-indigo-50">
                <img className="overflow-hidden rounded-full" src={props.userInfo ? props.userInfo.avatar_url : ""} alt="" />
            </div>
        </div>
    )
}

export default PageHeader