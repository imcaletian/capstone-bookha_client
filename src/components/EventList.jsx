import EventCard from "./EventCard"

const EventList = () => {
    return (
        <div className="bg-indigo-50 h-full">
            <h1 className="text-2xl font-bold uppercase flex justify-center text-indigo-900 py-10">Upcoming Events</h1>
            <div className="flex gap-2 flex-col">
            <EventCard />
            <EventCard />
            <EventCard />
            </div>
        </div>
    )
}

export default EventList