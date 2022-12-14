const EventCard = (props) => {
    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 my-2">
            <div className="w-32 h-32 overflow-hidden mx-3 rounded-2xl shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="w-1/2 flex flex-col gap-1 justify-center items-center flex-1">
                <h2 className=" text-center font-semibold text-indigo-50">{props.name}</h2>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.timestamp}</p>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                <a href={props.link}><div className="font-regular text-sm w-fit uppercase border-2 border-indigo-400 p-2 mt-2 font-semibold rounded-sm bg-indigo-400 hover:bg-indigo-900 hover:text-indigo-50 cursor-pointer">Get Tickets</div></a>
            </div>
        </div>
    )
}

const EventList = (props) => {
    return (
        <div className="bg-indigo-50 h-full py-2">
            {/* <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1> */}
            <div className="flex gap-1 flex-col">
            {props.eventInfo !== null ? props.eventInfo
            .map((item)=> {
                const date = new Date (item.timestamp)
                const dateFormatted = date.toLocaleString()
                return <EventCard name={item.event_name} key={item.id}  timestamp={dateFormatted} location={item.location} link={item.link} img={item.imgUrl} />
            }) : "Loading Event"}
            </div>
        </div>
    )
}

export default EventList