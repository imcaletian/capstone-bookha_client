import ActionBar from '../components/ActionBar/ActionBar'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'
import PageHeader from '../components/PageHeader/PageHeader'
import ProfileHero from '../components/ProfileHero/ProfileHero'
import {Routes, Route} from "react-router-dom"

function ArtistHome () {
    return (
        <>
        <PageHeader />
        <ProfileHero />
        <ActionBar />
        <Routes>
            <Route element={<EventList />} path='/' />
            <Route path='/request' element={<Calendar />} />
            <Route path='/contact' element={<h1>Not Available</h1>} />
        </Routes>
        </>
    )
}

export default ArtistHome