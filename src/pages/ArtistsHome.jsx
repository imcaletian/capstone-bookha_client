import ActionBar from '../components/ActionBar/ActionBar'
import EventList from '../components/EventList'
import PageHeader from '../components/PageHeader/PageHeader'
import ProfileHero from '../components/ProfileHero/ProfileHero'
import Request from '../components/Request'
import supabase from '../supabaseClient'
import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from "react-router-dom"
import NavBar from '../components/NavBar'

function ArtistPage () {
    const localId = localStorage.getItem("bookem_user_id")
    const [fetchError, setFetchError] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const id = useParams().id;
    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data, error } = await supabase
            .from ('artists')
            .select('*')
            .eq('id', localId)

            if (error) {
                setFetchError('Could Not Fetch Info')
                setUserInfo(null)
            }
            if (data) {
                setUserInfo(data[0])
                setFetchError(null)
            }
        }
        fetchUserInfo()
    },[])
    
    useEffect(() => {
        const fetchArtistInfo = async () => {
            const { data, error } = await supabase
            .from ('artists')
            .select('*')
            .eq('username', id)

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

    
    return (
        <>
        <PageHeader userInfo={userInfo} />
        <ProfileHero artistInfo={artistInfo}/>
        <ActionBar />
        <NavBar userInfo={userInfo}/>
        <Routes>
            <Route element={<EventList eventInfo={eventInfo} />} path='/' />
            <Route path='/request' element={<Request />} />
            <Route path='/contact' element={<h1>Not Available</h1>} />
        </Routes>
        </>
    )
}

export default ArtistPage