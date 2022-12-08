import PageHeader from "../components/PageHeader/PageHeader"
import DashboardHero from "../components/DashboardHero"
import { useState } from "react";
const Dashboard = () => { 
    const defaultDate = new Date();
    const [date, setDate] = useState (defaultDate);
    console.log(date);
    return (
        <div>
            <PageHeader />
            <DashboardHero />
        </div>
    )
}

export default Dashboard