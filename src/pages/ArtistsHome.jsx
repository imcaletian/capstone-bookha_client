import ActionBar from '../components/ActionBar/ActionBar'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'
import PageHeader from '../components/PageHeader/PageHeader'
import ProfileHero from '../components/ProfileHero/ProfileHero'
import supabase from '../supabaseClient'
import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from "react-router-dom"


function ArtistPage () {
    const [fetchError, setFetchError] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);

    const id = useParams().id;

    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data, error } = await supabase
            .from ('artists')
            .select('*')
            .eq('artistID', id)

            if (error) {
                setFetchError('Could Not Fetch Artist Info')
                setArtistInfo(null)
                console.log(error)
            }
            if (data) {
                setArtistInfo(data[0])
                setFetchError(null)
            }
        }
        fetchUserInfo()
    }, [id])


    
    return (
        <>
        <PageHeader artistInfo={artistInfo} />
        <ProfileHero artistInfo={artistInfo}/>
        <ActionBar />
        <Routes>
            <Route element={<EventList />} path='/' />
            <Route path='/request' element={<Calendar />} />
            <Route path='/contact' element={<h1>Not Available</h1>} />
        </Routes>
        </>
    )
}

export default ArtistPage