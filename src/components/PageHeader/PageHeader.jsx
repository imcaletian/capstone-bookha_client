import { useEffect, useState } from "react"
import bars from "../../assets/bars-solid.svg"

const PageHeader = (props) => {
    return (
        <div className="flex bg-indigo-800 items-center px-4 py-2">
            <div className="h-12 w-12 rounded-md bg-indigo-50 flex justify-center items-center">
                <img className="w-6" src={bars} alt="" />
            </div>
            <p className="flex-1 text-3xl font-semibold mx-0 text-center text-white">BookHa</p>
            <div className="h-12 w-12 rounded-full bg-indigo-50">
                {props.userAvt && (
                <img className="overflow-hidden rounded-full" src={props.userAvt} alt="" />
                )}
            </div>
        </div>
    )
}

export default PageHeader