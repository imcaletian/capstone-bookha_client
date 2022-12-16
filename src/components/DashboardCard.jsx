import deleteIcon from "../assets/trash-solid.svg"
import editIcon from "../assets/pen-to-square-solid.svg"
import addIcon from "../assets/square-plus-solid.svg"
import { useState, useRef } from "react"
import Modal from "./Modal"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import supabase from "../supabaseClient"
import Btn from "./CTAButton/Btn"


const ActionBar = () => {
    return (
        <div className="flex items-center h-16 bg-indigo-900">
            <Btn text="Events" path="./" />
            <Btn text="Request" path="./request" />
        </div>
    )
}

const DashboardSection = (props) => {
    return (
        <div className=" w-full bg-indigo-50 mx-auto rounded-2xl flex flex-col overflow-hidden mt-2 select-none">
        <DashboardHero artistInfo={props.artistInfo} />
        <ActionBar />
        <Routes>
            <Route path="/" element={
            <Card><Events eventInfo={props.eventInfo} /></Card>
            } />
            <Route path="/request" element={
                <>
                <Card>
                <Requests requestsInfo={props.requestsInfo}  />
                </Card>
                <Card>
                <SentRequests sentRequests={props.sentRequests} />
                </Card>
                </>
            } />
            </Routes>

        </div>

    )
}

const DashboardHero = (props) => {
    return (
        <>
        <div>
            <div className="flex w-full bg-indigo-900 h-40 items-center pl-2 gap-4">
                <div className="w-24 aspect-square bg-white rounded-full overflow-hidden">
                    <img src={props.artistInfo ? props.artistInfo.avatar_url : ""} alt="userURL" />
                </div>
                <h1 className="text-indigo-50 font-semibold text-2xl">Hello {props.artistInfo ? props.artistInfo.name : "UserName"}!</h1>
            </div>
        </div>
        </>
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
                        return <RequestCard key={item.request_id} id={item.request_id} date={dateFormatted} location={item.location} detail={item.description} created_by={item.created_by} text="From" type="incoming"/>
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
                            return <RequestCard key={item.request_id} id={item.request_id} date={dateFormatted} location={item.location} detail={item.description} created_by={item.sent_to} text="To" type="outgoing"/>
                        }) : ""}
                </div>
            </div>
        )
    }
    

const RequestCard = (props) => {
    const [userName, setUserName] = useState ('')

    useEffect(() => {
        const getUserInfo = async () => {
            const { data , error } = await supabase
            .from('artists')
            .select('name')
            .match({id : props.created_by})
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserName(data[0])
                console.log(data[0])
            }
        }
        getUserInfo()
    }, [props.created_by])

    return (
        <div className="flex items-center rounded-2xl m-3 shadow-lg bg-indigo-800 overflow-hidden h-48" id={props.id} >
                {props.type === "incoming" &&
                    <div className="p-4 h-48 bg-rose-600 flex justify-center items-center text-indigo-50 font-semibold hover:bg-rose-900 transition-all cursor-pointer w-[5.25rem]">Decline</div>
                }
                {props.type === "outgoing" &&
                    <div className="p-4 h-48 bg-rose-600 flex justify-center items-center text-indigo-50 font-semibold hover:bg-rose-900 transition-all cursor-pointer w-[5.25rem] ">Delete</div>
                }                
                <div className="flex-1 flex-col flex gap-3 w-1/2 justify-center h-full hover:bg-indigo-900 transition-colors">
                    <div className="flex flex-col gap-1 justify-center py-5 px-2">
                        <div className="flex gap-1">
                        {/* <h2 className="font-semibold text-indigo-50 capitalize w-[4.6rem]">{props.text}:</h2> */}
                        <p className="font-semibold text-indigo-50 capitalize">{userName.name}</p>
                        </div>
                        <div className="flex gap-1">
                        {/* <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Location:</h2> */}
                        <p className="font-extralight text-indigo-50 text-sm capitalize">{props.location}</p>
                        </div>
                        <div className="flex gap-1">
                        {/* <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Date:</h2> */}
                        <p className="font-extralight text-indigo-50 text-sm capitalize">{props.date}</p>
                        </div>
                        {/* <div className="flex gap-1">
                        <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Detail: </h2>
                        <p className="font-extralight text-indigo-50 text-sm line-clamp-5 min-w-18">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum quibusdam, doloribus illum tempora voluptates ab necessitatibus exercitationem id blanditiis! Explicabo error blanditiis quod, et architecto qui doloremque praesentium rem inventore.</p>
                        </div> */}
                    </div>
                    {/* {props.type === "incoming" &&
                        <div className="flex justify-evenly ">
                            <div className="bg-green-200 p-4 w-full text-center font-semibold hover:bg-green-400 transition-colors cursor-pointer">Accept</div>
                            <div className="bg-red-200 p-4 w-full text-center font-semibold hover:bg-red-400 transition-colors cursor-pointer">Decline</div>
                        </div>
                    }
                    {props.type === "outgoing" && 
                        <div className="flex justify-evenly ">
                            <div className="bg-indigo-300 p-4 w-full text-center font-semibold hover:bg-indigo-500 transition-colors cursor-pointer">Edit</div>
                            <div className="bg-red-200 p-4 w-full text-center font-semibold hover:bg-red-400 transition-colors cursor-pointer">Delete</div>
                        </div>
                    } */}
                    {/* <div className="flex justify-end items-end gap-5 px-5">
                        <div><img className="w-5 invert" src={editIcon} alt="Edit" /></div>
                        <div><img className="w-5 invert" src={deleteIcon} alt="Delete" /></div>
                    </div> */}
                </div>
                {props.type === "incoming" &&
                    <div className="p-4 h-48 bg-teal-600 flex justify-center items-center text-indigo-50 font-semibold hover:bg-teal-900 transition-all cursor-pointer w-[5.25rem]">Accept</div>
                }
                {props.type === "outgoing" &&
                    <div className="p-4 h-48 bg-teal-600 flex justify-center items-center text-indigo-50 font-semibold hover:bg-teal-900 transition-all cursor-pointer w-[5.25rem] ">Edit</div>
                }

            </div>
    )
}

const EventCard = (props) => {
    
    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 w-[95%] gap-2 overflow-hidden h-36 shadow-xl hover:bg-indigo-900 transition-all max-w-xl cursor-pointer" id={props.id}>
            <div className="w-36 h-full overflow-hidden shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex-1 flex-col flex gap-3">
                <div className="flex flex-col gap-1 justify-center flex-1 select-none px-2 h-full ">
                    <h2 className="font-semibold text-indigo-50">{props.name}</h2>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.timestamp}</p>
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
                    You have {props.eventInfo ? props.eventInfo.length : "no"} public events.
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
        <div className="flex flex-row items-center bg-indigo-600 rounded-2xl my-3 mx-2 overflow-hidden shadow-xl ">
            {children}
        </div>
    )
}



export default DashboardSection