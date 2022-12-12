import deleteIcon from "../assets/trash-solid.svg"
import editIcon from "../assets/pen-to-square-solid.svg"

const DashboardSection = (props) => {
    return (
        <div className=" w-full bg-indigo-100 mx-auto rounded-2xl flex flex-col gap-3 overflow-hidden mt-2">
            <DashboardHero artistInfo={props.artistInfo} />
            <Card Components={<Events eventInfo={props.eventInfo} />} />
            <Card Components={<Requests requestsInfo={props.requestsInfo} />} />
        </div>
    )
}

const DashboardHero = (props) => {
    return (
        <div>
            <div className="flex w-full bg-indigo-900 h-40 items-center pl-10 gap-4">
                <div className="w-24 aspect-square bg-white rounded-full overflow-hidden">
                    <img src={props.artistInfo ? props.artistInfo.avatar_url : ""} alt="userURL" />
                </div>
                <h1 className="text-indigo-50 font-semibold text-2xl">Hello {props.artistInfo ? props.artistInfo.name : "UserName"}!</h1>
            </div>
        </div>
    )
}


const Requests = (props) => {
console.log(props.requestsInfo)
    return (
        <div className="w-full">
            <div className="p-4 flex justify-center">
                <h1 className="text-indigo-50 font-semibold text-xl">
                    You have {props.requestsInfo ? props.requestsInfo.length : "no"} new requests.
                </h1>
            </div>
            <div className="bg-indigo-50 flex flex-col gap-1">
                {props.requestsInfo !== null ? 
                props.requestsInfo
                    .map((item) => {
                        return <RequestCard key={item.id} id={item.id} date={item.request_timestamp} location={item.location} detail={item.description} />
                    }) : "Loading Event"}
            </div>
        </div>
    )
}

const RequestCard = (props) => {
    return (
        <div>
            <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 my-2">
                <div className="flex-1 flex-col flex gap-3">
                    <div className="flex flex-col gap-1 justify-center items-center ">
                        <h2 className=" text-center font-semibold text-indigo-50">{props.created_by}</h2>
                        <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                        <p className=" font-extralight text-indigo-50 text-sm ">{props.date}</p>
                        <p className=" font-extralight text-indigo-50 text-sm ">{props.detail}</p>
                    </div>
                    <div className="flex justify-end items-end gap-5 px-5">
                        <div><img className="w-5 invert" src={editIcon} alt="Edit" /></div>
                        <div><img className="w-5 invert" src={deleteIcon} alt="Delete" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EventCard = (props) => {

    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 my-2">
            <div className="w-32 h-32 overflow-hidden mx-3 rounded-2xl shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex-1 flex-col flex gap-3">
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <h2 className=" text-center font-semibold text-indigo-50">{props.name}</h2>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.date}</p>
                </div>
                <div className="flex justify-end items-end gap-5 px-5">
                    <div><img className="w-5 invert" src={editIcon} alt="Edit" /></div>
                    <div><img className="w-5 invert" src={deleteIcon} alt="Delete" /></div>
                </div>
            </div>
        </div>
    )
}

const Events = (props) => {
    return (
        <div className="w-full">
            <div className="p-4 flex justify-center">
                <h1 className="text-indigo-50 font-semibold text-xl">
                    You have {props.eventInfo ? props.eventInfo.length : "no"} upcoming events.
                </h1>
            </div>
            <div className="bg-indigo-50 flex flex-col gap-1">
                {props.eventInfo !== null ? props.eventInfo
                    .map((item) => {
                        return <EventCard name={item.event_name} key={item.id} id={item.id} date={item.timestamp} location={item.location} link={item.link} img={item.imgUrl} />
                    }) : "Loading Event"}
            </div>
        </div>
    )
}
const Card = ({ Components }, props) => {
    return (
        <div className="flex flex-row items-center bg-indigo-600 rounded-2xl m-2 overflow-hidden shadow-xl">
            {Components}
        </div>
    )
}



export default DashboardSection