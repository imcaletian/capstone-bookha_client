
const EventCard = (props) => {
    return (
        <div className="flex flex-row items-center justify-center gap-4 content-evenly bg-indigo-50 h-40 my-2">
            <div className="w-32 h-32 shadow-lg object-cover overflow-hidden">
                <img src={props.img} alt="event photo" />
            </div>
            <div className="w-1/2 flex flex-col gap-1 justify-center items-center">
                <h2 className="font-semibold">{props.name}</h2>
                <p className=" font-extralight text-sm ">{props.date}, {props.time}</p>
                <p className=" font-extralight text-sm ">{props.location}</p>
                <a href={props.link}><div className="font-regular text-sm w-fit uppercase p-3 bg-indigo-400">Get Tickets</div></a>
            </div>
        </div>
    )
}

export default EventCard