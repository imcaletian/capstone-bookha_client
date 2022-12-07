import eventPhoto from "../assets/event-photo.jpg"

const EventCard = () => {
    return (
        <div className="flex flex-row items-center justify-between gap-10 content-evenly bg-indigo-50 h-48">
            <div className="h-full aspect-square overflow-hidden">
                <img className="h-full object-cover" src={eventPhoto} alt="event photo" />
            </div>
            <div className="w-1/2">
                <h2 className="font-semibold">Event Name</h2>
                <p className=" font-extralight text-sm ">2022-08-06 11pm</p>
                <p className=" font-extralight text-sm ">The Junction</p>
            </div>
        </div>
    )
}

export default EventCard