
const EventCard = (props) => {
    console.log(props)
    return (
        <a href={props.link}>
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 box-content gap-1 overflow-hidden h-36 shadow-xl hover:bg-indigo-900 transition-all max-w-lg">
            <div className="w-36 h-full overflow-hidden shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex flex-col gap-1 justify-center flex-1 select-none px-2 h-full">
                <h2 className="font-semibold text-indigo-50">{props.name}</h2>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.timestamp}</p>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
            </div>
            {/* <a className="bg-indigo-400 h-full flex items-center font-regular text-sm w-fit uppercase p-5 font-semibold rounded-sm hover:bg-violet-700 hover:text-indigo-50 transition-all"  href={props.link}>Tickets</a> */}
        </div>
        </a>
    )
}
const EventList = (props) => {

    return (
        <div className="bg-indigo-50 h-full py-2">
            {/* <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1> */}
            <div className="flex gap-1 flex-col">
            {props.eventInfo !== null ? 
            props.eventInfo.map((item)=> {
                const date = new Date (item.timestamp)
                const dateFormatted = date.toLocaleString()
                return <EventCard name={item.event_name} key={item.id}  timestamp={dateFormatted} location={item.location} link={item.link} img={item.imgUrl} />
            }) : ""}
            </div>
        </div>
    )
}

export default EventList