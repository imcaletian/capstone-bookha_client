
const EventCard = (props) => {
    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 my-2">
            <div className="w-32 h-32 overflow-hidden mx-3 rounded-2xl shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="w-1/2 flex flex-col gap-1 justify-center items-center flex-1">
                <h2 className=" text-center font-semibold text-indigo-50">{props.name}</h2>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.date}, {props.time}</p>
                <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                <a href={props.link}><div className="font-regular text-sm w-fit uppercase border-2 border-indigo-400 p-2 mt-2 font-semibold rounded-sm bg-indigo-400 hover:bg-indigo-900 hover:text-indigo-50 cursor-pointer">Get Tickets</div></a>
            </div>
        </div>
    )
}

export default EventCard