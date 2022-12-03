import Btn from "../CTAButton/Btn"
import { Navigate, Link } from "react-router-dom"

const ActionBar = () => {
    return (
        <div className="flex items-center h-16 bg-indigo-200 ">
            <Btn text="Request" path="./request" />
            <Btn text="Events" path="./" />
            <Btn text="Contact" path="./contact" />
        </div>
    )
}

export default ActionBar