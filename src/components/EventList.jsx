const EventCard = (props) => {
    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 box-content gap-1 overflow-hidden">
            <div className="w-28 h-28 overflow-hidden mx-3 rounded-lg shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex flex-col gap-1 justify-center flex-1 select-none">
                <h2 className="font-semibold text-indigo-50 break-words ">{props.name}</h2>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.timestamp}</p>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
            </div>
            <a className="bg-indigo-400 h-36 flex items-center font-regular text-sm w-fit uppercase p-3 font-semibold rounded-sm hover:bg-violet-700 hover:text-indigo-50 transition-all" href={props.link}>Get Tickets</a>
        </div>
    )
}
const EventList = (props) => {
    console.log(props.eventInfo)

    return (
        <div className="bg-indigo-50 h-full py-2">
            {/* <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1> */}
            <div className="flex gap-1 flex-col">
            {props.eventInfo !== null ? props.eventInfo
            .map((item)=> {
                const date = new Date (item.timestamp)
                const dateFormatted = date.toLocaleString()
                return <EventCard name={item.event_name} key={item.id}  timestamp={dateFormatted} location={item.location} link={item.link} img={item.imgUrl} />
            }) : "hi"}
            {!props.eventInfo ? 
            <div className="w-full h-96 absolute bg-indigo-50 flex justify-center items-center">Oops! There's no event coming up!</div>: ""}
            </div>
        </div>
    )
}

export default EventList