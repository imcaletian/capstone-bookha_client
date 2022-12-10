const DashboardCard = (props) => {
    return (
        <div className="border-2 border-white w-[28rem] h-[100rem] bg-indigo-100 m-auto rounded-xl flex flex-col gap-3">
            
            <div className="w-full h-48">
                <h1 className="font-semibold text-lg">
                You Have 3 Upcoming Events
                </h1>
                {/* <EventCard eventInfo={props.eventInfo} /> */}
            </div>
            <div className="w-full h-48">
                <h1 className="font-semibold text-lg">
                You Have 5 Unread Requests
                </h1>
            </div>
        </div>
    )
}

export default DashboardCard