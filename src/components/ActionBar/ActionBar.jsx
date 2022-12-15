import Btn from "../CTAButton/Btn"
import { Navigate, Link } from "react-router-dom"

const ActionBar = () => {
    return (
        <div className="flex items-center h-16 bg-indigo-800 mt-5">
            <Btn text="Events" path="./" />
            <Btn text="Request" path="./request" />
            {/* <Btn text="Contact" path="./contact" /> */}
        </div>
    )
}

export default ActionBar