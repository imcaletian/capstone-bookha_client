import PageHeader from "../components/PageHeader/PageHeader"
import DashboardHero from "../components/DashboardHero"
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DashboardCard from "../components/DashboardCard";


const Dashboard = () => {
    const nav = useNavigate ()
    const id = localStorage.getItem("bookem_user_id")

    if (!id) {
        nav ("/")
    }
    const defaultDate = new Date();
    console.log(id)
    const [date, setDate] = useState(defaultDate);
    const [fetchError, setFetchError] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
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
    }, [id])


    useEffect(() => {
        const fetchEventInfo = async () => {
            const { data, error } = await supabase
            .from ('artist_events')
            .select('*')
            .contains('username', [`${id}`])
            .order ('date', { ascending: true })

            if (error) {
                console.log("could not fetch event info")
            }
            if (data) {
                setEventInfo(data)
            }
        }
        fetchEventInfo()
    }, [id])

    console.log(artistInfo)
    console.log(eventInfo)

    return (
        <>
        { artistInfo && 
            (<div className="bg-indigo-800 h-max">
            <PageHeader userInfo={artistInfo}/>
            <DashboardHero artistInfo={artistInfo} />
            <div className="flex flex-wrap justify-center items-center ">
                <DashboardCard eventInfo={eventInfo} />
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