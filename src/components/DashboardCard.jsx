import deleteIcon from "../assets/trash-solid.svg"
import editIcon from "../assets/pen-to-square-solid.svg"
import addIcon from "../assets/square-plus-solid.svg"
import { useState, useRef } from "react"
import Modal from "./Modal"
import { Link } from "react-router-dom"


const DashboardSection = (props) => {
    return (
        <div className=" w-full bg-indigo-100 mx-auto rounded-2xl flex flex-col gap-3 overflow-hidden mt-2 select-none">
            <DashboardHero artistInfo={props.artistInfo} />
             <Card>
            <Events eventInfo={props.eventInfo}  />
             </Card>
            <Card>
            <Requests requestsInfo={props.requestsInfo}  />
            </Card>
            <Card>
            <SentRequests sentRequests={props.sentRequests} />
            </Card>
        </div>
    )
}

const DashboardHero = (props) => {
    return (
        <div>
            <div className="flex w-full bg-indigo-900 h-40 items-center pl-2 gap-4">
                <div className="w-24 aspect-square bg-white rounded-full overflow-hidden">
                    <img src={props.artistInfo ? props.artistInfo.avatar_url : ""} alt="userURL" />
                </div>
                <h1 className="text-indigo-50 font-semibold text-2xl">Hello {props.artistInfo ? props.artistInfo.name : "UserName"}!</h1>
            </div>
        </div>
    )
}


const Requests = (props) => {
    return (
        <div className="w-full">
            <div className="p-4 flex justify-center">
                <h1 className="text-indigo-50 font-semibold text-xl">
                    You have {props.requestsInfo ? props.requestsInfo.length : "no"} new incoming requests.
                </h1>
            </div>
            <div className="bg-indigo-50 flex flex-col gap-1">
                {props.requestsInfo !== null ? 
                props.requestsInfo
                    .map((item) => {
                        const date = new Date (item.request_timestamp)
                        const dateFormatted = date.toLocaleString()                    
                        return <RequestCard key={item.request_id} id={item.request_id} date={dateFormatted} location={item.location} detail={item.description} created_by={item.created_by}/>
                    }) : "Loading Event"}
            </div>
        </div>
    )
}

const SentRequests = (props) => {
        return (
            <div className="w-full">
                <div className="p-4 flex justify-center">
                    <h1 className="text-indigo-50 font-semibold text-xl">
                        You have {props.sentRequests ? props.sentRequests.length : "no"} sent requests.
                    </h1>
                </div>
                <div className="bg-indigo-50 flex flex-col gap-1">
                    {props.sentRequests !== null ? 
                    props.sentRequests
                        .map((item) => {
                            const date = new Date (item.request_timestamp)
                            const dateFormatted = date.toLocaleString()                        
                            return <RequestCard key={item.request_id} id={item.request_id} date={dateFormatted} location={item.location} detail={item.description} />
                        }) : ""}
                </div>
            </div>
        )
    }
    

const RequestCard = (props) => {

    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 w-[95%]" id={props.id}>
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
    )
}

const EventCard = (props) => {
    
    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 py-4 w-[95%]" id={props.id}>
            <div className="w-32 h-32 overflow-hidden mx-3 rounded-lg shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex-1 flex-col flex gap-3">
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <h2 className=" text-center font-semibold text-indigo-50">{props.name}</h2>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.timestamp}</p>
                </div>
                <div className="flex justify-end items-end gap-5 px-5">
                    <div className="w-fit" onClick={(e)=> editEvent(e)}><img className="w-5 invert" src={editIcon} alt="Edit" id={props.id}/></div>
                    <div className="w-fit" onClick={() => deleteEvent(e)}><img id={props.id} className="w-5 invert fill-red-600" src={deleteIcon}  alt="Delete" /></div>
                </div>
            </div>
        </div>

    )
}

const Events = (props) => {
    return (
        <div className="w-full">
            <div className="p-4 flex justify-center items-center relative">
                <Link to="/home/add" className="absolute left-3"><img src={addIcon} className="w-8 invert" alt="" /></Link>
                <h1 className="text-indigo-50 font-semibold text-xl">
                    You have {props.eventInfo ? props.eventInfo.length : "no"} upcoming events.
                </h1>
            </div>
            <div className="bg-indigo-50 flex flex-col gap-1 items-center">
                {props.eventInfo !== null ? props.eventInfo
                    .map((item) => {
                        const date = new Date (item.timestamp)
                        const dateFormatted = date.toLocaleString()                    
                        return <EventCard name={item.event_name} key={item.id} id={item.id} timestamp={dateFormatted} location={item.location} link={item.link} img={item.imgUrl} />
                    }) : "Loading Event"}
            </div>
        </div>
    )
}



const Card = ({ children }) => {
    return (
        <div className="flex flex-row items-center bg-indigo-600 rounded-2xl m-2 overflow-hidden shadow-xl">
            {children}
        </div>
    )
}



export default DashboardSection