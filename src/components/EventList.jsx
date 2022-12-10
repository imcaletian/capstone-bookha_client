import EventCard from "./EventCard"

const EventList = (props) => {
    console.log(props.eventInfo)
    return (
        <div className="bg-indigo-50 h-full py-2">
            {/* <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1> */}
            <div className="flex gap-1 flex-col">
            {props.eventInfo !== null ? props.eventInfo
            .map((item)=> {
                return <EventCard name={item.event_name} key={item.id} date={item.date} time={item.time} location={item.location} link={item.link} img={item.imgUrl} />
            }) : "Loading Event"}
            </div>
        </div>
    )
}

export default EventList