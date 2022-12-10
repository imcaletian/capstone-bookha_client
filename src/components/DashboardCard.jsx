import DashboardHero from "./DashboardHero"

const DashboardCard = (props) => {
    return (
        <div className=" w-full h-[100rem] bg-indigo-100 mx-auto rounded-2xl flex flex-col gap-3 overflow-hidden mt-2">
            <DashboardHero artistInfo={props.artistInfo} />
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