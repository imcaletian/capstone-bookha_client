import Btn from "../CTAButton/Btn"

const ActionBar = () => {
    return (
        <div className="flex justify-evenly items-center h-16 bg-indigo-200">
            <Btn text="Request Booking"/>
            <Btn text="Contact"/>
        </div>
    )
}

export default ActionBar