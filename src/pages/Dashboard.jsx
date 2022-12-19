import PageHeader from "../components/PageHeader/PageHeader"
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useNavigate, Routes, Route, Link, Navigate } from "react-router-dom";
import DashboardSection from "../components/DashboardCard";
import Modal from "../components/Modal";
import AddNewEvent from "./AddNewEvent";


const Dashboard = () => {
    const nav = useNavigate ()
    const id = localStorage.getItem("bookem_user_id")
    const token = localStorage.getItem("bookem_token")
    if (!token) {
        nav ("/")
    }
    const defaultDate = new Date();
    const [date, setDate] = useState(defaultDate);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState (false);
    const [eventInfo, setEventInfo] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
    const [requestsInfo, SetRequestInfo] = useState(null);
    const [approvedRequestsInfo, SetApprovedRequestInfo] = useState(null);
    const [sentRequests, SetSentRequests] = useState(null);
    const now = defaultDate.toISOString();

    useEffect(() => {
        setLoading(true)
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
                setLoading(false)
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
        if (artistInfo) {
            fetchEventInfo()
        } 
    }, [artistInfo])

    useEffect (()=> {
        const fetchRequests = async () => {
            const {data, error} = await supabase
            .from ('requests')
            .select('*')
            .eq('sent_to', [id])
            .is('approved', false)
            if (error) {
                console.log("could not fetch request info")
            }
            if (data) {
                SetRequestInfo(data)
            }
        }
        fetchRequests()
    }, [])

    useEffect (()=> {
        const fetchApprovedRequests = async () => {
            const {data, error} = await supabase
            .from ('requests')
            .select('*')
            .eq('sent_to', [id])
            .is('approved', true)
            if (error) {
                console.log("could not fetch request info")
            }
            if (data) {
                SetApprovedRequestInfo(data)
            }
        }
        fetchApprovedRequests()
    }, [])


    useEffect (()=> {
        const fetchSentRequests = async () => {
            const {data, error} = await supabase
            .from ('requests')
            .select('*')
            .eq('created_by', id)
            if (error) {
                console.log(error)
            }
            if (data) {
                SetSentRequests(data)
            }
        }
        fetchSentRequests()
    }, [])

    return (
        <>
        { artistInfo && 
            <div className="bg-indigo-800 h-max">
            <PageHeader userInfo={artistInfo}/>
            <div className="flex flex-wrap justify-center items-center ">
            <Routes>
                <Route path="/*" element={<DashboardSection eventInfo={eventInfo} artistInfo={artistInfo} requestsInfo={requestsInfo} sentRequests={sentRequests} approvedRequestsInfo={approvedRequestsInfo} />} />
                <Route path="/add" element={<AddNewEvent artistInfo={artistInfo}/>} />
            </Routes>
            </div>
            </div>
        }
        {
            !artistInfo && 
            <div className="bg-indigo-800 h-screen justify-center items-center flex flex-col select-none">
                <h1 className="text-indigo-50 font-semibold text-2xl animate-bounce">Welcome to BookEm!</h1>
                <p className="text-indigo-50">A easy way to showcase your events and bookings</p>
                <Link to="/setup" className="p-3 m-10 rounded-xl bg-indigo-900 text-lg font-semibold text-indigo-50 hover:bg-indigo-50 hover:border-4 hover:shadow-lg hover:text-indigo-900 transition-all"><div>Let's get you set up!</div></Link>
            </div>
        }
        </>
    )
}

export default Dashboard