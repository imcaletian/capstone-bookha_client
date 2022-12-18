import deleteIcon from "../assets/trash-solid.svg"
import editIcon from "../assets/pen-to-square-solid.svg"
import addIcon from "../assets/square-plus-solid.svg"
import { useState, useRef } from "react"
import Modal from "./Modal"
import { Link, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import supabase from "../supabaseClient"
import Btn from "./CTAButton/Btn"
import EventUpdateForm from "./SetupForms/EventUpdateForm"
import Timestamp from "react-timestamp"


const ActionBar = () => {
    return (
        <div className="flex items-center h-16 bg-indigo-900">
            <Btn text="Upcoming" path="./" />
            <Btn text="Requests" path="./request" />
        </div>
    )
}

const DashboardSection = (props) => {
    return (
        <div className=" w-full bg-indigo-50 mx-auto rounded-2xl flex flex-col overflow-hidden mt-2 select-none min-h-screen">
            <DashboardHero artistInfo={props.artistInfo} />
            <ActionBar />
            <Routes>
                <Route path="/" element={
                    <>
                    <Card><Events eventInfo={props.eventInfo} artistInfo={props.artistInfo} /></Card>
                    <Card><AcceptedRequests requestsInfo={props.approvedRequestsInfo} /></Card>
                    </>
                } />
                
                <Route path="/request" element={
                    <>
                        <Card>
                            <Requests requestsInfo={props.requestsInfo} />
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
    const [modal, setModal] = useState(false)
    const [eventId, setEventId] = useState('')
    const [eventDetail, setEventDetail] = useState('')



    useEffect(() => {
        const itemDetail = props.requestsInfo.find(e => e.request_id === eventId)
        setEventDetail(itemDetail)
    }, [eventId])

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const getUserInfo = async () => {
            const { data, error } = await supabase
                .from('artists')
                .select('name')
                .match({ "id": eventDetail.created_by })
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserName(data[0])
            }
        }
        getUserInfo()
    }, [eventDetail])
    
    const RequestModal = (props) => {
        const acceptRequest = async () => {
            try {
                const { data, error } = await supabase
                .from('requests')
                .update({ "approved" : true })
                .eq('request_id', eventDetail.request_id)
                console.log(error)
            }
            catch {
                console.log(error)}
            finally {
                props.setModal(false)
            alert("You have accepted this request!")}
        }

        const deleteRequest = async () => {
            try {
                const { data, error } = await supabase
                .from('requests')
                .delete()
                .eq('request_id', eventDetail.request_id)
                console.log(error)
            }
            catch {
                console.log(error)}
            finally {
                props.setModal(false)
            alert("You have declined this request!")}
        }
        return (
            <div className="min-h-60">
                <div className="w-full h-16 bg-indigo-900 flex justify-center items-center font-semibold text-indigo-50 text-xl">Event Detail</div>
                <div className="justify-center items-center h-fit text-indigo-900">
                    {eventDetail !== undefined &&
                        <div className="text-left flex gap-2 flex-col h-full p-6">
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Sent by:</h2>
                                {userName && <p>{userName.name}</p>}
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Budget:</h2>
                                <p>${eventDetail.booking_fee}</p>
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Description:</h2>
                                <p className="line-clamp-2">{eventDetail.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Date:</h2>
                                <div>
                                    <div className="flex gap-2">
                                        <p>From</p>
                                        <Timestamp date={eventDetail.request_timestamp} />
                                    </div>
                                    <div className="flex gap-2">                   
                                        <p>To</p>
                                        <Timestamp date={eventDetail.till_timestamp} />
                                        </div>
                                </div>
                            </div>
                            {eventDetail.private === true ? <p className="text-slate-400 text-center">This is a private event</p> : <p className="text-slate-400 text-center">This is a public event</p>}
                        </div>
                    }
                </div>
                <div className="flex justify-evenly w-full">
                    <div className="p-4 bg-indigo-900 w-1/2 font-semibold hover:bg-teal-700 text-indigo-50 transition-all cursor-pointer rounded-none text-center" onClick={(e)=> acceptRequest()}>Accept</div>
                    <div className="p-4 text-center bg-indigo-900 w-1/2 font-semibold hover:bg-rose-700 text-indigo-50 transition-all cursor-pointer" onClick={(e) => deleteRequest()}>Decline</div>
                </div>
            </div>
        )
    }
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
                            return <RequestCard key={item.request_id} id={item.request_id} date={item.request_timestamp} location={item.location} detail={item.description} created_by={item.created_by} onClick={setEventId} setModal={setModal} text="From" type="incoming" />
                        }) : "Loading Event"}
            </div>
            <Modal setModal={setModal} visible={modal}>
                <RequestModal setModal={setModal}/>
            </Modal>
        </div>
    )
}

const AcceptedRequests = (props) => {
    const [modal, setModal] = useState(false)
    const [eventId, setEventId] = useState('')
    const [eventDetail, setEventDetail] = useState('')

    useEffect(() => {
        const itemDetail = props.requestsInfo.find(e => e.request_id === eventId)
        setEventDetail(itemDetail)
    }, [eventId])

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const getUserInfo = async () => {
            const { data, error } = await supabase
                .from('artists')
                .select('name')
                .match({ "id": eventDetail.created_by })
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserName(data[0])
            }
        }
        getUserInfo()
    }, [eventDetail])
    
    const RequestModal = (props) => {
        return (
            <div className="min-h-60">
                <div className="w-full h-16 bg-indigo-900 flex justify-center items-center font-semibold text-indigo-50 text-xl">Event Detail</div>
                <div className="justify-center items-center h-fit text-indigo-900">
                    {eventDetail !== undefined &&
                        <div className="text-left flex gap-2 flex-col h-full p-6">
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Sent by:</h2>
                                {userName && <p>{userName.name}</p>}
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Budget:</h2>
                                <p>${eventDetail.booking_fee}</p>
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Description:</h2>
                                <p className="line-clamp-2">{eventDetail.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <h2 className="w-24 font-semibold">Date:</h2>
                                <div>
                                    <div className="flex gap-2">
                                        <p>From</p>
                                        <Timestamp date={eventDetail.request_timestamp} />
                                    </div>
                                    <div className="flex gap-2">                   
                                        <p>To</p>
                                        <Timestamp date={eventDetail.till_timestamp} />
                                        </div>
                                </div>
                            </div>
                            {eventDetail.private === true ? <p className="text-slate-400 text-center">This is a private event</p> : <p className="text-slate-400 text-center">This is a public event</p>}
                        </div>
                    }
                </div>
                <div className="flex justify-evenly w-full">
                    <div className="p-4 text-center bg-indigo-900 w-full font-semibold hover:bg-rose-700 text-indigo-50 transition-all cursor-pointer" onClick={()=>props.setModal(false)}>Close</div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full">
            <div className="p-4 flex justify-center">
                <h1 className="text-indigo-50 font-semibold text-xl">
                    You have {props.requestsInfo ? props.requestsInfo.length : "no"} upcoming accepted bookings.
                </h1>
            </div>
            <div className="bg-indigo-50 flex flex-col gap-1">
                {props.requestsInfo !== null ?
                    props.requestsInfo
                        .map((item) => {
                            return <RequestCard key={item.request_id} id={item.request_id} date={item.request_timestamp} location={item.location} detail={item.description} created_by={item.created_by} onClick={setEventId} setModal={setModal} text="From" type="incoming" />
                        }) : "Loading Event"}
            </div>
            <Modal setModal={setModal} visible={modal}>
                <RequestModal setModal={setModal} />
            </Modal>
        </div>
    )
}

const SentRequests = (props) => {
    const [modal, setModal] = useState('')
    
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
                            const date = new Date(item.request_timestamp)
                            const dateFormatted = date.toLocaleString()
                            return <RequestCard key={item.request_id} id={item.request_id} date={dateFormatted} location={item.location} detail={item.description} created_by={item.sent_to} approved={item.approved} text="To" type="outgoing" />
                        }) : ""}
            </div>
        </div>
    )
}

const RequestCard = (props) => {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const getUserInfo = async () => {
            const { data, error } = await supabase
                .from('artists')
                .select('name')
                .match({ id: props.created_by })
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserName(data[0])
            }
        }
        getUserInfo()
    }, [props.created_by])

    return (
        <div className="flex items-center rounded-2xl m-3 shadow-lg bg-indigo-800 overflow-hidden max-h-36" id={props.id}
            onClick={() => {
                props.onClick(props.id)
                props.setModal(true)
            }
            }>
            <div className="flex-1 flex gap-3 w-1/2 justify-center h-full hover:bg-indigo-900 transition-colors p-4 cursor-pointer">
                <div className="flex flex-col w-full gap-1 justify-center py-5 px-2">
                    <div className="flex gap-1">
                        <h2 className="font-semibold text-indigo-50 capitalize w-[4.6rem]">{props.text}:</h2>
                        <p className="font-semibold text-indigo-50 capitalize">{userName.name}</p>
                    </div>
                    <div className="flex gap-1">
                        <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Location:</h2>
                        <p className="font-extralight text-indigo-50 text-sm capitalize">{props.location}</p>
                    </div>
                    <div className="flex gap-1">
                        <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Date:</h2>
                        <p className="font-extralight text-indigo-50 text-sm capitalize"><Timestamp date={props.date} /></p>
                    </div>
                    {props.type === "outgoing" &&
                        <div className="flex gap-1 mt-1 items-center">
                        <h2 className="font-extralight text-indigo-50 text-sm capitalize w-[4.6rem]">Status:</h2>
                        {props.approved === true 
                        ?<div className="border-2 rounded-xl px-2 bg-teal-600 border-teal-600"><p className="font-semibold text-indigo-50 text-sm capitalize">Approved</p></div>
                        : <div className="border-2 rounded-xl px-2 bg-purple-600 border-purple-600"><p className="font-semibold text-indigo-50 text-sm capitalize">Pending</p></div>
                        }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const EventCard = (props) => {

    return (
        <div className="flex flex-row items-center bg-indigo-800 rounded-2xl m-2 w-[95%] gap-2 overflow-hidden h-36 shadow-xl hover:bg-indigo-900 transition-all max-w-xl cursor-pointer" id={props.id} onClick={props.onClick}>
            <div className="w-36 h-full overflow-hidden shadow-2xl">
                <img src={props.img} className="object-cover h-full w-full" alt="event photo" />
            </div>
            <div className="flex-1 flex-col flex gap-3">
                <div className="flex flex-col gap-1 justify-center flex-1 select-none px-2 h-full ">
                    <h2 className="font-semibold text-indigo-50">{props.name}</h2>
                    <p className=" font-extralight text-indigo-50 text-sm ">{props.location}</p>
                    <p className=" font-extralight text-indigo-50 text-sm "><Timestamp date={props.timestamp} /></p>
                </div>
            </div>
        </div>

    )
}

const Events = (props) => {
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
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
                        const date = new Date(item.timestamp)
                        const dateFormatted = date.toLocaleString()
                        return <EventCard
                            onClick={() => {
                                setEditId(item.id)
                                setModal(true)
                            }
                            }
                            timestamp={dateFormatted} name={item.event_name} key={item.id} location={item.location} link={item.link} img={item.imgUrl} />
                    }) : "Loading Event"}
            </div>
            <Modal setModal={setModal} visible={modal} id={editId} artistInfo={props.artistInfo} >
                <div>
                    <EventUpdateForm artistInfo={props.artistInfo} id={editId} setModal={setModal} />
                </div>
            </Modal>
        </div>
    )
}

const Card = ({ children }) => {
    return (
        <div className="flex flex-row items-center bg-indigo-600 rounded-2xl my-3 mx-2 overflow-hidden shadow-lg shadow-slate-400">
            {children}
        </div>
    )
}



export default DashboardSection