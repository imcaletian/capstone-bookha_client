import PageHeader from "../components/PageHeader/PageHeader"
import DashboardHero from "../components/DashboardHero"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
const Dashboard = () => { 
    const defaultDate = new Date();
    const [date, setDate] = useState (defaultDate);
    console.log(date);
    return (
        <div>
            <PageHeader />
            <DashboardHero />
            <div>
                
                <Calendar onChange={(e) => {setDate(e)}}/>
            </div>
        </div>
    )
}

export default Dashboard