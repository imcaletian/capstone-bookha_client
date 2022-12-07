import EventCard from "./EventCard"

const EventList = (props) => {
    console.log(props.eventInfo)
    return (
        <div className="bg-indigo-50 h-full">
            {/* <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1> */}
            <div className="flex gap-2 flex-col">
            {props.eventInfo !== null ? props.eventInfo
            .map((item)=> {
                return <EventCard name={item.event_name} key={item.id} date={item.date} time={item.time} location={item.location} link={item.link} />
            }) : "Loading Event"}
            </div>
        </div>
    )
}

export default EventList