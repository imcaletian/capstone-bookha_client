import PageHeader from "../components/PageHeader/PageHeader"
import DashboardHero from "../components/DashboardHero"
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

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

    console.log(artistInfo)

    return (
        <>
        { artistInfo && 
            (<div>
            <PageHeader />
            <DashboardHero artistInfo={artistInfo} />
            <NavBar userInfo={artistInfo}/>
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