const DashboardHero = (props) => {
    return (
        <div>
            <div className="flex w-full bg-indigo-800 h-40 items-center pl-10 gap-4">
                <div className="w-24 aspect-square bg-white rounded-full overflow-hidden">
                    <img src={props.artistInfo ? props.artistInfo.avatar_url : "" } alt="userURL" />
                </div>
                <h1 className="text-indigo-50 font-semibold text-xl">Hello {props.artistInfo ? props.artistInfo.name : "UserName"}!</h1>
            </div>
            <div className="w-full bg-indigo-900 h-14 flex flex-row justify-evenly items-center ">
                <div className="text-indigo-50 w-24 text-center">Calendar</div>
                <div className="text-indigo-50 w-24 text-center">Requests</div>
                <div className="text-indigo-50 w-24 text-center">Setting</div>
            </div>
        </div>
    )
}

export default DashboardHero