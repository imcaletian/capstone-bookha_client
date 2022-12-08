const DashboardHero = () => {
    return (
        <div>
            <div className="flex w-full bg-indigo-200 h-60 justify-center items-center">
                <div className="w-36 aspect-square bg-white rounded-full overflow-hidden"></div>
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