import PageHeader from "../components/PageHeader/PageHeader"
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useNavigate, Routes, Route } from "react-router-dom";
import DashboardSection from "../components/DashboardCard";
import Modal from "../components/Modal";
import AddNewEvent from "./AddNewEvent";


const Dashboard = () => {
    const nav = useNavigate ()
    const id = localStorage.getItem("bookem_user_id")
    
    if (!id) {
        nav ("/")
    }
    const defaultDate = new Date();
    const [date, setDate] = useState(defaultDate);
    const [fetchError, setFetchError] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
    const [requestsInfo, SetRequestInfo] = useState(null);
    const [sentRequests, SetSentRequests] = useState(null);
    const now = defaultDate.toISOString();
    useEffect(() => {
        const fetchArtistInfo = async () => {
            const { data, error } = await supabase
                .from('artists')
                .select('*')
                .eq('id', id)

            if (error) {
                setFetchError('Could Not Fetch Artist Info')
                setArtistInfo(null)
            }
            if (data) {
                setArtistInfo(data[0])
                setFetchError(null)
            }
        }
        fetchArtistInfo()
    }, [])


    useEffect(() => {
        const fetchEventInfo = async () => {
            const { data, error } = await supabase
            .from ('artist_events')
            .select('*')
            .contains('username', [`${artistInfo.username}`])
            .gt('timestamp', now)
            .order ('timestamp', { ascending: true })

            if (error) {
                console.log("could not fetch event info")
            }
            if (data) {
                setEventInfo(data)
            }
        }
        fetchEventInfo()
    }, [artistInfo])

    useEffect (()=> {
        const fetchRequests = async () => {
            const {data, error} = await supabase
            .from ('requests')
            .select('*')
            .eq('sent_to', [`${id}`])
            if (error) {
                console.log("could not fetch request info")
            }
            if (data) {
                SetRequestInfo(data)
            }
        }
        fetchRequests()
    }, [id])

    useEffect (()=> {
        const fetchSentRequests = async () => {
            const {data, error} = await supabase
            .from ('requests')
            .select('*')
            .eq('created_by', [`${id}`])
            if (error) {
                console.log("could not fetch request info")
            }
            if (data) {
                SetSentRequests(data)
            }
        }
        fetchSentRequests()
    }, [id])


    return (
        <>
        { artistInfo && 
            (<div className="bg-indigo-800 h-max">
            <PageHeader userInfo={artistInfo}/>
            <div className="flex flex-wrap justify-center items-center ">
            <Routes>
                <Route path="/" element={<DashboardSection eventInfo={eventInfo} artistInfo={artistInfo} requestsInfo={requestsInfo} sentRequests={sentRequests}/>} />
                <Route path="/add" element={<AddNewEvent artistInfo={artistInfo}/>} />
            </Routes>
            </div>
            </div>)
        }
        {
            !artistInfo && 
            nav('/setup')
        }
        </>
    )
}

export default Dashboard